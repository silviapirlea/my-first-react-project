import './ListItem.css'
import {Button} from "@mui/material";

export interface Item {
    id: number,
    name: string,
    url: string,
    tags: string,
    type: ItemType,
    amount: number,
    status: ItemStatus,
    deadline: Date,
    description: string,
    isRepetable: boolean,
}

export enum ItemStatus {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETED
}

export enum ItemType {
    WATCHLIST = 1,
    BOOKS_LIST = 2,
    SHOPPING_LIST = 3
}

export function ListItem(props:{item: Item, onUpdate: any}) {
    return (
        <div className="item">
            <p>{'Name: ' + props.item.name}</p>
            <a href={props.item.url} target={'_blank'}>{props.item.url}</a>
            <p>{'Tags: ' + props.item.tags}</p>
            <p>{'Type: ' + props.item.type}</p>
            <p>{'Amount: ' + props.item.amount ? props.item.amount : 0}</p>
            <p>{'Status: ' + props.item.status}</p>
            <p>{'Deadline: ' + props.item.deadline}</p>
            <p>{'Description: ' + props.item.description}</p>
            <p>{props.item.isRepetable ? 'Repetable' : 'Nonrepetable'}</p>
            <Button color="secondary" variant="contained" onClick={props.onUpdate}>Update</Button>
        </div>
    )
}