import { Component } from '@angular/core';
import { getBrowserFingerprint } from 'src/helpers/getBrowserFingerprint';
import { ApiService } from '../api.service';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  async handleSubmit() {
    if (this.email && this.password) {
      const browser_fingerprint = await getBrowserFingerprint();
      const body = {
        email: this.email,
        password: this.password,
        browser_fingerprint,
      };
      this.apiService.post('login_check', body).subscribe(
        (response: any) => {
          this.tokenService.saveToken(response.token);
          this.tokenService.saveRefreshToken(response.refresh_token);
          this.router.navigate(['/products']);
        },
        (error) => console.log(error)
      );
    }
    return;
  }
}
