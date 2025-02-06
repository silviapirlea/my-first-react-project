export const itemsLoader = async () => {
  try {
    const response = await fetch("https://retoolapi.dev/RX1pd5/items");
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};
