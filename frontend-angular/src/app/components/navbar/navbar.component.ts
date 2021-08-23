import { fadeInAnimation, fadeOut } from 'src/app/animations/fade.animation';

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	animations: [
		fadeInAnimation,
		fadeOut()
	]
})
export class NavbarComponent {
	
	constructor(
		public auth: AuthService,
		public userService: UserService,
	) {}

	public toggle = false;
	public array = ['All', 'Actors', 'Movies', 'Genres', 'Directors'];
	public selected = 'All';

}
