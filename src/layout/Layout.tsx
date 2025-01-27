import {Outlet} from "react-router";
import {Nav, NavMUI} from "../nav/Nav.tsx";

export default function Layout() {
    console.log('layout')
    return (
        <>
            {/*<Nav/>*/}
            <NavMUI/>
            <Outlet/>
        </>
    )
}