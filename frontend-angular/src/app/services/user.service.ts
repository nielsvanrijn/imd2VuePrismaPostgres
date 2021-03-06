import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user/User';
import { environment } from 'src/environments/environment';
import { plainToClass } from 'class-transformer';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public users: User[]

	constructor(
		private http: HttpClient
	) { }

	getAllUsers(): void {
		this.http.get(`${environment.apiUrl}/users`).toPromise().then((result: User[]) => {
			this.users = plainToClass(User, result);
		}).catch((err) => {
			console.log(err);
		});
	}
}
