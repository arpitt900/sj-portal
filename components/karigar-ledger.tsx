"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, User, Calendar, FileText } from "lucide-react"

interface LedgerEntry {
  id: string
  date: Date
  type: "issue" | "receive"
  category: "gold" | "diamond" | "labour" | "other"
  description: string
  itemName?: string
  goldWeight?: number
  goldKarat?: string
  diamondWeight?: number
  diamondQuality?: string
  labourCharges?: number
  amount: number
  balance: number
  reference?: string
}

interface KarigarLedgerProps {
  karigars: Array<{
    id: string
    name: string
    phone: string
    goldBalance: number
    diamondBalance: number
  }>
}

export default function KarigarLedger({ karigars }: KarigarLedgerProps) {
  const [selectedKarigar, setSelectedKarigar] = useState<string>("")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("current-month")

  // Sample ledger data - in real app, this would come from database
  const ledgerEntries: LedgerEntry[] = [
    {
      id: "L001",
      date: new Date("2024-11-01"),
      type: "issue",
      category: "gold",
      description: "Gold issued for bulk orders",
      goldWeight: 150.0,
      goldKarat: "22K",
      amount: 1027500,
      balance: -150.0,
      reference: "GI001",
    },
    {
      id: "L002",
      date: new Date("2024-11-05"),
      type: "issue",
      category: "diamond",
      description: "Diamond issued for necklace set",
      itemName: "Diamond Necklace Set",
      diamondWeight: 2.5,
      diamondQuality: "1 no (EF VVS)",
      amount: 125000,
      balance: -2.5,
      reference: "KO001",
    },
    {
      id: "L003",
      date: new Date("2024-11-10"),
      type: "receive",
      category: "gold",
      description: "Gold bangles completed",
      itemName: "Traditional Gold Bangles (6 pieces)",
      goldWeight: 85.2,
      goldKarat: "22K",
      amount: 583620,
      balance: -64.8,
      reference: "KO002",
    },
    {
      id: "L004",
      date: new Date("2024-11-10"),
      type: "receive",
      category: "labour",
      description: "Labour charges for gold bangles",
      itemName: "Traditional Gold Bangles (6 pieces)",
      labourCharges: 15000,
      amount: 15000,
      balance: 15000,
      reference: "KO002",
    },
    {
      id: "L005",
      date: new Date("2024-11-15"),
      type: "receive",
      category: "gold",
      description: "Diamond necklace set completed",
      itemName: "Diamond Necklace Set",
      goldWeight: 45.5,
      goldKarat: "18K",
      amount: 311775,
      balance: -19.3,
      reference: "KO001",
    },
    {
      id: "L006",
      date: new Date("2024-11-15"),
      type: "receive",
      category: "diamond",
      description: "Diamond necklace set completed",
      itemName: "Diamond Necklace Set",
      diamondWeight: 2.5,
      diamondQuality: "1 no (EF VVS)",
      amount: 125000,
      balance: 0,
      reference: "KO001",
    },
    {
      id: "L007",
      date: new Date("2024-11-15"),
      type: "receive",
      category: "labour",
      description: "Labour charges for diamond necklace",
      itemName: "Diamond Necklace Set",
      labourCharges: 25000,
      amount: 25000,
      balance: 40000,
      reference: "KO001",
    },
  ]

  const selectedKarigarData = karigars.find((k) => k.id === selectedKarigar)
  const filteredEntries = selectedKarigar
    ? ledgerEntries.filter((entry) => entry.reference?.includes("KO") || entry.reference?.includes("GI"))
    : []

  const getEntryIcon = (type: string, category: string) => {
    if (type === "issue") {
      return <ArrowUpRight className="h-4 w-4 text-red-400" />
    } else {
      return <ArrowDownLeft className="h-4 w-4 text-green-400" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "gold":
        return "text-yellow-400"
      case "diamond":
        return "text-blue-400"
      case "labour":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const calculateTotals = () => {
    const goldIssues = filteredEntries
      .filter((e) => e.type === "issue" && e.category === "gold")
      .reduce((sum, e) => sum + (e.goldWeight || 0), 0)
    const goldReceives = filteredEntries
      .filter((e) => e.type === "receive" && e.category === "gold")
      .reduce((sum, e) => sum + (e.goldWeight || 0), 0)

    const diamondIssues = filteredEntries
      .filter((e) => e.type === "issue" && e.category === "diamond")
      .reduce((sum, e) => sum + (e.diamondWeight || 0), 0)
    const diamondReceives = filteredEntries
      .filter((e) => e.type === "receive" && e.category === "diamond")
      .reduce((sum, e) => sum + (e.diamondWeight || 0), 0)

    const labourReceives = filteredEntries
      .filter((e) => e.type === "receive" && e.category === "labour")
      .reduce((sum, e) => sum + (e.labourCharges || 0), 0)

    return {
      goldBalance: goldIssues - goldReceives,
      diamondBalance: diamondIssues - diamondReceives,
      totalLabour: labourReceives,
    }
  }

  const totals = calculateTotals()

  return (
    <div className="space-y-6">
      {/* Karigar Selection */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Karigar Ledger</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Karigar</label>
              <Select value={selectedKarigar} onValueChange={setSelectedKarigar}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Choose karigar to view ledger" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {karigars.map((karigar) => (
                    <SelectItem key={karigar.id} value={karigar.id}>
                      {karigar.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="current-year">Current Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedKarigar && selectedKarigarData && (
        <>
          {/* Karigar Summary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5" />
                {selectedKarigarData.name} - Ledger Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-2">Gold Balance</h4>
                  <p className="text-2xl font-bold text-white">{totals.goldBalance.toFixed(2)}g</p>
                  <p className="text-sm text-gray-400">{totals.goldBalance > 0 ? "With Karigar" : "Returned"}</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-blue-400 mb-2">Diamond Balance</h4>
                  <p className="text-2xl font-bold text-white">{totals.diamondBalance.toFixed(2)}ct</p>
                  <p className="text-sm text-gray-400">{totals.diamondBalance > 0 ? "With Karigar" : "Returned"}</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-green-400 mb-2">Total Labour</h4>
                  <p className="text-2xl font-bold text-white">₹{totals.totalLabour.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Earned this period</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-purple-400 mb-2">Active Orders</h4>
                  <p className="text-2xl font-bold text-white">5</p>
                  <p className="text-sm text-gray-400">In progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ledger Entries */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Ledger Entries
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-600">
                    <FileText className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Print Statement
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Issues (Left Side) */}
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Issues (Given to Karigar)</h3>
                  <div className="space-y-3">
                    {filteredEntries
                      .filter((entry) => entry.type === "issue")
                      .map((entry) => (
                        <Card key={entry.id} className="bg-gray-700 border-gray-600">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                {getEntryIcon(entry.type, entry.category)}
                                <div>
                                  <p className="font-medium text-white text-sm">{entry.description}</p>
                                  <p className="text-xs text-gray-400">{entry.date.toLocaleDateString()}</p>
                                  {entry.itemName && <p className="text-xs text-blue-400">{entry.itemName}</p>}
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className={`text-xs ${getCategoryColor(entry.category)}`}>
                                      {entry.category.toUpperCase()}
                                    </Badge>
                                    {entry.reference && (
                                      <Badge variant="outline" className="text-xs">
                                        {entry.reference}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                {entry.goldWeight && (
                                  <p className="text-sm font-medium text-yellow-400">
                                    {entry.goldWeight}g ({entry.goldKarat})
                                  </p>
                                )}
                                {entry.diamondWeight && (
                                  <p className="text-sm font-medium text-blue-400">{entry.diamondWeight}ct</p>
                                )}
                                <p className="text-xs text-gray-400">₹{entry.amount.toLocaleString()}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* Receives (Right Side) */}
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">Receives (Received from Karigar)</h3>
                  <div className="space-y-3">
                    {filteredEntries
                      .filter((entry) => entry.type === "receive")
                      .map((entry) => (
                        <Card key={entry.id} className="bg-gray-700 border-gray-600">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                {getEntryIcon(entry.type, entry.category)}
                                <div>
                                  <p className="font-medium text-white text-sm">{entry.description}</p>
                                  <p className="text-xs text-gray-400">{entry.date.toLocaleDateString()}</p>
                                  {entry.itemName && <p className="text-xs text-blue-400">{entry.itemName}</p>}
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className={`text-xs ${getCategoryColor(entry.category)}`}>
                                      {entry.category.toUpperCase()}
                                    </Badge>
                                    {entry.reference && (
                                      <Badge variant="outline" className="text-xs">
                                        {entry.reference}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                {entry.goldWeight && (
                                  <p className="text-sm font-medium text-yellow-400">
                                    {entry.goldWeight}g ({entry.goldKarat})
                                  </p>
                                )}
                                {entry.diamondWeight && (
                                  <p className="text-sm font-medium text-blue-400">{entry.diamondWeight}ct</p>
                                )}
                                {entry.labourCharges && (
                                  <p className="text-sm font-medium text-green-400">
                                    ₹{entry.labourCharges.toLocaleString()}
                                  </p>
                                )}
                                <p className="text-xs text-gray-400">₹{entry.amount.toLocaleString()}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>

              {/* Totals Summary */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-yellow-400 mb-2">Gold Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Issued:</span>
                          <span className="text-red-400">
                            {filteredEntries
                              .filter((e) => e.type === "issue" && e.category === "gold")
                              .reduce((sum, e) => sum + (e.goldWeight || 0), 0)
                              .toFixed(2)}
                            g
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Received:</span>
                          <span className="text-green-400">
                            {filteredEntries
                              .filter((e) => e.type === "receive" && e.category === "gold")
                              .reduce((sum, e) => sum + (e.goldWeight || 0), 0)
                              .toFixed(2)}
                            g
                          </span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span className="text-white">Balance:</span>
                          <span className={totals.goldBalance > 0 ? "text-red-400" : "text-green-400"}>
                            {Math.abs(totals.goldBalance).toFixed(2)}g
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-blue-400 mb-2">Diamond Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Issued:</span>
                          <span className="text-red-400">
                            {filteredEntries
                              .filter((e) => e.type === "issue" && e.category === "diamond")
                              .reduce((sum, e) => sum + (e.diamondWeight || 0), 0)
                              .toFixed(2)}
                            ct
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Received:</span>
                          <span className="text-green-400">
                            {filteredEntries
                              .filter((e) => e.type === "receive" && e.category === "diamond")
                              .reduce((sum, e) => sum + (e.diamondWeight || 0), 0)
                              .toFixed(2)}
                            ct
                          </span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span className="text-white">Balance:</span>
                          <span className={totals.diamondBalance > 0 ? "text-red-400" : "text-green-400"}>
                            {Math.abs(totals.diamondBalance).toFixed(2)}ct
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-green-400 mb-2">Labour Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Earned:</span>
                          <span className="text-green-400">₹{totals.totalLabour.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Paid:</span>
                          <span className="text-blue-400">₹{(totals.totalLabour * 0.8).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span className="text-white">Pending:</span>
                          <span className="text-yellow-400">₹{(totals.totalLabour * 0.2).toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
