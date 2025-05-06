
/**
 * Utility functions for managing tags in the anamnesis flow
 */

// Helper function to extract applied tags from question answers
export function extractTagsFromAnswers(
  answers: Record<string, any>,
  questionTagMappings: Record<string, { value: any; tags: string[] }[]>
): string[] {
  const extractedTags: string[] = [];
  
  // Loop through each question's answer
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    // If this question has tag mappings
    if (questionTagMappings[questionId]) {
      // Find matching rules
      const matchingRules = questionTagMappings[questionId].filter(rule => {
        // Handle different types of answers
        if (Array.isArray(answerValue)) {
          // For multiple-choice questions
          return JSON.stringify(rule.value) === JSON.stringify(answerValue);
        } else {
          // For single-value answers (text, boolean, etc.)
          return rule.value === answerValue;
        }
      });
      
      // Add all tags from matching rules
      matchingRules.forEach(rule => {
        extractedTags.push(...rule.tags);
      });
    }
  });
  
  // Remove duplicates
  return [...new Set(extractedTags)];
}

// Helper function to find matching diagnotic rule based on applied tags
export function findMatchingDiagnosticRule(
  rules: { id: string; activationTags: string[]; tagLogic: 'AND' | 'OR'; isActive: boolean; priority: number }[],
  appliedTags: string[]
) {
  if (!rules || rules.length === 0 || !appliedTags || appliedTags.length === 0) {
    return null;
  }
  
  // Sort rules by priority
  const activeRules = rules
    .filter(rule => rule.isActive)
    .sort((a, b) => a.priority - b.priority);
  
  // Find first matching rule
  return activeRules.find(rule => {
    if (rule.tagLogic === 'AND') {
      return rule.activationTags.every(tag => appliedTags.includes(tag));
    } else {
      return rule.activationTags.some(tag => appliedTags.includes(tag));
    }
  });
}

// Helper function to find matching plans based on applied tags
export function findMatchingPlans(
  plans: { planId: string; tags: string[] }[],
  appliedTags: string[]
) {
  if (!plans || plans.length === 0 || !appliedTags || appliedTags.length === 0) {
    return [];
  }
  
  // Find all plans that have at least one tag match
  return plans.filter(plan => {
    return plan.tags.some(tag => appliedTags.includes(tag));
  });
}

// Save tags data to localStorage for persistence between sessions
export function saveTagsToLocalStorage(key: string, tags: string[]) {
  localStorage.setItem(`bravo-tags-${key}`, JSON.stringify(tags));
}

// Get tags data from localStorage
export function getTagsFromLocalStorage(key: string): string[] {
  const stored = localStorage.getItem(`bravo-tags-${key}`);
  return stored ? JSON.parse(stored) : [];
}
