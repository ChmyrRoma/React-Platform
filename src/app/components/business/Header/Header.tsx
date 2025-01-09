import Link from "next/link";
import { Stack } from "@mui/material";


import styles from './header.module.scss';

const Header = () => {

    return (
        <Stack direction="row" justifyContent="center" spacing={2} className={styles.header}>
            <Link href="/edit" className={styles.header__button}>Edit Users</Link>
            <Link href="/" className={styles.header__button}>Users</Link>
        </Stack>
    )
}

export default Header;
