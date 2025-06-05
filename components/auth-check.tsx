"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const authenticated = sessionStorage.getItem("authenticated") === "true"
    setIsAuthenticated(authenticated)

    // If not authenticated and not on login page, redirect to login
    if (!authenticated && pathname !== "/login") {
      router.push("/login")
    }
  }, [router, pathname])

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Loading...</span>
      </div>
    )
  }

  // If not authenticated and not on login page, don't render children
  if (!isAuthenticated && pathname !== "/login") {
    return null
  }

  // Otherwise, render children
  return <>{children}</>
}
