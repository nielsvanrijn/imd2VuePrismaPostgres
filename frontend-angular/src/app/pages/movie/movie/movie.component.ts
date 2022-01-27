import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { fadeInAnimation } from 'src/app/animations/fade.animation';
import { Genre } from 'src/app/models/Genre';
import { Movie } from 'src/app/models/Movie';
import { Person } from 'src/app/models/Person';
import { MovieService } from 'src/app/services/movie.service';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.scss'],
	animations: [
		fadeInAnimation,
	]
})
export class MovieComponent {
	id: number | null = null;
	errorResponse: Array<{location: string; msg: string; param: string}> = [];
	readonly moviePosterFileTypes = ['image/heif', 'image/jpeg', 'image/png'];
	genres: Genre[] = [];
	persons: Person[] = [];

	// movie: Movie = new Movie;
	readonly movie$ = new BehaviorSubject(new Movie);

	constructor(
		private route: ActivatedRoute,
		public router: Router,
		public movieService: MovieService,
	) {
		this.route.paramMap.subscribe((params: ParamMap) => {
			if(params.get('id')) {
				this.id = +params.get('id')!;
				this.movieService.getMovie(this.id!).subscribe({
					next: (result) => {
						// this.movie = plainToInstance(Movie, result);
						this.movie$.next(plainToInstance(Movie, result));
					},
					error: (e) => console.log('movieService.getMovie error', e)
				})
			}
		});
		this.callGetAllGenres();
		this.callgetAllPersons();
	}
	
	callCreateMovie(movie: Movie) {
		this.movieService.createMovie(movie).subscribe({
			next: () => this.router.navigate(['movies']),
			error: (e) => {
				this.errorResponse = e.error;
			},
		});
	}

	callUploadMoviePoster(file: File) {
		this.movieService.uploadMoviePoster(file).then((sub) => sub.subscribe({
			next: (result: any) => {
				if (this.movie$.getValue().posterUrls) this.movie$.getValue().posterUrls.push(result.url);
				else this.movie$.getValue().posterUrls = [result.url];
				this.movie$.next(this.movie$.getValue());
			},
			error: (e: any) => {
				console.log('callUploadMoviePoster error', e);
			},
		}));
	}

	callGetAllGenres() {
		this.movieService.getAllGenres().subscribe({
			next: (result) => this.genres = plainToInstance(Genre, result),
			error: (e) => console.log('callGetAllGenres error', e)
		});
	}

	callgetAllPersons() {
		this.movieService.getAllPersons().subscribe({
			next: (result) => this.persons = plainToInstance(Person, result),
			error: (e) => console.log('callgetAllPersons error', e)
		});
	}

	callUpdateMovie(movie: Movie) {
		this.movieService.updateMovie(movie).subscribe({
			next: () => this.router.navigate(['movies']),
			error: (e) => {
				this.errorResponse = e.error;
			},
		});
	}
}
