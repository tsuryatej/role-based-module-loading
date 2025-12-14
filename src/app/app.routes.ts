import { Routes } from '@angular/router';
import { Login } from './core/auth/login/login';
import { Logout } from './core/auth/logout/logout';
import { Register } from './core/auth/register/register';
import { Admin } from './core/auth/admin/admin';
import { Dashboard } from './core/auth/dashboard/dashboard';
import { Faq } from './core/layout/pages/faq/faq';
import { Home } from './core/layout/pages/home/home';
import { About } from './core/layout/pages/about/about';
import { Contact } from './core/layout/pages/contact/contact';
import {NotFound} from './core/not-found/not-found';
import {ForgotPassword} from './core/auth/forgot-password/forgot-password';
import {authGuard} from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'faq', component: Faq },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'register', component: Register },
  { path: 'admin', component: Admin },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'forgot-password', component: ForgotPassword },

  // default
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // explicit 404 route (optional but nice to have)
  { path: 'not-found', component: NotFound },

  // wildcard 404
  { path: '**', component: NotFound }
];
