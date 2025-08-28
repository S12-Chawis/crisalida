/**
 * Crisálida Response Helper
 * 
 * CRITICAL FOR FRONTEND TEAM:
 * Standardized responses for all Crisálida endpoints
 * 
 * Frontend Views Integration:
 * - Dashboard: user stats, progress, recent activity
 * - Roadmap: levels, tasks, completion status
 * - Notes: CRUD operations for user notes
 * - Resources: saved materials and links
 * - Profile: user data management
 * - Auth: login/register responses
 * 
 * Standard Response Format:
 * {
 *   success: boolean,     // Always check this first
 *   message: string,      // User-friendly message
 *   data: any|null,       // Response payload
 *   error: string|null,   // Error type if failed
 *   timestamp: string,    // ISO timestamp
 *   meta?: object         // Additional metadata (pagination, counts, etc.)
 * }
 */

const logger = require('./logger');

class CrisalidaResponseHelper {
  /**
   * Format standard response object
   */
  formatResponse(success, data = null, message = '', error = null, meta = null) {
    const response = {
      success,
      message,
      data,
      error,
      timestamp: new Date().toISOString()
    };

    // Add metadata if provided (pagination, counts, etc.)
    if (meta) {
      response.meta = meta;
    }

    return response;
  }

  /**
   * SUCCESS RESPONSES (2xx) - For Crisálida Frontend
   */

  /**
   * 200 OK - Standard success response
   * Usage: responseHelper.success(res, userData, 'User profile retrieved')
   */
  success(res, data = null, message = 'Operation successful', meta = null) {
    const response = this.formatResponse(true, data, message, null, meta);
    
    logger.info('Success response', {
      statusCode: 200,
      message,
      hasData: !!data,
      dataType: data ? typeof data : null
    });

    return res.status(200).json(response);
  }

  /**
   * 201 Created - Resource created successfully
   * Usage: responseHelper.created(res, newRoadmap, 'Roadmap created successfully')
   */
  created(res, data = null, message = 'Resource created successfully', meta = null) {
    const response = this.formatResponse(true, data, message, null, meta);
    
    logger.info('Created response', {
      statusCode: 201,
      message,
      hasData: !!data,
      resourceType: data ? data.constructor.name : 'unknown'
    });

    return res.status(201).json(response);
  }

  /**
   * AUTHENTICATION RESPONSES - For Login/Register Views
   */

  /**
   * Successful login response with token and user data
   */
  loginSuccess(res, user, token, message = 'Login successful') {
    const data = {
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        rol: user.rol,
        current_level: user.current_level,
        preferred_language: user.preferred_language
      },
      token,
      tokenType: 'Bearer'
    };

    logger.info('User login successful', {
      userId: user.user_id,
      email: user.email,
      rol: user.rol
    });

    return this.success(res, data, message);
  }

  /**
   * Successful registration response
   */
  registerSuccess(res, user, message = 'Registration successful') {
    const data = {
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        rol: user.rol,
        creation_date: user.creation_date
      }
    };

    logger.info('User registration successful', {
      userId: user.user_id,
      email: user.email
    });

    return this.created(res, data, message);
  }

  /**
   * DASHBOARD RESPONSES - For Dashboard View
   */

  /**
   * Dashboard data with user stats and progress
   */
  dashboardData(res, dashboardData, message = 'Dashboard data retrieved') {
    const data = {
      user: dashboardData.user,
      stats: dashboardData.stats,
      recentActivity: dashboardData.recentActivity,
      nextSteps: dashboardData.nextSteps,
      streakInfo: dashboardData.streakInfo
    };

    const meta = {
      lastUpdated: new Date().toISOString(),
      totalRoadmaps: dashboardData.stats.totalRoadmaps,
      completionRate: dashboardData.stats.completionRate
    };

    return this.success(res, data, message, meta);
  }

  /**
   * ROADMAP RESPONSES - For Roadmap View
   */

  /**
   * Roadmap with levels and tasks
   */
  roadmapData(res, roadmapData, message = 'Roadmap data retrieved') {
    const data = {
      roadmap: roadmapData.roadmap,
      levels: roadmapData.levels,
      progress: roadmapData.progress,
      nextLevel: roadmapData.nextLevel
    };

    const meta = {
      totalLevels: roadmapData.levels.length,
      completedLevels: roadmapData.levels.filter(l => l.status === 'completed').length,
      progressPercentage: roadmapData.progress.percentage
    };

    return this.success(res, data, message, meta);
  }

  /**
   * Task completion response
   */
  taskCompleted(res, taskData, xpGained, message = 'Task completed successfully') {
    const data = {
      task: taskData.task,
      xpGained,
      newUserLevel: taskData.newUserLevel,
      unlockedContent: taskData.unlockedContent,
      triumphsEarned: taskData.triumphsEarned || []
    };

    const meta = {
      taskType: taskData.task.type,
      levelProgress: taskData.levelProgress
    };

    logger.info('Task completed', {
      userId: taskData.userId,
      taskId: taskData.task.task_id,
      xpGained,
      taskType: taskData.task.type
    });

    return this.success(res, data, message, meta);
  }

  /**
   * ERROR RESPONSES (4xx/5xx) - Standardized for all views
   */

  /**
   * 400 Bad Request - Invalid request data
   */
  badRequest(res, message = 'Invalid request data', details = null) {
    const response = this.formatResponse(false, details, message, 'Bad Request');
    
    logger.warn('Bad request', {
      statusCode: 400,
      message,
      details
    });

    return res.status(400).json(response);
  }

  /**
   * 401 Unauthorized - Authentication required
   */
  unauthorized(res, message = 'Authentication required') {
    const response = this.formatResponse(false, null, message, 'Unauthorized');
    
    logger.warn('Unauthorized access attempt', {
      statusCode: 401,
      message
    });

    return res.status(401).json(response);
  }

  /**
   * 403 Forbidden - Access denied
   */
  forbidden(res, message = 'Access denied') {
    const response = this.formatResponse(false, null, message, 'Forbidden');
    
    logger.warn('Forbidden access attempt', {
      statusCode: 403,
      message
    });

    return res.status(403).json(response);
  }

  /**
   * 404 Not Found - Resource not found
   */
  notFound(res, message = 'Resource not found') {
    const response = this.formatResponse(false, null, message, 'Not Found');
    
    logger.warn('Resource not found', {
      statusCode: 404,
      message
    });

    return res.status(404).json(response);
  }

  /**
   * 422 Unprocessable Entity - Validation errors
   */
  validationError(res, errors, message = 'Validation failed') {
    const response = this.formatResponse(false, { errors }, message, 'Validation Error');
    
    logger.warn('Validation error', {
      statusCode: 422,
      message,
      errors
    });

    return res.status(422).json(response);
  }

  /**
   * 500 Internal Server Error
   */
  internalError(res, message = 'Internal server error', error = null) {
    const response = this.formatResponse(false, null, message, 'Internal Server Error');
    
    logger.error('Internal server error', {
      statusCode: 500,
      message,
      error: error ? error.message : null,
      stack: error ? error.stack : null
    });

    return res.status(500).json(response);
  }

  /**
   * UTILITY METHODS - For pagination and common patterns
   */

  /**
   * Paginated response for lists (notes, resources, etc.)
   */
  paginated(res, items, pagination, message = 'Data retrieved successfully') {
    const data = {
      items,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit),
        hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
        hasPrev: pagination.page > 1
      }
    };

    const meta = {
      itemCount: items.length,
      totalItems: pagination.total
    };

    logger.info('Paginated response', {
      statusCode: 200,
      message,
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      itemCount: items.length
    });

    return res.status(200).json(this.formatResponse(true, data, message, null, meta));
  }

  /**
   * Handle async controller errors
   */
  asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

// Export singleton instance
const crisalidaResponseHelper = new CrisalidaResponseHelper();
module.exports = crisalidaResponseHelper;