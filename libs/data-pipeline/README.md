# Data Pipeline Library

This library provides functionality for ingesting F&B data from public APIs, specifically designed for the Dulce de Saigon project.

## Features

- Fetches meal data from TheMealDB API
- Robust error handling and input validation
- TypeScript support with comprehensive type definitions
- Jest test suite with >80% coverage
- Google Cloud ready for serverless deployment

## Installation

```bash
# Install dependencies
pnpm install
```

## Usage

```typescript
import { fetchMealsByIngredient, processMeals } from '@saigon-signals/data-pipeline';

// Fetch meals by ingredient
const meals = await fetchMealsByIngredient('chicken');

// Process the meals
const processedMeals = processMeals(meals);
```

## API

### `fetchMealsByIngredient(ingredient: string): Promise<Meal[] | null>`

Fetches meals from TheMealDB API based on an ingredient.

- `ingredient`: The ingredient to search for.
- Returns: A promise that resolves to an array of meals or null if no meals are found.
- Throws: Will throw an error if the API request fails.

### `processMeals(meals: Meal[] | null): Meal[] | null`

Processes the fetched meals data.

- `meals`: The array of meals to process.
- Returns: The processed meals.

## Development

### Building

```bash
# Build the library
npx nx build data-pipeline
```

### Testing

```bash
# Run tests
npx nx test data-pipeline
```

## Compliance

This library is designed to comply with Vietnamese data privacy laws, including Decree 13/2023/ND-CP.