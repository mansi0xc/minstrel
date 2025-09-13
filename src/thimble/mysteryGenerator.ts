import { generate } from './generate';
import crypto from 'crypto';

export interface EducationalLink {
  term: string;
  url: string;
  briefExplanation: string;
}

export interface Suspect {
  id: number;
  name: string;
  age: number;
  background: string;
  possibleMotive: string;
  avaxConnection: string;
  educationalLinks: EducationalLink[];
}

export interface Clue {
  id: number;
  description: string;
  avaxConcept: string;
  educationalLinks: EducationalLink[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MysteryCase {
  id: string;
  title: string;
  shortDescription: string;
  victim: {
    name: string;
    age: number;
    background: string;
    avaxRole: string;
  };
  suspects: Suspect[];
  clues: Clue[];
  solution: {
    culprit: string;
    motive: string;
    explanation: string;
  };
  educationalGoals: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
}

// Educational links database for common Web3/AVAX terms
export const EDUCATIONAL_LINKS: Record<string, EducationalLink> = {
  'smart_contract': {
    term: 'Smart Contract',
    url: 'https://docs.avax.network/learn/avalanche/smart-contracts',
    briefExplanation: 'Self-executing contracts with terms written in code. Like a digital vending machine - you put money in, get the product out automatically.'
  },
  'subnet': {
    term: 'Subnet',
    url: 'https://docs.avax.network/learn/avalanche/subnets',
    briefExplanation: 'A custom blockchain network on Avalanche. Think of it as creating your own specialized highway for specific traffic.'
  },
  'liquidity_pool': {
    term: 'Liquidity Pool',
    url: 'https://traderjoe.xyz/learn/what-is-a-liquidity-pool',
    briefExplanation: 'A shared pot of money that enables trading. Like a community fund where people contribute and earn fees from trades.'
  },
  'yield_farming': {
    term: 'Yield Farming',
    url: 'https://docs.avax.network/dapps/yield-farming',
    briefExplanation: 'Earning rewards by lending your crypto. Similar to earning interest in a savings account, but with higher potential returns.'
  },
  'defi': {
    term: 'DeFi (Decentralized Finance)',
    url: 'https://docs.avax.network/learn/avalanche/avalanche-consensus',
    briefExplanation: 'Financial services without banks. Like having a bank that runs automatically without human managers.'
  },
  'validator': {
    term: 'Validator',
    url: 'https://docs.avax.network/nodes/validate/what-is-staking',
    briefExplanation: 'Computers that secure the network and verify transactions. Like digital security guards that get paid for their work.'
  },
  'bridge': {
    term: 'Bridge',
    url: 'https://docs.avax.network/cross-chain',
    briefExplanation: 'Connects different blockchains. Like a bridge that lets you move assets between different digital countries.'
  },
  'staking': {
    term: 'Staking',
    url: 'https://docs.avax.network/nodes/validate/what-is-staking',
    briefExplanation: 'Locking up your crypto to help secure the network and earn rewards. Like putting money in a CD that helps run the bank.'
  },
  'gas_fees': {
    term: 'Gas Fees',
    url: 'https://docs.avax.network/quickstart/transaction-fees',
    briefExplanation: 'Small fees paid to process transactions. Like paying a small toll to use a highway.'
  },
  'avax_token': {
    term: 'AVAX Token',
    url: 'https://docs.avax.network/learn/avalanche/avax',
    briefExplanation: 'The native currency of Avalanche network. Like the dollar is to America, AVAX is to Avalanche.'
  },
  'nft': {
    term: 'NFT (Non-Fungible Token)',
    url: 'https://docs.avax.network/dapps/nfts',
    briefExplanation: 'Unique digital certificates of ownership. Like a digital certificate that proves you own an original artwork.'
  },
  'consensus': {
    term: 'Consensus Mechanism',
    url: 'https://docs.avax.network/learn/avalanche/avalanche-consensus',
    briefExplanation: 'How the network agrees on what transactions are valid. Like a voting system where computers decide what\'s legitimate.'
  }
};

export const MYSTERY_TEMPLATES = {
  'defi_heist': `Create a DeFi mystery case about a suspicious drain from a major Avalanche protocol. Include suspects like a whale trader, smart contract auditor, protocol founder, and yield farmer. Focus on concepts like liquidity pools, impermanent loss, and MEV attacks.`,
  
  'validator_conspiracy': `Create a mystery about a validator node going offline during a critical network upgrade. Include suspects like competing validators, the node operator, a disgruntled developer, and a regulatory figure. Focus on staking, consensus, and network security.`,
  
  'nft_forgery': `Create a mystery about counterfeit NFTs appearing on Avalanche marketplaces. Include suspects like the original artist, marketplace operator, a jealous collector, and a tech-savvy forger. Focus on NFT standards, metadata, and digital provenance.`,
  
  'bridge_exploit': `Create a mystery about missing funds during a cross-chain bridge operation. Include suspects like the bridge operator, a white-hat hacker, a disgruntled employee, and a competitor protocol. Focus on cross-chain security, wrapped tokens, and bridge mechanics.`,
  
  'governance_manipulation': `Create a mystery about suspicious voting patterns in a DAO governance proposal. Include suspects like a whale holder, the proposal author, a competing protocol, and an insider trader. Focus on governance tokens, voting mechanisms, and protocol upgrades.`
};

export async function generateMysteryCase(
  theme: keyof typeof MYSTERY_TEMPLATES,
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
): Promise<MysteryCase> {
  
  const basePrompt = MYSTERY_TEMPLATES[theme];
  
  const fullPrompt = `
${basePrompt}

You MUST produce a fully coherent case where story, suspects, clues, and solution logically connect. Each clue must help narrow suspects toward the final culprit; each suspect's background and motive must align with the shortDescription and solution.

Output STRICT JSON only (no markdown, no commentary). Use this exact schema:
{
  "id": string,
  "title": string,
  "shortDescription": string,
  "victim": { "name": string, "age": number, "background": string, "avaxRole": string },
  "suspects": [ { "id": number, "name": string, "age": number, "background": string, "possibleMotive": string, "avaxConnection": string } ],
  "clues": [ { "id": number, "description": string, "avaxConcept": string, "difficulty": "easy"|"medium"|"hard" } ],
  "solution": { "culprit": string, "motive": string, "explanation": string },
  "educationalGoals": string[],
  "difficultyLevel": "beginner"|"intermediate"|"advanced"
}

Constraints:
- Tailor suspects and clues to the exact incident described.
- Reference real Avalanche protocols where appropriate (Trader Joe, Benqi, Aave, Core, bridges, validators, subnets).
- Ensure the culprit in solution is one of the suspects; clues should justify the conclusion.
- Difficulty is ${difficultyLevel} — include concepts matching that level.
`;

  try {
    const aiResponse = await generate(fullPrompt);
    const mysteryCase = tryParseCaseJson(aiResponse, theme, difficultyLevel);
    return addEducationalLinks(mysteryCase);
  } catch (error) {
    console.error('Error generating mystery case:', error);
  // Re-throw the original error so callers can capture full details
  throw error;
  }
}

// Convenience: also return the raw AI output so callers can persist it for auditing
export async function generateMysteryCaseWithRaw(
  theme: keyof typeof MYSTERY_TEMPLATES,
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
): Promise<{ case: MysteryCase; raw: string; promptUsed: string }> {
  const basePrompt = MYSTERY_TEMPLATES[theme];
  const fullPrompt = `
${basePrompt}

You MUST produce a fully coherent case where story, suspects, clues, and solution logically connect. Each clue must help narrow suspects toward the final culprit; each suspect's background and motive must align with the shortDescription and solution.

Output STRICT JSON only (no markdown, no commentary). Use this exact schema:
{
  "id": string,
  "title": string,
  "shortDescription": string,
  "victim": { "name": string, "age": number, "background": string, "avaxRole": string },
  "suspects": [ { "id": number, "name": string, "age": number, "background": string, "possibleMotive": string, "avaxConnection": string } ],
  "clues": [ { "id": number, "description": string, "avaxConcept": string, "difficulty": "easy"|"medium"|"hard" } ],
  "solution": { "culprit": string, "motive": string, "explanation": string },
  "educationalGoals": string[],
  "difficultyLevel": "beginner"|"intermediate"|"advanced"
}

Constraints:
- Tailor suspects and clues to the exact incident described.
- Ensure the culprit is among suspects; clues justify the conclusion.
- Difficulty is ${difficultyLevel}.
`;
  try {
    const aiResponse = await generate(fullPrompt);
    const structured = addEducationalLinks(
      tryParseCaseJson(aiResponse, theme, difficultyLevel)
    );
    return { case: structured, raw: aiResponse, promptUsed: fullPrompt };
  } catch (error) {
    console.error('Error generating mystery case (with raw):', error);
    throw error;
  }
}

// Attempt to parse strict JSON from AI; fall back to heuristic parsing if needed
function tryParseCaseJson(text: string, theme: string, difficulty: 'beginner'|'intermediate'|'advanced'): MysteryCase {
  const jsonText = extractJsonBlock(text);
  if (jsonText) {
    try {
      const obj = JSON.parse(jsonText);
      return normalizeCase(obj, theme, difficulty);
    } catch {}
  }
  // Fallback: heuristic parsing, then add IDs and difficulty
  const fallback = parseMysteryResponse(text, theme, difficulty);
  return normalizeCase(fallback, theme, difficulty);
}

function extractJsonBlock(text: string): string | null {
  // Try to find the first {...} JSON block (accounts for code fences too)
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) return fenceMatch[1].trim();
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = text.slice(firstBrace, lastBrace + 1).trim();
    // quick sanity check
    if (candidate.includes('title') && candidate.includes('suspects')) return candidate;
  }
  return null;
}

function normalizeCase(obj: any, theme: string, difficulty: 'beginner'|'intermediate'|'advanced'): MysteryCase {
  const ensureId = () => (typeof obj?.id === 'string' && obj.id) ? obj.id : `${theme}_${Date.now()}_${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
  const result: MysteryCase = {
    id: ensureId(),
    title: String(obj?.title ?? `The ${theme.replace('_',' ')} Mystery`),
    shortDescription: String(obj?.shortDescription ?? 'A mysterious case unfolds in the Avalanche ecosystem...'),
    victim: {
      name: String(obj?.victim?.name ?? 'Unknown'),
      age: Number.isFinite(obj?.victim?.age) ? obj.victim.age : 40,
      background: String(obj?.victim?.background ?? 'Member of AVAX ecosystem'),
      avaxRole: String(obj?.victim?.avaxRole ?? 'Participant')
    },
    suspects: Array.isArray(obj?.suspects) && obj.suspects.length
      ? obj.suspects.map((s: any, i: number) => ({
          id: Number.isFinite(s?.id) ? s.id : i + 1,
          name: String(s?.name ?? `Suspect ${i+1}`),
          age: Number.isFinite(s?.age) ? s.age : 30,
          background: String(s?.background ?? ''),
          possibleMotive: String(s?.possibleMotive ?? ''),
          avaxConnection: String(s?.avaxConnection ?? ''),
          educationalLinks: []
        }))
      : generateDefaultSuspects(theme),
    clues: Array.isArray(obj?.clues) && obj.clues.length
      ? obj.clues.map((c: any, i: number) => ({
          id: Number.isFinite(c?.id) ? c.id : i + 1,
          description: String(c?.description ?? ''),
          avaxConcept: String(c?.avaxConcept ?? ''),
          educationalLinks: [],
          difficulty: (c?.difficulty === 'easy' || c?.difficulty === 'medium' || c?.difficulty === 'hard') ? c.difficulty : 'medium'
        }))
      : generateDefaultClues(theme, difficulty),
    solution: {
      culprit: String(obj?.solution?.culprit ?? 'TBD'),
      motive: String(obj?.solution?.motive ?? 'Unknown'),
      explanation: String(obj?.solution?.explanation ?? 'Investigation reveals the truth...')
    },
    educationalGoals: Array.isArray(obj?.educationalGoals) && obj.educationalGoals.length ? obj.educationalGoals.map(String) : getEducationalGoals(theme, difficulty),
    difficultyLevel: (obj?.difficultyLevel === 'beginner' || obj?.difficultyLevel === 'intermediate' || obj?.difficultyLevel === 'advanced') ? obj.difficultyLevel : difficulty
  };

  return result;
}

function parseMysteryResponse(response: string, theme: string, difficulty: 'beginner' | 'intermediate' | 'advanced'): MysteryCase {
  // This is a simplified parser - in a real implementation, you'd want more robust parsing
  // For now, we'll create a structured response based on the theme
  
  const mysteryId = `${theme}_${Date.now()}`;
  
  // Parse the AI response and structure it
  // This would need more sophisticated parsing in a real implementation
  const lines = response.split('\n').filter(line => line.trim());
  
  return {
    id: mysteryId,
    title: extractTitle(lines) || `The ${theme.replace('_', ' ')} Mystery`,
    shortDescription: extractDescription(lines) || "A mysterious case unfolds in the Avalanche ecosystem...",
    victim: extractVictim(lines) || {
      name: "Alex Thompson",
      age: 45,
      background: "DeFi protocol founder",
      avaxRole: "Major liquidity provider"
    },
    suspects: extractSuspects(lines) || generateDefaultSuspects(theme),
    clues: extractClues(lines) || generateDefaultClues(theme, difficulty),
    solution: extractSolution(lines) || {
      culprit: "TBD",
      motive: "Financial gain",
      explanation: "Investigation reveals the truth..."
    },
    educationalGoals: getEducationalGoals(theme, difficulty),
    difficultyLevel: difficulty
  };
}

function addEducationalLinks(mysteryCase: MysteryCase): MysteryCase {
  // Add educational links to suspects
  mysteryCase.suspects = mysteryCase.suspects.map(suspect => ({
    ...suspect,
    educationalLinks: extractEducationalTerms(suspect.background + " " + suspect.possibleMotive + " " + suspect.avaxConnection)
  }));

  // Add educational links to clues
  mysteryCase.clues = mysteryCase.clues.map(clue => ({
    ...clue,
    educationalLinks: extractEducationalTerms(clue.description + " " + clue.avaxConcept)
  }));

  return mysteryCase;
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

// Helper functions for parsing (simplified for MVP)
function extractTitle(lines: string[]): string | null {
  const titleLine = lines.find(line => 
    line.toLowerCase().includes('title') || 
    line.toLowerCase().includes('case:') ||
    line.startsWith('# ')
  );
  return titleLine?.replace(/title:?|case:?|#/gi, '').trim() || null;
}

function extractDescription(lines: string[]): string | null {
  const startIndex = lines.findIndex(line => 
    line.toLowerCase().includes('description') || 
    line.toLowerCase().includes('story')
  );
  
  if (startIndex === -1) return null;
  
  const description = lines.slice(startIndex + 1, startIndex + 4).join(' ');
  return description || null;
}

function extractVictim(lines: string[]): any {
  // Simplified victim extraction
  return null; // Will use default
}

function extractSuspects(lines: string[]): Suspect[] | null {
  // Simplified suspect extraction
  return null; // Will use default
}

function extractClues(lines: string[]): Clue[] | null {
  // Simplified clue extraction
  return null; // Will use default
}

function extractSolution(lines: string[]): any {
  // Simplified solution extraction
  return null; // Will use default
}

function generateDefaultSuspects(theme: string): Suspect[] {
  const basesuspects = [
    {
      id: 1,
      name: "Marina Chen",
      age: 34,
      background: "Senior DeFi strategist and yield farming expert",
      possibleMotive: "Access to protocol treasury funds",
      avaxConnection: "Major liquidity provider across multiple Avalanche protocols",
      educationalLinks: []
    },
    {
      id: 2,
      name: "Dr. Robert Hayes",
      age: 52,
      background: "Blockchain security researcher and smart contract auditor",
      possibleMotive: "Discovered a critical vulnerability and wanted to exploit it first",
      avaxConnection: "Audited several major Avalanche protocols including Trader Joe",
      educationalLinks: []
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      age: 28,
      background: "Avalanche validator operator running 15 nodes",
      possibleMotive: "Competing for validator rewards and network influence",
      avaxConnection: "One of the largest independent validators on Avalanche network",
      educationalLinks: []
    },
    {
      id: 4,
      name: "James Park",
      age: 41,
      background: "Cross-chain bridge developer and MEV bot operator",
      possibleMotive: "Insider knowledge of bridge vulnerabilities",
      avaxConnection: "Built the bridge connecting Avalanche to Ethereum",
      educationalLinks: []
    }
  ];
  
  return basesuspects;
}

function generateDefaultClues(theme: string, difficulty: string): Clue[] {
  const baseClues = [
    {
      id: 1,
      description: "Transaction 0x7f2a shows an unusual 50,000 AVAX transfer to an unknown wallet at 11:47 PM",
      avaxConcept: "AVAX token transfers and wallet addresses",
      educationalLinks: [],
      difficulty: 'easy' as const
    },
    {
      id: 2,
      description: "Trader Joe liquidity pool for AVAX/USDC shows 15% slippage during the incident",
      avaxConcept: "Automated Market Makers and slippage in DEX trading",
      educationalLinks: [],
      difficulty: 'medium' as const
    },
    {
      id: 3,
      description: "Validator node #47891 missed 12 consecutive blocks during the network upgrade",
      avaxConcept: "Validator operations and network consensus",
      educationalLinks: [],
      difficulty: 'medium' as const
    },
    {
      id: 4,
      description: "A smart contract interaction shows unusual gas fees of 200 nAVAX instead of typical 2 nAVAX",
      avaxConcept: "Gas fees and smart contract execution costs",
      educationalLinks: [],
      difficulty: 'easy' as const
    },
    {
      id: 5,
      description: "Cross-chain bridge shows pending withdrawal of 100,000 USDC for 48 hours",
      avaxConcept: "Cross-chain bridges and wrapped tokens",
      educationalLinks: [],
      difficulty: 'hard' as const
    }
  ];
  
  return baseClues;
}

function getEducationalGoals(theme: string, difficulty: string): string[] {
  const goals = {
    'defi_heist': [
      'Understand how liquidity pools work',
      'Learn about yield farming strategies',
      'Recognize MEV (Maximum Extractable Value) attacks',
      'Identify smart contract vulnerabilities'
    ],
    'validator_conspiracy': [
      'Learn how validator nodes secure the network',
      'Understand staking mechanisms',
      'Recognize consensus protocol importance',
      'Learn about network upgrades and hard forks'
    ],
    'nft_forgery': [
      'Understand NFT standards and metadata',
      'Learn about digital provenance',
      'Recognize marketplace mechanics',
      'Understand IPFS and decentralized storage'
    ],
    'bridge_exploit': [
      'Learn how cross-chain bridges work',
      'Understand wrapped tokens',
      'Recognize bridge security risks',
      'Learn about multi-signature wallets'
    ],
    'governance_manipulation': [
      'Understand DAO governance mechanisms',
      'Learn about voting power and tokenomics',
      'Recognize governance attacks',
      'Understand proposal and execution processes'
    ]
  };
  
  return goals[theme as keyof typeof goals] || ['Learn basic blockchain concepts'];
}

export async function generateRandomMystery(difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): Promise<MysteryCase> {
  const themes = Object.keys(MYSTERY_TEMPLATES) as Array<keyof typeof MYSTERY_TEMPLATES>;
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  return generateMysteryCase(randomTheme, difficulty);
}

export function getAllEducationalLinks(): Record<string, EducationalLink> {
  return EDUCATIONAL_LINKS;
}
