import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getToken() {
    return window.localStorage.getItem('token');
  }
  getRefreshToken() {
    return window.localStorage.getItem('refresh_token');
  }

  saveToken(token: string) {
    window.localStorage.setItem('token', token);
  }
  saveRefreshToken(refresh_token: string) {
    window.localStorage.setItem('refresh_token', refresh_token);
  }
  removeToken() {
    window.localStorage.removeItem('token');
  }
  removeRefreshToken() {
    window.localStorage.removeItem('refresh_token');
  }
}
