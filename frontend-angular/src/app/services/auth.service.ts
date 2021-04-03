import { environment } from 'src/environments/environment';
import { plainToClass } from 'class-transformer';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	toastRef: any;
	public loginErrors: any = {};
	public registerErrors: any = {};

	constructor(
		public router: Router,
		private http: HttpClient
	) { }

	login(email: string, password: string): void {
		const data = {
			email,
			password
		};
		console.log(data);
		this.http.post(`${environment.apiUrl}/login`, data).toPromise().then((result: any) => {
			console.log('login', result);
			// console.log(plainToClass(User, result));
			// this.users = plainToClass(User, result);
		}).catch((err) => {
			console.log(err);
			this.loginErrors = {};
			this.loginErrors = err.error.reduce((pV: any, cV: any) => { 
				return {
					...pV,
					[cV.param]: err.error.filter((e: any) => e.param === cV.param).map((er: any) => er.param === cV.param ? er.msg : null),
				};
			}, this.loginErrors);
			console.log('register errors', this.loginErrors);
		});
	}

	register(name: string, email: string, password: string): void {
		const data = {
			name, 
			email,
			password
		};
		console.log(data);
		this.http.post(`${environment.apiUrl}/register`, data).toPromise().then(() => {
			this.router.navigate(['']);
		}).catch((err) => {
			console.log(err);
			this.registerErrors = {};
			this.registerErrors = err.error.reduce((pV: any, cV: any) => { 
				return {
					...pV,
					[cV.param]: err.error.filter((e: any) => e.param === cV.param).map((er: any) => er.param === cV.param ? er.msg : null),
				};
			}, this.registerErrors);
			console.log('register errors', this.registerErrors);
		});
	}
}