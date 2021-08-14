import { fadeInAnimation, fadeOut } from 'src/app/animations/fade.animation';

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	animations: [
		fadeInAnimation,
		fadeOut()
	]
})
export class NavbarComponent implements OnInit {

	constructor(
		public auth: AuthService
	) {}

	public toggle = false;
	public array = ['All', 'Actors', 'Movies', 'Genres', 'Directors'];
	public selected = 'All';

	ngOnInit(): void {
		this;
	}

}
