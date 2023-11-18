let accessToken;

export const Petfinder = {
    async getAccessToken() {
        const requestUrl = `https://api.petfinder.com/v2/oauth2/token`;
        const response = await fetch(requestUrl, {
            method: 'POST',
            body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_API_KEY}&client_secret=${import.meta.env.VITE_API_SECRET}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const jsonResponse = await response.json();
        accessToken = jsonResponse.access_token;
        const expiresIn = jsonResponse.expires_in;
        window.setTimeout(() => accessToken = '', expiresIn);
    },
    async getPets() {
        await Petfinder.getAccessToken()
        const requestURL = 'https://api.petfinder.com/v2/animals?type=dog&page=2';
        return fetch(requestURL, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Request failed!');
            }
            return response.json();
        })
        .then(data => {
            const pets = data.animals;
            return pets;
        })
        .catch(error => {
            console.error('Error fetching pets: ', error);
            return [];
        });
    }
}

export default Petfinder
