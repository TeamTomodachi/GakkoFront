/*
    The doQuery function takes in a token, a query and an object of variables.
    The variables are plugged into the query and is put against a graphql schema.
    The graphql schema returns the results of the query in the form of JSON.
*/
export async function doQuery(token: string, query: string, variables = {}): Promise<any> {
    const response = await fetch('/api-gateway/api/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token,
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
        throw new Error(`${response.statusText}: ${await response.text()}`);
    }

    return response.json();
}