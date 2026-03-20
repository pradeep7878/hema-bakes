import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaInstagram, FaFacebookF, FaTwitter, FaHome, FaShoppingCart, FaUser, FaWhatsapp, FaListUl } from "react-icons/fa"
import Link from "next/link"

export default function Footer() {
  return (
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

          <div className="col-md-3 d-flex flex-column ">
            <div className="footer-title">Contact</div>
            <ul className="footer-contact list-unstyled ">
              <li>
                <FaPhoneAlt className="footer-icon" />
                <a href="tel:+919698584991">+91 96985 84991</a>
              </li>
              <li>
                <FaMapMarkerAlt className="footer-icon" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </li>
              <li>
                <FaEnvelope className="footer-icon" />
                <a href="mailto:hb.hemabakes@gmail.com">hb.hemabakes@gmail.com</a>
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
      <a
        className="whatsapp-fab"
        href="https://wa.me/919698584991?text=Hello%20Hema%20Bakes%2C%20I%20want%20to%20order%20brownies."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </footer>
  )
}
