/**
 * VisionVerse API Client
 * 
 * This module provides a unified interface for all API calls.
 * Currently uses mock data with artificial delays for demonstration.
 * Replace the implementations with real API calls to your Python backend.
 * 
 * Expected base URL: process.env.NEXT_PUBLIC_API_URL
 */

import type {
  User,
  RegisterPayload,
  LoginPayload,
  ChangePasswordPayload,
  AuthResponse,
  VisionJob,
  RunJobPayload,
  JobsListParams,
  JobsListResponse,
  DashboardStats,
  ApiResponse,
} from './types';

import {
  mockUser,
  mockVisionJobs,
  mockDashboardStats,
  mockBoundingBoxes,
  mockSegmentationMasks,
  mockClassificationResults,
} from './mock-data';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory state for mock auth
let currentUser: User | null = null;
let mockJobs = [...mockVisionJobs];
let nextJobId = 100;

// ============================================
// Auth API
// ============================================

export const auth = {
  /**
   * Register a new user
   */
  async register(payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> {
    await delay(800);
    
    // Mock validation
    if (!payload.email.includes('@')) {
      return { error: { message: 'Invalid email address' } };
    }
    
    const newUser: User = {
      id: String(Date.now()),
      email: payload.email,
      fullName: payload.fullName,
      createdAt: new Date().toISOString(),
    };
    
    currentUser = newUser;
    
    return {
      data: {
        user: newUser,
        token: 'mock-jwt-token-' + Date.now(),
      },
    };
  },

  /**
   * Log in an existing user
   */
  async login(payload: LoginPayload): Promise<ApiResponse<AuthResponse>> {
    await delay(600);
    
    // Mock: accept any email/password combo for demo
    if (payload.email && payload.password) {
      currentUser = {
        ...mockUser,
        email: payload.email,
      };
      
      return {
        data: {
          user: currentUser,
          token: 'mock-jwt-token-' + Date.now(),
        },
      };
    }
    
    return { error: { message: 'Invalid credentials' } };
  },

  /**
   * Change password for current user
   */
  async changePassword(payload: ChangePasswordPayload): Promise<ApiResponse<{ success: boolean }>> {
    await delay(500);
    
    // Mock validation
    if (payload.currentPassword.length < 6) {
      return { error: { message: 'Current password is incorrect' } };
    }
    
    if (payload.newPassword.length < 8) {
      return { error: { message: 'New password must be at least 8 characters' } };
    }
    
    return { data: { success: true } };
  },

  /**
   * Log out current user
   */
  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    await delay(200);
    currentUser = null;
    return { data: { success: true } };
  },

  /**
   * Get current auth state
   */
  isAuthenticated(): boolean {
    // In a real app, check for valid JWT in localStorage/cookies
    return currentUser !== null;
  },
};

// ============================================
// User API
// ============================================

export const user = {
  /**
   * Get current user's profile
   */
  async getProfile(): Promise<ApiResponse<User>> {
    await delay(300);
    
    if (!currentUser) {
      // Return mock user for demo purposes
      return { data: mockUser };
    }
    
    return { data: currentUser };
  },

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    await delay(400);
    
    if (currentUser) {
      currentUser = { ...currentUser, ...updates };
      return { data: currentUser };
    }
    
    return { error: { message: 'Not authenticated' } };
  },
};

// ============================================
// Vision API
// ============================================

export const vision = {
  /**
   * Run a vision job (object detection, segmentation, or classification)
   */
  async runJob(payload: RunJobPayload): Promise<ApiResponse<VisionJob>> {
    // Simulate processing time based on model
    const processingTime = payload.model.includes('large') ? 2000 : 
                          payload.model.includes('small') ? 800 : 1200;
    
    await delay(processingTime);
    
    const jobId = String(nextJobId++);
    const now = new Date().toISOString();
    
    // Generate mock result based on task type
    let result;
    let actualProcessingTime;
    
    switch (payload.taskType) {
      case 'object-detection':
        actualProcessingTime = 1.2 + Math.random() * 0.5;
        result = {
          boxes: mockBoundingBoxes,
          processingTime: actualProcessingTime,
        };
        break;
      case 'instance-segmentation':
        actualProcessingTime = 1.8 + Math.random() * 0.7;
        result = {
          masks: mockSegmentationMasks,
          processingTime: actualProcessingTime,
        };
        break;
      case 'classification':
        actualProcessingTime = 0.4 + Math.random() * 0.2;
        result = {
          predictions: mockClassificationResults,
          processingTime: actualProcessingTime,
        };
        break;
    }
    
    const job: VisionJob = {
      id: jobId,
      taskType: payload.taskType,
      model: payload.model,
      status: 'succeeded',
      imageUrl: URL.createObjectURL(payload.image),
      thumbnailUrl: URL.createObjectURL(payload.image),
      result,
      createdAt: now,
      completedAt: now,
      processingTime: actualProcessingTime,
    };
    
    // Add to mock history
    mockJobs.unshift(job);
    
    return { data: job };
  },

  /**
   * List all vision jobs with pagination and filters
   */
  async listJobs(params: JobsListParams = {}): Promise<ApiResponse<JobsListResponse>> {
    await delay(400);
    
    const { page = 1, pageSize = 10, taskType, status } = params;
    
    let filtered = [...mockJobs];
    
    if (taskType) {
      filtered = filtered.filter(job => job.taskType === taskType);
    }
    
    if (status) {
      filtered = filtered.filter(job => job.status === status);
    }
    
    const start = (page - 1) * pageSize;
    const paged = filtered.slice(start, start + pageSize);
    
    return {
      data: {
        jobs: paged,
        total: filtered.length,
        page,
        pageSize,
      },
    };
  },

  /**
   * Get a single job by ID
   */
  async getJob(id: string): Promise<ApiResponse<VisionJob>> {
    await delay(300);
    
    const job = mockJobs.find(j => j.id === id);
    
    if (!job) {
      return { error: { message: 'Job not found' } };
    }
    
    return { data: job };
  },
};

// ============================================
// Dashboard API
// ============================================

export const dashboard = {
  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    await delay(500);
    
    return {
      data: {
        ...mockDashboardStats,
        totalRuns: mockJobs.length,
      },
    };
  },

  /**
   * Get recent activity (latest jobs)
   */
  async getRecentActivity(limit = 5): Promise<ApiResponse<VisionJob[]>> {
    await delay(300);
    
    return {
      data: mockJobs.slice(0, limit),
    };
  },
};

// ============================================
// Export unified API object
// ============================================

export const api = {
  auth,
  user,
  vision,
  dashboard,
};

export default api;
