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
import {
  getFruitsPaginated,
  deleteFruit,
  createFruit,
  updateFruit,
  searchFruits,
} from "../../api";
import { Fruit, FruitPOST, PaginatedFruits } from "../../types";

export default function ProductList() {
  const [paginatedFruits, setPaginatedFruits] =
    useState<PaginatedFruits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Thêm trạng thái để lưu từ khóa tìm kiếm cuối cùng
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Fruit | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (triggerSearch && searchQuery.trim()) {
      fetchSearchResults();
    } else {
      fetchFruits();
    }
  }, [currentPage, triggerSearch, searchQuery]); // Thay searchTerm bằng searchQuery

  const fetchFruits = async () => {
    setLoading(true);
    try {
      const data = await getFruitsPaginated(currentPage, pageSize);
      console.log("Dữ liệu gán vào paginatedFruits:", data.data); // Debug
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

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      console.log("Gọi API tìm kiếm với từ khóa:", searchQuery); // Debug
      const data = await searchFruits(searchQuery, currentPage, pageSize);
      console.log("Dữ liệu gán vào paginatedFruits (tìm kiếm):", data.data); // Debug
      setPaginatedFruits(data.data);
      setError(null);
    } catch (err) {
      setError("Không thể tìm kiếm sản phẩm");
      toast({
        title: "Lỗi",
        description: "Không thể tìm kiếm sản phẩm",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct: FruitPOST) => {
    try {
      await createFruit(newProduct);
      if (triggerSearch && searchQuery.trim()) {
        fetchSearchResults();
      } else {
        fetchFruits();
      }
      setFormDialogOpen(false);
    } catch (err) {
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
      if (triggerSearch && searchQuery.trim()) {
        fetchSearchResults();
      } else {
        fetchFruits();
      }
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
      if (triggerSearch && searchQuery.trim()) {
        fetchSearchResults();
      } else {
        fetchFruits();
      }
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      setCurrentPage(0); // Reset về trang đầu
      setSearchQuery(searchTerm); // Cập nhật từ khóa tìm kiếm
      setTriggerSearch(true); // Kích hoạt tìm kiếm
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      setTriggerSearch(false); // Tắt tìm kiếm nếu ô trống
      setSearchQuery(""); // Xóa từ khóa tìm kiếm
      setCurrentPage(0); // Reset trang
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
            onChange={handleSearchChange}
            onKeyDown={handleSearch}
            className="pl-8"
          />
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Tổng: {paginatedFruits?.totalElements} sản phẩm
        </Badge>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Ảnh</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Tồn kho</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Ngày nhập</TableHead>
              <TableHead>Xuất xứ</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFruits?.content && paginatedFruits.content.length > 0 ? (
              paginatedFruits.content.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell>
                    <img
                      src={`${process.env.API_URL}/${product.image}`}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price.toLocaleString()} VND</TableCell>
                  <TableCell className="text-center">
                    {product.quantity}
                  </TableCell>
                  <TableCell>
                    {product.categories
                      .map((category) => category.name)
                      .join(", ")}
                  </TableCell>
                  <TableCell>{product.tags.join(", ")}</TableCell>
                  <TableCell>{product.importDate}</TableCell>
                  <TableCell>{product.origin}</TableCell>
                  <TableCell className="text-center space-x-2">
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Không tìm thấy sản phẩm
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center space-x-2">
        {Array.from({ length: paginatedFruits?.totalPages || 1 }, (_, idx) => (
          <Button
            key={idx}
            variant={idx === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(idx)}
          >
            {idx === 0 ? "1" : idx + 1} {/* Display 1 instead of 0 */}
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
