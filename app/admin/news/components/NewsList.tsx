"use client";

import { useState, useMemo } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Table } from "../../../../components/ui/table";
import { Badge } from "../../../../components/ui/badge";
import { useToast } from "../../../../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import NewsForm from "./NewsForm";
import { Search, Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Blog, BlogInput, Category } from "../types/blog";

interface NewsListProps {
  categories: Category[];
}

export default function NewsList({ categories }: NewsListProps) {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title: "Tin tức công nghệ 2025",
      content: "<p>Nội dung về công nghệ...</p>",
      categoryId: 1,
      category: { id: 1, name: "Công nghệ" },
      status: "published",
      createdAt: "2025-04-20",
      updatedAt: "2025-04-20",
      userId: 1,
      author: { id: 1, name: "Nguyen Van A" },
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Hướng dẫn viết blog",
      content: "<p>Hướng dẫn chi tiết...</p>",
      categoryId: 2,
      category: { id: 2, name: "Blog" },
      status: "draft",
      createdAt: "2025-04-18",
      updatedAt: "2025-04-18",
      userId: 2,
      author: { id: 2, name: "Tran Thi B" },
    },
  ]);

  const [editingNews, setEditingNews] = useState<Blog | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { toast } = useToast();

  const filteredNews = useMemo(() => {
    return blogs.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogs, searchTerm]);

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(start, start + itemsPerPage);
  }, [filteredNews, currentPage]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const handleAddNews = (newBlog: BlogInput) => {
    const blog: Blog = {
      ...newBlog,
      id: Math.max(0, ...blogs.map((b) => b.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: categories.find((c) => c.id === newBlog.categoryId)!,
      author: { id: newBlog.userId, name: "Tác giả" }, // Should be from auth
    };
    setBlogs([...blogs, blog]);
    toast({
      title: "Thành công",
      description: "Bài viết đã được thêm thành công",
    });
  };

  const handleUpdateNews = (updatedBlog: Blog) => {
    setBlogs(
      blogs.map((b) =>
        b.id === updatedBlog.id
          ? {
              ...updatedBlog,
              updatedAt: new Date().toISOString(),
              category: categories.find(
                (c) => c.id === updatedBlog.categoryId
              )!,
            }
          : b
      )
    );
    setEditingNews(null);
    toast({
      title: "Thành công",
      description: "Bài viết đã được cập nhật thành công",
    });
  };

  const handleDelete = (id: number) => {
    setBlogs(blogs.filter((item) => item.id !== id));
    toast({
      title: "Thành công",
      description: "Bài viết đã được xóa thành công",
    });
    setDeleteDialogOpen(false);
    setNewsToDelete(null);
  };

  return (
    <div className="space-y-6">
      <NewsForm
        onAddNews={handleAddNews}
        onUpdateNews={handleUpdateNews}
        editingNews={editingNews}
        setEditingNews={setEditingNews}
        categories={categories}
      />

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Danh sách bài viết</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Badge variant="outline" className="px-3 py-1">
              Tổng: {filteredNews.length} bài viết
            </Badge>
          </div>
        </div>

        {paginatedNews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Không tìm thấy bài viết. Hãy thêm hoặc thay đổi tìm kiếm!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiêu đề
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tác giả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {paginatedNews.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.author.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Badge
                          variant={
                            item.status === "published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {item.status === "published" ? "Đã xuất bản" : "Nháp"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingNews(item)}
                        >
                          <Pencil className="h-4 w-4 mr-1" /> Sửa
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setNewsToDelete(item.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Xóa
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </Table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Trang trước
            </Button>
            <span>
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Trang sau
            </Button>
          </div>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể
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
              onClick={() => newsToDelete && handleDelete(newsToDelete)}
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
