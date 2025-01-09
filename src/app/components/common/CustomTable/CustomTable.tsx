import * as React from 'react';
import { Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { IUser } from "@/app/types";

import styles from './customTable.module.scss';

interface ICustomTable {
    data: IUser[];
}

const HEADER_COLUMNS: string[] = ['Full Name', 'Department', 'Country', 'Status', ''];

export const CustomTable = ({ data }: ICustomTable) => {
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
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell sx={{ color: 'silver' }} align="left">{row.department.name}</TableCell>
                            <TableCell sx={{ color: 'silver' }} align="left">{row.country.name}</TableCell>
                            <TableCell sx={{ color: 'silver' }} align="left">{row.status.name}</TableCell>
                            <TableCell><DeleteIcon className={styles.table__container_delete} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
