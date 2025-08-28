// test-response.js
require('dotenv').config();
const responseHelper = require('./src/utils/response.helper');

// Mock de Express response
const mockRes = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log(`\n📊 Status: ${this.statusCode}`);
    console.log('📋 Response:');
    console.log(JSON.stringify(data, null, 2));
    return this;
  }
};

console.log('🦋 === Testing Crisálida Response Helper ===\n');

// Test Login Success
console.log('1️⃣ Login Response:');
const mockUser = {
  user_id: 'uuid-123',
  user_name: 'TestUser',
  email: 'test@crisalida.com',
  rol: 'user',
  current_level: 5,
  preferred_language: 'es'
};
responseHelper.loginSuccess(mockRes, mockUser, 'jwt-token-123');

// Test Dashboard Data
console.log('\n2️⃣ Dashboard Response:');
const mockDashboard = {
  user: mockUser,
  stats: { totalRoadmaps: 3, completionRate: 75 },
  recentActivity: ['Completed task: React Basics', 'Earned triumph: First Steps'],
  nextSteps: ['Continue with JavaScript Advanced'],
  streakInfo: { current: 5, longest: 12 }
};
responseHelper.dashboardData(mockRes, mockDashboard);

// Test Error
console.log('\n3️⃣ Error Response:');
responseHelper.validationError(mockRes, 
  [{ field: 'email', message: 'Email is required' }],
  'Form validation failed'
);