import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { getApplicationTitle } from './store/selectors/application';
import { Observable } from 'rxjs';
import { IAppState } from './store/state/main';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from './services/movies.service';

@NgModule({
	imports: [BrowserAnimationsModule, MatButtonModule]
})
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
	title: Observable<string>;
	searchForm = new FormControl();
	constructor(
		private store: Store<IAppState>,
		private router: Router,
		private movieService: MoviesService
	) {}

	ngOnInit(): void {
		const movies = [];
		this.title = this.store.select(getApplicationTitle);
		this.movieService.updateMovies().subscribe((x) => movies.push(x));
		this.store.dispatch({
			type: '[Movies] Add movies',
			payload: { movies }
		});
	}

	onSubmit() {
		this.router.navigateByUrl(`movies?search=${this.searchForm.value}`);
	}
}
