import { genreType, Movie } from '../../models/movie';
import {
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import {
	filterByGenre,
	filterSearchedMovies,
	getMovies,
	searchMovies
} from '../../store/selectors/movies';
import { IAppState } from '../../store/state/main';
import {
	getQueryParams,
	getSearchQuery
} from '../../store/selectors/application';
import { NavigationEnd, Router } from '@angular/router';
import {
	animate,
	state,
	style,
	transition,
	trigger
} from '@angular/animations';

@Component({
	animations: [
		trigger('openClose', [
			// ...
			state(
				'open',
				style({
					height: window.innerWidth < 767 ? '300px' : '200px',
					opacity: 1,
					backgroundColor: 'gray'
				})
			),
			state(
				'closed',
				style({
					height: '0',
					opacity: 0,
					backgroundColor: 'white'
				})
			),
			transition('open => closed', [animate('1s')]),
			transition('closed => open', [animate('0.5s')])
		])
	],
	selector: 'app-film-list',
	templateUrl: './movie-list.html',
	styleUrls: ['./movie-list.sass']
})
export class MovieListComponent implements OnInit, OnDestroy {
	constructor(
		private store: Store<IAppState>,
		private router: Router,
		private location: Location
	) {
		this.navigationSubscription = this.router.events.subscribe((e: any) => {
			if (e instanceof NavigationEnd) {
				this.initialiseInvites();
			}
		});
		this.location = location;
	}
	isFiltersShown = false;
	navigationSubscription;
	filters = [];
	search: string;

	@Output() select = new EventEmitter();
	movies$: Observable<Movie[]>;

	static castFiltersToArray(filters) {
		if (typeof filters === 'string') {
			return filters.split(' ');
		}
		return filters;
	}

	ngOnInit() {
		this.store.dispatch({
			type: '[Application] Set title',
			payload: { title: 'Movies Collection' }
		});

		this.updateFromQuery();

		this.getMoviesByQuery();
	}

	initialiseInvites(): void {
		this.updateSearchFromQuery();
		this.getMoviesByQuery();
	}

	ngOnDestroy() {
		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
	}

	getMoviesByQuery() {
		if (
			this.search &&
			this.search !== 'null' &&
			this.search.length > 0 &&
			this.filters.length > 0
		) {
			this.getSearchedMoviesFilteredByGenre();
		} else if (
			this.search &&
			this.search.length > 0 &&
			this.search !== 'null'
		) {
			console.log('search', this.search);
			this.getMoviesByName();
		} else if (this.filters.length > 0) {
			this.getFilteredMovies();
		} else {
			this.getMovies();
		}
	}

	private getMovies() {
		this.movies$ = this.store.select(getMovies);
	}

	getGenresArray() {
		return Object.keys(genreType);
	}

	addFilter(item: string) {
		if (this.filters.includes(item)) {
			this.filters = this.filters.filter((x) => x !== item);
		} else {
			this.filters.push(item);
		}
		this.store.select(getQueryParams).subscribe((x) => {
			console.log(x);
			const params = [];
			if (x.search) {
				params.push('search=' + x.search);
			}
			if (this.filters.length > 0) {
				this.filters.forEach((filter) => {
					params.push('filters[]=' + filter);
				});
			}
			console.log(params);
			if (params.length > 0) {
				this.location.go('/movies?' + params.join('&'));
			} else {
				this.location.go('/movies');
			}
		});
		this.getMoviesByQuery();
	}

	private getFilteredMovies() {
		this.movies$ = this.store.select(filterByGenre(this.filters));
	}

	private getMoviesByName() {
		this.movies$ = this.store.select(searchMovies(this.search));
	}

	private getSearchedMoviesFilteredByGenre() {
		this.movies$ = this.store.select(
			filterSearchedMovies(this.search, this.filters)
		);
	}

	private updateFromQuery() {
		this.store.select(getQueryParams).subscribe((params) => {
			if (params.search && params.search !== 'null' && params['filters[]']) {
				this.filters = MovieListComponent.castFiltersToArray(
					params['filters[]']
				);
				this.isFiltersShown = true;
				this.search = params.search;
				return;
			} else if (params['filters[]']) {
				this.filters = MovieListComponent.castFiltersToArray(
					params['filters[]']
				);
				this.isFiltersShown = true;
				return;
			} else if (params.search) {
				this.search = params.search;
				return;
			} else {
				this.getMovies();
			}
		});
	}

	private updateSearchFromQuery() {
		this.store.select(getSearchQuery).subscribe((x) => (this.search = x));
	}
}
