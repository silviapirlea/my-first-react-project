import React, { useEffect, useState } from "react";
import { Item, ItemStatus, ItemType } from "../list-item/ListItem.tsx";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { useIntl } from "react-intl";

interface ItemFormProps {
  open: boolean;
  item?: Item;
  onClose: () => void;
  onAddItem: (item: Item) => void;
}

interface ItemFormErrors {
  url?: string;
  amount?: string;
}

export function ListItemForm({
  open,
  item,
  onClose,
  onAddItem,
}: ItemFormProps) {
  const initialItemState: Item = {
    id: Date.now(),
    name: "",
    url: "",
    tags: "",
    type: ItemType.WATCHLIST,
    amount: 0,
    status: ItemStatus.NOT_STARTED,
    deadline: new Date(),
    description: "",
    isRepetable: false,
  };
  const [newItem, setNewItem] = useState<Item>(initialItemState);

  useEffect(() => {
    if (item) {
      setNewItem({ ...item, deadline: new Date(item.deadline) });
    } else {
      setNewItem(initialItemState);
    }
  }, [item, open]);

  const [errors, setErrors] = useState<ItemFormErrors>({});
  const intl = useIntl();

  const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})([/\w.-]*)*\/?$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  function validateForm() {
    const newErrors: ItemFormErrors = {};

    if (!urlRegex.test(newItem.url)) {
      newErrors.url = "Invalid URL format";
    }
    if (newItem.amount < 0) {
      newErrors.amount = "Amount cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = () => {
    if (!validateForm()) return;

    onAddItem({ ...newItem, id: newItem.id ? newItem.id : Date.now() });
    setNewItem(initialItemState);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={newItem.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />
        <TextField
          label="URL"
          name="url"
          value={newItem.url}
          onChange={handleChange}
          fullWidth
          color="secondary"
          margin="dense"
          error={!!errors.url}
          helperText={errors.url}
        />
        <TextField
          label="Tags"
          name="tags"
          value={newItem.tags}
          onChange={handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />
        <TextField
          select
          label="Type"
          name="type"
          value={newItem.type}
          onChange={handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        >
          <MenuItem value={ItemType.WATCHLIST}>Watchlist</MenuItem>
          <MenuItem value={ItemType.BOOKS_LIST}>Books List</MenuItem>
          <MenuItem value={ItemType.SHOPPING_LIST}>Shopping List</MenuItem>
        </TextField>
        <TextField
          select
          label="Status"
          name="status"
          value={newItem.status}
          onChange={handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        >
          <MenuItem value={ItemStatus.NOT_STARTED}>Not Started</MenuItem>
          <MenuItem value={ItemStatus.IN_PROGRESS}>In Progress</MenuItem>
          <MenuItem value={ItemStatus.COMPLETED}>Completed</MenuItem>
        </TextField>
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={newItem.amount}
          onChange={handleChange}
          fullWidth
          margin="dense"
          color="secondary"
          error={!!errors.amount}
          helperText={errors.amount}
        />
        <TextField
          label="Deadline"
          name="deadline"
          type="date"
          value={newItem.deadline.toISOString().split("T")[0]}
          onChange={(e) =>
            setNewItem({ ...newItem, deadline: new Date(e.target.value) })
          }
          fullWidth
          margin="dense"
          color="secondary"
        />
        <TextField
          label="Description"
          name="description"
          value={newItem.description}
          onChange={handleChange}
          fullWidth
          margin="dense"
          color="secondary"
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {intl.formatMessage({ id: "list-item-form.cancel" })}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
          disabled={!validateForm}
        >
          {intl.formatMessage({ id: "list-item-form.add" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
