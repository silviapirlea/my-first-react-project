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
  const [currentItem, setCurrentItem] = useState<Item | undefined>(undefined);
  const [items, setItems] = useRecoilState(itemsState);
  const intl = useIntl();
  const filteredItems = useRecoilValue(filteredItemsState);

  function openFormWithItem(item: Item): void {
    setCurrentItem(item);
    setOpen(true);
  }

  async function onItemUpdate(item: Item) {
    try {
      const response = await fetch(`${BASE_API_URL}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed to add item.");
      }

      const newItem = await response.json();

      setItems(items.map((item) => (item.id === newItem.id ? newItem : item)));
    } catch (error) {
      console.error("Error adding item:", error);
    }
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
      onUpdate={(item: Item) => openFormWithItem(item)}
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
          onClick={() => {
            setCurrentItem(undefined);
            setOpen(true);
          }}
        >
          {intl.formatMessage({ id: "list.add" })}
        </Button>
      </div>
      <ListItemForm
        open={open}
        item={currentItem}
        onClose={() => setOpen(false)}
        onAddItem={(item: Item) =>
          currentItem ? onItemUpdate(item) : onItemAdd(item)
        }
      ></ListItemForm>
      <div className="list">{itemList}</div>
    </>
  );
}
