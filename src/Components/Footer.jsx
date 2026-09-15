export default function Footer() {
  return (
    <footer id="contact" className="bg-pine-shadow text-pure-white pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">

        {/* Company Info */}
        <div className="space-y-4">
          <span className="text-2xl font-semibold tracking-tight">Care<span className="text-forest-grove">Sync</span></span>
          <p className="text-sm text-white/60 leading-relaxed">
            Empowering modern healthcare facilities with secure, scalable, and intelligent medical management software.
          </p>
        </div>

        {/* About Info */}
        <div className="space-y-4">
          <h4 className="label-caps text-forest-grove">Developed By</h4>
          <p className="text-sm text-white/60 leading-relaxed">
            Motive Software House & IT Solutions<br/>
            <span className="text-xs text-white/40">Delivering enterprise-grade medical tech.</span>
          </p>
        </div>

        {/* Contact Info (Realistic Data) */}
        <div className="space-y-4">
          <h4 className="label-caps text-forest-grove">Contact & Support</h4>
          <div className="space-y-2 text-sm text-white/60">
            <p className="flex items-center gap-2">📞 +92 42 3591 2345</p>
            <p className="flex items-center gap-2">✉ support@caresync.pk</p>
            <p className="flex items-start gap-2">
              <span>📍</span>
              <span>CareSync Tower, Main Boulevard<br/>Gulberg III, Lahore, Pakistan</span>
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h4 className="label-caps text-forest-grove">Connect With Us</h4>
          <div className="flex flex-col space-y-2 text-sm text-white/60">
            <a href="#" className="hover:text-forest-grove transition-colors">LinkedIn (Corporate)</a>
            <a href="#" className="hover:text-forest-grove transition-colors">Twitter / X (Updates)</a>
            <a href="#" className="hover:text-forest-grove transition-colors">Facebook (Community)</a>
            <a href="#" className="hover:text-forest-grove transition-colors">Instagram (Life at CareSync)</a>
          </div>
        </div>

      </div>
      <div className="max-w-[1200px] mx-auto px-6 pt-8 text-center text-sm text-white/40">
        Copyright © 2026 CareSync Technologies. All Rights Reserved.
      </div>
    </footer>
  );
}
