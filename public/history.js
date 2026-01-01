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
            if (targetSection === 'home') {
                window.location.href = 'landing.html';
            }
        });
    });
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    // Redirect to logout page
    window.location.href = 'logout.html';
}

// Format timestamp for display
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Truncate code for display
function truncateCode(code, maxLength = 100) {
    if (code.length <= maxLength) return code;
    return code.substring(0, maxLength) + '...';
}

// Load history from API
async function loadHistory() {
    try {
        const response = await fetch('/api/history');
        if (!response.ok) {
            throw new Error('Failed to load history');
        }
        
        const data = await response.json();
        displayHistory(data.analyses);
        updateHistoryStats(data.analyses);
    } catch (error) {
        console.error('Error loading history:', error);
        document.getElementById('historyStats').textContent = 'Failed to load history';
        document.getElementById('historyList').innerHTML = '<div class="empty-state"><p>Error loading history. Please try again later.</p></div>';
    }
}

// Display history items
function displayHistory(analyses) {
    const historyList = document.getElementById('historyList');
    
    if (!analyses || analyses.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history" style="font-size: 3rem; margin-bottom: 20px; color: var(--text-secondary);"></i>
                <h3>No History Yet</h3>
                <p>You haven't analyzed any code yet. Go to the analyze page to get started!</p>
                <a href="index.html" class="btn-primary" style="margin-top: 20px;">
                    <i class="fas fa-code"></i>
                    Analyze Code
                </a>
            </div>
        `;
        return;
    }
    
    let historyHTML = '';
    
    analyses.forEach(item => {
        historyHTML += `
            <div class="history-item" data-id="${item.id}">
                <div class="history-item-header">
                    <div class="history-item-info">
                        <span class="history-item-date">${formatTimestamp(item.timestamp)}</span>
                        <span class="history-item-preview">${truncateCode(item.code, 80)}</span>
                    </div>
                    <div class="history-item-actions">
                        <button class="icon-btn view-btn" title="View Analysis" data-id="${item.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="icon-btn delete-btn" title="Delete" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="history-item-code">
                    <pre><code>${escapeHtml(truncateCode(item.code, 200))}</code></pre>
                </div>
            </div>
        `;
    });
    
    historyList.innerHTML = historyHTML;
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            viewHistoryItem(id);
        });
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            deleteHistoryItem(id);
        });
    });
}

// Update history stats
function updateHistoryStats(analyses) {
    const statsElement = document.getElementById('historyStats');
    if (!analyses) {
        statsElement.textContent = 'Loading history...';
        return;
    }
    
    const total = analyses.length;
    const today = new Date();
    const todayCount = analyses.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate.toDateString() === today.toDateString();
    }).length;
    
    statsElement.innerHTML = `
        <span class="stat-item">
            <i class="fas fa-history"></i>
            Total: <strong>${total}</strong>
        </span>
        <span class="stat-item">
            <i class="fas fa-calendar-day"></i>
            Today: <strong>${todayCount}</strong>
        </span>
    `;
}

// View a history item
function viewHistoryItem(id) {
    // Store the item in sessionStorage and redirect to analyze page
    fetch(`/api/history`)
        .then(response => response.json())
        .then(data => {
            const item = data.analyses.find(i => i.id == id);
            if (item) {
                sessionStorage.setItem('historyItem', JSON.stringify(item));
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error loading history item:', error);
        });
}

// Delete a history item
async function deleteHistoryItem(id) {
    if (!confirm('Are you sure you want to delete this history item?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/history/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete history item');
        }
        
        // Reload history
        loadHistory();
    } catch (error) {
        console.error('Error deleting history item:', error);
        alert('Failed to delete history item. Please try again.');
    }
}

// Clear all history
async function clearAllHistory() {
    if (!confirm('Are you sure you want to clear all history? This cannot be undone.')) {
        return;
    }
    
    try {
        const response = await fetch('/api/history', {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to clear history');
        }
        
        // Reload history
        loadHistory();
    } catch (error) {
        console.error('Error clearing history:', error);
        alert('Failed to clear history. Please try again.');
    }
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Handle logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.removeEventListener('click', handleLogout);
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Load history
    loadHistory();
    
    // Clear history button
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearAllHistory);
    }
});