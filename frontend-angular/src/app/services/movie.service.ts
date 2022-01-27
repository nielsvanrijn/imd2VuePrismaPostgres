import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { instanceToPlain } from 'class-transformer';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/Movie';
import { Genre } from '../models/Genre';
import { hash } from 'bcryptjs';
import { Person } from '../models/Person';

@Injectable({
	providedIn: 'root'
})
export class MovieService {

	constructor(
		private http: HttpClient
	) { }

	createMovie(movie: Movie) {
		return this.http.post<Movie>(`${environment.apiUrl}/movie`, movie);
	}

	async uploadMoviePoster(file: File) {
		const hashedUsername = await hash(environment.uploadUserName, 12);
		const hashedPassword = await hash(environment.uploadApiPass, 12);

		const formData = new FormData();
		formData.append('file', file);
		
		return this.http.post(environment.uploadApiUrl, formData, { headers: { Authorization: 'Basic ' + btoa(`${hashedUsername}:${hashedPassword}`)}});
	}

	getMovie(movieId: number) {
		return this.http.get<Movie>(`${environment.apiUrl}/movie/${movieId}`);
	}

	getAllMovies() {
		return this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
	}

	updateMovie(movie: Movie) {
		return this.http.patch<Movie>(`${environment.apiUrl}/movie/${movie.id}`, movie);
	}

	deleteMovie(movieId: number) {
		console.log(movieId);
		return this.http.delete(`${environment.apiUrl}/movie/${movieId}`).subscribe({
			next: (value) => console.log(value),
			error: (e) => console.log(e),
		});
	}

	getAllGenres() {
		return this.http.get<Genre[]>(`${environment.apiUrl}/genres`);
	}

	getAllPersons() {
		return this.http.get<Person[]>(`${environment.apiUrl}/persons`);
	}
}
