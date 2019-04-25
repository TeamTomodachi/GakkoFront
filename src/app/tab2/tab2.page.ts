import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TokenServiceService } from '../services/token-service.service';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { Profile } from 'src/app/models';
import { doQuery } from 'src/doQuery';
import { withFragment, ProfileData } from 'src/fragments';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
    public profile: Profile = null;

    constructor(private tokenService: TokenServiceService,
        private modalController: ModalController,
        private alertController: AlertController,
        private router: Router) {
            router.events.subscribe((e) => {
                if (e instanceof NavigationEnd
                    && (
                        e.url.includes('tabs/tab2')
                        || e.urlAfterRedirects.includes('tabs/tab2')
                    )
                    && !this.profile
                ) {
                    this.ngOnInit();
                }
            });
        }

    async ngOnInit() {
        const token = await this.tokenService.getToken();
        /*
            If the token does not exist, this will knock you back to tab1. 
            Otherwise, it'll collect the profile info from the token and 
            display it.
        */
        if (!token) {
            return;
        }
        const { data } = await doQuery(
            token,
            withFragment(ProfileData, `
            query {
                me {
                    ...ProfileData
                }
            }
            `),
        );
        this.profile = data.me;
    }

    async openProfileEditor() {
        const modal = await this.modalController.create({
            component: ProfileEditorComponent,
            cssClass: 'editProfile',
            componentProps: {
                profile: this.profile,
            },
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        if (data) {
            this.profile = data;
        }
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
