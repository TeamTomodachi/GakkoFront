type Fragment = string;

export function withFragment(fragment: Fragment, query: string): string {
    return query + fragment;
}

export const ProfileData: Fragment = `
    fragment ProfileData on Profile {
        username
        trainerCode
        level
        gender
        team {
            id
            name
        }
        featuredPokemen {
            id
            name
            spriteImageUrl
            pogoImageUrl
        }
    }
`;
