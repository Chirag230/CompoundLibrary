import { Routes } from '@angular/router';
import { CompoundListComponent } from './components/compound-list/compound-list.component';
import { CompoundDetailComponent } from './components/compound-detail/compound-detail.component';
import {CompoundFormComponent} from './components/compound-form/compound-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'compounds', pathMatch: 'full' },
  { path: 'compounds', component: CompoundListComponent ,canActivate: [AuthGuard] },
  { path: 'compounds/create',component:CompoundFormComponent,canActivate: [AuthGuard] },
  { path: 'compounds/:id', component: CompoundDetailComponent,canActivate: [AuthGuard]  },
{ path: 'compounds/:id/edit',component:CompoundFormComponent,canActivate: [AuthGuard] }
];
