/**
 * @file Data ingestion pipeline for fetching F&B data from TheMealDB API.
 * @author Dulce de Saigon Team
 * @copyright 2025 Dulce de Saigon
 * @license MIT
 */

import axios, { AxiosResponse } from 'axios';

/**
 * Interface for a meal from TheMealDB API.
 */
interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}

/**
 * Interface for the response from TheMealDB API when searching by ingredient.
 */
interface SearchByIngredientResponse {
  meals: Meal[] | null;
}

/**
 * Fetches meals from TheMealDB API based on an ingredient.
 * 
 * @param ingredient - The ingredient to search for.
 * @returns A promise that resolves to an array of meals or null if no meals are found.
 * @throws Will throw an error if the API request fails.
 */
export async function fetchMealsByIngredient(ingredient: string): Promise<Meal[] | null> {
  try {
    // Validate input
    if (!ingredient || typeof ingredient !== 'string') {
      throw new Error('Invalid ingredient provided. Ingredient must be a non-empty string.');
    }

    // TheMealDB API endpoint for searching by ingredient
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;

    console.log(`Fetching meals with ingredient: ${ingredient}`);
    
    // Make the API request
    const response: AxiosResponse<SearchByIngredientResponse> = await axios.get(url, {
      timeout: 10000 // 10 second timeout
    });

    // Check if the response is valid
    if (!response.data || !response.data.meals) {
      console.log(`No meals found for ingredient: ${ingredient}`);
      return null;
    }

    // Validate the structure of the response
    if (!Array.isArray(response.data.meals)) {
      throw new Error('Invalid response structure from TheMealDB API');
    }

    console.log(`Successfully fetched ${response.data.meals.length} meals for ingredient: ${ingredient}`);
    return response.data.meals;
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
        throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network Error: No response received from TheMealDB API');
        throw new Error('Network Error: No response received from TheMealDB API');
      } else {
        // Something else happened
        console.error(`Request Error: ${error.message}`);
        throw new Error(`Request Error: ${error.message}`);
      }
    } else {
      // Non-Axios error
      console.error(`Unexpected Error: ${error}`);
      throw error;
    }
  }
}

/**
 * Processes the fetched meals data.
 * This function can be extended to transform or enrich the data as needed.
 * 
 * @param meals - The array of meals to process.
 * @returns The processed meals.
 */
export function processMeals(meals: Meal[] | null): Meal[] | null {
  if (!meals) {
    return null;
  }

  // For now, we'll just return the meals as-is
  // In a real-world scenario, you might want to:
  // - Filter out meals that don't meet certain criteria
  // - Enrich the data with additional information
  // - Transform the data to match a specific schema
  // - Remove unnecessary fields to reduce payload size

  console.log(`Processing ${meals.length} meals`);
  return meals;
}