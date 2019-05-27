import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/main';
import { genreType } from '../../models/movie';

export const getMoviesState = (state: IAppState) => {
	return state.movies;
};

export const getMovies = createSelector(
	getMoviesState,
	(x) => x.movies
);

export const getMovie = (id: number) =>
	createSelector(
		getMovies,
		(movies) => movies.find((x) => x.id === id)
	);

export const filterMovies = (query) =>
	createSelector(
		getMoviesState,
		(movies) => {
			let moviesArray = movies.movies;

			if (query.search && query.search.length > 0 && query.search !== 'null') {
				moviesArray = moviesArray.filter(
					(item) =>
						item.name.toLowerCase().indexOf(query.search.toLowerCase()) > -1
				);
			}
			if (query.filters && query.filters.length > 0) {
				moviesArray = moviesArray.filter((item) => {
					let filtered = true;
					query.filters.forEach((key) => {
						if (!item.genres.includes(genreType[key])) {
							filtered = false;
						}
					});
					return filtered;
				});
			}
			return moviesArray;
		}
	);
