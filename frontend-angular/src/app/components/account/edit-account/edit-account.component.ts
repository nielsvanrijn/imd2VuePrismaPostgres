import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { fadeInAnimation } from 'src/app/animations/fade.animation';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { catchError, first, map, tap } from 'rxjs/operators';

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
  	cached: User = new User;

	public avatarFileTypes = ['image/heif', 'image/jpeg', 'image/png'];

	constructor(
		public userService: UserService,
		public router: Router,
	) {}

	ngOnInit() {
		this.user$ = this.userService.getCurrentUser().pipe(
			first(),
			tap((user: User) => {
				this.cached = user;
			})
		);
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

	uploadAvatar(file: File) {
		this.userService.updateCurrentUserAvatar(file).then((result: any) => {
			this.cached.profile!.avatar_url = result.url;
			this.user$ = of(this.cached);
		}).catch((err) => {
			console.log(err);
		});
	}

}
