import {useEffect, useState} from "react";
import {Item} from "../list-item/ListItem.tsx";
import {useSetRecoilState} from "recoil";
import {itemsState} from "../state/recoil_state.ts";

// te old version with local state management
export function useItems() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        let ignore = false;
        fetch('https://retoolapi.dev/RX1pd5/items')
            .then(res => res.json())
            .then(res2 => {
                if(!ignore) {
                    setItems(res2);
                }
            })
        return () => {ignore = true}
    }, []);
    return items;
}


// the new version with recoil state management
export function useItemsReactive() {
    const setItems = useSetRecoilState(itemsState);

    useEffect(() => {
        let ignore = false;
        fetch('https://retoolapi.dev/RX1pd5/items')
            .then(res => res.json())
            .then(res2 => {
                if(!ignore) {
                    setItems(res2);
                }
            })
        return () => {ignore = true}
    }, [setItems]);
}