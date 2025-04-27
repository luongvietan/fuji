// ProductForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Badge } from "../../../../components/ui/badge";
import { useToast } from "../../../../components/ui/use-toast";
import { Fruit, Category, FruitPOST } from "../../types";
import { set } from "date-fns";
import { getCategoriesPaginated } from "../../api";

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
  const [stockStatus, setStockStatus] = useState("IN_STOCK");
  const [discount, setDiscount] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [importDate, setImportDate] = useState("");
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
    } else {
      resetForm();
    }
  }, [editingProduct]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesPaginated(0, 1000); // Fetch first 10 categories
        console.log(data);

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
    setStockStatus("IN_STOCK");
    setDiscount("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("lỗi");
    // if (!name || !price || !quantity || !description ||  !importDate) {
    //   toast({
    //     title: "Lỗi",
    //     description: "Vui lòng nhập đầy đủ thông tin",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    const priceValue = parseFloat(price);
    const quantityValue = parseInt(quantity);

    if (isNaN(priceValue) || isNaN(quantityValue)) {
      toast({
        title: "Lỗi",
        description: "Giá và số lượng phải là số",
        variant: "destructive",
      });
      return;
    }
    const categorylist = [];
    categorylist.push(selectedCategory);
    const product = {
      name,
      price: priceValue,
      quantity: quantityValue,
      description,
      tags: tags || [""],
      categories: categorylist || [],
      importDate,
      origin,
      weight: parseFloat(weight) || 0,
      stockStatus,
      discount: parseFloat(discount) || 0,
    };

    if (editingProduct) {
      onUpdateProduct({ ...product, id: editingProduct.id } as Fruit);
    } else {
      onAddProduct(product as FruitPOST);
    }
    resetForm();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-1"
    >
      <div>
        <label className="block text-sm font-medium">Tên sản phẩm</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Giá (VND)</label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Số lượng</label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Số lượng"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Mô tả</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả sản phẩm"
        />
      </div>
      {/* <div>
        <label className="block text-sm font-medium mb-1">Ảnh sản phẩm</label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <div className="mt-2">
            <img
              src={image}
              alt="Preview"
              className="w-16 h-16 object-cover rounded"
            />
          </div>
        )}
      </div> */}
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
              className="rounded-full cursor-pointer"
              onClick={() => removeTag(tag)}
            >
              {tag} <span className="ml-1">×</span>
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Xuất xứ</label>
        <Input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Xuất xứ"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Khối lượng (kg)</label>
        <Input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Khối lượng"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Trạng thái kho</label>
        <select
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
          className="form-select"
        >
          <option value="IN_STOCK">Còn hàng</option>
          <option value="OUT_OF_STOCK">Hết hàng</option>
          <option value="LOW_STOCK">Sắp hết hàng</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Giảm giá (%)</label>
        <Input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Giảm giá"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Ngày nhập</label>
        <Input
          type="date"
          value={importDate}
          onChange={(e) => setImportDate(e.target.value)}
          placeholder="Ngày nhập"
          max={new Date().toISOString().split("T")[0]} // Set max to today's date
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Danh mục</label>
        <select
          onChange={(e) => {
            const selectedCategory = categories.find(
              (category) => category.name === e.target.value
            );
            setSelectedCategory(selectedCategory || null);
          }}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-4 justify-end">
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
