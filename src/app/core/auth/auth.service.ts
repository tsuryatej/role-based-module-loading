import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';

export interface AuthenticatedUser {
  id: number | string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: AuthenticatedUser;
}

export interface RegisterPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface DashboardModule {
  id: string;
  title: string;
  description: string;
  cta?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly apiBaseUrl = signal(this.resolveApiBaseUrl());

  private readonly user = signal<AuthenticatedUser | null>(this.restoreUser());

  readonly currentUser = computed(() => this.user());
  readonly isAuthenticated = computed(() => !!this.user());

  getApiBaseUrl() {
    return this.apiBaseUrl();
  }

  setApiBaseUrl(nextUrl: string) {
    const trimmed = (nextUrl ?? '').trim().replace(/\/$/, '');
    const fallbackUrl = `${window.location.origin}/api`;
    const finalUrl = trimmed || fallbackUrl;

    localStorage.setItem('api_base_url', finalUrl);
    this.apiBaseUrl.set(finalUrl);
  }

  register(payload: RegisterPayload) {
    return this.http
      .post<AuthResponse>(`${this.apiBaseUrl()}/register`, payload)
      .pipe(tap((response) => this.persistSession(response)));
  }

  login(payload: LoginPayload) {
    return this.http
      .post<AuthResponse>(`${this.apiBaseUrl()}/login`, payload)
      .pipe(
        tap((response) => this.persistSession(response)),
        tap(() => this.router.navigate(['/dashboard']))
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  getRoleModules() {
    const role = this.user()?.role ?? 'guest';

    return this.http
      .get<DashboardModule[]>(`${this.apiBaseUrl()}/roles/${role}/modules`)
      .pipe(
        map((modules) => modules ?? []),
        catchError(() => of(this.buildFallbackModules(role)))
      );
  }

  healthCheck() {
    return this.http.get(`${this.apiBaseUrl()}/health`, { responseType: 'text' });
  }

  private persistSession(response: AuthResponse) {
    if (!response?.token || !response?.user) {
      return;
    }

    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('current_user', JSON.stringify(response.user));
    this.user.set(response.user);
  }

  private restoreUser(): AuthenticatedUser | null {
    const storedUser = localStorage.getItem('current_user');
    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as AuthenticatedUser;
    } catch (error) {
      localStorage.removeItem('current_user');
      return null;
    }
  }

  private buildFallbackModules(role: string): DashboardModule[] {
    if (role === 'admin') {
      return [
        {
          id: 'user-approval',
          title: 'User Approval',
          description: 'Review and approve pending user registrations.',
          cta: 'Open moderation queue'
        },
        {
          id: 'reports',
          title: 'Reports',
          description: 'Access database-backed analytics for your tenant.',
          cta: 'View dashboards'
        }
      ];
    }

    return [
      {
        id: 'learning-center',
        title: 'Learning Center',
        description: 'Browse onboarding content tailored to your role.',
        cta: 'Continue learning'
      },
      {
        id: 'support',
        title: 'Support',
        description: 'Open a support ticket and track its status.',
        cta: 'Create ticket'
      }
    ];
  }

  private resolveApiBaseUrl(): string {
    const envUrl = this.readFromImportMeta();
    const storedUrl = localStorage.getItem('api_base_url');
    const fallbackUrl = `${window.location.origin}/api`;
    const primary = envUrl || storedUrl || fallbackUrl;

    const trimmed = primary.replace(/\/$/, '');
    return trimmed || fallbackUrl;
  }

  private readFromImportMeta(): string | undefined {
    try {
      const meta = import.meta as { readonly env?: Record<string, string | undefined> };
      return meta?.env?.['NG_APP_API_BASE_URL'];
    } catch (error) {
      return undefined;
    }
  }
}
