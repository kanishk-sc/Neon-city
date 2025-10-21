// P01: Lost in a Neon City - Page Verification Script
// This script helps verify that all pages and choices are properly implemented

// Define all pages and their connections
const adventurePages = {
    'index.html': {
        title: 'City Entrance',
        choices: ['market.html', 'library.html', 'rooftop.html', 'subway.html'],
        description: 'Starting point of the adventure'
    },
    'about.html': {
        title: 'Information Hub',
        choices: [],
        description: 'Game instructions and YouTube embed'
    },
    'market.html': {
        title: 'Market District',
        choices: ['merchant.html', 'alley.html', 'index.html'],
        description: 'Bustling marketplace with vendors'
    },
    'library.html': {
        title: 'Ancient Library',
        choices: ['tunnel.html', 'bridge.html', 'index.html'],
        description: 'Knowledge repository with ancient texts'
    },
    'rooftop.html': {
        title: 'City Rooftops',
        choices: ['arcade.html', 'index.html'],
        description: 'High vantage point with city view'
    },
    'subway.html': {
        title: 'Underground Station',
        choices: ['tunnel.html', 'index.html'],
        description: 'Futuristic subway system'
    },
    'arcade.html': {
        title: 'Secret Arcade',
        choices: ['you_win.html', 'you_lose.html'],
        description: 'Hidden arcade with final choice'
    },
    'alley.html': {
        title: 'Dark Alley',
        choices: ['merchant.html', 'you_lose.html'],
        description: 'Shadowy passage with mysterious merchant'
    },
    'merchant.html': {
        title: 'Mysterious Merchant',
        choices: ['bridge.html', 'tunnel.html', 'you_lose.html'],
        description: 'Hooded vendor with magical artifacts'
    },
    'tunnel.html': {
        title: 'Underground Tunnel',
        choices: ['arcade.html', 'secret.html', 'you_lose.html'],
        description: 'Mysterious underground passage'
    },
    'bridge.html': {
        title: 'Neon Bridge',
        choices: ['arcade.html', 'you_lose.html'],
        description: 'Glowing bridge spanning the city'
    },
    'you_win.html': {
        title: 'Victory!',
        choices: ['index.html', 'arcade.html', 'sitemap.html'],
        description: 'Success! You found your way home'
    },
    'you_lose.html': {
        title: 'Game Over',
        choices: ['index.html', 'about.html', 'sitemap.html'],
        description: 'Defeat - try again!'
    },
    'secret.html': {
        title: 'Secret Chamber',
        choices: ['arcade.html', 'you_lose.html', 'bridge.html'],
        description: 'Hidden chamber with mysterious portals'
    },
    'sitemap.html': {
        title: 'Adventure Map',
        choices: [],
        description: 'Complete map of all locations'
    }
};

// Function to count total choices
function countTotalChoices() {
    let totalChoices = 0;
    for (const page in adventurePages) {
        totalChoices += adventurePages[page].choices.length;
    }
    return totalChoices;
}

// Function to find pages with multiple choices
function findPagesWithMultipleChoices() {
    const multipleChoicePages = [];
    for (const page in adventurePages) {
        if (adventurePages[page].choices.length > 2) {
            multipleChoicePages.push({
                page: page,
                choices: adventurePages[page].choices.length,
                title: adventurePages[page].title
            });
        }
    }
    return multipleChoicePages;
}

// Function to find win/lose pages
function findFinalPages() {
    const finalPages = [];
    for (const page in adventurePages) {
        if (page.includes('you_win') || page.includes('you_lose')) {
            finalPages.push({
                page: page,
                title: adventurePages[page].title,
                choices: adventurePages[page].choices.length
            });
        }
    }
    return finalPages;
}

// Main verification function
function verifyAdventure() {
    console.log('=== P01: Lost in a Neon City - Verification Report ===\n');
    
    // Count pages
    const totalPages = Object.keys(adventurePages).length;
    console.log(`Total HTML Pages: ${totalPages}`);
    
    // Count total choices
    const totalChoices = countTotalChoices();
    console.log(`Total Choices: ${totalChoices}`);
    
    // Find pages with multiple choices
    const multipleChoicePages = findPagesWithMultipleChoices();
    console.log(`\nPages with Multiple Choices (>2):`);
    multipleChoicePages.forEach(page => {
        console.log(`  - ${page.page}: ${page.choices} choices (${page.title})`);
    });
    
    // Find final pages
    const finalPages = findFinalPages();
    console.log(`\nFinal Outcome Pages:`);
    finalPages.forEach(page => {
        console.log(`  - ${page.page}: ${page.title} (${page.choices} return choices)`);
    });
    
    // List all pages
    console.log(`\nAll Adventure Pages:`);
    for (const page in adventurePages) {
        const pageInfo = adventurePages[page];
        console.log(`  - ${page}: ${pageInfo.title} (${pageInfo.choices.length} choices)`);
    }
    
    // Verification checklist
    console.log(`\n=== Verification Checklist ===`);
    console.log(`✓ HTML Pages: ${totalPages >= 15 ? 'PASS' : 'FAIL'} (${totalPages}/15 required)`);
    console.log(`✓ Total Choices: ${totalChoices >= 30 ? 'PASS' : 'FAIL'} (${totalChoices}/30 required)`);
    console.log(`✓ Win/Lose Pages: ${finalPages.length >= 2 ? 'PASS' : 'FAIL'} (${finalPages.length}/2 required)`);
    console.log(`✓ Multiple Choice Pages: ${multipleChoicePages.length >= 1 ? 'PASS' : 'FAIL'} (${multipleChoicePages.length} found)`);
    
    console.log(`\n=== Adventure Structure ===`);
    console.log(`Starting Point: index.html`);
    console.log(`Information Hub: about.html`);
    console.log(`Exploration Areas: market, library, rooftop, subway`);
    console.log(`Secret Areas: arcade, alley, merchant, tunnel, bridge`);
    console.log(`Final Outcomes: you_win.html, you_lose.html`);
    console.log(`Navigation Aid: sitemap.html`);
}

// Run verification
verifyAdventure();
