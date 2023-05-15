import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import appConfig from './appConfig';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  get(url: string, isFullPath: boolean = false) {
    const path = isFullPath ? url : `${appConfig.baseUrl}${url}`;
    return this.http.get(path, {
      headers: this.getHeaders(true),
    });
  }

  post(url: string, body: any) {
    return this.http.post(`${appConfig.baseUrl}${url}`, body, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(isAuthRequired: boolean = false) {
    let headers = new HttpHeaders({});
    headers = headers.append('Content-Type', 'application/json');
    if (isAuthRequired)
      headers = headers.append(
        'Authorization',
        `Bearer ${this.tokenService.getToken()}`
      );
    return headers;
  }
}
