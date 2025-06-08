"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, QrCode, Plus, AlertTriangle, Gem, Eye, Edit, Download, Upload, Filter, Trash2 } from "lucide-react"

interface StockItem {
  id: string
  tagId: string
  type: "diamond-jewelry" | "gold-jewelry" | "loose-diamond" | "pure-gold" | "silver"
  name: string
  goldWeight?: number
  goldKarat?: number
  diamondWeight?: number
  diamondQuality?: string
  description: string
  purchasePrice: number
  currentValue: number
  status: "in-stock" | "sold" | "with-karigar" | "on-approval"
  location: string
  lastUpdated: Date
  qrCode: string
}

export default function StockManagement() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showAddItem, setShowAddItem] = useState(false)
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [selectedItemType, setSelectedItemType] = useState("")
  const [showEditItemModal, setShowEditItemModal] = useState(false)
  const [editingItem, setEditingItem] = useState<StockItem | null>(null)
  const [editedName, setEditedName] = useState("")
  const [editedDescription, setEditedDescription] = useState("")

  // Add these new state variables near the other state declarations
  const [showViewItemModal, setShowViewItemModal] = useState(false)
  const [viewingItem, setViewingItem] = useState<StockItem | null>(null)

  // Add new state variables for all editable fields
  const [editedTagId, setEditedTagId] = useState("")
  const [editedType, setEditedType] = useState<
    "diamond-jewelry" | "gold-jewelry" | "loose-diamond" | "pure-gold" | "silver" | ""
  >("")
  const [editedGoldWeight, setEditedGoldWeight] = useState<number | undefined>(undefined)
  const [editedGoldKarat, setEditedGoldKarat] = useState<number | undefined>(undefined)
  const [editedDiamondWeight, setEditedDiamondWeight] = useState<number | undefined>(undefined)
  const [editedDiamondQuality, setEditedDiamondQuality] = useState<string | undefined>("")
  const [editedPurchasePrice, setEditedPurchasePrice] = useState<number>(0)
  const [editedCurrentValue, setEditedCurrentValue] = useState<number>(0)
  const [editedStatus, setEditedStatus] = useState<"in-stock" | "sold" | "with-karigar" | "on-approval" | "">("")
  const [editedLocation, setEditedLocation] = useState("")

  const initialStockItems: StockItem[] = [
    {
      id: "SJ001",
      tagId: "TAG001",
      type: "diamond-jewelry",
      name: "Diamond Necklace Set",
      goldWeight: 45.5,
      goldKarat: 18,
      diamondWeight: 2.5,
      diamondQuality: "1 no (EF VVS)",
      description: "Elegant diamond necklace with matching earrings",
      purchasePrice: 185000,
      currentValue: 245000,
      status: "in-stock",
      location: "Main Display",
      lastUpdated: new Date(),
      qrCode: "QR_SJ001",
    },
    {
      id: "SJ002",
      tagId: "TAG002",
      type: "gold-jewelry",
      name: "Gold Bangles Set (6 pieces)",
      goldWeight: 85.2,
      goldKarat: 22,
      description: "Traditional gold bangles with intricate design",
      purchasePrice: 425000,
      currentValue: 485000,
      status: "in-stock",
      location: "Vault A",
      lastUpdated: new Date(),
      qrCode: "QR_SJ002",
    },
    {
      id: "SJ003",
      tagId: "TAG003",
      type: "loose-diamond",
      name: "Loose Diamond Collection",
      diamondWeight: 5.75,
      diamondQuality: "2 no (EFG VVS-VS)",
      description: "Round brilliant cut diamonds, various sizes",
      purchasePrice: 575000,
      currentValue: 625000,
      status: "in-stock",
      location: "Diamond Box - Main",
      lastUpdated: new Date(),
      qrCode: "QR_SJ003",
    },
    {
      id: "SJ004",
      tagId: "TAG004",
      type: "pure-gold",
      name: "Gold Bar 100g",
      goldWeight: 100,
      goldKarat: 24,
      description: "Fine gold bar 999.9 purity",
      purchasePrice: 580000,
      currentValue: 610000,
      status: "in-stock",
      location: "Vault B",
      lastUpdated: new Date(),
      qrCode: "QR_SJ004",
    },
  ]
  const [stockItems, setStockItems] = useState<StockItem[]>(initialStockItems)

  const filteredItems = stockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tagId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || item.type === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-900 text-green-300 border-green-700"
      case "sold":
        return "bg-gray-900 text-gray-300 border-gray-700"
      case "with-karigar":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "on-approval":
        return "bg-yellow-900 text-yellow-300 border-yellow-700"
      default:
        return "bg-gray-900 text-gray-300 border-gray-700"
    }
  }

  const generateQRCode = (itemId: string) => {
    // QR code generation logic would go here
    alert(`QR Code generated for item: ${itemId}
Stock ID: SJ${String(Date.now()).slice(-6)}`)
  }

  // Add this new handler function
  const handleOpenViewModal = (item: StockItem) => {
    setViewingItem(item)
    setShowViewItemModal(true)
  }

  // Update handleOpenEditModal to populate all new state variables
  const handleOpenEditModal = (item: StockItem) => {
    setEditingItem(item)
    setEditedName(item.name)
    setEditedDescription(item.description)
    setEditedTagId(item.tagId)
    setEditedType(item.type)
    setEditedGoldWeight(item.goldWeight)
    setEditedGoldKarat(item.goldKarat)
    setEditedDiamondWeight(item.diamondWeight)
    setEditedDiamondQuality(item.diamondQuality)
    setEditedPurchasePrice(item.purchasePrice)
    setEditedCurrentValue(item.currentValue)
    setEditedStatus(item.status)
    setEditedLocation(item.location)
    setShowEditItemModal(true)
  }

  // Update handleSaveEdit to include all new fields
  const handleSaveEdit = () => {
    if (!editingItem) return
    setStockItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: editedName,
              description: editedDescription,
              tagId: editedTagId,
              type: editedType as StockItem["type"], // Ensure type assertion
              goldWeight: editedGoldWeight,
              goldKarat: editedGoldKarat,
              diamondWeight: editedDiamondWeight,
              diamondQuality: editedDiamondQuality,
              purchasePrice: editedPurchasePrice,
              currentValue: editedCurrentValue,
              status: editedStatus as StockItem["status"], // Ensure type assertion
              location: editedLocation,
              lastUpdated: new Date(), // Update lastUpdated timestamp
            }
          : item,
      ),
    )
    setShowEditItemModal(false)
    setEditingItem(null)
  }

  const dynamicStockSummary = {
    totalItems: stockItems.length,
    totalValue: stockItems.reduce((sum, item) => sum + item.currentValue, 0),
    // Note: The definition for "lowStock" might need refinement based on specific business rules.
    // Here, we're counting items 'in-stock' with a current value less than 50000 as an example.
    lowStock: stockItems.filter((item) => item.status === "in-stock" && item.currentValue < 50000).length,
    withKarigar: stockItems.filter((item) => item.status === "with-karigar").length,
    onApproval: stockItems.filter((item) => item.status === "on-approval").length,
  }

  const handleDeleteItem = (itemId: string, itemName: string) => {
    if (confirm(`Delete stock item "${itemName}"? This action cannot be undone and will remove the item from inventory.`)) {
      setStockItems(prevItems => prevItems.filter(item => item.id !== itemId))
      alert(`Stock item "${itemName}" deleted successfully`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Stock Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Items</p>
                <p className="text-2xl font-bold text-white">{dynamicStockSummary.totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Value</p>
                <p className="text-2xl font-bold text-white">
                  ₹{(dynamicStockSummary.totalValue / 10000000).toFixed(1)}Cr
                </p>
              </div>
              <Gem className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Low Stock</p>
                <p className="text-2xl font-bold text-red-400">{dynamicStockSummary.lowStock}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">With Karigar</p>
                <p className="text-2xl font-bold text-blue-400">{dynamicStockSummary.withKarigar}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">On Approval</p>
                <p className="text-2xl font-bold text-yellow-400">{dynamicStockSummary.onApproval}</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview">Stock Overview</TabsTrigger>
          <TabsTrigger value="diamond-jewelry">Diamond Jewelry</TabsTrigger>
          <TabsTrigger value="gold-jewelry">Gold Jewelry</TabsTrigger>
          <TabsTrigger value="loose-diamond">Loose Diamonds</TabsTrigger>
          <TabsTrigger value="pure-gold">Pure Gold</TabsTrigger>
          <TabsTrigger value="qr-management">QR Management</TabsTrigger>
          <TabsTrigger value="tag-printing">Tag Printing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Search and Filter */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Stock Inventory
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600"
                    onClick={() => {
                      // Create file input for Excel import
                      const fileInput = document.createElement("input")
                      fileInput.type = "file"
                      fileInput.accept = ".xlsx,.xls,.csv"
                      fileInput.onchange = (e) => {
                        const files = (e.target as HTMLInputElement).files
                        if (files && files.length > 0) {
                          alert(`Excel file selected: ${files[0].name}\n\nFile will be processed for stock import.`)
                          // Here you would process the Excel file
                        }
                      }
                      fileInput.click()
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Import from Excel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600"
                    onClick={() => {
                      // Generate and download Excel file
                      alert("Exporting stock data to Excel file...")
                      // Here you would generate and download the Excel file
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export to Excel
                  </Button>
                  <Button size="sm" onClick={() => setShowAddItemModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by item name, tag ID, or description..."
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
                    <SelectItem value="diamond-jewelry">Diamond Jewelry</SelectItem>
                    <SelectItem value="gold-jewelry">Gold Jewelry</SelectItem>
                    <SelectItem value="loose-diamond">Loose Diamonds</SelectItem>
                    <SelectItem value="pure-gold">Pure Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-gray-600">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {/* Stock Items Table */}
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                            <Gem className="h-8 w-8 text-yellow-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{item.name}</h3>
                            <p className="text-sm text-gray-400">{item.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline" className="text-xs">
                                ID: {item.id}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Tag: {item.tagId}
                              </Badge>
                              {item.goldWeight && (
                                <Badge variant="outline" className="text-xs">
                                  Gold: {item.goldWeight}g ({item.goldKarat}K)
                                </Badge>
                              )}
                              {item.diamondWeight && (
                                <Badge variant="outline" className="text-xs">
                                  Diamond: {item.diamondWeight}ct
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">₹{item.currentValue.toLocaleString()}</p>
                          <p className="text-sm text-gray-400">Purchase: ₹{item.purchasePrice.toLocaleString()}</p>
                          <Badge variant="outline" className={`mt-2 ${getStatusColor(item.status)}`}>
                            {item.status.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600"
                            onClick={() => handleOpenViewModal(item)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600"
                            onClick={() => handleOpenEditModal(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600"
                            onClick={() => generateQRCode(item.id)}
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-400 hover:bg-red-600"
                            onClick={() => handleDeleteItem(item.id, item.name)}
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
        <TabsContent value="diamond-jewelry" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Diamond Jewelry Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              {/* The global search bar in the "Overview" tab will also filter items here */}
              <div className="space-y-4 pt-4">
                {stockItems
                  .filter(
                    (item) =>
                      item.type === "diamond-jewelry" &&
                      (searchTerm === "" || // Show all if search term is empty
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.tagId.toLowerCase().includes(searchTerm.toLowerCase())),
                  )
                  .map((item) => (
                    <Card key={item.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                              <Gem className="h-8 w-8 text-yellow-500" /> {/* Consistent icon */}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{item.name}</h3>
                              <p className="text-sm text-gray-400">{item.description}</p>
                              <div className="flex items-center gap-4 mt-2 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  ID: {item.id}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Tag: {item.tagId}
                                </Badge>
                                {item.goldWeight && (
                                  <Badge variant="outline" className="text-xs">
                                    Gold: {item.goldWeight}g ({item.goldKarat}K)
                                  </Badge>
                                )}
                                {item.diamondWeight && (
                                  <Badge variant="outline" className="text-xs">
                                    Diamond: {item.diamondWeight}ct
                                    {item.diamondQuality && ` (${item.diamondQuality})`}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">₹{item.currentValue.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">Purchase: ₹{item.purchasePrice.toLocaleString()}</p>
                            <Badge variant="outline" className={`mt-2 ${getStatusColor(item.status)}`}>
                              {item.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => handleOpenViewModal(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => handleOpenEditModal(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => generateQRCode(item.id)}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600"
                              onClick={() => handleDeleteItem(item.id, item.name)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {stockItems
                  .filter(
                    (item) =>
                      item.type === "diamond-jewelry" &&
                      (searchTerm === "" ||
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.tagId.toLowerCase().includes(searchTerm.toLowerCase())),
                  )
                  .length === 0 && (
                  <p className="text-gray-400 text-center py-4">
                    {searchTerm === ""
                      ? "No diamond jewelry items in stock."
                      : "No diamond jewelry items match your search."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gold-jewelry" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Gold Jewelry Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              {/* The global search bar in the "Overview" tab will also filter items here */}
              <div className="space-y-4 pt-4">
                {stockItems
                  .filter(
                    (item) =>
                      item.type === "gold-jewelry" &&
                      (searchTerm === "" || // Show all if search term is empty
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.tagId.toLowerCase().includes(searchTerm.toLowerCase())),
                  )
                  .map((item) => (
                    <Card key={item.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                              <Gem className="h-8 w-8 text-yellow-500" /> {/* Consistent icon */}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{item.name}</h3>
                              <p className="text-sm text-gray-400">{item.description}</p>
                              <div className="flex items-center gap-4 mt-2 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  ID: {item.id}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Tag: {item.tagId}
                                </Badge>
                                {item.goldWeight && (
                                  <Badge variant="outline" className="text-xs">
                                    Gold: {item.goldWeight}g ({item.goldKarat}K)
                                  </Badge>
                                )}
                                {/* Diamond details might not be relevant for pure gold jewelry, but kept for consistency if mixed items exist */}
                                {item.diamondWeight && (
                                  <Badge variant="outline" className="text-xs">
                                    Diamond: {item.diamondWeight}ct
                                    {item.diamondQuality && ` (${item.diamondQuality})`}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">₹{item.currentValue.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">Purchase: ₹{item.purchasePrice.toLocaleString()}</p>
                            <Badge variant="outline" className={`mt-2 ${getStatusColor(item.status)}`}>
                              {item.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => handleOpenViewModal(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => handleOpenEditModal(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => generateQRCode(item.id)}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600"
                              onClick={() => handleDeleteItem(item.id, item.name)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {stockItems
                  .filter(
                    (item) =>
                      item.type === "gold-jewelry" &&
                      (searchTerm === "" ||
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.tagId.toLowerCase().includes(searchTerm.toLowerCase())),
                  )
                  .length === 0 && (
                  <p className="text-gray-400 text-center py-4">
                    {searchTerm === "" ? "No gold jewelry items in stock." : "No gold jewelry items match your search."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="loose-diamond" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Loose Diamonds Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-4">
                {stockItems
                  .filter(
                    (item) =>
                      item.type === "loose-diamond" &&
                      (searchTerm === "" ||
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.tagId.toLowerCase().includes(searchTerm.toLowerCase())),
                  )
                  .map((item) => (
                    <Card key={item.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                              <Gem className="h-8 w-8 text-blue-400" /> {/* Diamond specific icon color */}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{item.name}</h3>
                              <p className="text-sm text-gray-400">{item.description}</p>
                              <div className="flex items-center gap-4 mt-2 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  ID: {item.id}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Tag: {item.tagId}
                                </Badge>
                                {item.diamondWeight && (
                                  <Badge variant="outline" className="text-xs">
                                    Weight: {item.diamondWeight}ct
                                  </Badge>
                                )}
                                {item.diamondQuality && (
                                  <Badge variant="outline" className="text-xs">
                                    Quality: {item.diamondQuality}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">₹{item.currentValue.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">Purchase: ₹{item.purchasePrice.toLocaleString()}</p>
                            <Badge variant="outline" className={`mt-2 ${getStatusColor(item.status)}`}>
                              {item.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => handleOpenViewModal(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => handleOpenEditModal(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => generateQRCode(item.id)}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600"
                              onClick={() => handleDeleteItem(item.id, item.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {stockItems.filter(
                  (item) =>
                    item.type === "loose-diamond" &&
                    (searchTerm === "" ||
                      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.tagId.toLowerCase().includes(searchTerm.toLowerCase())),
                ).length === 0 && (
                  <p className="text-gray-400 text-center py-4">
                    {searchTerm === "" ? "No loose diamonds in stock." : "No loose diamonds match your search."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pure-gold" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Pure Gold Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-4">
                {stockItems
                  .filter(
                    (item) =>
                      item.type === "pure-gold" &&
                      (searchTerm === "" ||
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.tagId.toLowerCase().includes(searchTerm.toLowerCase())),
                  )
                  .map((item) => (
                    <Card key={item.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                              <Package className="h-8 w-8 text-yellow-400" /> {/* Gold specific icon color */}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{item.name}</h3>
                              <p className="text-sm text-gray-400">{item.description}</p>
                              <div className="flex items-center gap-4 mt-2 flex-wrap">
                                <Badge variant="outline" className="text-xs">
                                  ID: {item.id}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Tag: {item.tagId}
                                </Badge>
                                {item.goldWeight && (
                                  <Badge variant="outline" className="text-xs">
                                    Weight: {item.goldWeight}g
                                  </Badge>
                                )}
                                {item.goldKarat && (
                                  <Badge variant="outline" className="text-xs">
                                    Karat: {item.goldKarat}K
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-white">₹{item.currentValue.toLocaleString()}</p>
                            <p className="text-sm text-gray-400">Purchase: ₹{item.purchasePrice.toLocaleString()}</p>
                            <Badge variant="outline" className={`mt-2 ${getStatusColor(item.status)}`}>
                              {item.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => handleOpenViewModal(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => handleOpenEditModal(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600"
                              onClick={() => generateQRCode(item.id)}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600"
                              onClick={() => handleDeleteItem(item.id, item.name)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {stockItems.filter(
                  (item) =>
                    item.type === "pure-gold" &&
                    (searchTerm === "" ||
                      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      item.tagId.toLowerCase().includes(searchTerm.toLowerCase())),
                ).length === 0 && (
                  <p className="text-gray-400 text-center py-4">
                    {searchTerm === "" ? "No pure gold items in stock." : "No pure gold items match your search."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qr-management">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">QR Code Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Generate QR Codes</h3>
                  <div className="space-y-4">
                    <Button className="w-full justify-start">
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate for All Stock Items
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600">
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate for New Items Only
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-gray-600">
                      <QrCode className="h-4 w-4 mr-2" />
                      Bulk QR Generation
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">QR Code Features</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Unique identification for each item</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Quick stock verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Theft prevention tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Mobile app integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tag-printing">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Jewelry Tag Printing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Print Tags</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h4 className="font-medium text-white mb-3">Select Items to Print Tags</h4>
                      <div className="space-y-3">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-full bg-gray-600 border-gray-500 text-white">
                            <SelectValue placeholder="Filter by type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="all">All Items</SelectItem>
                            <SelectItem value="diamond-jewelry">Diamond Jewelry</SelectItem>
                            <SelectItem value="gold-jewelry">Gold Jewelry</SelectItem>
                            <SelectItem value="loose-diamond">Loose Diamonds</SelectItem>
                            <SelectItem value="pure-gold">Pure Gold</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="max-h-60 overflow-y-auto space-y-2 mt-3">
                          {stockItems.map((item) => (
                            <div key={item.id} className="flex items-center p-2 bg-gray-600 rounded-md">
                              <input type="checkbox" id={`tag-${item.id}`} className="mr-3 h-4 w-4" />
                              <label htmlFor={`tag-${item.id}`} className="text-white text-sm flex-1">
                                {item.name} ({item.tagId})
                              </label>
                              <Badge variant="outline" className={getStatusColor(item.status)}>
                                {item.status.replace("-", " ")}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" className="border-gray-600">
                        Select All
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Connecting to tag printer and preparing to print selected tags...")
                          // Here you would implement the actual printer connection logic
                        }}
                      >
                        Print Selected Tags
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Tag Preview</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h4 className="font-medium text-white mb-3">Tag Format</h4>
                      <div className="space-y-3">
                        <Select defaultValue="gold">
                          <SelectTrigger className="w-full bg-gray-600 border-gray-500 text-white">
                            <SelectValue placeholder="Select tag format" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="gold">Gold Jewelry Tag</SelectItem>
                            <SelectItem value="diamond">Diamond Jewelry Tag</SelectItem>
                            <SelectItem value="custom">Custom Tag</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="border border-gray-300 p-3 rounded-md">
                        <div className="text-center text-black font-bold mb-2">Shreeji Jewels</div>
                        <div className="flex justify-between text-xs text-black">
                          <span>ID: SJ001</span>
                          <span>22K</span>
                        </div>
                        <div className="text-xs text-black mt-1">Gold: 45.5g</div>
                        <div className="diamond-tag hidden">
                          <div className="text-xs text-black mt-1">Diamond: 2.5ct (1d)</div>
                          <div className="text-xs text-black mt-1">MRP: ₹245,000</div>
                        </div>
                        <div className="flex justify-center mt-2">
                          <div className="bg-gray-200 h-16 w-16 flex items-center justify-center text-xs text-gray-500">
                            QR Code
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h4 className="font-medium text-white mb-3">Printer Settings</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Printer</label>
                          <Select defaultValue="default">
                            <SelectTrigger className="w-full bg-gray-600 border-gray-500 text-white">
                              <SelectValue placeholder="Select printer" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="default">Default Tag Printer</SelectItem>
                              <SelectItem value="zebra">Zebra ZD410</SelectItem>
                              <SelectItem value="brother">Brother QL-820NWB</SelectItem>
                              <SelectItem value="dymo">DYMO LabelWriter 450</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Tag Size</label>
                          <Select defaultValue="small">
                            <SelectTrigger className="w-full bg-gray-600 border-gray-500 text-white">
                              <SelectValue placeholder="Select tag size" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="small">Small (30x20mm)</SelectItem>
                              <SelectItem value="medium">Medium (40x30mm)</SelectItem>
                              <SelectItem value="large">Large (50x40mm)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full border-gray-600"
                          onClick={() => {
                            alert("Testing connection to printer...")
                            // Here you would implement the printer test connection
                            setTimeout(() => alert("Printer connected successfully!"), 1000)
                          }}
                        >
                          Test Printer Connection
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Add New Stock Item
                <Button variant="ghost" size="sm" onClick={() => setShowAddItemModal(false)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Basic Information</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Stock ID</label>
                    <input
                      type="text"
                      value={`SJ${String(Date.now()).slice(-6)}`}
                      className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                      readOnly
                    />
                    <p className="text-xs text-gray-500 mt-1">Auto-generated unique ID</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Tag ID *</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="TAG001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Item Type *</label>
                    <select
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      value={selectedItemType}
                      onChange={(e) => setSelectedItemType(e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="diamond-jewelry">Diamond Jewelry</option>
                      <option value="gold-jewelry">Gold Jewelry</option>
                      <option value="loose-diamond">Loose Diamond</option>
                      <option value="pure-gold">Pure Gold</option>
                      <option value="silver">Silver</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Item Name *</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="e.g., Diamond Necklace Set"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      rows={3}
                      placeholder="Detailed description of the item..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                    <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white">
                      <option value="">Select Location</option>
                      <option value="main-display">Main Display</option>
                      <option value="vault-a">Vault A</option>
                      <option value="vault-b">Vault B</option>
                      <option value="diamond-box-main">Diamond Box - Main</option>
                      <option value="safe-deposit">Safe Deposit</option>
                    </select>
                  </div>
                </div>

                {/* Item Specifications & Image */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Specifications & Image</h3>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Item Images</label>
                    <div
                      className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-gray-500"
                      onClick={() => {
                        const fileInput = document.createElement("input")
                        fileInput.type = "file"
                        fileInput.accept = "image/*"
                        fileInput.multiple = true
                        fileInput.onchange = (e) => {
                          const files = (e.target as HTMLInputElement).files
                          if (files && files.length > 0) {
                            const fileNames = Array.from(files)
                              .map((file) => file.name)
                              .join(", ")
                            alert(`Images selected: ${fileNames}`)
                            // Here you would handle the image upload
                          }
                        }
                        fileInput.click()
                      }}
                    >
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">Click to upload item images</p>
                      <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, WEBP (Max 5 images)</p>
                    </div>
                  </div>

                  {/* Gold Details - Only show for items that contain gold */}
                  {selectedItemType !== "loose-diamond" && (
                    <div className="p-4 bg-gray-700 rounded-lg space-y-3">
                      <h4 className="font-medium text-yellow-400">Gold Details</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Gold Weight (grams)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Gold Karat</label>
                          <select className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm">
                            <option value="">Select</option>
                            <option value="18">18K</option>
                            <option value="20">20K</option>
                            <option value="22">22K</option>
                            <option value="24">24K (Pure)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Diamond Details - Only show for diamond jewelry and loose diamonds */}
                  {(selectedItemType === "diamond-jewelry" || selectedItemType === "loose-diamond") && (
                    <div className="p-4 bg-gray-700 rounded-lg space-y-3">
                      <h4 className="font-medium text-blue-400">Diamond Details</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Diamond Weight (carats)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Diamond Quality</label>
                          <select className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm">
                            <option value="">Select Quality</option>
                            <option value="1no">1 no (EF VVS)</option>
                            <option value="2no">2 no (EFG VVS-VS)</option>
                            <option value="3no">3 no (FGH VS-SI)</option>
                            <option value="4no">4 no (GHI-I)</option>
                            <option value="5no">5 no (Shade)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="p-4 bg-gray-700 rounded-lg space-y-3">
                    <h4 className="font-medium text-green-400">Pricing</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Purchase Price</label>
                        <input
                          type="number"
                          className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Current Value</label>
                        <input
                          type="number"
                          className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                <Button variant="outline" onClick={() => setShowAddItemModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // Here you would save the item
                    alert("Item added successfully!")
                    setShowAddItemModal(false)
                  }}
                >
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Edit Item Modal */}
      {showEditItemModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Edit Stock Item: {editingItem.tagId}
                <Button variant="ghost" size="sm" onClick={() => setShowEditItemModal(false)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-h-[70vh] overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1: Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="editItemTagId" className="block text-sm font-medium text-gray-400 mb-1">
                      Tag ID *
                    </label>
                    <Input
                      id="editItemTagId"
                      type="text"
                      value={editedTagId}
                      onChange={(e) => setEditedTagId(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="TAG001"
                    />
                  </div>
                  <div>
                    <label htmlFor="editItemType" className="block text-sm font-medium text-gray-400 mb-1">
                      Item Type *
                    </label>
                    <Select value={editedType} onValueChange={(value) => setEditedType(value as StockItem["type"])}>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="diamond-jewelry">Diamond Jewelry</SelectItem>
                        <SelectItem value="gold-jewelry">Gold Jewelry</SelectItem>
                        <SelectItem value="loose-diamond">Loose Diamond</SelectItem>
                        <SelectItem value="pure-gold">Pure Gold</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="editItemName" className="block text-sm font-medium text-gray-400 mb-1">
                      Item Name *
                    </label>
                    <Input
                      id="editItemName"
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="e.g., Diamond Necklace Set"
                    />
                  </div>
                  <div>
                    <label htmlFor="editItemDescription" className="block text-sm font-medium text-gray-400 mb-1">
                      Description
                    </label>
                    <textarea
                      id="editItemDescription"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      rows={3}
                      placeholder="Detailed description of the item..."
                    />
                  </div>
                  <div>
                    <label htmlFor="editItemLocation" className="block text-sm font-medium text-gray-400 mb-1">
                      Location
                    </label>
                    <Select value={editedLocation} onValueChange={setEditedLocation}>
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="main-display">Main Display</SelectItem>
                        <SelectItem value="vault-a">Vault A</SelectItem>
                        <SelectItem value="vault-b">Vault B</SelectItem>
                        <SelectItem value="diamond-box-main">Diamond Box - Main</SelectItem>
                        <SelectItem value="safe-deposit">Safe Deposit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="editItemStatus" className="block text-sm font-medium text-gray-400 mb-1">
                      Status
                    </label>
                    <Select
                      value={editedStatus}
                      onValueChange={(value) => setEditedStatus(value as StockItem["status"])}
                    >
                      <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                        <SelectItem value="with-karigar">With Karigar</SelectItem>
                        <SelectItem value="on-approval">On Approval</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Column 2: Specifications & Pricing */}
                <div className="space-y-4">
                  {/* Gold Details */}
                  {editedType !== "loose-diamond" && editedType !== "" && (
                    <div className="p-4 bg-gray-700 rounded-lg space-y-3">
                      <h4 className="font-medium text-yellow-400">Gold Details</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Gold Weight (g)</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={editedGoldWeight ?? ""}
                            onChange={(e) => setEditedGoldWeight(Number.parseFloat(e.target.value) || undefined)}
                            className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Gold Karat</label>
                          <Select
                            value={editedGoldKarat?.toString() ?? ""}
                            onValueChange={(val) => setEditedGoldKarat(Number.parseInt(val) || undefined)}
                          >
                            <SelectTrigger className="w-full bg-gray-600 border-gray-500 rounded text-white text-sm">
                              <SelectValue placeholder="Select Karat" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-600 border-gray-500">
                              <SelectItem value="18">18K</SelectItem>
                              <SelectItem value="20">20K</SelectItem>
                              <SelectItem value="22">22K</SelectItem>
                              <SelectItem value="24">24K (Pure)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Diamond Details */}
                  {(editedType === "diamond-jewelry" || editedType === "loose-diamond") && (
                    <div className="p-4 bg-gray-700 rounded-lg space-y-3">
                      <h4 className="font-medium text-blue-400">Diamond Details</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Diamond Weight (ct)</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={editedDiamondWeight ?? ""}
                            onChange={(e) => setEditedDiamondWeight(Number.parseFloat(e.target.value) || undefined)}
                            className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Diamond Quality</label>
                          <Select value={editedDiamondQuality ?? ""} onValueChange={setEditedDiamondQuality}>
                            <SelectTrigger className="w-full bg-gray-600 border border-gray-500 rounded text-white text-sm">
                              <SelectValue placeholder="Select Quality" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-600 border-gray-500">
                              <SelectItem value="1no">1 no (EF VVS)</SelectItem>
                              <SelectItem value="2no">2 no (EFG VVS-VS)</SelectItem>
                              <SelectItem value="3no">3 no (FGH VS-SI)</SelectItem>
                              <SelectItem value="4no">4 no (GHI-I)</SelectItem>
                              <SelectItem value="5no">5 no (Shade)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="p-4 bg-gray-700 rounded-lg space-y-3">
                    <h4 className="font-medium text-green-400">Pricing</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Purchase Price</label>
                        <Input
                          type="number"
                          value={editedPurchasePrice}
                          onChange={(e) => setEditedPurchasePrice(Number.parseFloat(e.target.value) || 0)}
                          className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Current Value</label>
                        <Input
                          type="number"
                          value={editedCurrentValue}
                          onChange={(e) => setEditedCurrentValue(Number.parseFloat(e.target.value) || 0)}
                          className="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white text-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                <Button variant="outline" onClick={() => setShowEditItemModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {showViewItemModal && viewingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                View Stock Item: {viewingItem.tagId}
                <Button variant="ghost" size="sm" onClick={() => setShowViewItemModal(false)}>
                  ✕
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-h-[80vh] overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Stock ID</h4>
                  <p className="text-white">{viewingItem.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Tag ID</h4>
                  <p className="text-white">{viewingItem.tagId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Item Name</h4>
                  <p className="text-white">{viewingItem.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Item Type</h4>
                  <p className="text-white capitalize">{viewingItem.type.replace("-", " ")}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-gray-400">Description</h4>
                  <p className="text-white whitespace-pre-wrap">{viewingItem.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Location</h4>
                  <p className="text-white">{viewingItem.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Status</h4>
                  <Badge variant="outline" className={`mt-1 ${getStatusColor(viewingItem.status)}`}>
                    {viewingItem.status.replace("-", " ").toUpperCase()}
                  </Badge>
                </div>

                {/* Gold Details */}
                {(viewingItem.type === "gold-jewelry" ||
                  viewingItem.type === "pure-gold" ||
                  viewingItem.type === "diamond-jewelry") && (
                  <div className="md:col-span-2 p-4 bg-gray-700 rounded-lg mt-2">
                    <h4 className="font-medium text-yellow-400 mb-2">Gold Details</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-400">Gold Weight (grams)</p>
                        <p className="text-white text-sm">{viewingItem.goldWeight?.toFixed(2) ?? "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Gold Karat</p>
                        <p className="text-white text-sm">
                          {viewingItem.goldKarat ? `${viewingItem.goldKarat}K` : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Diamond Details */}
                {(viewingItem.type === "diamond-jewelry" || viewingItem.type === "loose-diamond") && (
                  <div className="md:col-span-2 p-4 bg-gray-700 rounded-lg mt-2">
                    <h4 className="font-medium text-blue-400 mb-2">Diamond Details</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-400">Diamond Weight (carats)</p>
                        <p className="text-white text-sm">{viewingItem.diamondWeight?.toFixed(2) ?? "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Diamond Quality</p>
                        <p className="text-white text-sm">{viewingItem.diamondQuality ?? "N/A"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing */}
                <div className="md:col-span-2 p-4 bg-gray-700 rounded-lg mt-2">
                  <h4 className="font-medium text-green-400 mb-2">Pricing</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-400">Purchase Price</p>
                      <p className="text-white text-sm">₹{viewingItem.purchasePrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Current Value</p>
                      <p className="text-white text-sm">₹{viewingItem.currentValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400">QR Code</h4>
                  <p className="text-white">{viewingItem.qrCode}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Last Updated</h4>
                  <p className="text-white">{new Date(viewingItem.lastUpdated).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-gray-700 mt-4">
                <Button variant="outline" onClick={() => setShowViewItemModal(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )\
}
