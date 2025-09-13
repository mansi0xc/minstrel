import { generateImage, generate } from './generate';
import { MysteryCase, generateMysteryCase, generateRandomMystery } from './mysteryGenerator';
import { MarketplaceClue, generateRandomClue, calculateClueMarketPrice } from './clueGenerator';

export interface ActiveMystery extends MysteryCase {
  startTime: number;
  endTime: number;
  totalPrizePool: number; // in AVAX
  participantCount: number;
  status: 'active' | 'ended' | 'rewards_distributed';
  correctAnswerHash: string; // hashed correct answer
}

export interface PlayerSubmission {
  id: string;
  mysteryId: string;
  playerAddress: string;
  suspectChoice: string;
  explanation: string;
  submissionTime: number;
  cluesUsed: string[]; // clue IDs used to make decision
  timeCoefficient: number;
  isCorrect?: boolean;
  rewardAmount?: number;
}

export interface MysteryReward {
  playerAddress: string;
  rewardAmount: number; // in AVAX
  timeBonus: number;
  participationBonus: number;
  nftTokenId?: string;
  mysteryId: string;
}

export interface MysteryNFT {
  tokenId: string;
  mysteryId: string;
  playerAddress: string;
  tier: 'solver' | 'participant' | 'early_bird' | 'legendary';
  imageUrl: string;
  metadata: {
    mysteryTitle: string;
    solveTime: number;
    rank: number;
    totalParticipants: number;
    cluesUsed: number;
    rarityScore: number;
  };
}

// Mystery case lifecycle management
export class MysteryManager {
  private activeMysteries: Map<string, ActiveMystery> = new Map();
  private playerSubmissions: Map<string, PlayerSubmission[]> = new Map();
  private clueInventory: Map<string, MarketplaceClue[]> = new Map();

  async createNewMystery(
    difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner',
    durationHours: number = 72,
    basePrizePool: number = 100 // AVAX
  ): Promise<ActiveMystery> {
    
    const mysteryCase = await generateRandomMystery(difficulty);
    const startTime = Date.now();
    const endTime = startTime + (durationHours * 60 * 60 * 1000);
    
    const activeMystery: ActiveMystery = {
      ...mysteryCase,
      startTime,
      endTime,
      totalPrizePool: basePrizePool,
      participantCount: 0,
      status: 'active',
      correctAnswerHash: this.hashAnswer(mysteryCase.solution.culprit)
    };

    this.activeMysteries.set(mysteryCase.id, activeMystery);
    
    // Pre-generate clue inventory for this mystery
    await this.generateClueInventory(mysteryCase.id, 15);
    
    return activeMystery;
  }

  async submitSolution(
    mysteryId: string,
    playerAddress: string,
    suspectChoice: string,
    explanation: string,
    cluesUsed: string[]
  ): Promise<PlayerSubmission> {
    
    const mystery = this.activeMysteries.get(mysteryId);
    if (!mystery) {
      throw new Error('Mystery not found');
    }

    if (mystery.status !== 'active') {
      throw new Error('Mystery is no longer accepting submissions');
    }

    if (Date.now() > mystery.endTime) {
      throw new Error('Mystery submission period has ended');
    }

    const submissionTime = Date.now();
    const timeCoefficient = this.calculateTimeCoefficient(mystery.startTime, mystery.endTime, submissionTime);
    
    const submission: PlayerSubmission = {
      id: `sub_${mysteryId}_${playerAddress}_${submissionTime}`,
      mysteryId,
      playerAddress,
      suspectChoice,
      explanation,
      submissionTime,
      cluesUsed,
      timeCoefficient
    };

    // Store submission
    if (!this.playerSubmissions.has(mysteryId)) {
      this.playerSubmissions.set(mysteryId, []);
    }
    this.playerSubmissions.get(mysteryId)!.push(submission);

    // Update participant count
    const uniqueParticipants = new Set(
      this.playerSubmissions.get(mysteryId)!.map(s => s.playerAddress)
    ).size;
    mystery.participantCount = uniqueParticipants;

    return submission;
  }

  async endMystery(mysteryId: string): Promise<MysteryReward[]> {
    const mystery = this.activeMysteries.get(mysteryId);
    if (!mystery) {
      throw new Error('Mystery not found');
    }

    mystery.status = 'ended';
    
    const submissions = this.playerSubmissions.get(mysteryId) || [];
    const correctAnswer = mystery.solution.culprit;
    
    // Evaluate submissions
    submissions.forEach(submission => {
      submission.isCorrect = submission.suspectChoice.toLowerCase() === correctAnswer.toLowerCase();
    });

    // Calculate rewards
    const rewards = this.calculateRewards(mystery, submissions);
    
    // Generate NFTs for winners
    await this.generateWinnerNFTs(mystery, submissions);
    
    mystery.status = 'rewards_distributed';
    
    return rewards;
  }

  private async generateClueInventory(mysteryId: string, totalClues: number): Promise<void> {
    const clues: MarketplaceClue[] = [];
    
    for (let i = 1; i <= totalClues; i++) {
      const clue = await generateRandomClue(mysteryId, totalClues, i);
      clues.push(clue);
    }
    
    this.clueInventory.set(mysteryId, clues);
  }

  getRandomClueForPlayer(mysteryId: string): MarketplaceClue | null {
    const clues = this.clueInventory.get(mysteryId);
    if (!clues || clues.length === 0) {
      return null;
    }

    // Weighted random selection based on rarity
    const weights = {
      common: 60,
      uncommon: 25, 
      rare: 12,
      legendary: 3
    };

    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    const random = Math.random() * totalWeight;
    
    let currentWeight = 0;
    let selectedRarity: keyof typeof weights = 'common';
    
    for (const [rarity, weight] of Object.entries(weights)) {
      currentWeight += weight;
      if (random <= currentWeight) {
        selectedRarity = rarity as keyof typeof weights;
        break;
      }
    }

    // Find clues of selected rarity
    const eligibleClues = clues.filter(clue => clue.rarity === selectedRarity);
    if (eligibleClues.length === 0) {
      // Fallback to any available clue
      return clues[Math.floor(Math.random() * clues.length)];
    }

    return eligibleClues[Math.floor(Math.random() * eligibleClues.length)];
  }

  private calculateTimeCoefficient(startTime: number, endTime: number, submissionTime: number): number {
    const totalDuration = endTime - startTime;
    const elapsedTime = submissionTime - startTime;
    const remainingTimeRatio = Math.max(0, (totalDuration - elapsedTime) / totalDuration);
    
    // Time coefficient ranges from 1.0 (last minute) to 2.0 (immediate)
    return 1.0 + remainingTimeRatio;
  }

  private calculateRewards(mystery: ActiveMystery, submissions: PlayerSubmission[]): MysteryReward[] {
    const correctSubmissions = submissions.filter(s => s.isCorrect);
    const rewards: MysteryReward[] = [];

    if (correctSubmissions.length === 0) {
      // No winners - distribute participation rewards
      return this.calculateParticipationRewards(mystery, submissions);
    }

    // Calculate total weighted score for correct submissions
    const totalWeightedScore = correctSubmissions.reduce((total, submission) => {
      return total + submission.timeCoefficient;
    }, 0);

    // Distribute 80% of prize pool based on time coefficients
    const mainPrizePool = mystery.totalPrizePool * 0.8;
    const participationPool = mystery.totalPrizePool * 0.2;

    correctSubmissions.forEach((submission, index) => {
      const baseReward = (submission.timeCoefficient / totalWeightedScore) * mainPrizePool;
      const timeBonus = baseReward * (submission.timeCoefficient - 1); // Extra bonus for speed
      
      rewards.push({
        playerAddress: submission.playerAddress,
        rewardAmount: Number((baseReward + timeBonus).toFixed(3)),
        timeBonus: Number(timeBonus.toFixed(3)),
        participationBonus: 0,
        mysteryId: mystery.id
      });
    });

    // Add participation rewards for incorrect submissions
    const incorrectSubmissions = submissions.filter(s => !s.isCorrect);
    if (incorrectSubmissions.length > 0) {
      const participationReward = participationPool / incorrectSubmissions.length;
      
      incorrectSubmissions.forEach(submission => {
        rewards.push({
          playerAddress: submission.playerAddress,
          rewardAmount: Number(participationReward.toFixed(3)),
          timeBonus: 0,
          participationBonus: Number(participationReward.toFixed(3)),
          mysteryId: mystery.id
        });
      });
    }

    return rewards;
  }

  private calculateParticipationRewards(mystery: ActiveMystery, submissions: PlayerSubmission[]): MysteryReward[] {
    if (submissions.length === 0) return [];

    const rewardPerParticipant = mystery.totalPrizePool / submissions.length;
    
    return submissions.map(submission => ({
      playerAddress: submission.playerAddress,
      rewardAmount: Number(rewardPerParticipant.toFixed(3)),
      timeBonus: 0,
      participationBonus: Number(rewardPerParticipant.toFixed(3)),
      mysteryId: mystery.id
    }));
  }

  private async generateWinnerNFTs(mystery: ActiveMystery, submissions: PlayerSubmission[]): Promise<void> {
    const correctSubmissions = submissions.filter(s => s.isCorrect);
    
    // Sort by time coefficient (fastest solvers first)
    correctSubmissions.sort((a, b) => b.timeCoefficient - a.timeCoefficient);

    for (let i = 0; i < correctSubmissions.length; i++) {
      const submission = correctSubmissions[i];
      const rank = i + 1;
      
      let tier: MysteryNFT['tier'] = 'solver';
      if (rank === 1) tier = 'legendary';
      else if (rank <= 3) tier = 'early_bird';
      
      const nft = await this.createMysteryNFT(mystery, submission, rank, tier);
      
      // Store NFT info (in real implementation, mint to blockchain)
      console.log(`Generated NFT for ${submission.playerAddress}:`, nft);
    }
  }

  private async createMysteryNFT(
    mystery: ActiveMystery,
    submission: PlayerSubmission,
    rank: number,
    tier: MysteryNFT['tier']
  ): Promise<MysteryNFT> {
    
    // Generate NFT artwork
    const imagePrompt = `
Create a Victorian detective-themed NFT artwork for a Web3 mystery game winner.
Theme: ${mystery.title}
Rank: ${rank} out of ${mystery.participantCount}
Tier: ${tier}
Style: Steampunk, ornate, mysterious, with Avalanche branding elements
Include: Detective elements, gears, Victorian aesthetics, rank indicator
`;

    try {
      const imageBlob = await generateImage(imagePrompt);
      const imageUrl = URL.createObjectURL(imageBlob); // In real implementation, upload to IPFS
      
      const tokenId = `mystery_${mystery.id}_rank_${rank}_${Date.now()}`;
      
      const solveTime = submission.submissionTime - mystery.startTime;
      const rarityScore = this.calculateRarityScore(tier, rank, mystery.participantCount, submission.timeCoefficient);
      
      return {
        tokenId,
        mysteryId: mystery.id,
        playerAddress: submission.playerAddress,
        tier,
        imageUrl,
        metadata: {
          mysteryTitle: mystery.title,
          solveTime,
          rank,
          totalParticipants: mystery.participantCount,
          cluesUsed: submission.cluesUsed.length,
          rarityScore
        }
      };
    } catch (error) {
      console.error('Error generating NFT artwork:', error);
      
      // Fallback NFT without custom image
      return {
        tokenId: `mystery_${mystery.id}_rank_${rank}_${Date.now()}`,
        mysteryId: mystery.id,
        playerAddress: submission.playerAddress,
        tier,
        imageUrl: '/placeholder-nft.png',
        metadata: {
          mysteryTitle: mystery.title,
          solveTime: submission.submissionTime - mystery.startTime,
          rank,
          totalParticipants: mystery.participantCount,
          cluesUsed: submission.cluesUsed.length,
          rarityScore: this.calculateRarityScore(tier, rank, mystery.participantCount, submission.timeCoefficient)
        }
      };
    }
  }

  private calculateRarityScore(tier: string, rank: number, totalParticipants: number, timeCoefficient: number): number {
    let baseScore = 100;
    
    // Tier multiplier
    const tierMultipliers = {
      'legendary': 10,
      'early_bird': 5,
      'solver': 2,
      'participant': 1
    };
    
    baseScore *= tierMultipliers[tier as keyof typeof tierMultipliers] || 1;
    
    // Rank bonus (higher for better ranks)
    const rankBonus = Math.max(0, 100 - (rank / totalParticipants) * 100);
    baseScore += rankBonus;
    
    // Time bonus
    const timeBonus = (timeCoefficient - 1) * 50;
    baseScore += timeBonus;
    
    return Math.round(baseScore);
  }

  private hashAnswer(answer: string): string {
    // Simple hash function - in production use proper cryptographic hash
    return btoa(answer.toLowerCase().trim());
  }

  // Public getters
  getActiveMysteries(): ActiveMystery[] {
    return Array.from(this.activeMysteries.values()).filter(m => m.status === 'active');
  }

  getMysteryById(id: string): ActiveMystery | undefined {
    return this.activeMysteries.get(id);
  }

  getPlayerSubmissions(mysteryId: string, playerAddress?: string): PlayerSubmission[] {
    const submissions = this.playerSubmissions.get(mysteryId) || [];
    if (playerAddress) {
      return submissions.filter(s => s.playerAddress === playerAddress);
    }
    return submissions;
  }

  getClueMarketplace(mysteryId: string): MarketplaceClue[] {
    return this.clueInventory.get(mysteryId) || [];
  }
}

// Singleton instance for the app
export const mysteryManager = new MysteryManager();

// Helper functions for the frontend
export async function initializeDemoMystery(): Promise<ActiveMystery> {
  return await mysteryManager.createNewMystery('beginner', 72, 50);
}

export function getCurrentMysteries(): ActiveMystery[] {
  return mysteryManager.getActiveMysteries();
}

export async function submitMySolution(
  mysteryId: string,
  playerAddress: string,
  suspectChoice: string,
  explanation: string,
  cluesUsed: string[]
): Promise<PlayerSubmission> {
  return await mysteryManager.submitSolution(mysteryId, playerAddress, suspectChoice, explanation, cluesUsed);
}

export function earnClueFromMiniGame(mysteryId: string): MarketplaceClue | null {
  return mysteryManager.getRandomClueForPlayer(mysteryId);
}


