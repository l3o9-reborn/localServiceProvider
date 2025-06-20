import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm">© 2025 LeoCorp. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="/privacy-policy" className="text-sm hover:underline">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-sm hover:underline">
                Terms of Service
              </a>
              <a href="/contact" className="text-sm hover:underline">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
