import { environment } from 'src/environments/environment';
import { plainToClass } from 'class-transformer';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	public users: User[] = [];

	constructor(
		private http: HttpClient
	) {}

	getAllUsers(): void {
		this.http.get(`${environment.apiUrl}/users`).toPromise().then((result: any) => {
			console.log(plainToClass(User, result));
			// this.users = plainToClass(User, result);
		}).catch((err) => {
			console.log(err);
		});
	}
}
