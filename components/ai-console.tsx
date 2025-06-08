"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Mic, MicOff, AlertTriangle, TrendingUp, Package, Users, Zap, Brain, Shield } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai" | "system"
  content: string
  timestamp: Date
  category?: "analysis" | "alert" | "suggestion" | "query"
}

export default function AIConsole() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "AI Console initialized. Ready to assist with Shreeji Jewels operations.",
      timestamp: new Date(),
      category: "query",
    },
    {
      id: "2",
      type: "ai",
      content:
        "Good morning! I've analyzed today's data. Here are key insights:\n\n• Stock Alert: Diamond rings below threshold (4 pieces remaining)\n• Sales Trend: 23% increase in gold jewelry this week\n• Pending: 3 orders due for delivery today\n• Recommendation: Contact Mrs. Sharma for her anniversary (tomorrow)",
      timestamp: new Date(),
      category: "analysis",
    },
  ])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const aiCapabilities = [
    { icon: Brain, label: "Smart Analytics", description: "Real-time business insights" },
    { icon: Shield, label: "Theft Detection", description: "Stock anomaly monitoring" },
    { icon: TrendingUp, label: "Sales Prediction", description: "Demand forecasting" },
    { icon: Users, label: "Client Intelligence", description: "Personalized recommendations" },
    { icon: Package, label: "Inventory AI", description: "Automated stock management" },
    { icon: Zap, label: "Quick Actions", description: "Voice-activated commands" },
  ]

  const quickCommands = [
    "Show today's sales summary",
    "Check low stock items",
    "Generate client birthday reminders",
    "Analyze gold price trends",
    "Find missing inventory items",
    "Create delivery schedule",
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
      category: "query",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      setMessages((prev) => [...prev, aiResponse])
      setIsProcessing(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase()

    let response = ""
    let category: "analysis" | "alert" | "suggestion" | "query" = "query"

    if (lowerQuery.includes("sales") || lowerQuery.includes("revenue")) {
      response = `📊 **Sales Analysis**\n\n• Today's Revenue: ₹2,45,000\n• Top Selling: Diamond Necklaces (5 units)\n• Growth: +15% vs last week\n• Peak Hours: 2-4 PM\n\n**Recommendations:**\n- Promote gold bangles (low sales today)\n- Contact premium clients for diamond collection`
      category = "analysis"
    } else if (lowerQuery.includes("stock") || lowerQuery.includes("inventory")) {
      response = `📦 **Stock Status**\n\n**Low Stock Alerts:**\n• Diamond Rings: 4 pieces (Reorder needed)\n• Gold Chains 22K: 7 pieces\n• Silver Bangles: 12 pieces\n\n**High Stock:**\n• Gold Earrings: 45 pieces\n• Loose Diamonds: 234 pieces\n\n**Action Required:** Place order for diamond rings from Vendor #3`
      category = "alert"
    } else if (lowerQuery.includes("client") || lowerQuery.includes("customer")) {
      response = `👥 **Client Intelligence**\n\n**Upcoming Events:**\n• Mrs. Sharma - Anniversary (Tomorrow)\n• Mr. Patel - Birthday (3 days)\n• Ms. Gupta - Wedding Anniversary (1 week)\n\n**Recommendations:**\n- Send personalized greetings\n- Suggest gift collections\n- Schedule follow-up calls`
      category = "suggestion"
    } else if (lowerQuery.includes("theft") || lowerQuery.includes("missing")) {
      response = `🚨 **Security Analysis**\n\n**Stock Verification:**\n• All high-value items accounted for\n• Last audit: 2 hours ago\n• Discrepancies: None detected\n\n**Monitoring:**\n- CCTV: Active\n- Tag Scanning: 99.8% accuracy\n- Access Logs: Normal patterns`
      category = "alert"
    } else {
      response = `🤖 I understand you're asking about "${query}". Here's what I can help with:\n\n• **Analytics**: Sales, profit, trends\n• **Inventory**: Stock levels, alerts, tracking\n• **Clients**: Reminders, preferences, history\n• **Security**: Theft detection, anomalies\n• **Operations**: Orders, deliveries, schedules\n\nPlease specify what you'd like to know more about!`
      category = "suggestion"
    }

    return {
      id: Date.now().toString(),
      type: "ai",
      content: response,
      timestamp: new Date(),
      category,
    }
  }

  const handleQuickCommand = (command: string) => {
    setInput(command)
    handleSendMessage()
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "analysis":
        return "bg-blue-900/30 border-blue-700"
      case "alert":
        return "bg-red-900/30 border-red-700"
      case "suggestion":
        return "bg-green-900/30 border-green-700"
      default:
        return "bg-gray-700 border-gray-600"
    }
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "analysis":
        return <TrendingUp className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      case "suggestion":
        return <Bot className="h-4 w-4" />
      default:
        return <Bot className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Capabilities Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiCapabilities.map((capability, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <capability.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{capability.label}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{capability.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Console */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Bot className="h-5 w-5 text-blue-400" />
                AI Console
                <Badge variant="outline" className="bg-green-900 text-green-300 border-green-700 ml-auto">
                  Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : message.type === "system"
                              ? "bg-gray-700 text-gray-300"
                              : `${getCategoryColor(message.category)} text-white`
                        }`}
                      >
                        {message.type === "ai" && (
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(message.category)}
                            <span className="text-xs font-medium opacity-75">AI Assistant</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        <div className="text-xs opacity-50 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-700 text-gray-300 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 animate-pulse" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask AI about sales, inventory, clients, or any business query..."
                    className="bg-gray-700 border-gray-600 text-white"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleListening}
                    className={`border-gray-600 ${isListening ? "bg-red-600" : "bg-gray-700"}`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!input.trim() || isProcessing}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Commands */}
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickCommands.map((command, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left border-gray-600 hover:bg-gray-700"
                    onClick={() => handleQuickCommand(command)}
                  >
                    <span className="text-sm">{command}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Status */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">AI Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Processing Power</span>
                  <Badge variant="outline" className="bg-green-900 text-green-300 border-green-700">
                    Optimal
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Data Sync</span>
                  <Badge variant="outline" className="bg-blue-900 text-blue-300 border-blue-700">
                    Real-time
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Security</span>
                  <Badge variant="outline" className="bg-green-900 text-green-300 border-green-700">
                    Protected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Last Update</span>
                  <span className="text-sm text-white">2 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
