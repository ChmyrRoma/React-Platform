import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { ICountry, IDepartment, IStatus } from "@/app/types";

interface ICustomSelect {
    title: string;
    value: string;
    setSelected: (event: string) => void;
    data: IStatus[] | ICountry[] | IDepartment[];
}

export const CustomSelect = ({ title, data, value, setSelected }: ICustomSelect) => {

    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value as string);
    };

    return (
        <Box sx={{ width: 250, marginTop: '5px' }}>
            <FormControl fullWidth>
                <InputLabel>{title}</InputLabel>
                <Select
                    value={value}
                    label={title}
                    onChange={handleChange}
                >
                    {data.map((element) => (
                        <MenuItem key={element.value} value={element.value}>{element.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
