import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './components/account/account.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginGuard } from './login.guard';
import { EditAccountComponent } from './components/account/edit-account/edit-account.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/login' },
	{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
	{ path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
	{ path: 'account-edit', component: EditAccountComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
