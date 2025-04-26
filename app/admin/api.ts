import { Fruit } from "./types";

export async function getFruits() {
  let url = `http://192.168.0.107:8080/api/fruits`;
  const response = await fetch(url, {
    headers: { Accept: "*/*" },
  });
  if (!response.ok) {
    throw new Error("Không thể tải danh sách trái cây");
  }
  return response.json();
}

export async function createFruit(fruit: Omit<Fruit, "id">) {
  const response = await fetch("http://192.168.0.107:8080/api/fruits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fruit),
  });
  if (!response.ok) {
    throw new Error("Không thể thêm trái cây");
  }
  return response.json();
}

export async function updateFruit(id: number, fruit: Partial<Fruit>) {
  const response = await fetch(`http://192.168.0.107:8080/api/fruits/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fruit),
  });
  if (!response.ok) {
    throw new Error("Không thể cập nhật trái cây");
  }
  return response.json();
}

export async function deleteFruit(id: number) {
  const response = await fetch(`http://192.168.0.107:8080/api/fruits/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Không thể xóa trái cây");
  }
  return response.json();
}
