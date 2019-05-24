import { Action } from '@ngrx/store';
import { ApplicationState } from '../state/application';

export enum ApplicationActions {
	SetTitle = '[Application] Set title'
}

export class SetTitle implements Action {
	public readonly type = ApplicationActions.SetTitle;
	constructor(public payload: ApplicationState) {}
}

export type AppliactionActions = SetTitle;
