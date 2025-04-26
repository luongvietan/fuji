"use client";

import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { useToast } from "../../../../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Category } from "../types/blog";

interface CategoryManagerProps {
  onCategoryChange?: (categories: Category[]) => void;
}

export default function CategoryManager({
  onCategoryChange,
}: CategoryManagerProps) {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Công nghệ" },
    { id: 2, name: "Blog" },
    { id: 3, name: "Kinh doanh" },
    { id: 4, name: "Giải trí" },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  const updateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    if (onCategoryChange) {
      onCategoryChange(newCategories);
    }
  };

  const handleAddCategory = () => {
    if (!newCategory) {
      toast({
        title: "Lỗi",
        description: "Tên danh mục không được để trống",
        variant: "destructive",
      });
      return;
    }
    const category: Category = {
      id: Math.max(0, ...categories.map((c) => c.id)) + 1,
      name: newCategory,
    };
    const updatedCategories = [...categories, category];
    updateCategories(updatedCategories);
    setNewCategory("");
    toast({
      title: "Thành công",
      description: "Danh mục đã được thêm thành công",
    });
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !newCategory) return;
    const updatedCategories = categories.map((c) =>
      c.id === editingCategory.id ? { ...c, name: newCategory } : c
    );
    updateCategories(updatedCategories);
    setEditingCategory(null);
    setNewCategory("");
    toast({
      title: "Thành công",
      description: "Danh mục đã được cập nhật thành công",
    });
  };

  const handleDeleteCategory = (id: number) => {
    const updatedCategories = categories.filter((c) => c.id !== id);
    updateCategories(updatedCategories);
    toast({
      title: "Thành công",
      description: "Danh mục đã được xóa thành công",
    });
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Quản lý danh mục</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nhập tên danh mục"
        />
        <Button
          onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
        >
          {editingCategory ? (
            <>
              <Edit className="h-4 w-4 mr-2" /> Cập nhật
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" /> Thêm
            </>
          )}
        </Button>
        {editingCategory && (
          <Button
            variant="outline"
            onClick={() => {
              setEditingCategory(null);
              setNewCategory("");
            }}
          >
            Hủy
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <span>{category.name}</span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingCategory(category);
                  setNewCategory(category.name);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setCategoryToDelete(category.id);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

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
              onClick={() =>
                categoryToDelete && handleDeleteCategory(categoryToDelete)
              }
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
