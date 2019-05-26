import { Action } from '@ngrx/store';
import { MovieState } from '../state/movies';

export enum MovieActions {
	AddMovies = '[Movies] Add movies'
}

export class AddMovies implements Action {
	public readonly type = MovieActions.AddMovies;
	constructor(public payload: MovieState) {}
}
