import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  pageTitle = 'Forgot your password?';
  pageSubtitle =
    'Enter the email address associated with your account. We’ll send you a link to reset your password.';
}
