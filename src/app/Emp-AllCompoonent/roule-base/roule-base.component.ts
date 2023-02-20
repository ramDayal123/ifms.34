import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ApiService } from 'src/app/Emp_Service/service.service';

@Component({
  selector: 'app-roule-base',
  templateUrl: './roule-base.component.html',
  styleUrls: ['./roule-base.component.css']
})
export class RouleBaseComponent implements OnInit {
  http: any;
  resp: any;
  makerDataList: any;
  checkerDataList: any;
  approverDataList: any;
  forwarder: any;
  
  constructor(private router:Router,private _Service:ApiService) { }

  ngOnInit(): void {
    let makerData =
    {
      "aid": 56810,
      "levelId": 1,
      "levelName": "OFFICE",
      "levelValueCode": "15",
      "roleId": 81,
      "roleName": "Staff"
    }

    let checkerData =
    {
      "aid": 58194,
      "levelId": 1,
      "levelName": "OFFICE",
      "levelValueCode": "875195",
      "roleId": 29,
      "roleName": "DDO"
    }

    let approverData =
    {
      "aid": 56546,
      "levelId": 1,
      "levelName": "OFFICE",
      "levelValueCode": "206",
      "roleId": 48,
      "roleName": "HoD"
    }
    
    this.makerDataList = makerData
    this.checkerDataList = checkerData
    this.approverDataList = approverData
  }

  makerToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzc29pZCI6IlJKSlAyMDA3MTcwMDc0MDYiLCJ1c2VySWQiOiI1NDY5MCIsImVtcGxveWVlSWQiOiIzMDE4MTUiLCJkaXNwbGF5TmFtZSI6IlZJSkFZIFNIQVJNQSJ9.qjtk48baqTVPHIjYbJttMg0pecH8u8kAXw-06aFqyVs';
  checkerToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzc29pZCI6IlJKQUwxOTg1MDIwMTIyMzYiLCJ1c2VySWQiOiI1NDE3NCIsImVtcGxveWVlSWQiOiIyNDMxMTY3IiwiZGlzcGxheU5hbWUiOiJSQU0gQ0hBUkFOIE1FRU5BIn0.ObrjSTNSjyomobCMoo4WISqOWEVyaG1JKbfhv1gl6Ck';
  approverToken: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzc29pZCI6IlJKQUoxOTk2MDEwMjUzNjEiLCJ1c2VySWQiOiI1NDE2OSIsImVtcGxveWVlSWQiOiIxMzIyMTk5IiwiZGlzcGxheU5hbWUiOiJIQVJJIFNJTkdIIE1FRU5BIn0.r0crGhPZfLcEtt8MfgUtU280OmuDsrOnPjIwFSuritY';
  

  setToken(type: any, tokenValue: any, datalist: any) {
    
    localStorage.setItem('token', JSON.stringify(tokenValue));

    this.forwarder = type === "maker" ? "/Employee_Basic" : "/Inbox";

    let data =
    {
      "aid": datalist.aid,
      "levelId": datalist.levelId,
      "levelName": datalist.levelName,
      "levelValueCode": datalist.levelValueCode,
      "roleId": datalist.roleId,
      "roleName": datalist.roleName,
      "Headers": {
        "token": localStorage.getItem('token')
      }
    }
    

    this._Service.callAPI(data, 'getMPJWTToken').subscribe({
      next: (res) => {
        if (res.status = 200) {
          console.log("data is:", res)
          debugger
          this.getDecodedAccessToken(res.data, datalist.aid);
          debugger
          localStorage.setItem('mpJWTToken', JSON.stringify(res.data));
        }
      },
      error: (err) => {
        let errorObj = {
          message: err.message,
          err: err,
          response: err
        }
      }
    })
  }

  getDecodedAccessToken(token: string, id: any): any {
    try {
      let mytoken = jwt_decode(token);

      localStorage.setItem('userInfo', JSON.stringify(mytoken));
      this.router.navigateByUrl(this.forwarder);
    }
    catch (Error) {
      return null;
    }
  }

  
}


