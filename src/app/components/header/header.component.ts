import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  el: any;
  scroll(id: string) {
    console.log(`scrolling to ${id}`);
    this.el = document.getElementById(id);
    this.el.scrollIntoView();
  }
}
