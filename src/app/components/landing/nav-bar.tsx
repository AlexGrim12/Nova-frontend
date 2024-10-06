'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-black/50 backdrop-blur-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-white font-bold text-xl">
            NOVA
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/menu"
              className="text-white hover:text-purple-400 transition"
            >
              Menú
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-purple-400 transition"
            >
              Acerca de
            </Link>
            <Link
              href="/control"
              className="text-white hover:text-purple-400 transition"
            >
              Control
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 absolute w-full left-0 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <Link
                href="/menu"
                className="text-white hover:text-purple-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Menú
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-purple-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Acerca de
              </Link>
              <Link
                href="/control"
                className="text-white hover:text-purple-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Control
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
