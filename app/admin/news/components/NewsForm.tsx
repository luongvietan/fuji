"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useToast } from "../../../../components/ui/use-toast";
import { Loader2, Upload } from "lucide-react";
import { Blog, BlogInput, Category } from "../types/blog";

interface NewsFormProps {
  onAddNews: (blog: BlogInput) => void;
  onUpdateNews: (blog: Blog) => void;
  editingNews: Blog | null;
  setEditingNews: (blog: Blog | null) => void;
  categories: Category[];
}

export default function NewsForm({
  onAddNews,
  onUpdateNews,
  editingNews,
  setEditingNews,
  categories,
}: NewsFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editingNews) {
      setTitle(editingNews.title);
      setContent(editingNews.content);
      setCategoryId(editingNews.categoryId);
      setStatus(editingNews.status);
      setImage(editingNews.image);
    } else {
      resetForm();
    }
  }, [editingNews]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "Tiêu đề là bắt buộc";
    if (!content.trim()) newErrors.content = "Nội dung là bắt buộc";
    if (!categoryId) newErrors.category = "Danh mục là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn file hình ảnh",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const blogData: BlogInput = {
        title,
        content,
        image,
        status,
        userId: 1, // Should be from auth
        categoryId,
      };

      if (editingNews) {
        onUpdateNews({
          ...editingNews,
          ...blogData,
          updatedAt: new Date().toISOString(),
        });
      } else {
        onAddNews(blogData);
      }
      resetForm();
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategoryId(0);
    setStatus("draft");
    setImage(undefined);
    setImageFile(null);
    setErrors({});
    setEditingNews(null);
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">
        {editingNews ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tiêu đề</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề bài viết"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Nội dung</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nhập nội dung bài viết..."
            rows={10}
            className={errors.content ? "border-red-500" : ""}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Danh mục</label>
          <Select
            value={categoryId.toString()}
            onValueChange={(value) => setCategoryId(Number(value))}
          >
            <SelectTrigger className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Trạng thái</label>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as "draft" | "published")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Nháp</SelectItem>
              <SelectItem value="published">Đã xuất bản</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium">Hình ảnh đại diện</label>
          <div className="flex items-center space-x-4">
            <Button type="button" variant="outline" asChild>
              <label htmlFor="image-upload">
                <Upload className="h-4 w-4 mr-2" /> Tải lên hình ảnh
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </Button>
            {image && (
              <img
                src={image}
                alt="Preview"
                className="h-16 w-16 object-cover rounded"
              />
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {editingNews ? "Cập nhật" : "Thêm bài viết"}
          </Button>
          {editingNews && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Hủy
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
