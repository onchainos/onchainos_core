// Demo JavaScript - OnchainOS Interactive Demo
let demoState = {
  step: 0,
  contractGenerated: false,
  sessionCreated: false,
  deployed: false
};

// Pre-deployed contract data for demo
const DEMO_CONTRACT_DATA = {
  address: "0xa1b2c3d4e5f6789012345678901234567890abcd",
  txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  explorerUrl: "https://sepolia.etherscan.io/tx/",
  contractUrl: "https://sepolia.etherscan.io/address/",
  gasUsed: "0.0023",
  gasPrice: "$3.45"
};

// Initialize demo when page loads
document.addEventListener('DOMContentLoaded', function() {
  resetDemoState();
});

// Start the demo flow
function startDemo() {
  if (demoState.step !== 0) return;
  
  const generateBtn = document.getElementById('generate-btn');
  const typingIndicator = document.getElementById('typing');
  const generatedCode = document.getElementById('generated-code');
  const problemAlert = document.getElementById('problem-alert');
  
  // Disable button and show generating state
  generateBtn.textContent = 'Generating...';
  generateBtn.disabled = true;
  
  // Show typing indicator
  typingIndicator.style.display = 'flex';
  
  // After 2 seconds, show the generated code
  setTimeout(() => {
    typingIndicator.style.display = 'none';
    generatedCode.style.display = 'block';
    generatedCode.classList.add('fade-in');
    
    // After another 1 second, show the problem alert
    setTimeout(() => {
      problemAlert.style.display = 'block';
      problemAlert.classList.add('fade-in');
      
      // Enable OnchainOS panel
      enableOnchainOSPanel();
      
      generateBtn.textContent = 'Contract Generated ✓';
      demoState.step = 1;
      demoState.contractGenerated = true;
      
    }, 1000);
  }, 2000);
}

// Enable the OnchainOS panel
function enableOnchainOSPanel() {
  const onchainOSPanel = document.getElementById('onchainos-panel');
  const deployBtn = document.getElementById('deploy-btn');
  const sessionSection = document.getElementById('session-section');
  
  // Highlight the panel
  onchainOSPanel.style.borderColor = 'rgba(0, 217, 255, 0.5)';
  onchainOSPanel.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.2)';
  
  // Show session key section
  setTimeout(() => {
    sessionSection.style.display = 'block';
    sessionSection.classList.add('fade-in');
    
    // Enable deploy button
    deployBtn.disabled = false;
    deployBtn.textContent = 'Deploy Securely';
    
    demoState.sessionCreated = true;
    
  }, 500);
}

// Deploy the contract
function deployContract() {
  if (demoState.step !== 1) return;
  
  const deployBtn = document.getElementById('deploy-btn');
  const processing = document.getElementById('processing');
  const processText = document.getElementById('process-text');
  const resultsInterface = document.getElementById('results-interface');
  const successResults = document.getElementById('success-results');
  
  // Disable button and show processing
  deployBtn.disabled = true;
  deployBtn.textContent = 'Deploying...';
  
  // Show processing section
  processing.style.display = 'block';
  processing.classList.add('fade-in');
  
  // Simulate deployment steps
  const steps = [
    "Initializing secure deployment...",
    "Validating session key permissions...",
    "Compiling Cairo contract...",
    "Running security simulation...",
    "Policy validation passed ✓",
    "Deploying to Starknet Sepolia...",
    "Transaction confirmed ✓"
  ];
  
  let currentStep = 0;
  
  const stepInterval = setInterval(() => {
    if (currentStep < steps.length) {
      processText.textContent = steps[currentStep];
      currentStep++;
    } else {
      clearInterval(stepInterval);
      
      // Hide processing and show results
      setTimeout(() => {
        processing.style.display = 'none';
        
        // Update results panel
        const resultsPanel = document.getElementById('results-panel');
        resultsPanel.style.borderColor = 'rgba(0, 230, 118, 0.5)';
        resultsPanel.style.boxShadow = '0 0 30px rgba(0, 230, 118, 0.2)';
        
        // Hide placeholder and show results
        resultsInterface.innerHTML = '';
        successResults.style.display = 'block';
        successResults.classList.add('fade-in');
        
        // Update links with actual data
        updateResultsWithContractData();
        
        // Update deploy button
        deployBtn.textContent = 'Deployed Successfully ✓';
        deployBtn.style.background = 'var(--success-green)';
        
        demoState.step = 2;
        demoState.deployed = true;
        
      }, 1000);
    }
  }, 800);
}

// Update results with contract data
function updateResultsWithContractData() {
  const contractLink = document.getElementById('contract-link');
  const txLink = document.getElementById('tx-link');
  
  // Update contract address link
  contractLink.textContent = DEMO_CONTRACT_DATA.address;
  contractLink.href = DEMO_CONTRACT_DATA.contractUrl + DEMO_CONTRACT_DATA.address;
  
  // Update transaction hash link
  txLink.textContent = DEMO_CONTRACT_DATA.txHash;
  txLink.href = DEMO_CONTRACT_DATA.explorerUrl + DEMO_CONTRACT_DATA.txHash;
  
  // Add click tracking for demo purposes
  contractLink.addEventListener('click', function(e) {
    // In a real demo, this would open the actual explorer
    e.preventDefault();
    showToast('Contract explorer would open here in live version');
  });
  
  txLink.addEventListener('click', function(e) {
    // In a real demo, this would open the actual explorer
    e.preventDefault();
    showToast('Transaction explorer would open here in live version');
  });
}

// Reset demo to initial state
function restartDemo() {
  // Reset all visual states
  resetDemoState();
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Show restart animation
  showToast('Demo restarted - try it again!');
}

// Reset demo state
function resetDemoState() {
  demoState = {
    step: 0,
    contractGenerated: false,
    sessionCreated: false,
    deployed: false
  };
  
  // Reset AI Panel
  const generateBtn = document.getElementById('generate-btn');
  const typingIndicator = document.getElementById('typing');
  const generatedCode = document.getElementById('generated-code');
  const problemAlert = document.getElementById('problem-alert');
  
  generateBtn.textContent = 'Generate Contract';
  generateBtn.disabled = false;
  typingIndicator.style.display = 'none';
  generatedCode.style.display = 'none';
  problemAlert.style.display = 'none';
  
  // Reset OnchainOS Panel
  const onchainOSPanel = document.getElementById('onchainos-panel');
  const deployBtn = document.getElementById('deploy-btn');
  const sessionSection = document.getElementById('session-section');
  const processing = document.getElementById('processing');
  
  onchainOSPanel.style.borderColor = 'rgba(0, 217, 255, 0.1)';
  onchainOSPanel.style.boxShadow = 'none';
  deployBtn.disabled = true;
  deployBtn.textContent = 'Deploy Securely';
  deployBtn.style.background = '';
  sessionSection.style.display = 'none';
  processing.style.display = 'none';
  
  // Reset Results Panel
  const resultsPanel = document.getElementById('results-panel');
  const resultsInterface = document.getElementById('results-interface');
  const successResults = document.getElementById('success-results');
  
  resultsPanel.style.borderColor = 'rgba(0, 217, 255, 0.1)';
  resultsPanel.style.boxShadow = 'none';
  successResults.style.display = 'none';
  
  // Restore placeholder
  resultsInterface.innerHTML = `
    <div class="placeholder-state">
      <div class="placeholder-icon">⏳</div>
      <p>Deployment results will appear here...</p>
    </div>
  `;
}

// Utility function to show toast notifications
function showToast(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--gradient-primary);
    color: var(--background-dark);
    padding: 12px 20px;
    border-radius: 25px;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Add smooth scrolling for better UX
function scrollToPanel(panelId) {
  const panel = document.getElementById(panelId);
  if (panel) {
    panel.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }
}

// Add keyboard shortcuts for demo control
document.addEventListener('keydown', function(e) {
  // Press 'R' to restart demo
  if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
    restartDemo();
  }
  
  // Press 'Space' to advance demo
  if (e.key === ' ' && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    
    if (demoState.step === 0 && !demoState.contractGenerated) {
      startDemo();
    } else if (demoState.step === 1 && demoState.sessionCreated && !demoState.deployed) {
      deployContract();
    }
  }
});

// Add demo tips for presenters
function showDemoTips() {
  const tips = `
Demo Controls:
• Click "Generate Contract" to start
• Press SPACE to advance steps
• Press R to restart demo
• All links are demo-safe (won't redirect)

Talking Points:
1. AI generates code perfectly
2. OnchainOS adds security layer
3. Session keys protect private keys
4. Policy enforcement prevents issues
5. Full audit trail for compliance
  `.trim();
  
  console.log(tips);
}

// Initialize demo tips (visible in browser console)
showDemoTips();