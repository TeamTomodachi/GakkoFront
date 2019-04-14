import {
    Component
} from '@angular/core';

import {
    TokenServiceService
} from '../services/token-service.service';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
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
        private tokenService: TokenServiceService,
        private router: Router,
        private alertController: AlertController,
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

        this.tokenService.setToken(token);
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

    async onLogoutClick() {
        const alert = await this.alertController.create({
            header: 'Logout?',
            message: 'Are you sure you want to logout of the application?',
            buttons: [
                { 
                    text: 'Yes',
                    role: 'logout',
                    handler: () => {
                        console.log('User has logged out');
                        this.tokenService.deleteToken();
                        window.location.reload();
                    },
                },
                {
                    text: 'No',
                    handler: () => {
                        console.log('User chose not to logout');
                    },
                } 
            ]
          });
      
          await alert.present();
    }
}
