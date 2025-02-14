import { Item, ListItem } from "../list-item/ListItem.tsx";
import { useRecoilValue } from "recoil";
import { filteredItemsState } from "../state/recoil_state.ts";
import { useState } from "react";
import {Alert, Button, LinearProgress} from "@mui/material";
import { ListItemForm } from "../list-item/ListItemForm.tsx";
import './List.css'
import { Add } from "@mui/icons-material";
import { BASE_API_URL } from "../utils/constants.tsx";
import { useIntl } from "react-intl";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useItemsQuery} from "./UseItems.tsx";

export function List() {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | undefined>(undefined);
  const intl = useIntl();
  const query = useItemsQuery();
  const filteredItems = useRecoilValue(filteredItemsState);
  const queryClient = useQueryClient();

  function openFormWithItem(item: Item): void {
    setCurrentItem(item);
    setOpen(true);
  }

  const updateItemMutation = useMutation({
    mutationFn: async (item: Item) => {
      const response = await fetch(`${BASE_API_URL}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!response.ok) throw new Error("Failed to update item");
      return response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["items"]});
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${BASE_API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete item");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["items"]});
    },
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: Item) => {
      const response = await fetch(BASE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!response.ok) throw new Error("Failed to add item");
      return response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const itemList = filteredItems.map((item) => (
    <ListItem
      key={item.id}
      item={item}
      onUpdate={(item: Item) => openFormWithItem(item)}
      onDelete={(id: number) => deleteItemMutation.mutate(id)}
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
          currentItem ? updateItemMutation.mutate(item) : addItemMutation.mutate(item)
        }
      ></ListItemForm>
      {query.isLoading && <LinearProgress />}
      {query.isError && <Alert severity="error">Failed to load items</Alert>}
      {!query.isLoading && <div className="list">{itemList}</div>}
    </>
  );
}
