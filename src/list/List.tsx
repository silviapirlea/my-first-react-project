import { Item, ListItem } from "../list-item/ListItem.tsx";
import { useRecoilValue } from "recoil";
import { filteredItemsState } from "../state/RecoilState.ts";
import { useState } from "react";
import {Alert, Button, LinearProgress} from "@mui/material";
import './List.css'
import { Add } from "@mui/icons-material";
import { BASE_API_URL } from "../utils/constants.ts";
import { useIntl } from "react-intl";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ListItemFormDialog} from "../list-item/ListItemFormDialog.tsx";
import {useItemsQuery} from "./UseItems.tsx";
import {useRevalidator} from "react-router";

export function List() {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | undefined>(undefined);
  const intl = useIntl();
  const query = useItemsQuery();
  const filteredItems = useRecoilValue(filteredItemsState);
  const queryClient = useQueryClient();
  const revalidator = useRevalidator()

  function openFormWithItem(item: Item): void {
    setCurrentItem({...item, deadline: new Date(item.deadline)});
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
      await revalidator.revalidate();
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

  const itemList = filteredItems.map((item: Item) => (
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
      <ListItemFormDialog
        open={open}
        initialData={currentItem}
        onClose={() => setOpen(false)}
        onSubmit={(item: Item) =>
          currentItem ? updateItemMutation.mutate(item) : addItemMutation.mutate(item)
        }
      ></ListItemFormDialog>
      {query.isLoading && <LinearProgress />}
      {query.isError && <Alert severity="error">Failed to load items</Alert>}
      {!query.isLoading && <div className="list">{itemList}</div>}
    </>
  );
}
