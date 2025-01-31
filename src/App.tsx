import './App.css'
import Layout from "./layout/Layout.tsx";
import {List} from "./list/List.tsx";
import {TableMUI} from "./table/TableMUI.tsx";
import enMessages from './i18n/en.json';
import roMessages from './i18n/ro.json';
import {useState} from "react";
import {IntlProvider} from "react-intl";
import {LanguageSwitcher} from "./i18n/LanguageSwitcher.tsx";
import {RecoilRoot} from "recoil";
import {itemsLoader} from "./loaders/itemsLoader.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: itemsLoader,
        children: [
            { index: true, element: <List /> },
            { path: "watchlist", element: <List /> },
            { path: "books-list", element: <List /> },
            { path: "shopping-list", element: <List /> },
            { path: "all", element: <TableMUI /> },
        ],
    },
]);

const messages = {
    en: enMessages,
    ro: roMessages,
}


function App() {
    const [locale, setLocale] = useState('en');

    const changeLanguage = (lang: string) => {
        setLocale(lang);
    };

    return (
        <RecoilRoot>
            <IntlProvider locale={locale} messages={messages[locale]}>
                <LanguageSwitcher
                    currentLocale={locale}
                    onChangeLanguage={changeLanguage}
                />
                <RouterProvider router={router} />
            </IntlProvider>
        </RecoilRoot>
    )
}

export default App
