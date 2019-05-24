import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieSelectedComponent } from './components/movie-selected/movie-selected.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/application';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatIconModule,
	MatInputModule,
	MatSelectModule,
	MatTableModule
} from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
	declarations: [
		AppComponent,
		MovieListComponent,
		MovieItemComponent,
		MovieSelectedComponent
	],
	imports: [
		BrowserModule,
		StoreModule.forRoot(appReducers),
		HttpClientModule,
		AppRoutingModule,
		StoreRouterConnectingModule.forRoot(),
		BrowserAnimationsModule,
		FormsModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatIconModule,
		MatTableModule,
		ReactiveFormsModule,
		MatSlideToggleModule
	],
	providers: [HttpClient],
	bootstrap: [AppComponent]
})
export class AppModule {}
