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
import CustomerForm from "./CustomerForm";
import { Search } from "lucide-react";

interface Customer {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      fullName: "Nguyen Van A",
      email: "a@example.com",
      phoneNumber: "0123456789",
      address: "123 ABC Street",
    },
    {
      id: 2,
      fullName: "Tran Thi B",
      email: "b@example.com",
      phoneNumber: "0987654321",
      address: "456 DEF Avenue",
    },
    {
      id: 3,
      fullName: "Le Van C",
      email: "c@example.com",
      phoneNumber: "0912345678",
      address: "789 GHI Road",
    },
    {
      id: 4,
      fullName: "Pham Thi D",
      email: "d@example.com",
      phoneNumber: "0321123456",
      address: "111 JKL Street",
    },
    {
      id: 5,
      fullName: "Hoang Van E",
      email: "e@example.com",
      phoneNumber: "0834567890",
      address: "222 MNO Avenue",
    },
    {
      id: 6,
      fullName: "Do Thi F",
      email: "f@example.com",
      phoneNumber: "0709876543",
      address: "333 PQR Road",
    },
    {
      id: 7,
      fullName: "Bui Van G",
      email: "g@example.com",
      phoneNumber: "0932456789",
      address: "444 STU Street",
    },
  ]);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  // Pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const currentCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const handleAddCustomer = (newCustomer: Omit<Customer, "id">) => {
    const customer: Customer = {
      ...newCustomer,
      id: Math.max(0, ...customers.map((c) => c.id)) + 1,
    };
    setCustomers([...customers, customer]);
    toast({
      title: "Thành công",
      description: "Khách hàng đã được thêm thành công",
    });
    setFormDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    toast({
      title: "Thành công",
      description: "Khách hàng đã được xóa thành công",
    });
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(
      customers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
    setEditingCustomer(null);
    setFormDialogOpen(false);
    toast({
      title: "Thành công",
      description: "Khách hàng đã được cập nhật thành công",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Danh sách khách hàng</h2>
        <Button
          onClick={() => {
            setFormDialogOpen(true);
            setEditingCustomer(null);
          }}
        >
          Thêm khách hàng
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Tìm kiếm khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Tổng: {filteredCustomers.length} khách hàng
        </Badge>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <Table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Tên khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Số điện thoại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Địa chỉ
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{customer.fullName}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phoneNumber}</td>
                <td className="px-6 py-4">{customer.address}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingCustomer(customer);
                      setFormDialogOpen(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setCustomerToDelete(customer.id);
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

      {/* Pagination controls */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Dialogs */}
      <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCustomer ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"}
            </DialogTitle>
          </DialogHeader>
          <CustomerForm
            onAddCustomer={handleAddCustomer}
            onUpdateCustomer={handleUpdateCustomer}
            editingCustomer={editingCustomer}
            setEditingCustomer={setEditingCustomer}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa khách hàng này? Hành động này không thể
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
              onClick={() => customerToDelete && handleDelete(customerToDelete)}
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
