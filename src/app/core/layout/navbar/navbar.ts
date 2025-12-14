import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
interface NavItem {
  label: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  mainTitle: string = 'Role Based Module Loading';
  leftLinks: NavItem[] = [
    { label: 'Home', path: '/home', exact: true },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Faq', path: '/faq' },
  ];

  // Right side menu
  rightLinks: NavItem[] = [
    { label: 'Login', path: '/login' },
    { label: 'Register', path: '/register' }
  ];
}
