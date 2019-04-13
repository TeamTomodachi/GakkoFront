import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TokenServiceService } from '../../services/token-service.service';
import { Pokemon, Profile, Team } from '../../models';
import { SelectChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent implements OnInit {
  private pokemen: Partial<Pokemon>[] = [];
  private teams: Partial<Team>[] = [];
  public me: Profile = null;
  public loaded: boolean = false;

  constructor(private tokenService: TokenServiceService,
    public modalController: ModalController) { }

  async ngOnInit() {
    const query = `
      query {
        me {
          username
          trainerCode
          gender
          team {
            id
          }
          featuredPokemen {
            id
            name
          }
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
    `;
    // get current user
    const response = await fetch('/api-gateway/api/graphql', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        token: await this.tokenService.getToken(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}: ${await response.text()}`);
    }

    const { me, pokemen, teams } = (await response.json()).data;
    this.me = me;
    this.pokemen = pokemen;
    this.teams = teams;
    this.loaded = true;
    console.log(me);
  }

  compareThing(a, b) {
    return a.id === b.id;
  }

  async onSubmit() {
    // save current state of me
    const query = `
      mutation UpdateUser($profile: ProfileInput!) {
        updateMe(profile: $profile) {
          id
        }
      }
    `;

    const profile = {
      username: this.me.username,
      trainerCode: this.me.trainerCode,
      gender: this.me.gender,
      teamId: this.me.team.id,
      level: this.me.level,
      featuredPokemon1: this.me.featuredPokemen[0].id,
      featuredPokemon2: this.me.featuredPokemen[1].id,
      featuredPokemon3: this.me.featuredPokemen[2].id,
    };

    const response = await fetch('/api-gateway/api/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables: { profile },
      }),
      headers: {
        token: await this.tokenService.getToken(),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}: ${await response.text()}`);
    }

    this.closeForm();
  }

  public closeForm() {
    this.modalController.dismiss();
  }
}
