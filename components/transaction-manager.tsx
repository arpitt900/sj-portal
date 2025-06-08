"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  Plus,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  User,
  Building,
  Banknote,
  Gem,
  Edit,
  Trash2,
} from "lucide-react"
import { EditTransactionModal } from "./edit-modals"

interface Transaction {
  id: string
  type: "receipt" | "payment"
  category: "vendor" | "client" | "karigar" | "expense" | "asset"
  amount: number
  description: string
  party: string
  method: "cash" | "rtgs" | "cheque" | "upi"
  date: Date
  status: "completed" | "pending" | "failed"
  reference?: string
}

export default function TransactionManager() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [showTransactionTypeModal, setShowTransactionTypeModal] = useState(false)
  const [transactionType, setTransactionType] = useState<"receipt" | "payment" | "cash" | "gold" | "banking" | null>(
    null,
  )

  const [selectedParty, setSelectedParty] = useState("")
  const [selectedPartyType, setSelectedPartyType] = useState("")

  const [showBankAccountModal, setShowBankAccountModal] = useState(false)
  const [bankAccounts, setBankAccounts] = useState([
    { id: "BA001", name: "HDFC Current Account", accountNumber: "****1234", balance: 5500000 },
    { id: "BA002", name: "SBI Savings Account", accountNumber: "****5678", balance: 3250000 },
  ])
  const [selectedBankAccount, setSelectedBankAccount] = useState("")

  const [showEditTransactionModal, setShowEditTransactionModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  // Sample data for registered parties - in real app this would come from database
  const registeredParties = {
    clients: [
      { id: "CL001", name: "Mrs. Priya Sharma", phone: "+91 98765 43210" },
      { id: "CL002", name: "Mr. Rajesh Patel", phone: "+91 87654 32109" },
      { id: "CL003", name: "Ms. Anita Gupta", phone: "+91 76543 21098" },
    ],
    vendors: [
      { id: "VN001", name: "Rajesh Gold Suppliers", contact: "Rajesh Kumar" },
      { id: "VN002", name: "Diamond House Mumbai", contact: "Suresh Shah" },
      { id: "VN003", name: "Silver Craft Industries", contact: "Amit Jain" },
    ],
    karigars: [
      { id: "KAR001", name: "Suresh Kumar", phone: "+91 98765 43210" },
      { id: "KAR002", name: "Ramesh Patel", phone: "+91 87654 32109" },
      { id: "KAR003", name: "Mahesh Sharma", phone: "+91 76543 21098" },
    ],
  }

  const transactions: Transaction[] = [
    {
      id: "TXN001",
      type: "receipt",
      category: "client",
      amount: 245000,
      description: "Diamond necklace set payment",
      party: "Mrs. Sharma",
      method: "rtgs",
      date: new Date(),
      status: "completed",
      reference: "REF123456",
    },
    {
      id: "TXN002",
      type: "payment",
      category: "vendor",
      amount: 185000,
      description: "Gold purchase from vendor",
      party: "Rajesh Gold Suppliers",
      method: "rtgs",
      date: new Date(Date.now() - 3600000),
      status: "completed",
      reference: "PAY789012",
    },
    {
      id: "TXN003",
      type: "payment",
      category: "karigar",
      amount: 25000,
      description: "Labour charges for diamond setting",
      party: "Suresh Karigar",
      method: "cash",
      date: new Date(Date.now() - 7200000),
      status: "completed",
    },
    {
      id: "TXN004",
      type: "payment",
      category: "expense",
      amount: 15000,
      description: "Shop rent for December",
      party: "Property Owner",
      method: "cheque",
      date: new Date(Date.now() - 10800000),
      status: "pending",
      reference: "CHQ001",
    },
  ]

  const todaysSummary = {
    totalReceipts: 345000,
    totalPayments: 225000,
    netCashFlow: 120000,
    transactionCount: 12,
  }

  const searchedTransactions = transactions.filter(
    (txn) =>
      txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTransactions = searchedTransactions.filter((txn) => {
    const matchesFilter = filterType === "all" || txn.type === filterType
    return matchesFilter
  })

  const receiptTransactions = searchedTransactions.filter((txn) => txn.type === "receipt")
  const paymentTransactions = searchedTransactions.filter((txn) => txn.type === "payment")
  const pendingTransactions = searchedTransactions.filter((txn) => txn.status === "pending")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-900 text-green-300 border-green-700"
      case "pending":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      case "failed":
        return "bg-red-900 text-red-300 border-red-700"
      default:
        return "bg-gray-900 text-gray-300 border-gray-700"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "client":
        return <User className="h-4 w-4" />
      case "vendor":
        return <Building className="h-4 w-4" />
      case "karigar":
        return <User className="h-4 w-4" />
      case "expense":
        return <Banknote className="h-4 w-4" />
      case "asset":
        return <Building className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setShowEditTransactionModal(true)
  }

  const handleDeleteTransaction = (transactionId: string, description: string) => {
    if (
      confirm(`Delete transaction "${description}"? This action cannot be undone and will affect financial records.`)
    ) {
      // Delete transaction logic
      alert(`Transaction "${description}" deleted successfully`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div
                className="cursor-pointer hover:bg-gray-750 transition-colors flex-1"
                onClick={() => setActiveTab("cash-details")}
              >
                <p className="text-sm font-medium text-gray-400">Cash Balance</p>
                <p className="text-2xl font-bold text-green-500">₹{(2450000 / 100000).toFixed(1)}L</p>
                <p className="text-xs text-gray-500 mt-1">Available in hand</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Banknote className="h-8 w-8 text-green-500" />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Generate and download cash report as properly formatted CSV
                    const csvRows = [
                      ["Cash Transaction Report"],
                      [`Generated on: ${new Date().toLocaleDateString()}`],
                      [""],
                      ["Summary"],
                      ["Current Balance", "₹24.5L"],
                      ["Total Received", "₹1.5L"],
                      ["Total Given", "₹0.6L"],
                      [""],
                      ["Transactions"],
                      ["Party", "Amount", "Description", "Type"],
                      ["Mrs. Priya Sharma", "+₹50,000", "Diamond necklace payment", "Received"],
                      ["Mr. Rajesh Patel", "+₹75,000", "Gold ring purchase", "Received"],
                      ["Walk-in Customer", "+₹25,000", "Silver jewelry sale", "Received"],
                      ["Suresh Karigar", "-₹25,000", "Labour charges", "Given"],
                      ["Shop Rent", "-₹30,000", "Monthly rent payment", "Given"],
                      ["Electricity Bill", "-₹5,000", "Monthly electricity", "Given"],
                    ]

                    const csvContent = csvRows.map((row) => row.join(",")).join("\n")
                    const BOM = "\uFEFF" // UTF-8 BOM for proper encoding
                    const dataBlob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
                    const url = URL.createObjectURL(dataBlob)
                    const link = document.createElement("a")
                    link.href = url
                    link.download = `cash-report-${new Date().toISOString().split("T")[0]}.csv`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    URL.revokeObjectURL(url)
                  }}
                  className="text-xs border-green-600 text-green-400 hover:bg-green-600"
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div
                className="cursor-pointer hover:bg-gray-750 transition-colors flex-1"
                onClick={() => setActiveTab("gold-details")}
              >
                <p className="text-sm font-medium text-gray-400">Gold Balance</p>
                <p className="text-2xl font-bold text-yellow-500">{(1250.5).toFixed(1)}g</p>
                <p className="text-xs text-gray-500 mt-1">Pure gold equivalent</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Gem className="h-8 w-8 text-yellow-500" />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Generate and download gold report as properly formatted CSV
                    const csvRows = [
                      ["Gold Transaction Report"],
                      [`Generated on: ${new Date().toLocaleDateString()}`],
                      [""],
                      ["Summary"],
                      ["Current Balance", "1250.5g"],
                      ["Total Received", "186.5g"],
                      ["Total Given", "133.0g"],
                      [""],
                      ["Transactions"],
                      ["Party", "Weight", "Description", "Type"],
                      ["Rajesh Gold Suppliers", "+125.5g", "24K Pure Gold Purchase", "Received"],
                      ["Customer Exchange", "+45.2g", "22K Gold Exchange", "Received"],
                      ["Melting Recovery", "+15.8g", "Old jewelry melting", "Received"],
                      ["Suresh Karigar", "-85.0g", "22K Gold for necklace making", "Given"],
                      ["Customer Sale", "-35.5g", "18K Gold ring sale", "Given"],
                      ["Refining Process", "-12.5g", "Gold sent for refining", "Given"],
                    ]

                    const csvContent = csvRows.map((row) => row.join(",")).join("\n")
                    const BOM = "\uFEFF" // UTF-8 BOM for proper encoding
                    const dataBlob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
                    const url = URL.createObjectURL(dataBlob)
                    const link = document.createElement("a")
                    link.href = url
                    link.download = `gold-report-${new Date().toISOString().split("T")[0]}.csv`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    URL.revokeObjectURL(url)
                  }}
                  className="text-xs border-yellow-600 text-yellow-400 hover:bg-yellow-600"
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div
                className="cursor-pointer hover:bg-gray-750 transition-colors flex-1"
                onClick={() => setActiveTab("bank-details")}
              >
                <p className="text-sm font-medium text-gray-400">Bank Balance</p>
                <p className="text-2xl font-bold text-blue-500">₹{(8750000 / 100000).toFixed(1)}L</p>
                <p className="text-xs text-gray-500 mt-1">All accounts combined</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Building className="h-8 w-8 text-blue-500" />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Generate and download bank report as properly formatted CSV
                    const csvRows = [
                      ["Bank Transaction Report"],
                      [`Generated on: ${new Date().toLocaleDateString()}`],
                      [""],
                      ["Summary"],
                      ["Total Balance", "₹87.5L"],
                      ["Total Received", "₹8.8L"],
                      ["Total Given", "₹5.55L"],
                      [""],
                      ["Bank Accounts"],
                      ["Account Name", "Balance", "Account Number"],
                      ["HDFC Current Account", "₹55L", "****1234"],
                      ["SBI Savings Account", "₹32.5L", "****5678"],
                      [""],
                      ["Transactions"],
                      ["Party", "Amount", "Description", "Type"],
                      ["Mrs. Sharma (HDFC)", "+₹245,000", "Diamond necklace payment via RTGS", "Received"],
                      ["Corporate Order (SBI)", "+₹550,000", "Bulk jewelry order payment", "Received"],
                      ["Online Sale (HDFC)", "+₹85,000", "E-commerce platform payment", "Received"],
                      ["Rajesh Gold Suppliers (SBI)", "-₹185,000", "Gold purchase payment via RTGS", "Given"],
                      ["Diamond House Mumbai (HDFC)", "-₹325,000", "Diamond purchase payment", "Given"],
                      ["Insurance Premium (SBI)", "-₹45,000", "Annual insurance payment", "Given"],
                    ]

                    const csvContent = csvRows.map((row) => row.join(",")).join("\n")
                    const BOM = "\uFEFF" // UTF-8 BOM for proper encoding
                    const dataBlob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
                    const url = URL.createObjectURL(dataBlob)
                    const link = document.createElement("a")
                    link.href = url
                    link.download = `bank-report-${new Date().toISOString().split("T")[0]}.csv`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    URL.revokeObjectURL(url)
                  }}
                  className="text-xs border-blue-600 text-blue-400 hover:bg-blue-600"
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview">All Transactions</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="cash-details">Cash Details</TabsTrigger>
          <TabsTrigger value="gold-details">Gold Details</TabsTrigger>
          <TabsTrigger value="bank-details">Bank Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Transaction History
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <div className="relative">
                    <Button
                      size="sm"
                      onClick={() => setShowTransactionTypeModal(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Transaction
                    </Button>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="receipt">Receipts</SelectItem>
                    <SelectItem value="payment">Payments</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-gray-600">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {/* Transactions List */}
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <Card key={transaction.id} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              transaction.type === "receipt" ? "bg-green-900/30" : "bg-red-900/30"
                            }`}
                          >
                            {transaction.type === "receipt" ? (
                              <ArrowDownLeft className="h-6 w-6 text-green-400" />
                            ) : (
                              <ArrowUpRight className="h-6 w-6 text-red-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{transaction.description}</h3>
                            <p className="text-sm text-gray-400">{transaction.party}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {transaction.id}
                              </Badge>
                              <div className="flex items-center gap-1">
                                {getCategoryIcon(transaction.category)}
                                <span className="text-xs text-gray-400 capitalize">{transaction.category}</span>
                              </div>
                              <Badge variant="outline" className="text-xs capitalize">
                                {transaction.method}
                              </Badge>
                              {transaction.reference && (
                                <Badge variant="outline" className="text-xs">
                                  {transaction.reference}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-lg font-bold ${
                              transaction.type === "receipt" ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {transaction.type === "receipt" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-400">
                            {transaction.date.toLocaleDateString()} {transaction.date.toLocaleTimeString()}
                          </p>
                          <Badge variant="outline" className={`mt-2 ${getStatusColor(transaction.status)}`}>
                            {transaction.status.toUpperCase()}
                          </Badge>
                          <div className="flex gap-1 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-600 text-blue-400 hover:bg-blue-600"
                              onClick={() => handleEditTransaction(transaction)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600"
                              onClick={() => handleDeleteTransaction(transaction.id, transaction.description)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Receipt Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {receiptTransactions.length > 0 ? (
                <div className="space-y-4">
                  {receiptTransactions.map((transaction) => (
                    <Card key={transaction.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-900/30">
                              <ArrowDownLeft className="h-6 w-6 text-green-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{transaction.description}</h3>
                              <p className="text-sm text-gray-400">{transaction.party}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {transaction.id}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  {getCategoryIcon(transaction.category)}
                                  <span className="text-xs text-gray-400 capitalize">{transaction.category}</span>
                                </div>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {transaction.method}
                                </Badge>
                                {transaction.reference && (
                                  <Badge variant="outline" className="text-xs">
                                    {transaction.reference}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-500">+₹{transaction.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">
                              {transaction.date.toLocaleDateString()} {transaction.date.toLocaleTimeString()}
                            </p>
                            <Badge variant="outline" className={`mt-2 ${getStatusColor(transaction.status)}`}>
                              {transaction.status.toUpperCase()}
                            </Badge>
                            <div className="flex gap-1 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-600 text-blue-400 hover:bg-blue-600"
                                onClick={() => handleEditTransaction(transaction)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-600 text-red-400 hover:bg-red-600"
                                onClick={() => handleDeleteTransaction(transaction.id, transaction.description)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">No receipt transactions found.</p>
                  {searchTerm && <p className="text-sm text-gray-500 mt-2">Try adjusting your search term.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Payment Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {paymentTransactions.length > 0 ? (
                <div className="space-y-4">
                  {paymentTransactions.map((transaction) => (
                    <Card key={transaction.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-red-900/30">
                              <ArrowUpRight className="h-6 w-6 text-red-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{transaction.description}</h3>
                              <p className="text-sm text-gray-400">{transaction.party}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {transaction.id}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  {getCategoryIcon(transaction.category)}
                                  <span className="text-xs text-gray-400 capitalize">{transaction.category}</span>
                                </div>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {transaction.method}
                                </Badge>
                                {transaction.reference && (
                                  <Badge variant="outline" className="text-xs">
                                    {transaction.reference}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-red-500">-₹{transaction.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">
                              {transaction.date.toLocaleDateString()} {transaction.date.toLocaleTimeString()}
                            </p>
                            <Badge variant="outline" className={`mt-2 ${getStatusColor(transaction.status)}`}>
                              {transaction.status.toUpperCase()}
                            </Badge>
                            <div className="flex gap-1 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-600 text-blue-400 hover:bg-blue-600"
                                onClick={() => handleEditTransaction(transaction)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-600 text-red-400 hover:bg-red-600"
                                onClick={() => handleDeleteTransaction(transaction.id, transaction.description)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">No payment transactions found.</p>
                  {searchTerm && <p className="text-sm text-gray-500 mt-2">Try adjusting your search term.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Pending Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingTransactions.length > 0 ? (
                <div className="space-y-4">
                  {pendingTransactions.map((transaction) => (
                    <Card key={transaction.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                transaction.type === "receipt" ? "bg-green-900/30" : "bg-red-900/30"
                              }`}
                            >
                              {transaction.type === "receipt" ? (
                                <ArrowDownLeft className="h-6 w-6 text-green-400" />
                              ) : (
                                <ArrowUpRight className="h-6 w-6 text-red-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{transaction.description}</h3>
                              <p className="text-sm text-gray-400">{transaction.party}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {transaction.id}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  {getCategoryIcon(transaction.category)}
                                  <span className="text-xs text-gray-400 capitalize">{transaction.category}</span>
                                </div>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {transaction.method}
                                </Badge>
                                {transaction.reference && (
                                  <Badge variant="outline" className="text-xs">
                                    {transaction.reference}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-lg font-bold ${
                                transaction.type === "receipt" ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {transaction.type === "receipt" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-400">
                              {transaction.date.toLocaleDateString()} {transaction.date.toLocaleTimeString()}
                            </p>
                            <Badge variant="outline" className={`mt-2 ${getStatusColor(transaction.status)}`}>
                              {transaction.status.toUpperCase()}
                            </Badge>
                            <div className="flex gap-1 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-600 text-blue-400 hover:bg-blue-600"
                                onClick={() => handleEditTransaction(transaction)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-600 text-red-400 hover:bg-red-600"
                                onClick={() => handleDeleteTransaction(transaction.id, transaction.description)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">No pending transactions found.</p>
                  {searchTerm && <p className="text-sm text-gray-500 mt-2">Try adjusting your search term.</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-details">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Cash Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payment Received */}
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Payment Received</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Mrs. Priya Sharma</span>
                        <span className="text-green-400">+₹50,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Diamond necklace payment</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Mr. Rajesh Patel</span>
                        <span className="text-green-400">+₹75,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Gold ring purchase</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Walk-in Customer</span>
                        <span className="text-green-400">+₹25,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Silver jewelry sale</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-900/20 rounded-lg">
                    <p className="text-green-400 font-semibold">Total Received: ₹1,50,000</p>
                  </div>
                </div>

                {/* Payment Given */}
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Payment Given</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Suresh Karigar</span>
                        <span className="text-red-400">-₹25,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Labour charges</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Shop Rent</span>
                        <span className="text-red-400">-₹30,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Monthly rent payment</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Electricity Bill</span>
                        <span className="text-red-400">-₹5,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Monthly electricity</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-red-900/20 rounded-lg">
                    <p className="text-red-400 font-semibold">Total Given: ₹60,000</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gold-details">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Gold Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gold Received */}
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-4">Gold Received</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Rajesh Gold Suppliers</span>
                        <span className="text-yellow-400">+125.5g</span>
                      </div>
                      <p className="text-xs text-gray-400">24K Pure Gold Purchase</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Customer Exchange</span>
                        <span className="text-yellow-400">+45.2g</span>
                      </div>
                      <p className="text-xs text-gray-400">22K Gold Exchange</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Melting Recovery</span>
                        <span className="text-yellow-400">+15.8g</span>
                      </div>
                      <p className="text-xs text-gray-400">Old jewelry melting</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg">
                    <p className="text-yellow-400 font-semibold">Total Received: 186.5g</p>
                  </div>
                </div>

                {/* Gold Given */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-4">Gold Given</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Suresh Karigar</span>
                        <span className="text-orange-400">-85.0g</span>
                      </div>
                      <p className="text-xs text-gray-400">22K Gold for necklace making</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Customer Sale</span>
                        <span className="text-orange-400">-35.5g</span>
                      </div>
                      <p className="text-xs text-gray-400">18K Gold ring sale</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Refining Process</span>
                        <span className="text-orange-400">-12.5g</span>
                      </div>
                      <p className="text-xs text-gray-400">Gold sent for refining</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-orange-900/20 rounded-lg">
                    <p className="text-orange-400 font-semibold">Total Given: 133.0g</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank-details">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Bank Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Money Received */}
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Money Received</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Mrs. Sharma (HDFC)</span>
                        <span className="text-green-400">+₹2,45,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Diamond necklace payment via RTGS</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Corporate Order (SBI)</span>
                        <span className="text-green-400">+₹5,50,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Bulk jewelry order payment</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Online Sale (HDFC)</span>
                        <span className="text-green-400">+₹85,000</span>
                      </div>
                      <p className="text-xs text-gray-400">E-commerce platform payment</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-900/20 rounded-lg">
                    <p className="text-green-400 font-semibold">Total Received: ₹8,80,000</p>
                  </div>
                </div>

                {/* Money Given */}
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Money Given</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Rajesh Gold Suppliers (SBI)</span>
                        <span className="text-red-400">-₹1,85,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Gold purchase payment via RTGS</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Diamond House Mumbai (HDFC)</span>
                        <span className="text-red-400">-₹3,25,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Diamond purchase payment</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white">Insurance Premium (SBI)</span>
                        <span className="text-red-400">-₹45,000</span>
                      </div>
                      <p className="text-xs text-gray-400">Annual insurance payment</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-red-900/20 rounded-lg">
                    <p className="text-red-400 font-semibold">Total Given: ₹5,55,000</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Type Selection Modal */}
      {showTransactionTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Select Transaction Section
                <Button variant="ghost" size="sm" onClick={() => setShowTransactionTypeModal(false)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">Choose the section for your transaction:</p>

              <div className="space-y-3">
                <Button
                  className="w-full justify-start h-16 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setShowTransactionTypeModal(false)
                    setTransactionType("cash")
                    setShowAddTransaction(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="h-8 w-8 text-green-200" />
                    <div className="text-left">
                      <p className="font-medium text-white">Cash Transaction</p>
                      <p className="text-sm text-green-200">Record cash receipts and payments</p>
                    </div>
                  </div>
                </Button>

                <Button
                  className="w-full justify-start h-16 bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => {
                    setShowTransactionTypeModal(false)
                    setTransactionType("gold")
                    setShowAddTransaction(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Gem className="h-8 w-8 text-yellow-200" />
                    <div className="text-left">
                      <p className="font-medium text-white">Gold Transaction</p>
                      <p className="text-sm text-yellow-200">Record pure gold purchases and sales</p>
                    </div>
                  </div>
                </Button>

                <Button
                  className="w-full justify-start h-16 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setShowTransactionTypeModal(false)
                    setShowBankAccountModal(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Building className="h-8 w-8 text-blue-200" />
                    <div className="text-left">
                      <p className="font-medium text-white">Banking Transaction</p>
                      <p className="text-sm text-blue-200">Record bank transfers and digital payments</p>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bank Account Management Modal */}
      {showBankAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Bank Account Management
                <Button variant="ghost" size="sm" onClick={() => setShowBankAccountModal(false)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm">Select an existing account or create a new one:</p>

              {/* Existing Bank Accounts */}
              <div className="space-y-2">
                {bankAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{account.name}</p>
                      <p className="text-sm text-gray-400">{account.accountNumber}</p>
                      <p className="text-sm text-green-400">₹{(account.balance / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedBankAccount(account.id)
                          setShowBankAccountModal(false)
                          setTransactionType("banking")
                          setShowAddTransaction(true)
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Use
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (confirm(`Delete ${account.name}?`)) {
                            setBankAccounts(bankAccounts.filter((acc) => acc.id !== account.id))
                          }
                        }}
                        className="border-red-600 text-red-400 hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Account Button */}
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  const accountName = prompt("Enter bank account name:")
                  const accountNumber = prompt("Enter account number:")
                  if (accountName && accountNumber) {
                    const newAccount = {
                      id: `BA${String(Date.now()).slice(-3)}`,
                      name: accountName,
                      accountNumber: `****${accountNumber.slice(-4)}`,
                      balance: 0,
                    }
                    setBankAccounts([...bankAccounts, newAccount])
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Bank Account
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Transaction Form Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                {transactionType === "cash"
                  ? "Cash Transaction"
                  : transactionType === "gold"
                    ? "Gold Transaction"
                    : transactionType === "banking"
                      ? "Banking Transaction"
                      : transactionType === "receipt"
                        ? "Receive Payment"
                        : "Make Payment"}
                <Button variant="ghost" size="sm" onClick={() => setShowAddTransaction(false)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactionType === "gold" ? (
                // Gold Transaction Form
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Transaction ID</label>
                    <Input
                      value={`GOLD${String(Date.now()).slice(-6)}`}
                      className="bg-gray-700 border-gray-600 text-white"
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                    <Input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Weight (grams)</label>
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="0.000"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Karat</label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select karat" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="24k">24K (99.9% Pure)</SelectItem>
                        <SelectItem value="22k">22K (91.7% Pure)</SelectItem>
                        <SelectItem value="21k">21K (87.5% Pure)</SelectItem>
                        <SelectItem value="18k">18K (75% Pure)</SelectItem>
                        <SelectItem value="14k">14K (58.3% Pure)</SelectItem>
                        <SelectItem value="10k">10K (41.7% Pure)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Purpose</label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="purchase">Purchase</SelectItem>
                        <SelectItem value="sale">Sale</SelectItem>
                        <SelectItem value="exchange">Exchange</SelectItem>
                        <SelectItem value="melting">Melting</SelectItem>
                        <SelectItem value="refining">Refining</SelectItem>
                        <SelectItem value="testing">Testing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Rate per gram (₹)</label>
                    <Input type="number" placeholder="0.00" className="bg-gray-700 border-gray-600 text-white" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Comments</label>
                    <textarea
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      rows={3}
                      placeholder="Additional comments about the gold transaction..."
                    />
                  </div>
                </div>
              ) : transactionType === "banking" ? (
                // Banking Transaction Form
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Transaction ID</label>
                    <Input
                      value={`BANK${String(Date.now()).slice(-6)}`}
                      className="bg-gray-700 border-gray-600 text-white"
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                    <Input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Bank Account</label>
                    <Select value={selectedBankAccount} onValueChange={setSelectedBankAccount}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select bank account" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {bankAccounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name} - {account.accountNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Transaction Type</label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="credit">Credit (Money In)</SelectItem>
                        <SelectItem value="debit">Debit (Money Out)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <Input
                      placeholder="Enter transaction description"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Amount (₹)</label>
                    <Input type="number" placeholder="0.00" className="bg-gray-700 border-gray-600 text-white" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="karigar">Karigar</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="transfer">Account Transfer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Party Type</label>
                    <Select value={selectedPartyType} onValueChange={setSelectedPartyType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select party type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="vendors">Vendor</SelectItem>
                        <SelectItem value="clients">Client</SelectItem>
                        <SelectItem value="karigars">Karigar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Party Name</label>
                    <Select value={selectedParty} onValueChange={setSelectedParty} disabled={!selectedPartyType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue
                          placeholder={
                            selectedPartyType ? `Select ${selectedPartyType.slice(0, -1)}` : "Select party type first"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {selectedPartyType &&
                          registeredParties[selectedPartyType as keyof typeof registeredParties]?.map((party) => (
                            <SelectItem key={party.id} value={party.id}>
                              {party.name} {party.phone && `(${party.phone})`} {party.contact && `(${party.contact})`}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Reference Number (Optional)</label>
                    <Input
                      placeholder="Transaction reference, cheque number, etc."
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Notes (Optional)</label>
                    <textarea
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      rows={3}
                      placeholder="Additional notes or details..."
                    />
                  </div>
                </div>
              ) : (
                // Regular Transaction Form (Cash/Banking)
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Transaction ID</label>
                    <Input
                      value={`TXN${String(Date.now()).slice(-6)}`}
                      className="bg-gray-700 border-gray-600 text-white"
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                    <Input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <Input
                      placeholder="Enter transaction description"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Amount (₹)</label>
                    <Input type="number" placeholder="0.00" className="bg-gray-700 border-gray-600 text-white" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {transactionType === "receipt" ? (
                          <>
                            <SelectItem value="client">Client</SelectItem>
                            <SelectItem value="sale">Sale</SelectItem>
                            <SelectItem value="refund">Refund</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="vendor">Vendor</SelectItem>
                            <SelectItem value="karigar">Karigar</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                            <SelectItem value="asset">Asset</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Party Type</label>
                    <Select value={selectedPartyType} onValueChange={setSelectedPartyType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select party type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {transactionType === "receipt" ? (
                          <>
                            <SelectItem value="clients">Client</SelectItem>
                            <SelectItem value="vendors">Vendor (Refund)</SelectItem>
                            <SelectItem value="karigars">Karigar (Return)</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="vendors">Vendor</SelectItem>
                            <SelectItem value="karigars">Karigar</SelectItem>
                            <SelectItem value="clients">Client (Refund)</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Party Name</label>
                    <Select value={selectedParty} onValueChange={setSelectedParty} disabled={!selectedPartyType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue
                          placeholder={
                            selectedPartyType ? `Select ${selectedPartyType.slice(0, -1)}` : "Select party type first"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {selectedPartyType &&
                          registeredParties[selectedPartyType as keyof typeof registeredParties]?.map((party) => (
                            <SelectItem key={party.id} value={party.id}>
                              {party.name} {party.phone && `(${party.phone})`} {party.contact && `(${party.contact})`}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {selectedParty && (
                      <p className="text-xs text-blue-400 mt-1">
                        Selected:{" "}
                        {
                          registeredParties[selectedPartyType as keyof typeof registeredParties]?.find(
                            (p) => p.id === selectedParty,
                          )?.name
                        }
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Payment Method</label>
                    <Select>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="rtgs">RTGS/NEFT</SelectItem>
                        <SelectItem value="cheque">Cheque</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Reference Number (Optional)</label>
                    <Input
                      placeholder="Cheque number, UPI ID, etc."
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Notes (Optional)</label>
                    <textarea
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      rows={3}
                      placeholder="Additional notes or details..."
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddTransaction(false)
                    setSelectedParty("")
                    setSelectedPartyType("")
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className={
                    transactionType === "gold"
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : transactionType === "receipt"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                  }
                  onClick={() => {
                    if (transactionType === "gold") {
                      alert("Gold transaction recorded successfully!")
                      setShowAddTransaction(false)
                      return
                    }

                    if (!selectedParty || !selectedPartyType) {
                      alert("Please select a party for the transaction")
                      return
                    }

                    const selectedPartyData = registeredParties[
                      selectedPartyType as keyof typeof registeredParties
                    ]?.find((p) => p.id === selectedParty)

                    // Here you would save the transaction and update ledgers
                    const transactionData = {
                      type: transactionType,
                      partyId: selectedParty,
                      partyName: selectedPartyData?.name,
                      partyType: selectedPartyType,
                      // ... other form data
                    }

                    // Update party ledger based on transaction type
                    if (transactionType === "receipt") {
                      // Record money received from party - decrease their balance or increase our receivables
                      console.log(`Recording receipt from ${selectedPartyData?.name} - Update their ledger`)
                    } else {
                      // Record money paid to party - increase their balance or decrease our payables
                      console.log(`Recording payment to ${selectedPartyData?.name} - Update their ledger`)
                    }

                    alert(
                      `${transactionType === "receipt" ? "Receipt" : "Payment"} recorded successfully!\nParty: ${selectedPartyData?.name}\nLedger updated automatically.`,
                    )
                    setShowAddTransaction(false)
                    setSelectedParty("")
                    setSelectedPartyType("")
                  }}
                >
                  {transactionType === "gold"
                    ? "Record Gold Transaction"
                    : transactionType === "receipt"
                      ? "Record Receipt"
                      : "Record Payment"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Transaction Modal */}
      {showEditTransactionModal && editingTransaction && (
        <EditTransactionModal
          isOpen={showEditTransactionModal}
          transaction={editingTransaction}
          onClose={() => {
            setShowEditTransactionModal(false)
            setEditingTransaction(null)
          }}
          onSave={(transactionData) => {
            // Update transaction in the list
            console.log("Updated transaction data:", transactionData)
            alert(`Transaction ${transactionData.description} updated successfully!`)
            setShowEditTransactionModal(false)
            setEditingTransaction(null)
          }}
        />
      )}
    </div>
  )
}
