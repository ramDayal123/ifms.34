import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Emp_Service/service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  EmpDocument: any;
  DocumentTypedata: any;
  essEmpDocumentSavedata: any;
  submitted!: boolean;
  selectedFiles: any;

  constructor(private formbuilder: FormBuilder, private apiService: ApiService, private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {

    this.EmpDocument = this.formbuilder.group({
      Description: ['', Validators.required],
      documennt: ['-1',Validators.required],
      file : ['',Validators.required]

    })

    
  //////////// getDocumentType

   this.apiService.getDocumentType().subscribe(res => {
    if (res.data.status = 200) {
      this.DocumentTypedata = res.data
    }
  })
   
  }

  selectFile(files:any)
  {
   this.selectedFiles=files.target.files[0].name;
  }

  OnSubmit (){
    this.submitted = true;
    if (this.EmpDocument.invalid) {
      
    let  data = {
      documentType : this.EmpDocument.controls ["documennt"].value,
      // "documentType":"gjhfd",
       
       "description": this.EmpDocument.controls["Description"].value,
        "chooseFile":this.EmpDocument.controls["file"].value,
  }
 
  localStorage.setItem("EmpDocument",JSON.stringify(data));
     // getServiceCategoryg
    //  this.apiService.essEmpDocumentSave(data).subscribe(res => {
    //   if (res.data.status = 200) {
    //     this.essEmpDocumentSavedata = res.data
    //   }
    // })
     
  }
  
  }
  

  ComponetLoad(cname:any):void{
    this.router.navigate(['/'+cname])
   }

   
}
