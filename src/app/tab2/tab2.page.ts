import {
    Component, OnInit
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TokenServiceService } from '../services/token-service.service';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
    constructor(private tokenService: TokenServiceService,
        private modalController: ModalController){

    }
    ngOnInit(){
        console.log(this.tokenService.getToken());
    }

    async openProfileEditor() {
        const modal = await this.modalController.create({
            component: ProfileEditorComponent,
        });
        await modal.present();
    }
}