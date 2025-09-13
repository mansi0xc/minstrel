// Main AI interface for Avalanche-themed mystery generation
// This is the primary file to use for your MVP demo

import { mysteryManager, initializeDemoMystery, type ActiveMystery, type PlayerSubmission } from './caseManager';
import { generateMysteryCase, generateRandomMystery, type MysteryCase, MYSTERY_TEMPLATES, EDUCATIONAL_LINKS } from './mysteryGenerator';
import { generateRandomClue, formatClueWithEducationalLinks, type MarketplaceClue } from './clueGenerator';

// Main interface for the MVP demo
export class AvalancheMysteryAI {
  
  /**
   * Generate a complete Avalanche-themed mystery case for the demo
   * Perfect for showing off to AVAX representatives
   */
  async generateDemoCase(): Promise<MysteryCase> {
    console.log('🔍 Generating Avalanche mystery case...');
    
    // Generate a DeFi heist case - perfect for demo
    const mysteryCase = await generateMysteryCase('defi_heist', 'beginner');
    
    console.log(`✅ Generated mystery: "${mysteryCase.title}"`);
    console.log(`📚 Educational goals: ${mysteryCase.educationalGoals.join(', ')}`);
    
    return mysteryCase;
  }

  /**
   * Start a live mystery session for the demo
   */
  async startLiveMystery(): Promise<ActiveMystery> {
    console.log('🚀 Starting live mystery session...');
    
    const activeMystery = await initializeDemoMystery();
    
    console.log(`🔴 Live mystery started: "${activeMystery.title}"`);
    console.log(`💰 Prize pool: ${activeMystery.totalPrizePool} AVAX`);
    console.log(`⏰ Duration: ${Math.round((activeMystery.endTime - activeMystery.startTime) / (1000 * 60 * 60))} hours`);
    
    return activeMystery;
  }

  /**
   * Generate a random clue for mini-game reward
   */
  async generateClueReward(mysteryId: string): Promise<MarketplaceClue> {
    console.log('🎁 Generating clue reward...');
    
    const clue = await generateRandomClue(mysteryId, 15, Math.floor(Math.random() * 15) + 1);
    
    console.log(`📜 Generated ${clue.rarity} clue worth ${clue.marketValue} AVAX`);
    console.log(`💡 Teaches: ${clue.avaxConcept}`);
    
    return clue;
  }

  /**
   * Format clue with educational links for display
   */
  formatEducationalClue(clue: MarketplaceClue): string {
    return formatClueWithEducationalLinks(clue);
  }

  /**
   * Submit a solution and get immediate feedback (demo mode)
   */
  async submitDemoSolution(
    mysteryId: string,
    playerAddress: string,
    suspectName: string,
    explanation: string
  ): Promise<{ submission: PlayerSubmission; isCorrect: boolean; timeBonus: number }> {
    
    console.log(`🕵️ ${playerAddress} submitted solution: ${suspectName}`);
    
    const cluesUsed = ['demo_clue_1', 'demo_clue_2']; // Demo clues
    const submission = await mysteryManager.submitSolution(
      mysteryId,
      playerAddress,
      suspectName,
      explanation,
      cluesUsed
    );

    // For demo, check against the mystery's solution
    const mystery = mysteryManager.getMysteryById(mysteryId);
    const isCorrect = mystery ? 
      suspectName.toLowerCase() === mystery.solution.culprit.toLowerCase() : 
      false;

    const timeBonus = submission.timeCoefficient - 1;

    console.log(`${isCorrect ? '✅ Correct!' : '❌ Incorrect'} Time bonus: ${timeBonus.toFixed(2)}x`);

    return { submission, isCorrect, timeBonus };
  }

  /**
   * Get all available educational concepts
   */
  getEducationalConcepts(): Array<{ term: string; explanation: string; url: string }> {
    return Object.values(EDUCATIONAL_LINKS);
  }

  /**
   * Get available mystery themes for the demo
   */
  getAvailableThemes(): Array<{ id: string; description: string }> {
    return Object.entries(MYSTERY_TEMPLATES).map(([id, description]) => ({
      id,
      description
    }));
  }

  /**
   * Generate a quick educational summary for AVAX representatives
   */
  generateEducationalSummary(mysteryCase: MysteryCase): string {
    const conceptsCovered = mysteryCase.educationalGoals.length;
    const suspectCount = mysteryCase.suspects.length;
    const clueCount = mysteryCase.clues.length;
    
    return `
🎯 Educational Impact Summary:
• ${conceptsCovered} core AVAX concepts taught through gameplay
• ${suspectCount} different ecosystem roles represented (validators, DeFi users, developers)
• ${clueCount} interactive learning moments with real-world AVAX applications
• Difficulty: ${mysteryCase.difficultyLevel} (perfect for Web2 onboarding)

💡 Key Concepts Covered:
${mysteryCase.educationalGoals.map(goal => `• ${goal}`).join('\n')}

🔗 Web3 Terms Explained:
Each technical term includes educational links with simple explanations like:
"Smart Contract: Self-executing contracts with terms written in code. Like a digital vending machine - you put money in, get the product out automatically."

📈 Expected Outcomes:
• New users learn AVAX fundamentals while solving mysteries
• 70%+ retention rate through engaging narrative
• Natural progression from mini-games to DeFi interaction
• Community building through marketplace trading
`;
  }

  /**
   * Demo the complete user journey for AVAX representatives
   */
  async demoUserJourney(): Promise<{
    mystery: ActiveMystery;
    sampleClue: MarketplaceClue;
    formattedClue: string;
    educationalSummary: string;
  }> {
    console.log('🎬 Starting complete user journey demo...');
    
    // Step 1: Generate mystery
    const mystery = await this.startLiveMystery();
    
    // Step 2: Generate sample clue reward
    const sampleClue = await this.generateClueReward(mystery.id);
    
    // Step 3: Format with educational links
    const formattedClue = this.formatEducationalClue(sampleClue);
    
    // Step 4: Generate educational summary
    const educationalSummary = this.generateEducationalSummary(mystery);
    
    console.log('✅ Demo journey complete!');
    
    return {
      mystery,
      sampleClue,
      formattedClue,
      educationalSummary
    };
  }
}

// Export singleton instance
export const avalancheMysteryAI = new AvalancheMysteryAI();

// Quick demo functions for immediate use
export async function quickDemo() {
  console.log('🚀 Running Avalanche Mystery AI Quick Demo...\n');
  
  try {
    const demo = await avalancheMysteryAI.demoUserJourney();
    
    console.log('\n📋 DEMO RESULTS FOR AVAX REPRESENTATIVES:\n');
    console.log(`Mystery Title: ${demo.mystery.title}`);
    console.log(`Prize Pool: ${demo.mystery.totalPrizePool} AVAX`);
    console.log(`\nSample Clue (${demo.sampleClue.rarity}): ${demo.sampleClue.description}`);
    console.log(`\nEducational Value: ${demo.sampleClue.avaxConcept}`);
    console.log(`\nFormatted with Links: ${demo.formattedClue}`);
    console.log('\n' + demo.educationalSummary);
    
    return demo;
  } catch (error) {
    console.error('Demo failed:', error);
    throw error;
  }
}

// Export everything for easy access
export * from './caseManager';
export * from './mysteryGenerator';
export * from './clueGenerator';
export { MYSTERY_TEMPLATES, EDUCATIONAL_LINKS };

// Ready-to-use demo data for tomorrow's pitch
export const PITCH_DEMO_DATA = {
  mysteryThemes: Object.keys(MYSTERY_TEMPLATES),
  educationalConcepts: Object.keys(EDUCATIONAL_LINKS),
  targetMetrics: {
    newWallets: '5,000 in month 1',
    avaxVolume: '$50K in 3 months',
    retention: '70% after first case',
    defiInteractions: '2.5 protocols per mystery'
  },
  businessModel: {
    marketplaceFee: '3%',
    premiumAccess: '100 AVAX/month',
    sponsorships: '500 AVAX per featured mystery',
    nftRoyalties: '5% secondary sales'
  }
};

console.log('🎯 Avalanche Mystery AI loaded and ready for AVAX pitch demo!');
console.log('Run quickDemo() to see the complete user journey.');
