
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Emp_Service/service.service';
import { GlobalService } from 'src/app/Emp_Service/global.service';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {


// checked = false;
indeterminate = false;
labelPosition: 'before' | 'after' = 'after';
disabled = false;

  essEmployeeAddressSavedata: any;
  rid:any;
  saveAddress! : FormGroup;
  selectedRecord: any;
  State: any;
  district: any;
  blockId:any;
  getBlockdata: any;
  submitted !: boolean;
  Villageydata: any;
  Warddata: any;
  flag: any;
  getWarddata: any;
  MuncipalID: any;
  block_panchayat: boolean=true;
  Municipal_ward: boolean=false;
  checked: boolean = false
  

  
  onItemChange12(event:string){
    if (event == '2') {
      this.saveAddress.controls['village'].disable();
   
    }
    else {

      this.saveAddress.controls['village'].enable();
    }
  }


  constructor(private formbuilder: FormBuilder,  private apiService: ApiService,public global: GlobalService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getState();

    this.saveAddress = this.formbuilder.group({
      State : new FormControl ('-1',Validators.required),
      StateP : new FormControl ('-1',Validators.required),
      District : new FormControl  ('-1',Validators.required),
      Rural : new FormControl  ('',Validators.required),
      Urban : new FormControl  ('-1',Validators.required),
      BlockMuncipal : new FormControl  ('-1',Validators.required),
      block: new FormControl  ('-1',Validators.required),
      Muncipal : new FormControl  ('-1',Validators.required),
      Panchayat :new FormControl   ('-1',Validators.required),
      Ward :new FormControl   ('2',Validators.required),
      PanchayatWard :new FormControl   ('-1',Validators.required),
      Assembly : new FormControl  ('',Validators.required),
      pincode : new FormControl  ('',Validators.required),
      HouseNo : new FormControl  ('',Validators.required),
      area : new FormControl  ('0', Validators.required),
      village : new FormControl ('-1',Validators.required),
      add_type : [''],
      cstate: [''],
      cdistrict: [''],
      carea: [''],
      cblock: [''],
      cpanchayat: [''],
      cmunicipal: [''],
      cward: [''],
      cvillage: [''],
      cpincode: [''],
      chouseNo: [''],
      cassembly:[''],
   })
  
   this.saveAddress.controls["PanchayatWard"].disable();
  }

  

  
  Statedata:any=[];
  StatedataP:any=[];
  area:string = ''; 
  state:string='';



   
  getState(): void{
    this.apiService.getState().subscribe({
      next: (res) => {
        // var MaritalStatusJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
        if (res.status = 200) {
          this.Statedata = res.data
          this.StatedataP = res.data
        }
      },
      error: (err) => {
        let errorObj = {
          message: err.message,
          err: err,
          response: err
        }
        // alert("error while fatching data from get MaritalStatus ");
        // console.log("error from get MaritalStatus api is ", errorObj);
        // console.log("error from get MaritalStatus api is ", err);
        // alert(err.error.message)
      }
    })
  }



  Districtdata:any=[];
  getDistrict(event:any){
    this.state=event.value;
    this.apiService.getDistrict(this.state).subscribe({
      next: (res) => {
        if (res.status = 200) {
          this.Districtdata = res.data        
        }
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

   onBlockChange(){
    this.State =this.saveAddress.value.State
    this.district = this.saveAddress.value.District
    let requestedData = {
      "istateId":this.State,
      "idistrictId":this.district
      }
      this.apiService.getBlock(requestedData).subscribe({
        
        next: (res) => {
          if (res.status = 200) {
            this.BlockCitydata = res.data
            
          }
          console.log (this.BlockCitydata)
          
        },
        error: (err) => {
          let errorObj = {
            message: err.message,
            err: err,
            response: err
          }
          // alert("error while fatching data from get MaritalStatus ");
          // console.log("error from get MaritalStatus api is ", errorObj);
          // console.log("error from get MaritalStatus api is ", err);
          // alert(err.error.message)
        }
      })

   }




   changeValue(value:any) {
   if(this.checked = !value){
 this.saveAddress.patchValue({
       cstate: this.saveAddress.controls["State"].value,
       cdistrict :this.saveAddress.controls["District"].value,
       carea: this.saveAddress.controls["area"].value, 
       cblock:  this.saveAddress.controls["block"].value,
       cpanchayat: this.saveAddress.controls["Panchayat"].value,
       cmunicipal: this.saveAddress.controls["Muncipal"].value,
       cward :this.saveAddress.controls["Ward"].value,
       cvillage: this.saveAddress.controls["village"].value,
       cpincode: this.saveAddress.controls["pincode"].value, 
       chouseNo:this.saveAddress.controls["HouseNo"].value,
       cassembly:this.saveAddress.controls["Assembly"].value
     });

   }
   else{
    
     this.saveAddress.patchValue({
      cstate: [''],
      cdistrict: [''],
      carea: [''],
      cblock: [''],
      cpanchayat: [''],
      cmunicipal: [''],
      cward: [''],
      cvillage: [''],
      cpincode: [''],
      chouseNo: [''],
      cassembly:[''],
    });
   }
   
    }




    
   onAreaItemChange(id:any){
    this.area=id

    if(this.area=='1'){
    this.block_panchayat=false;
    this.Municipal_ward=true;
    }


    else{
      this.block_panchayat=true;
      this.Municipal_ward=false;
    }

    this.State =this.saveAddress.value.State
    this.district = this.saveAddress.value.District
    let requestedData = {
      "istateId":this.State,
      "idistrictId":this.district
      }
      this.apiService.getBlockMunicipal(requestedData).subscribe({
        next: (res) => {
          if (res.status = 200) {
            this.Muncipaldata = res.data
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





   
   Muncipaldata:any=[];
   onItemChange1(event:any){
    this.area = event.value;
    alert(this.area)
    this.district = (<HTMLInputElement>document.getElementById("districtCd")).value;
    //  this.district = (<HTMLInputElement>document.getElementById("districtCd")).value;

    let requestedData = {
      "idistrictId":1,
      "istateId":  1
      }
      this.apiService.getBlockMunicipal(requestedData).subscribe({

        next: (res) => {
          // var MaritalStatusJson = JSON.parse(res.data);
          // var statusJson = JSON.parse(res.status);
          if (res.status = 200) {
            this.Muncipaldata = res.data
          }
        },
        error: (err) => {
          let errorObj = {
            message: err.message,
            err: err,
            response: err
          }
          // alert("error while fatching data from get MaritalStatus ");
          // console.log("error from get MaritalStatus api is ", errorObj);
          // console.log("error from get MaritalStatus api is ", err);
          // alert(err.error.message)
        }
      })
   }








   BlockCitydata:any=[];
   onItemChange(event:any){
    this.area = event.value;
    this.district = (<HTMLInputElement>document.getElementById("districtCd")).value;
    let requestedData = {
      "istateId":"1",
      "idistrictId":"1"
      }
      this.apiService.getBlock(requestedData).subscribe({
        
        next: (res) => {
          if (res.status = 200) {
            this.BlockCitydata = res.data
            
          }
          console.log (this.BlockCitydata)
          
        },
        error: (err) => {
          let errorObj = {
            message: err.message,
            err: err,
            response: err
          }
          // alert("error while fatching data from get MaritalStatus ");
          // console.log("error from get MaritalStatus api is ", errorObj);
          // console.log("error from get MaritalStatus api is ", err);
          // alert(err.error.message)
        }
      })
   }











   PanchayatWardata:any=[];
   getPanchayatWard2(event:any){
    this.blockId = event.value;


    let requestedData = {
      "istateId":1,
    "idistrictId":1,
    "iblockId":1
    }
 
      this.apiService.getGramPanchayat(requestedData).subscribe({

        next: (res) => {
          // var MaritalStatusJson = JSON.parse(res.data);
          // var statusJson = JSON.parse(res.status);
     
          if (res.status = 200) {
            this.PanchayatWardata = res.data

           
            this.saveAddress.controls["PanchayatWard"].enable();

          }
        },
        error: (err) => {
          let errorObj = {
            message: err.message,
            err: err,
            response: err
          }
          // alert("error while fatching data from get MaritalStatus ");
          // console.log("error from get MaritalStatus api is ", errorObj);
          // console.log("error from get MaritalStatus api is ", err);
          // alert(err.error.message)
        }
      })
   }


   getPanchayatWard3(event:any){
  
    this.blockId = event.value;
 
  let data = {
    "stateId":1,
    "distiId":1,
    "blockId":1,
    "gramPanchayatId":1,
    }
       this.apiService.getVillage(data).subscribe({
  
         next: (res) => {
           // var MaritalStatusJson = JSON.parse(res.data);
           // var statusJson = JSON.parse(res.status);
           if (res.status = 200) {
             this.Villageydata = res.data
           }
         },
         error: (err) => {
           let errorObj = {
             message: err.message,
             err: err,
             response: err
           }
           // alert("error while fatching data from get MaritalStatus ");
           // console.log("error from get MaritalStatus api is ", errorObj);
           // console.log("error from get MaritalStatus api is ", err);
           // alert(err.error.message)
         }
       })
  }
   Villagedata:any=[];
   getVillage(event:any){
    let gpId = event.value;
    // let BlockCity = $('#BlockCitydata').val();
    let requestedData = {
      "gpId":gpId,
      }
   
   }
   getPanchayatWard (event:any){

    this.MuncipalID = event.value;
    let  datas ={
      "istateId": 1,
      "idistrictId": 1,
      "imunPId": 1
    }
     this.apiService.getWard(datas).subscribe({

       next: (res) => {
         // var MaritalStatusJson = JSON.parse(res.data);
         // var statusJson = JSON.parse(res.status);
         if (res.status = 200) {
           this.getWarddata = res.data
         }
         console.log (res)
       },
       error: (err) => {
         let errorObj = {
           message: err.message,
           err: err,
           response: err
         }
         // alert("error while fatching data from get MaritalStatus ");
         // console.log("error from get MaritalStatus api is ", errorObj);
         // console.log("error from get MaritalStatus api is ", err);
         // alert(err.error.message)
       }
     })
    
   }
   getAssembly()
   {
 }

//  clickTypeOFAddress(event:any){
//    }



    onSubmit() {
     
      if(this.saveAddress.controls["add_type"].value=='true'){
     this.flag=1
      }
      else{
        this.flag=0
      }
      if (this.saveAddress.invalid) {
        this.submitted = true;
      let data ={
          "pstate":this.saveAddress.controls["State"].value,
          "pdistrict":this.saveAddress.controls["District"].value,
          "parea": this.saveAddress.controls["area"].value,
          "pblock": this.saveAddress.controls["block"].value,
          "Ppanchayat":this.saveAddress.controls["Panchayat"].value,
          "pward":this.saveAddress.controls["Ward"].value,
          "pmunicipal":this.saveAddress.controls["Muncipal"].value,
          "pvillage":this.saveAddress.controls["village"].value,
          "phouseNo": this.saveAddress.controls["HouseNo"].value,
          "ppincode": this.saveAddress.controls["pincode"].value,
          "passembly": this.saveAddress.controls["Assembly"].value,
          "cstate": this.saveAddress.controls["cstate"].value,
          "cdistrict":this.saveAddress.controls["cdistrict"].value,
          "carea": this.saveAddress.controls["carea"].value,
          "cblock": this.saveAddress.controls["cblock"].value,
          "cvillage": this.saveAddress.controls["cvillage"].value,
          "chouseNo": this.saveAddress.controls["chouseNo"].value,
          "cpincode": this.saveAddress.controls["cpincode"].value,
          "cassembly": this.saveAddress.controls["cassembly"].value,
          "cpanchayat":this.saveAddress.controls["cpanchayat"].value,
          "cward":this.saveAddress.controls["cward"].value,
          "cmunicipal":this.saveAddress.controls["cmunicipal"].value,
          "flag":this.flag,

          "requestId": 4,
          "officeId": 6,
          "createdBy": 1,
          }
          

    localStorage.setItem("saveAddress",JSON.stringify(data));
     // getServiceCategoryg
    //  this.apiService.essEmployeeAddressSave(data).subscribe(res => {
    //   if (res.data.status = 200) {
    //     this.rid = res.data.requestId

    //   alert(res.data.message + ' for Request Id ' + this.rid)
    //   }
    // })
  }
     
    }





       // autolode data selecter
  setFormValue(formname: FormGroup, fields: []): any {

  }


    ComponetLoad(cname:any):void{
      this.router.navigate(['/'+cname]);
    }
}
