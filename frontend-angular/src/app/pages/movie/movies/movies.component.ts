import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { plainToInstance } from 'class-transformer';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
	public filter = {
		sort: {
			type: 'single',
			options: [
				{
					name: 'Most Popular',
					active: false
				},
				{
					name: 'Best Rating',
					active: false
				},
				{
					name: 'Newest',
					active: false
				},
			]
		},
		category: {
			type: 'multi',
			options: [
				{
					name: 'All New Arrivals',
					active: false
				},
				{
					name: 'Tees',
					active: false
				},
				{
					name: 'Objects',
					active: false
				},
			]
		},
		color: {
			type: 'multi',
			options: [
				{
					name: 'White',
					active: false
				},
				{
					name: 'Beige',
					active: false
				},
				{
					name: 'Blue',
					active: false
				},
			]
		},
		sizes: {
			type: 'multi',
			options: [
				{
					name: 'S',
					active: false
				},
				{
					name: 'M',
					active: false
				},
				{
					name: 'L',
					active: false
				},
			]
		},
	};
	public arr = ['one', 'two', 'three'];
	public arr2 = [
		{name: 'name one', value: 'value one'},
		{name: 'name two', value: 'value two'},
		{name: 'name three', value: 'value three'}
	];

	public movies: Movie[] = [];

	constructor(
		public router: Router,
		public movieService: MovieService,
	) {
		this.callGetAllMovies();
	}

	callGetAllMovies() {
		this.movieService.getAllMovies().subscribe({
			next: (result) => this.movies = plainToInstance(Movie, result),
			error: (e) => console.log('callGetAllMovies error', e)
		});
	}

}
