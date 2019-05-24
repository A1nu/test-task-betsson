import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieSelectedComponent } from './components/movie-selected/movie-selected.component';

const routes: Routes = [
	{ path: 'movies', component: MovieListComponent },
	{ path: 'detail/:id', component: MovieSelectedComponent },
	{ path: '', redirectTo: '/movies', pathMatch: 'full' }
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
