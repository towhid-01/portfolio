"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Card, CardContent } from "@/components/ui/card"
import { Eye } from "lucide-react"

// ✅ Use only environment variables (set in .env.local or hosting)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: ReturnType<typeof createClient> | null = null

function getSupabase() {
  if (!supabase && supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabase
}

export function VisitorTracker() {
  const [uniqueVisitors, setUniqueVisitors] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentIp, setCurrentIp] = useState<string | null>(null)

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const supabaseClient = getSupabase()
        if (!supabaseClient) {
          // Supabase not configured - skip tracking but don't show error
          setUniqueVisitors(0)
          return
        }

        const ipResponse = await fetch("https://api.ipify.org?format=json")
        if (!ipResponse.ok) throw new Error(`Failed to fetch IP: ${ipResponse.statusText}`)
        const ipData = await ipResponse.json()
        const ipAddress = ipData.ip
        setCurrentIp(ipAddress)

        const { data: existingVisitors, error: selectError } = await supabaseClient
          .from("visitors")
          .select("ip_address")
          .eq("ip_address", ipAddress)

        if (selectError) throw new Error(`Supabase select error: ${selectError.message}`)

        if (!existingVisitors || existingVisitors.length === 0) {
          const { error: insertError } = await supabaseClient
            .from("visitors")
            .insert({ ip_address: ipAddress })

          if (insertError) {
            if (insertError.code === "23505") {
              console.warn("IP already exists (concurrent insert)")
            } else {
              throw new Error(`Supabase insert error: ${insertError.message}`)
            }
          }
        }

        const { count, error: countError } = await supabaseClient
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
