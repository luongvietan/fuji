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

// Tìm kiếm hoa quả theo tên
export async function searchFruits(
  name: string,
  page: number = 0,
  size: number = 1000
) {
  try {
    const res = await axios.get(
      `http://192.168.0.107:8080/api/fruits/search?name=${encodeURIComponent(
        name
      )}&page=${page}&size=${size}`,
      {
        headers: {
          accept: "*/*",
        },
      }
    );
    if (res.status !== 200) {
      throw new Error("Failed to search fruits");
    }
    console.log("Phản hồi từ API tìm kiếm:", res.data); // Thêm log để debug
    return res.data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to search fruits: ${error.response?.status} - ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to search fruits");
  }
}

// Thêm hoa quả mới
export async function createFruit(product: FruitPOST) {
  console.log("Gửi dữ liệu đến API:", product);
  try {
    const token = localStorage.getItem("token");
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await axios.post(
      "http://192.168.0.107:8080/api/fruits",
      product,
      {
        headers,
      }
    );

    console.log("Phản hồi từ server:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to create fruit: ${error.response?.status} - ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to create fruit");
  }
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

  try {
    const res = await axios.post(
      "http://192.168.0.107:8080/api/fruits/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Phản hồi từ API upload ảnh:", res.data);

    if (res.status !== 200) {
      throw new Error(`Failed to upload image: Status ${res.status}`);
    }

    if (typeof res.data === "string") {
      return { path: res.data };
    } else if (res.data && res.data.data) {
      return { path: res.data.data };
    } else if (res.data && res.data.path) {
      return res.data;
    } else {
      throw new Error("Invalid response format: No path found in response");
    }
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
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

// Fetch paginated fruits
export async function getFruitsPaginated(page: number, size: number) {
  const res = await axios.get(
    `http://192.168.0.107:8080/api/fruits?page=${page}&size=${size}`
  );
  if (res.status !== 200) {
    throw new Error("Failed to fetch paginated fruits");
  }
  return res.data;
}
