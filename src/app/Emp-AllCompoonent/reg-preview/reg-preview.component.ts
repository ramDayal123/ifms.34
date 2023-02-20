import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Emp_Service/service.service';
import { GlobalService } from 'src/app/Emp_Service/global.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-preview',
  templateUrl: './reg-preview.component.html',
  styleUrls: ['./reg-preview.component.css']
})
export class RegPreviewComponent implements OnInit {

  makerPreview!: FormGroup
  submitted: any;
  disableSearch: any;



  printPage() {
    window.print();
  }

  constructor(private formbuilder: FormBuilder, private apiService: ApiService,
    public global: GlobalService, private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    this.makerPreview = this.formbuilder.group({
    JanAadharId: new FormControl("", Validators.required ),
      employeeType: new FormControl("-1", Validators.required),
      MemberID: new FormControl("", Validators.required),
      JanadharInfodata: new FormControl('', [Validators.required, Validators.minLength(10)]),

      Name: ['', Validators.required],
      middle_name:['',],
      last_name:[''],
      height: ['',],
      gender: ['-1',],
      matrial: ['-1',Validators.required ],
      fname : ['',Validators.required],
      mname : ['',],
      sname :['',],
      mobileno : ['', Validators.required],
      emailid : ['',],
      CATEGORY_ID: ['-1' ,Validators.required],
      dob: ['', Validators.required],
      dob_words: ['',Validators.required],
      Identification: ['', Validators.required],
      Blood_Group: ['-1',],
      Disability: ['-1' , Validators.required],
      district_id: ['-1', Validators.required],
      Home_Town : ['-1',Validators.required],
      // Belongs_Minority :[''],
      Disability_Status : ['',Validators.required],
      nationalitys : ['',Validators.required],
      Percentage_Disability: ['',Validators.required],
    
      religion: ['',Validators.required],
      addharRef: ['',],
      PassportNo : ['',],
      pancardNo : ['',],

      // service page
      Status: new FormControl("0", ),
      date: new FormControl("", ),
      ServiceQuota: new FormControl ('-1', ),
      service_Category: new FormControl ('-1', ),
      // employeeType: new FormControl ('-1',),
      serviceSub_Category: new FormControl ('-1',) ,
      Gazetted : new FormControl ('-1', ),
      ParentDepartment : new FormControl ('-1', ),
      CurrentDepartment : new FormControl ('-1', ),
      CurrentDesignation : new FormControl ('-1', ),
      AppointedAs : new FormControl ('-1',),
      AppointmentOrder : new FormControl ('',),
      OrderIssuingAuthority : new FormControl ('',),
      GRPPran : new FormControl ('',),
      StateInsuranceNumber : new FormControl ('',),
      RGHSNo : new FormControl ('',),
      GPFNo : new FormControl ('',),
      PLINo : new FormControl ('',),
      BeltNo : new FormControl ('',),
      IAS_CPNF : new FormControl ('',),
      AppointmentOrderNo : new FormControl ('',),
      JoiningDateService : ['',],
      DatePresentdesgination : ['',],
      DateJoiningPresentDDO : ['',],
      DateConfirmation : ['',],
      IncrementOptedDate : ['', Validators.required],
      ChargeTakenDate : ['', Validators.required],
      SuperanuationDate : ['',],
      JoiningTime : ['', Validators.required],
      AppointmentOrderDate : ['', Validators.required],




      // address
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
      PercentageDisability: new FormControl ('',Validators.required),
      Dependent : new FormControl ('',Validators.required),
      NameNominee : new FormControl ('',Validators.required),
      disable : new FormControl ('',Validators.required),
      Employed : new FormControl ('',Validators.required),
      share : new FormControl ('',Validators.required),
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

      // bank  details

      Account_Type: ['',Validators.required],
      BankAccount : ['', Validators.required ,],
      ifscCode : ['',Validators.required,],
      bankName : ['-1',Validators.required],
      branchName : ['-1',Validators.required],

      // 
      // service_Category:  new FormControl('-1',Validators.required),
      // serviceSub_Category:  new FormControl('-1',Validators.required),
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
      income_tax : new FormControl("",Validators.required),
      si : new FormControl("",Validators.required),



      present_PayScale :  new FormControl("",Validators.required),
      city_compensatory :  new FormControl("",Validators.required),
      NPA :  new FormControl("",Validators.required),
      GPF :  new FormControl("",Validators.required),
      NPS :  new FormControl("",Validators.required),
      siv :  new FormControl("",Validators.required),
      Professional_Tax :  new FormControl("",Validators.required),
      Other :  new FormControl("",Validators.required),
      Corp_Details:  new FormControl("",Validators.required),


      // documment
      Description: ['', Validators.required],
      documennt: ['-1',Validators.required],
      file : ['',Validators.required]
    });

   
  }


  onSubmit() {
    this.submitted = true;

    if (this.makerPreview.invalid) {}
  }



  // validation
  numberOnly(event: { which: any; keyCode: any; }): boolean {

    //alert(this.EmpRegistration.controls['JanadharInfodata'].valid);
    this.disableSearch = true;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;

    }
    return true;

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





}
