import { mockData } from '@/app/mockData';
import { IUser } from '@/app/types';

enum ERequestKey {
    USERS = 'users',
}

const { USERS } = ERequestKey;

export function apiRequest<T>(callback: () => T, delay = 300): Promise<T> {
    return new Promise<T>((resolve) => {
        setTimeout(() => {
            resolve(callback());
        }, delay);
    });
}

const initializeData = (key: string, data: IUser[]) => {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

initializeData(USERS, mockData.users);

const getUsers = (): Promise<IUser[]> =>
    apiRequest(() => {
        const storedUsers = localStorage.getItem(USERS);
        return storedUsers ? JSON.parse(storedUsers) : [];
    });

export const usersApi = {
    getUsers,
};
