import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useIntl } from "react-intl";
import {ListItemForm} from "./ListItemForm.tsx";
import {Item, ItemStatus, ItemType} from "./ListItem.tsx";

interface ItemDialogProps {
    open: boolean;
    onClose: () => void;
    initialData?: Item;
    onSubmit: (item: Item) => void;
}

export function ListItemFormDialog({ open, onClose, initialData, onSubmit }: ItemDialogProps) {
    const intl = useIntl();
    const defaultItem: Item = {
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

    const handleSubmit = (item: Item): void => {
        onSubmit(item);
        onClose();
    }
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{initialData ? "Edit Item" : "Add New Item"}</DialogTitle>
            <DialogContent>
                <ListItemForm initialData={initialData || defaultItem} onSubmit={handleSubmit} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    {intl.formatMessage({ id: "list-item-form.cancel" })}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
