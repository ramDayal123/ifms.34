import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Emp_Service/service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-pay-entitlement',
  templateUrl: './pay-entitlement.component.html',
  styleUrls: ['./pay-entitlement.component.css']
})
export class PayEntitlementComponent implements OnInit {
  PayEntitlement!: FormGroup;
  HRAData: any;
  DAdata: any;
  PayCommisiondata: any;
  Designationdata: any;
  essEmpPayEntitlementSavedata: any;
  submitted!: boolean;
 
 

  constructor(private formbuilder: FormBuilder, private apiService: ApiService, private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    this.PayEntitlement = this.formbuilder.group({
      service_Category:  new FormControl('-1',Validators.required),
      serviceSub_Category:  new FormControl('-1',Validators.required),
      Designation:  new FormControl('-1',Validators.required),
      Commission:  new FormControl('-1',Validators.required),
      Darate: new FormControl('-1',Validators.required),
      HRAData:  new FormControl('1',Validators.required),
      PayOptedDate :  new FormControl('',Validators.required),
      PayBandScale :  new FormControl('-1',Validators.required),
      gradedatePay :  new FormControl('',Validators.required),
      BasicPay :  new FormControl('-1',Validators.required),
      GovtQuarter :  new FormControl('',Validators.required),
      gradePay :  new FormControl('',Validators.required),
      HoA :  new FormControl("",Validators.required),
      si: new FormControl (''),
      income_tax : new FormControl (''),
      present_PayScale :  new FormControl("",Validators.required),
      city_compensatory :  new FormControl("",Validators.required),
      NPA :  new FormControl("",Validators.required),
      GPF :  new FormControl("",Validators.required),
      NPS :  new FormControl("",Validators.required),
      siv :  new FormControl("",Validators.required),
      Professional_Tax :  new FormControl("",Validators.required),
      Other :  new FormControl("",Validators.required),
      Corp_Details:  new FormControl("",Validators.required),
      dob_words : new FormControl("",Validators.required),
      Grade_Pay : new FormControl("",Validators.required),
    

      
    })
  
    this.getServiceCategory();
   
  }
  OnSubmit(){
    this.submitted = true;
    if (this.PayEntitlement.invalid) {
    let data ={
      "serviceCategory":this.PayEntitlement.controls["service_Category"].value,
      "subServiceCategory":this.PayEntitlement.controls["serviceSub_Category"].value,
      "designation":this.PayEntitlement.controls["Designation"].value,
      "payCommission":this.PayEntitlement.controls["Commission"].value,
      "payOptedDate":this.PayEntitlement.controls["PayOptedDate"].value,
      "entryInExistingPayBand":this.PayEntitlement.controls["gradedatePay"].value,
      "payBandScale":this.PayEntitlement.controls["PayBandScale"].value,
      "gradePay":this.PayEntitlement.controls["gradePay"].value,
      "basicPay":this.PayEntitlement.controls["BasicPay"].value,
      "hoa":this.PayEntitlement.controls["HoA"].value,
      "daRate":this.PayEntitlement.controls["Darate"].value,
      "govtQuarter":this.PayEntitlement.controls["GovtQuarter"].value,
      "hraRate":this.PayEntitlement.controls["HRAData"].value,
      "other": this.PayEntitlement.controls["Other"].value,
      "payLevel": "dfgdfg",
      "cityCompenstoryAllowance": this.PayEntitlement.controls["city_compensatory"].value,
      "dateOfPresentPayScale": "dfgdg",
      "cropDetals": "fdgg",
      "dateOfEntryInExistingPayBandGradepay": "2022-12-12",
      "inComeTax": this.PayEntitlement.controls["income_tax"].value,
      "dateOf7thPayOptedDate": "2022-12-12",
      "nps": this.PayEntitlement.controls['NPS'].value,
      "si":this.PayEntitlement.controls["si"].value,
      "professionalTax": this.PayEntitlement.controls['NPS'].value,
      "houseRentAllowance": this.PayEntitlement.controls['NPS'].value,
      "gpf": "bv",
      "npa": this.PayEntitlement.controls['NPA'].value,
      "dearnessAllowance": this.PayEntitlement.controls['NPS'].value,
      }


      localStorage.setItem("PayEntitlement",JSON.stringify(data));
        // getServiceCategoryg
    // this.apiService.essEmpPayEntitlementSave(data).subscribe(res => {
    //   if (res.data.status = 200) {
    //     this.essEmpPayEntitlementSavedata = res.data
    //   }

    // })
      
  }
}

  getServiceCategoryeData:any=[];
  SubServiceCategorydata:any=[];

  getSubServiceCategory(event: any) {
    // alert(event.target.value)
    let requestedData = {
      serviceCategoryId: event.value
    }

    
    this.apiService.getSubServiceCategory(requestedData).subscribe(res => {
      if (res.data.status = 200) {
        this.SubServiceCategorydata = res.data
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


        
   // getDesignation
   this.apiService.getDesignation().subscribe(res => {
    if (res.data.status = 200) {
      this.Designationdata = res.data
    }
  })

  // getPayCommision

  this.apiService.getPayCommision().subscribe(res => {
    if (res.data.status = 200) {
      this.PayCommisiondata = res.data
    }

  })
  

    // getDaRate
    this.apiService.getDaRate().subscribe({

      next: (res) => {
        // var DcocumentJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
        if (res.status = 200) {
          this.DAdata = res.data
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
  

// ///// getHra
    this.apiService.getHra().subscribe({

      next: (res) => {
        // var DcocumentJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
        if (res.status = 200) {
          this.HRAData = res.data
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
    ComponetLoad(cname:any):void{
      this.router.navigate(['/'+cname])
     }
  }
 
