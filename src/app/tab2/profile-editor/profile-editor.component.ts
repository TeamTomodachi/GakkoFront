import { Component, OnInit } from '@angular/core';
import { TokenServiceService } from '../../services/token-service.service';
import { Pokemon, Profile, Team } from '../../models';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent implements OnInit {
  private pokemen: Partial<Pokemon>[] = [];
  private teams: Partial<Team>[] = [];
  private me: Profile = null;

  constructor(private tokenService: TokenServiceService) { }

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
          featuredPokemen
        }
        teams {
          id
          name
        }
        pokemon {
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
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}: ${await response.text()}`);
    }

    const { me, pokemen, teams } = await response.json();
    this.me = me;
    this.pokemen = pokemen;
    this.teams = teams;
  }

  async onSubmit() {
    // save current state of me
    const query = `
      mutation UpdateUser($profile: ProfileInput!) {
        updateProfile(profile: $profile)
      }
    `;

    const response = await fetch('/api-gateway/api/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables: { profile: this.me },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`${response.statusText}: ${await response.text()}`);
    }
  }
}
