import { AuthService } from 'src/app/services/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	public name = '';
	public email = '';
	public password = '';

	constructor(
		public auth: AuthService
	) { }

	ngOnInit(): void {
	}

	callRegister(): void {
		this.auth.register(this.name, this.email, this.password);
	}

}
