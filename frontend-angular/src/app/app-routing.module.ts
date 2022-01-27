import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { AccountComponent } from './pages/account/account/account.component';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MovieComponent } from './pages/movie/movie/movie.component';
import { MoviesComponent } from './pages/movie/movies/movies.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/login' },
	{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
	{ path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
	{ path: 'account-edit', component: EditAccountComponent, canActivate: [AuthGuard] },

	{ path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
	{ path: 'movie', component: MovieComponent, canActivate: [AuthGuard] },
	{ path: 'movie/:id', component: MovieComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
