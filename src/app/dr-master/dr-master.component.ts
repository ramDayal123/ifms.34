

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from '../Emp_Service/service.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DrMasterDialogComponent } from 'src/app/dr-master-dialog/dr-master-dialog.component';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dr-master',
  templateUrl: './dr-master.component.html',
  styleUrls: ['./dr-master.component.css']
})
export class DRMasterComponent implements OnInit {
  displayedColumns: string[] = ['Sr. No.', 'Pay Commission', 'Entitlement Status', 'DR Rate', 'Order No', 'Order Date', 'w.e.f DR date', 'Status', 'Action'];
  dataSource!: MatTableDataSource<any>;
  dr_Master!: FormGroup
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  datalist: any = [];
  showerror: boolean = false;
  error: string = '';

  constructor(public dialog: MatDialog, private _service: ApiService, private http: HttpClient, private modalService: NgbModal, private formbuilder: FormBuilder
    , private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.getload_data();
  }

  getload_data() {
    this._service.callWorkFlowAPI(null, "fetchDrRateService").subscribe({
      next: (res) => {
        
        if (res.status = 200) {
          if (res.data = '') {
            alert("Not Record Found")
          }
          else {
            this.datalist = res;
            this.dataSource = new MatTableDataSource(this.datalist);
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
        //   this.showerror=true;
        //  alert(this.error)
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

}



