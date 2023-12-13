// user.service.test.js

const userService = require('../api/users/user.service');

describe('User Service', () => {
  test('Should create a new user', () => {
    const userData = {
      first_name: 'Sumesh',
      last_name: 'Akalanka',
      email: 'kvsumeshakalanka@gmail.com',
      password: '1'
    };

    userService.create(userData, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
    });
  });

  test('Should get a list of users', () => {
    userService.getUsers((error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  test('Should get a user by userId', () => {
    const userId = 1;

    userService.getUserByUserId(userId, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
      expect(result.id).toBe(userId);
    });
  });

  test('Should update a user', () => {
    const updatedUserData = {
      id: 1,
      first_name: 'Sudesh',
      last_name: 'Anuradha',
      email: 'kvsudeshanuradha@gmail.com',
      password: '123'
    };

    userService.updateUser(updatedUserData, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
    });
  });

  test('Should delete a user', () => {
    const userIdToDelete = 1;

    userService.deleteUser(userIdToDelete, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
    });
  });

  test('Should get a user by userEmail', () => {
    const userEmail = 'kvsumeshakalanka@gmail.com';

    userService.getUserByUserEmail(userEmail, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
      expect(result.email).toBe(userEmail);
    });
  });

});

afterAll(() => {
  pool.end();
});
