import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../Emp_Service/service.service';

export interface checkedlist {
  extracheese: string;
  mushroom: string;
  pepperoni: string;
}
@Component({
  selector: 'app-dr-master-dialog',
  templateUrl: './dr-master-dialog.component.html',
  styleUrls: ['./dr-master-dialog.component.css']
})
export class DrMasterDialogComponent implements OnInit {
  message: string = "";
  id!: number;
  hide = true;
  dr_Master !: FormGroup;
  dr_Master1 !: FormGroup;
  serviceRecordForm !: FormGroup;
  loanAdvanceForm !: FormGroup;
  intergerRegex = /^\d+$/
  status: string = 'Deactive';
  drmaster: boolean = false;
  remark: boolean = false;
  confirm: boolean = false;
  isDeStatus: boolean = false;
  isPenalty: boolean = false;
  datalist: any;
  rid: any;
  reqId: any;
  aid: any;
  generated: any;
  checked: checkedlist[] = [];
  random: any = Math.floor(Math.random() * 10000) + 1;

  serviceCatData: any;
  serviceSubCatData: any;
  serviceRecordData: any = [];
  advanceRecordData: any = [];

  constructor(private formbuilder: FormBuilder, private _Service: ApiService, @Inject(MAT_DIALOG_DATA)
  private data: any, private dialogRef: MatDialogRef<DrMasterDialogComponent>, private router: Router) {

    this.message = data.message;
    this.id = data.id;
    this.rid = data.rid;
    this.reqId = data.reqId;
    this.aid = data.aid;
    this.serviceRecordData = data.field;
    this.advanceRecordData = data.field;
    if (this.aid == 56954) {
      this.generated = "generated";

    }
    else {
      this.generated = "forwarded";
    }

    if (this.message === 'DRMaster') {
      this.drmaster = true;
    } else if (this.message === 'remark') {
      this.remark = true;
    } else if (this.message === 'confirm') {
      this.confirm = true;
    } else {
      this.drmaster = false;
      this.remark = false;
      this.confirm = false;
    }
  }

  ngOnInit(): void {
    //#region Loan And Advance
    this.loanAdvanceForm = this.formbuilder.group({
      loanType: [''],
      loanCommencement: [''],
      loanDuration: [''],
      sanctionAmt: [''],
      amountPaid: [''],
      balanceAmt: [''],
    });

    if (this.advanceRecordData != 0) {
      this.fetchLoanAndAdvance();
    }

    //#endregion Loan And Advance

    //#region Add Service Records
    this.serviceRecordForm = this.formbuilder.group({
      category: new FormControl(''),
      subCategory: new FormControl(''),
      serviceLength: new FormControl(''),
      qualifyingService: new FormControl(''),
      nonQualifyingService: new FormControl(''),
      totalQualifyService: new FormControl(''),
      de_Status: new FormControl(''),
      deType: new FormControl(''),
      start_Date: new FormControl(''),
      end_Date: new FormControl(''),
      penalty: new FormControl(''),
      remark: new FormControl(''),
    });

    if (this.serviceRecordData != 0) {
      this.fetchServiceRecords();
    }
    //#endregion Add Service Records



    this.dr_Master = this.formbuilder.group({
      Pay_Commission: ['', Validators.required],
      Entitlement_Status: new FormControl('', Validators.required),
      DR_Rate: new FormControl('', [Validators.required, Validators.pattern(this.intergerRegex)]),
      Order_No: new FormControl('', [Validators.required, Validators.pattern(this.intergerRegex)]),
      Order_Date: new FormControl('', Validators.required),
      DR_date: new FormControl('', Validators.required),
      Status: new FormControl('', Validators.required),
    });


    this.fetchApplicationHistory();

    //this.getServiceCategory();

  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  get f() { return this.dr_Master.controls; }
  submitted = false;
  onSubmit() {

    console.log("hello", this.dr_Master)
    this.submitted = true;
    if (this.dr_Master.valid) {
      return;
    }
    else {
      let data = {
        "payCmmsn": this.dr_Master.controls['Pay_Commission'].value,
        "salMin": 10000,
        "salMax": 50000,
        "minAmt": 5000,
        "drRate": this.dr_Master.controls['DR_Rate'].value,
        "drRateFix": 4000,
        "isDp": 1000,
        "drFlag": "S",
        "isPension": "Y",
        "isGpo": "Y",
        "isActive": 1,
        "createdBy": 1,
        "modifiedBy": 1
      }

      // this._Service.postRequestPensionSave(data, "saveDrRateService").subscribe({
      //   next: (res) => {
      //     if (res.status = 200) {
      //       alert(res.data)
      //     }
      //   },
      //   error: (err) => {
      //     let errorObj = {
      //       message: err.message,
      //       err: err,
      //       response: err
      //     }
      //   }

      // })
    }
  }
  onChange(event: any) {
    if (event.checked == true) {
      this.status = 'Active'
    }
    else {
      this.status = 'Deactive'
    }

  }

  

  fetchApplicationHistory() {
    let data = {
      "requestId": this.reqId
    }
    debugger
    this._Service.callWorkFlowAPI(data, 'getRemarkByRequestId').subscribe({


      next: (res) => {
        if (res.status = 200) {
          this.datalist = res.data;
          console.log("data is:" + JSON.stringify(this.datalist))
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

  Download_PDF() {
    this.router.navigateByUrl('/PensionApplication/GpoFormat');
  }


  finalclose() {
    this.router.navigateByUrl('/PensionApplication/RoleToken');
  }


  //#region Add Service Records

  fetchServiceRecords() {
    this.serviceRecordForm.patchValue({
      category: this.serviceRecordData.serviceCatName,
      subCategory: this.serviceRecordData.subServiceCatName,
      serviceLength: this.serviceRecordData.totalServiceLength,
      qualifyingService: this.serviceRecordData.totalServiceLength,
      nonQualifyingService: this.serviceRecordData.nonQualifyingService,
      totalQualifyService: this.serviceRecordData.totalQualifyService,
      de_Status: (this.serviceRecordData.deStatus).toString(),
      deType: this.serviceRecordData.totalServiceLength,
      start_Date: this.serviceRecordData.totalServiceLength,
      end_Date: this.serviceRecordData.totalServiceLength,
      penalty: this.serviceRecordData.totalServiceLength,
      remark: this.serviceRecordData.totalServiceLength,
    })
    // console.log("this.serviceRecordForm.controls['de_Status'].value",this.serviceRecordForm.value.de_Status)
  }
  getServiceCategory() {
    this.serviceCatData = [];
    // this._Service.postRequestAddress(null, "getAllServiceCategory").subscribe({
    //   next: (res) => {
    //     if (res.status = 200) {
    //       this.serviceCatData=res.data;

    //     }
    //   },
    //   error: (err) => {
    //     let errorObj = {
    //       message: err.message,
    //       err: err,
    //       response: err
    //     }
    //   }
    // })
  }

  getServiceSubCategory(event: any) {
    this.serviceSubCatData = [];
    let data = {
      serviceCategoryId: event
    }
    // this._Service.postRequestAddress(data, "getAllSubServiceCategoryByServiceCategoryId").subscribe({
    //   next: (res) => {
    //     if (res.status = 200) {
    //       if (res.data ==="No Data Found!") {          
    //       }else{
    //           this.serviceSubCatData=res.data;  
    //       }
    //     }
    //   },
    //   error: (err) => {
    //     let errorObj = {
    //       message: err.message,
    //       err: err,
    //       response: err
    //     }
    //   }
    // })
  }


  showHideFields(val: any) {
    if (val === 1) {
      this.isDeStatus = true;
    } else {
      this.isDeStatus = false;
    }
  }
  showHideRemark(val: any) {
    if (val === 1) {
      this.isPenalty = true;
    } else {
      this.isPenalty = false;
    }
  }

  //#endregion Add Service Records

  //#region Loan And Advance

  fetchLoanAndAdvance() {
    this.loanAdvanceForm.patchValue({
      loanType: this.advanceRecordData.loanType,
      loanCommencement: this.advanceRecordData.loanDate,
      loanDuration: this.advanceRecordData.isActive,
      sanctionAmt: this.advanceRecordData.sanctionAmt,
      amountPaid: this.advanceRecordData.amountPaid,
      balanceAmt: this.advanceRecordData.intDue
    });
  }
  //#endregion Loan And Advance
}

