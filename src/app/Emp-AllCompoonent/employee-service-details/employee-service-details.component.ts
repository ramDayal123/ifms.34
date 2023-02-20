
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Emp_Service/service.service';
 import { GlobalService } from 'src/app/Emp_Service/global.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { DateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-employee-service-details',
  templateUrl: './employee-service-details.component.html',
  styleUrls: ['./employee-service-details.component.css'],


})
export class EmployeeServiceDetailsComponent implements OnInit {
  EmpService: any;
  formGroup: any;
  Districtdata: any;
  submitted !: boolean;
  essEmpServiceDetailsSavedata: any;
  getEmployeeRegistrationDetailsData: any;
  getEntitalmentData: any;

  constructor(private formbuilder: FormBuilder, public global: GlobalService, private apiService: ApiService, private http: HttpClient, router: Router) { }

  ngOnInit(): void {
    this.EmpService = this.formbuilder.group({
      EntitlementStatus: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      ServiceQuota: new FormControl('-1', Validators.required),
      service_Category: new FormControl('-1', Validators.required),
      employeeType: new FormControl('-1', Validators.required),
      serviceSub_Category: new FormControl('-1', Validators.required),
      Gazetted: new FormControl('-1', Validators.required),
      ParentDepartment: new FormControl('-1', Validators.required),
      CurrentDepartment: new FormControl('-1', Validators.required),
      CurrentDesignation: new FormControl('-1', Validators.required),
      AppointedAs: new FormControl('-1', Validators.required),
      AppointmentOrder: new FormControl('', Validators.required),
      OrderIssuingAuthority: new FormControl('', Validators.required),
      GRPPran: new FormControl('', Validators.required),
      StateInsuranceNumber: new FormControl('', Validators.required),
      RGHSNo: new FormControl('', Validators.required),
      GPFNo: new FormControl('', Validators.required),
      PLINo: new FormControl('', Validators.required),
      BeltNo: new FormControl('', Validators.required),
      IAS_CPNF: new FormControl('', Validators.required),


      AppointmentOrderNo: new FormControl('', Validators.required),
      JoiningDateService: new FormControl('', Validators.required),
      AppointmentOrderDate: new FormControl('', Validators.required),
      DatePresentdesgination: new FormControl('', Validators.required),
      DateJoiningPresentDDO: new FormControl('', Validators.required),
      DateConfirmation: new FormControl('', Validators.required),
      IncrementOptedDate: new FormControl('', Validators.required),
      Joiningtime: new FormControl('', Validators.required),
      ex_service_man: new FormControl('', Validators.required),
      ChargeTakenDate: new FormControl('', Validators.required),
      SuperanuationDate: new FormControl('', Validators.required),
      RetirementDate : new FormControl('', Validators.required),
      civil_servicepension: new FormControl (''),
      previous_militaryservice : new FormControl (''),
      JoiningDate : new FormControl (''),



    });


    this.getDisabilityType();
    this.getServiceCategory();
    // this.getPayeeType();
    this.getServiceSubCategory();
    this.getServiceQuota();
    this.getDesignation();
    this.getDepartment();
    this.getCasteCategory();
    this.getEntitalment();

    this.apiService.getEmployeeType().subscribe(res => {
      if (res.data.status = 200) {
        this.EmployeeTypedata = res.data
      }
    })



    // ///getEmployeeRegistrationDetails

    let data = {
      "EmployeeRegistration": "405"
    }
    this.apiService.getEmployeeRegistrationDetails(data).subscribe({

      next: (res) => {
        // var DisabilityTypeJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
        if (res.status = 200) {
          this.getEmployeeRegistrationDetailsData = res.data

          this.EmpService.patchValue({
            AppointmentOrder: res.data[0].REQUESTFILE.appomentOrderNo,
            // fname:res.data[0].REQUESTFILE.fatherName,
            // mname:res.data[0].REQUESTFILE.motherName

          })
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

  EmployeeTypedata: any = [];

  DisabilityTypeData: any = [];
  getServiceCategoryeData: any = [];
  getPayeeTypeData: any = [];
  getServiceSubCategoryData: any = [];
  getServiceQuotaData: any = [];
  getDesignationData: any = [];
  getDepartmentData: any = [];
  getCasteCategoryData: any = [];
  SubServiceCategorydata: any = [];





  getSubServiceCategory(event: any) {
    // alert(event.target.value)
    let requestedData = {
      serviceCategoryId: event.value
    }


    this.apiService.getSubServiceCategory(requestedData).subscribe(res => {
      if (res.data.status = 200) {
        this.SubServiceCategorydata = res.data
      }
      console.log(this.SubServiceCategorydata)
    })






  }


  //get DisabilityType
  getDisabilityType(): void {

    this.apiService.getDisabilityType().subscribe({

      next: (res) => {
        // var DisabilityTypeJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
        if (res.status = 200) {
          this.DisabilityTypeData = res.data
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


  //get getServiceCategorye
  getServiceCategory(): void {

    this.apiService.getServiceCategoryg().subscribe({

      next: (res) => {
        // var getServiceCategoryJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
        if (res.status = 200) {
          this.getServiceCategoryeData = res.data
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


  //get getServiceSubCategory
  getServiceSubCategory(): void {

    this.apiService.getServiceSubCategory().subscribe({

      next: (res) => {
        // var getServiceSubCategoryJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
        if (res.status = 200) {
          this.getServiceSubCategoryData = res.data
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



  //get Service Quota
  getServiceQuota(): void {

    this.apiService.getServiceQuota().subscribe({

      next: (res) => {

        if (res.status = 200) {
          this.getServiceQuotaData = res.data
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




  //get Service Quota
  getDesignation(): void {
    this.apiService.getDesignation().subscribe({

      next: (res) => {
        // var getDesignationJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
        if (res.status = 200) {
          this.getDesignationData = res.data
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







  //getDepartment
  getDepartment(): void {
    this.apiService.getDepartment().subscribe({

      next: (res) => {

        if (res.status = 200) {
          this.getDepartmentData = res.data

          // console.log (this.getDepartmentData)
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


  //getCasteCategory
  getCasteCategory(): void {
    this.apiService.getCasteCategory().subscribe({

      next: (res) => {

        if (res.status = 200) {
          this.getCasteCategoryData = res.data
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




    //getCasteCategory
    getEntitalment(): void {
 
      this.apiService.getEntitalment().subscribe({
  
        next: (res) => {
  
          if (res.status = 200) {
            this.getEntitalmentData = res.data
            // console.table(this.getEntitalmentData)
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
  
  




  



  JanaadhaarData: any[] = [];

  GetJanaadhaarData(janaadhaar: any): void {
    let requestedData: any = { "janaadhaar": janaadhaar }
    this.apiService.GetJanaadhaarData(requestedData).subscribe({

      next: (res) => {

        let data = Object.values(res);
        for (let i = 0; i < data[1].length; i++) {
          this.JanaadhaarData.push(data);
        }
        console.log(this.JanaadhaarData[0][0].status);

      },
      error: (err) => {
        let errorObj = {
          message: err.message,
          err: err,
          response: err
        }

        alert(err.error.message)
      }
    })







  }



  OnSubmit() {
debugger
    this.submitted = true;
    if (this.EmpService.invalid) {

      // alert( this.EmpService.value.JoiningDate)
      let data = {
        
   
              "annualIncrementDate": this.EmpService.value.IncrementOptedDate,
               "gpfNO": this.EmpService.value.GPFNo,
               "subServiceCategory": this.EmpService.value. serviceSub_Category,
               "iasCpneNo": this.EmpService.value.IAS_CPNF,
               "dateOfPresentDesignation": this.EmpService.value.DatePresentdesgination,
               "currentDesignation": this.EmpService.value.CurrentDesignation,
              "joiningDate": this.EmpService.value.JoiningDate,
               "appointmentOrderDate": this.EmpService.value.AppointmentOrderDate,
               "serviceCategory": this.EmpService.value.service_Category,
               "appointmentOrderNo": this.EmpService.value.AppointmentOrderNo,
               "pranType": this.EmpService.value.GRPPran,
               "beltNo": this.EmpService.value.BeltNo,
               "pliNo": this.EmpService.value.PLINo,
               "entitlementStatus": this.EmpService.value.EntitlementStatus,
               "dateOfConfirmationInPresentCadre": this.EmpService.value.DateConfirmation,
               "dateOfJoiningPresentDDO": this.EmpService.value.DateJoiningPresentDDO,
               "dateOfJoingRegularService": this.EmpService.value.JoiningDateService,
               "appointedAs": this.EmpService.value.AppointedAs,
               "parentDepartment": this.EmpService.value.ParentDepartment,
               "retirementDate": this.EmpService.value.RetirementDate,
               "rghsNO": this.EmpService.value.RGHSNo,
               "areYouExServiceMan": this.EmpService.value.ex_service_man,
               "areYouGettingCivilServicePension": this.EmpService.value.civil_servicepension,
               "stateInsuranceNumber": this.EmpService.value.StateInsuranceNumber,
               "gazetted": this.EmpService.value.Gazetted,
               "appointingAuthority": this.EmpService.value.AppointmentOrderDate,
               "serviceQuota": this.EmpService.value.ServiceQuota,
               "employeeType": this.EmpService.value.employeeType,
               "orderIssuingAuthoruity": this.EmpService.value.OrderIssuingAuthority,
               "joiningTime": this.EmpService.value.Joiningtime,
               "currentDepartment": this.EmpService.value.CurrentDepartment,
               "arYouGettingPensionFromThePreviousMilitaryService": this.EmpService.value.previous_militaryservice,

      }
      localStorage.setItem("EmpService",JSON.stringify(data));
      // getServiceCategoryg
      // this.apiService.essEmpServiceDetailsSave(data).subscribe(res => {
      //   if (res.data.status = 200) {
      //     this.essEmpServiceDetailsSavedata = res.data
      //   }
      //   // console.log(this.essEmpServiceDetailsSavedata)
      // })

    }



  }

}
