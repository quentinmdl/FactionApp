import { ResetPasswordResolver } from './components/Auth/reset-password/reset-password-form/reset-password.resolver';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
// import { AppRoutingModule } from './app-routing.module';

// Materials
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogComponent } from './components/modals/confirm-dialog/confirm-dialog.component';

// Charts 
import { ChartsModule } from 'ng2-charts';

// Cdk
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';

// Pagination
import { NgxPaginationModule } from 'ngx-pagination'; 

// Components
// Base & Auth
import { AuthGuard, BasicAuthInterceptor, ErrorInterceptor, NetworkInterceptor } from './api/_helpers';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password-form/reset-password.component';
import { SendEmailComponent } from './components/Auth/reset-password/send-email/send-email.component';

// Error pages
import { WrongRouteComponent } from './components/errors/wrong-route/wrong-route.component';

// Loading Spinner 
import { LoadingSpinnerComponent } from './components/loading/loading-spinner/loading-spinner.component';

// Navbar
import { AuthenticatedComponent } from './components/authenticated.component';
import { AnonymousComponent } from './components/anonymous.component';

// Home
import { HomeComponent } from './components/home/home.component';

// User
import { ShowUserComponent } from './components/profile/show-user/show-user.component';
import { EditUserComponent } from './components/profile/edit-user/edit-user.component';
import { EditPasswordComponent } from './components/profile/edit-password/edit-password.component';

// Customer
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { AllCustomerComponent } from './components/customer/all-customer/all-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';

// Note
import { AllNoteComponent } from './components/note/all-note/all-note.component';
import { AddNoteComponent } from './components/note/add-note/add-note.component';
import { ShowNoteComponent } from './components/note/show-note/show-note.component';
import { EditNoteComponent } from './components/note/edit-note/edit-note.component';

// Invoice
import { AllInvoiceComponent } from './components/invoice/all-invoice/all-invoice.component';
import { AddInvoiceComponent } from './components/invoice/add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './components/invoice/edit-invoice/edit-invoice.component';

// Benefit
import { AllBenefitComponent } from './components/invoice/benefit/all-benefit/all-benefit.component';
import { AddBenefitComponent } from './components/invoice/benefit/add-benefit/add-benefit.component';
import { ShowBenefitComponent } from './components/invoice/benefit/show-benefit/show-benefit.component';
import { EditBenefitComponent } from './components/invoice/benefit/edit-benefit/edit-benefit.component';

// Business
import { AddBusinessComponent } from './components/business/add-business/add-business.component';
import { EditBusinessComponent } from './components/business/edit-business/edit-business.component';
import { ShowBusinessComponent } from './components/business/show-business/show-business.component';

// Charts 
import { ChartSalaryComponent } from './components/home/charts/chart-salary/chart-salary.component';
import { ChartCustomerComponent } from './components/home/charts/chart-customer/chart-customer.component';
import { ChartHourComponent } from './components/home/charts/chart-hour/chart-hour.component';
import { AddEditHourComponent } from './components/home/charts/chart-hour/hour/add-edit-hour/add-edit-hour.component';

const routes: Routes = [
  { path: '', component: AuthenticatedComponent, canActivate : [ AuthGuard ], children:[
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    // Home
    { path: 'home', component: HomeComponent },

    // Profile User
    { path: 'profile', component: ShowUserComponent },
    { path: 'profile/edit-user', component: EditUserComponent },
    { path: 'profile/edit-password', component: EditPasswordComponent },

    // Customer
    { path: 'customers', component: AllCustomerComponent },
    
    // Note User
    { path: 'notes', component: AllNoteComponent },  
    
    // Invoice
    { path: 'invoices', component: AllInvoiceComponent },
    { path: 'invoices/generate', component: AddInvoiceComponent },

     // Business
     { path: 'business', component: ShowBusinessComponent },
  ]},

  // Auth pages without navbar
  { path: '', component: AnonymousComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reset-password/email', component: SendEmailComponent },
    { path: 'reset-password/', component: ResetPasswordComponent  },
    { path: 'reset-password/:token',component: ResetPasswordComponent, resolve: { token: ResetPasswordResolver } },
  
    { path: 'spinner', component: LoadingSpinnerComponent },
  
  ]},

  // Error 404
  { path: '', component: AuthenticatedComponent, children: [
    { path : '**', pathMatch : 'full', component   : WrongRouteComponent }
  ]}
];
@NgModule({
  declarations: [
    AppComponent,
   
    // Error Page
    WrongRouteComponent,

    // Loading Spinner
    LoadingSpinnerComponent,

    // Modals
    ConfirmDialogComponent,

    // Navbar
    NavMenuComponent,
    AuthenticatedComponent,
    AnonymousComponent,

    // Auth 
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SendEmailComponent,

    // Home
    HomeComponent,

    // User
    ShowUserComponent,
    EditUserComponent,
    EditPasswordComponent,

    // Customer 
    AddCustomerComponent,
    EditCustomerComponent,
    AllCustomerComponent,

    // Note 
    AllNoteComponent,
    AddNoteComponent,
    EditNoteComponent,
    ShowNoteComponent,

    // Invoice
    AllInvoiceComponent,
    AddInvoiceComponent,
    EditInvoiceComponent,

    // Benefit
    AllBenefitComponent,
    AddBenefitComponent,
    ShowBenefitComponent,
    EditBenefitComponent,

    // Business
    AddBusinessComponent,
    EditBusinessComponent,
    ShowBusinessComponent,

    // Chart 
    ChartSalaryComponent,
    ChartCustomerComponent,
    ChartHourComponent,
    AddEditHourComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    BrowserModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatFileInputModule,
    MatProgressSpinnerModule,

    // Charts 
    ChartsModule,
  
    // Cdk
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkStepperModule,
    CdkTableModule,

    // Pagination
    NgxPaginationModule,
    
    // AppRoutingModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ResetPasswordResolver,
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true}, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
