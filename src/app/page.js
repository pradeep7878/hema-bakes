"use client"

import MaintenancePage from "@/components/MaintenancePage"
import ProductCard from "@/components/ProductCard"
import products from "@/data.json"
import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "react-toastify"
import { QRCodeCanvas } from "qrcode.react"
import { FaMoon, FaStar, FaUsers, FaClock, FaClipboardList } from "react-icons/fa"

const SHEET_URL = "https://script.google.com/macros/s/AKfycbyyWSp1bGe3ZJmis_kak7IvFCJ4nhUUNKtbqc1ckGdfBOy0ZeGL9A2xaZRR8ad_sBZAUA/exec"
const SHEET_NAME = "ramzan_customers"
const UPI_ID = "9698584991sbi@ybl"
const AMOUNT_PAID = 0

export default function HomePageContent() {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [showPay, setShowPay] = useState(false)
    const [instructionLang, setInstructionLang] = useState("en")
    const [saving, setSaving] = useState(false)
    const [showOrderModal, setShowOrderModal] = useState(false)
    const [showFullModal, setShowFullModal] = useState(false)
    const [preorders, setPreorders] = useState([])
    const [loadingPreorders, setLoadingPreorders] = useState(true)
    const tableRef = useRef(null)

    const upiLink = useMemo(() => {
        return `upi://pay?pa=${UPI_ID}&pn=HEMA%20BAKES&am=${AMOUNT_PAID}&cu=INR`
    }, [])
    const menuPdfUrl = "/HB%20Menu%20FSSAI.pdf"

    const startPayment = () => {
        setStatus("")
        if (!name || !phone || !address) {
            toast.error("Please fill all details", { autoClose: 5000 })
            return
        }
        if (!/^[0-9]{10}$/.test(phone.trim())) {
            toast.error("Invalid phone number", { autoClose: 5000 })
            return
        }
        if (preorders.length >= 20) {
            setShowFullModal(true)
            return
        }
        setShowPay(true)
    }

    const saveToSheet = async () => {
        if (!name || !phone || !address) {
            toast.error("Please fill all details", { autoClose: 5000 })
            return
        }
        if (!/^[0-9]{10}$/.test(phone.trim())) {
            toast.error("Invalid phone number", { autoClose: 5000 })
            return
        }
        if (preorders.length >= 20) {
            setShowFullModal(true)
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

            await loadPreorders()
            setName("")
            setPhone("")
            setAddress("")
            setShowPay(false)
            setShowOrderModal(true)
            setTimeout(() => {
                if (tableRef.current) {
                    tableRef.current.scrollIntoView({ behavior: "smooth" })
                }
            }, 100)
        } catch (e) {
            toast.error(e?.message || "Save failed. Please try again.", { autoClose: 5000 })
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
            setPreorders(rows.slice(0, 20))
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
                        <p className="hero-eyebrow hero-fade delay-1">
                            <span className="hero-glow-text" data-text="HEMA bakes">HEMA bakes</span>
                        </p>
                        <h1 className="hero-title hero-fade delay-2">
                            Elegant Brownies | Rich yet Affordable
                        </h1>
                        {/* <p className="hero-subtitle hero-fade delay-3">
                            For Sweet cravings and Happy Smiles
                        </p> */}
                        <div className="d-flex gap-3 mt-5 justify-content-center hero-fade delay-4">
                            <a className="btn btn-primary hero-menu-btn px-4" href={menuPdfUrl} target="_blank" rel="noreferrer">
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
                        <div className="ramzan-header text-center my-4">
                            <div className="lang-toggle-wrap mb-4">
                                <button
                                    className={`lang-toggle-btn${instructionLang === "en" ? " active" : ""}`}
                                    onClick={() => setInstructionLang("en")}
                                >ENGLISH</button>
                                <button
                                    className={`lang-toggle-btn${instructionLang === "ta" ? " active" : ""}`}
                                    onClick={() => setInstructionLang("ta")}
                                >தமிழ்</button>
                            </div>

                            <div className={`lang-content${instructionLang === "en" ? " lang-active" : ""}`}>
                                <p className="preorder-kicker mb-5">
                                    PAY ₹1, FEEL THE LOVE (₹143❤️)
                                </p>
                            </div>
                            <div className={`lang-content${instructionLang === "ta" ? " lang-active" : ""}`}>
                                <p className="preorder-kicker mb-5">
                                    1 ரூபாய் செலுத்தி, அன்பை உணருங்கள் (₹143❤️)
                                </p>
                            </div>

                            <div className={`lang-content${instructionLang === "en" ? " lang-active" : ""}`}>
                                <h2 className="preorder-title ramzan-title d-flex align-items-center justify-content-center gap-2 flex-wrap">
                                    <span className="ramzan-moon-star">
                                        <FaMoon className="ramzan-moon" />
                                        <FaStar className="ramzan-star" />
                                    </span>
                                    Ramzan Pre-Order Offer
                                </h2>
                            </div>
                            <div className={`lang-content${instructionLang === "ta" ? " lang-active" : ""}`}>
                                <h2 className="preorder-title ramzan-title d-flex align-items-center justify-content-center gap-2 flex-wrap">
                                    <span className="ramzan-moon-star">
                                        <FaMoon className="ramzan-moon" />
                                        <FaStar className="ramzan-star" />
                                    </span>
                                    ரம்ஜான் முன்பதிவு சலுகை
                                </h2>
                            </div>
                        </div>
                        <div className="row g-4 align-items-center p-0 p-md-5">
                            <div className="col-12 col-lg-7">

                                {/* English */}
                                <div className={`lang-content mt-3 mt-lg-3${instructionLang === "en" ? " lang-active" : ""}`}>
                                    <p className="preorder-copy mb-3">
                                        &nbsp;The normal brownie price is <strong>₹220.</strong>{" "}
                                        But with this Website{" "}
                                        <strong className="heart-badge website-text">(www.hemabakes.com)</strong>{" "}
                                        launch offer, you can either pre-order by paying just <strong>₹1</strong> and pay the remaining
                                        <span className="ms-1">₹142</span> on delivery, or pay the full <strong>₹143</strong> at once.
                                    </p>
                                </div>

                                {/* Tamil */}
                                <div className={`lang-content mt-3 mt-lg-3${instructionLang === "ta" ? " lang-active" : ""}`}>
                                    <p className="preorder-copy mb-3">
                                        &nbsp;&nbsp;&nbsp;&nbsp;இந்த Brownie-யின் சாதாரண விலை <strong>₹220.</strong>{" "}
                                        ஆனால் இந்த Website{" "}
                                        <strong className="heart-badge website-text">(www.hemabakes.com)</strong>{" "}
                                        launch offer மூலம், நீங்கள் <strong>₹1</strong> மட்டும் செலுத்தி pre-order செய்யலாம், மீதமுள்ள
                                        <span className="ms-1">₹142</span> தொகையை delivery போது செலுத்தலாம், அல்லது முழு <strong>₹143</strong> தொகையையும் ஒரே முறையில் செலுத்தலாம்.
                                    </p>
                                </div>

                                {/* English */}
                                <div className={`lang-content${instructionLang === "en" ? " lang-active" : ""}`}>
                                    <div className="preorder-product-badge p-3">
                                        <p className="offer-date-heading mb-3 fw-bold text-center">
                                            📅 Offer Valid: March 21 – March 31
                                        </p>
                                        <p>
                                            This offer is valid only for the Classic Fudgy (Plain Brownie) on the menu. <br />
                                            You can place your pre-order from this Ramzan, March 21 to March 31.
                                        </p>
                                    </div>
                                </div>

                                {/* Tamil */}
                                <div className={`lang-content${instructionLang === "ta" ? " lang-active" : ""}`}>
                                    <div className="preorder-product-badge p-3">
                                        <p className="offer-date-heading mb-3 fw-bold text-center">
                                            📅 சலுகை செல்லுபடியாகும் நாட்கள்: மார்ச் 21 – மார்ச் 31
                                        </p>

                                        <p>
                                            &nbsp; &nbsp;இந்த சலுகை மெனுவில் உள்ள Classic Fudgy (Plain Brownie) க்கு மட்டும் செல்லுபடியாகும். <br />
                                            இந்த ரம்ஜான் காலத்தில், மார்ச் 21 முதல் மார்ச் 31 வரை நீங்கள் முன்பதிவு செய்யலாம்.
                                        </p>
                                    </div>
                                </div>
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
                            <div className="col-12 col-lg-5 ">
                                <div className="preorder-form preorder-form-card mt-5 mt-lg-0 px-4 py-5">
                                    <h4 className="preorder-form-heading"><FaClipboardList className="me-2" />Pre-Order Form</h4>
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
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            placeholder=" "
                                            inputMode="numeric"
                                            maxLength={10}
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
                                    {/* <button className="btn btn-primary w-100" onClick={startPayment} disabled={saving}>
                                        Pay ₹{AMOUNT_PAID} Pre‑Order
                                    </button> */}
                                    <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" onClick={saveToSheet} disabled={saving}>
                                        {saving && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                        <span>{saving ? "Pre-ordering..." : "Pre-order Now"}</span>
                                    </button>
                                    {showPay && (
                                        <>
                                            <div className="preorder-qr mt-3">
                                                <p className="small mb-2">Scan the QR or use your UPI app to pay ₹{AMOUNT_PAID}</p>
                                                <QRCodeCanvas value={upiLink} size={160} />
                                            </div>
                                            <a className="btn btn-primary w-100 mt-3" href={upiLink}>
                                                Pay in UPI App
                                            </a>
                                            <button className="btn btn-primary w-100 mt-3 d-flex align-items-center justify-content-center gap-2" onClick={saveToSheet} disabled={saving}>
                                                {saving && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                                                <span>{saving ? "Saving..." : "I Paid ₹1"}</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>



                        {!loadingPreorders && (
                            <div className="preorder-table-section px-0 px-md-3" ref={tableRef}>
                                <h3 className="mb-3 text-center preorder-heading">
                                    Pre‑Ordered Customers
                                </h3>
                                <p className="preorder-slots mb-5">
                                    <span className="preorder-clock" aria-hidden="true">
                                        <span className="preorder-needle"></span>
                                    </span>
                                    Pre‑orders left: <strong>{Math.max(0, 20 - preorders.length)}</strong> / 20
                                </p>
                                {preorders.length === 0 ? (
                                    <div className="no-preorders-card">
                                        <img
                                            src="https://media3.giphy.com/media/nrSRWL9TNU3LiSKznp/giphy.gif"
                                            alt="No pre-orders yet"
                                            className="no-preorders-gif"
                                        />
                                        <p className="no-preorders-title">No Pre-Orders Yet</p>
                                        <p className="no-preorders-sub">Be the first to reserve your brownie!</p>
                                    </div>
                                ) : (
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
                                                {preorders.map((row, idx) => {
                                                    const paid = Number(row.amountPaid ?? row["Amount paid (₹)"] ?? row["Amount paid"] ?? AMOUNT_PAID)
                                                    return (
                                                        <tr key={`${row.phone || row["Mobile number"] || row["Mobile"]}-${idx}`} className={paid > 0 ? "preorder-row-paid" : ""}>
                                                            <td>{idx + 1}</td>
                                                            <td>{row.name || row["Name"]}</td>
                                                            <td>{maskPhone(row.phone || row["Mobile number"] || row["Mobile"])}</td>
                                                            <td>{maskAddress(row.address || row["Address"])}</td>
                                                            <td>{paid > 0 ? <> ₹{paid}&nbsp;✅</> : <>₹{paid}</>}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {loadingPreorders && (
                            <div className="preorder-table-section">
                                <h3 className="mb-3 text-center preorder-heading">
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

            {showFullModal && (
                <>
                    <div className="call-overlay is-open" onClick={() => setShowFullModal(false)} aria-hidden="true" />
                    <div className="order-confirm-modal is-open" role="dialog" aria-modal="true">
                        <div className="footer-call-modal-title">⚠️ Pre‑Orders Full </div>
                        <div className="footer-call-modal-text">
                            Fully booked! Don’t miss the next drop!
                        </div>
                        <div className="footer-call-modal-actions justify-content-center">
                            <button className="btn btn-primary" onClick={() => setShowFullModal(false)}>
                                Got it
                            </button>
                        </div>
                    </div>
                </>
            )}

            {showOrderModal && (
                <>
                    <div className="call-overlay is-open" aria-hidden="true" />
                    <div className="order-confirm-modal is-open" role="dialog" aria-modal="true">
                        <div className="order-confirm-icon">
                            <img src="https://assets-v2.lottiefiles.com/a/a77acbc4-06eb-11f0-b441-d71804b6e6be/bwTAMkzxjM.gif" alt="Order confirmed" width={90} height={90} />
                        </div>
                        {/* <div className="footer-call-modal-title">Order Confirmed! 🎉</div> */}
                        <div className="footer-call-modal-title mb-3">
                            Pre-order placed! Pay <strong>₹1</strong> or more via WhatsApp to confirm.
                        </div>
                        <div className="footer-call-modal-actions justify-content-center flex-column gap-2 ">
                            <a
                                className="btn btn-success w-75"
                                href={`https://wa.me/919698584991?text=${encodeURIComponent("Hi Hema Bakes❤️ I have pre-ordered a Classic Fudgy brownie. I'm ready to pay ₹1 or more for pre-order confirmation.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setShowOrderModal(false)}
                            >
                                Open WhatsApp
                            </a>
                            <button className="btn btn-outline-secondary btn-sm mt-2" onClick={() => setShowOrderModal(false)}>
                                I'll do it later
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>

    )

}

// export default function Home() {
//     return <MaintenancePage />
// }
