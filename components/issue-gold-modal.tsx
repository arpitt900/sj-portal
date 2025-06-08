"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"

interface IssueGoldModalProps {
  karigars: Array<{
    id: string
    name: string
    goldBalance: number
  }>
  onClose: () => void
  onIssue: (data: any) => void
}

export default function IssueGoldModal({ karigars, onClose, onIssue }: IssueGoldModalProps) {
  const [selectedKarigar, setSelectedKarigar] = useState<string>("")
  const [goldWeight, setGoldWeight] = useState<number>(0)
  const [goldKarat, setGoldKarat] = useState<string>("")
  const [goldRate, setGoldRate] = useState<number>(6850)
  const [purpose, setPurpose] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [totalValue, setTotalValue] = useState<number>(0)

  useEffect(() => {
    setTotalValue(goldWeight * goldRate)
  }, [goldWeight, goldRate])

  const handleIssue = () => {
    if (!selectedKarigar || !goldWeight || !goldKarat) {
      alert("Please fill all required fields")
      return
    }

    onIssue({
      karigarId: selectedKarigar,
      goldWeight,
      goldKarat,
      goldRate,
      totalValue,
      purpose,
      notes,
      issueDate: new Date(),
    })
    onClose()
  }

  const selectedKarigarData = karigars.find((k) => k.id === selectedKarigar)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-gray-800 border-gray-700 w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Issue Gold to Karigar
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Select Karigar *</label>
            <Select value={selectedKarigar} onValueChange={setSelectedKarigar}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Choose karigar" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {karigars.map((karigar) => (
                  <SelectItem key={karigar.id} value={karigar.id}>
                    {karigar.name} (Balance: {karigar.goldBalance}g)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedKarigarData && selectedKarigarData.goldBalance > 0 && (
            <div className="p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 text-yellow-400" />
              <p className="text-sm text-yellow-300">
                This karigar has an existing gold balance of {selectedKarigarData.goldBalance}g. New issue will be added
                to the existing balance.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Gold Weight (grams) *</label>
              <Input
                type="number"
                step="0.01"
                value={goldWeight || ""}
                onChange={(e) => setGoldWeight(Number(e.target.value))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Gold Karat *</label>
              <Select value={goldKarat} onValueChange={setGoldKarat}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="18">18K</SelectItem>
                  <SelectItem value="20">20K</SelectItem>
                  <SelectItem value="22">22K</SelectItem>
                  <SelectItem value="24">24K (Pure)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Gold Rate (per gram)</label>
            <Input
              type="number"
              value={goldRate}
              onChange={(e) => setGoldRate(Number(e.target.value))}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Purpose</label>
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="bulk-orders">Bulk Orders (Multiple Items)</SelectItem>
                <SelectItem value="advance-stock">Advance Stock</SelectItem>
                <SelectItem value="repair-work">Repair Work</SelectItem>
                <SelectItem value="custom-orders">Custom Orders</SelectItem>
                <SelectItem value="general-work">General Work</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              rows={2}
              placeholder="Additional notes or instructions..."
            />
          </div>

          <div className="p-3 bg-gray-700 rounded-lg">
            <h4 className="font-medium text-white mb-2">Issue Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Weight:</span>
                <span className="text-yellow-400 ml-2">
                  {goldWeight}g ({goldKarat})
                </span>
              </div>
              <div>
                <span className="text-gray-400">Rate:</span>
                <span className="text-white ml-2">₹{goldRate}/g</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">Total Value:</span>
                <span className="text-green-400 ml-2 font-bold">₹{totalValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleIssue} className="bg-yellow-600 hover:bg-yellow-700">
              Issue Gold
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
