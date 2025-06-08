"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, Plus, Search, CreditCard, Calendar, Trophy, Star, Download, Send, Edit, Trash2 } from "lucide-react"
import { LuckyDrawWheel } from "./lucky-draw-wheel"
import { EditHarvestPlanModal } from "./edit-modals"

interface HarvestPlan {
  id: string
  clientId: string
  clientName: string
  type: "gold" | "diamond"
  groupNo: number
  registrationNo: number
  monthlyAmount: number
  startDate: Date
  endDate: Date
  totalPaid: number
  remainingAmount: number
  status: "active" | "completed" | "redeemed" | "early-redeemed"
  isWinner?: boolean
  payments: Payment[]
}

interface Payment {
  month: string
  date?: Date
  amount: number
  method: "cash" | "rtgs" | "upi" | "cheque"
  status: "paid" | "pending"
}

interface CreatePlanModalProps {
  isOpen: boolean
  onClose: () => void
  onCreatePlan: (planData: any) => void
}

function CreatePlanModal({ isOpen, onClose, onCreatePlan }: CreatePlanModalProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    type: "diamond" as "gold" | "diamond",
    groupNo: 1,
    monthlyAmount: 25000,
    startMonth: new Date().getMonth() + 1,
    startYear: new Date().getFullYear(),
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreatePlan(formData)
    onClose()
    setFormData({
      clientName: "",
      type: "diamond",
      groupNo: 1,
      monthlyAmount: 25000,
      startMonth: new Date().getMonth() + 1,
      startYear: new Date().getFullYear(),
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-white">Create New Harvest Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Client Name</label>
              <Input
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Plan Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as "gold" | "diamond" })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="diamond">Diamond Plan</option>
                <option value="gold">Gold Plan</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Group Number</label>
              <Input
                type="number"
                min="1"
                max="20"
                value={formData.groupNo}
                onChange={(e) => setFormData({ ...formData, groupNo: Number.parseInt(e.target.value) })}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Monthly Amount (₹)</label>
              <Input
                type="number"
                min="1000"
                step="1000"
                value={formData.monthlyAmount}
                onChange={(e) => setFormData({ ...formData, monthlyAmount: Number.parseInt(e.target.value) })}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Start Month</label>
                <select
                  value={formData.startMonth}
                  onChange={(e) => setFormData({ ...formData, startMonth: Number.parseInt(e.target.value) })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2024, i, 1).toLocaleDateString("en-US", { month: "long" })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Start Year</label>
                <Input
                  type="number"
                  min="2024"
                  max="2030"
                  value={formData.startYear}
                  onChange={(e) => setFormData({ ...formData, startYear: Number.parseInt(e.target.value) })}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                Create Plan
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-gray-600">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function HarvestPlan() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreatePlan, setShowCreatePlan] = useState(false)
  const [luckyDrawWinner, setLuckyDrawWinner] = useState<number | null>(null)
  const [winnerClient, setWinnerClient] = useState<HarvestPlan | null>(null)
  const [showWinnerAnnouncement, setShowWinnerAnnouncement] = useState(false)
  const [showEditPlanModal, setShowEditPlanModal] = useState(false)
  const [editingPlan, setEditingPlan] = useState<HarvestPlan | null>(null)

  const harvestPlans: HarvestPlan[] = [
    {
      id: "HP001",
      clientId: "CL001",
      clientName: "Mrs. Priya Sharma",
      type: "diamond",
      groupNo: 10,
      registrationNo: 15,
      monthlyAmount: 25000,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      totalPaid: 250000,
      remainingAmount: 50000,
      status: "active",
      payments: [
        { month: "Jan 2024", date: new Date("2024-01-05"), amount: 25000, method: "rtgs", status: "paid" },
        { month: "Feb 2024", date: new Date("2024-02-05"), amount: 25000, method: "rtgs", status: "paid" },
        { month: "Mar 2024", date: new Date("2024-03-05"), amount: 25000, method: "rtgs", status: "paid" },
        { month: "Apr 2024", date: new Date("2024-04-05"), amount: 25000, method: "rtgs", status: "paid" },
        { month: "May 2024", date: new Date("2024-05-05"), amount: 25000, method: "rtgs", status: "paid" },
        { month: "Jun 2024", date: new Date("2024-06-05"), amount: 25000, method: "rtgs", status: "paid" },
        { month: "Jul 2024", date: new Date("2024-07-05"), amount: 25000, method: "rtgs", status: "paid" },
        { month: "Aug 2024", date: new Date("2024-08-05"), amount: 25000, method: "rtgs", status: "paid" },
        { month: "Sep 2024", date: new Date("2024-09-05"), amount: 25000, method: "rtgs", status: "paid" },
        { month: "Oct 2024", date: new Date("2024-10-05"), amount: 25000, method: "rtgs", status: "paid" },
        { month: "Nov 2024", amount: 25000, method: "rtgs", status: "pending" },
        { month: "Dec 2024", amount: 25000, method: "rtgs", status: "pending" },
      ],
    },
    {
      id: "HP002",
      clientId: "CL002",
      clientName: "Mr. Rajesh Patel",
      type: "gold",
      groupNo: 11,
      registrationNo: 8,
      monthlyAmount: 15000,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      totalPaid: 180000,
      remainingAmount: 0,
      status: "completed",
      payments: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        date: new Date(2024, i, 5),
        amount: 15000,
        method: "cash" as const,
        status: "paid" as const,
      })),
    },
    {
      id: "HP003",
      clientId: "CL003",
      clientName: "Mrs. Anita Gupta",
      type: "diamond",
      groupNo: 10,
      registrationNo: 42,
      monthlyAmount: 25000,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      totalPaid: 275000,
      remainingAmount: 25000,
      status: "active",
      payments: Array.from({ length: 11 }, (_, i) => ({
        month: new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        date: new Date(2024, i, 5),
        amount: 25000,
        method: "upi" as const,
        status: "paid" as const,
      })).concat([{ month: "Dec 2024", amount: 25000, method: "upi", status: "pending" }]),
    },
    {
      id: "HP004",
      clientId: "CL004",
      clientName: "Mr. Suresh Kumar",
      type: "diamond",
      groupNo: 10,
      registrationNo: 18,
      monthlyAmount: 25000,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      totalPaid: 250000,
      remainingAmount: 50000,
      status: "active",
      payments: Array.from({ length: 10 }, (_, i) => ({
        month: new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        date: new Date(2024, i, 5),
        amount: 25000,
        method: "cheque" as const,
        status: "paid" as const,
      })).concat([
        { month: "Nov 2024", amount: 25000, method: "cheque", status: "pending" },
        { month: "Dec 2024", amount: 25000, method: "cheque", status: "pending" },
      ]),
    },
    {
      id: "HP005",
      clientId: "CL005",
      clientName: "Ms. Kavita Sharma",
      type: "diamond",
      groupNo: 10,
      registrationNo: 7,
      monthlyAmount: 25000,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      totalPaid: 225000,
      remainingAmount: 75000,
      status: "active",
      payments: Array.from({ length: 9 }, (_, i) => ({
        month: new Date(2024, i, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        date: new Date(2024, i, 5),
        amount: 25000,
        method: "rtgs" as const,
        status: "paid" as const,
      })).concat([
        { month: "Oct 2024", amount: 25000, method: "rtgs", status: "pending" },
        { month: "Nov 2024", amount: 25000, method: "rtgs", status: "pending" },
        { month: "Dec 2024", amount: 25000, method: "rtgs", status: "pending" },
      ]),
    },
  ]

  const handleEditPlan = (plan: HarvestPlan) => {
    setEditingPlan(plan)
    setShowEditPlanModal(true)
  }

  const handleDeletePlan = (planId: string, clientName: string) => {
    if (
      confirm(`Delete harvest plan for ${clientName}? This action cannot be undone and will affect payment history.`)
    ) {
      // Delete plan logic
      alert(`Harvest plan for ${clientName} deleted successfully`)
    }
  }

  const handleCreatePlan = (planData: any) => {
    const newPlan: HarvestPlan = {
      id: `HP${String(harvestPlans.length + 1).padStart(3, "0")}`,
      clientId: `CL${String(harvestPlans.length + 1).padStart(3, "0")}`,
      clientName: planData.clientName,
      type: planData.type,
      groupNo: planData.groupNo,
      registrationNo: Math.floor(Math.random() * 75) + 1, // Random registration number 1-75
      monthlyAmount: planData.monthlyAmount,
      startDate: new Date(planData.startYear, planData.startMonth - 1, 1),
      endDate: new Date(planData.startYear + (planData.startMonth > 1 ? 1 : 0), (planData.startMonth + 10) % 12, 1),
      totalPaid: 0,
      remainingAmount: planData.monthlyAmount * 12,
      status: "active",
      payments: Array.from({ length: 12 }, (_, i) => {
        const monthDate = new Date(planData.startYear, (planData.startMonth - 1 + i) % 12, 1)
        return {
          month: monthDate.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
          amount: planData.monthlyAmount,
          method: "cash" as const,
          status: "pending" as const,
        }
      }),
    }

    // In a real app, you would save this to your database
    console.log("New plan created:", newPlan)
    alert(`New ${planData.type} harvest plan created for ${planData.clientName}`)
  }

  const planStats = {
    totalPlans: 156,
    activePlans: 134,
    completedPlans: 18,
    totalValue: 23500000,
    monthlyCollection: 2100000,
  }

  const filteredPlans = harvestPlans.filter(
    (plan) =>
      plan.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-900 text-green-300 border-green-700"
      case "completed":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "redeemed":
        return "bg-purple-900 text-purple-300 border-purple-700"
      case "early-redeemed":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      default:
        return "bg-gray-900 text-gray-300 border-gray-700"
    }
  }

  const generateDigitalCard = (plan: HarvestPlan) => {
    // Digital card generation logic
    alert(`Digital card generated for ${plan.clientName}`)
  }

  const downloadDigitalCard = (plan: HarvestPlan) => {
    // Create a digital card HTML content
    const cardHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${plan.type.toUpperCase()} HARVEST PLAN CARD</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f0f0f0; }
        .card { background: white; border-radius: 15px; padding: 30px; max-width: 800px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 3px solid ${plan.type === "gold" ? "#FFD700" : "#4169E1"}; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 28px; font-weight: bold; color: ${plan.type === "gold" ? "#FFD700" : "#4169E1"}; margin-bottom: 10px; }
        .plan-type { font-size: 24px; font-weight: bold; color: #333; }
        .client-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .info-item { padding: 10px; background: #f8f9fa; border-radius: 8px; }
        .info-label { font-weight: bold; color: #666; font-size: 14px; }
        .info-value { font-size: 16px; color: #333; margin-top: 5px; }
        .payments-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 20px; }
        .payment-month { padding: 15px; text-align: center; border: 2px solid #ddd; border-radius: 8px; }
        .payment-paid { background: #d4edda; border-color: #28a745; color: #155724; }
        .payment-pending { background: #f8d7da; border-color: #dc3545; color: #721c24; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="logo">SHREEJI JEWELS</div>
          <div class="plan-type">${plan.type.toUpperCase()} HARVEST PLAN CARD</div>
        </div>
        
        <div class="client-info">
          <div class="info-item">
            <div class="info-label">Client Name</div>
            <div class="info-value">${plan.clientName}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Plan ID</div>
            <div class="info-value">${plan.id}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Group Number</div>
            <div class="info-value">${plan.groupNo}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Registration Number</div>
            <div class="info-value">${plan.registrationNo}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Monthly Amount</div>
            <div class="info-value">₹${plan.monthlyAmount.toLocaleString()}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Total Paid</div>
            <div class="info-value">₹${plan.totalPaid.toLocaleString()}</div>
          </div>
        </div>
        
        <h3 style="color: #333; margin-bottom: 15px;">Payment Schedule (12 Months)</h3>
        <div class="payments-grid">
          ${plan.payments
            .map(
              (payment) => `
            <div class="payment-month ${payment.status === "paid" ? "payment-paid" : "payment-pending"}">
              <div style="font-weight: bold; margin-bottom: 5px;">${payment.month}</div>
              <div>₹${payment.amount.toLocaleString()}</div>
              <div style="font-size: 12px; margin-top: 5px;">${payment.status.toUpperCase()}</div>
            </div>
          `,
            )
            .join("")}
        </div>
        
        <div class="footer">
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <p>Shreeji Jewels - Your Trusted Jewelry Partner</p>
        </div>
      </div>
    </body>
    </html>
  `

    // Create and download the file
    const blob = new Blob([cardHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${plan.clientName.replace(/\s+/g, "_")}_${plan.type}_harvest_card.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    alert(`Digital card downloaded for ${plan.clientName}`)
  }

  // Get all diamond plan registration numbers for the lucky draw
  const diamondPlanRegistrationNumbers = harvestPlans
    .filter((plan) => plan.type === "diamond" && plan.status === "active")
    .map((plan) => plan.registrationNo)

  // Generate some additional random registration numbers to fill the wheel
  // This simulates having more participants than we're showing in our sample data
  const additionalNumbers = Array.from({ length: 20 }, () => Math.floor(Math.random() * 75) + 1).filter(
    (num) => !diamondPlanRegistrationNumbers.includes(num),
  )

  const allLuckyDrawParticipants = [...diamondPlanRegistrationNumbers, ...additionalNumbers].slice(0, 20)

  const handleWinnerSelected = (winnerNumber: number) => {
    setLuckyDrawWinner(winnerNumber)

    // Find the client with this registration number
    const winner = harvestPlans.find((plan) => plan.registrationNo === winnerNumber)
    setWinnerClient(winner || null)

    // Show winner announcement after a short delay
    setTimeout(() => {
      setShowWinnerAnnouncement(true)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Plan Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Plans</p>
                <p className="text-2xl font-bold text-white">{planStats.totalPlans}</p>
              </div>
              <Gift className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Plans</p>
                <p className="text-2xl font-bold text-green-500">{planStats.activePlans}</p>
              </div>
              <Star className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-blue-500">{planStats.completedPlans}</p>
              </div>
              <Trophy className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-purple-500">₹{(planStats.totalValue / 10000000).toFixed(1)}Cr</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Monthly Collection</p>
                <p className="text-2xl font-bold text-yellow-500">
                  ₹{(planStats.monthlyCollection / 100000).toFixed(1)}L
                </p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview">All Plans</TabsTrigger>
          <TabsTrigger value="gold">Gold Plans</TabsTrigger>
          <TabsTrigger value="diamond">Diamond Plans</TabsTrigger>
          <TabsTrigger value="group-management">Group Management</TabsTrigger>
          <TabsTrigger value="lucky-draw">Lucky Draw</TabsTrigger>
          <TabsTrigger value="redemption">Redemption</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Monthly Harvest Plans
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" onClick={() => setShowCreatePlan(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Plan
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search plans by client name or plan ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button variant="outline" className="border-gray-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Plans List */}
              <div className="space-y-4">
                {filteredPlans.map((plan) => (
                  <Card key={plan.id} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                              plan.type === "gold" ? "bg-yellow-900/30" : "bg-blue-900/30"
                            }`}
                          >
                            {plan.type === "gold" ? (
                              <Gift className="h-8 w-8 text-yellow-400" />
                            ) : (
                              <Star className="h-8 w-8 text-blue-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{plan.clientName}</h3>
                            <p className="text-sm text-gray-400">{plan.type.toUpperCase()} HARVEST PLAN</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline" className="text-xs">
                                ID: {plan.id}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Group: {plan.groupNo}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Reg: {plan.registrationNo}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                ₹{plan.monthlyAmount.toLocaleString()}/month
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">₹{plan.totalPaid.toLocaleString()}</p>
                          <p className="text-sm text-gray-400">Paid</p>
                          {plan.remainingAmount > 0 && (
                            <p className="text-sm text-red-400">₹{plan.remainingAmount.toLocaleString()} pending</p>
                          )}
                          <Badge variant="outline" className={`mt-2 ${getStatusColor(plan.status)}`}>
                            {plan.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600 flex-1"
                              onClick={() => generateDigitalCard(plan)}
                              title="View Digital Card"
                            >
                              <CreditCard className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600 flex-1"
                              onClick={() => downloadDigitalCard(plan)}
                              title="Download Digital Card"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-600 text-blue-400 hover:bg-blue-600 flex-1"
                              onClick={() => handleEditPlan(plan)}
                              title="Edit Plan"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600 flex-1"
                              onClick={() => handleDeletePlan(plan.id, plan.clientName)}
                              title="Delete Plan"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {plan.status === "completed" && (
                            <Button variant="outline" size="sm" className="border-green-600 text-green-400">
                              Redeem
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Payment Progress */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Payment Progress</span>
                          <span className="text-sm text-gray-400">
                            {plan.payments.filter((p) => p.status === "paid").length}/12 months
                          </span>
                        </div>
                        <div className="grid grid-cols-12 gap-1">
                          {plan.payments.map((payment, index) => (
                            <div
                              key={index}
                              className={`h-2 rounded-sm ${payment.status === "paid" ? "bg-green-500" : "bg-gray-600"}`}
                              title={`${payment.month}: ${payment.status}`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gold" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Gold Harvest Plans
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" onClick={() => setShowCreatePlan(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Plan
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search gold plans by client name or plan ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button variant="outline" className="border-gray-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Gold Plans List */}
              <div className="space-y-4">
                {filteredPlans
                  .filter((plan) => plan.type === "gold")
                  .map((plan) => (
                    <Card key={plan.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-yellow-900/30">
                              <Gift className="h-8 w-8 text-yellow-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{plan.clientName}</h3>
                              <p className="text-sm text-gray-400">GOLD HARVEST PLAN</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  ID: {plan.id}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Group: {plan.groupNo}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Reg: {plan.registrationNo}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  ₹{plan.monthlyAmount.toLocaleString()}/month
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">₹{plan.totalPaid.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">Paid</p>
                            {plan.remainingAmount > 0 && (
                              <p className="text-sm text-red-400">₹{plan.remainingAmount.toLocaleString()} pending</p>
                            )}
                            <Badge variant="outline" className={`mt-2 ${getStatusColor(plan.status)}`}>
                              {plan.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 flex-1"
                                onClick={() => generateDigitalCard(plan)}
                                title="View Digital Card"
                              >
                                <CreditCard className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 flex-1"
                                onClick={() => downloadDigitalCard(plan)}
                                title="Download Digital Card"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-600 text-blue-400 hover:bg-blue-600 flex-1"
                                onClick={() => handleEditPlan(plan)}
                                title="Edit Plan"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-600 text-red-400 hover:bg-red-600 flex-1"
                                onClick={() => handleDeletePlan(plan.id, plan.clientName)}
                                title="Delete Plan"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button variant="outline" size="sm" className="border-gray-600">
                              <Send className="h-4 w-4" />
                            </Button>
                            {plan.status === "completed" && (
                              <Button variant="outline" size="sm" className="border-green-600 text-green-400">
                                Redeem
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Payment Progress */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Payment Progress</span>
                            <span className="text-sm text-gray-400">
                              {plan.payments.filter((p) => p.status === "paid").length}/12 months
                            </span>
                          </div>
                          <div className="grid grid-cols-12 gap-1">
                            {plan.payments.map((payment, index) => (
                              <div
                                key={index}
                                className={`h-2 rounded-sm ${payment.status === "paid" ? "bg-yellow-500" : "bg-gray-600"}`}
                                title={`${payment.month}: ${payment.status}`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {filteredPlans.filter((plan) => plan.type === "gold").length === 0 && (
                  <div className="text-center py-8">
                    <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No gold harvest plans found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diamond" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Diamond Harvest Plans
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" onClick={() => setShowCreatePlan(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Plan
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search diamond plans by client name or plan ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Button variant="outline" className="border-gray-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Diamond Plans List */}
              <div className="space-y-4">
                {filteredPlans
                  .filter((plan) => plan.type === "diamond")
                  .map((plan) => (
                    <Card key={plan.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-blue-900/30">
                              <Star className="h-8 w-8 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{plan.clientName}</h3>
                              <p className="text-sm text-gray-400">DIAMOND HARVEST PLAN</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  ID: {plan.id}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Group: {plan.groupNo}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Reg: {plan.registrationNo}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  ₹{plan.monthlyAmount.toLocaleString()}/month
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">₹{plan.totalPaid.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">Paid</p>
                            {plan.remainingAmount > 0 && (
                              <p className="text-sm text-red-400">₹{plan.remainingAmount.toLocaleString()} pending</p>
                            )}
                            <Badge variant="outline" className={`mt-2 ${getStatusColor(plan.status)}`}>
                              {plan.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 flex-1"
                                onClick={() => generateDigitalCard(plan)}
                                title="View Digital Card"
                              >
                                <CreditCard className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 flex-1"
                                onClick={() => downloadDigitalCard(plan)}
                                title="Download Digital Card"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-600 text-blue-400 hover:bg-blue-600 flex-1"
                                onClick={() => handleEditPlan(plan)}
                                title="Edit Plan"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-600 text-red-400 hover:bg-red-600 flex-1"
                                onClick={() => handleDeletePlan(plan.id, plan.clientName)}
                                title="Delete Plan"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button variant="outline" size="sm" className="border-gray-600">
                              <Send className="h-4 w-4" />
                            </Button>
                            {plan.status === "completed" && (
                              <Button variant="outline" size="sm" className="border-green-600 text-green-400">
                                Redeem
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Payment Progress */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Payment Progress</span>
                            <span className="text-sm text-gray-400">
                              {plan.payments.filter((p) => p.status === "paid").length}/12 months
                            </span>
                          </div>
                          <div className="grid grid-cols-12 gap-1">
                            {plan.payments.map((payment, index) => (
                              <div
                                key={index}
                                className={`h-2 rounded-sm ${payment.status === "paid" ? "bg-blue-500" : "bg-gray-600"}`}
                                title={`${payment.month}: ${payment.status}`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {filteredPlans.filter((plan) => plan.type === "diamond").length === 0 && (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No diamond harvest plans found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="group-management" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Diamond Plan Groups
                <Button
                  size="sm"
                  onClick={() => {
                    // Create new group logic
                    const newGroupNo = Math.max(...harvestPlans.map((p) => p.groupNo)) + 1
                    alert(`Creating new Group ${newGroupNo}. This group will be ready to accept members.`)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Group
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Group 10 */}
                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center justify-between">
                      Group 10
                      <Badge className="bg-blue-600">Active</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Members:</span>
                        <span className="text-white font-bold">4/75</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Collection:</span>
                        <span className="text-white font-bold">₹1,00,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Draw:</span>
                        <span className="text-white font-bold">Dec 31, 2024</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Active Members:</p>
                        <div className="flex flex-wrap gap-1">
                          {harvestPlans
                            .filter((plan) => plan.type === "diamond" && plan.groupNo === 10)
                            .map((plan) => (
                              <Badge key={plan.id} variant="outline" className="text-xs">
                                #{plan.registrationNo}
                              </Badge>
                            ))}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => {
                          setActiveTab("lucky-draw")
                          // Set selected group for lucky draw
                        }}
                      >
                        <Trophy className="h-4 w-4 mr-2" />
                        Conduct Lucky Draw
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Group 11 */}
                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center justify-between">
                      Group 11
                      <Badge className="bg-green-600">Completed</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Members:</span>
                        <span className="text-white font-bold">75/75</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Collection:</span>
                        <span className="text-white font-bold">₹18,75,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Draw:</span>
                        <span className="text-white font-bold">Nov 30, 2024</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Winner:</p>
                        <Badge className="bg-yellow-600">Mrs. Anita Gupta (#42)</Badge>
                      </div>
                      <Button variant="outline" className="w-full border-gray-600" disabled>
                        Draw Completed
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Group 12 */}
                <Card className="bg-gray-700 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center justify-between">
                      Group 12
                      <Badge className="bg-yellow-600">Filling</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Members:</span>
                        <span className="text-white font-bold">23/75</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Monthly Collection:</span>
                        <span className="text-white font-bold">₹5,75,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expected Start:</span>
                        <span className="text-white font-bold">Jan 2025</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "30.7%" }}></div>
                      </div>
                      <Button variant="outline" className="w-full border-gray-600" disabled>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Members (52 slots left)
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* New Group Creation Card */}
                <Card className="bg-gray-700 border-gray-600 border-dashed">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center justify-between">
                      Create New Group
                      <Badge className="bg-gray-600">Ready</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-400 mb-4">Start a new Diamond Harvest Plan group</p>
                        <Button
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            const newGroupNo = Math.max(...harvestPlans.map((p) => p.groupNo)) + 1
                            alert(`Creating Group ${newGroupNo}. Members can now join this group.`)
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create Group {Math.max(...harvestPlans.map((p) => p.groupNo)) + 1}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lucky-draw" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Diamond Plan Lucky Draw</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Group Selection */}
                <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700 rounded-lg">
                  <h3 className="font-semibold text-purple-400 mb-3">Select Group for Lucky Draw</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Button
                      variant="outline"
                      className="border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white"
                      onClick={() => {
                        // Set group 10 for lucky draw
                        const group10Numbers = harvestPlans
                          .filter((plan) => plan.type === "diamond" && plan.groupNo === 10)
                          .map((plan) => plan.registrationNo)
                        // Add random numbers to fill up to 75
                        const additionalNumbers = Array.from({ length: 71 }, () => Math.floor(Math.random() * 75) + 1)
                          .filter((num) => !group10Numbers.includes(num))
                          .slice(0, 71)
                        // Update wheel participants
                      }}
                    >
                      Group 10 (4 members)
                    </Button>
                    <Button variant="outline" className="border-green-600 text-green-300" disabled>
                      Group 11 (Completed)
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-400" disabled>
                      Group 12 (Not Ready)
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Selected Group</p>
                      <p className="text-2xl font-bold text-white">Group 10</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Draw Date</p>
                      <p className="text-lg font-bold text-white">Dec 31, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Prize</p>
                      <p className="text-lg font-bold text-white">Free Plan</p>
                    </div>
                  </div>
                </div>

                {/* Lucky Draw Wheel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <LuckyDrawWheel participants={allLuckyDrawParticipants} onWinnerSelected={handleWinnerSelected} />
                  </div>

                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Previous Winners</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { month: "November 2024", winner: "Mrs. Anita Gupta", number: 42, group: 11 },
                          { month: "October 2024", winner: "Mr. Suresh Kumar", number: 18, group: 9 },
                          { month: "September 2024", winner: "Ms. Kavita Sharma", number: 7, group: 8 },
                        ].map((winner, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                            <div>
                              <p className="font-medium text-white">{winner.winner}</p>
                              <p className="text-sm text-gray-400">
                                {winner.month} - Group {winner.group}
                              </p>
                            </div>
                            <Badge className="bg-yellow-600">#{winner.number}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Winner Announcement */}
                {showWinnerAnnouncement && winnerClient && (
                  <div className="p-6 bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-700 rounded-lg animate-pulse">
                    <div className="flex flex-col items-center text-center">
                      <Trophy className="h-16 w-16 text-yellow-400 mb-4" />
                      <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
                      <p className="text-xl text-yellow-300 mb-4">{winnerClient.clientName}</p>
                      <p className="text-lg text-white mb-2">
                        Registration #{winnerClient.registrationNo} - Group {winnerClient.groupNo}
                      </p>
                      <p className="text-gray-300 mt-4">
                        The winner will receive all remaining installments paid for their Diamond Harvest Plan!
                      </p>
                      <Button
                        className="mt-6 bg-yellow-600 hover:bg-yellow-700"
                        onClick={() => setShowWinnerAnnouncement(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}

                {/* Winner Announcement (when no matching client) */}
                {showWinnerAnnouncement && luckyDrawWinner && !winnerClient && (
                  <div className="p-6 bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border border-yellow-700 rounded-lg animate-pulse">
                    <div className="flex flex-col items-center text-center">
                      <Trophy className="h-16 w-16 text-yellow-400 mb-4" />
                      <h2 className="text-2xl font-bold text-white mb-2">Lucky Number Selected!</h2>
                      <p className="text-xl text-yellow-300 mb-4">Registration #{luckyDrawWinner}</p>
                      <p className="text-gray-300 mt-4">
                        No active client found with this registration number in the current view.
                      </p>
                      <Button
                        className="mt-6 bg-yellow-600 hover:bg-yellow-700"
                        onClick={() => setShowWinnerAnnouncement(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Create Plan Modal */}
      <CreatePlanModal
        isOpen={showCreatePlan}
        onClose={() => setShowCreatePlan(false)}
        onCreatePlan={handleCreatePlan}
      />
      {/* Edit Plan Modal */}
      {showEditPlanModal && editingPlan && (
        <EditHarvestPlanModal
          isOpen={showEditPlanModal}
          plan={editingPlan}
          onClose={() => {
            setShowEditPlanModal(false)
            setEditingPlan(null)
          }}
          onSave={(planData) => {
            // Update plan in the list
            console.log("Updated plan data:", planData)
            alert(`Harvest plan for ${planData.clientName} updated successfully!`)
            setShowEditPlanModal(false)
            setEditingPlan(null)
          }}
        />
      )}
    </div>
  )
}
