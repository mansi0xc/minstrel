// Simple test script to generate and view mystery cases
// Run with: node test-mystery.js

// Since we're using TypeScript modules, we'll create a simple test with mock data
// In a real setup, you'd compile the TypeScript first

const fs = require('fs');
const path = require('path');

// Mock mystery data that would come from your AI functions
const generateMockMystery = () => {
  return {
    mystery: {
      id: `defi_heist_${Date.now()}`,
      title: "The Trader Joe Treasury Heist",
      shortDescription: "On a foggy evening in the digital realm of Avalanche, the Trader Joe protocol experiences a massive liquidity drain. 500,000 AVAX and 2.5 million USDC vanish from the treasury in what appears to be an inside job. The protocol's governance token JOE crashes 40% as panic spreads through the DeFi community. With millions at stake and the protocol's future hanging in the balance, detective work must uncover who had the knowledge and access to execute such a sophisticated heist.",
      victim: {
        name: "Trader Joe Protocol Treasury",
        age: 2,
        background: "Automated DeFi protocol managing $50M in total value locked",
        avaxRole: "Primary DEX and yield farming platform on Avalanche"
      },
      suspects: [
        {
          id: 1,
          name: "Marina Chen",
          age: 34,
          background: "Senior DeFi strategist and yield farming expert",
          possibleMotive: "Access to protocol treasury funds through governance exploit",
          avaxConnection: "Major liquidity provider across multiple Avalanche protocols",
          educationalLinks: [
            {
              term: "Liquidity Pool",
              url: "https://traderjoe.xyz/learn/what-is-a-liquidity-pool",
              briefExplanation: "A shared pot of money that enables trading. Like a community fund where people contribute and earn fees from trades."
            }
          ]
        },
        {
          id: 2,
          name: "Dr. Robert Hayes", 
          age: 52,
          background: "Blockchain security researcher and smart contract auditor",
          possibleMotive: "Discovered a critical vulnerability and exploited it for personal gain",
          avaxConnection: "Audited several major Avalanche protocols including Trader Joe",
          educationalLinks: [
            {
              term: "Smart Contract",
              url: "https://docs.avax.network/learn/avalanche/smart-contracts",
              briefExplanation: "Self-executing contracts with terms written in code. Like a digital vending machine - you put money in, get the product out automatically."
            }
          ]
        },
        {
          id: 3,
          name: "Sofia Rodriguez",
          age: 28,
          background: "Avalanche validator operator running 15 nodes",
          possibleMotive: "Competing for validator rewards and network influence",
          avaxConnection: "One of the largest independent validators on Avalanche network",
          educationalLinks: [
            {
              term: "Validator",
              url: "https://docs.avax.network/nodes/validate/what-is-staking",
              briefExplanation: "Computers that secure the network and verify transactions. Like digital security guards that get paid for their work."
            }
          ]
        },
        {
          id: 4,
          name: "James Park",
          age: 41,
          background: "Cross-chain bridge developer and MEV bot operator",
          possibleMotive: "Insider knowledge of bridge vulnerabilities",
          avaxConnection: "Built the bridge connecting Avalanche to Ethereum",
          educationalLinks: [
            {
              term: "Bridge",
              url: "https://docs.avax.network/cross-chain",
              briefExplanation: "Connects different blockchains. Like a bridge that lets you move assets between different digital countries."
            }
          ]
        }
      ],
      clues: [],
      solution: {
        culprit: "Marina Chen",
        motive: "Governance token manipulation for treasury access",
        explanation: "Marina used her large JOE holdings to propose and vote through a malicious governance proposal that gave her emergency withdrawal rights."
      },
      educationalGoals: [
        "Understand how liquidity pools work",
        "Learn about yield farming strategies",
        "Recognize governance attack vectors",
        "Identify smart contract vulnerabilities"
      ],
      difficultyLevel: "beginner"
    },
    sampleClues: [
      {
        id: "clue_1",
        rarity: "common",
        description: "Transaction logs show a large AVAX transfer of 50,000 tokens to address 0x742d35Cc4Bf3B3e82e0C7E0F4D3b8B5F2A1C8b9D at 11:47 PM",
        avaxConcept: "AVAX token transfers and wallet addresses",
        marketValue: 0.5,
        educationalLinks: [
          {
            term: "AVAX Token",
            explanation: "The native currency of Avalanche network. Like the dollar is to America, AVAX is to Avalanche."
          }
        ]
      },
      {
        id: "clue_2",
        rarity: "uncommon", 
        description: "Trader Joe liquidity pool for AVAX/USDC shows 15% slippage during the incident, indicating massive sell pressure",
        avaxConcept: "Automated Market Makers and slippage in DEX trading",
        marketValue: 2.0,
        educationalLinks: [
          {
            term: "Liquidity Pool",
            explanation: "A shared pot of money that enables trading. Like a community fund where people contribute and earn fees from trades."
          }
        ]
      },
      {
        id: "clue_3",
        rarity: "rare",
        description: "Governance proposal #47 shows unusual voting patterns with 85% of votes coming from a single whale address in the final 2 hours",
        avaxConcept: "DAO governance and voting mechanisms",
        marketValue: 8.0,
        educationalLinks: [
          {
            term: "DeFi (Decentralized Finance)",
            explanation: "Financial services without banks. Like having a bank that runs automatically without human managers."
          }
        ]
      },
      {
        id: "clue_4",
        rarity: "common",
        description: "Security camera footage shows the victim accessing Trader Joe DEX at 11:42 PM, providing liquidity to the AVAX/USDC pool",
        avaxConcept: "Decentralized exchanges and liquidity provision",
        marketValue: 0.4,
        educationalLinks: [
          {
            term: "Yield Farming",
            explanation: "Earning rewards by lending your crypto. Similar to earning interest in a savings account, but with higher potential returns."
          }
        ]
      },
      {
        id: "clue_5",
        rarity: "legendary",
        description: "Smart contract audit reveals a hidden function in the treasury contract that allows emergency withdrawal if caller has >1M JOE tokens",
        avaxConcept: "Smart contract vulnerabilities and governance attacks",
        marketValue: 25.0,
        educationalLinks: [
          {
            term: "Smart Contract",
            explanation: "Self-executing contracts with terms written in code. Like a digital vending machine - you put money in, get the product out automatically."
          }
        ]
      }
    ],
    metadata: {
      generatedAt: new Date().toISOString(),
      version: "1.0.0",
      theme: "defi_heist",
      difficulty: "beginner"
    }
  };
};

// Display functions
const displayMystery = (data) => {
  console.log('='.repeat(80));
  console.log(`🎭 MYSTERY CASE: ${data.mystery.title.toUpperCase()}`);
  console.log('='.repeat(80));
  
  console.log('\n📖 STORY DESCRIPTION:');
  console.log('-'.repeat(40));
  console.log(data.mystery.shortDescription);
  
  console.log('\n💀 VICTIM:');
  console.log('-'.repeat(40));
  console.log(`Name: ${data.mystery.victim.name}`);
  console.log(`Background: ${data.mystery.victim.background}`);
  console.log(`AVAX Role: ${data.mystery.victim.avaxRole}`);
  
  console.log('\n🕵️ SUSPECTS:');
  console.log('-'.repeat(40));
  data.mystery.suspects.forEach((suspect, index) => {
    console.log(`${index + 1}. ${suspect.name} (Age: ${suspect.age})`);
    console.log(`   Background: ${suspect.background}`);
    console.log(`   AVAX Connection: ${suspect.avaxConnection}`);
    console.log(`   Possible Motive: ${suspect.possibleMotive}`);
    if (suspect.educationalLinks && suspect.educationalLinks.length > 0) {
      console.log(`   📚 Educational Terms: ${suspect.educationalLinks.map(link => link.term).join(', ')}`);
    }
    console.log();
  });
  
  console.log('🔍 SAMPLE CLUES:');
  console.log('-'.repeat(40));
  data.sampleClues.forEach((clue, index) => {
    console.log(`${index + 1}. [${clue.rarity.toUpperCase()}] ${clue.description}`);
    console.log(`   💡 Teaches: ${clue.avaxConcept}`);
    console.log(`   💰 Market Value: ${clue.marketValue} AVAX`);
    if (clue.educationalLinks && clue.educationalLinks.length > 0) {
      console.log(`   📚 Educational Terms: ${clue.educationalLinks.map(link => link.term).join(', ')}`);
    }
    console.log();
  });
  
  console.log('🏆 SOLUTION:');
  console.log('-'.repeat(40));
  console.log(`Culprit: ${data.mystery.solution.culprit}`);
  console.log(`Motive: ${data.mystery.solution.motive}`);
  console.log(`Explanation: ${data.mystery.solution.explanation}`);
  
  console.log('\n🎓 EDUCATIONAL GOALS:');
  console.log('-'.repeat(40));
  data.mystery.educationalGoals.forEach((goal, index) => {
    console.log(`${index + 1}. ${goal}`);
  });
  
  console.log('\n📊 MYSTERY STATS:');
  console.log('-'.repeat(40));
  console.log(`Difficulty: ${data.mystery.difficultyLevel}`);
  console.log(`Suspects: ${data.mystery.suspects.length}`);
  console.log(`Sample Clues: ${data.sampleClues.length}`);
  console.log(`Educational Concepts: ${data.mystery.educationalGoals.length}`);
  
  console.log('\n' + '='.repeat(80));
};

const saveToJSON = (data, filename = 'mystery-output.json') => {
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync(filename, jsonString);
  console.log(`💾 Mystery saved to ${filename}`);
  return jsonString;
};

// Main execution
console.log('🚀 Avalanche Mystery AI - Test Generator');
console.log('🔍 Generating sample mystery case...\n');

try {
  const mysteryData = generateMockMystery();
  
  // Display in console
  displayMystery(mysteryData);
  
  // Save to JSON file
  const jsonOutput = saveToJSON(mysteryData);
  
  // Save formatted data for the HTML viewer
  const htmlData = `
// Mystery data for HTML viewer
const mysteryData = ${JSON.stringify(mysteryData, null, 2)};

// Update the HTML file with this data by replacing the sampleMystery variable
console.log('Mystery data generated:', mysteryData);
`;
  
  fs.writeFileSync('mystery-data.js', htmlData);
  console.log('💾 HTML viewer data saved to mystery-data.js');
  
  console.log('\n🎯 NEXT STEPS:');
  console.log('1. View JSON output: cat mystery-output.json');
  console.log('2. Open mysteryViewer.html in your browser');
  console.log('3. For live generation, compile TypeScript files and run the actual AI functions');
  
  console.log('\n✅ Test completed successfully!');
  
} catch (error) {
  console.error('❌ Error generating mystery:', error);
}
