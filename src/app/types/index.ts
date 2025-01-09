export interface IUser {
    name: string;
    status: {
        name: string;
        value: string;
    };
    department: {
        name: string;
        value: string;
    };
    country: {
        name: string;
        value: string;
    };
}

export interface ICountry {
    name: string;
    value: string;
}

export interface IDepartment {
    name: string;
    value: string;
}

export interface IStatus {
    name: string;
    value: string;
}
