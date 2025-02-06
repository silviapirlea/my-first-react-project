import { Outlet, useLoaderData } from "react-router-dom";
import { NavMUI } from "../nav/Nav.tsx";
import { itemsState } from "../state/recoil_state.ts";
import { useSetRecoilState } from "recoil";
import { Item } from "../list-item/ListItem.tsx";
import { useEffect } from "react";

export default function Layout() {
  const setItems = useSetRecoilState(itemsState);
  const items = useLoaderData() as Item[];

  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  return (
    <>
      {/*<Nav/>*/}
      <NavMUI />
      <Outlet />
    </>
  );
}
