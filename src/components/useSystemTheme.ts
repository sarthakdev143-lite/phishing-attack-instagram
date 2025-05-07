"use client"

import { useEffect } from "react"

export function useSystemTheme() {
    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const root = document.documentElement

        if (prefersDark) {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
    }, [])
}
