"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";

interface AppProps {
    children: ReactNode;
}

const App = ({ children }: AppProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default App;

