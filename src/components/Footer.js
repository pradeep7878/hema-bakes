"use client"

import { useState, useEffect, useRef } from "react"
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaInstagram, FaFacebookF, FaTwitter, FaHome, FaShoppingCart, FaUser, FaWhatsapp, FaListUl } from "react-icons/fa"
import Link from "next/link"

export default function Footer() {
  const [showCallConfirm, setShowCallConfirm] = useState(false)
  const [showWaConfirm, setShowWaConfirm] = useState(false)
  const [showMapConfirm, setShowMapConfirm] = useState(false)
  const [showEmailConfirm, setShowEmailConfirm] = useState(false)
  const callRef = useRef(null)
  const waRef = useRef(null)
  const mapRef = useRef(null)
  const emailRef = useRef(null)

  const closeAll = () => {
    setShowCallConfirm(false)
    setShowWaConfirm(false)
    setShowMapConfirm(false)
    setShowEmailConfirm(false)
  }

  useEffect(() => {
    const handler = (e) => {
      const insideCall = callRef.current?.contains(e.target)
      const insideWa = waRef.current?.contains(e.target)
      const insideMap = mapRef.current?.contains(e.target)
      const insideEmail = emailRef.current?.contains(e.target)
      if (!insideCall && !insideWa && !insideMap && !insideEmail) closeAll()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <>
      {/* Full-screen backdrop – dims everything except the modal */}
      <div
        className={`call-overlay ${showCallConfirm || showWaConfirm || showMapConfirm || showEmailConfirm ? "is-open" : ""}`}
        onClick={closeAll}
        aria-hidden="true"
      />
      <footer className="footer mt-5">
      <div className="container pt-5 pb-3">
        <div className="row g-4 align-items-start">
          <div className="col-md-9">
            <div className="footer-brand brand-font mb-3">HEMA BAKES</div>
            <p className="footer-text small">
              Fresh homemade brownies crafted with rich cocoa and premium ingredients.
            </p>
          </div>

          {/* <div className="col-md-4">
            <div className="footer-title">Quick Menu</div>
            <ul className="footer-links list-unstyled">
              <li><Link href="/"><FaHome className="footer-icon" />Home</Link></li>
              <li><Link href="/cart"><FaShoppingCart className="footer-icon" />Cart</Link></li>
              <li><Link href="/login"><FaUser className="footer-icon" />Login</Link></li>
            </ul>
          </div> */}

          <div className="col-md-3 d-flex flex-column  ">
            <div className="footer-title">Contact</div>
            <ul className="footer-contact list-unstyled ">
              <li className="footer-call" ref={callRef}>
                <FaPhoneAlt className="footer-icon" />
                <button
                  type="button"
                  className="footer-contact-btn"
                  onClick={() => { setShowCallConfirm((v) => !v); setShowWaConfirm(false) }}
                  aria-expanded={showCallConfirm}
                  aria-controls="footer-call-confirm"
                >
                  +91 96985 84991
                </button>
                <div
                  id="footer-call-confirm"
                  className={`footer-call-modal ${showCallConfirm ? "is-open" : ""}`}
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="footer-call-modal-title">Call Hema Bakes?</div>
                  <div className="footer-call-modal-text">+91 96985 84991</div>
                  <div className="footer-call-modal-actions">
                    <a className="btn btn-primary" href="tel:+919698584991">Call Now</a>
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={() => setShowCallConfirm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </li>
              <li className="footer-call align-items-start" ref={mapRef}>
                <FaMapMarkerAlt className="footer-icon mt-1" />
                <button
                  type="button"
                  className="footer-contact-btn"
                  onClick={() => { setShowMapConfirm((v) => !v); setShowCallConfirm(false); setShowWaConfirm(false) }}
                  aria-expanded={showMapConfirm}
                >
                  27/10, Mathiyazhagan Nagar 1st street, Sulur, Coimbatore
                </button>
                <div
                  className={`footer-call-modal map-modal ${showMapConfirm ? "is-open" : ""}`}
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="footer-call-modal-title">Open in Maps?</div>
                  <div className="footer-call-modal-text">27/10, Mathiyazhagan Nagar 1st street, Sulur, Coimbatore</div>
                  <div className="footer-call-modal-actions">
                    <a
                      className="btn btn-primary"
                      href="https://maps.app.goo.gl/Me3wEzuTDB21bhSeA"
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeAll}
                    >
                      Open Maps
                    </a>
                    <button type="button" className="btn btn-outline-light" onClick={closeAll}>
                      Cancel
                    </button>
                  </div>
                </div>
              </li>
              <li className="footer-call" ref={emailRef}>
                <FaEnvelope className="footer-icon" />
                <button
                  type="button"
                  className="footer-contact-btn"
                  onClick={() => { setShowEmailConfirm((v) => !v); setShowCallConfirm(false); setShowWaConfirm(false); setShowMapConfirm(false) }}
                  aria-expanded={showEmailConfirm}
                >
                  hb.hemabakes@gmail.com
                </button>
                <div
                  className={`footer-call-modal ${showEmailConfirm ? "is-open" : ""}`}
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="footer-call-modal-title">Send an Email?</div>
                  <div className="footer-call-modal-text">hb.hemabakes@gmail.com</div>
                  <div className="footer-call-modal-actions">
                    <a className="btn btn-primary" href="mailto:hb.hemabakes@gmail.com" onClick={closeAll}>Send Email</a>
                    <button type="button" className="btn btn-outline-light" onClick={closeAll}>Cancel</button>
                  </div>
                </div>
              </li>
            </ul>
            {/* <div className="footer-social">
              <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://facebook.com" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
            </div> */}
          </div>
        </div>
      </div>
      <div className="footer-bottom py-3">
        <div className="container d-flex align-items-center justify-content-center text-center">
          <span className="small">© 2026 Hema Bakes. All rights reserved.</span>
        </div>
      </div>
      <a
        className="explore-fab"
        href="/HB%20Menu%20FSSAI.pdf"
        target="_blank"
        rel="noreferrer"
        aria-label="Explore menu"
      >
        <FaListUl />
        <span>Menu</span>
      </a>
      <div className="whatsapp-fab-wrap" ref={waRef}>
        <button
          type="button"
          className="whatsapp-fab"
          aria-label="Chat on WhatsApp"
          onClick={() => { setShowWaConfirm((v) => !v); setShowCallConfirm(false) }}
        >
          <FaWhatsapp />
        </button>
        <div className={`footer-call-modal wa-modal ${showWaConfirm ? "is-open" : ""}`} role="dialog" aria-modal="true">
          <div className="footer-call-modal-title">Chat on WhatsApp</div>
          <div className="footer-call-modal-text">Order brownies via WhatsApp!</div>
          <div className="footer-call-modal-actions">
            <a
              className="btn btn-primary"
              href="https://wa.me/919698584991?text=Hello%20Hema%20Bakes%2C%20I%20want%20to%20order%20brownies."
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowWaConfirm(false)}
            >
              Open WhatsApp
            </a>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={() => setShowWaConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      </footer>
    </>
  )
}
