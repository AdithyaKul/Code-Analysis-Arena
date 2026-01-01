document.addEventListener('DOMContentLoaded', function() {
    // Auto-login button functionality
    const autoLoginBtn = document.getElementById('autoLoginBtn');
    const autoLoginOverlay = document.getElementById('autoLoginOverlay');
    const funMessage = document.getElementById('funMessage');
    
    // Logout elements
    const logoutOverlay = document.getElementById('logoutOverlay');
    const logoutMessage = document.getElementById('logoutMessage');
    const logoutProgress = document.getElementById('logoutProgress');
    
    // ONLY the specific messages requested
    const loginMessages = [
        "CONNECTING TO OUR SERVERS ON MARS....",
        "CONTACTING ELON MUSK!!",
        "LOGGING IN"
    ];
    
    // Fun messages for logout (matching the style)
    const logoutMessages = [
        "CONTACTING ISRO MISSION CONTROL",
        "RETURNING TO EARTH",
        "WELCOME BACK TO EARTH"
    ];
    
    // Handle auto-login
    if (autoLoginBtn) {
        autoLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show the overlay
            autoLoginOverlay.style.display = 'flex';
            
            // Show only the specific messages requested
            let messageIndex = 0;
            const messageInterval = setInterval(() => {
                if (messageIndex < loginMessages.length) {
                    funMessage.textContent = loginMessages[messageIndex];
                    messageIndex++;
                } else {
                    clearInterval(messageInterval);
                }
            }, 1500); // Show each message for 1.5 seconds
            
            // Redirect after all messages are shown
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 4500); // 3 messages * 1.5 seconds each
        });
    }
    
    // Handle logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to logout page
            window.location.href = 'logout.html';
        });
    }
    
    // Handle regular login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show the overlay
            autoLoginOverlay.style.display = 'flex';
            
            // Show only the specific messages requested
            let messageIndex = 0;
            const messageInterval = setInterval(() => {
                if (messageIndex < loginMessages.length) {
                    funMessage.textContent = loginMessages[messageIndex];
                    messageIndex++;
                } else {
                    clearInterval(messageInterval);
                }
            }, 1500); // Show each message for 1.5 seconds
            
            // Redirect after all messages are shown
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 4500); // 3 messages * 1.5 seconds each
        });
    }
    
    // API Status Icon - Show analytics modal
    const apiStatusIcon = document.getElementById('apiStatusIcon');
    if (apiStatusIcon) {
        apiStatusIcon.addEventListener('click', function() {
            showApiAnalytics();
        });
    }
    
    // Custom cursor functionality
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move cursor immediately
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Animate follower with delay
        const animateFollower = () => {
            posX += (mouseX - posX) / 5;
            posY += (mouseY - posY) / 5;
            
            follower.style.left = posX + 'px';
            follower.style.top = posY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        
        animateFollower();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('button, a, input, .btn-primary, .btn-social, .btn-auto-login, .icon-btn, .submit-btn, .copy-btn, .nav-item, .cta-primary, .cta-secondary, .feature-card, .persona-card, .stat-card, .tech-item');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });
    }
});

// API call counter (shared between pages using localStorage)
let apiCallCount = localStorage.getItem('apiCallCount') ? parseInt(localStorage.getItem('apiCallCount')) : 1352;

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