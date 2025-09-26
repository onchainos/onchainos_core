// Demo JavaScript - OnchainOS Interactive Demo
let demoState = {
  step: 0,
  contractGenerated: false,
  sessionCreated: false,
  deployed: false
};
// Pre-deployed contract data for demo (using real Starknet deployment)
const DEMO_CONTRACT_DATA = {
  classHash: "0x05a09f246f971dbb4a1368e769ec7be986de7ceadb478e21df75cd124b4e8d15",
  contractAddress: "0x032cbfe28e77d737c3fe5063e17e55eedbf1c4dff7157564aa234f1bce8d61c0",
  transactionHash: "0x0440f305041d03c29d0d322a19531301d0125cb50ab8de43332ee8bd59f6cf0d",
  starkscanContractUrl: "https://sepolia.starkscan.co/contract/0x032cbfe28e77d737c3fe5063e17e55eedbf1c4dff7157564aa234f1bce8d61c0",
  starkscanTxUrl: "https://sepolia.starkscan.co/tx/0x0440f305041d03c29d0d322a19531301d0125cb50ab8de43332ee8bd59f6cf0d",
  gasUsed: "0.0023",
  gasCost: "$3.45"
};

// Initialize demo when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeInput();
  resetDemoState();
});

function sendMessage() {
  const input = document.getElementById('user-input');
  const userMessage = document.getElementById('user-message');
  const userText = document.getElementById('user-text');
  const generateBtn = document.getElementById('generate-btn');
  
  if (input.value.trim() && demoState.step === 0) {
    // Show the user's typed message
    userText.textContent = input.value;
    userMessage.style.display = 'block';
    
    // Hide the input interface
    document.querySelector('.input-area').style.display = 'none';
    
    // Hide the generate button since we're using live input now
    if (generateBtn) generateBtn.style.display = 'none';
    
    // Start the AI response after a brief delay
    setTimeout(() => startDemo(), 500);

     input.value = '';
  }
}

// Allow Enter key to send message
function initializeInput() {
  const userInput = document.getElementById('user-input');
  if (userInput) {
    userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });


    // Remove any existing input event listeners that might be causing issues
    userInput.removeEventListener('input', startDemo);
  }
}



// Start the demo flow
function startDemo() {
  if (demoState.step !== 0) return;
  
  const generateBtn = document.getElementById('generate-btn');
  const typingIndicator = document.getElementById('typing');
  const generatedCode = document.getElementById('generated-code');
  const problemAlert = document.getElementById('problem-alert');

  // Update demo state immediately to prevent duplicate calls
  demoState.step = 0.5;
  
  // If using the generate button (not the input), show generating state
  if (generateBtn && generateBtn.style.display !== 'none') {
    generateBtn.textContent = 'Generating...';
    generateBtn.disabled = true;
  }
  
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
      
      if (generateBtn && generateBtn.style.display !== 'none') {
        generateBtn.textContent = 'Contract Generated ✓';
      }
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
  
  setTimeout(() => {
    if (sessionSection) {
      sessionSection.style.display = 'block';
      sessionSection.classList.add('fade-in');
    }
    
    // Enable deploy button
    if (deployBtn) {
      deployBtn.disabled = false;
      deployBtn.textContent = 'Deploy Securely';
    }
    
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

  // Update state to prevent re-entry
  demoState.step = 1.5;
  
  // Disable button and show processing
  if (deployBtn) {
    deployBtn.disabled = true;
    deployBtn.textContent = 'Deploying...';
  }
  
  // Show processing section
  if (processing) {
    processing.style.display = 'block';
    processing.classList.add('fade-in');
  }
  
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
        if (resultsInterface) resultsInterface.innerHTML = '';
        if (successResults) {
          successResults.style.display = 'block';
          successResults.classList.add('fade-in');
        }
        
        // Update links with actual data
        updateResultsWithContractData();
        
        // Update deploy button
        if (deployBtn) {
          deployBtn.textContent = 'Deployed Successfully ✓';
          deployBtn.style.background = 'var(--success-green)';
        }
        
        demoState.step = 2;
        demoState.deployed = true;
        
      }, 1000);
    }
  }, 800);
}

function updateResultsWithContractData() {
  const contractLink = document.getElementById('contract-link');
  const txLink = document.getElementById('tx-link');
  const classHashElement = document.getElementById('class-hash');
  
  // Update class hash
  if (classHashElement) {
    classHashElement.textContent = DEMO_CONTRACT_DATA.classHash;
  }
  
  // Update contract address link
  if (contractLink) {
    contractLink.textContent = DEMO_CONTRACT_DATA.contractAddress;
    contractLink.href = DEMO_CONTRACT_DATA.starkscanContractUrl;
  }
  
  // Update transaction hash link  
  if (txLink) {
    txLink.textContent = DEMO_CONTRACT_DATA.transactionHash;
    txLink.href = DEMO_CONTRACT_DATA.starkscanTxUrl;
  }
  
  // Allow real navigation to Starkscan
  contractLink.addEventListener('click', function() {
    showToast('Opening Starkscan contract page...');
  });
  
  txLink.addEventListener('click', function() {
    showToast('Opening Starkscan transaction page...');
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
  const userMessage = document.getElementById('user-message');
  const inputArea = document.querySelector('.input-area');
  
  if (generateBtn) {
    generateBtn.textContent = 'Generate Contract';
    generateBtn.disabled = false;
    generateBtn.style.display = 'block';
  }
  if (typingIndicator) typingIndicator.style.display = 'none';
  if (generatedCode) generatedCode.style.display = 'none';
  if (problemAlert) problemAlert.style.display = 'none';
  if (userMessage) userMessage.style.display = 'none';
  if (inputArea) inputArea.style.display = 'block';
  
  // Clear input
  const userInput = document.getElementById('user-input');
  if (userInput) userInput.value = '';
  
  // Reset OnchainOS Panel
  const onchainOSPanel = document.getElementById('onchainos-panel');
  const deployBtn = document.getElementById('deploy-btn');
  const sessionSection = document.getElementById('session-section');
  const processing = document.getElementById('processing');
  
  if (onchainOSPanel) {
    onchainOSPanel.style.borderColor = 'rgba(0, 217, 255, 0.1)';
    onchainOSPanel.style.boxShadow = 'none';
  }
  if (deployBtn) {
    deployBtn.disabled = true;
    deployBtn.textContent = 'Deploy Securely';
    deployBtn.style.background = '';
  }
  if (sessionSection) sessionSection.style.display = 'none';
  if (processing) processing.style.display = 'none';
  
  // Reset Results Panel
  const resultsPanel = document.getElementById('results-panel');
  const resultsInterface = document.getElementById('results-interface');
  const successResults = document.getElementById('success-results');
  
  if (resultsPanel) {
    resultsPanel.style.borderColor = 'rgba(0, 217, 255, 0.1)';
    resultsPanel.style.boxShadow = 'none';
  }
  if (successResults) successResults.style.display = 'none';
  
  // Restore placeholder
  if (resultsInterface) {
    resultsInterface.innerHTML = `
      <div class="placeholder-state">
        <div class="placeholder-icon">⏳</div>
        <p>Deployment results will appear here...</p>
      </div>
    `;
  }
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
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
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

document.addEventListener('keydown', function(e) {
  // Press 'R' to restart demo
  if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
    const activeElement = document.activeElement;
    // Don't restart if user is typing in input field
    if (activeElement && activeElement.tagName !== 'INPUT') {
      restartDemo();
    }
  }
  
  // Press 'Space' to advance demo (only if not typing in input)
  if (e.key === ' ' && !e.ctrlKey && !e.metaKey) {
    const activeElement = document.activeElement;
    if (!activeElement || activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      
      if (demoState.step === 0 && !demoState.contractGenerated) {
        startDemo();
      } else if (demoState.step === 1 && demoState.sessionCreated && !demoState.deployed) {
        deployContract();
      }
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