"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  Calendar,
  Gift,
  CreditCard,
  MessageSquare,
  Heart,
  Star,
  TrendingUp,
  DollarSign,
  Edit,
  Trash2,
} from "lucide-react"
import { EditClientModal } from "./edit-modals"

interface Client {
  id: string
  name: string
  phone: string
  email: string
  address: string
  panNo: string
  birthday: Date
  anniversary?: Date
  ringSize?: string
  bangleSize?: string
  braceletSize?: string
  totalPurchases: number
  lifetimePurchases: number
  currentBalance: number
  lastPurchase: Date
  preferredCategory: string
  vipStatus: "regular" | "premium" | "vip"
}

interface Reminder {
  id: string
  client: string
  description: string
  type: "follow-up" | "payment-due" | "greeting"
  dueDate: Date
  status: "pending" | "completed" | "overdue"
}

export default function ClientManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddClient, setShowAddClient] = useState(false)
  const [showEditClientModal, setShowEditClientModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const clients: Client[] = [
    {
      id: "CL001",
      name: "Mrs. Priya Sharma",
      phone: "+91 98765 43210",
      email: "priya.sharma@email.com",
      address: "Sector 15, Gurgaon",
      panNo: "ABCDE1234F",
      birthday: new Date("1985-03-15"),
      anniversary: new Date("2010-12-05"),
      ringSize: "16",
      bangleSize: "2.6",
      braceletSize: "M",
      totalPurchases: 1250000,
      lifetimePurchases: 3500000,
      currentBalance: -25000,
      lastPurchase: new Date("2024-11-20"),
      preferredCategory: "Diamond Jewelry",
      vipStatus: "vip",
    },
    {
      id: "CL002",
      name: "Mr. Rajesh Patel",
      phone: "+91 87654 32109",
      email: "rajesh.patel@email.com",
      address: "Vastrapur, Ahmedabad",
      panNo: "FGHIJ5678K",
      birthday: new Date("1978-08-22"),
      anniversary: new Date("2005-02-14"),
      totalPurchases: 850000,
      lifetimePurchases: 2100000,
      currentBalance: 15000,
      lastPurchase: new Date("2024-10-15"),
      preferredCategory: "Gold Jewelry",
      vipStatus: "premium",
    },
    {
      id: "CL003",
      name: "Ms. Anita Gupta",
      phone: "+91 76543 21098",
      email: "anita.gupta@email.com",
      address: "CP, New Delhi",
      panNo: "KLMNO9012P",
      birthday: new Date("1992-06-10"),
      totalPurchases: 320000,
      lifetimePurchases: 450000,
      currentBalance: 0,
      lastPurchase: new Date("2024-09-30"),
      preferredCategory: "Silver Jewelry",
      vipStatus: "regular",
    },
  ]

  const upcomingEvents = [
    { client: "Mrs. Priya Sharma", event: "Anniversary", date: new Date("2024-12-05"), type: "anniversary" },
    { client: "Mr. Rajesh Patel", event: "Birthday", date: new Date("2024-12-22"), type: "birthday" },
    { client: "Ms. Anita Gupta", event: "Birthday", date: new Date("2024-12-10"), type: "birthday" },
  ]

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "R001",
      client: "Mrs. Priya Sharma",
      description: "Follow up on diamond necklace inquiry",
      type: "follow-up",
      dueDate: new Date("2025-01-10"),
      status: "pending",
    },
    {
      id: "R002",
      client: "Mr. Rajesh Patel",
      description: "Pending payment for gold bracelet",
      type: "payment-due",
      dueDate: new Date("2024-12-31"),
      status: "overdue",
    },
    {
      id: "R003",
      client: "Ms. Anita Gupta",
      description: "Send anniversary greeting",
      type: "greeting",
      dueDate: new Date("2025-02-14"),
      status: "completed",
    },
  ])

  const clientAnalytics = {
    newClientsThisQuarter: 15,
    topPreferredCategory: "Diamond Jewelry",
    averagePurchaseValue: 75000,
    clientRetentionRate: "85%",
    mostActiveClient: "Mrs. Priya Sharma",
  }

  const clientStats = {
    totalClients: 269,
    newThisMonth: 23,
    vipClients: 24,
    premiumClients: 89,
    upcomingEvents: 8,
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getVipStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      case "premium":
        return "bg-purple-900 text-purple-300 border-purple-700"
      case "regular":
        return "bg-gray-900 text-gray-300 border-gray-700"
      default:
        return "bg-gray-900 text-gray-300 border-gray-700"
    }
  }

  const getVipStatusIcon = (status: string) => {
    switch (status) {
      case "vip":
        return <Star className="h-4 w-4" />
      case "premium":
        return <Gift className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const handleMarkAsDone = (id: string) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) => (reminder.id === id ? { ...reminder, status: "completed" } : reminder)),
    )
    console.log(`Reminder ${id} marked as done.`)
  }

  const handleContactClient = (clientName: string, clientPhone: string) => {
    console.log(`Attempting to contact ${clientName} at ${clientPhone}`)
    alert(`Simulating call/message to ${clientName} at ${clientPhone}`)
  }

  const handleEditClient = (client: Client) => {
    // Set client data for editing
    setEditingClient(client)
    setShowEditClientModal(true)
  }

  const handleDeleteClient = (clientId: string, clientName: string) => {
    if (
      confirm(`Delete client ${clientName}? This will also delete all their transaction history and cannot be undone.`)
    ) {
      // Delete client logic
      alert(`Client ${clientName} deleted successfully`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Clients</p>
                <p className="text-2xl font-bold text-white">{clientStats.totalClients}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">New This Month</p>
                <p className="text-2xl font-bold text-green-500">{clientStats.newThisMonth}</p>
              </div>
              <Plus className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">VIP Clients</p>
                <p className="text-2xl font-bold text-yellow-500">{clientStats.vipClients}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Premium Clients</p>
                <p className="text-2xl font-bold text-purple-500">{clientStats.premiumClients}</p>
              </div>
              <Gift className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Upcoming Events</p>
                <p className="text-2xl font-bold text-red-500">{clientStats.upcomingEvents}</p>
              </div>
              <Calendar className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview">Client Directory</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="analytics">Client Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Client Directory
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-600">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Greetings
                  </Button>
                  <Button size="sm" onClick={() => setShowAddClient(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search clients by name, phone, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button variant="outline" className="border-gray-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Client List */}
              <div className="space-y-4">
                {filteredClients.map((client) => (
                  <Card key={client.id} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                            <Users className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white">{client.name}</h3>
                              <Badge variant="outline" className={getVipStatusColor(client.vipStatus)}>
                                {getVipStatusIcon(client.vipStatus)}
                                <span className="ml-1 capitalize">{client.vipStatus}</span>
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {client.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {client.email}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline" className="text-xs">
                                ID: {client.id}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Preferred: {client.preferredCategory}
                              </Badge>
                              {client.ringSize && (
                                <Badge variant="outline" className="text-xs">
                                  Ring: {client.ringSize}
                                </Badge>
                              )}
                              {client.bangleSize && (
                                <Badge variant="outline" className="text-xs">
                                  Bangle: {client.bangleSize}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">
                            ₹{(client.totalPurchases / 100000).toFixed(1)}L
                          </p>
                          <p className="text-sm text-gray-400">This Year</p>
                          <p className="text-sm text-gray-400">
                            Lifetime: ₹{(client.lifetimePurchases / 100000).toFixed(1)}L
                          </p>
                          {client.currentBalance !== 0 && (
                            <p
                              className={`text-sm font-medium ${client.currentBalance > 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              Balance: ₹{Math.abs(client.currentBalance).toLocaleString()}
                              {client.currentBalance > 0 ? " (Credit)" : " (Due)"}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" className="border-gray-600">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-600">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-400 hover:bg-blue-600"
                            onClick={() => handleEditClient(client)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-400 hover:bg-red-600"
                            onClick={() => handleDeleteClient(client.id, client.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              event.type === "birthday" ? "bg-blue-900/30" : "bg-pink-900/30"
                            }`}
                          >
                            {event.type === "birthday" ? (
                              <Gift className="h-6 w-6 text-blue-400" />
                            ) : (
                              <Heart className="h-6 w-6 text-pink-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{event.client}</h3>
                            <p className="text-sm text-gray-400">{event.event}</p>
                            <p className="text-sm text-gray-400">{event.date.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-gray-600">
                            Send Greeting
                          </Button>
                          <Button variant="outline" size="sm" className="border-gray-600">
                            Call Client
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Client Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.length > 0 ? (
                  reminders.map((reminder) => (
                    <Card key={reminder.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                reminder.type === "follow-up"
                                  ? "bg-blue-900/30"
                                  : reminder.type === "payment-due"
                                    ? "bg-red-900/30"
                                    : "bg-green-900/30"
                              }`}
                            >
                              {reminder.type === "follow-up" && <MessageSquare className="h-6 w-6 text-blue-400" />}
                              {reminder.type === "payment-due" && <CreditCard className="h-6 w-6 text-red-400" />}
                              {reminder.type === "greeting" && <Gift className="h-6 w-6 text-green-400" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{reminder.client}</h3>
                              <p className="text-sm text-gray-400">{reminder.description}</p>
                              <p className="text-sm text-gray-400">Due: {reminder.dueDate.toLocaleDateString()}</p>
                              <Badge
                                variant="outline"
                                className={`mt-1 capitalize ${
                                  reminder.status === "pending"
                                    ? "bg-yellow-900 text-yellow-300 border-yellow-700"
                                    : reminder.status === "overdue"
                                      ? "bg-red-900 text-red-300 border-red-700"
                                      : "bg-green-900 text-green-300 border-green-700"
                                }`}
                              >
                                {reminder.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => handleMarkAsDone(reminder.id)}
                              disabled={reminder.status === "completed"}
                            >
                              Mark as Done
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => {
                                const client = clients.find((c) => c.name === reminder.client)
                                if (client) {
                                  handleContactClient(client.name, client.phone)
                                }
                              }}
                            >
                              Contact Client
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600"
                              onClick={() => {
                                if (confirm(`Delete this reminder? This action cannot be undone.`)) {
                                  setReminders(reminders.filter((r) => r.id !== reminder.id))
                                  alert("Reminder deleted successfully")
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">No reminders found.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Client Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-700 border-gray-600 p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">New Clients This Quarter</p>
                    <p className="text-xl font-bold text-white">{clientAnalytics.newClientsThisQuarter}</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-700 border-gray-600 p-4">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-pink-400" />
                  <div>
                    <p className="text-sm text-gray-400">Top Preferred Category</p>
                    <p className="text-xl font-bold text-white">{clientAnalytics.topPreferredCategory}</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-700 border-gray-600 p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Average Purchase Value</p>
                    <p className="text-xl font-bold text-white">
                      ₹{clientAnalytics.averagePurchaseValue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-700 border-gray-600 p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Client Retention Rate</p>
                    <p className="text-xl font-bold text-white">{clientAnalytics.clientRetentionRate}</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-gray-700 border-gray-600 p-4 md:col-span-2">
                <div className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-400">Most Active Client</p>
                    <p className="text-xl font-bold text-white">{clientAnalytics.mostActiveClient}</p>
                  </div>
                </div>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Add New Client
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddClient(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <Input placeholder="Enter client name" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                  <Input placeholder="+91 XXXXX XXXXX" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="client@email.com"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">PAN Number</label>
                  <Input placeholder="ABCDE1234F" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                  <Input placeholder="Enter complete address" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Birthday</label>
                  <Input type="date" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Anniversary</label>
                  <Input type="date" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ring Size</label>
                  <Input placeholder="e.g., 16" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bangle Size</label>
                  <Input placeholder="e.g., 2.6" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bracelet Size</label>
                  <Input placeholder="e.g., M" className="bg-gray-700 border-gray-600 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Category</label>
                  <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                    <option value="">Select category</option>
                    <option value="Diamond Jewelry">Diamond Jewelry</option>
                    <option value="Gold Jewelry">Gold Jewelry</option>
                    <option value="Silver Jewelry">Silver Jewelry</option>
                    <option value="Platinum Jewelry">Platinum Jewelry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Client Category *</label>
                  <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                    <option value="">Select client category</option>
                    <option value="regular">Regular</option>
                    <option value="gold">Gold</option>
                    <option value="diamond">Diamond</option>
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowAddClient(false)} className="border-gray-600">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Here you would typically save the client data
                    setShowAddClient(false)
                  }}
                >
                  Add Client
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Edit Client Modal */}
      {showEditClientModal && editingClient && (
        <EditClientModal
          isOpen={showEditClientModal}
          client={editingClient}
          onClose={() => {
            setShowEditClientModal(false)
            setEditingClient(null)
          }}
          onSave={(clientData) => {
            // Update client in the list
            console.log("Updated client data:", clientData)
            alert(`Client ${clientData.name} updated successfully!`)
            setShowEditClientModal(false)
            setEditingClient(null)
          }}
        />
      )}
    </div>
  )
}
