import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  private token: string;

  constructor(private router: Router) { }

  async getToken(): Promise<string | undefined> {
    if (this.token) {
      return this.token;
    }
    const token: string | null = localStorage.getItem('pokkenToken');

    if (token) {
      const response = await fetch('/auth/api/authtoken', {
        method: 'POST',
        headers: {
          token
        }
      });

      const {isValid} = await response.json();

      if (isValid) {
        this.token = token;
        return token;
      }
    }
    this.router.navigateByUrl('tabs/tab1');
  }

  setToken(token: string) {
    localStorage.setItem('pokkenToken', token);
    this.token = token;
  }
}
