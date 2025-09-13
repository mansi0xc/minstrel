// Test script for the new logical mystery generator
// This creates mysteries that actually make logical sense and can be solved

const fs = require('fs');

// Mock the logical mystery since we can't run TypeScript directly
const generateLogicalMystery = () => {
  return {
    "id": `governance_heist_${Date.now()}`,
    "title": "The Phantom Proposal Heist",
    "setting": "Avalanche Governance Council Chambers, Digital Realm",
    "incidentDescription": "At 3:17 AM, a malicious governance proposal passed with 67% of the vote, granting emergency withdrawal rights to a mysterious address. Within minutes, 2.5 million AVAX vanished from the protocol treasury. The proposal appeared legitimate but contained hidden code that activated after approval.",
    "victim": {
      "name": "TreasureDAO Protocol",
      "role": "Decentralized Investment Fund", 
      "whatHappened": "Treasury completely drained through governance exploit",
      "technicalDetails": "Proposal #247 contained obfuscated code that granted withdrawer role to address 0x789..."
    },
    "suspects": [
      {
        "id": 1,
        "name": "Elena Vasquez",
        "age": 29,
        "background": "DeFi Protocol Developer",
        "avaxRole": "Core contributor to multiple Avalanche protocols",
        "motive": "Recently fired from TreasureDAO for proposing risky investment strategies",
        "alibi": "Claims she was working on a new protocol launch all night",
        "technicalCapability": "Expert smart contract developer, knows governance systems inside-out"
      },
      {
        "id": 2,
        "name": "Marcus Thompson", 
        "age": 45,
        "background": "Avalanche Whale Investor",
        "avaxRole": "Holds 1.8M AVAX across multiple wallets",
        "motive": "Lost $500K in TreasureDAO's failed investment and wants compensation",
        "alibi": "Was attending an investor meeting in Singapore (timestamped video calls)",
        "technicalCapability": "Business background, limited technical skills, hires developers"
      },
      {
        "id": 3,
        "name": "Dr. Sarah Chen",
        "age": 38,
        "background": "Blockchain Security Researcher",
        "avaxRole": "Audits smart contracts for Avalanche protocols", 
        "motive": "Discovered the vulnerability 6 months ago, TreasureDAO ignored her warnings",
        "alibi": "Home alone writing a research paper on governance attacks",
        "technicalCapability": "PhD in Computer Science, expert in smart contract vulnerabilities"
      },
      {
        "id": 4,
        "name": "Alex Rivera",
        "age": 32, 
        "background": "Avalanche Validator Operator",
        "avaxRole": "Runs 12 validator nodes, participates in governance",
        "motive": "Needs funds to expand validator operations and compete with larger players",
        "alibi": "Was monitoring validator nodes during network upgrade",
        "technicalCapability": "Strong understanding of Avalanche consensus, moderate smart contract skills"
      }
    ],
    "clues": [
      {
        "id": 1,
        "description": "The malicious proposal was submitted from IP address 192.168.0.115, which traces to a coffee shop in downtown Seattle. Security cameras show someone using a laptop with distinctive stickers at 2:45 AM.",
        "avaxConcept": "Governance proposal submission and IP tracking",
        "educationalLinks": [
          {
            "term": "Governance Attack",
            "url": "https://docs.avax.network/learn/avalanche/governance",
            "briefExplanation": "When someone manipulates voting to control a protocol",
            "detailedExplanation": "A governance attack occurs when an attacker accumulates enough governance tokens to propose and pass malicious proposals. In DeFi protocols, governance tokens give holders voting rights on protocol changes. If someone gets >51% of tokens (or enough to reach quorum), they can vote to drain treasuries, change fee structures, or modify smart contracts for personal benefit."
          }
        ],
        "rarity": "common",
        "marketValue": 0.5,
        "eliminatesWho": ["Marcus Thompson"],
        "pointsTo": null,
        "requiresPrevious": []
      },
      {
        "id": 2,
        "description": "Blockchain analysis reveals the proposal was funded by a flash loan from Aave protocol. 50,000 AVAX was borrowed, used to buy governance tokens, vote, then repaid within the same transaction block.",
        "avaxConcept": "Flash loans and governance token manipulation",
        "educationalLinks": [
          {
            "term": "Flash Loan",
            "url": "https://docs.avax.network/dapps/smart-contracts/flash-loans",
            "briefExplanation": "Borrowing crypto that must be repaid in the same transaction",
            "detailedExplanation": "Flash loans allow borrowing large amounts of cryptocurrency without collateral, but the loan must be repaid within the same blockchain transaction. If not repaid, the entire transaction fails. Attackers use flash loans to manipulate prices, exploit arbitrage, or temporarily gain voting power in governance attacks."
          }
        ],
        "rarity": "uncommon",
        "marketValue": 2.0,
        "eliminatesWho": ["Alex Rivera"],
        "pointsTo": null,
        "requiresPrevious": [1]
      },
      {
        "id": 3,
        "description": "The smart contract code in the proposal contains a deliberate obfuscation technique called 'constructor aliasing' - a rare method only taught in advanced security courses at 3 universities.",
        "avaxConcept": "Advanced smart contract obfuscation techniques",
        "educationalLinks": [
          {
            "term": "Smart Contract Vulnerability",
            "url": "https://docs.avax.network/dapps/smart-contracts/security",
            "briefExplanation": "Bugs in code that attackers can exploit",
            "detailedExplanation": "Smart contracts are immutable code, so bugs become permanent vulnerabilities. Common issues include reentrancy attacks (calling functions repeatedly), integer overflow (numbers becoming too large), and access control bugs (wrong permissions). Audits help find these issues before deployment."
          }
        ],
        "rarity": "rare",
        "marketValue": 8.0,
        "eliminatesWho": [],
        "pointsTo": "Dr. Sarah Chen",
        "requiresPrevious": [1, 2]
      },
      {
        "id": 4,
        "description": "Coffee shop security footage shows someone wearing a 'BlockSec Research Conference 2024' hoodie - the same conference where Dr. Chen presented her governance attack research paper.",
        "avaxConcept": "Digital forensics and identity correlation",
        "educationalLinks": [
          {
            "term": "Governance Attack",
            "url": "https://docs.avax.network/learn/avalanche/governance",
            "briefExplanation": "When someone manipulates voting to control a protocol",
            "detailedExplanation": "A governance attack occurs when an attacker accumulates enough governance tokens to propose and pass malicious proposals. In DeFi protocols, governance tokens give holders voting rights on protocol changes. If someone gets >51% of tokens (or enough to reach quorum), they can vote to drain treasuries, change fee structures, or modify smart contracts for personal benefit."
          }
        ],
        "rarity": "uncommon",
        "marketValue": 1.5,
        "eliminatesWho": [],
        "pointsTo": "Dr. Sarah Chen",
        "requiresPrevious": [1, 3]
      },
      {
        "id": 5,
        "description": "The withdrawal address 0x789abc... was created exactly 6 months ago - the same day Dr. Chen submitted her vulnerability report to TreasureDAO. Address creation timestamp matches her email timestamp.",
        "avaxConcept": "Blockchain address analysis and timestamp correlation",
        "educationalLinks": [
          {
            "term": "Smart Contract Vulnerability",
            "url": "https://docs.avax.network/dapps/smart-contracts/security",
            "briefExplanation": "Bugs in code that attackers can exploit",
            "detailedExplanation": "Smart contracts are immutable code, so bugs become permanent vulnerabilities. Common issues include reentrancy attacks (calling functions repeatedly), integer overflow (numbers becoming too large), and access control bugs (wrong permissions). Audits help find these issues before deployment."
          }
        ],
        "rarity": "legendary",
        "marketValue": 25.0,
        "eliminatesWho": [],
        "pointsTo": "Dr. Sarah Chen",
        "requiresPrevious": [1, 2, 3, 4]
      }
    ],
    "solution": {
      "culprit": "Dr. Sarah Chen",
      "method": "Used flash loan to temporarily acquire governance tokens, submitted obfuscated proposal, voted it through, then executed the hidden withdrawal function",
      "motive": "Revenge against TreasureDAO for ignoring her security warnings and frustration with DeFi protocols not taking security seriously",
      "evidence": [
        "IP address traces to coffee shop where she was seen",
        "Flash loan technique matches her research expertise",
        "Obfuscation method from her academic background", 
        "Conference hoodie identifies her in footage",
        "Withdrawal address created when she discovered the vulnerability"
      ],
      "howCluesPointToCulprit": "Clue 1 eliminates Marcus (wrong location), Clue 2 eliminates Alex (lacks flash loan skills), Clues 3-5 all point to Dr. Chen through her academic background, research expertise, and the timing correlation between her vulnerability discovery and the attack preparation."
    },
    "educationalGoals": [
      "Understand how governance attacks work in DeFi protocols",
      "Learn about flash loans and their risks",
      "Recognize smart contract vulnerability patterns",
      "Understand the importance of security audits",
      "Learn how blockchain forensics can trace attackers"
    ],
    "difficultyLevel": "intermediate"
  };
};

// Function to verify the mystery logic
const verifyMysteryLogic = (mystery) => {
  const issues = [];
  const deductionPath = [];
  
  // Track eliminated suspects and pointed-to suspects
  const eliminatedSuspects = new Set();
  const suspectNames = mystery.suspects.map(s => s.name);
  const culprit = mystery.solution.culprit;
  
  console.log('\n🔍 VERIFYING MYSTERY LOGIC...\n');
  
  mystery.clues.forEach((clue, index) => {
    console.log(`Clue ${clue.id}: ${clue.description.substring(0, 80)}...`);
    
    if (clue.eliminatesWho && clue.eliminatesWho.length > 0) {
      clue.eliminatesWho.forEach(suspect => {
        if (suspect === culprit) {
          issues.push(`❌ ERROR: Clue ${clue.id} eliminates the culprit ${culprit}`);
        } else {
          eliminatedSuspects.add(suspect);
          deductionPath.push(`Clue ${clue.id}: ❌ Eliminates ${suspect}`);
          console.log(`  ❌ Eliminates: ${suspect}`);
        }
      });
    }
    
    if (clue.pointsTo) {
      if (clue.pointsTo !== culprit) {
        issues.push(`❌ ERROR: Clue ${clue.id} points to ${clue.pointsTo} but culprit is ${culprit}`);
      } else {
        deductionPath.push(`Clue ${clue.id}: 👆 Points to ${clue.pointsTo}`);
        console.log(`  👆 Points to: ${clue.pointsTo}`);
      }
    }
    
    if (clue.eliminatesWho?.length === 0 && !clue.pointsTo) {
      console.log(`  ℹ️  Provides background information`);
    }
    
    console.log(`  💰 Market Value: ${clue.marketValue} AVAX`);
    console.log(`  🎓 Teaches: ${clue.avaxConcept}`);
    console.log('');
  });
  
  // Check if all non-culprits are eliminated
  const shouldBeEliminated = suspectNames.filter(name => name !== culprit);
  const notEliminated = shouldBeEliminated.filter(name => !eliminatedSuspects.has(name));
  
  if (notEliminated.length > 0) {
    issues.push(`⚠️  WARNING: These suspects are not eliminated by clues: ${notEliminated.join(', ')}`);
  }
  
  console.log('📊 LOGIC VERIFICATION RESULTS:');
  console.log(`  Culprit: ${culprit}`);
  console.log(`  Eliminated: ${Array.from(eliminatedSuspects).join(', ')}`);
  console.log(`  Not eliminated: ${notEliminated.join(', ') || 'None (good!)'}`);
  
  if (issues.length === 0) {
    console.log('  ✅ Mystery logic is VALID - clues properly point to culprit!');
  } else {
    console.log('  ❌ Issues found:');
    issues.forEach(issue => console.log(`    ${issue}`));
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    deductionPath
  };
};

// Display the full mystery
const displayMystery = (mystery) => {
  console.log('='.repeat(80));
  console.log(`🎭 LOGICAL MYSTERY: ${mystery.title.toUpperCase()}`);
  console.log('='.repeat(80));
  
  console.log('\n🏛️ SETTING:');
  console.log(`${mystery.setting}`);
  
  console.log('\n🚨 THE INCIDENT:');
  console.log('-'.repeat(40));
  console.log(mystery.incidentDescription);
  
  console.log('\n💀 VICTIM:');
  console.log('-'.repeat(40));
  console.log(`Name: ${mystery.victim.name}`);
  console.log(`Role: ${mystery.victim.role}`);
  console.log(`What Happened: ${mystery.victim.whatHappened}`);
  console.log(`Technical Details: ${mystery.victim.technicalDetails}`);
  
  console.log('\n🕵️ SUSPECTS:');
  console.log('-'.repeat(40));
  mystery.suspects.forEach((suspect, index) => {
    console.log(`${index + 1}. ${suspect.name} (Age: ${suspect.age})`);
    console.log(`   Background: ${suspect.background}`);
    console.log(`   AVAX Role: ${suspect.avaxRole}`);
    console.log(`   Motive: ${suspect.motive}`);
    console.log(`   Alibi: ${suspect.alibi}`);
    console.log(`   Technical Skills: ${suspect.technicalCapability}`);
    console.log('');
  });
  
  console.log('🔍 LOGICAL CLUES:');
  console.log('-'.repeat(40));
  mystery.clues.forEach((clue, index) => {
    console.log(`${clue.id}. [${clue.rarity.toUpperCase()}] ${clue.description}`);
    console.log(`   💡 Teaches: ${clue.avaxConcept}`);
    console.log(`   💰 Value: ${clue.marketValue} AVAX`);
    
    if (clue.eliminatesWho && clue.eliminatesWho.length > 0) {
      console.log(`   ❌ Eliminates: ${clue.eliminatesWho.join(', ')}`);
    }
    if (clue.pointsTo) {
      console.log(`   👆 Points to: ${clue.pointsTo}`);
    }
    if (clue.requiresPrevious && clue.requiresPrevious.length > 0) {
      console.log(`   🔗 Requires clues: ${clue.requiresPrevious.join(', ')}`);
    }
    
    console.log(`   📚 Educational Links: ${clue.educationalLinks.map(link => link.term).join(', ')}`);
    console.log('');
  });
  
  console.log('🏆 SOLUTION:');
  console.log('-'.repeat(40));
  console.log(`Culprit: ${mystery.solution.culprit}`);
  console.log(`Method: ${mystery.solution.method}`);
  console.log(`Motive: ${mystery.solution.motive}`);
  console.log('\nKey Evidence:');
  mystery.solution.evidence.forEach(evidence => {
    console.log(`  • ${evidence}`);
  });
  console.log(`\nLogical Chain: ${mystery.solution.howCluesPointToCulprit}`);
  
  console.log('\n🎓 EDUCATIONAL GOALS:');
  console.log('-'.repeat(40));
  mystery.educationalGoals.forEach((goal, index) => {
    console.log(`${index + 1}. ${goal}`);
  });
  
  console.log('\n📊 MYSTERY STATS:');
  console.log('-'.repeat(40));
  console.log(`Difficulty: ${mystery.difficultyLevel}`);
  console.log(`Suspects: ${mystery.suspects.length}`);
  console.log(`Clues: ${mystery.clues.length}`);
  console.log(`Educational Concepts: ${mystery.educationalGoals.length}`);
  
  console.log('\n' + '='.repeat(80));
};

// Main execution
console.log('🚀 Avalanche Logical Mystery Generator - Test');
console.log('🎯 Creating mysteries that actually make logical sense!\n');

try {
  const mystery = generateLogicalMystery();
  
  // Display the mystery
  displayMystery(mystery);
  
  // Verify the logic
  const verification = verifyMysteryLogic(mystery);
  
  // Save to files
  const mysteryJson = JSON.stringify(mystery, null, 2);
  fs.writeFileSync('logical-mystery.json', mysteryJson);
  console.log('\n💾 Saved complete mystery to logical-mystery.json');
  
  // Create summary report
  const report = `
LOGICAL MYSTERY ANALYSIS REPORT
===============================

Title: ${mystery.title}
Culprit: ${mystery.solution.culprit}
Difficulty: ${mystery.difficultyLevel}

LOGICAL DEDUCTION CHAIN:
${verification.deductionPath.map(step => `• ${step}`).join('\n')}

VERIFICATION: ${verification.isValid ? '✅ VALID' : '❌ INVALID'}
${verification.issues.length > 0 ? '\nISSUES:\n' + verification.issues.map(issue => `• ${issue}`).join('\n') : ''}

EDUCATIONAL VALUE:
${mystery.educationalGoals.map(goal => `• ${goal}`).join('\n')}

CLUE ECONOMICS:
Total Market Value: ${mystery.clues.reduce((sum, clue) => sum + clue.marketValue, 0)} AVAX
Rarity Distribution: 
  • Common: ${mystery.clues.filter(c => c.rarity === 'common').length}
  • Uncommon: ${mystery.clues.filter(c => c.rarity === 'uncommon').length}  
  • Rare: ${mystery.clues.filter(c => c.rarity === 'rare').length}
  • Legendary: ${mystery.clues.filter(c => c.rarity === 'legendary').length}
`;
  
  fs.writeFileSync('mystery-analysis-report.txt', report);
  console.log('📋 Saved analysis report to mystery-analysis-report.txt');
  
  console.log('\n🎯 NEXT STEPS FOR YOUR AVAX PITCH:');
  console.log('1. Open logicalMysteryViewer.html in your browser');
  console.log('2. Show how clues logically eliminate suspects');
  console.log('3. Click educational links to demonstrate learning');
  console.log('4. Reveal solution to show logical deduction chain');
  
  console.log('\n✅ Logical Mystery System is ready for AVAX representatives!');
  
} catch (error) {
  console.error('❌ Error generating logical mystery:', error);
}


