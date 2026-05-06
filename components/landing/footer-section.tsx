import Link from 'next/link'

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">V</span>
              </div>
              <span className="text-lg font-semibold">VisionVerse</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your all-in-one computer vision workspace
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link 
              href="#features" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </Link>
            <Link 
              href="/login" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Link 
              href="/register" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Get started
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} VisionVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
