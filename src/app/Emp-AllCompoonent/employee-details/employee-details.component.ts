import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Emp_Service/service.service';
import { GlobalService } from 'src/app/Emp_Service/global.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';





import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  providers: [DatePipe

  ],


})


export class EmployeeDetailsComponent implements OnInit {
  todayString: string = new Date().toDateString();
  todayISOString: string = new Date().toISOString();


  EmpPersonalDetail!: FormGroup
  DisabilityTypeData: any;
  Districtdata: any;
  essEmployeePersonalDetailsSavedata: any;
  // getEmployeeRegistrationDetailsData: any;
  actiondata: any;
  disableTextbox = false;
  EmpSelfDetailForm: any;
  checked: any;
  JanadharInfodata: any;
  EmpRegistration: any;
  disableSearch: any;

  // difine varible 
  MaritalStatusdata: any = [];
  GenderData: any = [];
  BloodGroupdata: any = [];
  getCasteCategoryData: any = [];
  getDisabilityData: any = []
  selectedRecord: any = {};
  empid: any;
  submitted = false;
  getRiligondata: any;
  getNationalitydata: any;




  onItemChange(event: string) {
    if (event == '2') {
      this.EmpPersonalDetail.controls['Disability'].disable();
      this.EmpPersonalDetail.controls['Percentage_Disability'].disable();

      this.EmpPersonalDetail.patchValue({
        Disability: '',
        Percentage_Disability: ''

      });
    }
    else {
      this.EmpPersonalDetail.controls['Disability'].enable();
      this.EmpPersonalDetail.controls['Percentage_Disability'].enable();
      this.EmpPersonalDetail.patchValue({
        Disability: this.EmpPersonalDetail.controls["Disability"].value,
        Percentage_Disability: this.EmpPersonalDetail.controls["Percentage_Disability"].value,

      });
    }
  }
  constructor(private formbuilder: FormBuilder, private apiService: ApiService,
    public global: GlobalService, private http: HttpClient, private router: Router, private datePipe: DatePipe) { }



  //  validation



  ngOnInit(): void {

    this.EmpPersonalDetail = this.formbuilder.group({

      JanAadharId: new FormControl(""),
      employeeType: new FormControl("-1", Validators.required),
      MemberID: new FormControl("", Validators.required),
      JanadharInfodata: new FormControl('', [Validators.required, Validators.minLength(10)]),
      Name: ['', Validators.required],
      middle_name: ['',],
      last_name: [''],
      height: ['',],
      gender: ['-1',],
      matrial: ['-1', Validators.required],
      fname: ['', Validators.required],
      mname: ['',],
      sname: ['',],
      mobileno: ['', Validators.required],
      emailid: ['',],
      CATEGORY_ID: ['-1', Validators.required],
      dob: ['', Validators.required],
      dob_words: ['', Validators.required],
      Identification: ['', Validators.required],
      Blood_Group: ['-1',],
      Disability: ['-1', Validators.required],
      district_id: ['-1', Validators.required],
      Home_Town: ['-1', Validators.required],
      Belongs_Minority: [''],
      Disability_Status: ['', Validators.required],
      nationalitys: ['', Validators.required],
      Percentage_Disability: ['', Validators.required],
      religion: ['', Validators.required],
      addharRef: ['',],
      PassportNo: ['',],
      pancardNo: ['',],
      dobInWord: ['',],
      id: ['']

    });

    this.apiService.emp_service.subscribe((data: any) => {
      this.Employee_persanol();
          
        }
      )


    ///////////////////get Gender




    ////////////////get Gender

    this.apiService.getBloodGroup().subscribe({
      next: (res) => {
        // var genderJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
        if (res.status = 200) {

          this.BloodGroupdata = res.data
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

    //getCasteCategory

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

    this.apiService.getDistrict(1).subscribe({

      next: (res) => {
        // var DisabilityTypeJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
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

      }
    })

    // ///getDisabilityType

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
    this.getMaritalStatus();
    this.getRiligon();
    this.getNationality();
    this.getGender();

    // alert(localStorage.getItem('emp'))
  }

  getGender(): void {
    this.apiService.getGender().subscribe({

      next: (res) => {
        // var genderJson = JSON.parse(res.data);
        // var statusJson = JSON.parse(res.status);
        if (res.status = 200) {

          this.GenderData = res.data
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




  //////////////////get Matrital Status
  getMaritalStatus(): void {
    this.apiService.getMaritalStatus().subscribe({

      next: (res) => {

        if (res.status = 200) {

          this.MaritalStatusdata = res.data

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


  //////////////////get getRiligon
  getRiligon(): void {
    this.apiService.getRiligon().subscribe({

      next: (res) => {

        if (res.status = 200) {

          this.getRiligondata = res.data

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


  //////////////////get getNationality
  getNationality(): void {
    this.apiService.getNationality().subscribe({

      next: (res) => {

        if (res.status = 200) {

          this.getNationalitydata = res.data


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


  get mobileno() {
    return this.EmpPersonalDetail.get('mobileno')!;
  }




  Employee_persanol() {
    this.submitted = true;

    if (this.EmpPersonalDetail.invalid) {    
      this.apiService.emp_service1.next(2)
    }
    else{
      let data =
      {

        "homeDistrict": this.EmpPersonalDetail.controls["district_id"].value,
        "janAadharId": this.JanAadharId,
        "memberId": this.EmpPersonalDetail.controls["MemberID"].value,
        "fatherName": this.EmpPersonalDetail.controls["fname"].value,
        "gender": this.EmpPersonalDetail.controls["gender"].value,
        "identificationMark": this.EmpPersonalDetail.controls["Identification"].value,
        "mobileNumber": this.EmpPersonalDetail.controls["mobileno"].value,
        "motherName": this.EmpPersonalDetail.controls["mname"].value,
        "disablilityStatus": this.EmpPersonalDetail.controls["Disability_Status"].value,
        "emailID": this.EmpPersonalDetail.controls["emailid"].value,
        "socialcategory": this.EmpPersonalDetail.controls["CATEGORY_ID"].value,
        "belongsToMinority": this.EmpPersonalDetail.controls["Belongs_Minority"].value,
        "firstName": this.EmpPersonalDetail.controls["Name"].value,
        "bloodGroup": this.EmpPersonalDetail.controls["Blood_Group"].value,
        "typeofDisability": this.EmpPersonalDetail.controls["Disability"].value,
        "homeTown": this.EmpPersonalDetail.controls["Home_Town"].value,
        "nationality": this.EmpPersonalDetail.controls["nationalitys"].value,
        "dob": this.EmpPersonalDetail.controls["dob"].value,
        "percentageofDisability": this.EmpPersonalDetail.controls["Percentage_Disability"].value,
        "spouseName": this.EmpPersonalDetail.controls["sname"].value,
        "maritalStatus": this.EmpPersonalDetail.controls["matrial"].value,
        "height": this.EmpPersonalDetail.controls["height"].value,
        "middleName": this.EmpPersonalDetail.controls["middle_name"].value,
        "lastName": this.EmpPersonalDetail.controls["last_name"].value,
        // "aadharRefNo" :this.EmpPersonalDetail.controls["addharRef"].value,
        "aadharRefNo": "233482813842",
        "religion": this.EmpPersonalDetail.controls["religion"].value,
        "pan": this.EmpPersonalDetail.controls["pancardNo"].value,
        "passport": this.EmpPersonalDetail.controls["PassportNo"].value,
        //  "dobInWord":this.EmpPersonalDetail.controls["dobInWord"].value
      }

      debugger
      this.apiService.essEmployeePersonalDetailsSave(data).subscribe(res => {
        if (res.data.status = 200) {
          localStorage.setItem("Employee_persanol", JSON.stringify(data));
        }
      })
    }

  }




  addEmpDet() {
    // console.log(this.empPerDetForm.value);
  }

  // sweet alert massage


  // Only Integer Numbers
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }



  // Only AlphaNumeric
  keyPressAlphaNumeric(event: any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }

  }
  // sweet alert massage
  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharactersAlpha(event: any) {

    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z-_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


  ComponetLoad(cname: any): void {
    this.router.navigate(['/' + cname])
  }






  //   validation


  numberOnly(event: { which: any; keyCode: any; }): boolean {

    //alert(this.EmpRegistration.controls['JanadharInfodata'].valid);
    this.disableSearch = true;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;

    }
    return true;

  }

  // Only AlphaNumeric
keyPressAlphaNumerice(event:any) {

  var inp = String.fromCharCode(event.keyCode);

  if (/[A-zA-Z0-9]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}


  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z0-9-_ /.]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  

  onClicked(val: any) {
    this.checked = val;
  }




  ////////////////////////

  ///////  search Janaaddhar Id
  JanAadharId: string = '';
  getJanAadhar() {
    var myusername = (<HTMLInputElement>document.getElementById("JanadharInfodata")).value;
    var vl = (<HTMLInputElement>document.getElementById("sptxt"));

    if (myusername.length < 10) {
      // vl.innerText = "Not Valid Jan Aadhar Number";
      this.EmpRegistration.reset();
      this.JanadharInfodata = [];
      return;

    }
    else {

      // vl.innerText = "Valid Janadhar Data";
      // this.submitted = true;

      // this.EmpRegistration.reset();
      // alert('this is id : ' + this.JanAadharId);
      let requestedDatas = { janAadharId: this.JanAadharId }

      this.apiService.getJanadharInfo(requestedDatas).subscribe(res => {

        //console.log(res.data.status);

        if (res.status = 200) {

          this.JanadharInfodata = res.data,

            console.log(this.JanadharInfodata)
        }
      })

    }
  }

  onFocus(id: any): void {
    console.log('Focus Is gained for this Element', id.value);
    this.EmpPersonalDetail.patchValue({
      dobInWord: id.value
    })
  }
  // ////////////////////
  updateSorting(event: any) {

    this.selectedRecord = this.JanadharInfodata.filter((item: any) => {
      return item.janMid == event.value;
    })[0];

    // console.log(this.selectedRecord )

    // save data in selector 
    this.EmpPersonalDetail.patchValue({
      Name: this.selectedRecord.nameEng,
      name_hindi: this.selectedRecord.nameHnd,
      fname: this.selectedRecord.fnameEng,
      mname: this.selectedRecord.mnameEng,
      dob: this.selectedRecord.dob,
      bankAccountNumber: this.selectedRecord.acc,
      IfscCode: this.selectedRecord.ifsc,
      BankName: this.selectedRecord.bankName,
      BranchName: this.selectedRecord.bankBranch,
      mobile_No: this.selectedRecord.mobile,
      addhar_no: this.selectedRecord.aadhar,
    });


  }



}


function f() {
  throw new Error('Function not implemented.');
}

