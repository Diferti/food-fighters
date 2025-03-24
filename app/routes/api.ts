import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const getUserDataRequest = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/data`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get user data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
}

export const getProfileByUsernameRequest = async (username: string) => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/profile/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
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

export const updateProfileRequest = async (profileData: any) => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/update-profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
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

export const addFriendRequest = async (friendUsername: string) : Promise<any> => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/add-friend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ friendUsername }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error('Failed to accept friend request: ' + text);
        }

        const data = await response.text();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};

export const declineFriendRequest = async (friendUsername: string) : Promise<any> => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/decline-friend-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ friendUsername }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error('Failed to decline friend request: ' + text);
        }

        const data = await response.text();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};


export const sendFriendRequestRequest = async (friendUsername: string) => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/send-friend-request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({ friendUsername }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error('Failed to send friend request: ' + text);
        }

        const data = await response.text();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
};

export const getFriendsRequest = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/friends`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
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


export const getFriendRequestsRequest = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/get-friend-requests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get friend requests');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
}

export const getLeaderboardRequest = async (skip: number = 0, limit: number = 100, friendsOnly: boolean = false) => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/leaderboard?skip=${skip}&limit=${limit}&friendsOnly=${friendsOnly}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
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

const createFormData = (imagePath: string) => {
    const data = new FormData();
    const file = {
        uri: imagePath,
        type: 'image/jpeg',
        name: 'photo.jpg'
    } as any;
    data.append('image', file);
    return data;
};

export const sendMealAnalyzeRequest = async (imagePath: string) => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/meal/analyze`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
            },
            body: createFormData(imagePath)
        });

        if (!response.ok) {
            throw new Error('Failed to send analysis request');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return { error: errorMessage };
    }
}