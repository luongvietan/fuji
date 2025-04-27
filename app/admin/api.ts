import { Fruit, Category, FruitPOST } from "./types";
import axios from "axios";
// Lấy danh sách hoa quả
export async function getFruits() {
  const res = await fetch("http://192.168.0.107:8080/api/fruits");
  if (!res.ok) {
    throw new Error("Failed to fetch fruits");
  }
  return res.json();
}

// Thêm hoa quả mới
export async function createFruit(product: FruitPOST) {
  const res = await axios.post("http://192.168.0.107:8080/api/fruits", product);
  if (res.status !== 200) {
    throw new Error("Failed to create fruit");
  }
  return res.data; // Updated to return res.data instead of res.json()
}

// Cập nhật hoa quả
export async function updateFruit(id: number, product: Fruit) {
  const res = await fetch(`http://192.168.0.107:8080/api/fruits/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("Failed to update fruit");
  }
  return res.json();
}

// Xóa hoa quả
export async function deleteFruit(id: number) {
  const res = await fetch(`http://192.168.0.107:8080/api/fruits/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete fruit");
  }
  return res.json();
}

// Upload ảnh hoa quả
export async function uploadFruitImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://192.168.0.107:8080/api/fruits/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload image");
  }

  return res.json();
}

// Fetch all categories with pagination
export async function getCategoriesPaginated(page: number, size: number) {
  const res = await axios.get(
    `http://192.168.0.107:8080/api/categories?page=${page}&size=${size}`
  );
  if (res.status !== 200) {
    throw new Error("Failed to fetch paginated categories");
  }
  return res.data;
}

// Create a new category
export async function createCategory(category: Omit<Category, "id">) {
  const res = await axios.post(
    "http://192.168.0.107:8080/api/categories",
    category
  );
  if (res.status !== 200) {
    throw new Error("Failed to create category");
  }
  return res.data;
}

// Update an existing category
export async function updateCategory(id: number, category: Category) {
  const res = await axios.put(
    `http://192.168.0.107:8080/api/categories/${id}`,
    category
  );
  if (res.status !== 200) {
    throw new Error("Failed to update category");
  }
  return res.data;
}

// Delete a category
export async function deleteCategory(id: number) {
  const res = await axios.delete(
    `http://192.168.0.107:8080/api/categories/${id}`
  );
  if (res.status !== 200) {
    throw new Error("Failed to delete category");
  }
  return res.data;
}
