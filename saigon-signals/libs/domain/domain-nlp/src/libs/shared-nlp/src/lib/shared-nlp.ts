import { NlpService } from './nlp-service';
import { NlpServiceConfig } from './types';

/**
 * Global instance of the NlpService.
 * This can be used directly or initialized with custom configuration.
 */
let nlpServiceInstance: NlpService | null = null;

/**
 * Initializes and returns the singleton instance of NlpService.
 * If a configuration is provided, it will be used to initialize a new service.
 * Otherwise, it will use the existing instance or create one with default/environment config.
 * @param config Optional configuration for the NLP service.
 * @returns The singleton instance of NlpService.
 */
export function getNlpService(config?: NlpServiceConfig): NlpService {
  if (!nlpServiceInstance || config) {
    nlpServiceInstance = new NlpService(config);
  }
  return nlpServiceInstance;
}

/**
 * Placeholder function. All core NLP functionalities are now encapsulated within NlpService.
 * Use getNlpService().analyzeSentiment()
 */
export function sharedNlp(): string {
  return 'NLP Services are available via getNlpService()';
}
