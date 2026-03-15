"use client"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"

export default function Providers({ children }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  )
}
