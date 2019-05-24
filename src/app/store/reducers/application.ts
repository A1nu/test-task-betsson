import { ActionReducerMap } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { IAppState } from '../state/main';
import { movieReducer } from './movies';
import {
	ApplicationState,
	initialApplicationState
} from '../state/application';
import { ApplicationActions } from '../actions/application';

export function applicationReducer(
	state = initialApplicationState,
	action: any
): ApplicationState {
	switch (action.type) {
		case ApplicationActions.SetTitle:
			return {
				...state,
				title: action.payload.title
			};
		default:
			return state;
	}
}

export const appReducers: ActionReducerMap<IAppState, any> = {
	router: routerReducer,
	movies: movieReducer,
	application: applicationReducer
};
