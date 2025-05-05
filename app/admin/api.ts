import { Fruit, Category, FruitPOST } from "./types";
import axios from "axios";

// Lấy danh sách hoa quả
export async function getFruits() {
  const res = await fetch(`${process.env.API_URL}/api/fruits`);
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
      `${process.env.API_URL}/api/fruits/search?name=${encodeURIComponent(
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
    console.log("Phản hồi từ API tìm kiếm:", res.data);
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

    const res = await axios.post(`${process.env.API_URL}/api/fruits`, product, {
      headers,
    });

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
  try {
    const token = localStorage.getItem("token");
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await axios.put(
      `${process.env.API_URL}/api/fruits/${id}`,
      product,
      {
        headers,
      }
    );

    if (res.status !== 200) {
      throw new Error("Failed to update fruit");
    }
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to update fruit: ${error.response?.status} - ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to update fruit");
  }
}

// Xóa hoa quả
export async function deleteFruit(id: number) {
  try {
    const token = localStorage.getItem("token");
    const headers: { [key: string]: string } = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await axios.delete(`${process.env.API_URL}/api/fruits/${id}`, {
      headers,
    });

    if (res.status !== 200) {
      throw new Error("Failed to delete fruit");
    }
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to delete fruit: ${error.response?.status} - ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to delete fruit");
  }
}

// Upload ảnh hoa quả
export async function uploadFruitImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const token = localStorage.getItem("token");
    const headers: { [key: string]: string } = {
      "Content-Type": "multipart/form-data",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await axios.post(
      `${process.env.API_URL}/api/fruits/upload`,
      formData,
      {
        headers,
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

// Lấy danh sách danh mục (phân trang)
export async function getCategoriesPaginated(page: number, size: number) {
  try {
    const token = localStorage.getItem("token");
    const headers: { [key: string]: string } = {
      accept: "*/*",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await axios.get(
      `${process.env.API_URL}/api/categories?page=${page}&size=${size}`,
      { headers }
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch paginated categories");
    }
    console.log("Phản hồi từ API danh mục:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách danh mục:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch categories: ${error.response?.status} - ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to fetch categories");
  }
}

// Tạo danh mục mới
export async function createCategory(category: Omit<Category, "id">) {
  try {
    const token = localStorage.getItem("token");
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
      accept: "*/*",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Explicitly define the payload to ensure description is included
    const payload = {
      name: category.name,
      description: category.description || "", // Ensure description is a string
    };

    // Log the payload to verify what is being sent
    console.log("Payload gửi đến API (createCategory):", payload);

    const res = await axios.post(
      `${process.env.API_URL}/api/categories`,
      payload,
      { headers }
    );

    // Accept both 200 and 201 as success status codes
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(`Failed to create category: Status ${res.status}`);
    }

    console.log("Phản hồi từ API tạo danh mục:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi tạo danh mục:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to create category: ${error.response?.status} - ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to create category");
  }
}

// Cập nhật danh mục
export async function updateCategory(id: number, category: Category) {
  try {
    const token = localStorage.getItem("token");
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
      accept: "*/*",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await axios.put(
      `${process.env.API_URL}/api/categories/${id}`,
      category,
      { headers }
    );
    if (res.status !== 200) {
      throw new Error("Failed to update category");
    }
    console.log("Phản hồi từ API cập nhật danh mục:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to update category: ${error.response?.status} - ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to update category");
  }
}

// Xóa danh mục
export async function deleteCategory(id: number) {
  try {
    const token = localStorage.getItem("token");
    const headers: { [key: string]: string } = {
      accept: "*/*",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await axios.delete(
      `${process.env.API_URL}/api/categories/${id}`,
      {
        headers,
      }
    );
    if (res.status !== 200) {
      throw new Error("Failed to delete category");
    }
    console.log("Phản hồi từ API xóa danh mục:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to delete category: ${error.response?.status} - ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to delete category");
  }
}

// Fetch paginated fruits
export async function getFruitsPaginated(page: number, size: number) {
  try {
    const token = localStorage.getItem("token");
    const headers: { [key: string]: string } = {
      accept: "*/*",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await axios.get(
      `${process.env.API_URL}/api/fruits?page=${page}&size=${size}`,
      { headers }
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch paginated fruits");
    }
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch fruits: ${error.response?.status} - ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("Failed to fetch fruits");
  }
}
