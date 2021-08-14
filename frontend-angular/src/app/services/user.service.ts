import { environment } from 'src/environments/environment';
import { classToPlain, plainToClass } from 'class-transformer';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { hash } from 'bcryptjs';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	public currentUserSubject = new BehaviorSubject<User | null>(null);
	public currentUser: User | null = null;
	public users: User[] = [];

	constructor(
		private http: HttpClient
	) { }

	//old way may be usefull but meh
	getAllUsers(): void {
		this.http.get(`${environment.apiUrl}/users`).toPromise().then((result: any) => {
			console.log(plainToClass(User, result));
			// this.users = plainToClass(User, result);
		}).catch((err) => {
			console.log(err);
		});
	}

	getCurrentUser(): Observable<User> {
		return this.http.get<User>(`${environment.apiUrl}/user`);
	}
	
	updateCurrentUser(user: User): Observable<User> {
		return this.http.patch<User>(`${environment.apiUrl}/user`, classToPlain(user));
	}

	async updateCurrentUserAvatar(file: File): Promise<Object> {
		const hashedUsername = await hash(environment.uploadUserName, 12);
		const hashedPassword = await hash(environment.uploadApiPass, 12);
		
		const formData = new FormData();
		formData.append('file', file);
		
		return this.http.post(environment.uploadApiUrl, formData, {headers: {
			Authorization: 'Basic ' + btoa(`${hashedUsername}:${hashedPassword}`)
		}}).toPromise();
	}
}
