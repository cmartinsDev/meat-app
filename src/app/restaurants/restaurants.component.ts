import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable, from } from "rxjs";
import { switchMap, tap, debounceTime, distinctUntilChanged, catchError } from "rxjs/operators";
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch',
    [
      state('hidden', style({ opacity: 0, "max-height": "0px" })),
      state('visible', style({ opacity: 1, "max-height": "70px", "margin-top": "20px" })),
      transition('* => *', [ animate('250ms 0s ease-in-out') ])
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
  searchBarState = 'hidden';
  restaurants: Restaurant[];
  searchForm: FormGroup;
  seachControl: FormControl;
  
  constructor(private restaurantsService: RestaurantsService, private fb: FormBuilder) { }

  ngOnInit() {
    // Search-bar
    this.seachControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.seachControl
    })
    this.seachControl.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => this.restaurantsService.restaurants(searchTerm)
        .pipe(catchError(error => from([]))))
    ).subscribe(restaurants => this.restaurants = restaurants)
    this.restaurantsService.restaurants().subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
