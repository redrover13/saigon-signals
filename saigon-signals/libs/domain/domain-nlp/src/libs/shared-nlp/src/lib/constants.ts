/**
 * @fileoverview Constants for NLP operations.
 * This file contains constants used throughout the shared-nlp library.
 */

import { Language, NlpServiceProvider } from './types';

/**
 * Default timeout for NLP API requests in milliseconds
 */
export const DEFAULT_TIMEOUT_MS = 30000;

/**
 * Default maximum number of retries for failed requests
 */
export const DEFAULT_MAX_RETRIES = 3;

/**
 * Default minimum confidence score for entity extraction
 */
export const DEFAULT_MIN_CONFIDENCE = 0.6;

/**
 * Default service provider
 */
export const DEFAULT_SERVICE_PROVIDER = NlpServiceProvider.VERTEX_AI;

/**
 * Default language for NLP operations
 */
export const DEFAULT_LANGUAGE = Language.VIETNAMESE;

/**
 * Vietnamese food categories for classification
 */
export const VIETNAMESE_FOOD_CATEGORIES = [
  'bánh mì', // Vietnamese sandwich
  'phở', // Vietnamese noodle soup
  'bún chả', // Grilled pork with rice noodles
  'gỏi cuốn', // Spring rolls
  'chả giò', // Fried spring rolls
  'bánh xèo', // Vietnamese crepe
  'cơm tấm', // Broken rice
  'bún bò Huế', // Spicy beef noodle soup
  'cà phê', // Coffee
  'trà', // Tea
  'sinh tố', // Smoothie
  'chè', // Sweet dessert soup
  'bánh', // Cake/pastry
  'kem', // Ice cream
  'nước mía', // Sugarcane juice
  'nước dừa', // Coconut water
];

/**
 * Vietnamese sentiment words (positive)
 */
export const VIETNAMESE_POSITIVE_SENTIMENT_WORDS = [
  'ngon', // Delicious
  'tuyệt vời', // Excellent
  'tốt', // Good
  'thích', // Like
  'yêu thích', // Love
  'hài lòng', // Satisfied
  'tươi', // Fresh
  'sạch sẽ', // Clean
  'nhanh', // Fast
  'thân thiện', // Friendly
  'chuyên nghiệp', // Professional
  'giá trị', // Value
  'hợp lý', // Reasonable
  'đáng giá', // Worth it
  'khuyến nghị', // Recommend
];

/**
 * Vietnamese sentiment words (negative)
 */
export const VIETNAMESE_NEGATIVE_SENTIMENT_WORDS = [
  'dở', // Bad
  'tệ', // Terrible
  'không ngon', // Not delicious
  'đắt', // Expensive
  'chậm', // Slow
  'bẩn', // Dirty
  'không sạch', // Not clean
  'thô lỗ', // Rude
  'kém', // Poor
  'không hài lòng', // Not satisfied
  'thất vọng', // Disappointed
  'lãng phí', // Waste
  'không đáng giá', // Not worth it
  'không khuyến nghị', // Not recommend
  'tránh xa', // Avoid
];

/**
 * Common Vietnamese food ingredients
 */
export const VIETNAMESE_FOOD_INGREDIENTS = [
  'gạo', // Rice
  'bún', // Rice noodles
  'phở', // Pho noodles
  'thịt bò', // Beef
  'thịt heo', // Pork
  'thịt gà', // Chicken
  'tôm', // Shrimp
  'cá', // Fish
  'rau', // Vegetables
  'hành', // Onion
  'tỏi', // Garlic
  'ớt', // Chili
  'nước mắm', // Fish sauce
  'nước tương', // Soy sauce
  'đường', // Sugar
  'muối', // Salt
  'tiêu', // Pepper
  'chanh', // Lime
  'gừng', // Ginger
  'sả', // Lemongrass
  'rau mùi', // Cilantro
  'húng quế', // Basil
  'đậu phộng', // Peanuts
  'mộc nhĩ', // Wood ear mushroom
  'giá đỗ', // Bean sprouts
];

/**
 * Common Vietnamese bakery products
 */
export const VIETNAMESE_BAKERY_PRODUCTS = [
  'bánh mì', // Bread
  'bánh bao', // Steamed bun
  'bánh cam', // Deep-fried sesame ball
  'bánh chuối', // Banana cake
  'bánh dừa', // Coconut cake
  'bánh flan', // Caramel custard
  'bánh kẹp', // Waffle
  'bánh kem', // Cream cake
  'bánh ngọt', // Sweet cake
  'bánh quy', // Cookie
  'bánh su kem', // Cream puff
  'bánh tiêu', // Hollow doughnut
  'bánh trung thu', // Mooncake
  'bánh xèo', // Vietnamese crepe
  'bánh đậu xanh', // Mung bean cake
];

/**
 * Vertex AI model names for different NLP tasks
 */
export const VERTEX_AI_MODELS = {
  SENTIMENT_ANALYSIS: 'text-sentiment',
  ENTITY_EXTRACTION: 'text-entity-extraction',
  TEXT_CLASSIFICATION: 'text-classification',
};

/**
 * Google Cloud region for Vertex AI
 */
export const GOOGLE_CLOUD_REGION = 'asia-southeast1'; // Singapore region (closest to Vietnam)

/**
 * Vietnamese data privacy compliance notes
 * Based on Vietnam's Law on Cyber Information Security and Personal Data Protection Decree
 */
export const VIETNAMESE_DATA_PRIVACY_NOTES = {
  PERSONAL_DATA_DEFINITION: 'Personal data includes name, date of birth, phone number, email address, ID card number, personal health information, and biometric data.',
  CONSENT_REQUIREMENT: 'Explicit consent is required before collecting, processing, or transferring personal data.',
  DATA_LOCALIZATION: 'Certain types of data must be stored in Vietnam.',
  DATA_TRANSFER: 'Cross-border data transfers may require regulatory approval.',
  DATA_BREACH: 'Data breaches must be reported to authorities and affected individuals.',
  DATA_RETENTION: 'Personal data should only be retained for the necessary period.',
  DATA_SECURITY: 'Appropriate technical and organizational measures must be implemented to protect personal data.',
};