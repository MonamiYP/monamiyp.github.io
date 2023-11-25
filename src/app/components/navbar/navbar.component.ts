import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  toggleTheme() {
    console.log('toggle');
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
  } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
  }
  }
}
