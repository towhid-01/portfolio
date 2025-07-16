"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX" // Replace with your actual GA4 Measurement ID

export const GoogleAnalytics = () => {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}

export const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)

  useEffect(() => {
    // This is a placeholder implementation
    // In a real scenario, you would fetch this from your analytics API
    // For now, we'll simulate a visitor count
    const fetchVisitorCount = async () => {
      try {
        // Replace this with actual Google Analytics API call
        // For demonstration, using localStorage to simulate persistent count
        const stored = localStorage.getItem("visitor-count")
        const baseCount = 1248 // Starting count
        const currentCount = stored ? Number.parseInt(stored) : baseCount

        // Check if this is a new session
        const lastVisit = localStorage.getItem("last-visit")
        const now = Date.now()
        const oneHour = 60 * 60 * 1000 // 1 hour in milliseconds

        if (!lastVisit || now - Number.parseInt(lastVisit) > oneHour) {
          const newCount = currentCount + 1
          localStorage.setItem("visitor-count", newCount.toString())
          localStorage.setItem("last-visit", now.toString())
          setVisitorCount(newCount)
        } else {
          setVisitorCount(currentCount)
        }
      } catch (error) {
        console.error("Error fetching visitor count:", error)
        setVisitorCount(1248) // Fallback count
      }
    }

    fetchVisitorCount()
  }, [])

  if (visitorCount === null) return null

  return (
    <div className="flex items-center gap-2 text-foreground/60 text-sm">
      <span>👁️</span>
      <span>{visitorCount.toLocaleString()} visitors</span>
    </div>
  )
}
