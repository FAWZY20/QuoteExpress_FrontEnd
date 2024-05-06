import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  scrollToDevis(){
    var element = document.querySelector('.header-bloc-list');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
