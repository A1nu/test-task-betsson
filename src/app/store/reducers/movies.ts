import { initialMovieState, MovieState } from '../state/movies';
import { MovieActions } from '../actions/movies';

export function movieReducer(
	state = initialMovieState,
	action: any
): MovieState {
	switch (action.type) {
		case MovieActions.AddMovies:
			return {
				...state,
				movies: action.payload.movies
			};
		default:
			return state;
	}
}
