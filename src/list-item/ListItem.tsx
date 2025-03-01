import "./ListItem.css";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useIntl } from "react-intl";

export interface Item {
  id: number;
  name: string;
  url: string;
  tags: string;
  type: ItemType;
  amount: number;
  status: ItemStatus;
  deadline: Date;
  description: string;
  isRepetable: boolean;
}

export enum ItemStatus {
  NOT_STARTED,
  IN_PROGRESS,
  COMPLETED,
}

export enum ItemType {
  WATCHLIST = 1,
  BOOKS_LIST = 2,
  SHOPPING_LIST = 3,
  ALL,
}

export interface ListItemProps {
    item: Item,
    onUpdate: (item: Item) => void,
    onDelete: (id: number) => void,
}

export function ListItem({item, onUpdate, onDelete}: ListItemProps) {
  const intl = useIntl();

  return (
    <div className="item">
      <p>{"Name: " + item.name}</p>
      <a href={item.url} target={"_blank"}>
        {item.url}
      </a>
      <p>{"Tags: " + item.tags}</p>
      <p>{"Type: " + item.type}</p>
      <p>{"Amount: " + item.amount ? item.amount : 0}</p>
      <p>{"Status: " + item.status}</p>
      <p>{"Deadline: " + item.deadline}</p>
      <p>{"Description: " + item.description}</p>
      <p>{item.isRepetable ? "Repetable" : "Nonrepetable"}</p>
      <div className="actions">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => onUpdate(item)}
        >
          {intl.formatMessage({ id: "list.update" })}
        </Button>
        <Button
          color="error"
          variant="contained"
          startIcon={<Delete />}
          onClick={() => onDelete(item.id)}
        >
          {intl.formatMessage({ id: "list.delete" })}
        </Button>
      </div>
    </div>
  );
}
