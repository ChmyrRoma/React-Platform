import { Modal, SelectChangeEvent, Stack, Typography } from "@mui/material";

import { CustomSelect } from "@/app/components/common/CustomSelect/CustomSelect";
import { ICountry, IDepartment, IStatus } from "@/app/types";

import styles from "./customModal.module.scss";

interface ICustomModal {
    open: boolean;
    selectedCountry: string;
    selectedStatus: string;
    selectedDepartment: string;
    disabledButton: string;
    statuses: IStatus[];
    countries: ICountry[];
    departments: IDepartment[];
    handleClose: () => void;
    handleOpen: () => void;
    setSelectedCountry: (e: string) => void;
    setSelectedStatus: (e: string) => void;
    setSelectedDepartment: (e: string) => void;
    handleChange: (e: SelectChangeEvent) => void;
    onSubmit: () => void;
}

export const CustomModal = ({
 open, selectedCountry, selectedStatus, selectedDepartment, disabledButton, statuses, countries, departments, handleClose, handleOpen,
 setSelectedCountry, setSelectedStatus, setSelectedDepartment, handleChange, onSubmit
}: ICustomModal) => {
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
                            <div
                                className={`${styles.page__button} 
                                ${!disabledButton && styles.page__button_disabled}`}
                                onClick={onSubmit}
                            >
                                Add
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
