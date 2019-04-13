import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TokenServiceService } from '../services/token-service.service';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { Profile } from 'src/app/models';
import { doQuery } from 'src/doQuery';
import { withFragment, ProfileData } from 'src/fragments';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
    public profile: Profile = null;

    constructor(private tokenService: TokenServiceService,
        private modalController: ModalController) {}

    async ngOnInit() {
        const { data } = await doQuery(
            await this.tokenService.getToken(),
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
}
