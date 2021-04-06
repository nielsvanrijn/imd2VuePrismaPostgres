import { environment } from 'src/environments/environment';
import { plainToClass } from 'class-transformer';
import { User } from 'src/app/models/User';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

	public users: User[] = [];

	constructor(
		private http: HttpClient
	) {
		this.http.get(`${environment.apiUrl}/users`).toPromise().then((res: any) => {
			this.users = plainToClass(User, res.data as Array<any>);
		}).catch((err) => {
			console.log(err);
		});
	}

	ngOnInit(): void {
	}

}
