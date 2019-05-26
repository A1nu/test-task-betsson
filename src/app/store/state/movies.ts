import { Movie } from '../../models/movie';

export interface MovieState {
	movies: Movie[];
}

export const initialMovieState: MovieState = {
	movies: []
};
