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

const initializeData = (key: string, data: IUser[] | ICountry[] | IDepartment[] | IStatus[]) => {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(data));
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
        users.push(user);
        localStorage.setItem(USERS, JSON.stringify(users));
        return users;
    });

export const api = {
    getUsers,
    getFilters,
    addUser
};
