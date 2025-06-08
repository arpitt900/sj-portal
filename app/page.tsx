"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Gem,
  Bot,
  TrendingUp,
  Users,
  Package,
  CreditCard,
  Settings,
  Banknote,
  ShoppingCart,
  PieChart,
  Hammer,
  CheckSquare,
  Quote,
  Gift,
  DollarSign,
  Clock,
  Plus,
} from "lucide-react"
import AIConsole from "@/components/ai-console"
import StockManagement from "@/components/stock-management"
import Analytics from "@/components/analytics"
import TransactionManager from "@/components/transaction-manager"
import ClientManagement from "@/components/client-management"
import HarvestPlan from "@/components/harvest-plan"
import KarigarManagement from "@/components/karigar-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { initDatabase } from "@/lib/db"

export default function ShreejiJewelsPortal() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    async function initializeDatabase() {
      try {
        await initDatabase()
        console.log("Database initialization complete.")
      } catch (error) {
        console.error("Failed to initialize database:", error)
      }
    }

    initializeDatabase()
  }, [])

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: PieChart },
    { id: "ai-console", label: "AI Console", icon: Bot },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "stock", label: "Stock Management", icon: Package },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "clients", label: "Client Management", icon: Users },
    { id: "karigar", label: "Karigar & Material Management", icon: Hammer },
    { id: "approval", label: "Approval Section", icon: CheckSquare },
    { id: "quotes", label: "Quote Generation", icon: Quote },
    { id: "sales", label: "Sales", icon: ShoppingCart },
    { id: "harvest", label: "Harvest Plans", icon: Gift },
    { id: "creditor", label: "Creditor/Debtor", icon: DollarSign },
    { id: "purchase", label: "Purchase Management", icon: ShoppingCart },
    { id: "suppliers", label: "Supplier Management", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const quickStats = [
    { title: "Today's Gold Rate", value: "₹0/gram", change: "+0%", icon: Banknote, color: "text-yellow-500" },
    { title: "Total Stock Value", value: "₹0", change: "+0%", icon: Package, color: "text-blue-500" },
    { title: "Pending Orders", value: "0", change: "0", icon: Clock, color: "text-orange-500" },
    { title: "Monthly Revenue", value: "₹0", change: "+0%", icon: TrendingUp, color: "text-green-500" },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "ai-console":
        return <AIConsole />
      case "analytics":
        return <Analytics />
      case "stock":
        return <StockManagement />
      case "transactions":
        return <TransactionManager />
      case "clients":
        return <ClientManagement />
      case "harvest":
        return <HarvestPlan />
      case "karigar":
        return <KarigarManagement />
      case "approval":
        return (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckSquare className="mr-2 h-5 w-5" /> Approval Section
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pending">
                  <TabsList className="bg-gray-700 border-gray-600">
                    <TabsTrigger value="pending">Pending Approvals (3)</TabsTrigger>
                    <TabsTrigger value="history">Approval History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pending" className="mt-4">
                    <p className="text-gray-400">No items pending approval.</p>
                  </TabsContent>
                  <TabsContent value="history" className="mt-4">
                    <p className="text-gray-400">No approval history found.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )
      case "quotes":
        return (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Quote className="mr-2 h-5 w-5" /> Quote Generation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create New Quote
                  </Button>
                </div>
                <Tabs defaultValue="recent">
                  <TabsList className="bg-gray-700 border-gray-600">
                    <TabsTrigger value="recent">Recent Quotes (5)</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts (2)</TabsTrigger>
                    <TabsTrigger value="templates">Quote Templates</TabsTrigger>
                  </TabsList>
                  <TabsContent value="recent" className="mt-4">
                    <p className="text-gray-400">No quotes found. Create your first quote to get started.</p>
                  </TabsContent>
                  <TabsContent value="drafts" className="mt-4">
                    <p className="text-gray-400">No draft quotes found.</p>
                  </TabsContent>
                  <TabsContent value="templates" className="mt-4">
                    <p className="text-gray-400">Manage and use quote templates...</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )
      case "sales":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Sales</p>
                      <p className="text-2xl font-bold text-green-500">₹0</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Pending Deliveries</p>
                      <p className="text-2xl font-bold text-yellow-500">0</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Avg. Sale Value</p>
                      <p className="text-2xl font-bold text-blue-500">₹0</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Top Category</p>
                      <p className="text-2xl font-bold text-purple-500">None</p>
                    </div>
                    <Gem className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Sales Management
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Create New Sale
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Sales management functionality coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )
      case "purchase":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Purchases</p>
                      <p className="text-2xl font-bold text-blue-500">₹0</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Pending Orders</p>
                      <p className="text-2xl font-bold text-yellow-500">0</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Active Suppliers</p>
                      <p className="text-2xl font-bold text-green-500">0</p>
                    </div>
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">This Month</p>
                      <p className="text-2xl font-bold text-purple-500">₹0</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Purchase Management
                  <Button variant="outline" size="sm" className="border-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Suppliers
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Purchase
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Purchase management functionality coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )
      case "suppliers":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Active Suppliers</p>
                      <p className="text-2xl font-bold text-green-500">0</p>
                    </div>
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Unregistered</p>
                      <p className="text-2xl font-bold text-red-500">0</p>
                    </div>
                    <Users className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Pending Approval</p>
                      <p className="text-2xl font-bold text-yellow-500">0</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Supplier Management
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Supplier
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Supplier management functionality coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )
      case "creditor":
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Receivables</p>
                      <p className="text-2xl font-bold text-green-500">₹0</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Payables</p>
                      <p className="text-2xl font-bold text-red-500">₹0</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Net Position</p>
                      <p className="text-2xl font-bold text-blue-500">₹0</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Overdue Amount</p>
                      <p className="text-2xl font-bold text-orange-500">₹0</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Debtors - Money to Receive (Green) */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Debtors - Money to Receive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[].map((debtor) => (
                      <Card
                        key={debtor.id}
                        className="bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-650 transition-colors"
                        onClick={() => {
                          alert(`Opening details for Debtor: ${debtor.name}`)
                        }}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-white">{debtor.name}</h3>
                              <p className="text-sm text-gray-400">
                                {debtor.type} • Last: {debtor.lastTransaction}
                              </p>
                              {debtor.overdue && (
                                <Badge
                                  variant="outline"
                                  className="mt-1 text-xs bg-red-900 text-red-300 border-red-700"
                                >
                                  Overdue
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-400">₹{debtor.amount.toLocaleString()}</p>
                              <p className="text-xs text-gray-400">To Receive</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 rotate-180" />
                    Creditors - Money to Pay
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[].map((creditor) => (
                      <Card
                        key={creditor.id}
                        className="bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-650 transition-colors"
                        onClick={() => {
                          alert(`Opening details for Creditor: ${creditor.name}`)
                        }}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-white">{creditor.name}</h3>
                              <p className="text-sm text-gray-400">
                                {creditor.type} • Last: {creditor.lastTransaction}
                              </p>
                              {creditor.overdue && (
                                <Badge
                                  variant="outline"
                                  className="mt-1 text-xs bg-red-900 text-red-300 border-red-700"
                                >
                                  Overdue
                                </Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-red-400">₹{creditor.amount.toLocaleString()}</p>
                              <p className="text-xs text-gray-400">To Pay</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="mr-2 h-5 w-5" /> Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Manage your portal settings and preferences here.</p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">Dark Mode</label>
                    <Button variant="outline" size="sm" className="border-gray-600">
                      Toggle
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">Notifications</label>
                    <Button variant="outline" size="sm" className="border-gray-600">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">API Keys</label>
                    <Button variant="outline" size="sm" className="border-gray-600">
                      Generate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-500">₹0</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">New Clients</p>
                      <p className="text-2xl font-bold text-blue-500">0</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Stock Value</p>
                      <p className="text-2xl font-bold text-yellow-500">₹0</p>
                    </div>
                    <Package className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Avg. Transaction</p>
                      <p className="text-2xl font-bold text-purple-500">₹0</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Dashboard Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Welcome to your Shreeji Jewels Portal. Get an overview of your business operations.
                </p>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-6">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 pr-6 border-r border-gray-700">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Shreeji Jewels</h1>
              <p className="text-sm text-gray-400">Business Management Portal</p>
            </div>

            <nav className="space-y-3">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start hover:bg-gray-700 ${
                    activeSection === item.id ? "bg-gray-700 text-white" : "text-gray-400"
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 pl-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {quickStats.map((stat) => (
                <Card key={stat.title} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{stat.title}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-sm text-gray-400">{stat.change}</p>
                      </div>
                      <stat.icon className="h-8 w-8" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Notifications */}
            {notifications.length > 0 && (
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white">Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {notifications.map((notification) => (
                      <li key={notification.id} className="p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-gray-400">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                          <Badge variant="secondary" className="uppercase">
                            {notification.type}
                          </Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Dynamic Content */}
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}
