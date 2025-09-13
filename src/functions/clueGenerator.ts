import { generate } from './generate';
import { EducationalLink, EDUCATIONAL_LINKS } from './mysteryGenerator';

export interface MarketplaceClue {
  id: string;
  mysteryId: string;
  clueNumber: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  description: string;
  avaxConcept: string;
  educationalLinks: EducationalLink[];
  marketValue: number; // in AVAX
  isRevealed: boolean;
  revealTimestamp?: number;
}

export interface ClueDistribution {
  common: number;    // 60% - basic clues
  uncommon: number;  // 25% - intermediate clues  
  rare: number;      // 12% - advanced clues
  legendary: number; // 3% - critical solving clues
}

const DEFAULT_DISTRIBUTION: ClueDistribution = {
  common: 60,
  uncommon: 25,
  rare: 12,
  legendary: 3
};

// Base market values for different rarity tiers (in AVAX)
const RARITY_BASE_VALUES = {
  common: 0.5,
  uncommon: 2.0,
  rare: 8.0,
  legendary: 25.0
};

export async function generateRandomClue(
  mysteryId: string,
  totalClues: number,
  clueNumber: number,
  playerMiniGamesCompleted: number = 0
): Promise<MarketplaceClue> {
  
  // Determine rarity based on distribution
  const rarity = determineClueRarity(clueNumber, totalClues);
  
  // Generate clue content based on rarity
  const clueContent = await generateClueContent(mysteryId, rarity, clueNumber);
  
  // Calculate market value with some randomness
  const baseValue = RARITY_BASE_VALUES[rarity];
  const marketValue = baseValue * (0.8 + Math.random() * 0.4); // ±20% variance
  
  return {
    id: `clue_${mysteryId}_${clueNumber}_${Date.now()}`,
    mysteryId,
    clueNumber,
    rarity,
    description: clueContent.description,
    avaxConcept: clueContent.avaxConcept,
    educationalLinks: extractEducationalTerms(clueContent.description + " " + clueContent.avaxConcept),
    marketValue: Number(marketValue.toFixed(2)),
    isRevealed: false
  };
}

function determineClueRarity(clueNumber: number, totalClues: number): 'common' | 'uncommon' | 'rare' | 'legendary' {
  const random = Math.random() * 100;
  
  // Increase legendary chance for later clues (more critical)
  const isLateClue = clueNumber > totalClues * 0.7;
  const legendaryChance = isLateClue ? 8 : 3;
  
  if (random < legendaryChance) return 'legendary';
  if (random < legendaryChance + 12) return 'rare';
  if (random < legendaryChance + 12 + 25) return 'uncommon';
  return 'common';
}

async function generateClueContent(mysteryId: string, rarity: string, clueNumber: number): Promise<{description: string, avaxConcept: string}> {
  
  const rarityPrompts = {
    common: `Generate a basic clue that introduces simple Avalanche concepts like AVAX transfers, wallet addresses, or basic transactions. Make it accessible to Web2 users.`,
    
    uncommon: `Generate an intermediate clue involving DeFi concepts like liquidity pools, staking, or DEX trading. Include specific protocol names like Trader Joe or Benqi.`,
    
    rare: `Generate an advanced clue involving complex DeFi strategies, validator operations, cross-chain bridges, or governance mechanisms. Reference real technical details.`,
    
    legendary: `Generate a critical clue that could help solve the mystery. Include advanced concepts like MEV, flash loans, governance attacks, or sophisticated exploit techniques.`
  };

  const prompt = `
${rarityPrompts[rarity as keyof typeof rarityPrompts]}

Requirements:
- Clue should be ${rarity} difficulty level
- Include specific AVAX ecosystem details (protocols, addresses, amounts)
- Make it feel like real forensic evidence
- Include timestamps, transaction hashes, or technical data
- Reference real Avalanche protocols when possible
- Keep educational value high for Web2 users learning Web3

Format:
Description: [The actual clue text as if found at crime scene]
AVAX Concept: [What Web3/AVAX concept this teaches]

Example:
Description: Security camera footage shows the victim accessing Trader Joe DEX at 11:42 PM, providing 50,000 AVAX and 125,000 USDC to the AVAX/USDC liquidity pool, earning 0.3% fees on each trade.
AVAX Concept: Automated Market Makers (AMM) and liquidity provision in decentralized exchanges
`;

  try {
    const response = await generate(prompt);
    const lines = response.split('\n').filter(line => line.trim());
    
    const descriptionLine = lines.find(line => line.toLowerCase().includes('description:'));
    const conceptLine = lines.find(line => line.toLowerCase().includes('avax concept:') || line.toLowerCase().includes('concept:'));
    
    const description = descriptionLine?.replace(/description:?/gi, '').trim() || 
                      `A mysterious ${rarity} clue has been discovered...`;
                      
    const avaxConcept = conceptLine?.replace(/avax concept:?|concept:?/gi, '').trim() || 
                       'Basic blockchain transaction';
    
    return { description, avaxConcept };
  } catch (error) {
    console.error('Error generating clue content:', error);
    return {
      description: `Evidence ${clueNumber}: A ${rarity} clue related to the Avalanche ecosystem has been found.`,
      avaxConcept: 'Blockchain transaction analysis'
    };
  }
}

function extractEducationalTerms(text: string): EducationalLink[] {
  const foundTerms: EducationalLink[] = [];
  const lowerText = text.toLowerCase();
  
  Object.entries(EDUCATIONAL_LINKS).forEach(([key, link]) => {
    const searchTerms = [
      link.term.toLowerCase(),
      key.replace('_', ' '),
      key.replace('_', '')
    ];
    
    if (searchTerms.some(term => lowerText.includes(term))) {
      foundTerms.push(link);
    }
  });
  
  return foundTerms;
}

export function formatClueWithEducationalLinks(clue: MarketplaceClue): string {
  let formattedDescription = clue.description;
  
  // Add educational links inline
  clue.educationalLinks.forEach(link => {
    const regex = new RegExp(link.term, 'gi');
    formattedDescription = formattedDescription.replace(
      regex, 
      `${link.term} [?](${link.url} "${link.briefExplanation}")`
    );
  });
  
  return formattedDescription;
}

export function calculateClueMarketPrice(
  clue: MarketplaceClue, 
  demandMultiplier: number = 1,
  timeRemaining: number = 24 // hours until mystery ends
): number {
  let price = clue.marketValue;
  
  // Apply demand multiplier based on how many people want this clue
  price *= demandMultiplier;
  
  // Increase price as mystery deadline approaches
  const urgencyMultiplier = Math.max(1, 2 - (timeRemaining / 24));
  price *= urgencyMultiplier;
  
  // Legendary clues get more expensive over time
  if (clue.rarity === 'legendary') {
    price *= 1.5;
  }
  
  return Number(price.toFixed(3));
}

export async function generateCluePackage(
  mysteryId: string,
  packageSize: number = 3
): Promise<MarketplaceClue[]> {
  const clues: MarketplaceClue[] = [];
  
  for (let i = 1; i <= packageSize; i++) {
    const clue = await generateRandomClue(mysteryId, 15, i);
    clues.push(clue);
  }
  
  return clues;
}

// Generate clues specifically for educational progression
export async function generateEducationalClueSequence(
  mysteryId: string,
  concepts: string[]
): Promise<MarketplaceClue[]> {
  const clues: MarketplaceClue[] = [];
  
  for (let i = 0; i < concepts.length; i++) {
    const concept = concepts[i];
    const clueContent = await generateConceptSpecificClue(concept, i + 1);
    
    const clue: MarketplaceClue = {
      id: `edu_clue_${mysteryId}_${i + 1}_${Date.now()}`,
      mysteryId,
      clueNumber: i + 1,
      rarity: i < 2 ? 'common' : i < 4 ? 'uncommon' : 'rare',
      description: clueContent.description,
      avaxConcept: clueContent.avaxConcept,
      educationalLinks: extractEducationalTerms(clueContent.description + " " + clueContent.avaxConcept),
      marketValue: RARITY_BASE_VALUES[i < 2 ? 'common' : i < 4 ? 'uncommon' : 'rare'],
      isRevealed: false
    };
    
    clues.push(clue);
  }
  
  return clues;
}

async function generateConceptSpecificClue(concept: string, clueNumber: number): Promise<{description: string, avaxConcept: string}> {
  const prompt = `
Generate a mystery clue that specifically teaches the Web3 concept: "${concept}"

The clue should:
- Be forensic evidence in a detective story
- Naturally incorporate the concept without being preachy
- Include specific AVAX ecosystem details
- Be educational for someone new to Web3
- Feel authentic to a crime investigation

Format:
Description: [The clue as crime scene evidence]
AVAX Concept: [Brief explanation of the concept being taught]
`;

  try {
    const response = await generate(prompt);
    const lines = response.split('\n').filter(line => line.trim());
    
    const descriptionLine = lines.find(line => line.toLowerCase().includes('description:'));
    const conceptLine = lines.find(line => line.toLowerCase().includes('avax concept:') || line.toLowerCase().includes('concept:'));
    
    const description = descriptionLine?.replace(/description:?/gi, '').trim() || 
                      `Clue ${clueNumber}: Evidence related to ${concept} has been discovered.`;
                      
    const avaxConcept = conceptLine?.replace(/avax concept:?|concept:?/gi, '').trim() || concept;
    
    return { description, avaxConcept };
  } catch (error) {
    console.error('Error generating concept-specific clue:', error);
    return {
      description: `Evidence ${clueNumber}: Investigation reveals details about ${concept}.`,
      avaxConcept: concept
    };
  }
}

export interface ClueReward {
  clueId: string;
  playerAddress: string;
  earnedAt: number;
  miniGamesCompleted: number;
}

export function trackClueEarning(
  clueId: string,
  playerAddress: string,
  miniGamesCompleted: number
): ClueReward {
  return {
    clueId,
    playerAddress,
    earnedAt: Date.now(),
    miniGamesCompleted
  };
}


