const API_URL = 'https://food-fighters-server-production.up.railway.app/api';

export const loginRequest = async (username: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to sign in');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
}
