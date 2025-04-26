"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Loader2 } from "lucide-react";

interface Customer {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface CustomerFormProps {
  onAddCustomer: (customer: Omit<Customer, "id">) => void;
  onUpdateCustomer?: (customer: Customer) => void;
  editingCustomer?: Customer | null;
  setEditingCustomer?: (customer: Customer | null) => void;
}

export default function CustomerForm({
  onAddCustomer,
  onUpdateCustomer,
  editingCustomer,
  setEditingCustomer,
}: CustomerFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingCustomer) {
      setFullName(editingCustomer.fullName);
      setEmail(editingCustomer.email);
      setPhoneNumber(editingCustomer.phoneNumber);
      setAddress(editingCustomer.address);
    } else {
      resetForm();
    }
  }, [editingCustomer]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName) newErrors.fullName = "Tên khách hàng là bắt buộc";
    if (!email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại phải có 10 chữ số";
    }
    if (!address) newErrors.address = "Địa chỉ là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (editingCustomer && onUpdateCustomer) {
        onUpdateCustomer({
          ...editingCustomer,
          fullName,
          email,
          phoneNumber,
          address,
        });
      } else {
        onAddCustomer({ fullName, email, phoneNumber, address });
      }
      resetForm();
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
    setErrors({});
    if (setEditingCustomer) setEditingCustomer(null);
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tên khách hàng</label>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nhập tên khách hàng"
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Số điện thoại</label>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Nhập số điện thoại"
            className={errors.phoneNumber ? "border-red-500" : ""}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Địa chỉ</label>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ"
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <div className="flex space-x-2 justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {editingCustomer ? "Cập nhật" : "Thêm"}
          </Button>
          {editingCustomer && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Hủy
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
