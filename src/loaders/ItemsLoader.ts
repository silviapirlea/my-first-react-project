import {fetchItems} from "../list/UseItems.tsx";
import {queryClient} from "../utils/constants.ts";
import {Item} from "../list-item/ListItem.tsx";

export const itemsLoader = async () => {
    const data = await queryClient.fetchQuery({
            queryKey: ["items"],
            queryFn: fetchItems,
        }
    )
    return [...data] as Item[];
};
