"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"

// Use environment variables for better security (set these in your .env.local or hosting environment)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xjrvjnocjchzckzbvtsj.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ".eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcnZqbm9jamNoemNremJ2dHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDE2MzIsImV4cCI6MjA2ODIxNzYzMn0.dyMiPuOtx_HZ6P2an6_QFkhSaNYv4uX3e-yWKgIkReQ"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function VisitorTracker() {
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentIp, setCurrentIp] = useState<string | null>(null)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // 1. Fetch visitor's IP address
        const ipResponse = await fetch("https://api.ipify.org?format=json")
        if (!ipResponse.ok) throw new Error(`Failed to fetch IP: ${ipResponse.statusText}`)
        const ipData = await ipResponse.json()
        const ipAddress = ipData.ip
        setCurrentIp(ipAddress)

        // 2. Check if IP exists in "visitors" table
        const { data: existingVisitors, error: selectError } = await supabase
          .from("visitors")
          .select("ip_address")
          .eq("ip_address", ipAddress)

        if (selectError) throw new Error(`Supabase select error: ${selectError.message}`)

        // 3. Insert if IP does not exist
        if (!existingVisitors || existingVisitors.length === 0) {
          const { error: insertError } = await supabase
            .from("visitors")
            .insert({ ip_address: ipAddress })

          if (insertError) {
            if (insertError.code === "23505") {
              // Unique violation - likely concurrent insert, ignore
              console.warn("IP already exists (concurrent insert)")
            } else {
              throw new Error(`Supabase insert error: ${insertError.message}`)
            }
          }
        }

        // 4. Fetch total unique visitors count
        const { count, error: countError } = await supabase
          .from("visitors")
          .select("ip_address", { count: "exact", head: true })

        if (countError) throw new Error(`Supabase count error: ${countError.message}`)

        setUniqueVisitors(count ?? 0)
      } catch (err) {
        console.error("Error tracking visitor:", err)
        setError(err instanceof Error ? err.message : "Unknown error occurred.")
        setUniqueVisitors(0)
      }
    }

    trackVisitor()
  }, [])

  if (error) {
    return (
      <Card className="w-full max-w-xs mx-auto bg-destructive/10 border-destructive text-destructive">
        <CardContent className="p-4 flex items-center gap-2">
          <Eye className="w-5 h-5" />
          <p>Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (uniqueVisitors === null) {
    return (
      <Card className="w-full max-w-xs mx-auto bg-card border-primary/20">
        <CardContent className="p-4 flex items-center gap-2 text-foreground/60">
          <Eye className="w-5 h-5 animate-pulse" />
          <p>Loading visitors...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-xs mx-auto bg-card border-primary/20 shadow-lg">
      <CardContent className="p-4 flex items-center gap-2 text-foreground/80">
        <Eye className="w-5 h-5 text-primary" />
        <span className="font-semibold text-lg">{uniqueVisitors.toLocaleString()}</span>
        <span className="text-sm text-foreground/60">unique visitors</span>
      </CardContent>
    </Card>
  )
}
