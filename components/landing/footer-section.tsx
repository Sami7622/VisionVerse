import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Linkedin } from 'lucide-react'

export function FooterSection() {
  return (
    <footer className="relative border-t border-border bg-secondary/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full gradient-orb opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and tagline */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex group transition-transform duration-300 hover:scale-105">
              <Image
                src="/images/vv-logo.png"
                alt="VisionVerse"
                width={400}
                height={100}
                className="h-24 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Your all-in-one computer vision playground. Upload images, run state-of-the-art models, and explore CV tasks directly in your browser.
            </p>
            {/* Social links */}
            <div className="mt-6 flex items-center gap-4">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links - Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {[
                { label: 'Features', href: '#features' },
                { label: 'How it works', href: '#how-it-works' },
                { label: 'Pricing', href: '#' },
                { label: 'API', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Account</h3>
            <ul className="space-y-3">
              {[
                { label: 'Sign in', href: '/login' },
                { label: 'Get started', href: '/register' },
                { label: 'Dashboard', href: '/app/dashboard' },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} VisionVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-primary">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-primary">Terms</Link>
            <Link href="#" className="transition-colors hover:text-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
