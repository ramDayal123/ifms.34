import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Included/header/header.component';
import { FooterComponent } from './Included/footer/footer.component';
import { FooterLandingComponent } from './Included/footer-landing/footer-landing.component';
import { StyleguideComponent } from './styleguide/styleguide.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule } from '@angular/material/button';
import {MatCardModule } from '@angular/material/card';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SidemenuComponent } from './Included/sidemenu/sidemenu.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
// datatable
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SteperComponent } from './steper/steper.component';
// import { SearchdropdownComponent } from './searchdropdown/searchdropdown.component';
import {MatStepperModule} from '@angular/material/stepper';

import { TogglesidemenuComponent } from './Included/togglesidemenu/togglesidemenu.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormComponent } from './form/form.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';

import {MatSnackBarModule} from '@angular/material/snack-bar';

import { DndDirective } from './dnd.directive';

import { EmployeeDetailsComponent } from './Emp-AllCompoonent/employee-details/employee-details.component';
import { EmployeeServiceDetailsComponent } from './Emp-AllCompoonent/employee-service-details/employee-service-details.component';
import { AddressComponent } from './Emp-AllCompoonent/address/address.component';
import { FamilyDetailsComponent } from './Emp-AllCompoonent/family-details/family-details.component';

import { DocumentComponent } from './Emp-AllCompoonent/document/document.component';
import { BankDetailsComponent } from './Emp-AllCompoonent/bank-details/bank-details.component';
import { PayEntitlementComponent } from './Emp-AllCompoonent/pay-entitlement/pay-entitlement.component';
import { InboxComponent } from './inbox/inbox.component';
import { DrMasterDialogComponent } from './dr-master-dialog/dr-master-dialog.component';

import {MatMenuModule} from '@angular/material/menu';
import { RegPreviewComponent } from './Emp-AllCompoonent/reg-preview/reg-preview.component';
import { RouleBaseComponent } from './Emp-AllCompoonent/roule-base/roule-base.component';
import { EmpVerificationComponent } from './Emp-AllCompoonent/emp-verification/emp-verification.component';
import { formatDate } from '@angular/common';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { DocumentsUploadedComponent } from './Emp-AllCompoonent/documents-uploaded/documents-uploaded.component';





// 




@NgModule({
  declarations: [
    AppComponent,
    AccessDeniedComponent,
    HeaderComponent,
    FooterComponent,
    FooterLandingComponent,
    StyleguideComponent,
    SidemenuComponent,
    SteperComponent,
    TogglesidemenuComponent,
    FormComponent,
   
    DndDirective,

    EmployeeDetailsComponent,
    EmployeeServiceDetailsComponent,
    AddressComponent,
    FamilyDetailsComponent,
    DocumentComponent,
    BankDetailsComponent,
    PayEntitlementComponent,
    InboxComponent,
    DrMasterDialogComponent,
    RegPreviewComponent,
    RouleBaseComponent,
    EmpVerificationComponent,
    DocumentsUploadedComponent



    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatStepperModule,
    MatSidenavModule,
    // datatable
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatFormFieldModule,
    HttpClientModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDatepickerModule,

    MatMenuModule,
 

    
  ],

  providers:[

    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale("en-in"); // DD/MM/YYYY
  }
}

