// ProductList.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../../components/ui/table";
import { Badge } from "../../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../../components/ui/dialog";
import { useToast } from "../../../../components/ui/use-toast";
import ProductForm from "./ProductForm";
import { Search } from "lucide-react";
import { getFruits, deleteFruit, createFruit, updateFruit } from "../../api";
import { Fruit, FruitPOST, PaginatedFruits } from "../../types";

export default function ProductList() {
  const [paginatedFruits, setPaginatedFruits] =
    useState<PaginatedFruits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [sort] = useState("id,asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Fruit | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const fetchFruits = async () => {
      setLoading(true);
      try {
        const data = await getFruits();
        setPaginatedFruits(data.data);
        setError(null);
      } catch (err) {
        setError("Không thể tải danh sách sản phẩm");
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách sản phẩm",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchFruits();
  }, [currentPage, searchTerm]);

  const handleAddProduct = async (newProduct: FruitPOST) => {
    console.log(newProduct);

    try {
      await createFruit(newProduct);
      toast({ title: "Thành công", description: "Thêm sản phẩm thành công" });
      const data = await getFruits();
      setPaginatedFruits(data.data);
      setFormDialogOpen(false);
    } catch (err) {
      console.log(err);

      toast({
        title: "Lỗi",
        description: "Thêm sản phẩm thất bại",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (updatedProduct: Fruit) => {
    try {
      await updateFruit(updatedProduct.id, updatedProduct);
      toast({
        title: "Thành công",
        description: "Cập nhật sản phẩm thành công",
      });
      const data = await getFruits();
      setPaginatedFruits(data.data);
      setEditingProduct(null);
      setFormDialogOpen(false);
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Cập nhật sản phẩm thất bại",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFruit(id);
      toast({ title: "Thành công", description: "Xóa sản phẩm thành công" });
      const data = await getFruits();
      setPaginatedFruits(data.data);
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Xóa sản phẩm thất bại",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  const totalPages = paginatedFruits?.totalPages || 1;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Danh sách sản phẩm</h2>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setFormDialogOpen(true);
          }}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Tìm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Tổng: {paginatedFruits?.totalElements || 0} sản phẩm
        </Badge>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-left">Ảnh</TableHead>
              <TableHead className="px-6 py-3 text-left">Tên</TableHead>
              <TableHead className="px-6 py-3 text-left">Giá</TableHead>
              <TableHead className="px-6 py-3 text-left">Tồn kho</TableHead>
              {/* Xóa dòng Mô tả */}
              <TableHead className="px-6 py-3 text-left">Danh mục</TableHead>
              <TableHead className="px-6 py-3 text-left">Tags</TableHead>
              <TableHead className="px-6 py-3 text-left">Ngày nhập</TableHead>
              <TableHead className="px-6 py-3 text-left">Xuất xứ</TableHead>
              {/* Xóa các dòng Trạng thái, Đánh giá, Giảm giá */}
              <TableHead className="px-6 py-3 text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFruits?.content.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4">
                  <img
                    src={`http://192.168.0.107:8080${product.image}`}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="px-6 py-4">{product.name}</TableCell>
                <TableCell className="px-6 py-4">
                  {product.price.toLocaleString()} VND
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  {product.quantity}
                </TableCell>
                {/* Xóa cell Mô tả */}
                <TableCell className="px-6 py-4">
                  {product.categories
                    .map((category) => category.name)
                    .join(", ")}
                </TableCell>
                <TableCell className="px-6 py-4">
                  {product.tags.join(", ")}
                </TableCell>
                <TableCell className="px-6 py-4">
                  {product.importDate}
                </TableCell>
                <TableCell className="px-6 py-4">{product.origin}</TableCell>
                <TableCell className="px-6 py-4 text-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingProduct(product);
                      setFormDialogOpen(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setProductToDelete(product.id);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể
              hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => productToDelete && handleDelete(productToDelete)}
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
