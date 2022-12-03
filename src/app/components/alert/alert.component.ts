import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <nb-alert status="success" closable>You have been successfully authenticated!</nb-alert>
  `,
  styles: [
  ]
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
