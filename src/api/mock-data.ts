import type {
  User,
  VisionJob,
  DashboardStats,
  BoundingBox,
  SegmentationMask,
  ClassificationResult,
} from './types';

// Mock user
export const mockUser: User = {
  id: '1',
  email: 'demo@visionverse.ai',
  fullName: 'Alex Johnson',
  createdAt: '2024-01-15T10:00:00Z',
};

// Mock bounding boxes for object detection
export const mockBoundingBoxes: BoundingBox[] = [
  { x: 50, y: 80, width: 120, height: 150, label: 'person', confidence: 0.95, color: '#3b82f6' },
  { x: 200, y: 100, width: 80, height: 100, label: 'car', confidence: 0.89, color: '#22c55e' },
  { x: 350, y: 150, width: 60, height: 80, label: 'dog', confidence: 0.87, color: '#f59e0b' },
];

// Mock segmentation masks
export const mockSegmentationMasks: SegmentationMask[] = [
  { label: 'person', confidence: 0.94, color: 'rgba(59, 130, 246, 0.5)', maskData: '' },
  { label: 'car', confidence: 0.91, color: 'rgba(34, 197, 94, 0.5)', maskData: '' },
  { label: 'road', confidence: 0.88, color: 'rgba(107, 114, 128, 0.5)', maskData: '' },
];

// Mock classification results
export const mockClassificationResults: ClassificationResult[] = [
  { label: 'Golden Retriever', probability: 0.92 },
  { label: 'Labrador Retriever', probability: 0.05 },
  { label: 'Golden Doodle', probability: 0.02 },
  { label: 'Cocker Spaniel', probability: 0.007 },
  { label: 'Irish Setter', probability: 0.003 },
];

// Mock vision jobs (history)
export const mockVisionJobs: VisionJob[] = [
  {
    id: '1',
    taskType: 'object-detection',
    model: 'yolov8-large',
    status: 'succeeded',
    imageUrl: '/sample-images/street-scene.jpg',
    thumbnailUrl: '/sample-images/street-scene-thumb.jpg',
    result: {
      boxes: mockBoundingBoxes,
      processingTime: 1.24,
    },
    createdAt: '2024-03-15T14:30:00Z',
    completedAt: '2024-03-15T14:30:01Z',
    processingTime: 1.24,
  },
  {
    id: '2',
    taskType: 'instance-segmentation',
    model: 'maskrcnn',
    status: 'succeeded',
    imageUrl: '/sample-images/office.jpg',
    thumbnailUrl: '/sample-images/office-thumb.jpg',
    result: {
      masks: mockSegmentationMasks,
      processingTime: 2.15,
    },
    createdAt: '2024-03-15T12:15:00Z',
    completedAt: '2024-03-15T12:15:02Z',
    processingTime: 2.15,
  },
  {
    id: '3',
    taskType: 'classification',
    model: 'resnet50',
    status: 'succeeded',
    imageUrl: '/sample-images/dog.jpg',
    thumbnailUrl: '/sample-images/dog-thumb.jpg',
    result: {
      predictions: mockClassificationResults,
      processingTime: 0.45,
    },
    createdAt: '2024-03-14T09:00:00Z',
    completedAt: '2024-03-14T09:00:01Z',
    processingTime: 0.45,
  },
  {
    id: '4',
    taskType: 'object-detection',
    model: 'yolov8-small',
    status: 'failed',
    imageUrl: '/sample-images/blurry.jpg',
    thumbnailUrl: '/sample-images/blurry-thumb.jpg',
    error: 'Image quality too low for reliable detection',
    createdAt: '2024-03-13T16:45:00Z',
    processingTime: 0.12,
  },
  {
    id: '5',
    taskType: 'instance-segmentation',
    model: 'maskrcnn',
    status: 'succeeded',
    imageUrl: '/sample-images/park.jpg',
    thumbnailUrl: '/sample-images/park-thumb.jpg',
    result: {
      masks: mockSegmentationMasks,
      processingTime: 1.89,
    },
    createdAt: '2024-03-12T11:20:00Z',
    completedAt: '2024-03-12T11:20:02Z',
    processingTime: 1.89,
  },
];

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalRuns: 47,
  lastModelUsed: 'yolov8-large',
  averageProcessingTime: 1.42,
  successRate: 94.5,
};

// Sample image for "Try sample image" feature
export const sampleImageUrl = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80';
