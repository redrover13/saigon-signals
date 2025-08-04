/**
 * @fileoverview Utility functions for NLP operations.
 * This file contains helper functions for validation, error handling, and other common tasks.
 */

import { 
  Language, 
  NlpError, 
  NlpErrorCode, 
  NlpRequestBase,
  SentimentAnalysisRequest,
  EntityExtractionRequest,
  TextClassificationRequest
} from './types';
import { DEFAULT_LANGUAGE, DEFAULT_TIMEOUT_MS } from './constants';

/**
 * Validates that the input text is not empty and is a string
 * @param text - The text to validate
 * @returns True if the text is valid, false otherwise
 */
export function isValidText(text: unknown): text is string {
  return typeof text === 'string' && text.trim().length > 0;
}

/**
 * Validates that the language is supported
 * @param language - The language to validate
 * @returns True if the language is supported, false otherwise
 */
export function isValidLanguage(language: unknown): language is Language {
  return Object.values(Language).includes(language as Language);
}

/**
 * Validates a base NLP request
 * @param request - The request to validate
 * @returns An error object if validation fails, undefined otherwise
 */
export function validateNlpRequest(request: NlpRequestBase): NlpError | undefined {
  if (!request) {
    return {
      code: NlpErrorCode.INVALID_INPUT,
      message: 'Request cannot be null or undefined',
    };
  }

  if (!isValidText(request.text)) {
    return {
      code: NlpErrorCode.INVALID_INPUT,
      message: 'Text must be a non-empty string',
    };
  }

  if (request.language && !isValidLanguage(request.language)) {
    return {
      code: NlpErrorCode.UNSUPPORTED_LANGUAGE,
      message: `Language '${request.language}' is not supported`,
    };
  }

  if (request.timeoutMs !== undefined && (
    typeof request.timeoutMs !== 'number' || 
    request.timeoutMs <= 0
  )) {
    return {
      code: NlpErrorCode.INVALID_INPUT,
      message: 'Timeout must be a positive number',
    };
  }

  return undefined;
}

/**
 * Creates a base NLP request with default values
 * @param text - The text to analyze
 * @param language - The language of the text (defaults to Vietnamese)
 * @param timeoutMs - The request timeout in milliseconds
 * @returns A base NLP request object
 */
export function createBaseRequest(
  text: string,
  language: Language = DEFAULT_LANGUAGE,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): NlpRequestBase {
  return {
    text,
    language,
    timeoutMs,
  };
}

/**
 * Creates a sentiment analysis request
 * @param text - The text to analyze
 * @param language - The language of the text (defaults to Vietnamese)
 * @param analyzeSentences - Whether to analyze sentiment at the sentence level
 * @param timeoutMs - The request timeout in milliseconds
 * @returns A sentiment analysis request object
 * 
 * @example
 * ```typescript
 * // Create a request to analyze sentiment in Vietnamese text
 * const request = createSentimentRequest(
 *   'Món ăn này rất ngon và phục vụ nhanh.',
 *   Language.VIETNAMESE,
 *   true
 * );
 * ```
 */
export function createSentimentRequest(
  text: string,
  language: Language = DEFAULT_LANGUAGE,
  analyzeSentences: boolean = false,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): SentimentAnalysisRequest {
  return {
    ...createBaseRequest(text, language, timeoutMs),
    analyzeSentences,
  };
}

/**
 * Creates an entity extraction request
 * @param text - The text to analyze
 * @param language - The language of the text (defaults to Vietnamese)
 * @param entityTypes - Entity types to extract
 * @param minConfidence - Minimum confidence score for extracted entities
 * @param timeoutMs - The request timeout in milliseconds
 * @returns An entity extraction request object
 * 
 * @example
 * ```typescript
 * // Create a request to extract food entities from Vietnamese text
 * const request = createEntityExtractionRequest(
 *   'Tôi muốn đặt một bánh mì thịt và một ly cà phê sữa đá.',
 *   Language.VIETNAMESE,
 *   [EntityType.FOOD, EntityType.DISH],
 *   0.7
 * );
 * ```
 */
export function createEntityExtractionRequest(
  text: string,
  language: Language = DEFAULT_LANGUAGE,
  entityTypes?: string[],
  minConfidence?: number,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): EntityExtractionRequest {
  return {
    ...createBaseRequest(text, language, timeoutMs),
    entityTypes,
    minConfidence,
  };
}

/**
 * Creates a text classification request
 * @param text - The text to analyze
 * @param language - The language of the text (defaults to Vietnamese)
 * @param maxCategories - Maximum number of categories to return
 * @param minConfidence - Minimum confidence score for categories
 * @param timeoutMs - The request timeout in milliseconds
 * @returns A text classification request object
 * 
 * @example
 * ```typescript
 * // Create a request to classify Vietnamese text
 * const request = createTextClassificationRequest(
 *   'Bánh mì của quán này rất ngon, đặc biệt là phần nhân thịt và rau sống.',
 *   Language.VIETNAMESE,
 *   3,
 *   0.6
 * );
 * ```
 */
export function createTextClassificationRequest(
  text: string,
  language: Language = DEFAULT_LANGUAGE,
  maxCategories?: number,
  minConfidence?: number,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): TextClassificationRequest {
  return {
    ...createBaseRequest(text, language, timeoutMs),
    maxCategories,
    minConfidence,
  };
}

/**
 * Creates an ISO timestamp for the current time
 * @returns ISO timestamp string
 */
export function createTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Formats an error into an NlpError object
 * @param error - The error to format
 * @param code - The error code
 * @param message - The error message
 * @returns An NlpError object
 */
export function formatError(
  error: unknown,
  code: NlpErrorCode = NlpErrorCode.UNKNOWN_ERROR,
  message?: string
): NlpError {
  // If the error is already an NlpError, return it
  if (typeof error === 'object' && 
      error !== null && 
      'code' in error && 
      'message' in error) {
    return error as NlpError;
  }

  // Format the error message
  let errorMessage = message || 'An unknown error occurred';
  
  if (error instanceof Error) {
    errorMessage = message || error.message;
  } else if (typeof error === 'string') {
    errorMessage = message || error;
  }

  return {
    code,
    message: errorMessage,
    details: error,
  };
}

/**
 * Detects if text is likely Vietnamese
 * @param text - The text to analyze
 * @returns True if the text is likely Vietnamese, false otherwise
 */
export function isLikelyVietnamese(text: string): boolean {
  // Vietnamese-specific characters
  const vietnameseChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  
  // Vietnamese-specific words (common short words)
  const vietnameseWords = /\b(và|hoặc|của|trong|với|là|có|không|này|đó|một|hai|ba|bốn|năm)\b/i;
  
  // Check for Vietnamese characters or words
  return vietnameseChars.test(text) || vietnameseWords.test(text);
}

/**
 * Sanitizes text input to prevent injection attacks
 * @param text - The text to sanitize
 * @returns Sanitized text
 */
export function sanitizeText(text: string): string {
  // Remove any potentially dangerous characters or patterns
  // This is a simple implementation - in production, use a proper sanitization library
  return text
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
}

/**
 * Truncates text to a maximum length
 * @param text - The text to truncate
 * @param maxLength - The maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number = 5000): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength);
}

/**
 * Splits text into sentences
 * @param text - The text to split
 * @returns Array of sentences
 */
export function splitIntoSentences(text: string): string[] {
  // Simple sentence splitting - in production, use a more sophisticated approach
  // that handles Vietnamese-specific sentence structures
  return text
    .replace(/([.!?])\s+/g, '$1\n')
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

/**
 * Calculates processing time in milliseconds
 * @param startTime - The start time
 * @returns Processing time in milliseconds
 */
export function calculateProcessingTime(startTime: [number, number]): number {
  const [seconds, nanoseconds] = process.hrtime(startTime);
  return seconds * 1000 + nanoseconds / 1000000;
}