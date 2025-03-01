import "./App.css";
import Layout from "./layout/Layout.tsx";
import {List} from "./list/List.tsx";
import {TableMUI} from "./table/TableMUI.tsx";
import enMessages from "./i18n/en.json";
import roMessages from "./i18n/ro.json";
import {useState} from "react";
import {IntlProvider} from "react-intl";
import {LanguageSwitcher} from "./i18n/LanguageSwitcher.tsx";
import {RecoilRoot} from "recoil";
import {itemsLoader} from "./loaders/itemsLoader.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {getFromStorage, setToStorage} from "./storage/storage.service.ts";
import {LANGUAGE_KEY} from "./utils/constants.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        loader: itemsLoader,
        children: [
            {index: true, element: <List/>},
            {path: "watchlist", element: <List/>},
            {path: "books-list", element: <List/>},
            {path: "shopping-list", element: <List/>},
            {path: "all", element: <TableMUI/>},
        ],
    },
]);

const messages = {
    en: enMessages,
    ro: roMessages,
};

const queryClient = new QueryClient();

function App() {
    const currentLanguage = getFromStorage(LANGUAGE_KEY)
    const [locale, setLocale] = useState(currentLanguage ? currentLanguage  : "en");

    const changeLanguage = (lang: string) => {
        setToStorage(LANGUAGE_KEY, lang);
        setLocale(lang);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <IntlProvider locale={locale} messages={messages[locale]}>
                    <LanguageSwitcher
                        currentLocale={locale}
                        onChangeLanguage={changeLanguage}
                    />
                    <RouterProvider router={router}/>
                </IntlProvider>
            </RecoilRoot>
        </QueryClientProvider>
    );
}

export default App;
