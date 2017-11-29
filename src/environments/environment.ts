// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  endpoint: 'http://159.89.15.128:8001/dcs/',
  // endpoint: 'http://localhost:8095/dcs/',
  keyCloak: {
    basicUrl:"http://159.89.15.128:8080/auth/realms/DCS/protocol/openid-connect",
    admin: "http://159.89.15.128:8080/auth/admin/realms/DCS/",
    clientId:"DCS-GUI"
  },
  applicationUrl:"http://159.89.15.128:4200"

};
