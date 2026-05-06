import { Upload, Settings2, BarChart3, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Upload your image',
    description: 'Drag and drop or browse to upload any PNG or JPEG image. We support images up to 10MB.',
    icon: Upload,
  },
  {
    number: '02',
    title: 'Choose your task',
    description: 'Select from object detection, instance segmentation, classification, and more models.',
    icon: Settings2,
  },
  {
    number: '03',
    title: 'See results instantly',
    description: 'View bounding boxes, masks, and classifications with confidence scores in seconds.',
    icon: BarChart3,
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started with computer vision in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-border md:block">
                    <ArrowRight className="absolute -right-3 -top-2 h-4 w-4 text-muted-foreground" />
                  </div>
                )}

                <div className="relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
                  {/* Step number */}
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary">{step.number}</span>
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
