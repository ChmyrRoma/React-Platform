'use client';

import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import { CustomModal } from "./CustomModal/CustomModal";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchFilters, fetchUsers } from "@/app/store/slices";

import styles from "./users.module.scss";

const Users = () => {
    const { statuses, countries, departments } = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

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
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    statuses={statuses}
                    countries={countries}
                    departments={departments}
                />
            </div>
        </div>
    )
}

export default Users;
