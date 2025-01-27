import {Item, ItemType, ListItem} from "../list-item/ListItem.tsx";
import {useItems} from "./UseItems.tsx";
import {useMemo} from "react";

export function List(props: {type: ItemType}) {
    console.log(props.type);
    const items = useItems();
    const filteredItems = useMemo(() => {
        return items.filter(item => props.type == ItemType.ALL || item.type === props.type);
    }, [items, props.type]);

    function onItemUpdate(item: Item) {
        alert('Update item ' +  item.id);
    }
    const itemList = filteredItems.map((item) => <ListItem
        key={item.id}
        item={item}
        onUpdate={() => onItemUpdate(item)}
        />
    )
    return (
        <div className="list">
            {itemList}
        </div>
    )
}