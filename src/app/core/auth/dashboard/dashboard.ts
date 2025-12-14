import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { AuthService, DashboardModule } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  readonly loading = signal(true);
  readonly error = signal('');
  readonly modules = signal<DashboardModule[]>([]);

  get user() {
    return this.authService.currentUser;
  }

  constructor(readonly authService: AuthService) {}

  get user() {
    return this.authService.currentUser;
  }

  ngOnInit() {
    this.authService.getRoleModules().subscribe({
      next: (modules) => {
        this.modules.set(modules);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load modules for your role.');
        this.loading.set(false);
      }
    });
  }
}
