import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);

  readonly apiBaseUrl = signal(this.authService.getApiBaseUrl());
  readonly apiBaseUrlControl = this.fb.control(this.apiBaseUrl(), [Validators.required]);

  readonly connectionStatus = signal<'checking' | 'online' | 'offline'>('checking');
  readonly connectionError = signal('');

  readonly registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    acceptTerms: [false, Validators.requiredTrue]
  });

  readonly submitting = signal(false);
  readonly error = signal('');
  readonly success = signal('');

  ngOnInit() {
    this.checkApiConnection();
  }

  handleSubmit() {
    if (this.registerForm.invalid || this.submitting()) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name, email, mobile, password, confirmPassword } = this.registerForm.getRawValue();

    if (password !== confirmPassword) {
      this.error.set('Passwords do not match.');
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }

    this.submitting.set(true);
    this.error.set('');
    this.success.set('');

    this.authService
      .register({
        name: name ?? '',
        email: email ?? '',
        mobile: mobile ?? '',
        password: password ?? ''
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.success.set('Registration successful. You can now sign in.');
          this.registerForm.reset();
        },
        error: (err) => {
          this.submitting.set(false);
          const detail = err?.error?.message || err?.message;
          this.error.set(
            detail ? `Unable to create your account: ${detail}` : 'Unable to create your account. Please try again.'
          );
        }
      });
  }

  applyApiBaseUrl() {
    if (this.apiBaseUrlControl.invalid) {
      this.apiBaseUrlControl.markAsTouched();
      return;
    }

    const nextUrl = this.apiBaseUrlControl.value ?? '';
    this.authService.setApiBaseUrl(nextUrl);
    this.apiBaseUrl.set(this.authService.getApiBaseUrl());
    this.checkApiConnection();
  }

  checkApiConnection() {
    this.connectionStatus.set('checking');
    this.connectionError.set('');

    this.authService.healthCheck().subscribe({
      next: () => this.connectionStatus.set('online'),
      error: (err) => {
        this.connectionStatus.set('offline');
        const detail = err?.error || err?.message || 'Unable to reach the API.';
        this.connectionError.set(typeof detail === 'string' ? detail : 'Unable to reach the API.');
      }
    });
  }
}
