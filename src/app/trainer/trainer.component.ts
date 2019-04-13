import {
    Component,
    Input,
} from '@angular/core';

import { TokenServiceService } from '../services/token-service.service';
import { Profile } from 'src/app/models/profile';

@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.scss'],
})

export class TrainerComponent {
    @Input()
    public profile: Profile = null;

    constructor() {}
}
