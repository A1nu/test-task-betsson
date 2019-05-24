import { Movie } from '../../models/movie';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
	selector: 'app-movie-item',
	templateUrl: './movie-item.html',
	styleUrls: ['./movie-item.sass']
})
export class MovieItemComponent implements OnInit {
	@Input() movie: Movie;
	@Output() select = new EventEmitter();

	constructor(private sanitizer: DomSanitizer) {}

	ngOnInit() {}

	getImageUrl() {
		const url = '../../../assets/images/movie-covers/' + this.movie.img;
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}
}
