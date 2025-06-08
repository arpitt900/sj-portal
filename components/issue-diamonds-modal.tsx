"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"

interface IssueDiamondsModalProps {
  orderId: string
  orderName: string
  karigarName: string
  requiredWeight: number
  requiredQuality: string
  onClose: () => void
  onIssue: (data: any) => void
}

export default function IssueDiamondsModal({
  orderId,
  orderName,
  karigarName,
  requiredWeight,
  requiredQuality,
  onClose,
  onIssue,
}: IssueDiamondsModalProps) {
  const [actualWeight, setActualWeight] = useState<number>(requiredWeight)
  const [quality, setQuality] = useState<string>(requiredQuality)
  const [weightDifference, setWeightDifference] = useState<number>(0)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<"warning" | "error">("warning")
  const [alertMessage, setAlertMessage] = useState<string>("")

  useEffect(() => {
    const diff = Number((actualWeight - requiredWeight).toFixed(2))
    setWeightDifference(diff)

    if (diff !== 0) {
      setShowAlert(true)
      if (Math.abs(diff) > requiredWeight * 0.1) {
        // If difference is more than 10% of required weight
        setAlertType("error")
        setAlertMessage(
          `Warning: The actual diamond weight differs by ${Math.abs(diff)} carats (${Math.abs(
            (diff / requiredWeight) * 100,
          ).toFixed(1)}%) from the required weight!`,
        )
      } else {
        setAlertType("warning")
        setAlertMessage(
          `Note: The actual diamond weight differs by ${Math.abs(diff)} carats (${Math.abs(
            (diff / requiredWeight) * 100,
          ).toFixed(1)}%) from the required weight.`,
        )
      }
    } else {
      setShowAlert(false)
    }
  }, [actualWeight, requiredWeight])

  const handleIssue = () => {
    onIssue({
      orderId,
      actualWeight,
      quality,
      weightDifference,
      issueDate: new Date(),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Issue Diamonds for Order
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Order ID: {orderId}</p>
            <p className="text-sm text-gray-400">Item: {orderName}</p>
            <p className="text-sm text-gray-400">Karigar: {karigarName}</p>
          </div>

          <div className="p-3 bg-gray-700 rounded-lg">
            <h4 className="font-medium text-white mb-2">Required Diamonds</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Weight:</span>
                <span className="text-blue-400 ml-2">{requiredWeight} carats</span>
              </div>
              <div>
                <span className="text-gray-400">Quality:</span>
                <span className="text-blue-400 ml-2">{requiredQuality}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Actual Diamond Weight (carats)</label>
              <Input
                type="number"
                step="0.01"
                value={actualWeight}
                onChange={(e) => setActualWeight(Number(e.target.value))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Diamond Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              >
                <option value="1no">1 no (EF VVS)</option>
                <option value="2no">2 no (EFG VVS-VS)</option>
                <option value="3no">3 no (FGH VS-SI)</option>
                <option value="4no">4 no (GHI-I)</option>
                <option value="5no">5 no (Shade)</option>
              </select>
            </div>
          </div>

          {showAlert && (
            <div
              className={`p-3 rounded-lg flex items-start gap-2 ${
                alertType === "error"
                  ? "bg-red-900/30 border border-red-700"
                  : "bg-yellow-900/30 border border-yellow-700"
              }`}
            >
              <AlertCircle className={`h-5 w-5 mt-0.5 ${alertType === "error" ? "text-red-400" : "text-yellow-400"}`} />
              <p className={`text-sm ${alertType === "error" ? "text-red-300" : "text-yellow-300"}`}>{alertMessage}</p>
            </div>
          )}

          {weightDifference !== 0 && (
            <div className="p-3 bg-gray-700 rounded-lg">
              <h4 className="font-medium text-white mb-2">Weight Difference</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-400">Difference:</span>
                  <span
                    className={`ml-2 ${
                      weightDifference > 0 ? "text-green-400" : weightDifference < 0 ? "text-red-400" : "text-white"
                    }`}
                  >
                    {weightDifference > 0 ? "+" : ""}
                    {weightDifference} carats
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Percentage:</span>
                  <span
                    className={`ml-2 ${
                      weightDifference > 0 ? "text-green-400" : weightDifference < 0 ? "text-red-400" : "text-white"
                    }`}
                  >
                    {weightDifference > 0 ? "+" : ""}
                    {((weightDifference / requiredWeight) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleIssue}>Issue Diamonds</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
