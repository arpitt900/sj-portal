"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  AlertTriangle,
  Target,
  BarChart3,
  ShoppingCart,
  PieChart,
  Award,
} from "lucide-react"

export default function Analytics() {
  const todayMetrics = {
    goldRate: 6850,
    goldRateChange: 0.5,
    sales: 245000,
    salesChange: 12.3,
    purchases: 185000,
    purchasesChange: -5.2,
    profit: 60000,
    profitMargin: 24.5,
  }

  const stockAlerts = [
    { item: "Diamond Rings", current: 4, threshold: 10, severity: "high" },
    { item: "Gold Chains 22K", current: 7, threshold: 15, severity: "medium" },
    { item: "Silver Bangles", current: 12, threshold: 20, severity: "low" },
  ]

  const topSellingItems = [
    { name: "Diamond Necklace Sets", sales: 5, revenue: 1225000 },
    { name: "Gold Bangles", sales: 8, revenue: 680000 },
    { name: "Diamond Earrings", sales: 12, revenue: 540000 },
    { name: "Gold Chains", sales: 6, revenue: 420000 },
  ]

  const clientInsights = [
    { metric: "New Clients This Month", value: 23, change: 15.2 },
    { metric: "Repeat Customers", value: 67, change: 8.7 },
    { metric: "Average Order Value", value: 125000, change: 22.1 },
    { metric: "Client Satisfaction", value: 94.5, change: 2.3 },
  ]

  const salesAnalysisData = {
    totalRevenue: 1850000,
    numberOfSales: 120,
    averageOrderValue: 15416,
    profitMargin: 32.5,
    salesByCategory: [
      { category: "Diamond Jewelry", revenue: 850000, unitsSold: 45, color: "text-blue-400" },
      { category: "Gold Jewelry", revenue: 650000, unitsSold: 55, color: "text-yellow-400" },
      { category: "Loose Diamonds", revenue: 200000, unitsSold: 12, color: "text-purple-400" },
      { category: "Pure Gold", revenue: 150000, unitsSold: 8, color: "text-orange-400" },
    ],
    monthlySalesTrend: [
      { month: "Jan", sales: 150000 },
      { month: "Feb", sales: 180000 },
      { month: "Mar", sales: 220000 },
      { month: "Apr", sales: 190000 },
      { month: "May", sales: 250000 },
      { month: "Jun", sales: 1850000 / 6 }, // Placeholder for current month average
    ],
    topPerformingItems: [
      { name: "Emerald Cut Diamond Ring", revenue: 120000, units: 3 },
      { name: "24K Gold Bar (10g)", revenue: 95000, units: 5 },
      { name: "Sapphire Pendant Necklace", revenue: 88000, units: 4 },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Today's Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Gold Rate Today</p>
                <p className="text-2xl font-bold text-yellow-500">₹{todayMetrics.goldRate}/g</p>
                <p
                  className={`text-sm flex items-center ${todayMetrics.goldRateChange > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {todayMetrics.goldRateChange > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(todayMetrics.goldRateChange)}%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Today's Sales</p>
                <p className="text-2xl font-bold text-green-500">₹{(todayMetrics.sales / 100000).toFixed(1)}L</p>
                <p className="text-sm text-green-500 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />+{todayMetrics.salesChange}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Today's Purchases</p>
                <p className="text-2xl font-bold text-blue-500">₹{(todayMetrics.purchases / 100000).toFixed(1)}L</p>
                <p className="text-sm text-red-500 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  {todayMetrics.purchasesChange}%
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Today's Profit</p>
                <p className="text-2xl font-bold text-purple-500">₹{(todayMetrics.profit / 1000).toFixed(0)}K</p>
                <p className="text-sm text-gray-400">Margin: {todayMetrics.profitMargin}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Analysis</TabsTrigger>
          <TabsTrigger value="clients">Client Analytics</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stock Alerts */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Stock Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{alert.item}</p>
                        <p className="text-sm text-gray-400">
                          Current: {alert.current} | Threshold: {alert.threshold}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          alert.severity === "high"
                            ? "bg-red-900 text-red-300 border-red-700"
                            : alert.severity === "medium"
                              ? "bg-yellow-900 text-yellow-300 border-yellow-700"
                              : "bg-blue-900 text-blue-300 border-blue-700"
                        }
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Selling Items */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  Top Selling Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSellingItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-gray-400">{item.sales} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-500">₹{(item.revenue / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">AI-Powered Business Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                  <h3 className="font-semibold text-blue-400 mb-2">Sales Trend</h3>
                  <p className="text-sm text-gray-300">
                    Diamond jewelry sales are up 23% this week. Peak demand observed for traditional designs during
                    wedding season.
                  </p>
                </div>
                <div className="p-4 bg-green-900/30 border border-green-700 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">Inventory Optimization</h3>
                  <p className="text-sm text-gray-300">
                    Recommend increasing gold chain inventory by 30%. Current stock will deplete in 8 days based on
                    sales velocity.
                  </p>
                </div>
                <div className="p-4 bg-purple-900/30 border border-purple-700 rounded-lg">
                  <h3 className="font-semibold text-purple-400 mb-2">Client Behavior</h3>
                  <p className="text-sm text-gray-300">
                    High-value clients prefer appointments between 2-4 PM. Consider premium service slots during these
                    hours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          {/* Sales Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                <DollarSign className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ₹{(salesAnalysisData.totalRevenue / 100000).toFixed(1)}L
                </div>
                <p className="text-xs text-gray-500">+15.2% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Sales</CardTitle>
                <ShoppingCart className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{salesAnalysisData.numberOfSales}</div>
                <p className="text-xs text-gray-500">+10.0% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Avg. Order Value</CardTitle>
                <DollarSign className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ₹{salesAnalysisData.averageOrderValue.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500">+3.5% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Profit Margin</CardTitle>
                <TrendingUp className="h-5 w-5 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{salesAnalysisData.profitMargin}%</div>
                <p className="text-xs text-gray-500">+1.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales by Category */}
            <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-indigo-400" />
                  Sales by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesAnalysisData.salesByCategory.map((item) => (
                    <div key={item.category} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div>
                        <p className={`font-medium ${item.color}`}>{item.category}</p>
                        <p className="text-sm text-gray-400">{item.unitsSold} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">₹{(item.revenue / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Items */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Top Performing Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salesAnalysisData.topPerformingItems.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-700 rounded-lg">
                      <p className="font-medium text-white truncate">{item.name}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{item.units} units</span>
                        <span className="text-green-400 font-semibold">₹{item.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Trend - Simplified Text Version */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Monthly Sales Trend (Simplified)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-300">Sales are generally trending upwards over the past few months.</p>
                <p className="text-sm text-gray-400">
                  For detailed charts, consider integrating a charting library like Recharts or Chart.js.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {salesAnalysisData.monthlySalesTrend.map((m) => (
                    <Badge key={m.month} variant="outline" className="bg-gray-700 border-gray-600 text-gray-300">
                      {m.month}: ~₹{(m.sales / 1000).toFixed(0)}K
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">AI Predictions & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700 rounded-lg">
                  <h3 className="font-semibold text-blue-400 mb-3">Sales Forecast (Next 30 Days)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Predicted Revenue</p>
                      <p className="text-2xl font-bold text-white">₹1.2 Cr</p>
                      <p className="text-sm text-green-500">+18% vs last month</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Peak Sales Days</p>
                      <p className="text-lg font-bold text-white">Fri-Sun</p>
                      <p className="text-sm text-gray-400">Wedding season impact</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Top Category</p>
                      <p className="text-lg font-bold text-white">Diamond Sets</p>
                      <p className="text-sm text-gray-400">Bridal collection</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-900/30 to-teal-900/30 border border-green-700 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-3">Inventory Recommendations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Increase Gold Chain 22K stock</span>
                      <Badge className="bg-green-600">High Priority</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Reorder Diamond Rings (1-2ct)</span>
                      <Badge className="bg-yellow-600">Medium Priority</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Stock silver items for festival season</span>
                      <Badge className="bg-blue-600">Low Priority</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-700 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-3">Risk Alerts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="text-white">Gold price volatility expected next week</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <span className="text-white">3 high-value items pending delivery beyond due date</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                      <span className="text-white">Karigar workshop capacity at 95% - consider expansion</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientInsights.map((insight, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">{insight.metric}</p>
                      <p className="text-2xl font-bold text-white">
                        {insight.metric.includes("Value")
                          ? `₹${(insight.value / 1000).toFixed(0)}K`
                          : insight.metric.includes("Satisfaction")
                            ? `${insight.value}%`
                            : insight.value}
                      </p>
                      <p
                        className={`text-sm flex items-center ${insight.change > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {insight.change > 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(insight.change)}%
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Client Segmentation Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Premium Clients (₹5L+ annually)</h3>
                  <p className="text-3xl font-bold text-yellow-500">24</p>
                  <p className="text-sm text-gray-400">Contributing 68% of revenue</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Regular Clients (₹1-5L annually)</h3>
                  <p className="text-3xl font-bold text-blue-500">89</p>
                  <p className="text-sm text-gray-400">Contributing 25% of revenue</p>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Occasional Clients (&lt;₹1L annually)</h3>
                  <p className="text-3xl font-bold text-green-500">156</p>
                  <p className="text-sm text-gray-400">Contributing 7% of revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">AI Predictions & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700 rounded-lg">
                  <h3 className="font-semibold text-blue-400 mb-3">Sales Forecast (Next 30 Days)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Predicted Revenue</p>
                      <p className="text-2xl font-bold text-white">₹1.2 Cr</p>
                      <p className="text-sm text-green-500">+18% vs last month</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Peak Sales Days</p>
                      <p className="text-lg font-bold text-white">Fri-Sun</p>
                      <p className="text-sm text-gray-400">Wedding season impact</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Top Category</p>
                      <p className="text-lg font-bold text-white">Diamond Sets</p>
                      <p className="text-sm text-gray-400">Bridal collection</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-900/30 to-teal-900/30 border border-green-700 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-3">Inventory Recommendations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Increase Gold Chain 22K stock</span>
                      <Badge className="bg-green-600">High Priority</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Reorder Diamond Rings (1-2ct)</span>
                      <Badge className="bg-yellow-600">Medium Priority</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Stock silver items for festival season</span>
                      <Badge className="bg-blue-600">Low Priority</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-700 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-3">Risk Alerts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="text-white">Gold price volatility expected next week</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <span className="text-white">3 high-value items pending delivery beyond due date</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                      <span className="text-white">Karigar workshop capacity at 95% - consider expansion</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
