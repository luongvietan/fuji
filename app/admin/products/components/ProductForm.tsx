// ProductForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Badge } from "../../../../components/ui/badge";
import { useToast } from "../../../../components/ui/use-toast";
import { Fruit } from "../../types";

interface ProductFormProps {
  onAddProduct: (product: Omit<Fruit, "id">) => void;
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
  const { toast } = useToast();

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price.toString());
      setQuantity(editingProduct.quantity.toString());
      setDescription(editingProduct.description);
      setImage(editingProduct.image);
      setTags(editingProduct.tags || []);
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setImage("");
    setTags([]);
    setNewTag("");
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
    if (!name || !price || !quantity || !description || !image) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

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

    const product = {
      name,
      price: priceValue,
      quantity: quantityValue,
      description,
      image,
      tags,
    };

    if (editingProduct) {
      onUpdateProduct({ ...product, id: editingProduct.id });
    } else {
      onAddProduct(product);
    }
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div>
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
              className="rounded-full cursor-pointer"
              onClick={() => removeTag(tag)}
            >
              {tag} <span className="ml-1">×</span>
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex space-x-2 justify-end">
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
