"use client"

import { useState } from "react"
import axios from "axios"
import { QRCodeCanvas } from "qrcode.react"

export default function Checkout() {

    const [paid, setPaid] = useState(false)
    const [showQr, setShowQr] = useState(false)
    const [msg, setMsg] = useState("")

    const total = 450

    const upiLink =
        `upi://pay?pa=9698584991sbi@ybl&pn=HEMA BAKES&am=${total}&cu=INR`

    const placeOrder = async () => {

        const order = {

            customerName: "Guest Customer",

            phone: "9698584991",

            address: "Coimbatore",

            items: [
                {
                    name: "Chocolate Brownie",
                    price: 120
                }
            ],

            total: total,

            paymentMethod: "UPI"

        }

        await axios.post("/api/orders", order)

        alert("Order placed! We will verify payment shortly.")

    }

    return (

        <div className="container mt-5 text-center">

            <h2>Checkout</h2>

            <h4>Total ₹{total}</h4>

            <div className="mt-4">

                <button
                    className="btn btn-success btn-lg"
                    onClick={() => {
                        setShowQr(true)
                        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
                        if (isMobile) {
                            window.location.href = upiLink
                        } else {
                            setMsg("Open on mobile or scan the QR to pay.")
                        }
                    }}
                >

                    Pay with UPI

                </button>

            </div>

            <p className="mt-3">
                This will open Google Pay / PhonePe / Paytm
            </p>

            <hr className="my-4" />

            {showQr && (
                <>
                    <h5>Or Scan QR Code</h5>
                    <QRCodeCanvas value={upiLink} />
                    {msg && <p className="mt-2">{msg}</p>}
                </>
            )}

            <div className="mt-4">

                <button
                    className="btn btn-primary"
                    onClick={() => setPaid(true)}
                >

                    I Have Paid

                </button>

            </div>

            {paid && (

                <div className="mt-4">

                    <button
                        className="btn btn-warning"
                        onClick={placeOrder}
                    >

                        Confirm Order

                    </button>

                </div>

            )}

        </div>

    )

}
