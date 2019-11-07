import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mt-not-found',
  templateUrl: './not-found.component.html',
  animations: [
    trigger('notFoundAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity:0, transform: 'translateY(-50px)' }),
        animate('300ms 0s ease-in')
      ])

    ])
  ]
})
export class NotFoundComponent implements OnInit {
  notFoundState:string = 'ready';
  constructor() { }

  ngOnInit() {
  }

}
