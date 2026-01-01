// Custom cursor functionality
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;
        
        // Track mouse movement
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move cursor immediately
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Animate follower with delay
        const animateFollower = function() {
            posX += (mouseX - posX) / 5;
            posY += (mouseY - posY) / 5;
            
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        
        animateFollower();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('button, a, input, textarea, .btn-primary, .btn-social, .btn-auto-login, .icon-btn, .submit-btn, .copy-btn, .nav-item, .cta-primary, .cta-secondary, .persona-card, .content-segment');
        
        hoverElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });
    }
});

// Navigation System
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(function(item) {
        // Check if it's a link or a nav item
        const link = item.querySelector('a');
        if (link) {
            // For actual links, we don't need to do anything special
            return;
        }
        
        item.addEventListener('click', function() {
            const targetSection = item.dataset.section;
            
            // Update active nav item
            navItems.forEach(function(nav) { nav.classList.remove('active'); });
            item.classList.add('active');
            
            // Handle navigation to other pages
            if (targetSection === 'history') {
                window.location.href = 'history.html';
            }
        });
    });
}

// Character counter for code input
function updateCharCount() {
    const codeInput = document.getElementById('code-input');
    const charCount = document.getElementById('char-count');
    if (codeInput && charCount) {
        charCount.textContent = codeInput.value.length + ' characters';
    }
}

// Display efficiency score with stars
function displayEfficiencyScore(persona, score) {
    const starsContainer = document.getElementById(persona + '-stars');
    const scoreText = document.getElementById(persona + '-score');
    
    // Update score text
    if (scoreText) {
        scoreText.textContent = score + '/10';
    }
    
    // Generate stars
    if (starsContainer) {
        let starsHTML = '';
        for (let i = 1; i <= 10; i++) {
            let starClass = 'star';
            if (i <= score) {
                starClass += ' filled';
                // Add color class based on score
                if (score >= 8) {
                    starClass += ' high';
                } else if (score >= 5) {
                    starClass += ' medium';
                } else {
                    starClass += ' low';
                }
            }
            starsHTML += '<span class="' + starClass + '"><i class="fas fa-star"></i></span>';
        }
        
        starsContainer.innerHTML = starsHTML;
    }
}

// Update content in persona cards with segmented layout
function updatePersonaContent(persona, content) {
    const contentContainer = document.getElementById(persona + '-content');
    if (!contentContainer) return;
    
    // Parse the content to extract different sections
    const sections = parsePersonaContent(content);
    
    // Create segmented content
    let segmentedHTML = '';
    
    // Initial Analysis section
    if (sections.initialAnalysis) {
        segmentedHTML += '<div class="content-segment">' +
            '<h3><i class="fas fa-search"></i> Initial Analysis</h3>' +
            '<pre class="verdict-content">' + escapeHtml(sections.initialAnalysis) + '</pre>' +
            '</div>';
    }
    
    // Revised Code section
    if (sections.revisedCode) {
        segmentedHTML += '<div class="content-segment">' +
            '<h3><i class="fas fa-code"></i> Revised Code</h3>' +
            '<pre class="code-content">' + escapeHtml(sections.revisedCode) + '</pre>' +
            '</div>';
    }
    
    // Improvements section
    if (sections.improvements) {
        segmentedHTML += '<div class="content-segment">' +
            '<h3><i class="fas fa-lightbulb"></i> Improvements</h3>' +
            '<pre class="improvements-content">' + escapeHtml(sections.improvements) + '</pre>' +
            '</div>';
    }
    
    contentContainer.innerHTML = segmentedHTML;
}

// Parse persona content into sections
function parsePersonaContent(content) {
    const sections = {
        initialAnalysis: '',
        revisedCode: '',
        improvements: ''
    };
    
    if (!content) return sections;
    
    // Split content into lines for more reliable parsing
    const lines = content.split('\n');
    let currentSection = null;
    let sectionContent = [];
    
    // Process each line
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Check for section headers
        if (line.startsWith('## Initial Analysis')) {
            // Save previous section if exists
            if (currentSection && sectionContent.length > 0) {
                sections[currentSection] = sectionContent.join('\n').trim();
            }
            currentSection = 'initialAnalysis';
            sectionContent = [];
        } else if (line.startsWith('## Revised Code')) {
            // Save previous section if exists
            if (currentSection && sectionContent.length > 0) {
                sections[currentSection] = sectionContent.join('\n').trim();
            }
            currentSection = 'revisedCode';
            sectionContent = [];
        } else if (line.startsWith('## Improvements')) {
            // Save previous section if exists
            if (currentSection && sectionContent.length > 0) {
                sections[currentSection] = sectionContent.join('\n').trim();
            }
            currentSection = 'improvements';
            sectionContent = [];
        } else if (currentSection) {
            // Add line to current section
            sectionContent.push(lines[i]);
        }
    }
    
    // Save the last section
    if (currentSection && sectionContent.length > 0) {
        sections[currentSection] = sectionContent.join('\n').trim();
    }
    
    // Fallback: if no sections found, treat entire content as initial analysis
    if (!sections.initialAnalysis && !sections.revisedCode && !sections.improvements) {
        sections.initialAnalysis = content;
    }
    
    return sections;
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update status indicator
function updateStatus(elementId, status, message) {
    const statusDot = document.getElementById(elementId);
    if (!statusDot) return;
    
    const statusText = document.getElementById(elementId + '-text') || statusDot.nextElementSibling || statusDot.closest('.status-indicator').querySelector('.status-text');
    
    if (statusDot) {
        statusDot.className = 'status-dot';
        statusDot.classList.add(status);
    }
    
    if (statusText) {
        statusText.textContent = message;
    }
}

// Show notification
function showNotification(message, type, duration) {
    type = type || 'info';
    duration = duration || 3000;
    
    // Remove any existing notifications
    const existingNotification = document.getElementById('notification-container');
    if (existingNotification) {
        existingNotification.innerHTML = '';
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = '<i class="fas fa-' + (type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle') + '"></i>' +
        '<span>' + message + '</span>';
    
    document.body.appendChild(notification);
    
    // Remove notification after duration
    setTimeout(function() {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, duration);
}

// Save analysis to history
function saveToHistory(code, pragmatist, optimizer) {
    fetch('/api/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code, pragmatist: pragmatist, optimizer: optimizer })
    }).then(function(response) {
        if (!response.ok) {
            throw new Error('Failed to save to history');
        }
        return response.json();
    }).then(function(data) {
        console.log('Saved to history:', data);
    }).catch(function(error) {
        console.error('Error saving to history:', error);
    });
}

// API call counter (shared between pages using localStorage)
let apiCallCount = localStorage.getItem('apiCallCount') ? parseInt(localStorage.getItem('apiCallCount')) : 1352;

// Submit code for analysis
function submitCode() {
    const codeInput = document.getElementById('code-input');
    const code = codeInput.value.trim();
    
    if (!code) {
        showNotification('Please enter some code to analyze', 'error');
        return;
    }
    
    // Increment API call counter
    apiCallCount += 2;
    // Save to localStorage so it persists between pages
    localStorage.setItem('apiCallCount', apiCallCount.toString());
    
    // Show the output section
    const outputSection = document.getElementById('outputSection');
    if (outputSection) {
        outputSection.style.display = 'grid';
    }
    
    // Disable submit button
    const submitBtn = document.getElementById('analyzeBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="btn-text">Analyzing... <i class="fas fa-spinner fa-spin"></i></span>';
    
    // Update status indicators
    updateStatus('pragmatist-status', 'processing', 'Analyzing code...');
    updateStatus('optimizer-status', 'processing', 'Analyzing code...');
    
    // Clear previous content
    document.querySelector('#pragmatist-content').innerHTML = '';
    document.querySelector('#optimizer-content').innerHTML = '';
    
    // Reset efficiency scores
    displayEfficiencyScore('pragmatist', 0);
    displayEfficiencyScore('optimizer', 0);
    
    fetch('/debate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    }).then(function(response) {
        if (!response.ok) {
            throw new Error('Failed to analyze code');
        }
        return response.json();
    }).then(function(data) {
        // Update content
        updatePersonaContent('pragmatist', data.pragmatist);
        updatePersonaContent('optimizer', data.optimizer);
        
        // Update status
        updateStatus('pragmatist-status', 'complete', 'Analysis complete');
        updateStatus('optimizer-status', 'complete', 'Analysis complete');
        
        // Display efficiency scores if provided
        if (data.scores) {
            displayEfficiencyScore('pragmatist', data.scores.pragmatist || 7);
            displayEfficiencyScore('optimizer', data.scores.optimizer || 3);
        } else {
            // Default scores if not provided
            displayEfficiencyScore('pragmatist', 7);
            displayEfficiencyScore('optimizer', 3);
        }
        
        // Save to history
        saveToHistory(code, data.pragmatist, data.optimizer);
        
        showNotification('Code analysis complete!', 'success');
    }).catch(function(error) {
        console.error('Error:', error);
        updateStatus('pragmatist-status', 'error', 'Analysis failed');
        updateStatus('optimizer-status', 'error', 'Analysis failed');
        showNotification('Failed to analyze code. Please try again.', 'error');
        
        // Even if there's an error, we should still show the output section
        const outputSection = document.getElementById('outputSection');
        if (outputSection) {
            outputSection.style.display = 'grid';
        }
    }).finally(function() {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    });
}

// Main DOMContentLoaded event listener - this is the only one now
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Get all the elements we need
    const codeInput = document.getElementById('code-input');
    const submitBtn = document.getElementById('analyzeBtn');
    const sampleBtn = document.getElementById('sampleBtn');
    
    // Character counter
    if (codeInput) {
        codeInput.addEventListener('input', updateCharCount);
        updateCharCount(); // Initial count
        
        // Submit on Ctrl+Enter
        codeInput.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                submitCode();
            }
        });
    }
    
    // Submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', submitCode);
    }
    
    // Sample button - only one button as requested
    if (sampleBtn) {
        sampleBtn.addEventListener('click', function() {
            if (codeInput) {
                // Cycle through sample codes
                const sample = sampleCodes[currentSampleIndex];
                codeInput.value = sample.code;
                updateCharCount();
                showNotification(`Sample code loaded: ${sample.name}`, 'info');
                
                // Move to next sample for next click
                currentSampleIndex = (currentSampleIndex + 1) % sampleCodes.length;
            }
        });
    }
    
    // API Status Icon - Show analytics modal
    const apiStatusIcon = document.getElementById('apiStatusIcon');
    if (apiStatusIcon) {
        apiStatusIcon.addEventListener('click', function() {
            showApiAnalytics();
        });
    }
    
    // Check if there's a history item to load
    const historyItem = sessionStorage.getItem('historyItem');
    if (historyItem) {
        const item = JSON.parse(historyItem);
        sessionStorage.removeItem('historyItem'); // Remove it so it doesn't persist
        
        // Populate the code input
        if (codeInput) {
            codeInput.value = item.code;
            updateCharCount();
        }
        
        // Show the output section
        const outputSection = document.getElementById('outputSection');
        if (outputSection) {
            outputSection.style.display = 'grid';
        }
        
        // Populate responses after a short delay to ensure DOM is ready
        setTimeout(function() {
            updatePersonaContent('pragmatist', item.pragmatist);
            updatePersonaContent('optimizer', item.optimizer);
            updateStatus('pragmatist-status', 'complete', 'From history');
            updateStatus('optimizer-status', 'complete', 'From history');
            showNotification('Loaded from history', 'info', 2000);
            
            // Set default efficiency scores since history doesn't store them
            displayEfficiencyScore('pragmatist', 7);
            displayEfficiencyScore('optimizer', 8);
        }, 500);
    }
    
    // Ensure the output section is visible on page load
    const outputSection = document.getElementById('outputSection');
    if (outputSection) {
        // Set display to grid to show the personas
        outputSection.style.display = 'grid';
    }
});

// Function to show API analytics modal
function showApiAnalytics() {
    // Create the modal HTML
    const modal = document.createElement('div');
    modal.className = 'api-analytics-modal';
    modal.id = 'apiAnalyticsModal';
    modal.innerHTML = `
        <div class="api-analytics-content">
            <div class="api-analytics-header">
                <h2><i class="fas fa-chart-line"></i> API Usage Analytics</h2>
                <div class="close-analytics" id="closeAnalytics">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            
            <div class="analytics-grid">
                <div class="analytics-card">
                    <div class="analytics-value" style="color: #ef4444;">${apiCallCount}</div>
                    <div class="analytics-label">API Calls (Last 4 Days)</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-value">1,000</div>
                    <div class="analytics-label">Monthly Limit</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-value">${apiCallCount - 1000}</div>
                    <div class="analytics-label">Calls Over Limit</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-value">98%</div>
                    <div class="analytics-label">Usage Percentage</div>
                </div>
            </div>
            
            <div class="usage-chart">
                <div class="usage-chart-header">
                    <h3>Daily API Usage (Last 4 Days)</h3>
                    <div class="chart-legend">
                        <span style="color: var(--primary);">●</span> Normal Usage
                        <span style="color: #ef4444; margin-left: 15px;">●</span> Limit Exceeded
                    </div>
                </div>
                <div class="chart-container">
                    <div class="chart-bar" style="height: 60%;">
                        <div class="chart-bar-value">287</div>
                        <div class="chart-bar-label">30/11</div>
                    </div>
                    <div class="chart-bar" style="height: 75%;">
                        <div class="chart-bar-value">342</div>
                        <div class="chart-bar-label">1/12</div>
                    </div>
                    <div class="chart-bar" style="height: 90%;">
                        <div class="chart-bar-value">389</div>
                        <div class="chart-bar-label">2/12</div>
                    </div>
                    <div class="chart-bar limit-reached" style="height: 100%;">
                        <div class="chart-bar-value">352</div>
                        <div class="chart-bar-label">3/12</div>
                    </div>
                </div>
            </div>
            
            <div class="usage-details">
                <h3><i class="fas fa-wallet"></i> API Credit Usage</h3>
                <div class="credit-grid">
                    <div class="credit-card">
                        <div class="credit-provider">
                            <i class="fab fa-hugging-face"></i>
                            <span>Hugging Face</span>
                        </div>
                        <div class="credit-values">
                            <div class="credit-limit">$0.80</div>
                            <div class="credit-used">$0.82</div>
                        </div>
                    </div>
                    <div class="credit-card warning">
                        <div class="credit-usage-bar">
                            <div class="usage-fill" style="width: 102.5%;"></div>
                        </div>
                        <div class="credit-status">Over Limit</div>
                    </div>
                </div>
            </div>
            
            <div class="warning-banner">
                <h3><i class="fas fa-exclamation-triangle"></i> API Limit Reached</h3>
                <p>You have exceeded your monthly API quota of 1,000 calls. Your usage of ${apiCallCount} calls has surpassed the limit by ${apiCallCount - 1000} calls.</p>
                <p>Further API requests will be temporarily blocked until the next billing cycle.</p>
            </div>
            
            <div class="simulation-message">
                <h3><i class="fas fa-microchip"></i> Simulation Recommended</h3>
                <p>To continue using Code Debate Arena without interruption, the system will automatically switch to simulation mode.</p>
                <p>All code analysis features remain fully functional using pre-computed responses.</p>
            </div>
        </div>
    `;
    
    // Add modal to document
    document.body.appendChild(modal);
    
    // Show modal
    modal.style.display = 'block';
    
    // Add close functionality
    const closeBtn = document.getElementById('closeAnalytics');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Add logout functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to logout page
            window.location.href = 'logout.html';
        });
    }
});

// Sample codes array
const sampleCodes = [
  {
    name: "Duplicate Check",
    code: `// Problem: Check if an array of student IDs contains any duplicates.
bool hasDuplicateIDs(int studentIDs[], int n) {
    // Loop through every student ID
    for (int i = 0; i < n; i++) {
        
        // Compare with every other student ID
        for (int j = i + 1; j < n; j++) {
            
            // If we find a match, we found a duplicate
            if (studentIDs[i] == studentIDs[j]) {
                return true; 
            }
        }
    }
    // No duplicates found
    return false;
}`
  },
  {
    name: "Bubble Sort",
    code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`
  },
  {
    name: "Sum of Squares",
    code: `def calculate_sum(n):
    total = 0
    i = 1
    while i <= n:
        total += i * i
        i = i + 1
    return total`
  },
  {
    name: "Manual Sort",
    code: `# Initial Code Snippet

def sort_dataset(data):

    n = len(data)

    # Bubble Sort Implementation

    for i in range(n):

        for j in range(0, n - i - 1):

            if data[j] > data[j + 1]:

                # Swapping logic

                temp = data[j]

                data[j] = data[j + 1]

                data[j + 1] = temp

    return data`
  },
  {
    name: "String Formatting",
    code: `# Initial Code Snippet

def process_transactions(transactions):

    logs = []

    for tx in transactions:

        # Complex string formatting happening in every loop

        msg = "Transaction ID: " + str(tx.id) + " | Amount: $" + str(tx.amount) + " | Status: " + tx.status

        if tx.amount > 10000:

            logs.append(msg)

    return logs`
  }
];

let currentSampleIndex = 0;
