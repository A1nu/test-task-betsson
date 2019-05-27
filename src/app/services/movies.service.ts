import { Injectable } from '@angular/core';
import { movies } from '../../assets/movie.mock-data';
import { from } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MoviesService {
	constructor() {}

	updateMovies() {
		return from(movies);
	}
}
