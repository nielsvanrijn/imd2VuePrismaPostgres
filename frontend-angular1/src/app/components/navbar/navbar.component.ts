import { fadeIn, fadeOut } from 'src/app/animations/fade.animation';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	host: {
		class: ''
	},
	animations: [
		fadeIn(),
		fadeOut()
	]
})
export class NavbarComponent implements OnInit {

	constructor() { }

	public toggle = false;
	public array = ['All', 'Actors', 'Movies', 'Genres', 'Directors'];
	public selected = 'All';

	ngOnInit(): void {
	}

}
