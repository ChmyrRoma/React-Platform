import { ReactNode } from "react";

import Header from "@/app/components/business/Header/Header";

interface IGlobalLayout {
    children: ReactNode;
}

import './globalLayout.css';

const GlobalLayout = ({ children }: IGlobalLayout) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default GlobalLayout;
