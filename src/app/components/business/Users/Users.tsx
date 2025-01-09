'use client';

import { useState, useEffect, useMemo, useCallback } from "react";
import { SelectChangeEvent, Typography } from "@mui/material";

import { CustomModal } from "./CustomModal/CustomModal";
import { CustomTable } from "@/app/components/common/CustomTable/CustomTable";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addUser, fetchFilters, fetchUsers } from "@/app/store/slices";
import { IUser } from "@/app/types";

import styles from "./users.module.scss";

const Users = () => {
    const { users } = useAppSelector(state => state.users);
    const { statuses, countries, departments } = useAppSelector(state => state.filters);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setUserName('');
        setSelectedCountry('');
        setSelectedStatus('');
        setSelectedDepartment('');
        setOpen(false);
    }

    const handleChange = (event: SelectChangeEvent) => {
        setUserName(event.target.value)
    }

    const disabledButton = useMemo(() => {
        return userName && selectedCountry && selectedStatus && selectedDepartment;
    }, [userName, selectedCountry, selectedDepartment, selectedStatus]);

    const getLabelByValue = useCallback((value: string, array: { name: string; value: string }[]) => {
        const item = array.find(item => item.value === value);
        return item ? item.name : value;
    }, []);

    const selectedCountryLabel = getLabelByValue(selectedCountry, countries);
    const selectedDepartmentLabel = getLabelByValue(selectedDepartment, departments);
    const selectedStatusLabel = getLabelByValue(selectedStatus, statuses);

    const onSubmit = async () => {
        const newUser: IUser = {
            name: userName,
            status: {
                name: selectedStatusLabel,
                value: selectedStatus,
            },
            department: {
                name: selectedDepartmentLabel,
                value: selectedDepartment,
            },
            country: {
                name: selectedCountryLabel,
                value: selectedCountry,
            },
        };

        await dispatch(addUser(newUser));
        handleClose();
    }

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchFilters());
    }, []);

    return (
        <div className={styles.users}>
            <Typography variant="h5" align="center">USERS</Typography>
            <div className={styles.users__container}>
                <div className={styles.users__container_filters}></div>
                <CustomModal
                    open={open}
                    selectedCountry={selectedCountry}
                    selectedStatus={selectedStatus}
                    selectedDepartment={selectedDepartment}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    statuses={statuses}
                    countries={countries}
                    departments={departments}
                    handleChange={handleChange}
                    setSelectedDepartment={setSelectedDepartment}
                    setSelectedCountry={setSelectedCountry}
                    setSelectedStatus={setSelectedStatus}
                    disabledButton={disabledButton}
                    onSubmit={onSubmit}
                />
            </div>
            <CustomTable data={users} />
        </div>
    )
}

export default Users;
