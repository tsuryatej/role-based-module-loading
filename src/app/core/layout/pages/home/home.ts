import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  appTitle = 'Role Based Module Loading';

  featureCards = [
    {
      title: 'Role-based Modules',
      desc: 'Load only the modules needed for each user role to keep the app fast and secure.',
      link: '/about',
      linkLabel: 'Learn more'
    },
    {
      title: 'Secure Authentication',
      desc: 'Login and Register flows built with best practices for modern Angular apps.',
      link: '/login',
      linkLabel: 'Go to Login'
    },
    {
      title: 'Modular Architecture',
      desc: 'Separation of core, shared, and feature modules for clean, scalable code.',
      link: '/contact',
      linkLabel: 'Contact us'
    }
  ];
}
