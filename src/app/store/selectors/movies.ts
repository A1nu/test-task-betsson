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

export const searchMovies = (key: string) =>
	createSelector(
		getMovies,
		(movies) =>
			movies.filter(
				(item) => item.name.toLowerCase().indexOf(key.toLowerCase()) > -1
			)
	);

export const filterByGenre = (keys: string[]) =>
	createSelector(
		getMovies,
		(movies) => {
			return movies.filter((item) => {
				let filtered = true;
				keys.forEach((key) => {
					if (!item.genres.includes(genreType[key])) {
						filtered = false;
					}
				});
				return filtered;
			});
		}
	);

export const filterSearchedMovies = (search: string, filters: string[]) =>
	createSelector(
		searchMovies(search),
		(movies) => {
			console.log(movies);
			return movies.filter((item) => {
				let filtered = true;
				filters.forEach((key) => {
					if (!item.genres.includes(genreType[key])) {
						filtered = false;
					}
				});
				return filtered;
			});
		}
	);
