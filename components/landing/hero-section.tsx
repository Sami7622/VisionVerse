import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Scan, Layers, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Animated background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main gradient orb */}
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
        {/* Secondary orb */}
        <div className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl animate-float" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Headline */}
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Your all-in-one{' '}
            <span className="text-primary glow-text">computer vision</span>{' '}
            workspace
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Upload images, run state-of-the-art models, and explore computer vision tasks directly in your browser. No infrastructure required.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-base">
                Get started free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Sign in
              </Button>
            </Link>
          </div>

          {/* Quick feature highlights */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Scan className="h-5 w-5 text-primary" />
              <span>Object Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <span>Segmentation</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Classification</span>
            </div>
          </div>
        </div>

        {/* Hero visual - Mock dashboard preview */}
        <div className="relative mt-20">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl animate-float" style={{ animationDelay: '0.5s' }}>
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/20" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                <div className="h-3 w-3 rounded-full bg-green-500/20" />
              </div>
              <div className="ml-4 flex-1">
                <div className="mx-auto w-full max-w-sm rounded-md bg-background/50 px-3 py-1 text-center text-xs text-muted-foreground">
                  app.visionverse.ai/playground
                </div>
              </div>
            </div>

            {/* Mock app preview */}
            <div className="grid gap-4 p-6 md:grid-cols-2">
              {/* Left side - Controls */}
              <div className="space-y-4">
                <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Drop your image here</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-md bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                    Object Detection
                  </div>
                  <div className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                    Run
                  </div>
                </div>
              </div>

              {/* Right side - Results preview */}
              <div className="rounded-lg border border-border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium">Results</span>
                  <span className="text-xs text-muted-foreground">3 objects detected</span>
                </div>
                <div className="space-y-2">
                  {['Person', 'Car', 'Dog'].map((label, i) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-md bg-background/50 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: ['#3b82f6', '#22c55e', '#f59e0b'][i] }}
                        />
                        <span className="text-sm">{label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {['95%', '89%', '87%'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Glow effect behind card */}
          <div className="pointer-events-none absolute inset-0 -z-10 translate-y-8 blur-2xl">
            <div className="h-full w-full rounded-xl bg-primary/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
