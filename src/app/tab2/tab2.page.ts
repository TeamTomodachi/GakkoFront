import {
    Component, OnInit
} from '@angular/core';
import { TokenServiceService } from '../services/token-service.service'

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
    constructor(private tokenService: TokenServiceService){}
    ngOnInit(){
        console.log(this.tokenService.getToken());
    }
}