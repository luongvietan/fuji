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
import CategoryForm from "./CategoryForm";
import { Search } from "lucide-react";
import {
  getCategoriesPaginated,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api";
import { Category, PaginatedCategories } from "../../types";

export default function CategoryList() {
  const [paginatedCategories, setPaginatedCategories] =
    useState<PaginatedCategories | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0); // Add currentPage state
  const pageSize = 5; // Set page size to match ProductList

  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, [currentPage, triggerSearch, searchQuery]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategoriesPaginated(currentPage, pageSize); // Use pagination
      let filteredContent = data.data.content;
      if (triggerSearch && searchQuery.trim()) {
        filteredContent = data.data.content.filter((category: Category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setPaginatedCategories({
        ...data.data,
        content: filteredContent,
      });
      setError(null);
    } catch (err: any) {
      setError("Không thể tải danh sách danh mục");
      toast({
        title: "Lỗi",
        description: err.message || "Không thể tải danh sách danh mục",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (newCategory: Omit<Category, "id">) => {
    try {
      await createCategory(newCategory);
      toast({
        title: "Thành công",
        description: "Thêm danh mục thành công",
      });
      fetchCategories();
      setFormDialogOpen(false);
    } catch (err: any) {
      toast({
        title: "Lỗi",
        description: err.message || "Thêm danh mục thất bại",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCategory = async (updatedCategory: Category) => {
    try {
      await updateCategory(updatedCategory.id, updatedCategory);
      toast({
        title: "Thành công",
        description: "Cập nhật danh mục thành công",
      });
      fetchCategories();
      setEditingCategory(null);
      setFormDialogOpen(false);
    } catch (err: any) {
      toast({
        title: "Lỗi",
        description: err.message || "Cập nhật danh mục thất bại",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      toast({ title: "Thành công", description: "Xóa danh mục thành công" });
      fetchCategories();
    } catch (err: any) {
      toast({
        title: "Lỗi",
        description: err.message || "Xóa danh mục thất bại",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      setCurrentPage(0); // Reset to first page on search
      setSearchQuery(searchTerm);
      setTriggerSearch(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      setTriggerSearch(false);
      setSearchQuery("");
      setCurrentPage(0); // Reset to first page when clearing search
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => {
            setEditingCategory(null);
            setFormDialogOpen(true);
          }}
        >
          Thêm danh mục
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Tìm danh mục..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearch}
            className="pl-8"
          />
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Tổng: {paginatedCategories?.totalElements || 0} danh mục
        </Badge>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCategories?.content &&
            paginatedCategories.content.length > 0 ? (
              paginatedCategories.content.map((category) => (
                <TableRow key={category.id} className="hover:bg-gray-50">
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description || "-"}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCategory(category);
                        setFormDialogOpen(true);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setCategoryToDelete(category.id);
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
                <TableCell colSpan={3} className="text-center">
                  Không tìm thấy danh mục
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2">
        {Array.from(
          { length: paginatedCategories?.totalPages || 1 },
          (_, idx) => (
            <Button
              key={idx}
              variant={idx === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(idx)}
            >
              {idx === 0 ? "1" : idx + 1}
            </Button>
          )
        )}
      </div>

      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Cập nhật danh mục" : "Thêm danh mục mới"}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            editingCategory={editingCategory}
            setEditingCategory={setEditingCategory}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể
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
              onClick={() => categoryToDelete && handleDelete(categoryToDelete)}
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
