import {atom, selector} from "recoil";
import {Item, ItemType} from "../list-item/ListItem.tsx";

export const itemsState = atom<Item[]>({
    key: 'itemsState',
    default: []
});

export const itemsTypeState = atom<ItemType>({
    key: 'itemsTypeState',
    default: ItemType.WATCHLIST
});

export const filteredItemsState = selector<Item[]>({
    key: 'filteredItemsState',
    get: opts => {
        const items = opts.get(itemsState);
        const itemType = opts.get(itemsTypeState);

        return items.filter(item => itemType == ItemType.ALL || item.type === itemType);
    }
})