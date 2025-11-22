// components/layout/Footer.tsx
import Link from 'next/link';

function Telegram() {
  return <span>T</span>
}

function WhatsApp() {
  return <span>W</span>
}

function Language() {
  return <span>L</span>
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Scripters™</h3>
            <p className="text-gray-400">
              Buy digital goods! Premium scripts, themes, templates & more.
            </p>
            <div className="flex gap-3">
              <a
                href="https://t.me/ScriptsChats"
                aria-label="Join Telegram Community"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Telegram />
              </a>
              <a
                href="https://wa.me/18208231206"
                aria-label="Contact on WhatsApp"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <WhatsApp />
              </a>
              <a
                href="https://scripters.shop"
                aria-label="Visit Website"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Language />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products?category=crypto-tools">Crypto Tools</Link></li>
              <li><Link href="/products?category=scripts">Scripts</Link></li>
              <li><Link href="/products?category=themes">Themes</Link></li>
              <li><Link href="/products?category=ebooks">E-books</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help">Help Center</Link></li>
              <li><a href="https://t.me/LikhonDev">@LikhonDev</a></li>
              <li><Link href="/refunds">Refund Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="font-semibold mb-4">Trust & Safety</h4>
            <ul className="space-y-2 text-gray-400">
              <li>🛡️ Escrow Protection</li>
              <li>✅ Verified Vendors</li>
              <li>💳 Secure Payments</li>
              <li>🔒 Crypto via Atlos</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© {year} Scripters™. All rights reserved.</p>
          <p className="text-sm mt-2">
            🔺 Verify at scripters.shop • We do not support deals from other platforms
          </p>
        </div>
      </div>
    </footer>
  );
}