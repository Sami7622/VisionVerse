// ============================================
// User & Auth Types
// ============================================

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ============================================
// Vision / CV Types
// ============================================

export type TaskType = 'object-detection' | 'instance-segmentation' | 'classification';

export type ModelType = 
  | 'yolov8-small'
  | 'yolov8-large'
  | 'yolov8-nano'
  | 'maskrcnn'
  | 'resnet50'
  | 'efficientnet';

export type JobStatus = 'pending' | 'processing' | 'succeeded' | 'failed';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
  color: string;
}

export interface SegmentationMask {
  label: string;
  confidence: number;
  color: string;
  maskData: string; // Base64 encoded mask or polygon points
}

export interface ClassificationResult {
  label: string;
  probability: number;
}

export interface DetectionResult {
  boxes: BoundingBox[];
  processingTime: number;
}

export interface SegmentationResult {
  masks: SegmentationMask[];
  processingTime: number;
}

export interface ClassificationJobResult {
  predictions: ClassificationResult[];
  processingTime: number;
}

export type JobResult = DetectionResult | SegmentationResult | ClassificationJobResult;

export interface VisionJob {
  id: string;
  taskType: TaskType;
  model: ModelType;
  status: JobStatus;
  imageUrl: string;
  thumbnailUrl: string;
  result?: JobResult;
  error?: string;
  createdAt: string;
  completedAt?: string;
  processingTime?: number;
}

export interface RunJobPayload {
  taskType: TaskType;
  model: ModelType;
  image: File;
}

export interface JobsListResponse {
  jobs: VisionJob[];
  total: number;
  page: number;
  pageSize: number;
}

export interface JobsListParams {
  page?: number;
  pageSize?: number;
  taskType?: TaskType;
  status?: JobStatus;
}

// ============================================
// Dashboard Types
// ============================================

export interface DashboardStats {
  totalRuns: number;
  lastModelUsed: ModelType | null;
  averageProcessingTime: number;
  successRate: number;
}

// ============================================
// API Response Types
// ============================================

export interface ApiError {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
