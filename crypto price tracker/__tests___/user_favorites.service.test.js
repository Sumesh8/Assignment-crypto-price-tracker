// user_favorites.service.test.js

const userFavoritesService = require('../api/user_favorites/user_favorites.service');

describe('User Favorites Service', () => {
  test('Should create user favorites', () => {
    const favoritesData = {
      userId: 1,
      crypto_symbols: 'etheur,btcusdt'
    };

    userFavoritesService.createFavorites(favoritesData, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
    });
  });

  test('Should get user favorites by userId', () => {
    const userId = 1;

    userFavoritesService.getFavorites(userId, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].userId).toBe(userId);
    });
  });

  test('Should update user favorites', () => {
    const updatedFavoritesData = {
      userId: 1,
      crypto_symbols: 'etheur,btcusdt,ethusdt'
    };

    userFavoritesService.updateFavorites(updatedFavoritesData, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
    });
  });

  test('Should delete user favorites by userId', () => {
    const userIdToDelete = 1;

    userFavoritesService.deleteFavorites(userIdToDelete, (error, result) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
    });
  });

});

afterAll(() => {
    pool.end();
  });
