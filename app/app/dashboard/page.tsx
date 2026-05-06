'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/src/lib/auth-context'
import { api } from '@/src/api/client'
import type { DashboardStats, VisionJob } from '@/src/api/types'
import { 
  Activity, 
  Clock, 
  Cpu, 
  TrendingUp, 
  Scan, 
  Layers, 
  Tags, 
  FlaskConical,
  ArrowRight,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const taskTypeLabels = {
  'object-detection': 'Detection',
  'instance-segmentation': 'Segmentation',
  'classification': 'Classification',
}

const statusConfig = {
  succeeded: { icon: CheckCircle, className: 'text-green-500', label: 'Succeeded' },
  failed: { icon: XCircle, className: 'text-red-500', label: 'Failed' },
  processing: { icon: Loader2, className: 'text-yellow-500 animate-spin', label: 'Processing' },
  pending: { icon: Clock, className: 'text-muted-foreground', label: 'Pending' },
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentJobs, setRecentJobs] = useState<VisionJob[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const [statsRes, jobsRes] = await Promise.all([
        api.dashboard.getStats(),
        api.dashboard.getRecentActivity(5),
      ])
      
      if (statsRes.data) setStats(statsRes.data)
      if (jobsRes.data) setRecentJobs(jobsRes.data)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const firstName = user?.fullName?.split(' ')[0] || 'there'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s happening with your computer vision projects
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Runs"
          value={stats?.totalRuns}
          icon={Activity}
          isLoading={isLoading}
        />
        <StatsCard
          title="Last Model Used"
          value={stats?.lastModelUsed?.replace('-', ' ').toUpperCase() || 'None'}
          icon={Cpu}
          isLoading={isLoading}
        />
        <StatsCard
          title="Avg. Processing Time"
          value={stats ? `${stats.averageProcessingTime.toFixed(2)}s` : undefined}
          icon={Clock}
          isLoading={isLoading}
        />
        <StatsCard
          title="Success Rate"
          value={stats ? `${stats.successRate.toFixed(1)}%` : undefined}
          icon={TrendingUp}
          isLoading={isLoading}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into a task or explore the playground</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/app/playground?task=object-detection">
              <Button variant="outline" className="h-auto w-full justify-start gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Scan className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Object Detection</p>
                  <p className="text-xs text-muted-foreground">Detect objects in images</p>
                </div>
              </Button>
            </Link>
            <Link href="/app/playground?task=instance-segmentation">
              <Button variant="outline" className="h-auto w-full justify-start gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <Layers className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Segmentation</p>
                  <p className="text-xs text-muted-foreground">Instance segmentation</p>
                </div>
              </Button>
            </Link>
            <Link href="/app/playground?task=classification">
              <Button variant="outline" className="h-auto w-full justify-start gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Tags className="h-5 w-5 text-orange-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Classification</p>
                  <p className="text-xs text-muted-foreground">Classify images</p>
                </div>
              </Button>
            </Link>
            <Link href="/app/playground">
              <Button variant="outline" className="h-auto w-full justify-start gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FlaskConical className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Playground</p>
                  <p className="text-xs text-muted-foreground">Explore all tasks</p>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest vision processing jobs</CardDescription>
          </div>
          <Link href="/app/history">
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          ) : recentJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Activity className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">No activity yet</p>
              <p className="text-sm text-muted-foreground">
                Run your first vision job to see activity here
              </p>
              <Link href="/app/playground" className="mt-4">
                <Button size="sm">
                  Go to Playground
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentJobs.map((job) => {
                const StatusIcon = statusConfig[job.status].icon
                return (
                  <Link
                    key={job.id}
                    href={`/app/history?job=${job.id}`}
                    className="flex items-center gap-4 rounded-lg border border-transparent p-2 transition-colors hover:border-border hover:bg-muted/50"
                  >
                    {/* Thumbnail placeholder */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      {job.taskType === 'object-detection' && <Scan className="h-5 w-5 text-muted-foreground" />}
                      {job.taskType === 'instance-segmentation' && <Layers className="h-5 w-5 text-muted-foreground" />}
                      {job.taskType === 'classification' && <Tags className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {taskTypeLabels[job.taskType]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {job.model.replace('-', ' ')} &middot;{' '}
                        {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                      </p>
                    </div>

                    {/* Status */}
                    <Badge variant="secondary" className="shrink-0 gap-1">
                      <StatusIcon className={`h-3 w-3 ${statusConfig[job.status].className}`} />
                      {statusConfig[job.status].label}
                    </Badge>
                  </Link>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon: Icon,
  isLoading,
}: {
  title: string
  value?: string | number
  icon: React.ComponentType<{ className?: string }>
  isLoading: boolean
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
      </CardContent>
    </Card>
  )
}
