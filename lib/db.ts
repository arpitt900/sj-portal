import { createServerSupabaseClient, createClientSupabaseClient } from "./supabase"

interface QueryResult {
  rows: any[]
  rowCount: number
}

// Initialize Supabase database
export async function initDatabase() {
  try {
    console.log("Initializing database connection...")

    // Check if we're in a browser environment and use client-side variables
    const isClient = typeof window !== "undefined"

    if (isClient) {
      // Use client-side environment variables
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        console.log("Supabase client environment variables not found, using mock data")
        return initMockDatabase()
      }

      const supabase = createClientSupabaseClient()
      const { data, error } = await supabase.from("karigars").select("id").limit(1)

      if (error) {
        console.error("Supabase connection error:", error)
        console.log("Falling back to mock data")
        return initMockDatabase()
      }
    } else {
      // Server-side initialization
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("karigars").select("id").limit(1)

      if (error) {
        console.error("Supabase connection error:", error)
        throw error
      }
    }

    console.log("Database connection initialized successfully")
    return true
  } catch (error) {
    console.error("Database initialization error:", error)
    console.log("Using mock data for development")
    return initMockDatabase()
  }
}

// Mock database initialization for development/fallback
function initMockDatabase() {
  console.log("Initializing mock database...")
  // Mock data is already available in the query function
  return true
}

// Generic query function that maps to Supabase or falls back to mock data
export async function query(text: string, params?: any[]): Promise<QueryResult> {
  try {
    const start = Date.now()

    // Check if Supabase is available
    const isClient = typeof window !== "undefined"
    const supabaseUrl = isClient ? process.env.NEXT_PUBLIC_SUPABASE_URL : process.env.SUPABASE_URL

    if (!supabaseUrl) {
      // Fall back to mock data
      return queryMockData(text, params)
    }

    const supabase = isClient ? createClientSupabaseClient() : createServerSupabaseClient()

    // Parse the query to determine what to do
    const lowerText = text.toLowerCase().trim()
    const result: QueryResult = { rows: [], rowCount: 0 }

    // Handle SELECT queries
    if (lowerText.startsWith("select")) {
      let tableName = ""

      // Extract table name from query
      if (lowerText.includes("from karigars")) tableName = "karigars"
      else if (lowerText.includes("from karigar_orders")) tableName = "karigar_orders"
      else if (lowerText.includes("from clients")) tableName = "clients"
      else if (lowerText.includes("from inventory")) tableName = "inventory"
      else if (lowerText.includes("from transactions")) tableName = "transactions"
      else if (lowerText.includes("from harvest_plans")) tableName = "harvest_plans"

      if (tableName) {
        let query = supabase.from(tableName).select("*")

        // Handle WHERE clauses
        if (lowerText.includes("where")) {
          if (lowerText.includes("where id =") && params && params.length > 0) {
            query = query.eq("id", params[0])
          } else if (lowerText.includes("where client_id =") && params && params.length > 0) {
            query = query.eq("client_id", params[0])
          }
        }

        const { data, error, count } = await query

        if (error) throw error

        result.rows = data || []
        result.rowCount = count || (data ? data.length : 0)
      }
    }

    const duration = Date.now() - start
    console.log("Executed database query", { text: text.substring(0, 100), duration, rows: result.rowCount })

    return result
  } catch (error) {
    console.error("Database query error:", error)
    // Fall back to mock data on error
    return queryMockData(text, params)
  }
}

// Mock data query function
function queryMockData(text: string, params?: any[]): QueryResult {
  console.log("Using mock data for query:", text.substring(0, 50))

  const mockData = {
    karigars: [
      {
        id: 1,
        name: "Rajesh Kumar",
        phone: "+91-9876543210",
        specialization: "Gold Jewelry",
        status: "active",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Priya Sharma",
        phone: "+91-9876543211",
        specialization: "Diamond Setting",
        status: "active",
        rating: 4.9,
      },
      {
        id: 3,
        name: "Amit Patel",
        phone: "+91-9876543212",
        specialization: "Silver Work",
        status: "busy",
        rating: 4.7,
      },
    ],
    karigar_orders: [
      {
        id: 1,
        karigar_id: 1,
        item_type: "Ring",
        gold_weight: 5.2,
        diamond_count: 1,
        status: "in_progress",
        due_date: "2024-01-15",
      },
      {
        id: 2,
        karigar_id: 2,
        item_type: "Necklace",
        gold_weight: 12.5,
        diamond_count: 8,
        status: "pending",
        due_date: "2024-01-20",
      },
    ],
    clients: [
      {
        id: 1,
        name: "Anita Desai",
        phone: "+91-9876543220",
        email: "anita@example.com",
        address: "Mumbai",
        status: "active",
      },
      {
        id: 2,
        name: "Vikram Singh",
        phone: "+91-9876543221",
        email: "vikram@example.com",
        address: "Delhi",
        status: "active",
      },
    ],
    inventory: [
      {
        id: 1,
        item_name: "Gold Ring",
        category: "Rings",
        quantity: 25,
        weight: 125.5,
        purity: "22K",
        status: "available",
      },
      {
        id: 2,
        item_name: "Diamond Necklace",
        category: "Necklaces",
        quantity: 8,
        weight: 45.2,
        purity: "18K",
        status: "available",
      },
    ],
    transactions: [
      { id: 1, type: "sale", amount: 50000, client_id: 1, date: "2024-01-10", status: "completed" },
      { id: 2, type: "purchase", amount: 25000, supplier_id: 1, date: "2024-01-08", status: "completed" },
    ],
    harvest_plans: [
      {
        id: 1,
        client_id: 1,
        plan_name: "Wedding Collection",
        target_amount: 100000,
        current_amount: 25000,
        status: "active",
      },
      {
        id: 2,
        client_id: 2,
        plan_name: "Anniversary Special",
        target_amount: 75000,
        current_amount: 15000,
        status: "active",
      },
    ],
  }

  const lowerText = text.toLowerCase().trim()
  let tableName = ""

  // Extract table name
  if (lowerText.includes("from karigars")) tableName = "karigars"
  else if (lowerText.includes("from karigar_orders")) tableName = "karigar_orders"
  else if (lowerText.includes("from clients")) tableName = "clients"
  else if (lowerText.includes("from inventory")) tableName = "inventory"
  else if (lowerText.includes("from transactions")) tableName = "transactions"
  else if (lowerText.includes("from harvest_plans")) tableName = "harvest_plans"

  const data = mockData[tableName as keyof typeof mockData] || []

  return {
    rows: data,
    rowCount: data.length,
  }
}

// Helper functions for data access
export async function getKarigars() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("karigars").select("*")

  if (error) throw error
  return data || []
}

export async function getKarigarOrders() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("karigar_orders").select("*")

  if (error) throw error
  return data || []
}

export async function getKarigarById(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("karigars").select("*").eq("id", id).single()

  if (error) throw error
  return data
}

export async function updateKarigarOrder(orderId: string, updates: any) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("karigar_orders").update(updates).eq("id", orderId).select().single()

  if (error) throw error
  return data
}

export async function createKarigarOrder(orderData: any) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("karigar_orders").insert(orderData).select().single()

  if (error) throw error
  return data
}

// Additional helper functions for other entities
export async function getClients() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("clients").select("*")

  if (error) throw error
  return data || []
}

export async function getClientById(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("clients").select("*").eq("id", id).single()

  if (error) throw error
  return data
}

export async function getInventory() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("inventory").select("*")

  if (error) throw error
  return data || []
}

export async function getInventoryById(id: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("inventory").select("*").eq("id", id).single()

  if (error) throw error
  return data
}

export async function getTransactions() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("transactions").select("*")

  if (error) throw error
  return data || []
}

export async function getHarvestPlans() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("harvest_plans").select("*")

  if (error) throw error
  return data || []
}

export async function getHarvestPlansByClientId(clientId: string) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("harvest_plans").select("*").eq("client_id", clientId)

  if (error) throw error
  return data || []
}

// For backward compatibility with the mock implementation
export async function getClient() {
  return {
    query: query,
    release: () => console.log("Supabase client released"),
  }
}
