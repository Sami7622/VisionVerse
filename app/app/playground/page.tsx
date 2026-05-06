'use client'

import { useState, useCallback, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { api } from '@/src/api/client'
import { sampleImageUrl } from '@/src/api/mock-data'
import type { TaskType, ModelType, VisionJob, BoundingBox, SegmentationMask, ClassificationResult } from '@/src/api/types'
import { 
  Upload, 
  Image as ImageIcon, 
  Play, 
  Sparkles,
  X,
  CheckCircle,
  Scan,
  Layers,
  Tags,
} from 'lucide-react'

const taskOptions: { value: TaskType; label: string; description: string; icon: typeof Scan }[] = [
  { 
    value: 'object-detection', 
    label: 'Object Detection', 
    description: 'Detect and locate objects with bounding boxes',
    icon: Scan,
  },
  { 
    value: 'instance-segmentation', 
    label: 'Instance Segmentation', 
    description: 'Pixel-level segmentation masks',
    icon: Layers,
  },
  { 
    value: 'classification', 
    label: 'Classification', 
    description: 'Classify images into categories',
    icon: Tags,
  },
]

const modelOptions: Record<TaskType, { value: ModelType; label: string }[]> = {
  'object-detection': [
    { value: 'yolov8-small', label: 'YOLOv8 Small' },
    { value: 'yolov8-large', label: 'YOLOv8 Large' },
    { value: 'yolov8-nano', label: 'YOLOv8 Nano' },
  ],
  'instance-segmentation': [
    { value: 'maskrcnn', label: 'Mask R-CNN' },
    { value: 'yolov8-large', label: 'YOLOv8 Segmentation' },
  ],
  'classification': [
    { value: 'resnet50', label: 'ResNet-50' },
    { value: 'efficientnet', label: 'EfficientNet' },
  ],
}

function PlaygroundContent() {
  const searchParams = useSearchParams()
  const initialTask = (searchParams.get('task') as TaskType) || 'object-detection'

  const [taskType, setTaskType] = useState<TaskType>(initialTask)
  const [model, setModel] = useState<ModelType>(modelOptions[initialTask][0].value)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<VisionJob | null>(null)
  const [dragActive, setDragActive] = useState(false)

  // Update model when task changes
  useEffect(() => {
    setModel(modelOptions[taskType][0].value)
  }, [taskType])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
        setResult(null)
      }
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
      setResult(null)
    }
  }, [])

  const handleTrySample = useCallback(async () => {
    // Fetch the sample image and convert to File
    const response = await fetch(sampleImageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'sample-image.jpg', { type: 'image/jpeg' })
    
    setImage(file)
    setImagePreview(sampleImageUrl)
    setResult(null)
  }, [])

  const handleClearImage = useCallback(() => {
    setImage(null)
    setImagePreview(null)
    setResult(null)
  }, [])

  const handleRunVision = useCallback(async () => {
    if (!image) return

    setIsProcessing(true)
    setResult(null)

    try {
      const response = await api.vision.runJob({
        taskType,
        model,
        image,
      })

      if (response.data) {
        setResult(response.data)
      }
    } catch (error) {
      console.error('Vision processing failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [image, taskType, model])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Playground</h1>
        <p className="mt-1 text-muted-foreground">
          Upload an image, choose a task, and see AI vision in action
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column - Controls */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Image</CardTitle>
              <CardDescription>Upload or drop an image to analyze</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-lg object-cover"
                    style={{ maxHeight: '300px' }}
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={handleClearImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                    dragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">
                    Drop your image here or click to browse
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    PNG, JPG up to 10MB
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={handleTrySample}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Try sample image
              </Button>
            </CardContent>
          </Card>

          {/* Task Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuration</CardTitle>
              <CardDescription>Select task type and model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Task Type</Label>
                <Select
                  value={taskType}
                  onValueChange={(value) => setTaskType(value as TaskType)}
                  disabled={isProcessing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {taskOptions.map((task) => (
                      <SelectItem key={task.value} value={task.value}>
                        <div className="flex items-center gap-2">
                          <task.icon className="h-4 w-4" />
                          <span>{task.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {taskOptions.find(t => t.value === taskType)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Model</Label>
                <Select
                  value={model}
                  onValueChange={(value) => setModel(value as ModelType)}
                  disabled={isProcessing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {modelOptions[taskType].map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleRunVision}
                disabled={!image || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Vision
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Results */}
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Results</CardTitle>
              <CardDescription>
                {result
                  ? `Processed in ${result.processingTime?.toFixed(2)}s`
                  : 'Upload an image and run vision to see results'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Spinner className="mb-4 h-8 w-8" />
                  <p className="text-sm font-medium">Processing image...</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    This may take a few seconds
                  </p>
                </div>
              ) : result ? (
                <ResultsDisplay result={result} imageUrl={imagePreview} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">No results yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload an image and choose a task to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ResultsDisplay({ result, imageUrl }: { result: VisionJob; imageUrl: string | null }) {
  if (result.status === 'failed') {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm font-medium text-destructive">Processing failed</p>
        <p className="mt-1 text-sm text-muted-foreground">{result.error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Success badge */}
      <Badge variant="secondary" className="gap-1">
        <CheckCircle className="h-3 w-3 text-green-500" />
        Completed
      </Badge>

      {/* Image with overlays */}
      {imageUrl && (
        <div className="relative overflow-hidden rounded-lg border border-border">
          <img
            src={imageUrl}
            alt="Processed"
            className="w-full object-cover"
            style={{ maxHeight: '300px' }}
          />
          {/* Bounding box overlay visualization would go here */}
        </div>
      )}

      {/* Results based on task type */}
      {result.taskType === 'object-detection' && result.result && (
        <DetectionResults boxes={(result.result as { boxes: BoundingBox[] }).boxes} />
      )}

      {result.taskType === 'instance-segmentation' && result.result && (
        <SegmentationResults masks={(result.result as { masks: SegmentationMask[] }).masks} />
      )}

      {result.taskType === 'classification' && result.result && (
        <ClassificationResults predictions={(result.result as { predictions: ClassificationResult[] }).predictions} />
      )}
    </div>
  )
}

function DetectionResults({ boxes }: { boxes: BoundingBox[] }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">
        {boxes.length} object{boxes.length !== 1 ? 's' : ''} detected
      </p>
      <div className="space-y-2">
        {boxes.map((box, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: box.color }}
              />
              <span className="text-sm font-medium capitalize">{box.label}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {(box.confidence * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SegmentationResults({ masks }: { masks: SegmentationMask[] }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">
        {masks.length} segment{masks.length !== 1 ? 's' : ''} detected
      </p>
      <div className="space-y-2">
        {masks.map((mask, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: mask.color.replace('0.5', '1') }}
              />
              <span className="text-sm font-medium capitalize">{mask.label}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {(mask.confidence * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClassificationResults({ predictions }: { predictions: ClassificationResult[] }) {
  const maxProb = Math.max(...predictions.map(p => p.probability))

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Top predictions</p>
      <div className="space-y-3">
        {predictions.slice(0, 5).map((pred, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className={i === 0 ? 'font-medium' : ''}>{pred.label}</span>
              <span className="text-muted-foreground">
                {(pred.probability * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              value={(pred.probability / maxProb) * 100}
              className="h-2"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-8"><Spinner className="h-8 w-8" /></div>}>
      <PlaygroundContent />
    </Suspense>
  )
}
