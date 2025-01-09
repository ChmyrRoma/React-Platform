"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stack } from "@mui/material";

import styles from "./header.module.scss";

const Header = () => {
    const pathname = usePathname();

    return (
        <Stack direction="row" justifyContent="center" spacing={2} className={styles.header}>
            <Link
                href="/edit"
                className={`${styles.header__button} ${pathname === "/edit" ? styles.header__active : ""}`}
            >
                Edit Users
            </Link>
            <Link
                href="/"
                className={`${styles.header__button} ${pathname === "/" ? styles.header__active : ""}`}
            >
                Users
            </Link>
        </Stack>
    );
};

export default Header;
