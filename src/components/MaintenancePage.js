"use client"

export default function MaintenancePage() {
  return (
    <section className="maintenance-page">
      <div className="maintenance-card">
        <img
          className="maintenance-illustration"
          src="https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUycWFjNDluNThteWRwdmZtemNjZWJjYTVyNnJwbm55bW55d3R6ZjJ0MSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/nrSRWL9TNU3LiSKznp/giphy.gif"
          alt="Cute baking animation"
        />
        <div className="maintenance-badge">HEMA BAKES</div>
        <h1 className="maintenance-title">Page Is Under Maintenance</h1>
        <p className="maintenance-subtitle">
          Thanks for your patience. We’ll be back soon.
        </p>
        <div className="maintenance-note">
          Need help? WhatsApp us.
        </div>
      </div>
    </section>
  )
}
