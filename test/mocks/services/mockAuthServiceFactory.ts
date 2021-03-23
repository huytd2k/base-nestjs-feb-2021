export const mockAuthServiceFactory = () => ({
  getUserInfoByUsername: jest.fn(),
  validateUser: jest.fn(),
  login: jest.fn(),
  issueNewToken: jest.fn(),
});
