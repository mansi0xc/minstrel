import { generate } from './generate';

export interface EducationalLink {
  term: string;
  url: string;
  briefExplanation: string;
  detailedExplanation: string;
}

export interface LogicalClue {
  id: number;
  description: string;
  avaxConcept: string;
  educationalLinks: EducationalLink[];
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  marketValue: number;
  eliminatesWho?: string[]; // Which suspects this clue eliminates
  pointsTo?: string; // Which suspect this clue points to
  requiresPrevious?: number[]; // Which previous clues are needed to understand this one
}

export interface LogicalSuspect {
  id: number;
  name: string;
  age: number;
  background: string;
  avaxRole: string;
  motive: string;
  alibi: string;
  technicalCapability: string;
  educationalLinks: EducationalLink[];
}

export interface LogicalMystery {
  id: string;
  title: string;
  setting: string;
  incidentDescription: string;
  victim: {
    name: string;
    role: string;
    whatHappened: string;
    technicalDetails: string;
  };
  suspects: LogicalSuspect[];
  clues: LogicalClue[];
  solution: {
    culprit: string;
    method: string;
    motive: string;
    evidence: string[];
    howCluesPointToCulprit: string;
  };
  educationalGoals: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
}

// Educational links database with detailed explanations
const EDUCATIONAL_CONCEPTS: Record<string, EducationalLink> = {
  'governance_attack': {
    term: 'Governance Attack',
    url: 'https://docs.avax.network/learn/avalanche/governance',
    briefExplanation: 'When someone manipulates voting to control a protocol',
    detailedExplanation: 'A governance attack occurs when an attacker accumulates enough governance tokens to propose and pass malicious proposals. In DeFi protocols, governance tokens give holders voting rights on protocol changes. If someone gets >51% of tokens (or enough to reach quorum), they can vote to drain treasuries, change fee structures, or modify smart contracts for personal benefit.'
  },
  'flash_loan': {
    term: 'Flash Loan',
    url: 'https://docs.avax.network/dapps/smart-contracts/flash-loans',
    briefExplanation: 'Borrowing crypto that must be repaid in the same transaction',
    detailedExplanation: 'Flash loans allow borrowing large amounts of cryptocurrency without collateral, but the loan must be repaid within the same blockchain transaction. If not repaid, the entire transaction fails. Attackers use flash loans to manipulate prices, exploit arbitrage, or temporarily gain voting power in governance attacks.'
  },
  'liquidity_pool': {
    term: 'Liquidity Pool',
    url: 'https://traderjoe.xyz/learn/what-is-a-liquidity-pool',
    briefExplanation: 'A shared pot of money that enables trading',
    detailedExplanation: 'Liquidity pools are smart contracts holding pairs of tokens (like AVAX/USDC) that enable decentralized trading. Users deposit tokens to earn fees from trades. The pool uses an automated market maker (AMM) formula to set prices based on the ratio of tokens. Large trades can cause "slippage" - price changes during the trade.'
  },
  'validator_staking': {
    term: 'Validator Staking',
    url: 'https://docs.avax.network/nodes/validate/what-is-staking',
    briefExplanation: 'Locking AVAX to help secure the network and earn rewards',
    detailedExplanation: 'Validators stake AVAX tokens to participate in network consensus. They validate transactions and create new blocks. Validators earn rewards for honest behavior but can be "slashed" (lose staked tokens) for malicious actions. Minimum stake is 2,000 AVAX. Users can delegate to validators if they have less than 2,000 AVAX.'
  },
  'smart_contract_vulnerability': {
    term: 'Smart Contract Vulnerability',
    url: 'https://docs.avax.network/dapps/smart-contracts/security',
    briefExplanation: 'Bugs in code that attackers can exploit',
    detailedExplanation: 'Smart contracts are immutable code, so bugs become permanent vulnerabilities. Common issues include reentrancy attacks (calling functions repeatedly), integer overflow (numbers becoming too large), and access control bugs (wrong permissions). Audits help find these issues before deployment.'
  },
  'cross_chain_bridge': {
    term: 'Cross-Chain Bridge',
    url: 'https://docs.avax.network/cross-chain',
    briefExplanation: 'Technology that connects different blockchains',
    detailedExplanation: 'Bridges allow moving assets between blockchains (like Ethereum to Avalanche). They work by locking tokens on one chain and minting equivalent tokens on another. Bridges are high-value targets for hackers because they hold large amounts of locked assets. Security depends on the bridge design and validators.'
  },
  'mev_attack': {
    term: 'MEV (Maximum Extractable Value)',
    url: 'https://docs.avax.network/dapps/smart-contracts/mev',
    briefExplanation: 'Profit extracted by reordering transactions',
    detailedExplanation: 'MEV involves validators or bots reordering, including, or censoring transactions to extract profit. Common MEV strategies include front-running (placing transactions before large trades to profit from price changes) and sandwich attacks (placing transactions before and after a target transaction). This can harm regular users through worse prices.'
  }
};

// Pre-designed logical mystery templates
const LOGICAL_MYSTERY_TEMPLATES = {
  governance_heist: {
    title: "The Phantom Proposal Heist",
    setup: async (): Promise<LogicalMystery> => {
      const mysteryId = `governance_heist_${Date.now()}`;
      
      return {
        id: mysteryId,
        title: "The Phantom Proposal Heist",
        setting: "Avalanche Governance Council Chambers, Digital Realm",
        incidentDescription: "At 3:17 AM, a malicious governance proposal passed with 67% of the vote, granting emergency withdrawal rights to a mysterious address. Within minutes, 2.5 million AVAX vanished from the protocol treasury. The proposal appeared legitimate but contained hidden code that activated after approval.",
        victim: {
          name: "TreasureDAO Protocol",
          role: "Decentralized Investment Fund",
          whatHappened: "Treasury completely drained through governance exploit",
          technicalDetails: "Proposal #247 contained obfuscated code that granted withdrawer role to address 0x789..."
        },
        suspects: [
          {
            id: 1,
            name: "Elena Vasquez",
            age: 29,
            background: "DeFi Protocol Developer",
            avaxRole: "Core contributor to multiple Avalanche protocols",
            motive: "Recently fired from TreasureDAO for proposing risky investment strategies",
            alibi: "Claims she was working on a new protocol launch all night",
            technicalCapability: "Expert smart contract developer, knows governance systems inside-out",
            educationalLinks: [EDUCATIONAL_CONCEPTS.governance_attack, EDUCATIONAL_CONCEPTS.smart_contract_vulnerability]
          },
          {
            id: 2,
            name: "Marcus Thompson",
            age: 45,
            background: "Avalanche Whale Investor",
            avaxRole: "Holds 1.8M AVAX across multiple wallets",
            motive: "Lost $500K in TreasureDAO's failed investment and wants compensation",
            alibi: "Was attending an investor meeting in Singapore (timestamped video calls)",
            technicalCapability: "Business background, limited technical skills, hires developers",
            educationalLinks: [EDUCATIONAL_CONCEPTS.governance_attack, EDUCATIONAL_CONCEPTS.flash_loan]
          },
          {
            id: 3,
            name: "Dr. Sarah Chen",
            age: 38,
            background: "Blockchain Security Researcher",
            avaxRole: "Audits smart contracts for Avalanche protocols",
            motive: "Discovered the vulnerability 6 months ago, TreasureDAO ignored her warnings",
            alibi: "Home alone writing a research paper on governance attacks",
            technicalCapability: "PhD in Computer Science, expert in smart contract vulnerabilities",
            educationalLinks: [EDUCATIONAL_CONCEPTS.smart_contract_vulnerability, EDUCATIONAL_CONCEPTS.governance_attack]
          },
          {
            id: 4,
            name: "Alex Rivera",
            age: 32,
            background: "Avalanche Validator Operator",
            avaxRole: "Runs 12 validator nodes, participates in governance",
            motive: "Needs funds to expand validator operations and compete with larger players",
            alibi: "Was monitoring validator nodes during network upgrade",
            technicalCapability: "Strong understanding of Avalanche consensus, moderate smart contract skills",
            educationalLinks: [EDUCATIONAL_CONCEPTS.validator_staking, EDUCATIONAL_CONCEPTS.governance_attack]
          }
        ],
        clues: [
          {
            id: 1,
            description: "The malicious proposal was submitted from IP address 192.168.0.115, which traces to a coffee shop in downtown Seattle. Security cameras show someone using a laptop with distinctive stickers at 2:45 AM.",
            avaxConcept: "Governance proposal submission and IP tracking",
            educationalLinks: [EDUCATIONAL_CONCEPTS.governance_attack],
            rarity: 'common',
            marketValue: 0.5,
            eliminatesWho: ["Marcus Thompson"], // He was in Singapore
            requiresPrevious: []
          },
          {
            id: 2,
            description: "Blockchain analysis reveals the proposal was funded by a flash loan from Aave protocol. 50,000 AVAX was borrowed, used to buy governance tokens, vote, then repaid within the same transaction block.",
            avaxConcept: "Flash loans and governance token manipulation",
            educationalLinks: [EDUCATIONAL_CONCEPTS.flash_loan, EDUCATIONAL_CONCEPTS.governance_attack],
            rarity: 'uncommon',
            marketValue: 2.0,
            eliminatesWho: ["Alex Rivera"], // Doesn't have flash loan expertise
            requiresPrevious: [1]
          },
          {
            id: 3,
            description: "The smart contract code in the proposal contains a deliberate obfuscation technique called 'constructor aliasing' - a rare method only taught in advanced security courses at 3 universities.",
            avaxConcept: "Advanced smart contract obfuscation techniques",
            educationalLinks: [EDUCATIONAL_CONCEPTS.smart_contract_vulnerability],
            rarity: 'rare',
            marketValue: 8.0,
            pointsTo: "Dr. Sarah Chen", // PhD background, teaches security
            requiresPrevious: [1, 2]
          },
          {
            id: 4,
            description: "Coffee shop security footage shows someone wearing a 'BlockSec Research Conference 2024' hoodie - the same conference where Dr. Chen presented her governance attack research paper.",
            avaxConcept: "Digital forensics and identity correlation",
            educationalLinks: [EDUCATIONAL_CONCEPTS.governance_attack],
            rarity: 'uncommon',
            marketValue: 1.5,
            pointsTo: "Dr. Sarah Chen",
            requiresPrevious: [1, 3]
          },
          {
            id: 5,
            description: "The withdrawal address 0x789abc... was created exactly 6 months ago - the same day Dr. Chen submitted her vulnerability report to TreasureDAO. Address creation timestamp matches her email timestamp.",
            avaxConcept: "Blockchain address analysis and timestamp correlation",
            educationalLinks: [EDUCATIONAL_CONCEPTS.smart_contract_vulnerability],
            rarity: 'legendary',
            marketValue: 25.0,
            pointsTo: "Dr. Sarah Chen",
            requiresPrevious: [1, 2, 3, 4]
          }
        ],
        solution: {
          culprit: "Dr. Sarah Chen",
          method: "Used flash loan to temporarily acquire governance tokens, submitted obfuscated proposal, voted it through, then executed the hidden withdrawal function",
          motive: "Revenge against TreasureDAO for ignoring her security warnings and frustration with DeFi protocols not taking security seriously",
          evidence: [
            "IP address traces to coffee shop where she was seen",
            "Flash loan technique matches her research expertise", 
            "Obfuscation method from her academic background",
            "Conference hoodie identifies her in footage",
            "Withdrawal address created when she discovered the vulnerability"
          ],
          howCluesPointToCulprit: "Clue 1 eliminates Marcus (wrong location), Clue 2 eliminates Alex (lacks flash loan skills), Clues 3-5 all point to Dr. Chen through her academic background, research expertise, and the timing correlation between her vulnerability discovery and the attack preparation."
        },
        educationalGoals: [
          "Understand how governance attacks work in DeFi protocols",
          "Learn about flash loans and their risks",
          "Recognize smart contract vulnerability patterns",
          "Understand the importance of security audits",
          "Learn how blockchain forensics can trace attackers"
        ],
        difficultyLevel: 'intermediate'
      };
    }
  }
};

export async function generateLogicalMystery(template: keyof typeof LOGICAL_MYSTERY_TEMPLATES = 'governance_heist'): Promise<LogicalMystery> {
  console.log(`🔍 Generating logical mystery: ${template}`);
  
  const mysteryTemplate = LOGICAL_MYSTERY_TEMPLATES[template];
  if (!mysteryTemplate) {
    throw new Error(`Unknown mystery template: ${template}`);
  }
  
  const mystery = await mysteryTemplate.setup();
  
  console.log(`✅ Generated "${mystery.title}" with ${mystery.clues.length} logical clues`);
  return mystery;
}

// Utility function to verify mystery logic
export function verifyMysteryLogic(mystery: LogicalMystery): {
  isValid: boolean;
  issues: string[];
  deductionPath: string[];
} {
  const issues: string[] = [];
  const deductionPath: string[] = [];
  
  // Check if clues logically eliminate all suspects except the culprit
  const eliminatedSuspects = new Set<string>();
  const suspectNames = mystery.suspects.map(s => s.name);
  const culprit = mystery.solution.culprit;
  
  mystery.clues.forEach((clue, index) => {
    if (clue.eliminatesWho) {
      clue.eliminatesWho.forEach(suspect => {
        if (suspect === culprit) {
          issues.push(`Clue ${index + 1} eliminates the culprit ${culprit}`);
        }
        eliminatedSuspects.add(suspect);
        deductionPath.push(`Clue ${index + 1}: Eliminates ${suspect}`);
      });
    }
    
    if (clue.pointsTo) {
      if (clue.pointsTo !== culprit) {
        issues.push(`Clue ${index + 1} points to ${clue.pointsTo} but culprit is ${culprit}`);
      }
      deductionPath.push(`Clue ${index + 1}: Points to ${clue.pointsTo}`);
    }
  });
  
  // Check if all non-culprits are eliminated
  const shouldBeEliminated = suspectNames.filter(name => name !== culprit);
  const notEliminated = shouldBeEliminated.filter(name => !eliminatedSuspects.has(name));
  
  if (notEliminated.length > 0) {
    issues.push(`Suspects not eliminated by clues: ${notEliminated.join(', ')}`);
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    deductionPath
  };
}

export { EDUCATIONAL_CONCEPTS };


