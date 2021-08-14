import { environment } from 'src/environments/environment';
import { fadeIn, fadeOut } from 'src/app/animations/fade.animation';
import { plainToClass } from 'class-transformer';
import { User } from 'src/app/models/User';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
	host: {
		class: '',
	},
	animations: [
		fadeIn(),
		fadeOut()
	]
})
export class AccountComponent implements OnInit {
	public user: User | null = null;
	public user2 = new BehaviorSubject<User | null>(null);

	public toggle = false;
	public array = ['All', 'Actors', 'Movies', 'Genres', 'Directors'];
	public selected = 'All';

	@HostBinding('[@fadeInAnimation]') get fadeIn() {
		return true;
	}

	constructor(
		private http: HttpClient
	) {
		this.http.get(`${environment.apiUrl}/user`).toPromise().then((res: any) => {
			this.user = plainToClass(User, res);
			console.log(this.user);
		}).catch((err) => {
			console.log(err);
		});
		
		this.http.get<User>(`${environment.apiUrl}/user`).subscribe(
			(user: User) => this.user2.next(user)
		);

		this.user2.subscribe((user) => {
			console.log(user);
		});
	}

	ngOnInit(): void {
	}

}
