import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movies } from '../../assets/movie.mock-data';
import { from } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MoviesService {
	constructor(private http: HttpClient) {}

	updateMovies() {
		return from(movies);
	}
}
