'use client'

import { Upload, Settings2, BarChart3 } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Upload your image',
    description: 'Drag and drop or browse to upload any PNG or JPEG image. We support images up to 10MB.',
    icon: Upload,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
  },
  {
    number: '02',
    title: 'Choose your task',
    description: 'Select from object detection, instance segmentation, classification, and more models.',
    icon: Settings2,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/20',
  },
  {
    number: '03',
    title: 'See results instantly',
    description: 'View bounding boxes, masks, and classifications with confidence scores in seconds.',
    icon: BarChart3,
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
    borderColor: 'border-chart-3/20',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-secondary/30 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full gradient-orb opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-sm font-semibold text-primary mb-4">How it works</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Get started in{' '}
            <span className="gradient-text">three simple steps</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No complex setup required. Start exploring computer vision in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-16 hidden h-0.5 w-full translate-x-1/2 md:block">
                    <div className="h-full w-full bg-gradient-to-r from-primary/30 via-accent/30 to-transparent" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary/20 animate-pulse" />
                  </div>
                )}

                <div className={`group relative rounded-2xl border-2 ${step.borderColor} bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-2`}>
                  {/* Step number - floating badge */}
                  <div className={`absolute -top-4 -left-2 flex h-8 w-8 items-center justify-center rounded-full ${step.bgColor} border-2 border-background font-bold text-sm ${step.color}`}>
                    {step.number}
                  </div>

                  {/* Icon container */}
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${step.bgColor} transition-all duration-300 group-hover:scale-110`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Bottom decoration line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-300 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Ready to get started?</p>
          <a 
            href="/register" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            Create your free account
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
