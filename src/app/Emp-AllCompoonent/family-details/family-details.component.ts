import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Emp_Service/service.service';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';







// datepiker



@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css'],
  


})
export class FamilyDetailsComponent implements OnInit {
  FamilyDetails: any;
  Genderdata: any;
  MaritalStatusdata: any;
  FamilyRelationdata: any;
  SchemeTypedata: any;
  essEmpFamilyDetailsSavedata: any;
  getSchemeTypedata: any;
  submitted!: boolean;
  getEmployeeRegistrationDetailsData: any;
  saveAddFamilyMemberData: any;
  formData:any = [];
  date: any;
  relationship: any;
  
  onItemChange(event:string){
    if (event == '2') {
      this.FamilyDetails.controls['PercentageDisability'].disable();
      // this.FamilyDetails.controls['PercentageDisability'].disable();
    }
    else {
      // this.FamilyDetails.controls['Disability'].enable();
      this.FamilyDetails.controls['PercentageDisability'].enable();
    }
  }

  constructor( private formbuilder: FormBuilder, private apiService: ApiService, private httpclient: HttpClient, private router:Router) {
   }
  ngOnInit(): void {
     this.FamilyDetails = this.formbuilder.group({
      name: ['', Validators.required],
      relationship : ['-1',Validators.required],
      Gender : ['-1',Validators.required],
      Maritalstatus : ['-1',Validators.required],
      dob : ['',Validators.required],
      PhysicallyDisability : ['-1',Validators.required],
      PercentageDisability : ['',Validators.required],
      Dependent : ['',Validators.required],
      Employed : ['',Validators.required],
      Schemes : ['-1',Validators.required],
      NameNominee : ['',Validators.required],
      Relation : ['',Validators.required],
      share : ['',Validators.required],

      
     })
     
     //////////// getGender
    
   this.apiService.getGender().subscribe(res => {
    if (res.data.status = 200) {
      this.Genderdata = res.data
    }
  
  })

     //////////// getMaritalStatus

     this.apiService.getMaritalStatus().subscribe(res => {
      if (res.data.status = 200) {
        this.MaritalStatusdata = res.data
      }
  
    })




     //////////// getFamilyRelation

     this.apiService.getFamilyRelation().subscribe(res => {
      if (res.data.status = 200) {
        this.FamilyRelationdata = res.data
      }
      // console.log(this.FamilyRelationdata)
    })

      //////////// getFamilyRelation

      this.apiService.getSchemeType().subscribe(res => {
        if (res.data.status = 200) {
          this.getSchemeTypedata = res.data
        }
  
      })




 

  }
  OnSubmitAddData(){
       var test = this.FamilyDetails.controls["relationship"].value.split(',');
       var relationshipName=test[1];

       var test1 = this.FamilyDetails.controls["Gender"].value.split(',');
       var Gender=test1[1];

     
      var saveAddFamily = {
        "nameEn":this.FamilyDetails.controls["name"].value,
        "genId":test[0],
        "relationshipId":test1[0],
        "dob":this.FamilyDetails.controls["dob"].value,
        "isWorking":"1",
        "employeeId":"3",
        "createdBy":"1",
        "maritalStatus":"1",
        "disabilityId":"1",
        "disabilityPercentage":"1"
      }

      this.apiService.saveAddFamilyMember(saveAddFamily).subscribe({
        next: (res) => {
          // var DisabilityTypeJson = JSON.parse(res.data);
          // var statusJson = JSON.parse(res.status);
          if (res.status = 200) {
            this.saveAddFamilyMemberData = res.data;
            Object.assign(saveAddFamily, {relationshipName: relationshipName});
            
            this.saveAddFamilyMemberData = res.data;
            Object.assign(saveAddFamily, {Gender: Gender});

            this.formData.push(saveAddFamily)
            // console.log (this.formData)
          }
        },
        error: (err) => {
      
        }
      })
  }

  OnSubmit(){
    this.submitted = true;

    if (this.FamilyDetails.valid) {
    }
    // alert(this.FamilyDetails.controls["name"].value,)
    let data ={
      "name": this.FamilyDetails.controls["name"].value,
      "relationship": this.FamilyDetails.controls["relationship"].value,
      "dob": this.FamilyDetails.controls["dob"].value,
      "gender": this.FamilyDetails.controls["Gender"].value,
      "maritalStatus": this.FamilyDetails.controls["Maritalstatus"].value,
      "physiccallyDisability": this.FamilyDetails.controls["PhysicallyDisability"].value,
      "percentageofDisability": this.FamilyDetails.controls["PercentageDisability"].value,
      "dependent": this.FamilyDetails.controls["Dependent"].value,
      "employed": this.FamilyDetails.controls["Employed"].value,
      "nominee": [
          {
            
              "schemes": this.FamilyDetails.controls["Schemes"].value,
              "nameofNominee": this.FamilyDetails.controls["NameNominee"].value,
              "relation": this.FamilyDetails.controls["Relation"].value,
              "share": this.FamilyDetails.controls["share"].value,
          }
      ]
  }
  

  localStorage.setItem("FamilyDetails",JSON.stringify(data));
      // this.apiService.essEmpFamilyDetailsSave(data).subscribe(res => {
      //   if (res.data.status = 200) {
      //     this.essEmpFamilyDetailsSavedata = res.data
      //   }
     
      //   console.log(this.essEmpFamilyDetailsSavedata)
      // })
      
  }


  
  ComponetLoad(cname:any):void{
    this.router.navigate(['/'+cname])
   }
}
