import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/main';
import { RouterReducerState } from '@ngrx/router-store';
import { ApplicationState } from '../state/application';

export const getRouterState = (state: IAppState) => state.router;
export const getApplicationState = (state: IAppState) => state.application;

export const getSearchQuery = createSelector(
	getRouterState,
	(state: RouterReducerState) =>
		state.state && state.state.root.queryParams.search
);

export const getQueryParams = createSelector(
	getRouterState,
	(state: RouterReducerState) => state.state && state.state.root.queryParams
);

export const getApplicationTitle = createSelector(
	getApplicationState,
	(state: ApplicationState) => state.title
);
