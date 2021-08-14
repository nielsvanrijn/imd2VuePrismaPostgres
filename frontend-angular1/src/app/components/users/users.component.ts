import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	constructor(
		public userService: UserService
	) { }

	ngOnInit(): void {
		console.log('get all users');
		this.userService.getAllUsers();
	}

}
