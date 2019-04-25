import { Component, Input, } from '@angular/core';
import { Profile } from 'src/app/models/profile';

@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.scss'],
})

export class TrainerComponent {
    @Input()
    public profile: Profile = null;

    public getTeamImage(): string {
        const base = letter => `https://raw.githubusercontent.com/TeamTomodachi/GakkoFront/master/src/assets/bg_${letter}sfade.png`;
        switch (this.profile.team.name) {
            case 'Mystic':
                return base('m');

            case 'Valor':
                return base('v');

            case 'Instinct':
                return base('i');
        }

        throw new Error(`Unknown team ${this.profile.team.name}`);
    }

    constructor() {}
}
