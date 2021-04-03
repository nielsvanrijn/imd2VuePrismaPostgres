import { AuthService } from 'src/app/services/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public email = '';
	public password = '';

	constructor(
		public auth: AuthService
	) {}

	ngOnInit(): void {
	}

	callLogin(): void {
		this.auth.login(this.email, this.password);
	}

}
