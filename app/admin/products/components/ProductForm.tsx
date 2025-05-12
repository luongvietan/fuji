"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Badge } from "../../../../components/ui/badge";
import { useToast } from "../../../../components/ui/use-toast";
import { Fruit, Category, FruitPOST } from "../../types";
import { getCategoriesPaginated, uploadFruitImage } from "../../api";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // nhớ import CSS
import { parseISO } from "date-fns"; // để parse ISO string

interface ProductFormProps {
  onAddProduct: (product: FruitPOST) => void;
  onUpdateProduct: (product: Fruit) => void;
  editingProduct: Fruit | null;
  setEditingProduct: (product: Fruit | null) => void;
}

export default function ProductForm({
  onAddProduct,
  onUpdateProduct,
  editingProduct,
  setEditingProduct,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [origin, setOrigin] = useState("");
  const [weight, setWeight] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [discount, setDiscount] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [importDate, setImportDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price.toString());
      setQuantity(editingProduct.quantity.toString());
      setDescription(editingProduct.description);
      setImage(editingProduct.image);
      setTags(editingProduct.tags || []);
      setCategories(editingProduct.categories || []);
      setImportDate(editingProduct.importDate);
      setOrigin(editingProduct.origin);
      setWeight(editingProduct.weight.toString());
      setStockStatus(editingProduct.stockStatus);
      setDiscount(editingProduct.discount.toString());
      setSelectedCategory(editingProduct.categories[0] || null);
    } else {
      resetForm();
    }
  }, [editingProduct]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesPaginated(0, 1000);
        setCategories(data.data.content);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setImage("");
    setTags([]);
    setNewTag("");
    setSelectedCategory(null);
    setImportDate("");
    setOrigin("");
    setWeight("");
    setStockStatus("");
    setDiscount("");
    setFile(null);
    setPreviewUrl("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));

    // console.log("Ảnh được chọn:", selected);
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Chỉ cho phép chữ cái và khoảng trắng (bao gồm ký tự tiếng Việt)
    if (/^[a-zA-Z\s\u00C0-\u1EF9]*$/.test(value)) {
      setOrigin(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (!name.trim()) {
      toast({
        title: "Lỗi",
        description: "Tên sản phẩm không được để trống",
        variant: "destructive",
      });
      return;
    }
    if (!price.trim()) {
      toast({
        title: "Lỗi",
        description: "Giá không được để trống",
        variant: "destructive",
      });
      return;
    }
    if (!quantity.trim()) {
      toast({
        title: "Lỗi",
        description: "Số lượng không được để trống",
        variant: "destructive",
      });
      return;
    }
    if (!description.trim()) {
      toast({
        title: "Lỗi",
        description: "Mô tả không được để trống",
        variant: "destructive",
      });
      return;
    }
    if (!origin.trim()) {
      toast({
        title: "Lỗi",
        description: "Xuất xứ không được để trống",
        variant: "destructive",
      });
      return;
    }
    if (!/^[a-zA-Z\s\u00C0-\u1EF9]+$/.test(origin.trim())) {
      toast({
        title: "Lỗi",
        description: "Xuất xứ chỉ được chứa chữ cái, không được chứa số",
        variant: "destructive",
      });
      return;
    }
    if (!weight.trim()) {
      toast({
        title: "Lỗi",
        description: "Khối lượng không được để trống",
        variant: "destructive",
      });
      return;
    }
    if (!stockStatus) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn trạng thái kho",
        variant: "destructive",
      });
      return;
    }
    if (!importDate) {
      toast({
        title: "Lỗi",
        description: "Ngày nhập không được để trống",
        variant: "destructive",
      });
      return;
    }
    if (!selectedCategory) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn danh mục",
        variant: "destructive",
      });
      return;
    }
    if (!editingProduct && !file) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn ảnh sản phẩm",
        variant: "destructive",
      });
      return;
    }
    if (!discount.trim()) {
      toast({
        title: "Lỗi",
        description: "Giảm giá không được để trống",
        variant: "destructive",
      });
      return;
    }

    const priceValue = parseFloat(price);
    const quantityValue = parseInt(quantity);
    const discountValue = parseFloat(discount);
    const weightValue = parseFloat(weight);

    if (
      isNaN(priceValue) ||
      isNaN(quantityValue) ||
      isNaN(weightValue) ||
      isNaN(discountValue)
    ) {
      toast({
        title: "Lỗi",
        description: "Giá, số lượng, khối lượng và giảm giá phải là số hợp lệ",
        variant: "destructive",
      });
      return;
    }

    if (discountValue < 0 || discountValue > 1) {
      toast({
        title: "Lỗi",
        description: "Giảm giá phải nằm trong khoảng từ 0 đến 1",
        variant: "destructive",
      });
      return;
    }

    try {
      const promises = [];
      let imageUploadPromise = Promise.resolve(image);
      if (file) {
        imageUploadPromise = uploadFruitImage(file).then((result) => {
          // console.log("Kết quả upload ảnh:", result);
          if (!result?.path) {
            throw new Error("Upload ảnh thất bại, không có đường dẫn trả về");
          }
          return result.path;
        });
      }
      promises.push(imageUploadPromise);

      const [uploadedImagePath] = await Promise.all(promises);

      const categorylist = selectedCategory ? [selectedCategory] : [];

      const product = {
        name,
        price: priceValue,
        quantity: quantityValue,
        description,
        image: uploadedImagePath,
        tags: tags || [],
        categories: categorylist,
        importDate,
        origin,
        weight: weightValue,
        stockStatus,
        discount: discountValue,
      };

      // console.log("Dữ liệu sản phẩm gửi lên server:", product);

      if (editingProduct) {
        await onUpdateProduct({ ...product, id: editingProduct.id } as Fruit);
      } else {
        await onAddProduct(product as FruitPOST);
      }

      resetForm();
      toast({
        title: "Thành công",
        description: editingProduct
          ? "Cập nhật sản phẩm thành công"
          : "Thêm sản phẩm thành công",
      });
    } catch (err) {
      console.error("Lỗi khi xử lý sản phẩm:", err);
      toast({
        title: "Lỗi",
        description: err.message || "Có lỗi xảy ra khi xử lý sản phẩm",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div>
        <label className="block text-sm font-medium">Tên sản phẩm *</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Giá (VND) *</label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Số lượng *</label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Số lượng"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Mô tả *</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả sản phẩm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Ảnh sản phẩm *</label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!editingProduct}
        />
        {previewUrl && (
          <div className="mt-2">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-16 h-16 object-cover rounded"
            />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Tags</label>
        <div className="flex space-x-2 mt-1">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Nhập tag mới"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" onClick={addTag} className="rounded-full">
            +
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-green-500 text-white rounded-full cursor-pointer"
              onClick={() => removeTag(tag)}
            >
              {tag} <span className="ml-1">×</span>
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Xuất xứ *</label>
        <Input
          value={origin}
          onChange={handleOriginChange}
          placeholder="Xuất xứ"
          pattern="[a-zA-Z\s\u00C0-\u1EF9]*"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Khối lượng (kg) *</label>
        <Input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Khối lượng"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Trạng thái kho *</label>
        <select
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
          className="form-select w-full p-2 border rounded"
          required
        >
          <option value="" disabled>
            Chọn Trạng Thái
          </option>
          <option value="IN_STOCK">Còn hàng</option>
          <option value="OUT_OF_STOCK">Hết hàng</option>
          <option value="LOW_STOCK">Sắp hết hàng</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Giảm giá *</label>
        <Input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Nhập giảm giá (0-1)"
          min="0"
          max="1"
          step="0.01"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Ngày nhập *</label>
        <DatePicker
          selected={importDate ? parseISO(importDate) : null}
          onChange={(date: Date | null) => {
            if (date) {
              setImportDate(date.toISOString());
            } else {
              setImportDate("");
            }
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText="Ngày/Tháng/Năm"
          className="w-full p-2 border rounded" // dùng cùng style với input
          maxDate={new Date()}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Danh mục *</label>
        <select
          value={selectedCategory?.name || ""}
          onChange={(e) => {
            const selected = categories.find(
              (category) => category.name === e.target.value
            );
            setSelectedCategory(selected || null);
          }}
          className="form-select w-full p-2 border rounded"
          required
        >
          <option value="" disabled>
            Chọn Danh Mục
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-4 justify-end col-span-2">
        <Button type="submit">{editingProduct ? "Cập nhật" : "Thêm"}</Button>
        {editingProduct && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditingProduct(null)}
          >
            Hủy
          </Button>
        )}
      </div>
    </form>
  );
}
