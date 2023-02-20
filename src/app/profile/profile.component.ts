import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../Emp_Service/service.service';
import { DatePipe } from '@angular/common';
import{STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
interface City {
  value: string,
  viewValue: string
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
  
})
export class ProfileComponent implements OnInit {
  currentItem = 'Television';
  message: string = "Are you sure?"
  hide = true;
  Empolyment_Details !: FormGroup;
  Payroll_Details !: FormGroup;
  firstFormGroup !: FormGroup;
  secondFormGroup !: FormGroup;
  thirdFormGroup !: FormGroup;
  forthFormGroup !: FormGroup;
  fifthFormGroup !: FormGroup;
  Personal_details !: FormGroup;
  fourthFormGroup !: FormGroup;
  sixFormGroup !: FormGroup;
  formGroup !: FormGroup;
  intergerRegex = /^\d+$/
  status: string = 'Deactive';
  drmaster: boolean = false;
  datalist: any;
  Personaldetail:any;
  ServiceDetails:any;
  imageUrl: any = "../assets/images/cameraImg.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  @ViewChild('fileInput') el!: ElementRef;
  panelOpenState:boolean = true;
  PersonalDetails:boolean = true;
  currentOpenedItemId:any;
  dateOfBirth:any;
  residenceArray:any[]=[];
  officeArray:any[]=[];
  error: string = '';
  showerror: boolean = false;
  constructor(private formbuilder: FormBuilder, private _Service: ApiService,private cd: ChangeDetectorRef,private datepipe:DatePipe
    , private _snackBar: MatSnackBar) { 

  }
  permanentAddress: any;
  officeAddress: any[] = [];
  residenceAddress: any;
 interests: City[] = [];
  ngOnInit(): void {
    this.firstFormGroup = this.formbuilder.group({
      // firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formbuilder.group({
      // secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this.formbuilder.group({
      // thirdCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this.formbuilder.group({
      // fourthCtrl: ['', Validators.required],
    });
 
       this.fifthFormGroup = this.formbuilder.group({
      // fifthCtrl: ['', Validators.required],
    });
       this.sixFormGroup = this.formbuilder.group({
      // fifthCtrl: ['', Validators.required],
    });
    this.forthFormGroup = this.formbuilder.group({
      fifthCtrl: ['', Validators.required],
    });
    this.interests = [
      { value: 'reading', viewValue: 'Reading' },
      { value: 'swimming', viewValue: 'Swimming' },
      { value: 'cycling', viewValue: 'Cycling' }
    ];
    this.Empolyment_Details = this.formbuilder.group({
      Department_Name: ['', Validators.required],
      Parent_Department: new FormControl('', Validators.required),
      Service_Category: new FormControl('', [Validators.required, Validators.pattern(this.intergerRegex)]),
      Sub_Category: new FormControl('', [Validators.required, Validators.pattern(this.intergerRegex)]),
      Appointment_No: new FormControl('', Validators.required),
      Apppointment_Date: new FormControl('', Validators.required),
      Order_Authority: new FormControl('', Validators.required),
      Apppointment_Authority: new FormControl(''),
      IAS_CPFNumber: new FormControl(''),
      Date_Joining: new FormControl(''),
      Date_Retirement: new FormControl(''),
      Joining_Service: new FormControl(''),
      Present_Designation: new FormControl(''),
      Date_PresentDDO: new FormControl(''),
      Foriegn_Empolyer: new FormControl(''),
      From_Date: new FormControl(''),
      To_Date: new FormControl(''),
      Income_Regime: new FormControl(''),
      Commutation_Share: new FormControl(''),
      DA: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      janadharId: new FormControl('', Validators.required),
    });
    this.Payroll_Details = this.formbuilder.group({
      Pay_Commision: ['', Validators.required],
      Grade_Pay: new FormControl('', Validators.required),
      Basic_Pay: new FormControl('', [Validators.required, Validators.pattern(this.intergerRegex)]),
      Pay_Level: new FormControl('', [Validators.required, Validators.pattern(this.intergerRegex)]),
      DA: new FormControl('', Validators.required),
      HRA: new FormControl('', Validators.required),
      CCA: new FormControl('', Validators.required),
      NPA: new FormControl(''),
      Special_Pay: new FormControl(''),
      Personal_Pay: new FormControl(''),
    });


    this.formGroup = new FormGroup({ secondCtrl: new FormControl(''), })

    this.Personal_details = this.formbuilder.group({   
      dob: [''],
      Employee_Name:['',Validators.required],
      FM_Name:['',Validators.required],
      Pran_Number:['',Validators.required],
      GPF_Number:['',Validators.required],
      SSOID:['',Validators.required],
    });
  this.fetchAddressesEmp();
    this.GetPersonaldetail();
    this.GetServicesdetail();
  }

  save1(){
    this.currentOpenedItemId = 0;
  }
  save(id:any){
    this.currentOpenedItemId = id;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  get f() { return this.Empolyment_Details.controls; }
  get P() { return this.Payroll_Details.controls; }
  get PE() { return this.Personal_details.controls; }

  // ****************************Personal details****************************************

  GetPersonaldetail() {
    let data = {
      employeeCode: 'CODE002',
    }
    this._Service.postRequestPension_personal(data, 'getPersonaldetailsByEmpCode').subscribe({
      next: (res) => {
        if ((res.status = 200)) {        
          this.Personaldetail = res.data[0];                 
          let dd = "2000-11-30T18:30:000Z"   
          let datatime = dd.toString().substring(0,dd.length-5);           
          this.dateOfBirth=this.datepipe.transform(datatime  , 'dd/MM/yyyy')
        
        }
      },
      error: (err) => {
        console.log("my error",err);
        debugger
        this.error = err;
        this._snackBar.open('Error occurred :- ', this.error, {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //   this.showerror=true;
        //  alert(this.error)
      }
    
    });
  }
  dateValue:any
  GetServicesdetail() {
    let data = {
      employeeCode: 'CODE002',
    }
    this._Service.postRequestService(data, 'getServiceDetailsByEmpCode').subscribe({
      next: (res) => {
        if ((res.status = 200)) {        
          this.ServiceDetails = res.data[0];                 
          this.dateValue = res.data[0].dateTypes[1].dateValue;     
        }
      },
      error: (err) => {
        console.log("my error",err);
        debugger
        this.error = err;
        this._snackBar.open('Error occurred :- ', this.error, {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //   this.showerror=true;
        //  alert(this.error)
      }
    });
  }

  onSubmit_Personal_details()
  {}

  submitted = false;
  onSubmit() {   
    var id=3
    this.currentOpenedItemId = id;
    this.submitted = true;
    if (this.Empolyment_Details.valid) {
      return;
    }
    else {
      let data = {
        "payCmmsn": this.Empolyment_Details.controls['Pay_Commission'].value,
        "salMin": 10000,
        "salMax": 50000,
        "minAmt": 5000,
        "drRate": this.Empolyment_Details.controls['DR_Rate'].value,
        "drRateFix": 4000,
        "isDp": 1000,
        "drFlag": "S",
        "isPension": "Y",
        "isGpo": "Y",
        "isActive": 1,
        "createdBy": 1,
        "modifiedBy": 1
      }

      this._Service.postRequestPensionSave(data, "saveDrRateService").subscribe({
        next: (res) => {
          if (res.status = 200) {
            alert(res.data)
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
  }
  
  onSubmit_PayrollDetail(){
    var id=4
    this.currentOpenedItemId = id;
    this.submitted = true;
    if (this.Empolyment_Details.valid) {
      return;
    }
  }


  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  stepc = 0;

  setStepc(index: number) {
    this.stepc = index;
  }

  nextStepc() {
    this.stepc++;
  }

  prevStepc() {
    this.stepc--;
  }



  uploadFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.Personal_details.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.Personal_details.patchValue({
      file: [null]
    });
  }

  fetchAddressesEmp() {
    let data = {
      employeeCode: 'CODE001',
    };

    this._Service.postRequestAddress(data, 'getAddressesByEmpCode').subscribe({
        next: (res) => {         
          
        let product:any;
          this.residenceAddress = res.data;
          for( product of this.residenceAddress){
            if (product.addressType == 'R'){
              ;
              this.residenceArray.push(product);
             
            }
            else  if (product.addressType == 'O'){
              ;
              this.officeArray.push(product);
            }
          }
      
        },
        error: (err) => {
          console.log("my error",err);
          debugger
          this.error = err;
          this._snackBar.open('Error occurred :- ', this.error, {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          //   this.showerror=true;
          //  alert(this.error)
        },
      });
     
  }

 
}
