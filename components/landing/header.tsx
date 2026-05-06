'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'border-b border-border/60 bg-background/90 backdrop-blur-xl shadow-sm' 
        : 'bg-transparent'
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/vv-logo.png"
            alt="VisionVerse"
            width={600}
            height={150}
            className="h-36 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <Link 
            href="#features" 
            className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
          >
            Features
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-1/2" />
          </Link>
          <Link 
            href="#how-it-works" 
            className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
          >
            How it works
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-1/2" />
          </Link>
          
          <div className="mx-4 h-6 w-px bg-border" />
          
          <ThemeToggle />
          
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="ml-2 group">
              Get started
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="relative"
          >
            <span className={`absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
              <Menu className="h-5 w-5" />
            </span>
            <span className={`absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
              <X className="h-5 w-5" />
            </span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`overflow-hidden transition-all duration-300 md:hidden ${mobileMenuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="flex flex-col gap-1 px-4 py-4">
            <Link 
              href="#features" 
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#how-it-works" 
              className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/5 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it works
            </Link>
            <div className="my-2 h-px bg-border" />
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                Sign in
              </Button>
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
