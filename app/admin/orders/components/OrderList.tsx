"use client";

import { useState, useMemo } from "react";
import { Button } from "../../../../components/ui/button";
import { Table } from "../../../../components/ui/table";
import { Badge } from "../../../../components/ui/badge";
import { useToast } from "../../../../components/ui/use-toast";
import OrderForm from "./OrderForm";
import { Input } from "../../../../components/ui/input";
import {
  Search,
  CalendarDays,
  LocateFixed,
  WalletCards,
  BadgeCheck,
  Filter,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Calendar } from "../../../../components/ui/calendar";
import { Order, OrderInput } from "../types/orders";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderDate: new Date("2023-05-15"),
      totalAmount: 500000,
      status: "Pending",
      shippingAddress: "123 ABC Street, Hanoi",
      paymentMethod: "Cash",
      userId: 1,
      orderItems: [
        { id: 1, fruitName: "Táo Envy", quantity: 2, price: 100000 },
        { id: 2, fruitName: "Kiwi", quantity: 1, price: 300000 },
      ],
    },
    {
      id: 2,
      orderDate: new Date("2023-05-16"),
      totalAmount: 300000,
      status: "Processing",
      shippingAddress: "456 DEF Avenue, Ho Chi Minh City",
      paymentMethod: "BankTransfer",
      userId: 2,
      orderItems: [
        { id: 3, fruitName: "Chuối", quantity: 5, price: 50000 },
        { id: 4, fruitName: "Xoài", quantity: 2, price: 50000 },
      ],
    },
    {
      id: 3,
      orderDate: new Date("2023-05-17"),
      totalAmount: 700000,
      status: "Shipped",
      shippingAddress: "789 GHI Road, Da Nang",
      paymentMethod: "CreditCard",
      userId: 3,
      orderItems: [
        { id: 5, fruitName: "Dưa hấu", quantity: 1, price: 500000 },
        { id: 6, fruitName: "Dâu tây", quantity: 2, price: 100000 },
      ],
    },
    {
      id: 4,
      orderDate: new Date("2023-05-18"),
      totalAmount: 450000,
      status: "Delivered",
      shippingAddress: "111 JKL Street, Hai Phong",
      paymentMethod: "Cash",
      userId: 4,
      orderItems: [{ id: 7, fruitName: "Cam", quantity: 3, price: 150000 }],
    },
    {
      id: 5,
      orderDate: new Date("2023-05-19"),
      totalAmount: 1200000,
      status: "Cancelled",
      shippingAddress: "222 MNO Avenue, Can Tho",
      paymentMethod: "BankTransfer",
      userId: 5,
      orderItems: [{ id: 8, fruitName: "Bơ", quantity: 4, price: 300000 }],
    },
    {
      id: 6,
      orderDate: new Date("2023-05-20"),
      totalAmount: 800000,
      status: "Processing",
      shippingAddress: "333 PQR Road, Nha Trang",
      paymentMethod: "CreditCard",
      userId: 6,
      orderItems: [{ id: 9, fruitName: "Nho", quantity: 2, price: 400000 }],
    },
    {
      id: 7,
      orderDate: new Date("2023-05-21"),
      totalAmount: 950000,
      status: "Shipped",
      shippingAddress: "444 STU Street, Vung Tau",
      paymentMethod: "Cash",
      userId: 7,
      orderItems: [
        { id: 10, fruitName: "Măng cụt", quantity: 3, price: 300000 },
        { id: 11, fruitName: "Sầu riêng", quantity: 1, price: 350000 },
      ],
    },
  ]);

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Search and filter
  // State cho bộ lọc
  const [filters, setFilters] = useState({
    dateRange: { from: undefined, to: undefined } as DateRange,
    minAmount: "",
    maxAmount: "",
    shippingAddress: "",
    paymentMethod: "",
    status: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Hàm xử lý thay đổi bộ lọc
  const handleFilterChange = (field: string, value: any) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  // Hàm reset bộ lọc
  const resetFilters = () => {
    setFilters({
      dateRange: { from: undefined, to: undefined },
      minAmount: "",
      maxAmount: "",
      shippingAddress: "",
      paymentMethod: "",
      status: "",
    });
  };

  // Hàm lọc đơn hàng
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Lọc theo khoảng ngày
      if (
        filters.dateRange.from &&
        new Date(order.orderDate) < filters.dateRange.from
      ) {
        return false;
      }
      if (
        filters.dateRange.to &&
        new Date(order.orderDate) > filters.dateRange.to
      ) {
        return false;
      }

      // Lọc theo khoảng giá
      if (filters.minAmount && order.totalAmount < Number(filters.minAmount)) {
        return false;
      }
      if (filters.maxAmount && order.totalAmount > Number(filters.maxAmount)) {
        return false;
      }

      // Lọc theo địa chỉ
      if (
        filters.shippingAddress &&
        !order.shippingAddress
          .toLowerCase()
          .includes(filters.shippingAddress.toLowerCase())
      ) {
        return false;
      }

      // Lọc theo phương thức thanh toán
      if (
        filters.paymentMethod &&
        order.paymentMethod !== filters.paymentMethod
      ) {
        return false;
      }

      // Lọc theo trạng thái
      if (filters.status && order.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [orders, filters]);

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const handleAddOrder = (newOrder: OrderInput) => {
    const order: Order = {
      ...newOrder,
      id: Math.max(0, ...orders.map((o) => o.id)) + 1,
      orderItems: [],
    };
    setOrders([...orders, order]);
    toast({
      title: "Thành công",
      description: "Đơn hàng đã được thêm thành công",
    });
  };

  const handleDelete = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id));
    toast({
      title: "Thành công",
      description: "Đơn hàng đã được xóa thành công",
    });
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(
      orders.map((o) =>
        o.id === updatedOrder.id
          ? { ...updatedOrder, orderItems: o.orderItems }
          : o
      )
    );
    setEditingOrder(null);
    toast({
      title: "Thành công",
      description: "Đơn hàng đã được cập nhật thành công",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Pending":
        return "Đang chờ";
      case "Processing":
        return "Đang xử lý";
      case "Shipped":
        return "Đã giao hàng";
      case "Delivered":
        return "Đã nhận hàng";
      case "Cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "Cash":
        return "Tiền mặt";
      case "BankTransfer":
        return "Chuyển khoản";
      case "CreditCard":
        return "Thẻ tín dụng";
      default:
        return method;
    }
  };

  return (
    <div className="space-y-6">
      {editingOrder && (
        <OrderForm
          onAddOrder={handleAddOrder}
          onUpdateOrder={handleUpdateOrder}
          editingOrder={editingOrder}
          setEditingOrder={setEditingOrder}
        />
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Danh sách đơn hàng</h2>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Bộ lọc</span>
            </Button>
            <Badge variant="outline" className="px-3 py-1">
              Tổng: {filteredOrders.length} đơn hàng
            </Badge>
          </div>
        </div>
        {isFilterOpen && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Lọc theo ngày */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Ngày đặt hàng
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {filters.dateRange.from ? (
                        filters.dateRange.to ? (
                          <>
                            {format(filters.dateRange.from, "dd/MM/yyyy")} -{" "}
                            {format(filters.dateRange.to, "dd/MM/yyyy")}
                          </>
                        ) : (
                          format(filters.dateRange.from, "dd/MM/yyyy")
                        )
                      ) : (
                        <span>Chọn khoảng ngày</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="range"
                      selected={filters.dateRange}
                      onSelect={(range) =>
                        handleFilterChange(
                          "dateRange",
                          range || { from: undefined, to: undefined }
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Lọc theo khoảng giá */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <WalletCards className="h-4 w-4 mr-2" />
                  Khoảng giá (VND)
                </label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Từ"
                    value={filters.minAmount}
                    onChange={(e) =>
                      handleFilterChange("minAmount", e.target.value)
                    }
                    type="number"
                  />
                  <Input
                    placeholder="Đến"
                    value={filters.maxAmount}
                    onChange={(e) =>
                      handleFilterChange("maxAmount", e.target.value)
                    }
                    type="number"
                  />
                </div>
              </div>

              {/* Lọc theo địa chỉ */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <LocateFixed className="h-4 w-4 mr-2" />
                  Địa chỉ giao hàng
                </label>
                <Input
                  placeholder="Nhập địa chỉ"
                  value={filters.shippingAddress}
                  onChange={(e) =>
                    handleFilterChange("shippingAddress", e.target.value)
                  }
                />
              </div>

              {/* Lọc theo phương thức thanh toán */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <WalletCards className="h-4 w-4 mr-2" />
                  Phương thức TT
                </label>
                <Select
                  value={filters.paymentMethod}
                  onValueChange={(value) =>
                    handleFilterChange("paymentMethod", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Cash">Tiền mặt</SelectItem>
                    <SelectItem value="BankTransfer">Chuyển khoản</SelectItem>
                    <SelectItem value="CreditCard">Thẻ tín dụng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lọc theo trạng thái */}
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <BadgeCheck className="h-4 w-4 mr-2" />
                  Trạng thái
                </label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Pending">Đang chờ</SelectItem>
                    <SelectItem value="Processing">Đang xử lý</SelectItem>
                    <SelectItem value="Shipped">Đã giao hàng</SelectItem>
                    <SelectItem value="Delivered">Đã nhận hàng</SelectItem>
                    <SelectItem value="Cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Xóa bộ lọc</span>
              </Button>
            </div>
          </div>
        )}
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Không có đơn hàng nào. Hãy thêm đơn hàng mới!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Địa chỉ giao
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phương thức TT
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(order.orderDate), "dd/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <Badge variant="secondary" className="px-2 py-1">
                        {order.totalAmount.toLocaleString()} VND
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.shippingAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      {getPaymentMethodText(order.paymentMethod)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setViewDialogOpen(true);
                        }}
                      >
                        Xem
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingOrder(order)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setOrderToDelete(order.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            )}
          </div>
        )}
      </div>

      {/* View Order Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Ngày đặt hàng
                  </p>
                  <p>
                    {format(new Date(selectedOrder.orderDate), "dd/MM/yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Trạng thái
                  </p>
                  <p>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                        selectedOrder.status
                      )}`}
                    >
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tổng tiền</p>
                  <p className="font-semibold">
                    {selectedOrder.totalAmount.toLocaleString()} VND
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Phương thức thanh toán
                  </p>
                  <p>{getPaymentMethodText(selectedOrder.paymentMethod)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">
                    Địa chỉ giao hàng
                  </p>
                  <p>{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Sản phẩm
                </p>
                <div className="border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Sản phẩm
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                          Số lượng
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                          Đơn giá
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                          Thành tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.orderItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {item.fruitName}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                            {item.price.toLocaleString()} VND
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                            {(item.quantity * item.price).toLocaleString()} VND
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa đơn hàng này? Hành động này không thể
              hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => orderToDelete && handleDelete(orderToDelete)}
            >
              Xóa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
