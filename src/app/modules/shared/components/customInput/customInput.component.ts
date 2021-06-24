import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'customInput',
  templateUrl: './customInput.component.html',
})
export class CustomInputComponent implements OnInit {
  @Input() disabled = false;

  constructor() {}

  ngOnInit() {}
}
