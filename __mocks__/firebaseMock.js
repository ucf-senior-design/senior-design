// __mocks__/firebaseMock.js
module.exports = {
  apps: jest.fn(),
  getAuth: jest.fn(),
  getStorage: jest.fn(),
  getApps: jest.fn(() => []),
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  getApp: jest.fn(),
  getFirestore: jest.fn(() => ({
    collection: jest.fn(),
  })),
  collection: jest.fn(() => ({
    withConverter: jest.fn(),
  })),
}
