"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Package } from "lucide-react"

interface ReceiveJewelryModalProps {
  karigars: Array<{
    id: string
    name: string
    goldBalance: number
    diamondBalance: number
  }>
  onClose: () => void
  onReceive: (data: any) => void
}

export default function ReceiveJewelryModal({ karigars, onClose, onReceive }: ReceiveJewelryModalProps) {
  const [step, setStep] = useState(1)
  const [jewelryType, setJewelryType] = useState<string>("")
  const [selectedKarigar, setSelectedKarigar] = useState<string>("")
  const [orderReference, setOrderReference] = useState<string>("")

  // Common fields
  const [itemName, setItemName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [labourCharges, setLabourCharges] = useState<number>(0)
  const [otherCharges, setOtherCharges] = useState<number>(0)
  const [qualityRating, setQualityRating] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  // Gold jewelry fields
  const [goldWeight, setGoldWeight] = useState<number>(0)
  const [goldKarat, setGoldKarat] = useState<string>("")
  const [goldPurity, setGoldPurity] = useState<number>(0)
  const [makingCharges, setMakingCharges] = useState<number>(0)

  // Diamond jewelry fields
  const [totalGoldWeight, setTotalGoldWeight] = useState<number>(0)
  const [totalGoldKarat, setTotalGoldKarat] = useState<string>("")
  const [totalDiamondWeight, setTotalDiamondWeight] = useState<number>(0)
  const [diamondQuality, setDiamondQuality] = useState<string>("")
  const [diamondCount, setDiamondCount] = useState<number>(0)
  const [settingCharges, setSettingCharges] = useState<number>(0)

  const handleNext = () => {
    if (step === 1 && jewelryType) {
      setStep(2)
    }
  }

  const handleReceive = () => {
    const baseData = {
      karigarId: selectedKarigar,
      jewelryType,
      orderReference,
      itemName,
      description,
      labourCharges,
      otherCharges,
      qualityRating,
      notes,
      receiveDate: new Date(),
      totalCharges: labourCharges + otherCharges + (jewelryType === "gold" ? makingCharges : settingCharges),
    }

    let specificData = {}

    if (jewelryType === "gold") {
      specificData = {
        goldWeight,
        goldKarat,
        goldPurity,
        makingCharges,
        estimatedValue: goldWeight * 6850 * (goldPurity / 100) + makingCharges + labourCharges + otherCharges,
      }
    } else {
      specificData = {
        totalGoldWeight,
        totalGoldKarat,
        totalDiamondWeight,
        diamondQuality,
        diamondCount,
        settingCharges,
        estimatedValue:
          totalGoldWeight * 6850 + totalDiamondWeight * 50000 + settingCharges + labourCharges + otherCharges,
      }
    }

    onReceive({ ...baseData, ...specificData })
    onClose()
  }

  const selectedKarigarData = karigars.find((k) => k.id === selectedKarigar)

  if (step === 1) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Receive Jewelry from Karigar
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Select Jewelry Type</h3>
              <div className="space-y-3">
                <Button
                  variant={jewelryType === "gold" ? "default" : "outline"}
                  className="w-full justify-start h-16"
                  onClick={() => setJewelryType("gold")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-900/30 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Gold Jewelry</p>
                      <p className="text-sm text-gray-400">Pure gold items, bangles, chains, etc.</p>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={jewelryType === "diamond" ? "default" : "outline"}
                  className="w-full justify-start h-16"
                  onClick={() => setJewelryType("diamond")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Diamond Jewelry</p>
                      <p className="text-sm text-gray-400">Diamond sets, rings, earrings, etc.</p>
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleNext} disabled={!jewelryType}>
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-gray-800 border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Receive {jewelryType === "gold" ? "Gold" : "Diamond"} Jewelry
            <Button variant="ghost" size="sm" onClick={onClose}>
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
                <label className="block text-sm font-medium text-gray-400 mb-2">Karigar *</label>
                <Select value={selectedKarigar} onValueChange={setSelectedKarigar}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select karigar" />
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

              {selectedKarigarData && (
                <div className="p-3 bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Karigar Balance</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Gold:</span>
                      <span className="text-yellow-400 ml-2">{selectedKarigarData.goldBalance}g</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Diamond:</span>
                      <span className="text-blue-400 ml-2">{selectedKarigarData.diamondBalance}ct</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Order Reference (Optional)</label>
                <Input
                  value={orderReference}
                  onChange={(e) => setOrderReference(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="KO001, KO002, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Item Name *</label>
                <Input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="e.g., Diamond Necklace Set"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  rows={3}
                  placeholder="Detailed description of the jewelry..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Quality Rating</label>
                <Select value={qualityRating} onValueChange={setQualityRating}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Rate the quality" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="needs-rework">Needs Rework</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Jewelry Specific Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                {jewelryType === "gold" ? "Gold" : "Diamond"} Jewelry Details
              </h3>

              {jewelryType === "gold" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Gold Weight (grams) *</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={goldWeight || ""}
                        onChange={(e) => setGoldWeight(Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-white"
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
                          <SelectItem value="24">24K</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Gold Purity (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={goldPurity || ""}
                      onChange={(e) => setGoldPurity(Number(e.target.value))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="e.g., 91.6 for 22K"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Making Charges</label>
                    <Input
                      type="number"
                      value={makingCharges || ""}
                      onChange={(e) => setMakingCharges(Number(e.target.value))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Total Gold Weight (grams)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={totalGoldWeight || ""}
                        onChange={(e) => setTotalGoldWeight(Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Gold Karat</label>
                      <Select value={totalGoldKarat} onValueChange={setTotalGoldKarat}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="18">18K</SelectItem>
                          <SelectItem value="20">20K</SelectItem>
                          <SelectItem value="22">22K</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Total Diamond Weight (carats) *
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        value={totalDiamondWeight || ""}
                        onChange={(e) => setTotalDiamondWeight(Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Diamond Count</label>
                      <Input
                        type="number"
                        value={diamondCount || ""}
                        onChange={(e) => setDiamondCount(Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Diamond Quality</label>
                    <Select value={diamondQuality} onValueChange={setDiamondQuality}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="1no">1 no (EF VVS)</SelectItem>
                        <SelectItem value="2no">2 no (EFG VVS-VS)</SelectItem>
                        <SelectItem value="3no">3 no (FGH VS-SI)</SelectItem>
                        <SelectItem value="4no">4 no (GHI-I)</SelectItem>
                        <SelectItem value="5no">5 no (Shade)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Setting Charges</label>
                    <Input
                      type="number"
                      value={settingCharges || ""}
                      onChange={(e) => setSettingCharges(Number(e.target.value))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
              )}

              {/* Charges Section */}
              <div className="p-4 bg-gray-700 rounded-lg space-y-3">
                <h4 className="font-medium text-green-400">Charges & Payment</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Labour Charges</label>
                    <Input
                      type="number"
                      value={labourCharges || ""}
                      onChange={(e) => setLabourCharges(Number(e.target.value))}
                      className="bg-gray-600 border-gray-500 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Other Charges</label>
                    <Input
                      type="number"
                      value={otherCharges || ""}
                      onChange={(e) => setOtherCharges(Number(e.target.value))}
                      className="bg-gray-600 border-gray-500 text-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Total Charges</label>
                  <Input
                    type="number"
                    value={labourCharges + otherCharges + (jewelryType === "gold" ? makingCharges : settingCharges)}
                    className="bg-gray-600 border-gray-500 text-white text-sm"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  rows={2}
                  placeholder="Additional notes..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleReceive} disabled={!selectedKarigar || !itemName}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Receive Jewelry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
