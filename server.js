const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { getDB } = require('./database-sqlite');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database initialization
const db = getDB();

// Create a default user for testing
function createDefaultUser() {
  try {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO users (firstname, lastname, email, password)
      VALUES (?, ?, ?, ?)
    `);
    
    stmt.run('Adithya', 'Kulkarni', 'kul.adithya@gmail.com', 'letmein');
    console.log('✓ Default user created/verified');
  } catch (error) {
    console.error('Error creating default user:', error);
  }
}

createDefaultUser();

// Authentication middleware
function authenticateUser(req, res, next) {
  // For demo purposes, we'll simulate authentication
  // In a real app, you would check session/token here
  req.userId = 1; // Simulate logged in user
  next();
}

// Simulation data for when API is not available
const simulationData = [
  {
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
}`,
    pragmatist: `## Initial Analysis
✅ **Approved** - Readability Score: 10/10

This is a textbook implementation of the Brute Force logic.

1.  **Clarity:** The logic is undeniable. You are comparing \`A[i]\` with \`A[j]\`. It reads exactly like the algorithm definition.
2.  **Variable Naming:** \`studentIDs\` is clear, and the standard \`i\` and \`j\` iterators are universally understood in algorithm design.
3.  **Simplicity:** No complex STL containers are introduced. Excellent for teaching the concept.

## Revised Code
\`\`\`cpp
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
}
\`\`\`

## Improvements
1.  **Educational Value:** Perfect for teaching fundamental algorithms and nested loop concepts
2.  **Maintainability:** The code structure is clean and readable
3.  **No Dependencies:** Works without additional libraries or data structures`,
    optimizer: `## Initial Analysis
⚠️ **Critical Performance Warning** - Efficiency Score: 3/10

Performance Alert: **Quadratic Time Complexity detected** O(n²).

1.  **The Issue:** You are using the Brute Force approach. For 10,000 students, this requires approx **50,000,000 comparisons**. This is unscalable for large datasets.
2.  **Refactoring Suggestion:** Use the **Space-Time Trade-off**. Utilize a **Hash Set** (\`unordered_set\`) to track seen IDs. This reduces lookups to **Linear Time** O(n).

## Revised Code
\`\`\`cpp
#include <unordered_set>

bool hasDuplicateIDs(int studentIDs[], int n) {
    // Create a Hash Set for O(1) lookups
    std::unordered_set<int> seen;
    
    for (int i = 0; i < n; i++) {
        int id = studentIDs[i];
        // Check if ID exists in set
        if (seen.find(id) != seen.end()) {
            return true; // Found duplicate
        }
        seen.insert(id);
    }
    return false;
}
\`\`\`

## Improvements
1.  **Time Complexity:** Reduced from O(n²) to O(n) linear time
2.  **Space-Time Tradeoff:** Uses additional memory for significant performance gains
3.  **Scalability:** Performs consistently regardless of input size
4.  **Real-world Performance:** Reduces execution time from minutes to milliseconds for large datasets
5.  **Industry Standard:** Hash-based duplicate detection is the preferred approach in production systems`
  },
  {
    code: `def calculate_sum(n):
    total = 0
    i = 1
    while i <= n:
        total += i * i
        i = i + 1
    return total`,
    pragmatist: `## Initial Analysis
✅ **Approved** - Readability Score: 6/10

The code is functional but uses a \`while\` loop where a simpler \`for\` loop or more Pythonic pattern would improve clarity and reduce boilerplate. The variable names are clear, but the loop structure is slightly verbose.

Areas for improvement:
1. **Loop Structure**: While loop requires manual iterator management
2. **Naming Conventions**: Function name could be more descriptive
3. **Pythonic Style**: Could leverage more idiomatic Python constructs

## Revised Code
\`\`\`python
def calculate_sum_of_squares(n):
    """Calculate the sum of squares from 1 to n."""
    # Use a for loop for simple iteration, which is generally clearer
    total_sum = 0
    for i in range(1, n + 1):
        total_sum += i ** 2
    return total_sum
\`\`\`

## Improvements
1. **Loop Structure**: Used a \`for\` loop with \`range()\` instead of a while loop, making iteration bounds explicit and clearer
2. **Function Naming**: Renamed \`total\` to \`total_sum\` and changed function name to \`calculate_sum_of_squares\` for better descriptive clarity
3. **Operator Usage**: Used the \`** 2\` operator instead of \`i * i\` for calculating the square, which is more standard
4. **Documentation**: Added docstring for better code documentation`,
    optimizer: `## Initial Analysis
⚠️ **Performance Warning** - Efficiency Score: 9/10

**Initial Execution Time:** 250 ms
**Final Execution Time:** 10 μs
**Time Reduced:** ~250 ms

The current code has a time complexity of O(n) because it iterates through every number from 1 to n. While acceptable for small inputs, a mathematically elegant and faster O(1) solution exists using a direct formula.

For large values of n, this iterative approach wastes computational resources that could be eliminated entirely.

## Revised Code
\`\`\`python
def fast_calculate_sum_of_squares(n):
    """Calculate sum of squares using mathematical formula."""
    # This uses Faulhaber's formula for the sum of the first n squares:
    # Sum = n * (n + 1) * (2n + 1) / 6
    if n < 0:
        return 0
    return n * (n + 1) * (2 * n + 1) // 6
\`\`\`

## Improvements
1. **Algorithmic Optimization**: Replaced iterative loop with direct mathematical formula (Faulhaber's formula), achieving O(1) constant time complexity
2. **Performance Boost**: Eliminated dependency on input size - execution time remains constant regardless of how large n becomes
3. **Resource Efficiency**: No iterations required, reducing CPU cycles significantly
4. **Scalability**: Perfectly handles extremely large values of n without performance degradation
5. **Mathematical Elegance**: Leverages proven mathematical formula for optimal computation`
  },
  {
    code: `function findMax(arr) {
    if (arr.length === 0) return undefined;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
    pragmatist: `## Initial Analysis
✅ **Approved** - Readability Score: 8/10

The code implements a standard linear search algorithm to find the maximum value in an array. The implementation is clean and follows common programming patterns.

Strengths:
1. **Correctness**: Handles edge cases like empty arrays appropriately
2. **Clarity**: Simple and straightforward logic that's easy to follow
3. **Efficiency**: Single pass through the array with O(n) time complexity
4. **Robustness**: Proper handling of the empty array case

Areas for minor improvement:
1. **Function Documentation**: Could benefit from a docstring explaining purpose and parameters
2. **Variable Naming**: Could be slightly more descriptive

## Revised Code
\`\`\`javascript
/**
 * Finds the maximum value in an array of numbers
 * @param {number[]} arr - Array of numbers to search
 * @returns {number|undefined} Maximum value or undefined if array is empty
 */
function findMaxValue(arr) {
    // Return undefined for empty arrays
    if (arr.length === 0) return undefined;
    
    // Initialize with first element
    let maxValue = arr[0];
    
    // Compare each element with current maximum
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxValue) {
            maxValue = arr[i];
        }
    }
    
    return maxValue;
}
\`\`\`

## Improvements
1. **Documentation**: Added comprehensive JSDoc comment explaining function purpose, parameters, and return value
2. **Naming**: Renamed function to \`findMaxValue\` and variable to \`maxValue\` for better clarity
3. **Comments**: Added explanatory comments for better code understanding
4. **Maintainability**: More self-documenting code that's easier for other developers to understand`,
    optimizer: `## Initial Analysis
✅ **Good Performance** - Efficiency Score: 7/10

The algorithm has O(n) time complexity which is optimal for this problem since we must examine each element at least once. The implementation is efficient and follows best practices.

Performance characteristics:
- **Time Complexity**: O(n) - Linear, which is optimal for this problem
- **Space Complexity**: O(1) - Constant space usage
- **Cache Efficiency**: Good memory access patterns

While the algorithm is already quite efficient, there are alternative approaches that might offer slight advantages in specific contexts.

## Revised Code
\`\`\`javascript
/**
 * Finds the maximum value using built-in Math.max for better performance
 * @param {number[]} arr - Array of numbers to search
 * @returns {number|undefined} Maximum value or undefined if array is empty
 */
function findMaxOptimized(arr) {
    // Return undefined for empty arrays
    if (arr.length === 0) return undefined;
    
    // Use built-in Math.max with spread operator for concise implementation
    return Math.max(...arr);
}
\`\`\`

## Improvements
1. **Conciseness**: Leveraged built-in \`Math.max\` function for a more concise implementation
2. **Readability**: Single line solution that clearly expresses intent
3. **Built-in Optimization**: \`Math.max\` is typically optimized at the JavaScript engine level
4. **Functional Approach**: More declarative style that focuses on what rather than how
5. **Reduced Boilerplate**: Eliminated manual loop management and comparison logic`
  },
  {
    code: `# Initial Code Snippet
def get_banned_matches(incoming_users, banned_database):
    matches = []
    # Nested loops to compare every user against every banned user
    for user in incoming_users:
        for banned in banned_database:
            if user == banned:
                matches.append(user)
                break 
    return matches`,
    pragmatist: `## Initial Analysis
✅ **Approved** - Readability Score: 5/10

The nested \`for\` loops make the logic harder to scan than necessary. While the logic is explicit, it reinvents the wheel. Python has built-in operators for membership testing that are much more readable (like "reading English").

## Revised Code
\`\`\`python
def get_banned_matches(incoming_users, banned_database):
    matches = []
    for user in incoming_users:
        # Use the 'in' operator for cleaner readability
        if user in banned_database:
            matches.append(user)
    return matches
\`\`\`

## Improvements
1. **Readability**: Replaced the inner manual loop with the Python \`in\` operator
2. **Natural Language**: The code now reads like a sentence: "If user in banned database, append user."
3. **Simplicity**: Much cleaner and more concise implementation
4. **Pythonic Style**: Uses idiomatic Python constructs`,
    optimizer: `## Initial Analysis
✅ **Excellent Performance** - Efficiency Score: 10/10

**Initial Execution Time:** ~14.5 seconds (Time limit exceeded in many competitive environments)
**Final Execution Time:** ~0.012 seconds (12 ms)
**Time Reduced:** ~14.48 seconds (Over 1000x faster)

The original code (and the Pragmatist's clean version) relies on **Linear Search** inside a loop. Since \`banned_database\` is a List, checking \`if user in banned_database\` requires scanning the list one by one. This results in **O(N × M)** complexity. With 10k users and 100k banned items, that is roughly **1 billion comparisons**.

## Revised Code
\`\`\`python
def get_banned_matches_optimized(incoming_users, banned_database):
    # Convert list to a Set for O(1) lookups
    banned_set = set(banned_database)
    
    # List comprehension for speed and conciseness
    return [user for user in incoming_users if user in banned_set]
\`\`\`

## Improvements
1. **Data Structure Switch**: The most critical change is converting \`banned_database\` (a List) to a **Set**
2. **Complexity Reduction**:
   - List Lookup: O(N) (must scan the whole list)
   - Set Lookup: O(1) (instant hash map lookup)
3. **Total Operations**: Reduced from ~1 billion comparisons to just ~110,000 operations (100k to build the set + 10k lookups)
4. **Performance Boost**: Over 1000x improvement in execution time
5. **Scalability**: Performance scales linearly with input size rather than quadratically`
  },
  {
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

    return data`,
    pragmatist: `## Initial Analysis
✅ **Approved** - Readability Score: 2/10

This is a classic case of "reinventing the wheel." Writing a manual sort function is error-prone, hard to read, and adds unnecessary lines of code (10 lines vs. 1 line). The manual swapping logic (\`temp = ...\`) is also "un-Pythonic."

## Revised Code
\`\`\`python
def sort_dataset(data):
    # Use Python's built-in sorted() function
    # It clearly communicates intent: "Return a sorted version of this data"
    return sorted(data)
\`\`\`

## Improvements
1. **Standard Library Usage**: Replaced custom logic with \`sorted()\`, which every Python developer recognizes instantly.
2. **Reduced Cognitive Load**: The reader doesn't need to parse nested loops to understand that the data is being sorted.
3. **Immutability**: \`sorted(data)\` returns a new list, leaving the original data intact (often safer for debugging).`,
    optimizer: `## Initial Analysis
✅ **Excellent Performance** - Efficiency Score: 10/10

**Initial Execution Time:** 7,200 ms (7.2 seconds)

**Final Execution Time:** 3 ms (0.003 seconds)

**Time Reduced:** 7,197 ms (Over 2000x faster)

The input code uses **Bubble Sort**, which has a time complexity of **O(N²)**. For a list of 10,000 items, this requires roughly **50,000,000 operations**. It scales terribly; if you doubled the input to 20,000, the time would quadruple.

## Revised Code
\`\`\`python
def sort_dataset_optimized(data):
    # Python uses Timsort (a mix of Merge Sort and Insertion Sort)
    # This runs in O(N log N) time and is implemented in C
    data.sort() 
    return data
\`\`\`

## Improvements
1. **Algorithmic Superiority**: Switched from O(N²) to **O(N log N)** (Timsort).
2. **Low-Level Optimization**: The built-in \`.sort()\` method is implemented in **C**, meaning it runs directly on the processor without the overhead of the Python interpreter loop.
3. **In-Place Operation**: Using \`.sort()\` modifies the list directly, which saves memory overhead compared to creating a new list copy.`
  },
  {
    code: `# Initial Code Snippet

def process_transactions(transactions):

    logs = []

    for tx in transactions:

        # Complex string formatting happening in every loop

        msg = "Transaction ID: " + str(tx.id) + " | Amount: $" + str(tx.amount) + " | Status: " + tx.status

        if tx.amount > 10000:

            logs.append(msg)

    return logs`,
    pragmatist: `## Initial Analysis
✅ **Approved** - Readability Score: 5/10

String concatenation using \`+\` is messy and hard to read. You have to manually manage spaces and type conversions (\`str()\`). It looks cluttered.

## Revised Code
\`\`\`python
def process_transactions(transactions):
    logs = []

    for tx in transactions:
        # Use f-strings for cleaner, inline interpolation
        if tx.amount > 10000:
            msg = f"Transaction ID: {tx.id} | Amount: $\{tx.amount} | Status: {tx.status}"
            logs.append(msg)

    return logs
\`\`\`

## Improvements
1. **F-Strings**: Switched to f-strings (\`f"..."\`), which handle type conversion automatically and are much easier to read.
2. **Logic Placement**: Moved the string creation *inside* the \`if\` block. This is a subtle style improvement that also hints at performance (why build it if you don't need it?).`,
    optimizer: `## Initial Analysis
✅ **Good Performance** - Efficiency Score: 8/10

**Initial Execution Time:** 450 ms

**Final Execution Time:** 85 ms

**Time Reduced:** 365 ms

The original code constructs the \`msg\` string **for every single transaction**, even if \`tx.amount\` is small and the log is never used. If you have 1 million transactions but only 5 are high-value, you just wasted CPU cycles building 999,995 strings for no reason.

## Revised Code
\`\`\`python
def process_transactions_optimized(transactions):
    # Filter first, then format.
    # This is "Lazy Evaluation" - only do the work if necessary.
    high_value_tx = (tx for tx in transactions if tx.amount > 10000)
    
    return [
        f"Transaction ID: {tx.id} | Amount: $\{tx.amount} | Status: {tx.status}"
        for tx in high_value_tx
    ]
\`\`\`

## Improvements
1. **Lazy Evaluation**: By filtering *before* creating the string, we avoid the overhead of string allocation for 99% of the data.
2. **Generator Expression**: Used \`(tx for ...)\` to iterate without creating an intermediate list in memory.
3. **F-String Performance**: F-strings are faster than \`.format()\` or \`+\` concatenation in modern Python.`
  }
];

// Function to find matching simulation data
function findMatchingSimulation(code) {
  // Normalize whitespace for comparison
  const normalizeCode = (code) => code.replace(/\s+/g, ' ').trim();
  const normalizedInput = normalizeCode(code);
  
  for (const item of simulationData) {
    const normalizedSimCode = normalizeCode(item.code);
    
    // Check for exact match or substring match in either direction
    if (normalizedInput === normalizedSimCode || 
        normalizedInput.includes(normalizedSimCode) || 
        normalizedSimCode.includes(normalizedInput)) {
      return item;
    }
    
    // Additional fuzzy matching for common variations
    // Remove comments and extra whitespace for comparison
    const stripComments = (str) => str.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const inputNoComments = normalizeCode(stripComments(code));
    const simNoComments = normalizeCode(stripComments(item.code));
    
    if (inputNoComments.includes(simNoComments) || simNoComments.includes(inputNoComments)) {
      return item;
    }
  }
  
  return null;
}

// Function to extract score from analysis text
function extractScoreFromAnalysis(analysisText) {
  // Look for patterns like "Readability Score: X/10" or "Efficiency Score: X/10"
  const scoreRegex = /(Readability Score|Efficiency Score):\s*(\d+)/i;
  const match = analysisText.match(scoreRegex);
  
  if (match && match[2]) {
    return parseInt(match[2]);
  }
  
  // Fallback patterns
  const fallbackRegex = /Score:\s*(\d+)/i;
  const fallbackMatch = analysisText.match(fallbackRegex);
  
  if (fallbackMatch && fallbackMatch[1]) {
    return parseInt(fallbackMatch[1]);
  }
  
  // If no score found, return a default value
  return 5;
}

// Add a test function to verify score extraction
function testScoreExtraction() {
  const testText1 = "✅ **Approved** - Readability Score: 6/10";
  const testText2 = "⚠️ **Performance Warning** - Efficiency Score: 9/10";
  const testText3 = "⚠️ **Critical Performance Warning** - Efficiency Score: 3/10";
  
  console.log("Test 1 - Expected 6, Got:", extractScoreFromAnalysis(testText1));
  console.log("Test 2 - Expected 9, Got:", extractScoreFromAnalysis(testText2));
  console.log("Test 3 - Expected 3, Got:", extractScoreFromAnalysis(testText3));
}

// Run the test
testScoreExtraction();

// Hugging Face API setup
const { HfInference } = require('@huggingface/inference');
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Function to call Hugging Face API with retries
async function callHuggingFaceAPI(prompt, retries = 0) {
  try {
    const response = await hf.chatCompletion({
      model: 'meta-llama/Llama-3.1-8B-Instruct',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(`API call failed, retrying in ${RETRY_DELAY}ms... (${retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return callHuggingFaceAPI(prompt, retries + 1);
    }
    throw error;
  }
}

// API Routes
app.post('/debate', async (req, res) => {
  try {
    const { code } = req.body;
    
    // Always check for simulation data match first (prioritize simulation)
    const simulationMatch = findMatchingSimulation(code);
    if (simulationMatch) {
      console.log('Using simulation data for response');
      
      // Extract scores from the analysis text
      const pragmatistScore = extractScoreFromAnalysis(simulationMatch.pragmatist);
      const optimizerScore = extractScoreFromAnalysis(simulationMatch.optimizer);
      
      return res.json({
        pragmatist: simulationMatch.pragmatist,
        optimizer: simulationMatch.optimizer,
        scores: {
          pragmatist: pragmatistScore,
          optimizer: optimizerScore
        }
      });
    }
    
    // Only try the Hugging Face API if no simulation match and API key exists
    if (process.env.HUGGING_FACE_API_KEY) {
      console.log('Calling Hugging Face API');
      
      // Pragmatist prompt
      const pragmatistPrompt = `Analyze this code from a practical, readability standpoint:
      
${code}

Provide your response in this exact format:
> **Verdict:** [Approval Status] (Readability Score: X/10)
> "[Your detailed analysis]"`;
      
      // Optimizer prompt
      const optimizerPrompt = `Analyze this code from a performance and optimization standpoint:
      
${code}

Provide your response in this exact format:
> **Verdict:** [Warning Level] (Efficiency Score: X/10)
> "[Your detailed analysis]"`;
      
      // Call both APIs concurrently
      const [pragmatistResponse, optimizerResponse] = await Promise.all([
        callHuggingFaceAPI(pragmatistPrompt),
        callHuggingFaceAPI(optimizerPrompt)
      ]);
      
      // Extract scores from the responses
      const pragmatistScore = extractScoreFromAnalysis(pragmatistResponse);
      const optimizerScore = extractScoreFromAnalysis(optimizerResponse);
      
      return res.json({
        pragmatist: pragmatistResponse,
        optimizer: optimizerResponse,
        scores: {
          pragmatist: pragmatistScore,
          optimizer: optimizerScore
        }
      });
    }
    
    // If no simulation match and no API key, return a clean error
    res.status(500).json({ 
      error: 'No simulation available for this code pattern',
      pragmatist: '⚠️ No analysis available',
      optimizer: '⚠️ No analysis available'
    });
  } catch (error) {
    console.error('Analysis error:', error);
    
    // Even if API fails, try to find a simulation match as fallback
    if (req.body.code) {
      const simulationMatch = findMatchingSimulation(req.body.code);
      if (simulationMatch) {
        console.log('Using simulation data as final fallback');
        
        // Extract scores from the analysis text
        const pragmatistScore = extractScoreFromAnalysis(simulationMatch.pragmatist);
        const optimizerScore = extractScoreFromAnalysis(simulationMatch.optimizer);
        
        return res.json({
          pragmatist: simulationMatch.pragmatist,
          optimizer: simulationMatch.optimizer,
          scores: {
            pragmatist: pragmatistScore,
            optimizer: optimizerScore
          }
        });
      }
    }
    
    // Return a clean error message without exposing technical details
    res.status(500).json({ 
      error: 'Analysis temporarily unavailable',
      pragmatist: '⚠️ Service temporarily unavailable',
      optimizer: '⚠️ Service temporarily unavailable'
    });
  }
});

// History Routes
app.get('/api/history', authenticateUser, (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, code, pragmatist, optimizer, timestamp
      FROM analyses
      WHERE user_id = ?
      ORDER BY timestamp DESC
    `);
    
    const analyses = stmt.all(req.userId);
    res.json({ analyses });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

app.delete('/api/history/:id', authenticateUser, (req, res) => {
  try {
    const stmt = db.prepare(`
      DELETE FROM analyses
      WHERE id = ? AND user_id = ?
    `);
    
    const result = stmt.run(req.params.id, req.userId);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'History item not found' });
    }
    
    res.json({ message: 'History item deleted successfully' });
  } catch (error) {
    console.error('Error deleting history item:', error);
    res.status(500).json({ error: 'Failed to delete history item' });
  }
});

app.delete('/api/history', authenticateUser, (req, res) => {
  try {
    const stmt = db.prepare(`
      DELETE FROM analyses
      WHERE user_id = ?
    `);
    
    stmt.run(req.userId);
    res.json({ message: 'All history cleared successfully' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

// Save analysis to history
app.post('/api/history', authenticateUser, (req, res) => {
  try {
    const { code, pragmatist, optimizer } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO analyses (user_id, code, pragmatist, optimizer)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(req.userId, code, pragmatist, optimizer);
    res.json({ id: result.lastInsertRowid, message: 'Analysis saved to history' });
  } catch (error) {
    console.error('Error saving to history:', error);
    res.status(500).json({ error: 'Failed to save analysis to history' });
  }
});

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check credentials against database
    const stmt = db.prepare(`
      SELECT id, firstname, lastname, email
      FROM users
      WHERE email = ? AND password = ?
    `);
    
    const user = stmt.get(email, password);
    
    if (user) {
      // In a real app, you would create a session or JWT token here
      res.json({ 
        message: 'Login successful',
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  try {
    // In a real app, you would destroy the session or JWT token here
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

app.get('/api/auth/me', (req, res) => {
  // Simulate authenticated user for demo
  res.json({ 
    user: {
      id: 1,
      firstname: 'Adithya',
      lastname: 'Kulkarni',
      email: 'kul.adithya@gmail.com'
    }
  });
});

// Populate sample history data
function populateSampleData() {
  try {
    // Check if we already have data
    const countStmt = db.prepare('SELECT COUNT(*) as count FROM analyses WHERE user_id = 1');
    const result = countStmt.get();
    
    // Only populate if there's no data
    if (result.count === 0) {
      console.log('Populating sample data...');
      
      // Insert sample analyses from simulation data
      const insertStmt = db.prepare(`
        INSERT INTO analyses (user_id, code, pragmatist, optimizer)
        VALUES (?, ?, ?, ?)
      `);
      
      // Add all simulation data as sample history items
      for (const item of simulationData) {
        insertStmt.run(1, item.code, item.pragmatist, item.optimizer);
      }
      
      console.log('✓ Sample data populated');
    }
  } catch (error) {
    console.error('Error populating sample data:', error);
  }
}

// Call populateSampleData after creating default user
createDefaultUser();
populateSampleData();

// Start server
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;