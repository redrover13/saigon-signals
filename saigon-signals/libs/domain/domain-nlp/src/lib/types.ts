/**
 * @fileoverview Core types and interfaces for NLP operations.
 * This file contains TypeScript interfaces for all NLP operations supported by the shared-nlp library.
 */

/**
 * Supported languages for NLP operations
 */
export enum Language {
  VIETNAMESE = 'vi',
  ENGLISH = 'en',
}

/**
 * Base interface for all NLP requests
 */
export interface NlpRequestBase {
  /** The text to analyze */
  text: string;
  /** The language of the text */
  language: Language;
  /** Optional request timeout in milliseconds */
  timeoutMs?: number;
}

/**
 * Base interface for all NLP responses
 */
export interface NlpResponseBase {
  /** The original text that was analyzed */
  originalText: string;
  /** The language that was used for analysis */
  language: Language;
  /** Processing time in milliseconds */
  processingTimeMs: number;
  /** ISO timestamp when the analysis was performed */
  timestamp: string;
}

/**
 * Error codes for NLP operations
 */
export enum NlpErrorCode {
  INVALID_INPUT = 'INVALID_INPUT',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  UNSUPPORTED_LANGUAGE = 'UNSUPPORTED_LANGUAGE',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Error response for NLP operations
 */
export interface NlpError {
  /** Error code */
  code: NlpErrorCode;
  /** Human-readable error message */
  message: string;
  /** Original error object or additional details */
  details?: unknown;
  /** Request ID for tracking purposes */
  requestId?: string;
}

/**
 * Sentiment score range from -1.0 (negative) to 1.0 (positive)
 */
export type SentimentScore = number;

/**
 * Sentiment magnitude (intensity) from 0.0 to +∞
 */
export type SentimentMagnitude = number;

/**
 * Sentiment analysis request parameters
 */
export interface SentimentAnalysisRequest extends NlpRequestBase {
  /** Whether to analyze sentiment at the sentence level */
  analyzeSentences?: boolean;
}

/**
 * Sentiment analysis for a single sentence
 */
export interface SentenceSentiment {
  /** The sentence text */
  text: string;
  /** Sentiment score from -1.0 (negative) to 1.0 (positive) */
  score: SentimentScore;
  /** Sentiment magnitude (intensity) from 0.0 to +∞ */
  magnitude: SentimentMagnitude;
  /** Start offset of the sentence in the original text */
  beginOffset: number;
}

/**
 * Sentiment analysis response
 */
export interface SentimentAnalysisResponse extends NlpResponseBase {
  /** Overall document sentiment score from -1.0 (negative) to 1.0 (positive) */
  documentSentiment: {
    score: SentimentScore;
    magnitude: SentimentMagnitude;
  };
  /** Sentence-level sentiment analysis (if requested) */
  sentences?: SentenceSentiment[];
}

/**
 * Entity types that can be extracted
 */
export enum EntityType {
  UNKNOWN = 'UNKNOWN',
  PERSON = 'PERSON',
  LOCATION = 'LOCATION',
  ORGANIZATION = 'ORGANIZATION',
  EVENT = 'EVENT',
  WORK_OF_ART = 'WORK_OF_ART',
  CONSUMER_GOOD = 'CONSUMER_GOOD',
  FOOD = 'FOOD',
  DISH = 'DISH',
  INGREDIENT = 'INGREDIENT',
  DATE = 'DATE',
  NUMBER = 'NUMBER',
  PRICE = 'PRICE',
  ADDRESS = 'ADDRESS',
  PHONE_NUMBER = 'PHONE_NUMBER',
  EMAIL = 'EMAIL',
  URL = 'URL',
  OTHER = 'OTHER',
}

/**
 * Entity extraction request parameters
 */
export interface EntityExtractionRequest extends NlpRequestBase {
  /** Entity types to extract (if empty, all types will be extracted) */
  entityTypes?: EntityType[];
  /** Minimum confidence score (0.0 to 1.0) for extracted entities */
  minConfidence?: number;
}

/**
 * Extracted entity mention
 */
export interface EntityMention {
  /** The text of the entity mention */
  text: string;
  /** Start offset of the mention in the original text */
  beginOffset: number;
  /** Type of the mention (e.g., PROPER, COMMON) */
  type: string;
}

/**
 * Extracted entity
 */
export interface Entity {
  /** The name of the entity */
  name: string;
  /** The type of the entity */
  type: EntityType;
  /** Confidence score from 0.0 to 1.0 */
  confidence: number;
  /** All mentions of this entity in the text */
  mentions: EntityMention[];
  /** Metadata associated with the entity (key-value pairs) */
  metadata?: Record<string, string>;
}

/**
 * Entity extraction response
 */
export interface EntityExtractionResponse extends NlpResponseBase {
  /** List of extracted entities */
  entities: Entity[];
}

/**
 * Text classification request parameters
 */
export interface TextClassificationRequest extends NlpRequestBase {
  /** Maximum number of categories to return */
  maxCategories?: number;
  /** Minimum confidence score (0.0 to 1.0) for categories */
  minConfidence?: number;
}

/**
 * Text category
 */
export interface TextCategory {
  /** The name of the category */
  name: string;
  /** Confidence score from 0.0 to 1.0 */
  confidence: number;
}

/**
 * Text classification response
 */
export interface TextClassificationResponse extends NlpResponseBase {
  /** List of categories with confidence scores */
  categories: TextCategory[];
}

/**
 * NLP service provider
 */
export enum NlpServiceProvider {
  VERTEX_AI = 'VERTEX_AI',
  GOOGLE_CLOUD_NLP = 'GOOGLE_CLOUD_NLP',
  CUSTOM = 'CUSTOM',
}

/**
 * NLP service configuration
 */
export interface NlpServiceConfig {
  /** The service provider */
  provider: NlpServiceProvider;
  /** API key or credentials */
  credentials?: string;
  /** API endpoint */
  endpoint?: string;
  /** Default timeout in milliseconds */
  defaultTimeoutMs?: number;
  /** Maximum retries for failed requests */
  maxRetries?: number;
  /** Additional provider-specific options */
  options?: Record<string, unknown>;
}
