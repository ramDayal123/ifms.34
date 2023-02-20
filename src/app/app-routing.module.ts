import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleguideComponent } from './styleguide/styleguide.component';
import { FormComponent } from './form/form.component';

import { SteperComponent } from './steper/steper.component';
import { EmployeeDetailsComponent } from './Emp-AllCompoonent/employee-details/employee-details.component';
import { EmployeeServiceDetailsComponent } from './Emp-AllCompoonent/employee-service-details/employee-service-details.component';
import { AddressComponent } from './Emp-AllCompoonent/address/address.component';
import { FamilyDetailsComponent } from './Emp-AllCompoonent/family-details/family-details.component';
import { BankDetailsComponent } from './Emp-AllCompoonent/bank-details/bank-details.component';
import { DocumentComponent } from './Emp-AllCompoonent/document/document.component';
import { PayEntitlementComponent } from './Emp-AllCompoonent/pay-entitlement/pay-entitlement.component';
import { InboxComponent } from './inbox/inbox.component';
import { RegPreviewComponent } from './Emp-AllCompoonent/reg-preview/reg-preview.component';
import { RouleBaseComponent } from './Emp-AllCompoonent/roule-base/roule-base.component';
import { EmpVerificationComponent } from './Emp-AllCompoonent/emp-verification/emp-verification.component';
import { DocumentsUploadedComponent } from './Emp-AllCompoonent/documents-uploaded/documents-uploaded.component';





const routes: Routes = [

  { path: '', redirectTo: 'Employee_Basic', pathMatch: 'full' },

  {
    path:'stylegude',
    component:StyleguideComponent
  },

 
  {
    path:'FormComponent',component:FormComponent
  },
  {path:'Employee_Basic',component:SteperComponent},
  {path:'employee-details', component:EmployeeDetailsComponent},
  {path:'EmployeeService', component:EmployeeServiceDetailsComponent},
  {path:'Address', component:AddressComponent},
  {path:'familyDetails', component:FamilyDetailsComponent},
  {path:'pay-entitlement', component:PayEntitlementComponent},
 
  {path:'emp-document', component:DocumentComponent},
  {path:'bank-details', component:BankDetailsComponent},

  {path:'maker_preview',component:RegPreviewComponent},
  {path:'Role_Token',component:RouleBaseComponent},

  {path:'emp-verification',component:EmpVerificationComponent},
  {path:'upload-document',component:DocumentsUploadedComponent},

  {
    path:'Inbox',component:InboxComponent
  },
  
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
