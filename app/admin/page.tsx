import { AdminTemplate } from "./components/template"
import { Users, ShoppingCart, Package, DollarSign } from "lucide-react"

export default function AdminPage() {
  // Dữ liệu mẫu
  const stats = [
    {
      title: "Tổng doanh thu",
      value: "12.500.000 ₫",
      change: "+12%",
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      title: "Đơn hàng",
      value: "45",
      change: "+5%",
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "Sản phẩm",
      value: "120",
      change: "+2%",
      icon: Package,
      color: "bg-purple-500",
    },
    {
      title: "Khách hàng",
      value: "240",
      change: "+8%",
      icon: Users,
      color: "bg-orange-500",
    },
  ]

  const recentOrders = [
    { id: "#ORD-001", customer: "Nguyễn Văn A", date: "15/03/2023", status: "Hoàn thành", amount: "350.000 ₫" },
    { id: "#ORD-002", customer: "Trần Thị B", date: "14/03/2023", status: "Đang giao", amount: "520.000 ₫" },
    { id: "#ORD-003", customer: "Lê Văn C", date: "14/03/2023", status: "Đang xử lý", amount: "180.000 ₫" },
    { id: "#ORD-004", customer: "Phạm Thị D", date: "13/03/2023", status: "Hoàn thành", amount: "420.000 ₫" },
    { id: "#ORD-005", customer: "Hoàng Văn E", date: "12/03/2023", status: "Đã hủy", amount: "250.000 ₫" },
  ]

  return (
    <AdminTemplate>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-full mr-4`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-xl font-bold">{stat.value}</h3>
                <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                  {stat.change} so với tháng trước
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold">Đơn hàng gần đây</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.status === "Hoàn thành"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Đang giao"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Đang xử lý"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminTemplate>
  )
}

