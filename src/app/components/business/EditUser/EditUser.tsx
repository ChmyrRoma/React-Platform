import { useEffect, useMemo, useState } from "react";
import { SelectChangeEvent, Stack, Typography } from "@mui/material";

import { CustomSelect } from "@/app/components/common/CustomSelect/CustomSelect";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import styles from './editUser.module.scss';
import { fetchFilters, fetchUsers } from "@/app/store/slices";

const EditUser = () => {
    const dispatch = useAppDispatch();
    const { statuses, countries, departments } = useAppSelector(state => state.filters);
    const { users } = useAppSelector(state => state.users);

    const [userName, setUserName] = useState<string>('');
    const [selectedUserName, setSelectedUserName] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        setUserName(event.target.value)
    }

    const disabledButton = useMemo(() => {
        return userName && selectedCountry && selectedStatus && selectedDepartment;
    }, [userName, selectedCountry, selectedDepartment, selectedStatus]);

    const editedField = useMemo(() => {
        return userName || selectedCountry || selectedStatus || selectedDepartment;
    }, [userName, selectedCountry, selectedDepartment, selectedStatus]);

    const usersName = useMemo(() => {
        return users.map(el => el.name);
    }, [users])

    useEffect(() => {
        dispatch(fetchFilters());
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleUserNameChange = (selectedName: string) => {
        setSelectedUserName(selectedName);

        const user = users.find((u) => u.name === selectedName);

        if (user) {
            setUserName(user.name);
            setSelectedCountry(user.country.value);
            setSelectedStatus(user.status.value);
            setSelectedDepartment(user.department.value);
        }
    };

    return (
        <div className={styles.editUser}>
            <Typography variant="h5" align="center">EDIT USER</Typography>
            <div>
                <div className={styles.editUser__container}>
                    <span className={styles.editUser__container_title}>User</span>
                    <CustomSelect
                        title="Select name"
                        data={usersName}
                        width="400px"
                        value={selectedUserName}
                        setSelected={handleUserNameChange}
                    />
                </div>
                <div className={styles.editUser__container}>
                    <Typography variant="h6">User Information</Typography>
                    <div className={styles.editUser__body}>
                        <Stack direction="row" justifyContent="space-between">
                            <div className={styles.editUser__content}>
                                <span className={styles.editUser__content_title}>Full Name</span>
                                <input
                                    placeholder="Enter full name"
                                    value={userName}
                                    className={styles.editUser__content_input}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.editUser__content}>
                                <span className={styles.editUser__content_title}>Department</span>
                                <CustomSelect
                                    title="Select department"
                                    data={departments}
                                    width="450px"
                                    value={selectedDepartment}
                                    setSelected={setSelectedDepartment}
                                />
                            </div>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <div className={styles.editUser__content}>
                                <span className={styles.editUser__content_title}>Country</span>
                                <CustomSelect
                                    title="Select country"
                                    data={countries}
                                    width="450px"
                                    value={selectedCountry}
                                    setSelected={setSelectedCountry}
                                />
                            </div>
                            <div className={styles.editUser__content}>
                                <span className={styles.editUser__content_title}>Status</span>
                                <CustomSelect
                                    title="Select status"
                                    data={statuses}
                                    width="450px"
                                    value={selectedStatus}
                                    setSelected={setSelectedStatus}
                                />
                            </div>
                        </Stack>
                    </div>
                </div>
                <div className={styles.editUser__footer}>
                    <div className={`${styles.editUser__footer_button} ${!editedField && styles.editUser__footer_buttonEdited}`}>
                        Undo
                    </div>
                    <div
                        className={`${styles.editUser__footer_button} ${!disabledButton && styles.editUser__footer_buttonDisabled}`}
                        // onClick={onSubmit}
                    >
                        Save
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUser;
