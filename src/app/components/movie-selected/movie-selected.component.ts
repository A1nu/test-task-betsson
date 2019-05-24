import { Movie } from '../../models/movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { getMovie } from '../../store/selectors/movies';
import { IAppState } from '../../store/state/main';

@Component({
	selector: 'app-film-selected',
	templateUrl: './movie-selected.html',
	styleUrls: ['./movie-selected.sass']
})
export class MovieSelectedComponent implements OnInit {
	movie: Movie;
	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private store: Store<IAppState>
	) {}
	ngOnInit() {
		this.getMovie();
	}

	private getMovie() {
		const id = +this.route.snapshot.paramMap.get('id');

		this.store.select(getMovie(id)).subscribe((movie) => (this.movie = movie));
		this.store.dispatch({
			type: '[Application] Set title',
			payload: { title: this.movie.name }
		});
	}

	getMovieGenre(item, rowLength, index) {
		return index < rowLength - 1 ? `${item}, ` : `${item}.`;
	}

	goBack() {
		this.location.back();
	}
}
