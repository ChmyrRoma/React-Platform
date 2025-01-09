import { mockData } from '@/app/mockData';
import { ICountry, IDepartment, IUser, IStatus } from '@/app/types';

enum ERequestKey {
    USERS = 'users',
    COUNTRIES = 'countries',
    DEPARTMENTS = 'departments',
    STATUSES = 'statuses',
}

const { USERS, COUNTRIES, DEPARTMENTS, STATUSES } = ERequestKey;

export function apiRequest<T>(callback: () => T, delay = 300): Promise<T> {
    return new Promise<T>((resolve) => {
        setTimeout(() => {
            resolve(callback());
        }, delay);
    });
}

const isBrowser = typeof window !== "undefined";

const initializeData = (key: string, data: IUser[] | ICountry[] | IDepartment[] | IStatus[]) => {
    if (isBrowser && !localStorage.getItem(key)) {
        if (key === USERS) {
            const usersWithId = (data as IUser[]).map((user, index) => ({
                ...user,
                id: `user-${index}-${Date.now()}`
            }));
            localStorage.setItem(key, JSON.stringify(usersWithId));
        } else {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }
};

initializeData(USERS, mockData.users);
initializeData(COUNTRIES, mockData.countries);
initializeData(DEPARTMENTS, mockData.departments);
initializeData(STATUSES, mockData.statuses);

const getUsers = (): Promise<IUser[]> =>
    apiRequest(() => {
        const storedUsers = localStorage.getItem(USERS);
        return storedUsers ? JSON.parse(storedUsers) : [];
    });

const getFilters = (): Promise<{
    countries: ICountry[];
    departments: IDepartment[];
    statuses: IStatus[];
}> =>
    apiRequest(() => {
        const countries = JSON.parse(localStorage.getItem(COUNTRIES) || '[]');
        const departments = JSON.parse(localStorage.getItem(DEPARTMENTS) || '[]');
        const statuses = JSON.parse(localStorage.getItem(STATUSES) || '[]');
        return { countries, departments, statuses };
    });

const addUser = (user: IUser): Promise<IUser[]> =>
    apiRequest(() => {
        const storedUsers = localStorage.getItem(USERS);
        const users: IUser[] = storedUsers ? JSON.parse(storedUsers) : [];

        const newUserWithId = {
            ...user,
            id: `user-${users.length + 1}-${Date.now()}`,
        };

        users.push(newUserWithId);
        localStorage.setItem(USERS, JSON.stringify(users));
        return users;
    });

const editUser = (updatedUser: IUser): Promise<IUser[]> =>
    apiRequest(() => {
        const storedUsers = localStorage.getItem(USERS);
        if (!storedUsers) return [];

        const users: IUser[] = JSON.parse(storedUsers);

        const userIndex = users.findIndex(user => user.id === updatedUser.id);
        if (userIndex === -1) {
            throw new Error(`User with id ${updatedUser.id} not found`);
        }

        users[userIndex] = { ...users[userIndex], ...updatedUser };
        localStorage.setItem(USERS, JSON.stringify(users));
        return users;
    });

const deleteUser = (userId: string | undefined): Promise<IUser[]> =>
    apiRequest(() => {
        const storedUsers = localStorage.getItem(USERS);
        if (!storedUsers) return [];

        const users: IUser[] = JSON.parse(storedUsers);

        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            throw new Error(`User with id ${userId} not found`);
        }

        users.splice(userIndex, 1);
        localStorage.setItem(USERS, JSON.stringify(users));
        return users;
    });

export const api = {
    getUsers,
    getFilters,
    addUser,
    editUser,
    deleteUser
};
