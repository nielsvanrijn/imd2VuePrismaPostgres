import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { fadeInAnimation } from 'src/app/animations/fade.animation';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
	selector: 'app-edit-account',
	templateUrl: './edit-account.component.html',
	styleUrls: ['./edit-account.component.scss'],
	animations: [
		fadeInAnimation,
	]
})
export class EditAccountComponent implements OnInit {
	user$!: Observable<User>;

	public avatarFileTypes = ['image/heif', 'image/jpeg', 'image/png'];

	constructor(
		public userService: UserService,
		public router: Router,
	) {}

	ngOnInit() {
		this.user$ = this.userService.getCurrentUser();
	}

	callUpdateCurrentUser(user: User) {
		this.user$ = this.userService.updateCurrentUser(user)
			.pipe(
				tap(() => this.router.navigate(['account'])),
				catchError((err, caught) => {
					console.log('Update user err', err);
					return caught;
				})
			);
	}

	// Oke leuk die async Pipe maar moet ik nu met [ngModel] gaan kutten om mijn url te setten?
	// Dit werkt niet omdat in $user alleen een observable zit geen user data
	// Als ik dat wil moet ik subscriben en als ik dat doe kan ik net zo goed alles via de subscribe doen (lijkt mij fijner)

	// MAAR bij nader inzien doet mijn app-input al hetzelfde moet allen het voor app-file-input doen 🤨 doable maar niet idiaal (vind ik)

	uploadAvatar(file: File){
		console.log(file);
		this.userService.updateCurrentUserAvatar(file).then((result: any) => {
			console.log('here');
			this.user$.pipe(map(user => user.profile!.avatar_url = result.url));
		}).catch((err) => {
			console.log(err);
		});
	}

}
