import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { ICountry, IDepartment, IStatus } from "@/app/types";

interface ICustomSelect {
    title: string;
    value: string;
    width?: string;
    disabled?: boolean;
    setSelected: (event: string) => void;
    data: IStatus[] | ICountry[] | IDepartment[] | string[];
}

export const CustomSelect = ({ title, width, data, disabled, value, setSelected }: ICustomSelect) => {
    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value as string);
    };

    return (
        <Box sx={{ width: width || 250, marginTop: "5px", pointerEvents: disabled ? 'none' : 'auto' }}>
            <FormControl fullWidth>
                <InputLabel>{title}</InputLabel>
                <Select
                    value={value}
                    label={title}
                    onChange={handleChange}
                >
                    {data.map((element, index) => {
                        if (typeof element === "string") {
                            return (
                                <MenuItem key={index} value={element}>
                                    {element}
                                </MenuItem>
                            );
                        }
                        return (
                            <MenuItem key={element.value} value={element.value}>
                                {element.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
};
