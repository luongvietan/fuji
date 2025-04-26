"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useToast } from "../../../../components/ui/use-toast";
import { Calendar } from "../../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Order, OrderInput } from "../types/orders";

interface OrderFormProps {
  onAddOrder: (order: OrderInput) => void;
  onUpdateOrder: (order: Order) => void;
  editingOrder: Order | null;
  setEditingOrder: (order: Order | null) => void;
}

export default function OrderForm({
  onAddOrder,
  onUpdateOrder,
  editingOrder,
  setEditingOrder,
}: OrderFormProps) {
  const [orderDate, setOrderDate] = useState<Date>(new Date());
  const [totalAmount, setTotalAmount] = useState("");
  const [status, setStatus] = useState("Pending");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const { toast } = useToast();

  useEffect(() => {
    if (editingOrder) {
      setOrderDate(new Date(editingOrder.orderDate));
      setTotalAmount(editingOrder.totalAmount.toString());
      setStatus(editingOrder.status);
      setShippingAddress(editingOrder.shippingAddress);
      setPaymentMethod(editingOrder.paymentMethod);
    } else {
      resetForm();
    }
  }, [editingOrder]);

  const resetForm = () => {
    setOrderDate(new Date());
    setTotalAmount("");
    setStatus("Pending");
    setShippingAddress("");
    setPaymentMethod("Cash");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingAddress || !totalAmount) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin đơn hàng",
        variant: "destructive",
      });
      return;
    }

    const totalValue = parseFloat(totalAmount);

    if (isNaN(totalValue)) {
      toast({
        title: "Lỗi",
        description: "Tổng tiền phải là số",
        variant: "destructive",
      });
      return;
    }

    if (totalValue <= 0) {
      toast({
        title: "Lỗi",
        description: "Tổng tiền phải lớn hơn 0",
        variant: "destructive",
      });
      return;
    }

    if (editingOrder) {
      onUpdateOrder({
        id: editingOrder.id,
        orderDate,
        totalAmount: totalValue,
        status,
        shippingAddress,
        paymentMethod,
        userId: editingOrder.userId,
        orderItems: editingOrder.orderItems || [],
      });
    } else {
      onAddOrder({
        orderDate,
        totalAmount: totalValue,
        status,
        shippingAddress,
        paymentMethod,
        userId: 1,
        orderItems: [],
      });
    }

    resetForm();
  };

  const handleCancel = () => {
    setEditingOrder(null);
    resetForm();
  };

  return (
    <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">
        {editingOrder ? "Cập nhật đơn hàng" : "Thêm đơn hàng mới"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Ngày đặt hàng
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {orderDate ? format(orderDate, "PPP") : <span>Chọn ngày</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={orderDate}
                onSelect={(date) => date && setOrderDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Tổng tiền (VND)
          </label>
          <Input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="Nhập tổng tiền"
            min="1"
            className="focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Địa chỉ giao hàng
          </label>
          <Input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Nhập địa chỉ giao hàng"
            className="focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Phương thức thanh toán
          </label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn phương thức thanh toán" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cash">Tiền mặt</SelectItem>
              <SelectItem value="BankTransfer">Chuyển khoản</SelectItem>
              <SelectItem value="CreditCard">Thẻ tín dụng</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Trạng thái</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Đang chờ</SelectItem>
              <SelectItem value="Processing">Đang xử lý</SelectItem>
              <SelectItem value="Shipped">Đã giao hàng</SelectItem>
              <SelectItem value="Delivered">Đã nhận hàng</SelectItem>
              <SelectItem value="Cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {editingOrder ? "Cập nhật" : "Thêm đơn hàng"}
          </Button>
          {editingOrder && (
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleCancel}
            >
              Hủy
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
