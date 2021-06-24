import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[error]',
  template: `<p>{{ error }}</p>`,
})
export class ErrorComponent implements OnInit {
  @Input() error = 'Hola';

  constructor() {}

  ngOnInit() {}
}
