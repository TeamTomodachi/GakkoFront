type Fragment = string;

export function withFragment(fragment: Fragment, query: string): string {
    return query + fragment;
}

export const ProfileData: Fragment = `
    fragment ProfileData on Profile {
        username
        trainerCode
        gender
        team {
            id
        }
        featuredPokemen {
            id
            name
            spriteImageUrl
            pogoImageUrl
        }
    }
`;
