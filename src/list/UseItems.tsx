import { useEffect, useState } from "react";
import { Item } from "../list-item/ListItem.tsx";
import { useSetRecoilState } from "recoil";
import { itemsState } from "../state/recoil_state.ts";
import { useQuery } from "@tanstack/react-query";
import {BASE_API_URL} from "../utils/constants.tsx";

// te old version with local state management
export function useItems(): Item[] {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let ignore = false;
    fetch("https://retoolapi.dev/RX1pd5/items")
      .then((res) => res.json())
      .then((res2) => {
        if (!ignore) {
          setItems(res2);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);
  return items;
}

// the new version with recoil state management
export function useItemsReactive(): void {
  const setItems = useSetRecoilState(itemsState);

  useEffect(() => {
    let ignore = false;
    fetch("https://retoolapi.dev/RX1pd5/items")
      .then((res) => res.json())
      .then((res2) => {
        if (!ignore) {
          setItems(res2);
        }
      });
    return () => {
      ignore = true;
    };
  }, [setItems]);
}

// the new version with recoil + react query
export function useItemsQuery() {
  const setItems = useSetRecoilState(itemsState);

  const { data, isLoading, isError } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
    refetchOnWindowFocus: false
  });

  if(data) {
    setItems(data);
  }

  return { data, isLoading, isError };
}

export const fetchItems = async () => {
  const response = await fetch(BASE_API_URL);
  if (!response.ok) throw new Error("Failed to fetch items");
  return response.json();
}
