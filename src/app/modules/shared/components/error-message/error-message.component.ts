import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[error-message]',
  template: '<p>{{msg}}</p>',
})
export class ErrorMessageComponent implements OnInit {
  @Input() msg = 'Hola';
  constructor() {}

  ngOnInit() {}
}
