'use client';

import { ReactNode } from "react";
import { Provider } from "react-redux";

import Header from "@/app/components/business/Header/Header";
import { store } from "@/app/store/store";

import "./globalLayout.css";

interface IGlobalLayout {
    children: ReactNode;
}

const GlobalLayout = ({ children }: IGlobalLayout) => {
    return (
        <div>
            <Provider store={store}>
                <Header />
                {children}
            </Provider>
        </div>
    )
}

export default GlobalLayout;
