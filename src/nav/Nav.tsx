import './Nav.css'
import {Link, useNavigate} from "react-router";
import {Box, Tab, Tabs} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {MenuBook, ShoppingCart, WatchLater} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import {useIntl} from "react-intl";

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
    const [value, setValue] = useState('one');
    const navigate = useNavigate();
    const classes = useStyles();
    const intl = useIntl();

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        console.log(newValue);
        setValue(newValue);
        navigate(newValue);
    };

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
            </Tabs>
        </Box>
    );
}