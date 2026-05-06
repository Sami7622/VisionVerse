'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { Progress } from '@/components/ui/progress'
import { api } from '@/src/api/client'
import type { VisionJob, TaskType, JobStatus, BoundingBox, SegmentationMask, ClassificationResult } from '@/src/api/types'
import { 
  Scan, 
  Layers, 
  Tags, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Clock,
  History,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { format } from 'date-fns'

const taskTypeLabels: Record<TaskType, string> = {
  'object-detection': 'Object Detection',
  'instance-segmentation': 'Segmentation',
  'classification': 'Classification',
}

const taskTypeIcons: Record<TaskType, typeof Scan> = {
  'object-detection': Scan,
  'instance-segmentation': Layers,
  'classification': Tags,
}

const statusConfig: Record<JobStatus, { icon: typeof CheckCircle; className: string; label: string }> = {
  succeeded: { icon: CheckCircle, className: 'text-green-500', label: 'Succeeded' },
  failed: { icon: XCircle, className: 'text-red-500', label: 'Failed' },
  processing: { icon: Loader2, className: 'text-yellow-500 animate-spin', label: 'Processing' },
  pending: { icon: Clock, className: 'text-muted-foreground', label: 'Pending' },
}

function HistoryContent() {
  const searchParams = useSearchParams()
  const jobIdFromUrl = searchParams.get('job')

  const [jobs, setJobs] = useState<VisionJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const pageSize = 10

  const [taskFilter, setTaskFilter] = useState<TaskType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all')
  
  const [selectedJob, setSelectedJob] = useState<VisionJob | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true)
      const response = await api.vision.listJobs({
        page,
        pageSize,
        taskType: taskFilter === 'all' ? undefined : taskFilter,
        status: statusFilter === 'all' ? undefined : statusFilter,
      })

      if (response.data) {
        setJobs(response.data.jobs)
        setTotal(response.data.total)
      }
      setIsLoading(false)
    }

    loadJobs()
  }, [page, taskFilter, statusFilter])

  // Open detail dialog if job ID is in URL
  useEffect(() => {
    if (jobIdFromUrl && jobs.length > 0) {
      const job = jobs.find(j => j.id === jobIdFromUrl)
      if (job) {
        setSelectedJob(job)
        setDetailOpen(true)
      }
    }
  }, [jobIdFromUrl, jobs])

  const totalPages = Math.ceil(total / pageSize)

  const handleViewDetails = (job: VisionJob) => {
    setSelectedJob(job)
    setDetailOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">History</h1>
        <p className="mt-1 text-muted-foreground">
          View and manage your previous vision processing jobs
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="w-[180px]">
              <Select
                value={taskFilter}
                onValueChange={(value) => {
                  setTaskFilter(value as TaskType | 'all')
                  setPage(1)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Task type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All tasks</SelectItem>
                  <SelectItem value="object-detection">Object Detection</SelectItem>
                  <SelectItem value="instance-segmentation">Segmentation</SelectItem>
                  <SelectItem value="classification">Classification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[180px]">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value as JobStatus | 'all')
                  setPage(1)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="succeeded">Succeeded</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs</CardTitle>
          <CardDescription>
            {total} job{total !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <History className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">No jobs found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {taskFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Run your first vision job in the Playground'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => {
                const TaskIcon = taskTypeIcons[job.taskType]
                const StatusIcon = statusConfig[job.status].icon

                return (
                  <div
                    key={job.id}
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <TaskIcon className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{taskTypeLabels[job.taskType]}</p>
                        <Badge variant="secondary" className="gap-1">
                          <StatusIcon className={`h-3 w-3 ${statusConfig[job.status].className}`} />
                          {statusConfig[job.status].label}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {job.model.replace('-', ' ')} &middot;{' '}
                        {format(new Date(job.createdAt), 'MMM d, yyyy h:mm a')}
                        {job.processingTime && (
                          <> &middot; {job.processingTime.toFixed(2)}s</>
                        )}
                      </p>
                    </div>

                    {/* Action */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(job)}
                    >
                      View details
                    </Button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{taskTypeLabels[selectedJob.taskType]}</DialogTitle>
                <DialogDescription>
                  Job ID: {selectedJob.id} &middot;{' '}
                  {format(new Date(selectedJob.createdAt), 'MMM d, yyyy h:mm a')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Status and metadata */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1">
                    {(() => {
                      const StatusIcon = statusConfig[selectedJob.status].icon
                      return (
                        <>
                          <StatusIcon className={`h-3 w-3 ${statusConfig[selectedJob.status].className}`} />
                          {statusConfig[selectedJob.status].label}
                        </>
                      )
                    })()}
                  </Badge>
                  <Badge variant="outline">{selectedJob.model.replace('-', ' ')}</Badge>
                  {selectedJob.processingTime && (
                    <Badge variant="outline">{selectedJob.processingTime.toFixed(2)}s</Badge>
                  )}
                </div>

                {/* Image */}
                {selectedJob.imageUrl && (
                  <div className="overflow-hidden rounded-lg border border-border">
                    <img
                      src={selectedJob.imageUrl}
                      alt="Processed"
                      className="w-full object-contain"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                )}

                {/* Results */}
                {selectedJob.status === 'failed' && selectedJob.error && (
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <p className="text-sm font-medium text-destructive">Error</p>
                    <p className="mt-1 text-sm text-muted-foreground">{selectedJob.error}</p>
                  </div>
                )}

                {selectedJob.status === 'succeeded' && selectedJob.result && (
                  <div className="rounded-lg border border-border p-4">
                    <p className="mb-3 text-sm font-medium">Results</p>
                    
                    {selectedJob.taskType === 'object-detection' && (
                      <div className="space-y-2">
                        {(selectedJob.result as { boxes: BoundingBox[] }).boxes.map((box, i) => (
                          <div key={i} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: box.color }} />
                              <span className="text-sm capitalize">{box.label}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {(box.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedJob.taskType === 'instance-segmentation' && (
                      <div className="space-y-2">
                        {(selectedJob.result as { masks: SegmentationMask[] }).masks.map((mask, i) => (
                          <div key={i} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: mask.color.replace('0.5', '1') }} />
                              <span className="text-sm capitalize">{mask.label}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {(mask.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedJob.taskType === 'classification' && (
                      <div className="space-y-3">
                        {(selectedJob.result as { predictions: ClassificationResult[] }).predictions.slice(0, 5).map((pred, i) => {
                          const maxProb = Math.max(...(selectedJob.result as { predictions: ClassificationResult[] }).predictions.map(p => p.probability))
                          return (
                            <div key={i} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className={i === 0 ? 'font-medium' : ''}>{pred.label}</span>
                                <span className="text-muted-foreground">
                                  {(pred.probability * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress value={(pred.probability / maxProb) * 100} className="h-2" />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function HistoryPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-8"><Spinner className="h-8 w-8" /></div>}>
      <HistoryContent />
    </Suspense>
  )
}
