import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TokenServiceService } from '../../services/token-service.service';
import { Pokemon, Profile, Team } from '../../models';

import { withFragment, ProfileData } from 'src/fragments';

@Component({
    selector: 'app-profile-editor',
    templateUrl: './profile-editor.component.html',
    styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent implements OnInit {
    private pokemen: Partial<Pokemon>[] = [];
    private teams: Partial<Team>[] = [];
    @Input()
    public profile: Profile = null;
    public loaded = false;

    constructor(private tokenService: TokenServiceService,
        public modalController: ModalController) { }

    async ngOnInit() {
        const query = withFragment(ProfileData, `
            query {
                me {
                    ...ProfileData
                }
                teams {
                    id
                    name
                }
                pokemen {
                    id
                    name
                }
                badges {
                    id
                    name
                }
            }
        `);
        const token = await this.tokenService.getToken();
        if (!token) {
            return;
        }
        // get current user
        const response = await fetch('/api-gateway/api/graphql', {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: {
                token,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`${response.statusText}: ${await response.text()}`);
        }

        const { me, pokemen, teams } = (await response.json()).data;
        this.profile = me;
        this.pokemen = pokemen;
        this.teams = teams;
        this.loaded = true;
    }

    async onSubmit() {
        // save current state of me
        const query = withFragment(ProfileData, `
            mutation UpdateUser($profile: ProfileInput!) {
                updateMe(profile: $profile) {
                    ...ProfileData
                }
            }
        `);

        const profile = {
            username: this.profile.username,
            trainerCode: this.profile.trainerCode,
            gender: this.profile.gender,
            teamId: this.profile.team.id,
            level: this.profile.level,
            featuredPokemon1: this.profile.featuredPokemen[0].id,
            featuredPokemon2: this.profile.featuredPokemen[1].id,
            featuredPokemon3: this.profile.featuredPokemen[2].id,
        };
        const token = await this.tokenService.getToken();
        if (!token) {
            return;
        }

        const response = await fetch('/api-gateway/api/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables: { profile },
            }),
            headers: {
                token,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`${response.statusText}: ${await response.text()}`);
        }

        const { updateMe } = (await response.json()).data;

        this.closeForm(updateMe);
    }

    public closeForm(...args) {
        this.modalController.dismiss(...args);
    }
}
