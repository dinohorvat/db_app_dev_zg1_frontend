
import {Inject, Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import {JwtHelper} from "angular2-jwt";
import {ActivatedRoute} from "@angular/router";
import {DOCUMENT} from "@angular/platform-browser";
import {Cookie} from "ng2-cookies";
import {isNullOrUndefined} from "util";

@Injectable()
export class KeyCloakService {

    private user: User;
    private token: Token;
    private parameters: Parameters;
    private jwtHelper: JwtHelper;
    private tokenCookieKey: string = "DCKeyCloak";
    private tokenCookieParameterKey: string = "KeyCloakParams";
    private intervalID: any;
    private tokenId: string;

    constructor(private http: Http, private activatedRoute: ActivatedRoute, @Inject(DOCUMENT) private document: any) {
        this.jwtHelper = new JwtHelper();
    }

    /**
     * inicijalni dohvat tokena
     * flow je opisan na https://github.com/mitreid-connect/OpenID-Connect-Java-Spring-Server/blob/master/docs/OpenID_Connect_Diagrams.pdf
     * @param clientId id client aplikacije
     * @param redirectUri URL na koji dolazi do redirecta nakon uspješnog poziva prema keyCloak-u
     * @param keyClockUrl lokacija keyCloak-a
     * @return Promise<Token>
     */
    public init(clientId: string, redirectUri: string, keyClockUrl: string): Promise<Token> {
        this.setParameters(clientId, redirectUri, keyClockUrl);
        let token: Token = this.retrieveToken();
        let parameters: Parameters = this.retrieveParameters();

        if (token) {
            console.log("token: " + JSON.stringify(token));
            return this.getToken();
        }

        console.log('calling this.getKeyClockCode');
        this.getKeyClockCode();

        if (!isNullOrUndefined(parameters.keyClockCode)) {
            console.log('parameters.keyClockCode not null or undefined');
            let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
            let options = new RequestOptions({headers: headers});
            let urlSearchParams = new URLSearchParams();
            urlSearchParams.append('grant_type', 'authorization_code');
            urlSearchParams.append('code', parameters.keyClockCode);
            urlSearchParams.append('client_id', parameters.clientId);
            urlSearchParams.append('redirect_uri', parameters.redirectUri);
            console.log('calling this.http.post(parameters.keyClockUrl + "/token")');
            return this.http.post(parameters.keyClockUrl + "/token", urlSearchParams, options)
                .toPromise()
                .then(response => {
                    this.token = JSON.parse(response.text()) as Token;
                    this.storeKeyCloakCookie(this.token);
                    return this.token;
                })
                .catch(this.handleError);
        }
    }

    /**
     * dohvat tokena.
     * Ukoliko je token istekao dolazi do automatskog refresh-a tokena
     * @return Promise<Token>
     */
    public getToken(): Promise<Token> {
        console.log ("get token pozvan");
        this.retrieveParameters();
        if (this.isTokenExpired()) {
            return this.refreshToken();
        } else {
            return Promise.resolve(this.retrieveToken());
        }
    }
    public getTokenId(): String {
        let token = this.retrieveToken();
        if (token) {
            this.tokenId = this.retrieveToken().id_token;
        }
        return this.tokenId;
    }


    /**
     * dohvat user objekta.
     * @return User trenutno aktivni korisnik
     */
    public getUser(): User {
        let token = this.retrieveToken();
        if (token) {
            this.user = new User();
            this.user.username = this.jwtHelper.decodeToken(this.retrieveToken().id_token).preferred_username;
        }
        return this.user;
    }

    /**
     * keycloak logout.
     * @return Promise<any>
     */
    public logOut(): Promise<any> {
        let parameters: Parameters = this.retrieveParameters();
        let url = parameters.keyClockUrl + "/logout";
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('refresh_token', this.retrieveToken().refresh_token);
        urlSearchParams.append('client_id', parameters.clientId);
        urlSearchParams.append('redirect_uri', parameters.redirectUri);
        return this.http.post(url, urlSearchParams, options)
            .toPromise()
            .then(response => {
                this.clearData();
                return response;
            })
            .catch(this.handleError);
    }

    /**
     * postavljanje callback funkcije koja će se izvršiti nakon
     * isteka refreshToken-a. Načelno, funkcija se poziva prilikom
     * 30min neaktivnog rada
     * @param callback callback funkcija
     * @return Promise<any>
     */
    public setSessionEndedFunction(callback: any) {
        if (this.intervalID) {
            clearInterval(this.intervalID);
        }
        this.intervalID = setInterval(() => {
            if (this.retrieveToken() && this.isRefreshTokenExpired()) {
                this.clearData();
                callback();
            }
        }, 60000);
    }

    /**
     * generiranje guid-a
     * @return string guid
     */
    private guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    /**
     * postavljanje keycloak parametara u aplikaciji i u cookie-u
     * @param clientId id client aplikacije
     * @param redirectUri URL na koji dolazi do redirecta nakon uspješnog poziva prema keyCloak-u
     * @param keyClockUrl lokacija keyCloak-a
     */
    private setParameters(clientId: string, redirectUri: string, keyClockUrl: string): void {
        this.parameters = new Parameters();
        this.parameters.clientId = clientId;
        this.parameters.redirectUri = redirectUri;
        this.parameters.keyClockUrl = keyClockUrl;
        Cookie.delete(this.tokenCookieParameterKey, "/");
        Cookie.set(this.tokenCookieParameterKey, JSON.stringify(this.parameters), null, "/");
    }

    /**
     * dohvat keyCloak code-a. Ukoliko code ne postoji dolazi do redirecta
     * koji će vratiti code.
     */
    private getKeyClockCode() {
        let parameters: Parameters = this.retrieveParameters();
        parameters.keyClockCode = this.activatedRoute.snapshot.queryParams["code"];
        if (!parameters.keyClockCode) {
            // this.document.location.href = parameters.keyClockUrl + "/auth" + "?client_id=" + parameters.clientId + "&redirect_uri=" + encodeURIComponent(parameters.redirectUri) + "&response_type=code";
            let href = parameters.keyClockUrl + "/auth" + "?client_id=" + parameters.clientId + "&redirect_uri=" + encodeURIComponent(parameters.redirectUri) + "&response_type=code";
            console.log(href);
            window.location.href = href;
        }
    }

    /**
     * refresh treutnog token-a. Ukoliko token nije moguće
     * refresh-ati potrebno je napraviti catch errora
     * @return romise<Token>
     */
    private refreshToken(): Promise<Token> {
        let parameters: Parameters = this.retrieveParameters();
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('grant_type', 'refresh_token');
        urlSearchParams.append('client_id', parameters.clientId);
        urlSearchParams.append('refresh_token', this.retrieveToken().refresh_token);
        urlSearchParams.append('redirect_uri', parameters.redirectUri);
        return this.http.post(parameters.keyClockUrl + "/token", urlSearchParams, options)
            .toPromise()
            .then(response => {
                this.token = JSON.parse(response.text()) as Token;
                this.storeKeyCloakCookie(this.token);
                return this.token;
            })
            .catch(this.handleError);
    }

    /**
     * postavljanje tokena u cookie
     * @param token trenutni token
     */
    private storeKeyCloakCookie(token: Token) {
        Cookie.delete(this.tokenCookieKey, "/");
        Cookie.set(this.tokenCookieKey, JSON.stringify(token), null, "/");
    }

    /**
     * dohvat tokena iz cookie-a
     * @return Token trenutni token
     */
    private getKeyCloakCookie(): Token {
        let cookie = Cookie.get(this.tokenCookieKey);
        if (cookie) {
            return JSON.parse(Cookie.get(this.tokenCookieKey)) as Token;
        } else {
            return null;
        }
    }

    /**
     * provjera isteka tokena
     * @return boolean token istekao
     */
    private isTokenExpired(): boolean {
        return this.jwtHelper.isTokenExpired(this.retrieveToken().id_token);
    }

    /**
     * provjera isteka refresh tokena
     * @return boolean refresh token istekao
     */
    private isRefreshTokenExpired(): boolean {
        return this.jwtHelper.isTokenExpired(this.retrieveToken().refresh_token);
    }

    /**
     * dohvat tokena iz aplikacije. Ukoliko ne postoji dolazi do
     * dohvata tokena iz cookie-a
     * @return Token trenutni
     */
    private retrieveToken(): Token {
        if (!this.token) {
            this.token = this.getKeyCloakCookie();
        }
        return this.token;
    }

    /**
     * dohvat paramerata iz aplikacije. Ukoliko ne postoji dolazi do
     * dohvata paramerata iz cookie-a
     * @return Parameters
     */
    private retrieveParameters(): Parameters {
        if (!this.parameters) {
            let parametersCookie = Cookie.get(this.tokenCookieParameterKey);
            if (parametersCookie) {
                this.parameters = JSON.parse(Cookie.get(this.tokenCookieParameterKey)) as Parameters;
            } else {
                throw new Error("Parameters not set in the cookie. Please contact your administrator.")
            }
        }
        return this.parameters;
    }

    /**
     * brisanje tokena, parametara i usera iz aplikacije i cookie-a
     */
    private clearData(): void {
        Cookie.delete(this.tokenCookieKey, "/");
        Cookie.delete(this.tokenCookieParameterKey, "/");
        this.token = null;
        this.parameters = null;
        this.user = null;
    }


    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}

class User {
    username: string;
    firstName: string;
    lastName: string;

}
class Token {
    access_token: string;
    expires_in: number;
    id_token: string;
    "not-before-policy": number;
    refresh_expires_in: number;
    refresh_token: string;
    session_state: string;
    token_type: string;
}

class Parameters {
    clientId: string;
    redirectUri: string;
    keyClockUrl: string;
    keyClockCode: string;
}