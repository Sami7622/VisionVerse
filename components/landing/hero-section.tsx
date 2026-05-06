'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Scan, Layers, Sparkles, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Animated background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full gradient-orb animate-pulse-glow opacity-60" />
        <div className="absolute top-1/2 -left-40 h-[500px] w-[500px] rounded-full gradient-orb animate-float opacity-40" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Headline */}
          <h1 className={`text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            Your all-in-one{' '}
            <span className="gradient-text">computer vision</span>{' '}
            playground
          </h1>

          {/* Subtext */}
          <p className={`mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl ${mounted ? 'animate-slide-up-delay-1' : 'opacity-0'}`}>
            Upload images, run state-of-the-art models, and explore computer vision tasks directly in your browser. No infrastructure required.
          </p>

          {/* CTAs */}
          <div className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row ${mounted ? 'animate-slide-up-delay-2' : 'opacity-0'}`}>
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-base group">
                Get started free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base group border-2 hover:border-primary/50 hover:bg-primary/5">
                <Play className="mr-2 h-4 w-4" />
                Watch demo
              </Button>
            </Link>
          </div>

          {/* Quick feature highlights */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {[
              { icon: Scan, label: 'Object Detection' },
              { icon: Layers, label: 'Segmentation' },
              { icon: Sparkles, label: 'Classification' },
            ].map((item, index) => (
              <div 
                key={item.label}
                className="flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-2 transition-all hover:bg-primary/10 hover:text-primary cursor-default"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <item.icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual - Mock dashboard preview */}
        <div className="relative mt-20">
          <div className="overflow-hidden rounded-2xl border-2 border-border bg-card shadow-2xl hover-scale vibrant-card">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-chart-5/60 transition-colors hover:bg-chart-5" />
                <div className="h-3 w-3 rounded-full bg-chart-3/60 transition-colors hover:bg-chart-3" />
              </div>
              <div className="ml-4 flex-1">
                <div className="mx-auto w-full max-w-sm rounded-lg bg-background px-4 py-1.5 text-center text-xs text-muted-foreground border border-border/50">
                  app.visionverse.ai/playground
                </div>
              </div>
            </div>

            {/* Mock app preview */}
            <div className="grid gap-6 p-6 md:grid-cols-2">
              {/* Left side - Controls */}
              <div className="space-y-4">
                <div className="group rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 text-center transition-all hover:border-primary/50 hover:bg-primary/10 cursor-pointer">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Layers className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Drop your image here</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">PNG, JPEG up to 10MB</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-foreground border border-border">
                    Object Detection
                  </div>
                  <Button className="px-6">
                    Run
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Right side - Results preview */}
              <div className="rounded-xl border border-border bg-muted/20 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold">Results</span>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">3 objects detected</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Person', confidence: '95%', color: 'bg-primary' },
                    { label: 'Car', confidence: '89%', color: 'bg-accent' },
                    { label: 'Dog', confidence: '87%', color: 'bg-chart-3' },
                  ].map((item, i) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-lg bg-background px-4 py-3 border border-border/50 transition-all hover:border-primary/30 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: item.confidence }}
                          />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground w-8">
                          {item.confidence}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-primary/10 blur-2xl" />
          <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
        </div>
      </div>
    </section>
  )
}
