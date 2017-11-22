/**
 * Created by HrvojeGrgic on 21/11/2017.
 */

export class EmailModel{
    destinationEmail: String;
    subject: String;
    text: String;


    constructor(emailAddress?: String, emailTitle?: String, emailBody?: String) {
        this.destinationEmail = emailAddress;
        this.subject = emailTitle;
        this.text = emailBody;
    }
}