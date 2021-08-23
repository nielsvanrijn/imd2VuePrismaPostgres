import { fadeInAnimation, fadeOut } from 'src/app/animations/fade.animation';
import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { defaultIfEmpty, filter, first, tap } from 'rxjs/operators';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
	animations: [
		fadeOut(),
		fadeInAnimation,
	]
})
export class AccountComponent implements OnInit {
	moment = moment;

	public toggle = false;
	public array = ['All', 'Actors', 'Movies', 'Genres', 'Directors'];
	public selected = 'All';

	public steps = [
		{name: 'Create account', done: true },
		{name: 'Add profile picture', done: false },
		{name: 'Add profile bio', done: false },
		{name: 'Add items to watchlist', done: false },
	]

	get firstNotDoneIndex(): number {
		return this.steps.findIndex((s) => !s.done);
	}

	constructor(
		public userService: UserService,
	) { }

	ngOnInit() {
		this.userService.userSubject.pipe(
			tap((user) => {
				console.log(user);
			}),
		);
	}

}
