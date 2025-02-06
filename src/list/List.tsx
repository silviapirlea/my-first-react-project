import { Item, ListItem } from "../list-item/ListItem.tsx";
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredItemsState, itemsState } from "../state/recoil_state.ts";
import { useState } from "react";
import { Button } from "@mui/material";
import { ListItemForm } from "../list-item/ListItemForm.tsx";
import "./List.css";
import { Add } from "@mui/icons-material";
import { BASE_API_URL } from "../utils/constants.tsx";
import { useIntl } from "react-intl";

export function List() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useRecoilState(itemsState);
  const intl = useIntl();
  const filteredItems = useRecoilValue(filteredItemsState);

  function onItemUpdate(item: Item) {
    alert("Update item " + item.id);
  }

  async function onItemDelete(id: number) {
    try {
      const response = await fetch(`${BASE_API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item.");
      }

      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  async function onItemAdd(item: Item) {
    try {
      const response = await fetch(BASE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed to add item.");
      }

      const newItem = await response.json();

      setItems([...items, newItem]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  const itemList = filteredItems.map((item) => (
    <ListItem
      key={item.id}
      item={item}
      onUpdate={(item: Item) => onItemUpdate(item)}
      onDelete={(id: number) => onItemDelete(id)}
    />
  ));
  return (
    <>
      <div className="add-item-button">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          {intl.formatMessage({ id: "list.add" })}
        </Button>
      </div>
      <ListItemForm
        open={open}
        onClose={() => setOpen(false)}
        onAddItem={(item: Item) => onItemAdd(item)}
      ></ListItemForm>
      <div className="list">{itemList}</div>
    </>
  );
}
