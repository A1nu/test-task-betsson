import { RouterReducerState } from '@ngrx/router-store';

import { initialMovieState, MovieState } from './movies';
import { ApplicationState, initialApplicationState } from './application';

export interface IAppState {
	router?: RouterReducerState;
	movies: MovieState;
	application: ApplicationState;
}

export const initialAppState: IAppState = {
	movies: initialMovieState,
	application: initialApplicationState
};

export function getInitialState(): IAppState {
	return initialAppState;
}
