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
import { filterMovies } from '../../store/selectors/movies';
import { IAppState } from '../../store/state/main';
import { getQueryParams } from '../../store/selectors/application';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
	animate,
	state,
	style,
	transition,
	trigger
} from '@angular/animations';
import qs from 'qs';

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

	ngOnInit() {
		this.store.dispatch({
			type: '[Application] Set title',
			payload: { title: 'Movies Collection' }
		});

		this.updateFromQuery();

		this.getMovies();
	}

	initialiseInvites(): void {
		this.updateFromQuery();
		this.getMovies();
	}

	ngOnDestroy() {
		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
	}

	private getMovies() {
		this.movies$ = this.store.select(
			filterMovies({ search: this.search, filters: this.filters })
		);
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
		if ((this.search && this.search.length > 0) || this.filters.length > 0) {
			this.location.go(
				'movies?' + qs.stringify({ search: this.search, filters: this.filters })
			);
		} else {
			this.location.go('movies');
		}
		this.getMovies();
	}

	private updateFromQuery() {
		this.store.select(getQueryParams).subscribe((params) => {
			const query = qs.parse(params);
			if (query.search) {
				this.search = query.search;
			}

			if (query.filters) {
				this.filters = query.filters;
				this.isFiltersShown = true;
			}
		});
	}
}
