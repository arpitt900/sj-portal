import { createClient } from "@supabase/supabase-js"

async function checkSupabaseConnection() {
  try {
    console.log("Checking Supabase connection...")

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables")
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test the connection by fetching a small amount of data
    console.log("Attempting to fetch data from Supabase...")
    const { data, error } = await supabase.from("karigars").select("id").limit(1)

    if (error) {
      console.error("Supabase connection error:", error)
      throw error
    }

    console.log("Supabase connection successful!")
    console.log("Retrieved data:", data)

    // List all tables
    console.log("\nListing available tables:")
    const { data: tables, error: tablesError } = await supabase.rpc("list_tables")

    if (tablesError) {
      console.error("Error listing tables:", tablesError)
    } else {
      console.log("Available tables:", tables)
    }

    return true
  } catch (error) {
    console.error("Supabase connection check failed:", error)
    return false
  }
}

// Run the check
checkSupabaseConnection()
