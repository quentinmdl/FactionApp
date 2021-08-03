// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard, BasicAuthInterceptor, ErrorInterceptor } from './api/_helpers';
// import { ResetPasswordResolver } from './components/Auth/reset-password/reset-password-form/reset-password.resolver';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppComponent } from './app.component';

// // Navbar
// import { AuthenticatedComponent } from './components/authenticated.component';
// import { AnonymousComponent } from './components/anonymous.component';

// // Auth & Reset
// import { LoginComponent } from './components/Auth/login/login.component';
// import { RegisterComponent } from './components/Auth/register/register.component';
// import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password-form/reset-password.component';
// import { SendEmailComponent } from './components/Auth/reset-password/send-email/send-email.component';

// // Home
// import { HomeComponent } from './components/home/home.component';

// // User
// import { ShowUserComponent } from './components/profile/show-user/show-user.component';
// import { EditUserComponent } from './components/profile/edit-user/edit-user.component';
// import { EditPasswordComponent } from './components/profile/edit-password/edit-password.component';

// // Customer
// import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
// import { AllCustomerComponent } from './components/customer/all-customer/all-customer.component';
// import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';


// const routes: Routes = [
//     { path: '', component: AuthenticatedComponent, canActivate : [ AuthGuard ], children:[
//       { path: '', redirectTo: '/home', pathMatch: 'full' },
  
//       // Home
//       { path: 'home', component: HomeComponent },
  
//       //Profile User
//       { path: 'profile', component: ShowUserComponent },
//       { path: 'profile/edit-user', component: EditUserComponent},
//       { path: 'profile/edit-password', component: EditPasswordComponent}, 
    
//       { path: 'customers', component: AllCustomerComponent },
//       { path: 'customers/add-customer', component: AddCustomerComponent },
//       { path: 'customers/edit-customer', component: EditCustomerComponent },
      
//     ]},
  
//     { path: '', component: AnonymousComponent, children: [
//       { path: 'login', component: LoginComponent },
//       { path: 'register', component: RegisterComponent },
//       { path: 'reset-password/email', component: SendEmailComponent },
//       { path: 'reset-password/', component: ResetPasswordComponent  },
//       { path: 'reset-password/:token',component: ResetPasswordComponent, resolve: { token: ResetPasswordResolver } },
//     ]}
//   ];


// @NgModule({
//   imports: [BrowserModule, RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })

// export class AppRoutingModule { }







