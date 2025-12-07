'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  Search,
  Globe,
  Heart,
  User,
  ChevronDown,
  MapPin
} from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchFocus = () => {
    if (window.innerWidth < 768) {
      setIsSearchExpanded(true)
    }
  }

  const handleSearchBlur = () => {
    if (window.innerWidth < 768) {
      setIsSearchExpanded(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-primary">airbrb</div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="flex items-center w-full bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center px-4 py-2 border-r border-gray-200 cursor-pointer hover:bg-gray-50">
                <MapPin className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-sm font-medium">Anywhere</span>
              </div>
              <div className="flex items-center px-4 py-2 border-r border-gray-200 cursor-pointer hover:bg-gray-50">
                <span className="text-sm font-medium">Any week</span>
              </div>
              <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-50">
                <span className="text-sm font-medium text-gray-600">Add guests</span>
              </div>
              <button className="p-2 bg-primary rounded-full ml-4 text-white">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button className="text-sm font-medium text-text-primary hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">
              Airbnb your home
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-full border border-gray-200 hover:shadow-sm transition-all"
              >
                <Menu className="w-5 h-5" />
                <User className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-dropdown border border-gray-100 z-50">
                  <div className="py-2">
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      Sign up
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                      href="/trips"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      My trips
                    </Link>
                    <Link
                      href="/wishlists"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      My wishlists
                    </Link>
                    <Link
                      href="/reservations"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      My reservations
                    </Link>
                    <Link
                      href="/messages"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      Inbox
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                      href="/host"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      Airbnb your home
                    </Link>
                    <Link
                      href="/hosting-guide"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      Hosting guide
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                      href="/help"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      Help Center
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <Link href="/login" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-3">
          <div
            className={`flex items-center w-full bg-white border border-gray-200 rounded-full shadow-sm transition-all ${
              isSearchExpanded ? 'shadow-md' : ''
            }`}
          >
            <input
              type="text"
              placeholder="Search destinations"
              className="flex-1 px-4 py-3 text-sm focus:outline-none"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
            <button className="p-2 bg-primary rounded-full mr-3 text-white">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Expanded Search Options */}
          {isSearchExpanded && (
            <div className="mt-4 space-y-4 animate-fade-in">
              <div className="border-b border-gray-100 pb-3">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  WHERE
                </label>
                <input
                  type="text"
                  placeholder="Search destinations"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="border-b border-gray-100 pb-3">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  CHECK-IN
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="border-b border-gray-100 pb-3">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  CHECK-OUT
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="pb-3">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  GUESTS
                </label>
                <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg">
                  <span className="text-sm">Add guests</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <button className="w-full btn-primary">
                Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  )
}