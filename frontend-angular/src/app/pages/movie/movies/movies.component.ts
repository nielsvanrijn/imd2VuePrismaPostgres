import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { Genre } from 'src/app/models/Genre';
import { Movie } from 'src/app/models/Movie';
import { Person } from 'src/app/models/Person';
import { MovieService } from 'src/app/services/movie.service';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
	movies: Movie[] = [];
	filterObject: {sort?: {on: string, direction: string}, filter: {genreIds?: number[], castPersonIds?: number[], directorPersonIds?: number[], writerPersonIds?: number[]}} = {filter: {}};
	sortOptions = [
		{
			label: 'Name',
			states: [null, 'asc', 'desc'],
			iconsStyle: ['far', 'far'],
			icons: ['arrow-down-a-z', 'arrow-up-z-a'],
		},
		{
			label: 'Year',
			states: [null, 'asc', 'desc'],
			iconsStyle: ['far', 'far'],
			icons: ['arrow-down-1-9', 'arrow-up-9-1'],
		},
		{
			label: 'Length',
			states: [null, 'asc', 'desc'],
			iconsStyle: ['far', 'far'],
			icons: ['arrow-down-wide-short', 'arrow-up-short-wide'],
		},
	];
	readonly genres$ = new BehaviorSubject<Genre[] | null>(null);
	readonly persons$ = new BehaviorSubject<Person[] | null>(null);

	constructor(
		public router: Router,
		public movieService: MovieService,
	) {
		this.callGetAllMovies();
		this.callGetAllGenres();
		this.callgetAllPersons();
	}

	callGetAllMovies() {
		this.movieService.getAllMovies().subscribe({
			next: (result) => this.movies = plainToInstance(Movie, result),
			error: (e) => console.log('callGetAllMovies error', e)
		});
	}

	callGetAllGenres() {
		this.movieService.getAllGenres().subscribe({
			next: (result) => this.genres$.next(plainToInstance(Genre, result)),
			error: (e) => console.log(e)
		});
	}

	callgetAllPersons() {
		this.movieService.getAllPersons().subscribe({
			next: (result) => this.persons$.next(plainToInstance(Person, result)),
			error: (e) => console.log(e)
		});
	}

	callGetAllMoviesWithSortAndFilter() {
		this.movieService.getAllMoviesWithSortAndFilter(this.filterObject).subscribe({
			next: (result) => this.movies = plainToInstance(Movie, result),
			error: (e) => console.log('callGetAllMovies error', e)
		});
	}

	logg(x: any) {
		console.log(x);
	}
}
