import { Pokemon, Team } from '.';

export interface Profile {
  id: string;
  username: string;
  trainerCode: string;
  gender: number;
  level: number;
  team: Partial<Team>;
  featuredPokemen: Partial<Pokemon>[];
}
