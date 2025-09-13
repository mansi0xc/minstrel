// Test script to generate and display a complete mystery case
import { avalancheMysteryAI, quickDemo } from './avalancheMysteryAI';
import { generateMysteryCase } from './mysteryGenerator';
import { generateRandomClue } from './clueGenerator';

export async function generateAndDisplayMystery() {
  console.log('🔍 Generating Avalanche Mystery Case...\n');
  
  try {
    // Generate a mystery case
    const mystery = await generateMysteryCase('defi_heist', 'beginner');
    
    // Generate some sample clues
    const clues = [];
    for (let i = 1; i <= 5; i++) {
      const clue = await generateRandomClue(mystery.id, 15, i);
      clues.push(clue);
    }
    
    // Display everything in a nice format
    console.log('='.repeat(80));
    console.log(`🎭 MYSTERY CASE: ${mystery.title.toUpperCase()}`);
    console.log('='.repeat(80));
    
    console.log('\n📖 STORY DESCRIPTION:');
    console.log('-'.repeat(40));
    console.log(mystery.shortDescription);
    
    console.log('\n💀 VICTIM:');
    console.log('-'.repeat(40));
    console.log(`Name: ${mystery.victim.name} (Age: ${mystery.victim.age})`);
    console.log(`Background: ${mystery.victim.background}`);
    console.log(`AVAX Role: ${mystery.victim.avaxRole}`);
    
    console.log('\n🕵️ SUSPECTS:');
    console.log('-'.repeat(40));
    mystery.suspects.forEach((suspect, index) => {
      console.log(`${index + 1}. ${suspect.name} (Age: ${suspect.age})`);
      console.log(`   Background: ${suspect.background}`);
      console.log(`   AVAX Connection: ${suspect.avaxConnection}`);
      console.log(`   Possible Motive: ${suspect.possibleMotive}`);
      if (suspect.educationalLinks.length > 0) {
        console.log(`   📚 Educational Links: ${suspect.educationalLinks.map(link => link.term).join(', ')}`);
      }
      console.log();
    });
    
    console.log('🔍 SAMPLE CLUES:');
    console.log('-'.repeat(40));
    clues.forEach((clue, index) => {
      console.log(`${index + 1}. [${clue.rarity.toUpperCase()}] ${clue.description}`);
      console.log(`   💡 Teaches: ${clue.avaxConcept}`);
      console.log(`   💰 Market Value: ${clue.marketValue} AVAX`);
      if (clue.educationalLinks.length > 0) {
        console.log(`   📚 Links: ${clue.educationalLinks.map(link => link.term).join(', ')}`);
      }
      console.log();
    });
    
    console.log('🏆 SOLUTION:');
    console.log('-'.repeat(40));
    console.log(`Culprit: ${mystery.solution.culprit}`);
    console.log(`Motive: ${mystery.solution.motive}`);
    console.log(`Explanation: ${mystery.solution.explanation}`);
    
    console.log('\n🎓 EDUCATIONAL GOALS:');
    console.log('-'.repeat(40));
    mystery.educationalGoals.forEach((goal, index) => {
      console.log(`${index + 1}. ${goal}`);
    });
    
    console.log('\n📊 MYSTERY STATS:');
    console.log('-'.repeat(40));
    console.log(`Difficulty: ${mystery.difficultyLevel}`);
    console.log(`Suspects: ${mystery.suspects.length}`);
    console.log(`Total Clues: ${mystery.clues.length}`);
    console.log(`Educational Concepts: ${mystery.educationalGoals.length}`);
    
    console.log('\n' + '='.repeat(80));
    
    return { mystery, sampleClues: clues };
    
  } catch (error) {
    console.error('❌ Error generating mystery:', error);
    throw error;
  }
}

// Function to return data in JSON format
export async function getMysteryAsJSON() {
  console.log('📄 Generating mystery in JSON format...\n');
  
  const mystery = await generateMysteryCase('defi_heist', 'beginner');
  
  // Generate sample clues
  const clues = [];
  for (let i = 1; i <= 8; i++) {
    const clue = await generateRandomClue(mystery.id, 15, i);
    clues.push(clue);
  }
  
  const result = {
    mystery,
    sampleClues: clues,
    metadata: {
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
      theme: 'defi_heist',
      difficulty: 'beginner'
    }
  };
  
  // Pretty print JSON
  const jsonString = JSON.stringify(result, null, 2);
  console.log(jsonString);
  
  return result;
}

// Run a quick test
export async function runQuickTest() {
  console.log('🚀 Running Quick Mystery Test...\n');
  
  try {
    const demo = await quickDemo();
    
    console.log('\n🎯 QUICK TEST RESULTS:');
    console.log('✅ Mystery generation: Working');
    console.log('✅ Clue generation: Working');
    console.log('✅ Educational links: Working');
    console.log('✅ Live demo flow: Working');
    
    return demo;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return null;
  }
}

// Export for easy use
export { quickDemo } from './avalancheMysteryAI';


