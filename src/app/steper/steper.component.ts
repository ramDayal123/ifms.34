import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Emp_Service/service.service';

@Component({
  selector: 'app-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.css']
})
export class SteperComponent implements OnInit {
  empid:any;
  inputText: string = 'Hi';
  next:string="";
  is_show:boolean=false
  
  firstFormGroup!: FormGroup
  constructor(private _formBuilder: FormBuilder,private router:Router, private apiService:ApiService) {}

  ngOnInit(): void {
   this.empid=localStorage.getItem("userInfo")
   this.apiService.emp_service1.subscribe((data: any) => {
    this.next='matStepperNext'
   this.is_show=true;

      }
    )

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
  }
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });
  forthFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });


  fifthFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });

  SixFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });


   SavenFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });

 

submitted = false;
selectionChange(id: any){
 debugger
 this.submitted = true;
  if (this.firstFormGroup.invalid) {    
   return;
  }
  else{
this.apiService.emp_service.next(id);

  if (id == 1) {
    debugger
    let data = localStorage.getItem("Employee_persanol");
    debugger
    this.apiService.essEmployeePersonalDetailsSave(data).subscribe(res => {
        if (res.data.status = 200) {
          localStorage.setItem("Employee_persanol", JSON.stringify(data));
        }
      })
  }
  }

let data ={
  
  "request_data": {
    "processId": "1",
    "taskSeq": "",
    "processTaskSeq": "",
    "taskTranId": "",
    "requestId": "",
    "requestDesc": "",
    "initiator": "56810",
    "person_id": this.empid.aid,
    "person_name": "BARKAT ALI",
    "action": "CRE",
    "remarks": "",
    "payloadChangeFlag":"Y"
  },

"payload": {
  
 "Employee_persanol": localStorage.getItem("Employee_persanol"),
 "EmpService": localStorage.getItem("EmpService"),
 "SaveAddress": localStorage.getItem("saveAddress"),
 "FamilyDetails": localStorage.getItem("FamilyDetails"),
 "bankDetails": localStorage.getItem("bankDetails"),
 "PayEntitlement": localStorage.getItem("PayEntitlement"),
 "EmpDocument": localStorage.getItem("EmpDocument"),
}
}
debugger
   this.apiService.action(data).subscribe(res => {
        if (res.data.status = 200) {
        
        }
     
       
      })
      
}
}

