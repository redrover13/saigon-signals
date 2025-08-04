/**
 * @file Tests for the data-pipeline library.
 * @author Dulce de Saigon Team
 * @copyright 2025 Dulce de Saigon
 * @license MIT
 */

import { fetchMealsByIngredient, processMeals } from './data-pipeline';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('data-pipeline', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('fetchMealsByIngredient', () => {
    it('should fetch meals by ingredient successfully', async () => {
      // Arrange
      const ingredient = 'chicken';
      const mockResponse = {
        data: {
          meals: [
            {
              idMeal: '1',
              strMeal: 'Chicken Soup',
              strDrinkAlternate: null,
              strCategory: 'Chicken',
              strArea: 'American',
              strInstructions: 'Cook chicken soup',
              strMealThumb: 'https://example.com/chicken-soup.jpg',
              strTags: 'soup,chicken',
              strYoutube: 'https://youtube.com/watch?v=123',
              strIngredient1: 'Chicken',
              strIngredient2: 'Water',
              strIngredient3: '',
              strIngredient4: '',
              strIngredient5: '',
              strIngredient6: '',
              strIngredient7: '',
              strIngredient8: '',
              strIngredient9: '',
              strIngredient10: '',
              strIngredient11: '',
              strIngredient12: '',
              strIngredient13: '',
              strIngredient14: '',
              strIngredient15: '',
              strIngredient16: '',
              strIngredient17: '',
              strIngredient18: '',
              strIngredient19: '',
              strIngredient20: '',
              strMeasure1: '1 lb',
              strMeasure2: '2 cups',
              strMeasure3: '',
              strMeasure4: '',
              strMeasure5: '',
              strMeasure6: '',
              strMeasure7: '',
              strMeasure8: '',
              strMeasure9: '',
              strMeasure10: '',
              strMeasure11: '',
              strMeasure12: '',
              strMeasure13: '',
              strMeasure14: '',
              strMeasure15: '',
              strMeasure16: '',
              strMeasure17: '',
              strMeasure18: '',
              strMeasure19: '',
              strMeasure20: '',
              strSource: 'https://example.com/recipe',
              strImageSource: 'https://example.com/image',
              strCreativeCommonsConfirmed: 'Yes',
              dateModified: '2025-01-01',
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      // Act
      const result = await fetchMealsByIngredient(ingredient);

      // Assert
      expect(result).toEqual(mockResponse.data.meals);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
        { timeout: 10000 }
      );
    });

    it('should return null when no meals are found', async () => {
      // Arrange
      const ingredient = 'nonexistent';
      const mockResponse = {
        data: {
          meals: null,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      // Act
      const result = await fetchMealsByIngredient(ingredient);

      // Assert
      expect(result).toBeNull();
    });

    it('should throw an error for invalid input', async () => {
      // Act & Assert
      await expect(fetchMealsByIngredient('')).rejects.toThrow(
        'Invalid ingredient provided. Ingredient must be a non-empty string.'
      );
      
      await expect(fetchMealsByIngredient(null as any)).rejects.toThrow(
        'Invalid ingredient provided. Ingredient must be a non-empty string.'
      );
      
      await expect(fetchMealsByIngredient(undefined as any)).rejects.toThrow(
        'Invalid ingredient provided. Ingredient must be a non-empty string.'
      );
    });

    it('should handle API errors gracefully', async () => {
      // Arrange
      const ingredient = 'chicken';
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      // Act & Assert
      await expect(fetchMealsByIngredient(ingredient)).rejects.toThrow(
        errorMessage
      );
    });

    it('should handle axios network errors gracefully', async () => {
      // Arrange
      const ingredient = 'chicken';
      const error = new Error('Network Error');
      mockedAxios.get.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(fetchMealsByIngredient(ingredient)).rejects.toThrow(
        'Network Error'
      );
    });
  });

  describe('processMeals', () => {
    it('should process meals correctly', () => {
      // Arrange
      const meals = [
        {
          idMeal: '1',
          strMeal: 'Chicken Soup',
          strDrinkAlternate: null,
          strCategory: 'Chicken',
          strArea: 'American',
          strInstructions: 'Cook chicken soup',
          strMealThumb: 'https://example.com/chicken-soup.jpg',
          strTags: 'soup,chicken',
          strYoutube: 'https://youtube.com/watch?v=123',
          strIngredient1: 'Chicken',
          strIngredient2: 'Water',
          strIngredient3: '',
          strIngredient4: '',
          strIngredient5: '',
          strIngredient6: '',
          strIngredient7: '',
          strIngredient8: '',
          strIngredient9: '',
          strIngredient10: '',
          strIngredient11: '',
          strIngredient12: '',
          strIngredient13: '',
          strIngredient14: '',
          strIngredient15: '',
          strIngredient16: '',
          strIngredient17: '',
          strIngredient18: '',
          strIngredient19: '',
          strIngredient20: '',
          strMeasure1: '1 lb',
          strMeasure2: '2 cups',
          strMeasure3: '',
          strMeasure4: '',
          strMeasure5: '',
          strMeasure6: '',
          strMeasure7: '',
          strMeasure8: '',
          strMeasure9: '',
          strMeasure10: '',
          strMeasure11: '',
          strMeasure12: '',
          strMeasure13: '',
          strMeasure14: '',
          strMeasure15: '',
          strMeasure16: '',
          strMeasure17: '',
          strMeasure18: '',
          strMeasure19: '',
          strMeasure20: '',
          strSource: 'https://example.com/recipe',
          strImageSource: 'https://example.com/image',
          strCreativeCommonsConfirmed: 'Yes',
          dateModified: '2025-01-01',
        },
      ];

      // Act
      const result = processMeals(meals);

      // Assert
      expect(result).toEqual(meals);
    });

    it('should return null when input is null', () => {
      // Act
      const result = processMeals(null);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null when input is undefined', () => {
      // Act
      const result = processMeals(undefined as any);

      // Assert
      expect(result).toBeNull();
    });
  });
});