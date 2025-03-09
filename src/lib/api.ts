// Mock API service for the DigiProp application

// Types
export interface User {
    id: string;
    email: string;
    name: string;
    userType: 'client' | 'partner';
    avatar?: string;
}

export interface Property {
    id: string;
    title: string;
    address: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    description: string;
    imageUrl?: string;
}

// Mock data
const mockUsers: User[] = [
    {
        id: '1',
        email: 'client@example.com',
        name: 'John Client',
        userType: 'client',
    },
    {
        id: '2',
        email: 'partner@example.com',
        name: 'Jane Partner',
        userType: 'partner',
    }
];

const mockProperties: Property[] = [
    {
        id: '1',
        title: 'Modern Apartment',
        address: '123 Main St, City',
        price: 350000,
        bedrooms: 2,
        bathrooms: 1,
        area: 85,
        description: 'A beautiful modern apartment in the heart of the city.',
    },
    {
        id: '2',
        title: 'Family House',
        address: '456 Park Ave, Suburb',
        price: 550000,
        bedrooms: 4,
        bathrooms: 2,
        area: 180,
        description: 'Spacious family house with a large garden.',
    },
    {
        id: '3',
        title: 'Studio Apartment',
        address: '789 Downtown Rd, City',
        price: 200000,
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        description: 'Cozy studio apartment perfect for singles or young couples.',
    }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API methods
export const api = {
    // Authentication
    async login(email: string, password: string): Promise<{ user: User, token: string }> {
        await delay(500); // Simulate API delay

        const user = mockUsers.find(u => u.email === email);

        if (!user || password !== 'password') { // Simple mock password check
            throw new Error('Invalid email or password');
        }

        return {
            user,
            token: 'mock-jwt-token-' + user.id
        };
    },

    async register(email: string, name: string, password: string, userType: 'client' | 'partner'): Promise<{ user: User, token: string }> {
        await delay(700); // Simulate API delay

        // disable email check for now
        // if (mockUsers.some(u => u.email === email)) {
        //     throw new Error('Email already in use');
        // }

        // Create new user
        const newUser: User = {
            id: (mockUsers.length + 1).toString(),
            email,
            name,
            userType
        };

        mockUsers.push(newUser);

        return {
            user: newUser,
            token: 'mock-jwt-token-' + newUser.id
        };
    },

    // Properties
    async getProperties(): Promise<Property[]> {
        await delay(600);
        return [...mockProperties];
    },

    async getProperty(id: string): Promise<Property> {
        await delay(400);
        const property = mockProperties.find(p => p.id === id);

        if (!property) {
            throw new Error('Property not found');
        }

        return property;
    }
};

// Store for user authentication
export const authStore = {
    user: null as User | null,
    token: null as string | null,

    // Initialize from localStorage
    init() {
        try {
            const storedToken = localStorage.getItem('digiprop_token');

            // Only proceed if we have a token
            if (storedToken) {
                this.token = storedToken;

                // Try to get user data from localStorage
                const storedUser = localStorage.getItem('digiprop_user');

                if (storedUser) {
                    try {
                        // Parse the user data
                        this.user = JSON.parse(storedUser);
                    } catch (e) {
                        console.error("Failed to parse user data, creating default");
                        // If parsing fails, create a default user
                        this.createDefaultUser();
                    }
                } else {
                    // No user data but we have a token - create default user
                    this.createDefaultUser();
                }

                console.log("Auth initialized:", {
                    hasToken: !!this.token,
                    hasUser: !!this.user
                });
            } else {
                // No token means not authenticated
                this.clearAuth();
            }
        } catch (error) {
            console.error('Failed to load auth data from localStorage', error);
            this.clearAuth();
        }
    },

    // Create a default user when we have a token but no user data
    createDefaultUser() {
        const defaultUser: User = {
            id: '1',
            email: 'user@example.com',
            name: 'Aktons',
            userType: 'client'
        };

        this.user = defaultUser;
        localStorage.setItem('digiprop_user', JSON.stringify(defaultUser));
    },

    // Set auth data
    setAuth(user: User, token: string) {
        this.user = user;
        this.token = token;

        localStorage.setItem('digiprop_user', JSON.stringify(user));
        localStorage.setItem('digiprop_token', token);

        console.log("Auth data set successfully");
    },

    // Clear auth data
    clearAuth() {
        this.user = null;
        this.token = null;

        localStorage.removeItem('digiprop_user');
        localStorage.removeItem('digiprop_token');
    }
}; 