import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./layout/Layout.tsx";
import {List} from "./list/List.tsx";
import {ItemType} from "./list-item/ListItem.tsx";
import {Table} from "./table/Table.tsx";
import {TableMUI} from "./table/TableMUI.tsx";
import enMessages from './i18n/en.json';
import roMessages from './i18n/ro.json';
import {useState} from "react";
import {IntlProvider} from "react-intl";
import {LanguageSwitcher} from "./i18n/LanguageSwitcher.tsx";

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
        <IntlProvider locale={locale} messages={messages[locale]}>
            <LanguageSwitcher
                currentLocale={locale}
                onChangeLanguage={changeLanguage}
            />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<List type={ItemType.WATCHLIST}/>}/>
                        <Route path={'/watchlist'} element={<List type={ItemType.WATCHLIST}/>}/>
                        <Route path='/books-list' element={<List type={ItemType.BOOKS_LIST}/>}/>
                        <Route path='/shopping-list' element={<List type={ItemType.SHOPPING_LIST}/>}/>
                        <Route path='/all' element={<TableMUI type={ItemType.ALL}/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </IntlProvider>

    )
}

export default App
