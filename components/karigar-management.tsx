"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, Search, Filter, ArrowUpDown, CalendarClock } from "lucide-react"
import IssueDiamondsModal from "./issue-diamonds-modal"
import IssueGoldModal from "./issue-gold-modal"
import ReceiveJewelryModal from "./receive-jewelry-modal"
import KarigarLedger from "./karigar-ledger"
import { createClientSupabaseClient } from "@/lib/supabase"
import { getKarigars, getKarigarOrders, updateKarigarOrder } from "@/lib/db"

export default function KarigarManagement() {
  const [karigars, setKarigars] = useState([])
  const [karigarOrders, setKarigarOrders] = useState([])
  const [selectedKarigar, setSelectedKarigar] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [scheduleNotes, setScheduleNotes] = useState("")
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const karigarData = await getKarigars()
        const orderData = await getKarigarOrders()
        setKarigars(karigarData)
        setKarigarOrders(orderData)

        // Set up real-time subscription for orders
        const supabase = createClientSupabaseClient()

        const orderSubscription = supabase
          .channel("karigar_orders_changes")
          .on("postgres_changes", { event: "*", schema: "public", table: "karigar_orders" }, async (payload) => {
            console.log("Change received!", payload)
            // Refresh orders when changes occur
            const updatedOrders = await getKarigarOrders()
            setKarigarOrders(updatedOrders)
          })
          .subscribe()

        return () => {
          supabase.removeChannel(orderSubscription)
        }
      } catch (error) {
        console.error("Error fetching karigar data:", error)
      }
    }

    fetchData()
  }, [])

  const filteredKarigars = karigars.filter(
    (karigar) =>
      karigar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      karigar.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      karigar.specialization.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleScheduleOrder = async () => {
    if (!selectedOrderId || !selectedDate) return

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")

      await updateKarigarOrder(selectedOrderId, {
        expected_delivery: formattedDate,
        notes: scheduleNotes,
      })

      // The real-time subscription will update the UI
      setIsScheduleModalOpen(false)
      setSelectedDate(null)
      setScheduleNotes("")
      setSelectedOrderId(null)
    } catch (error) {
      console.error("Error scheduling order:", error)
    }
  }

  const openScheduleModal = (orderId) => {
    setSelectedOrderId(orderId)
    setIsScheduleModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Karigar Management</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-600">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Karigar
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search karigars by name, ID or specialization..."
                className="pl-8 bg-gray-700 border-gray-600 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredKarigars.map((karigar) => (
              <Card
                key={karigar.id}
                className="bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-650 transition-colors"
                onClick={() => setSelectedKarigar(karigar)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{karigar.name}</h3>
                      <p className="text-sm text-gray-400">ID: {karigar.id}</p>
                      <p className="text-sm text-gray-400">Phone: {karigar.phone}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {karigar.specialization.map((spec) => (
                          <Badge key={spec} variant="outline" className="bg-gray-600 text-gray-300">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        Active Orders: <span className="text-amber-400">{karigar.active_orders}</span>
                      </p>
                      <p className="text-sm text-gray-400">
                        Rating: <span className="text-green-400">{karigar.rating}/5</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedKarigar && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>
                {selectedKarigar.name} - Details
                <Badge variant="outline" className="ml-2 bg-blue-900 text-blue-300 border-blue-700">
                  {selectedKarigar.id}
                </Badge>
              </span>
              <div className="flex gap-2">
                <IssueDiamondsModal karigarId={selectedKarigar.id} />
                <IssueGoldModal karigarId={selectedKarigar.id} />
                <ReceiveJewelryModal karigarId={selectedKarigar.id} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="orders">
              <TabsList className="bg-gray-700 border-gray-600">
                <TabsTrigger value="orders">Active Orders</TabsTrigger>
                <TabsTrigger value="inventory">Material Inventory</TabsTrigger>
                <TabsTrigger value="ledger">Ledger</TabsTrigger>
                <TabsTrigger value="history">Order History</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="mt-4">
                <div className="space-y-4">
                  {karigarOrders
                    .filter((order) => order.karigar_id === selectedKarigar.id && order.status !== "completed")
                    .map((order) => (
                      <Card key={order.id} className="bg-gray-700 border-gray-600">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-white">Order #{order.id}</h3>
                              <p className="text-sm text-gray-400">{order.description}</p>
                              <div className="mt-2 space-y-1">
                                <p className="text-sm text-gray-400">
                                  Gold: {order.gold_issued}g ({order.gold_karat}K)
                                </p>
                                {order.diamond_issued > 0 && (
                                  <p className="text-sm text-gray-400">Diamonds: {order.diamond_issued}ct</p>
                                )}
                                <p className="text-sm text-gray-400">
                                  Labour: ₹{order.labour_charges.toLocaleString()}
                                </p>
                              </div>
                              <div className="mt-2">
                                <Badge
                                  className={`
                                    ${order.status === "in-progress" ? "bg-amber-900 text-amber-300 border-amber-700" : ""}
                                    ${order.status === "qc-pending" ? "bg-purple-900 text-purple-300 border-purple-700" : ""}
                                    ${order.status === "issued" ? "bg-blue-900 text-blue-300 border-blue-700" : ""}
                                  `}
                                >
                                  {order.status === "in-progress" ? "In Progress" : ""}
                                  {order.status === "qc-pending" ? "QC Pending" : ""}
                                  {order.status === "issued" ? "Materials Issued" : ""}
                                </Badge>
                                <Badge variant="outline" className="ml-2 bg-gray-600 text-gray-300">
                                  {order.current_stage}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-400">Order Date: {order.order_date}</p>
                              <p className="text-sm text-gray-400">
                                Expected: {order.expected_delivery || "Not scheduled"}
                              </p>
                              <div className="mt-2 space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-gray-600"
                                  onClick={() => openScheduleModal(order.id)}
                                >
                                  <CalendarClock className="h-4 w-4 mr-2" />
                                  Schedule
                                </Button>
                                <Button size="sm" variant="outline" className="border-gray-600">
                                  Update
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="inventory" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-2">Gold Inventory</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Current Balance:</span>
                          <span className="text-yellow-400 font-semibold">{selectedKarigar.gold_balance}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Issue:</span>
                          <span className="text-gray-300">25.5g (2 days ago)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Issued (MTD):</span>
                          <span className="text-gray-300">125.8g</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-2">Diamond Inventory</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Current Balance:</span>
                          <span className="text-blue-400 font-semibold">{selectedKarigar.diamond_balance}ct</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Issue:</span>
                          <span className="text-gray-300">2.5ct (5 days ago)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Issued (MTD):</span>
                          <span className="text-gray-300">8.75ct</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="ledger" className="mt-4">
                <KarigarLedger karigarId={selectedKarigar.id} />
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <div className="space-y-4">
                  {karigarOrders
                    .filter((order) => order.karigar_id === selectedKarigar.id && order.status === "completed")
                    .map((order) => (
                      <Card key={order.id} className="bg-gray-700 border-gray-600">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-white">Order #{order.id}</h3>
                              <p className="text-sm text-gray-400">{order.description}</p>
                              <div className="mt-2 space-y-1">
                                <p className="text-sm text-gray-400">
                                  Gold: {order.gold_issued}g ({order.gold_karat}K)
                                </p>
                                {order.diamond_issued > 0 && (
                                  <p className="text-sm text-gray-400">Diamonds: {order.diamond_issued}ct</p>
                                )}
                                <p className="text-sm text-gray-400">
                                  Labour: ₹{order.labour_charges.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-900 text-green-300 border-green-700">Completed</Badge>
                              <p className="text-sm text-gray-400 mt-1">
                                Completed: {order.completion_date || "Unknown"}
                              </p>
                              <Button size="sm" variant="outline" className="mt-2 border-gray-600">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Schedule Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Schedule Delivery Date</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="date">Select Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal border-gray-600 ${
                      !selectedDate && "text-gray-400"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="bg-gray-700 text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any special instructions or notes..."
                className="bg-gray-700 border-gray-600 text-white"
                value={scheduleNotes}
                onChange={(e) => setScheduleNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" className="border-gray-600" onClick={() => setIsScheduleModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleOrder} disabled={!selectedDate}>
              Schedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
