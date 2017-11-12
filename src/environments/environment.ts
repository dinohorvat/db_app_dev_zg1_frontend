// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  endpoint: 'http://localhost:8080/dcs/',
  keyCloak: {
    basicUrl:"http://localhost:8095/auth/realms/DxhDev/protocol/openid-connect",
    clientId:"GUI"
  },
  applicationUrl:"http://localhost:4200"};
