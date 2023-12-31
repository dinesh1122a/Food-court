import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../Models/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpclient: HttpClient) {}

  logincheck(logindata: login) {
    return this.httpclient.post<any>(
      'http://localhost:9000/user/login',
      logindata
    );
  }

  register(signupdata: any) {
    return this.httpclient.post<any>(
      'http://localhost:9000/userprofile/signup',
      'imageFile',
      signupdata
    );
  }
}
