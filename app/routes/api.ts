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
};

export const registerRequest = async (userData: any) => {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};

export const checkUsernameRequest = async (username: string) => {
    try {
        const response = await fetch(`${API_URL}/users/check-username`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        if (!response.ok) {
            throw new Error('Failed to check username');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};

export const getProfileByUsernameRequest = async (username: string) => {
    try {
        const response = await fetch(`${API_URL}/users/profile/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get profile');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};

export const updateProfileRequest = async (username: string, profileData: any) => {
    try {
        const response = await fetch(`${API_URL}/users/profile/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};

export const addFriendRequest = async (username: string, friendUsername: string) => {
    try {
        const response = await fetch(`${API_URL}/users/${username}/friends`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ friendUsername }),
        });

        if (!response.ok) {
            throw new Error('Failed to add friend');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};

export const sendFriendRequestRequest = async (username: string, friendUsername: string) => {
    try {
        const response = await fetch(`${API_URL}/users/${username}/friend-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ friendUsername }),
        });

        if (!response.ok) {
            throw new Error('Failed to send friend request');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};

export const getFriendsRequest = async (username: string) => {
    try {
        const response = await fetch(`${API_URL}/users/${username}/friends`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get friends');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};

export const getLeaderboardRequest = async (skip: number = 0, limit: number = 100, friendsOnly: boolean = false) => {
    try {
        const response = await fetch(`${API_URL}/leaderboard?skip=${skip}&limit=${limit}&friendsOnly=${friendsOnly}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get leaderboard');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};