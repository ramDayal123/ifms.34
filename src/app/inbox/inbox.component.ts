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
import { DrMasterDialogComponent } from '../dr-master-dialog/dr-master-dialog.component';




@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  displayedColumns: string[] = ['Request ID','Initiator','Request Description','Created Date','Received From','Status','Remarks','Action'];
  dataSource!: MatTableDataSource<any>;
  dr_Master!: FormGroup
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  datalist: any = [];
  countDetail: any = [];
  outboxCount: any = [];
  draftCount: any = [];
  
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
    this.empinfo=this._Service.userInfo();
    this.getInboxDetail(this.empinfo.aid,'INBOX');
    this.getCount();
   // this.workinboxData('INBOX');
    // this.workinboxData('DRAFT');



  

    
  }
  getInboxDetail(id:any,type:any) {
    let data = {
      assignmentId:id,
      type:type
    }


    this._Service.callWorkFlowAPI(data, "inbox").subscribe({
      next: (res) => {
        if (res.status === "SUCCESS") {
          if (res == '') {
            alert("Not Record Found");
          }
          else {
            this.inboxData = res;
            this.dataSource = new MatTableDataSource(this.inboxData.data);
            this.dataSource.paginator = this.paginator;
            if(type==='OUTBOX'){
              this.isShow=false;
            }else{
              this.isShow=true;
            }
          }
        }
      },
      error: (err) => {
        console.log(err);
        this.error = err
        this._snackBar.open('Error occurred :- ', this.error, {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    })
  }



  getCount(){
    let data = {
      assignmentId:this.empinfo.aid,
    }
    
    this._Service.callWorkFlowAPI(data, "getRequestCount").subscribe({
      
      next: (res) => {
        if (res.status === "SUCCESS") {
          if (res == '') {
            alert("Not Record Found");
          }
          else {
            this.countDetail = res.data;
          }
        }
      },
      error: (err) => {
        console.log(err);
        this.error = err
        this._snackBar.open('Error occurred :- ', this.error, {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    })


  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  


  openDialog() {
    this.dialog.open(DrMasterDialogComponent,
      {
        panelClass: 'dialog-w-50', autoFocus: false
        , data: {
          message: 'DRMaster'
        }
      }
    );
  }

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



  View_History(reqId:any){
  
    this.dialog.open(DrMasterDialogComponent,
      {
        maxWidth: '60vw',
        maxHeight: 'auto',      
        width: '100%',
        panelClass: 'dialog-w-50', autoFocus: false
        , data: {
          message: 'View History',id:1,reqId:reqId
        }
      }
    );
  }
  


  View_Profile(requestID:any,taskTranId:any){    
    this.router.navigate(['/Employee_Basic',{reqId: requestID,transid: taskTranId}]);  
 
  }
  
  updateRequest() {
    this.dialog.open(DrMasterDialogComponent,
      {
        panelClass: 'dialog-w-50', autoFocus: false
        , data: {
          message: 'Request',id:2
        }
      }
    );

  }

}



