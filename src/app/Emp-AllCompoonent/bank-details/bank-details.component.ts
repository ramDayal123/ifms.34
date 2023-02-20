import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ApiService } from 'src/app/Emp_Service/service.service';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Emp_Service/global.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  BankData: any;
  BankBranchData: any;
  bankDetails!: FormGroup;
  essEmpBankDetailsSavedata: any;
  submitted!: boolean;
  public regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  constructor(private formbuilder: FormBuilder, public global: GlobalService , private apiService: ApiService, private http: HttpClient, private router: Router,) { }
  
  ngOnInit(): void {
    this.bankDetails = this.formbuilder.group({
      Account_Type: ['',Validators.required],
      BankAccount : ['', Validators.required ,Validators.pattern(this.regex)],
      ifscCode : ['',Validators.required,Validators.pattern(this.regex)],
      bankName : ['-1',Validators.required],
      branchName : ['-1',Validators.required]

    })
    
    this.apiService.getBank().subscribe({

      next: (res) => {
 
        if (res.status = 200) {
          this.BankData = res.data
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

  getBankBranch(bankid:any):void{
    let requestedData = {
      iBankId: bankid.value
    }
    
    this.apiService.getBankBranch(requestedData).subscribe(res => {
      if (res.data.status = 200) {
        this.BankBranchData = res.data
      }
    })
  }
  ComponetLoad(cname:any):void{
    this.router.navigate(['/'+cname])
   }

   OnSubmit(){

    
    this.submitted = true;
    if (this.bankDetails.invalid) {
    let data = {
      "bankAccountNumber": this.bankDetails.controls["BankAccount"].value,
      // "bankAccountNumber":"sf1345254311",
      "ifscCode": this.bankDetails.controls["ifscCode"].value,
      "bankName": this.bankDetails.controls["bankName"].value,
      "branchName": this.bankDetails.controls["branchName"].value,
  
      }
      
     

      localStorage.setItem("bankDetails",JSON.stringify(data));
     // getServiceCategoryg
    //  this.apiService.essEmpBankDetailsSave(data).subscribe(res => {
    //   if (res.data.status = 200) {
    //     this.essEmpBankDetailsSavedata = res.data
    //   }
   
    //   console.log(this.essEmpBankDetailsSavedata)
    // })
  }
   }

    

}
