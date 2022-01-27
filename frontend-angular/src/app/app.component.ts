import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';

// import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import { faExclamationCircle, faDog, faCheck } from '@fortawesome/pro-solid-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	constructor(
		public auth: AuthService,
		private faConfig: FaConfig,
		private library: FaIconLibrary
	) {
		this.faConfig.fixedWidth = true;
		faConfig.defaultPrefix = 'fas';
		this.library.addIcons(faExclamationCircle, faDog, faCheck);
	}
}
