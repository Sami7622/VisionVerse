import { Scan, Layers, Tags, Cpu, Clock, Shield } from 'lucide-react'

const features = [
  {
    title: 'Object Detection',
    description: 'Detect and locate multiple objects in images with bounding boxes and confidence scores.',
    icon: Scan,
    available: true,
  },
  {
    title: 'Instance Segmentation',
    description: 'Pixel-level segmentation masks for each detected object in the image.',
    icon: Layers,
    available: true,
  },
  {
    title: 'Classification',
    description: 'Classify images into categories with top-k predictions and probability scores.',
    icon: Tags,
    available: true,
  },
  {
    title: 'Multiple Models',
    description: 'Choose from YOLOv8, MaskRCNN, ResNet, and more state-of-the-art architectures.',
    icon: Cpu,
    available: true,
  },
  {
    title: 'Fast Processing',
    description: 'Get results in seconds with optimized inference and GPU acceleration.',
    icon: Clock,
    available: true,
  },
  {
    title: 'API Access',
    description: 'Integrate VisionVerse into your applications with our developer API.',
    icon: Shield,
    available: false,
    comingSoon: true,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for CV
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features to explore computer vision without the complexity
          </p>
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{feature.title}</h3>
                {feature.comingSoon && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Soon
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
