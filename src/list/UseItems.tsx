import {useEffect, useState} from "react";
import {Item} from "../list-item/ListItem.tsx";

export function useItems() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        let ignore = false;
        fetch('https://retoolapi.dev/RX1pd5/items')
            .then(res => res.json())
            .then(res2 => {
                console.log(res2)
                if(!ignore) {
                    setItems(res2);
                }
            })
        return () => {ignore = true}
    }, []);
    return items;
}