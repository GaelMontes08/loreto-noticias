'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'

const categories = [
  { name: 'Política', href: '/categoria/politica' },
  { name: 'Economía', href: '/categoria/economia' },
  { name: 'Deportes', href: '/categoria/deportes' },
  { name: 'Cultura', href: '/categoria/cultura' },
  { name: 'Tecnología', href: '/categoria/tecnologia' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCategoryNav, setShowCategoryNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show hamburger/search when scrolled past 100px
      setIsScrolled(currentScrollY > 100)

      // Only show category nav when at the very top (less than 50px)
      setShowCategoryNav(currentScrollY < 50)

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Left Side - Hamburger and Search */}
            <div className="flex items-center gap-3">
              {isScrolled && (
                <>
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    aria-label="Menu"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {mobileMenuOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      )}
                    </svg>
                  </button>

                  <button
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    aria-label="Search"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Center - Logo */}
            <Link href="/" className="flex justify-center">
              <h1 className="text-lg md:text-3xl font-archivo font-bold text-center whitespace-nowrap">
                Loreto Noticias
              </h1>
            </Link>

            {/* Right Side - Theme, Sign Up, Sign In */}
            <div className="flex items-center justify-end gap-2">
              <ThemeToggle />
              <Link
                href="/registrarse"
                className="hidden md:flex px-4 py-2 text-sm font-medium hover:bg-gray-800 rounded-lg transition-colors whitespace-nowrap"
              >
                Registrarse
              </Link>
              <Link
                href="/iniciar-sesion"
                className="hidden md:flex px-4 py-2 text-sm font-medium bg-white text-black hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation - Slides up/down */}
      <nav
        className={`fixed left-0 right-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 ${
          showCategoryNav ? 'top-[65px] md:top-[70px]' : '-top-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center md:justify-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-black-700 font-archivo dark:text-gray-200 whitespace-nowrap transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && isScrolled && (
        <div className="fixed top-[72px] md:top-[76px] left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              
              {/* Mobile Auth Buttons */}
              <li className="md:hidden pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/registrarse"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors font-medium"
                >
                  Registrarse
                </Link>
              </li>
              <li className="md:hidden">
                <Link
                  href="/iniciar-sesion"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                >
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[72px] md:h-[76px]"></div>
      <div className={`transition-all duration-300 ${showCategoryNav ? 'h-[52px]' : 'h-0'}`}></div>
    </>
  )
}
