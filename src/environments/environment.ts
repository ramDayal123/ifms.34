// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from "@angular/common/http";


// const baseUrl = "http://172.22.32.100:5001/";
const baseUrl04 = "http://172.22.32.95:5006/employeemdm/v1.0/";

const baseUrl01 = "http://172.22.32.95:6002/employeeess/v1.0/";
const baseUrl02 = "http://172.22.32.95:6003/employeemst/v1.0/";
const baseUrl03 = "http://172.22.32.100:5001/";

const workflowAPIUrl = "http://172.22.32.95:6004/employeewfSvc/wf/v1.0/";


  const baseUrl05= "http://172.22.32.100:5004/employeewf/v1.0/"
  const baseUrl06 = "http://172.22.32.100:5006/employeepayee/v1.0/";

  const mpJWTTokenAPI ="http://172.22.32.26:8085/mp/"





  

    // http://172.22.32.95:6004/employeewfSvc/wf/v1.0/inbox


  // // http://172.22.32.95:6002/employeeess/v1.0/essEmployeePersonalDetailsSave
  // http://172.22.32.95:6002/employeeess/v1.0/empRegistrationSave








export const environment = {
  production: false,
  baseUrl04: baseUrl04,
  baseUrl01: baseUrl01,
  baseUrl02: baseUrl02,
  baseUrl03: baseUrl03,
  baseUrl05: baseUrl05,
  baseUrl06: baseUrl06,
  workflowAPIUrl:workflowAPIUrl,
  mpJWTTokenAPI: mpJWTTokenAPI,


  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'token':localStorage.getItem('token')!  
    })
  }


  // httpOptions: {
  //   headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*'
  //   })
  // }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
