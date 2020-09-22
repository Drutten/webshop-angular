import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent implements OnInit {
  @Output() toggledHamburger = new EventEmitter<boolean>();
  isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    this.isOpen = !this.isOpen;
    this.toggledHamburger.emit(this.isOpen);
  }

}
