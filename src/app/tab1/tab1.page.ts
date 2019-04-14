import {
    Component
} from '@angular/core';

import {
    TokenServiceService
} from '../services/token-service.service';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Tab4Page } from '../tab4/tab4.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
    user: string;
    pass: string;

    constructor(
        private tokenservice: TokenServiceService,
        private router: Router,
        public modalController: ModalController
    ) {}

    async onSubmit() {
        // Get user/pass
        const clientInfo = {
            'username': this.user,
            'password': this.pass,
            'rememberLogin': true,
        };
        // Get Token from /auth/api/authenticate
        const { token } = await this.authenticate(clientInfo);

        this.tokenservice.setToken(token);
        this.router.navigateByUrl('tabs/tab2');
    }

    async authenticate(info) {
        const response = await fetch('/auth/api/Authentication', {
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

    async onSubmitUserCreate() {
    // set up modal
     const modal = await this.modalController.create({
        component: Tab4Page,
        cssClass: 'createAccount'
          });
      await modal.present();
      const { data } = await modal.onDidDismiss();
    }

    onLogoutClick() {
        this.tokenservice.deleteToken();
        window.location.reload();
    }
}
