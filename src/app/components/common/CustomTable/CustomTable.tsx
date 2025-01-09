import { Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { IUser } from "@/app/types";

import styles from "./customTable.module.scss";

interface ICustomTable {
    data: IUser[];
    onDelete: (id: string | undefined) => void;
}

const HEADER_COLUMNS: string[] = ['Full Name', 'Department', 'Country', 'Status', ''];

export const CustomTable = ({ data, onDelete }: ICustomTable) => {
    return (
        <TableContainer className={styles.table} component={Paper}>
            <Table className={styles.table__container}>
                <TableHead>
                    <TableRow>
                        {HEADER_COLUMNS.map((el, index) => (
                            <TableCell key={index} sx={{ fontWeight: 'bold' }}>{el}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length ? (data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell sx={{ color: 'silver' }} align="left">{row.department.name}</TableCell>
                            <TableCell sx={{ color: 'silver' }} align="left">{row.country.name}</TableCell>
                            <TableCell sx={{ color: 'silver' }} align="left">{row.status.name}</TableCell>
                            <TableCell><DeleteIcon className={styles.table__container_delete} onClick={() => onDelete(row.id)} /></TableCell>
                        </TableRow>
                    ))) : (
                        <div>No users</div>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
