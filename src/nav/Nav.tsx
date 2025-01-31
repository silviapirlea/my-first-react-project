import './Nav.css'
import {Link, useNavigate} from "react-router";
import {Box, Tab, Tabs} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {MenuBook, ShoppingCart, WatchLater} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import {useIntl} from "react-intl";
import {ItemType} from "../list-item/ListItem.tsx";
import {useSetRecoilState} from "recoil";
import {itemsTypeState} from "../state/recoil_state.ts";

export function Nav() {
    return (
        <nav className="navbar">
            <Link className="nav-item" to="/watchlist">Movies</Link>
            <Link className="nav-item" to="/books-list">Books</Link>
            <Link className="nav-item" to="/shopping-list">Groceries</Link>
        </nav>
    )
}
const useStyles = makeStyles({
    tabColor: {
        color: 'white',
    },
});

export function NavMUI() {
    const [value, setValue] = useState('/watchlist');
    const setItemType = useSetRecoilState<ItemType>(itemsTypeState);
    const navigate = useNavigate();
    const classes = useStyles();
    const intl = useIntl();

    const handleChange = (_: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        setItemType(mapToItemType(newValue));
        navigate(newValue);
    };

    function mapToItemType(value: string): ItemType {
        switch (value) {
            case '/watchlist':  return ItemType.WATCHLIST;
            case '/books-list': return ItemType.BOOKS_LIST;
            case '/shopping-list': return ItemType.SHOPPING_LIST;
            case '/all': return  ItemType.ALL;
            default: return ItemType.ALL;
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
                textColor="secondary"
                indicatorColor="secondary"
            >
                <Tab className={classes.tabColor} icon={<WatchLater/>} value="/watchlist" label={intl.formatMessage({id: 'nav.movies'})}/>
                <Tab className={classes.tabColor} icon={<MenuBook/>} value="/books-list" label={intl.formatMessage({id: 'nav.books'})} />
                <Tab className={classes.tabColor} icon={<ShoppingCart/>} value="/shopping-list" label={intl.formatMessage({id: 'nav.groceries'})}/>
                <Tab className={classes.tabColor} value="/all" label={intl.formatMessage({id: 'nav.all'})}/>
            </Tabs>
        </Box>
    );
}