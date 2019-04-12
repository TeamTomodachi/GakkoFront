import {
    Component
} from '@angular/core';

import {
    TokenServiceService
} from '../services/token-service.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-tab4',
    templateUrl: 'tab4.page.html',
    styleUrls: ['tab4.page.scss']
})

export class Tab4Page {
    user: string;
    email: string;
    pass: string;

    constructor(
        private tokenservice: TokenServiceService,
        private router: Router
    ) {}

    async onSubmit() {
        // Get user/email/pass
        const clientInfo = {
            'username': this.user,
            'email': this.email,
            'password': this.pass,
        };
        // Get Token from /auth/api/authenticate
        const { token } = await this.createAccount(clientInfo);

        this.tokenservice.setToken(token);
        this.router.navigateByUrl('tabs/tab2');
    }

    async createAccount(info) {
        const response = await fetch('/auth/api/UserAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        });

        if (!response.ok) {
            throw new Error(`${response.statusText}: ${await response.text()}`);
        }

        return response.json();
    }
}