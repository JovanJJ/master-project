"use client"

import { useState } from "react"

export default function ToggleButton() {
  const [enabled, setEnabled] = useState(false)

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 cursor-pointer ${
        enabled ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  )
}