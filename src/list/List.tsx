import {Item, ListItem} from "../list-item/ListItem.tsx";
import {useRecoilValue} from "recoil";
import {filteredItemsState} from "../state/recoil_state.ts";

export function List() {

    const filteredItems = useRecoilValue(filteredItemsState);

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