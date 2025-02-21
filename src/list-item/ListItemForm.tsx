import React, { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { useIntl } from "react-intl";
import { Item, ItemStatus, ItemType } from "../list-item/ListItem";

export interface ItemFormProps {
  initialData: Item;
  onSubmit: (item: Item) => void;
}

interface ItemFormErrors {
  url?: string;
  amount?: string;
}

export function ListItemForm({ initialData, onSubmit }: ItemFormProps) {
  const intl = useIntl();

  const [formData, setFormData] = useState<Item>(initialData);
  const [errors, setErrors] = useState<ItemFormErrors>({});
  const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})([/\w.-]*)*\/?$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    const newErrors: ItemFormErrors = {};
    if (!urlRegex.test(formData.url)) {
      newErrors.url = "Invalid URL format";
    }
    if (Number(formData.amount) < 0) {
      newErrors.amount = "Amount cannot be negative";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSubmit({ ...formData || Date.now() });
  };

  return (
      <form>
        <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
            color="secondary"
        />
        <TextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            fullWidth
            margin="dense"
            color="secondary"
            error={!!errors.url}
            helperText={errors.url}
        />
        <TextField
            label="Tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            fullWidth
            margin="dense"
            color="secondary"
        />
        <TextField
            select
            label="Type"
            name="type"
            value={formData.type}
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
            value={formData.status}
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
            value={formData.amount}
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
            value={formData.deadline.toISOString().split("T")[0]}
            onChange={(e) =>
                setFormData({ ...formData, deadline: new Date(e.target.value) })
            }
            fullWidth
            margin="dense"
            color="secondary"
        />
        <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="dense"
            color="secondary"
            multiline
            rows={3}
        />
        <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            style={{ marginTop: "16px" }}
        >
          {intl.formatMessage({ id: "list-item-form.save" })}
        </Button>
      </form>
  );
}
