import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from 'src/app/Emp_Service/service.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
// import { DrMasterDialogComponent } from 'src/app/dr-master-dialog/dr-master-dialog.component';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ApplicationrequestpopupComponent } from '../applicationrequestpopup/applicationrequestpopup.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-emp-verification',
  templateUrl: './emp-verification.component.html',
  styleUrls: ['./emp-verification.component.css']
})
export class EmpVerificationComponent implements OnInit {

  displayedColumns: string[] = ['Employee Id ','Name','DOB','Appointment Date','Retirement  Date','Service Category','Sub-Service Category', 'Pay Commission', 'Action'];
  dataSource!: MatTableDataSource<any>;
  dr_Master!: FormGroup
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  datalist: any = [];
  countDetail: any=2;
  inboxData: any = [];
  outboxData: any = [];
  draftData: any = [];
  showerror: boolean = false;
  error: string = '';
  empinfo: any;
  isShow=true;
  inbox:any
  DdlShow: any;
  constructor(public dialog: MatDialog, private _Service: ApiService, private modalService: NgbModal, private formbuilder: FormBuilder
    , private _snackBar: MatSnackBar,private router:Router) {

  }
  
  ngOnInit(): void {
    // this.empinfo=this._Service.userInfo();
    //this.getInboxDetail(this.empinfo.aid,'INBOX');
    // this.getCount();
    this.workinboxData('INBOX');


  

    
  }





  workinboxData(type:any): void {
    // this.empinfo=this._Service.userInfo();
    // this.workinboxData(this.empinfo.aid,'INBOX');
    // this.getCount();


    let requestedData = {
      "assignmentId":1,
      "type":type 
      }
      
   
    this._Service.inbox(requestedData).subscribe(res => {
      if (res.data.status = 200) {
        this.inboxData = res;
        this.dataSource = new MatTableDataSource(this.inboxData.data);
        this.dataSource.paginator = this.paginator;
      }
    
      console.table(this.inbox)
    })

    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  


  // openDialog() {
  //   this.dialog.open(DrMasterDialogComponent,
  //     {
  //       panelClass: 'dialog-w-50', autoFocus: false
  //       , data: {
  //         message: 'DRMaster'
  //       }
  //     }
  //   );
  // }

  openDialog1(){
    alert("welcome to Mr. Tushar Taneja")
  }
  open(item: any) {
    this.modalService.open(item);
  }

  close(i: number) {}
  showDRDdl(e: any) {
    if (e.target.value == '12') {
      this.DdlShow = true;
    } else {
      this.DdlShow = false;
    }
  }



  // View_History(reqId:any){
  //   this.dialog.open(DrMasterDialogComponent,
  //     {
  //       maxWidth: '60vw',
  //       maxHeight: 'auto',      
  //       width: '100%',
  //       panelClass: 'dialog-w-50', autoFocus: false
  //       , data: {
  //         message: 'View History',id:1,reqId:reqId
  //       }
  //     }
  //   );
  // }
  


  View_Profile(requestID:any,taskTranId:any){    
    this.router.navigate(['/PensionApplication/Profile',{reqId: requestID,transid: taskTranId}]);  
    debugger
  }
  
  // updateRequest() {
  //   this.dialog.open(DrMasterDialogComponent,
  //     {
  //       panelClass: 'dialog-w-50', autoFocus: false
  //       , data: {
  //         message: 'Request',id:2
  //       }
  //     }
  //   );

  // }

}



