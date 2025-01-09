'use client';

import { useState, useEffect, useMemo, useCallback } from "react";
import {
    FormControl,
    SelectChangeEvent,
    Typography,
    InputLabel,
    MenuItem,
    Select,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Stack
} from "@mui/material";

import { CustomModal } from "./CustomModal/CustomModal";
import { CustomTable } from "@/app/components/common/CustomTable/CustomTable";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { addUser, deleteUser, fetchFilters, fetchUsers } from "@/app/store/slices";
import { IUser } from "@/app/types";

import styles from "./users.module.scss";
import {CustomSelect} from "@/app/components/common/CustomSelect/CustomSelect";
import DeleteIcon from "@mui/icons-material/Delete";

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 300,
            width: 150,
        },
    },
};

const Users = () => {
    const { users } = useAppSelector(state => state.users);
    const { statuses, countries, departments } = useAppSelector(state => state.filters);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('');
    const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [departmentsName, setDepartmentsName] = useState<string[]>([]);

    const handleChangeDepartments = (event: SelectChangeEvent<typeof departmentsName>) => {
        const {
            target: { value },
        } = event;
        setDepartmentsName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

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

    const onDelete = async (id: string | undefined) => {
        dispatch(deleteUser(id))
    }

    const onClearFilters = () => {
        setSelectedStatusFilter('');
        setSelectedCountryFilter('');
        setDepartmentsName([]);

    }

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchFilters());
    }, []);

    useEffect(() => {
        if (departmentsName.length < 3) {
            setSelectedStatusFilter('');
            setSelectedCountryFilter('');
        }

        if (selectedCountryFilter && selectedStatusFilter) {
            setDepartmentsName([]);
        }
    }, [departmentsName, selectedCountryFilter, selectedStatusFilter]);

    return (
        <div className={styles.users}>
            <Typography variant="h5" align="center">USERS</Typography>
            <div className={styles.users__container}>
                <Stack direction="row" gap={3} alignItems="center" className={styles.users__container_filters}>
                    <FormControl sx={{ width: 250, marginTop: '5px' }}>
                        <InputLabel id="demo-multiple-checkbox-label">Selected</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={departmentsName}
                            onChange={handleChangeDepartments}
                            input={<OutlinedInput label="Selected" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {departments.map((element, index) => (
                                <MenuItem key={index} value={element.name}>
                                    <Checkbox checked={departmentsName.includes(element.name)} />
                                    <ListItemText primary={element.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <CustomSelect
                        title="Select country"
                        data={countries}
                        disabled={departmentsName.length < 3}
                        value={selectedCountryFilter}
                        setSelected={setSelectedCountryFilter}
                    />
                    <CustomSelect
                        title="All Statuses"
                        data={statuses}
                        disabled={departmentsName.length < 3}
                        value={selectedStatusFilter}
                        setSelected={setSelectedStatusFilter}
                    />
                    <DeleteIcon className={styles.users__container_filtersIcon} onClick={onClearFilters} />
                </Stack>
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
            <CustomTable data={users} onDelete={onDelete} />
        </div>
    )
}

export default Users;
