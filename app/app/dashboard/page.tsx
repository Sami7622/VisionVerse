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
  Sparkles,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const taskTypeLabels = {
  'object-detection': 'Detection',
  'instance-segmentation': 'Segmentation',
  'classification': 'Classification',
}

const statusConfig = {
  succeeded: { icon: CheckCircle, className: 'text-chart-3', label: 'Succeeded' },
  failed: { icon: XCircle, className: 'text-destructive', label: 'Failed' },
  processing: { icon: Loader2, className: 'text-chart-5 animate-spin', label: 'Processing' },
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
      {/* Header with gradient text */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full gradient-orb opacity-30 blur-2xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, <span className="gradient-text">{firstName}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here&apos;s what&apos;s happening with your computer vision projects
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Runs"
          value={stats?.totalRuns}
          icon={Activity}
          isLoading={isLoading}
          gradient="from-primary/10 to-primary/5"
          iconColor="text-primary"
        />
        <StatsCard
          title="Last Model Used"
          value={stats?.lastModelUsed?.replace('-', ' ').toUpperCase() || 'None'}
          icon={Cpu}
          isLoading={isLoading}
          gradient="from-accent/10 to-accent/5"
          iconColor="text-accent"
        />
        <StatsCard
          title="Avg. Processing Time"
          value={stats ? `${stats.averageProcessingTime.toFixed(2)}s` : undefined}
          icon={Clock}
          isLoading={isLoading}
          gradient="from-chart-3/10 to-chart-3/5"
          iconColor="text-chart-3"
        />
        <StatsCard
          title="Success Rate"
          value={stats ? `${stats.successRate.toFixed(1)}%` : undefined}
          icon={TrendingUp}
          isLoading={isLoading}
          gradient="from-chart-5/10 to-chart-5/5"
          iconColor="text-chart-5"
        />
      </div>

      {/* Quick Actions */}
      <Card className="border-2 overflow-hidden">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>Jump into a task or explore the playground</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/app/playground?task=object-detection">
              <Button variant="outline" className="h-auto w-full justify-start gap-4 p-4 border-2 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-1 hover:shadow-lg group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Scan className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Object Detection</p>
                  <p className="text-xs text-muted-foreground">Detect objects in images</p>
                </div>
              </Button>
            </Link>
            <Link href="/app/playground?task=instance-segmentation">
              <Button variant="outline" className="h-auto w-full justify-start gap-4 p-4 border-2 transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:-translate-y-1 hover:shadow-lg group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <Layers className="h-6 w-6 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Segmentation</p>
                  <p className="text-xs text-muted-foreground">Instance segmentation</p>
                </div>
              </Button>
            </Link>
            <Link href="/app/playground?task=classification">
              <Button variant="outline" className="h-auto w-full justify-start gap-4 p-4 border-2 transition-all duration-300 hover:border-chart-5/40 hover:bg-chart-5/5 hover:-translate-y-1 hover:shadow-lg group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-5/10 transition-colors group-hover:bg-chart-5/20">
                  <Tags className="h-6 w-6 text-chart-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Classification</p>
                  <p className="text-xs text-muted-foreground">Classify images</p>
                </div>
              </Button>
            </Link>
            <Link href="/app/playground">
              <Button variant="outline" className="h-auto w-full justify-start gap-4 p-4 border-2 transition-all duration-300 hover:border-chart-3/40 hover:bg-chart-3/5 hover:-translate-y-1 hover:shadow-lg group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3/10 transition-colors group-hover:bg-chart-3/20">
                  <FlaskConical className="h-6 w-6 text-chart-3" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Playground</p>
                  <p className="text-xs text-muted-foreground">Explore all tasks</p>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest vision processing jobs</CardDescription>
          </div>
          <Link href="/app/history">
            <Button variant="ghost" size="sm" className="group">
              View all
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              ))}
            </div>
          ) : recentJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Activity className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg font-semibold">No activity yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Run your first vision job to see activity here
              </p>
              <Link href="/app/playground" className="mt-6">
                <Button className="group">
                  Go to Playground
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentJobs.map((job) => {
                const StatusIcon = statusConfig[job.status].icon
                return (
                  <Link
                    key={job.id}
                    href={`/app/history?job=${job.id}`}
                    className="flex items-center gap-4 rounded-xl border-2 border-transparent p-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                  >
                    {/* Thumbnail placeholder */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                      {job.taskType === 'object-detection' && <Scan className="h-5 w-5 text-primary" />}
                      {job.taskType === 'instance-segmentation' && <Layers className="h-5 w-5 text-accent" />}
                      {job.taskType === 'classification' && <Tags className="h-5 w-5 text-chart-5" />}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">
                        {taskTypeLabels[job.taskType]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {job.model.replace('-', ' ')} &middot;{' '}
                        {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                      </p>
                    </div>

                    {/* Status */}
                    <Badge variant="secondary" className="shrink-0 gap-1.5 rounded-full px-3">
                      <StatusIcon className={`h-3.5 w-3.5 ${statusConfig[job.status].className}`} />
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
  gradient,
  iconColor,
}: {
  title: string
  value?: string | number
  icon: React.ComponentType<{ className?: string }>
  isLoading: boolean
  gradient: string
  iconColor: string
}) {
  return (
    <Card className={`border-2 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />
      <CardHeader className="relative flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-background/80`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent className="relative">
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
      </CardContent>
    </Card>
  )
}
