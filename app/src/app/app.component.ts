import { Component } from '@angular/core';
import { SearchService } from './shared/search.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    results: object;
    searchTerm$ = new Subject<string>();

    constructor(private searchService: SearchService) {
        console.log('%c AppComponent', 'color: green; font-weight: bold');
        this.searchTerm$.subscribe(inputData => {
            console.log('=> searchTerm$ inputData: ', inputData);
        });
        this.searchService.search(this.searchTerm$).subscribe(results => {
            this.results = results.results;
            console.log('%c AppComponent', 'color: green; font-weight: bold');
            console.log('=> results: ', this.results);
        });
    }
}
