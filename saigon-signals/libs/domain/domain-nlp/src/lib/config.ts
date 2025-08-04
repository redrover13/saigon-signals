/**
 * @fileoverview Configuration for NLP services.
 * This file contains configuration for connecting to various NLP services,
 * with a focus on Google Cloud's Vertex AI.
 */

import { NlpServiceConfig, NlpServiceProvider } from './types';
import { 
  DEFAULT_TIMEOUT_MS, 
  DEFAULT_MAX_RETRIES, 
  DEFAULT_SERVICE_PROVIDER,
  GOOGLE_CLOUD_REGION,
  VERTEX_AI_MODELS
} from './constants';

/**
 * Default configuration for NLP services
 */
export const DEFAULT_NLP_CONFIG: NlpServiceConfig = {
  provider: DEFAULT_SERVICE_PROVIDER,
  defaultTimeoutMs: DEFAULT_TIMEOUT_MS,
  maxRetries: DEFAULT_MAX_RETRIES,
  options: {
    region: GOOGLE_CLOUD_REGION,
  },
};

/**
 * Configuration for Vertex AI
 * @see https://cloud.google.com/vertex-ai/docs/reference
 */
export const VERTEX_AI_CONFIG: NlpServiceConfig = {
  provider: NlpServiceProvider.VERTEX_AI,
  defaultTimeoutMs: DEFAULT_TIMEOUT_MS,
  maxRetries: DEFAULT_MAX_RETRIES,
  options: {
    region: GOOGLE_CLOUD_REGION,
    models: VERTEX_AI_MODELS,
    // Use application default credentials by default
    useApplicationDefaultCredentials: true,
    // Enable client-side batching for better performance
    enableBatching: true,
    // Retry configuration
    retry: {
      initialDelayMs: 100,
      maxDelayMs: 60000,
      backoffMultiplier: 1.3,
    },
  },
};

/**
 * Configuration for Google Cloud Natural Language API
 * @see https://cloud.google.com/natural-language/docs/reference/rest
 */
export const GOOGLE_CLOUD_NLP_CONFIG: NlpServiceConfig = {
  provider: NlpServiceProvider.GOOGLE_CLOUD_NLP,
  defaultTimeoutMs: DEFAULT_TIMEOUT_MS,
  maxRetries: DEFAULT_MAX_RETRIES,
  options: {
    // Use application default credentials by default
    useApplicationDefaultCredentials: true,
    // API version
    apiVersion: 'v1',
  },
};

/**
 * Get NLP service configuration based on provider
 * @param provider - The NLP service provider
 * @returns The configuration for the specified provider
 */
export function getNlpServiceConfig(provider: NlpServiceProvider): NlpServiceConfig {
  switch (provider) {
    case NlpServiceProvider.VERTEX_AI:
      return VERTEX_AI_CONFIG;
    case NlpServiceProvider.GOOGLE_CLOUD_NLP:
      return GOOGLE_CLOUD_NLP_CONFIG;
    default:
      return DEFAULT_NLP_CONFIG;
  }
}

/**
 * Environment variable names for configuration
 */
export const ENV_VARS = {
  /** Google Cloud Project ID */
  GOOGLE_CLOUD_PROJECT: 'GOOGLE_CLOUD_PROJECT',
  /** Google Cloud Region */
  GOOGLE_CLOUD_REGION: 'GOOGLE_CLOUD_REGION',
  /** Path to Google Cloud credentials file */
  GOOGLE_APPLICATION_CREDENTIALS: 'GOOGLE_APPLICATION_CREDENTIALS',
  /** NLP Service Provider */
  NLP_SERVICE_PROVIDER: 'NLP_SERVICE_PROVIDER',
  /** API Key (if not using application default credentials) */
  NLP_API_KEY: 'NLP_API_KEY',
  /** API Endpoint (if using a custom endpoint) */
  NLP_API_ENDPOINT: 'NLP_API_ENDPOINT',
  /** Request timeout in milliseconds */
  NLP_REQUEST_TIMEOUT_MS: 'NLP_REQUEST_TIMEOUT_MS',
  /** Maximum number of retries for failed requests */
  NLP_MAX_RETRIES: 'NLP_MAX_RETRIES',
};

/**
 * Load configuration from environment variables
 * @returns NLP service configuration based on environment variables
 */
export function loadConfigFromEnv(): NlpServiceConfig {
  // Determine provider from environment variable or use default
  const providerStr = process.env[ENV_VARS.NLP_SERVICE_PROVIDER];
  const provider = providerStr 
    ? (providerStr as NlpServiceProvider) 
    : DEFAULT_SERVICE_PROVIDER;
  
  // Get base configuration for the provider
  const config = getNlpServiceConfig(provider);
  
  // Override with environment variables if provided
  if (process.env[ENV_VARS.GOOGLE_CLOUD_PROJECT]) {
    config.options = {
      ...config.options,
      projectId: process.env[ENV_VARS.GOOGLE_CLOUD_PROJECT],
    };
  }
  
  if (process.env[ENV_VARS.GOOGLE_CLOUD_REGION]) {
    config.options = {
      ...config.options,
      region: process.env[ENV_VARS.GOOGLE_CLOUD_REGION],
    };
  }
  
  if (process.env[ENV_VARS.NLP_API_KEY]) {
    config.credentials = process.env[ENV_VARS.NLP_API_KEY];
  }
  
  if (process.env[ENV_VARS.NLP_API_ENDPOINT]) {
    config.endpoint = process.env[ENV_VARS.NLP_API_ENDPOINT];
  }
  
  if (process.env[ENV_VARS.NLP_REQUEST_TIMEOUT_MS]) {
    config.defaultTimeoutMs = parseInt(
      process.env[ENV_VARS.NLP_REQUEST_TIMEOUT_MS],
      10
    );
  }
  
  if (process.env[ENV_VARS.NLP_MAX_RETRIES]) {
    config.maxRetries = parseInt(
      process.env[ENV_VARS.NLP_MAX_RETRIES],
      10
    );
  }
  
  return config;
}