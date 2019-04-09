import { Pokemon, Team } from '.';

export interface Profile {
  id: string;
  username: string;
  trainerCode: string;
  team: Partial<Team>;
  featuredPokemen: Partial<Pokemon>[];
}
