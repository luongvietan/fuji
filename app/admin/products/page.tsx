// page.tsx
import { AdminTemplate } from "../components/template";
import ProductList from "./components/ProductList";

export default function ProductsPage() {
  return (
    <AdminTemplate>
      <h1 className="text-2xl font-bold mb-6">Quản lý Sản phẩm</h1>
      <ProductList />
    </AdminTemplate>
  );
}
