"use client"

import ProductCard from "@/components/ProductCard"
import products from "@/data.json"
import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "react-toastify"
import { QRCodeCanvas } from "qrcode.react"
import { FaMoon, FaStar, FaUsers, FaClock } from "react-icons/fa"

const SHEET_URL = "https://script.google.com/macros/s/AKfycbyyWSp1bGe3ZJmis_kak7IvFCJ4nhUUNKtbqc1ckGdfBOy0ZeGL9A2xaZRR8ad_sBZAUA/exec"
const SHEET_NAME = "ramzan_customers"
const UPI_ID = "9698584991sbi@ybl"
const AMOUNT_PAID = 1

export default function Home() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [showPay, setShowPay] = useState(false)
    const [saving, setSaving] = useState(false)
    const [status, setStatus] = useState("")
    const [preorders, setPreorders] = useState([])
    const [loadingPreorders, setLoadingPreorders] = useState(false)
    const tableRef = useRef(null)

    const upiLink = useMemo(() => {
        return `upi://pay?pa=${UPI_ID}&pn=HEMA%20BAKES&am=${AMOUNT_PAID}&cu=INR`
    }, [])
    const menuPdfUrl = "/HB%20Menu%20FSSAI.pdf"

    const startPayment = () => {
        setStatus("")
        if (!name || !phone || !address) {
            setStatus("Please fill all details before paying.")
            return
        }
        setShowPay(true)
        if (typeof window !== "undefined") {
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
            if (isMobile) {
                window.location.href = upiLink
            }
        }
    }

    const saveToSheet = async () => {
        setStatus("")
        if (!name || !phone || !address) {
            toast.error("Please fill all details", { autoClose: 5000 })
            return
        }
        if (!/^[0-9]{10}$/.test(phone.trim())) {
            toast.error("Invalid phone number", { autoClose: 5000 })
            return
        }
        if (preorders.length >= 10) {
            toast.error("Pre‑orders full (10/10)", { autoClose: 5000 })
            return
        }
        setSaving(true)
        try {
            const res = await fetch(SHEET_URL, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({
                    sheet: SHEET_NAME,
                    name,
                    phone,
                    address,
                    amountPaid: AMOUNT_PAID
                })
            })
            const text = await res.text()
            let ok = res.ok
            try {
                const data = JSON.parse(text)
                if (data?.success === false) ok = false
            } catch { }

            if (!ok) {
                throw new Error(text || `Request failed (${res.status})`)
            }

            setStatus("Saved! Your pre‑order is confirmed.")
            toast.success("Details saved to sheet", { autoClose: 5000 })
            await loadPreorders()
            setName("")
            setPhone("")
            setAddress("")
            setShowPay(false)
            setTimeout(() => {
                if (tableRef.current) {
                    tableRef.current.scrollIntoView({ behavior: "smooth" })
                }
            }, 100)
        } catch (e) {
            setStatus("Could not save. Please try again.")
            toast.error(e?.message || "Save failed", { autoClose: 5000 })
        } finally {
            setSaving(false)
        }
    }

    const loadPreorders = async () => {
        try {
            setLoadingPreorders(true)
            const res = await fetch(`${SHEET_URL}?sheet=${encodeURIComponent(SHEET_NAME)}`, { cache: "no-store" })
            const text = await res.text()
            let data = []
            try {
                const parsed = JSON.parse(text)
                data = parsed.rows || parsed.data || parsed || []
            } catch {
                data = []
            }
            const rows = Array.isArray(data) ? data : []
            setPreorders(rows.slice(0, 10))
        } catch (e) {
            // keep previous table if fetch fails
        } finally {
            setLoadingPreorders(false)
        }
    }

    useEffect(() => {
        loadPreorders()
    }, [])

    const maskPhone = (val) => {
        const v = String(val || "")
        const first5 = v.slice(0, 5)
        const stars = "*".repeat(Math.max(0, v.length - 5))
        return `${first5}${stars}` || "*****"
    }

    const maskAddress = (val) => {
        return "**********"
    }

    return (

        <div>

            <section className="hero hero-full hero-joined mb-5">
                <div className="row align-items-center g-4 justify-content-center">
                    <div className="col-12 col-lg-10 hero-content text-center mx-auto">
                        <p className="hero-eyebrow hero-fade delay-1">Freshly baked • Pure goodness</p>
                        <h1 className="hero-title hero-fade delay-2">
                            <span className="hero-glow-text" data-text="Elegant Brownies | Rich yet Affordable">
                                Elegant Brownies | Rich yet Affordable
                            </span>
                        </h1>
                        <p className="hero-subtitle hero-fade delay-3">
                            For Sweet cravings and Happy Smiles
                        </p>
                        <div className="d-flex gap-3 mt-3 justify-content-center hero-fade delay-4">
                            <a className="btn btn-primary hero-menu-btn" href={menuPdfUrl} target="_blank" rel="noreferrer">
                                Explore Menu
                            </a>
                            {/* <a className="btn btn-outline-light" href="/cart">View Cart</a> */}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mt-5">

                <section className="preorder-note mb-5 ">
                    <div className="preorder-premium ">
                        <div className="row g-4 align-items-center p-2 p-md-5">
                            <div className="col-12 col-lg-7">

                                <p className="preorder-kicker">Reserve your brownie for March 21</p>

                                <h2 className="preorder-title ramzan-title d-flex align-items-center gap-2">

                                    <FaMoon className="ramzan-moon" />
                                    Ramzan Pre-Order Offer
                                    <FaStar className="ramzan-star" />

                                </h2>

                                <p className="preorder-copy mt-5">
                                    Normal brownie price is <strong>₹220</strong>. On <strong>21 March</strong>, the price is
                                    <strong> ₹180</strong>.
                                </p>

                                <p className="preorder-copy">
                                    You can pre-order now by paying just <strong>₹1</strong> and pay the remaining
                                    <strong> ₹143</strong> on delivery.
                                </p>
                                <div className="preorder-visual mt-5">
                                    <div id="preorderCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div className="row g-2">
                                                    <div className="col-6">
                                                        <img className="d-block w-100 preorder-carousel-img" src="https://images.pexels.com/photos/33674422/pexels-photo-33674422.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Brownies 1" />
                                                    </div>
                                                    <div className="col-6">
                                                        <img className="d-block w-100 preorder-carousel-img" src="https://images.pexels.com/photos/30353753/pexels-photo-30353753.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Brownies 2" />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="row g-2">
                                                    <div className="col-6">
                                                        <img className="d-block w-100 preorder-carousel-img" src="https://images.pexels.com/photos/13233563/pexels-photo-13233563.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Brownies 4" />
                                                    </div>
                                                    <div className="col-6">
                                                        <img className="d-block w-100 preorder-carousel-img" src="https://images.pexels.com/photos/29819836/pexels-photo-29819836.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Brownies 5" />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="row g-2">
                                                    <div className="col-6">
                                                        <img className="d-block w-100 preorder-carousel-img" src="https://images.pexels.com/photos/33674420/pexels-photo-33674420.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Brownies 7" />
                                                    </div>
                                                    <div className="col-6">
                                                        <img className="d-block w-100 preorder-carousel-img" src="https://images.pexels.com/photos/17488699/pexels-photo-17488699.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Brownies 8" />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#preorderCarousel" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#preorderCarousel" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="col-12 col-lg-5">
                                <div className="preorder-form preorder-form-card">
                                    <div className="auth-field mb-3">
                                        <input
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder=" "
                                        />
                                        <label>Name</label>
                                    </div>
                                    <div className="auth-field mb-3">
                                        <input
                                            className="form-control"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder=" "
                                        />
                                        <label>Phone Number</label>
                                    </div>
                                    <div className="auth-field mb-3">
                                        <input
                                            className="form-control"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder=" "
                                        />
                                        <label>Address</label>
                                    </div>
                                    <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" onClick={saveToSheet} disabled={saving}>
                                        {saving && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                        <span>{saving ? "Saving..." : "Save to sheet"}</span>
                                    </button>
                                    {/* <button className="btn btn-primary w-100" onClick={startPayment}>
                                    Pay ₹{AMOUNT_PAID} Pre‑Order
                                </button> */}
                                    {/* {showPay && (
                                    <>
                                        <div className="preorder-qr mt-3">
                                            <p className="small mb-2">Scan to pay if app didn’t open</p>
                                            <QRCodeCanvas value={upiLink} size={160} />
                                        </div>
                                        <button className="btn btn-outline-light w-100 mt-3" onClick={saveToSheet} disabled={saving}>
                                            {saving ? "Saving..." : "I Paid ₹1"}
                                        </button>
                                    </>
                                )} */}
                                    {status && (
                                        <div className={`alert ${status.startsWith("Saved") ? "alert-success" : "alert-danger"} mt-3 mb-0`} role="alert">
                                            {status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>



                        {preorders.length > 0 && (
                            <div className="preorder-table-section" ref={tableRef}>
                                <h3 className="mb-3 text-center preorder-heading">
                                    Pre‑Ordered Customers
                                </h3>
                                <p className="preorder-slots mb-5">
                                    <span className="preorder-clock" aria-hidden="true">
                                        <span className="preorder-needle"></span>
                                    </span>
                                    Pre‑orders left: <strong>{Math.max(0, 10 - preorders.length)}</strong> / 10
                                </p>
                                <div className="table-responsive preorder-table">
                                    <table className="table align-middle">
                                        <thead>
                                            <tr>
                                                <th>S No</th>
                                                <th>Name</th>
                                                <th>Mobile</th>
                                                <th>Address</th>
                                                <th>Amount Paid</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {preorders.map((row, idx) => (
                                                <tr key={`${row.phone || row["Mobile number"] || row["Mobile"]}-${idx}`}>
                                                    <td>{row.sno || row["S No"] || idx + 1}</td>
                                                    <td>{row.name || row["Name"]}</td>
                                                    <td>{maskPhone(row.phone || row["Mobile number"] || row["Mobile"])}</td>
                                                    <td>{maskAddress(row.address || row["Address"])}</td>
                                                    <td>₹{row.amountPaid || row["Amount paid"] || AMOUNT_PAID}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {loadingPreorders && (
                        <div className="preorder-table-section">
                                <h3 className="mb-3 text-center preorder-heading">
                                    <FaUsers className="preorder-icon" />
                                    Pre‑Ordered Customers
                                </h3>
                                <div className="preorder-placeholder">
                                    <div className="placeholder-row"></div>
                                    <div className="placeholder-row"></div>
                                    <div className="placeholder-row"></div>
                                </div>
                            </div>
                        )}
                    </div>

                </section>

                {/* <h1 id="menu" className="text-center mb-5 reveal">

                    Fresh Homemade Brownies

                </h1> */}

                {/* <div className="row">

                    {products.map((p, i) => (
                        <div className="col-md-3 mb-4" key={p._id ?? i}>

                            <ProductCard product={p} style={{ animationDelay: `${i * 60}ms` }} />

                        </div>
                    ))}

                </div> */}

            </div>

        </div>

    )

}
