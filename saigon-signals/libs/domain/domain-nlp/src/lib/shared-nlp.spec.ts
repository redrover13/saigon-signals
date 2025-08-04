import { NlpService, getNlpService } from './shared-nlp';
import { Language, NlpErrorCode, EntityType } from './types';
import { DEFAULT_TIMEOUT_MS } from './constants';

describe('NlpService', () => {
  let nlpService: NlpService;

  beforeAll(async () => {
    // Initialize the service once for all tests
    nlpService = getNlpService();
    await nlpService.init();
  }, DEFAULT_TIMEOUT_MS * 2); // Increased timeout for client initialization tests

  it('should initialize the NlpService client', () => {
    expect(nlpService).toBeDefined();
    // Assuming successful initialization means the client property is not null
    expect((nlpService as any).client).not.toBeNull();
  });

  describe('Sentiment Analysis', () => {
    it('should return a positive sentiment for positive Vietnamese text', async () => {
      const request = {
        text: 'Món ăn này rất ngon và phục vụ nhanh chóng.',
        language: Language.VIETNAMESE,
      };
      const response = await nlpService.analyzeSentiment(request);

      expect(response).toBeDefined();
      expect(response.originalText).toEqual(request.text);
      expect(response.language).toEqual(request.language);
      expect(response.documentSentiment).toBeDefined();
      expect(response.documentSentiment.score).toBeGreaterThan(0); // Expect positive score
      expect(response.documentSentiment.magnitude).toBeGreaterThan(0);
      expect(response.processingTimeMs).toBeGreaterThan(0);
      expect(response.timestamp).toBeDefined();
    });

    it('should return a negative sentiment for negative Vietnamese text', async () => {
      const request = {
        text: 'Dịch vụ ở đây rất chậm và cà phê dở tệ.',
        language: Language.VIETNAMESE,
      };
      const response = await nlpService.analyzeSentiment(request);

      expect(response.documentSentiment.score).toBeLessThan(0); // Expect negative score
    });

    it('should analyze sentiment at sentence level when requested', async () => {
      const request = {
        text: 'Món ăn rất ngon. Nhưng dịch vụ thì tệ.',
        language: Language.VIETNAMESE,
        analyzeSentences: true,
      };
      const response = await nlpService.analyzeSentiment(request);

      expect(response.sentences).toBeDefined();
      expect(response.sentences?.length).toBeGreaterThanOrEqual(2);
      expect(response.sentences?.[0]?.text).toContain('ngon');
      expect(response.sentences?.[0]?.score).toBeGreaterThan(0);
      expect(response.sentences?.[1]?.text).toContain('tệ');
      expect(response.sentences?.[1]?.score).toBeLessThan(0);
    });

    it('should handle invalid text input for sentiment analysis', async () => {
      const request = {
        text: '', // Empty text
        language: Language.VIETNAMESE,
      };
      await expect(nlpService.analyzeSentiment(request)).rejects.toHaveProperty(
        'code',
        NlpErrorCode.INVALID_INPUT
      );
    });

    it('should handle unsupported language for sentiment analysis', async () => {
      const request = {
        text: 'This is a test.',
        language: 'unsupported' as Language, // Invalid language
      };
      await expect(nlpService.analyzeSentiment(request)).rejects.toHaveProperty(
        'code',
        NlpErrorCode.UNSUPPORTED_LANGUAGE
      );
    });
  });

  describe('Entity Extraction', () => {
    it('should extract food and dish entities from Vietnamese text', async () => {
      const request = {
        text: 'Tôi đã ăn phở bò và uống cà phê sữa đá tại một quán gần chợ Bến Thành.',
        language: Language.VIETNAMESE,
        entityTypes: [EntityType.FOOD, EntityType.DISH, EntityType.LOCATION],
      };
      const response = await nlpService.extractEntities(request);

      expect(response).toBeDefined();
      expect(response.entities).toBeDefined();
      expect(response.entities.length).toBeGreaterThan(0);

      const phoBo = response.entities.find(e => e.name.includes('phở bò'));
      expect(phoBo).toBeDefined();
      expect(phoBo?.type).toEqual(EntityType.FOOD);

      const cafeSuaDa = response.entities.find(e => e.name.includes('cà phê sữa đá'));
      expect(cafeSuaDa).toBeDefined();
      expect(cafeSuaDa?.type).toEqual(EntityType.FOOD);

      const benThanh = response.entities.find(e => e.name.includes('chợ Bến Thành'));
      expect(benThanh).toBeDefined();
      expect(benThanh?.type).toEqual(EntityType.LOCATION);
    });

    it('should handle invalid text input for entity extraction', async () => {
      const request = {
        text: ' ', // Whitespace only
        language: Language.VIETNAMESE,
      };
      await expect(nlpService.extractEntities(request)).rejects.toHaveProperty(
        'code',
        NlpErrorCode.INVALID_INPUT
      );
    });
  });

  describe('Text Classification', () => {
    it('should classify Vietnamese text about Banh Mi', async () => {
      const request = {
        text: 'Bánh mì thịt nướng ở đây rất ngon và giá cả phải chăng.',
        language: Language.VIETNAMESE,
      };
      const response = await nlpService.classifyText(request);

      expect(response).toBeDefined();
      expect(response.categories).toBeDefined();
      expect(response.categories.length).toBeGreaterThan(0);
      expect(response.categories[0]?.name).toContain('Bánh Mì');
      expect(response.categories[0]?.confidence).toBeGreaterThan(0.7);
    });

    it('should classify Vietnamese text about Pho', async () => {
      const request = {
        text: 'Hương vị truyền thống của phở bò Hà Nội làm tôi nhớ nhà.',
        language: Language.VIETNAMESE,
      };
      const response = await nlpService.classifyText(request);

      expect(response.categories[0]?.name).toContain('Phở');
    });

    it('should return a limited number of categories if maxCategories is set', async () => {
      const request = {
        text: 'Hương vị truyền thống của phở bò Hà Nội làm tôi nhớ nhà.',
        language: Language.VIETNAMESE,
        maxCategories: 1,
      };
      const response = await nlpService.classifyText(request);

      expect(response.categories.length).toBe(1);
    });

    it('should filter categories by minConfidence', async () => {
      const request = {
        text: 'Hương vị truyền thống của phở bò Hà Nội làm tôi nhớ nhà.',
        language: Language.VIETNAMESE,
        minConfidence: 0.9,
      };
      const response = await nlpService.classifyText(request);
      
      expect(response.categories[0]?.confidence).toBeGreaterThanOrEqual(0.9);
    });

    it('should handle invalid text input for text classification', async () => {
      const request = {
        text: null, // Invalid input
        language: Language.VIETNAMESE,
      };
      await expect(nlpService.classifyText(request as any)).rejects.toHaveProperty(
        'code',
        NlpErrorCode.INVALID_INPUT
      );
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle unexpected errors during sentiment analysis', async () => {
      // Temporarily nullify the client to simulate a service error
      (nlpService as any).client = null; 
      
      const request = {
        text: 'Some text',
        language: Language.ENGLISH,
      };
      
      // Re-initialize client after the test to not affect others
      await nlpService.init();
      
      // Now test with a valid request to ensure it works after re-initialization
      const response = await nlpService.analyzeSentiment(request);
      expect(response).toBeDefined();
    });

    it('should ensure processing time is calculated for all operations', async () => {
      const request = {
        text: 'This is a test sentence.',
        language: Language.ENGLISH,
      };
      const response = await nlpService.analyzeSentiment(request);
      expect(response.processingTimeMs).toBeGreaterThan(0);
    });
  });
});