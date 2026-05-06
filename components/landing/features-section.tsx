'use client'

import { Scan, Layers, Tags, Cpu, Clock, Shield } from 'lucide-react'

const features = [
  {
    title: 'Object Detection',
    description: 'Detect and locate multiple objects in images with bounding boxes and confidence scores.',
    icon: Scan,
    available: true,
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    title: 'Instance Segmentation',
    description: 'Pixel-level segmentation masks for each detected object in the image.',
    icon: Layers,
    available: true,
    gradient: 'from-accent/20 to-accent/5',
  },
  {
    title: 'Classification',
    description: 'Classify images into categories with top-k predictions and probability scores.',
    icon: Tags,
    available: true,
    gradient: 'from-chart-3/20 to-chart-3/5',
  },
  {
    title: 'Multiple Models',
    description: 'Choose from YOLOv8, MaskRCNN, ResNet, and more state-of-the-art architectures.',
    icon: Cpu,
    available: true,
    gradient: 'from-chart-4/20 to-chart-4/5',
  },
  {
    title: 'Fast Processing',
    description: 'Get results in seconds with optimized inference and real-time processing.',
    icon: Clock,
    available: true,
    gradient: 'from-chart-5/20 to-chart-5/5',
  },
  {
    title: 'API Access',
    description: 'Integrate VisionVerse into your applications with our developer API.',
    icon: Shield,
    available: false,
    comingSoon: true,
    gradient: 'from-primary/20 to-accent/5',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative border-t border-border py-24 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full gradient-orb opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-sm font-semibold text-primary mb-4">Features</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need for{' '}
            <span className="gradient-text">computer vision</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features to explore computer vision without the complexity
          </p>
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  {feature.comingSoon && (
                    <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                      Soon
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
