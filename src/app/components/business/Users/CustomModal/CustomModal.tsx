import { useState, useMemo } from "react";
import { Modal, SelectChangeEvent, Stack, Typography } from "@mui/material";

import { CustomSelect } from "@/app/components/common/CustomSelect/CustomSelect";
import { ICountry, IDepartment, IStatus } from "@/app/types";

import styles from "./customModal.module.scss";

interface ICustomModal {
    open: boolean;
    handleClose: () => void;
    handleOpen: () => void;
    statuses: IStatus[];
    countries: ICountry[];
    departments: IDepartment[];
}

export const CustomModal = ({ open, handleClose, handleOpen, statuses, countries, departments }: ICustomModal) => {
    const [userName, setUserName] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        setUserName(event.target.value)
    }

    const disabledButton = useMemo(() => {
        return userName && selectedCountry && selectedStatus && selectedDepartment;
    }, [userName, selectedCountry, selectedDepartment, selectedStatus]);

    return (
        <div className={styles.page}>
            <div className={styles.page__button} onClick={handleOpen}>Add User</div>
            <Modal
                open={open}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <div className={styles.modal}>
                    <div className={styles.modal__container}>
                        <Typography variant="h5" align="center" className={styles.modal__title}>ADD USERS</Typography>
                        <div className={styles.modal__body}>
                            <Stack direction="row" justifyContent="space-between">
                                <div className={styles.modal__content}>
                                    <span className={styles.modal__content_title}>Full Name</span>
                                    <input placeholder="Enter full name" className={styles.modal__content_input} onChange={handleChange} />
                                </div>
                                <div className={styles.modal__content}>
                                    <span className={styles.modal__content_title}>Department</span>
                                    <CustomSelect
                                        title="Select department"
                                        data={departments}
                                        value={selectedDepartment}
                                        setSelected={setSelectedDepartment}
                                    />
                                </div>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <div className={styles.modal__content}>
                                    <span className={styles.modal__content_title}>Country</span>
                                    <CustomSelect
                                        title="Select country"
                                        data={countries}
                                        value={selectedCountry}
                                        setSelected={setSelectedCountry}
                                    />
                                </div>
                                <div className={styles.modal__content}>
                                    <span className={styles.modal__content_title}>Status</span>
                                    <CustomSelect
                                        title="Select status"
                                        data={statuses}
                                        value={selectedStatus}
                                        setSelected={setSelectedStatus}
                                    />
                                </div>
                            </Stack>
                        </div>
                        <div className={styles.modal__footer}>
                            <div className={styles.page__button} onClick={handleClose}>Cancel</div>
                            <div className={`${styles.page__button} ${!disabledButton && styles.page__button_disabled}`}>Add</div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
