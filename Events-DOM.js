// ============================================================================
// JAVASCRIPT EVENTS & DOM - INTERACTIVE DEMONSTRATIONS
// Complete Standalone JavaScript File with All Demos & Functions
// ============================================================================
// This file contains all the interactive demonstration functions
// from the Events & DOM explainer guide
// ============================================================================


// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format output with emoji prefix
 */
function formatOutput(message, type = 'info') {
    const prefix = {
        'info': '📋',
        'success': '✅',
        'error': '❌',
        'loading': '⏳',
        'warn': '⚠️'
    };
    return `${prefix[type] || '📋'} ${message}`;
}

/**
 * Clear console with header
 */
function printHeader(title) {
    console.clear();
    console.log('\n' + '='.repeat(70));
    console.log(title.toUpperCase());
    console.log('='.repeat(70) + '\n');
}

/**
 * Print separator line
 */
function printSeparator() {
    console.log('\n' + '-'.repeat(70) + '\n');
}


// ============================================================================
// PHASE 1: WHAT IS THE DOM?
// ============================================================================

/**
 * DEMO 1: Explain what the DOM is
 */
function explainWhatIsDOM() {
    printHeader('Phase 1: What is the DOM?');
    
    console.log('DOM = Document Object Model\n');
    console.log('What it is:');
    console.log('  • A live representation of your HTML');
    console.log('  • How JavaScript sees the page');
    console.log('  • A tree structure of all elements');
    console.log('  • Can be accessed and modified by JavaScript');
    
    printSeparator();
    
    console.log('Simple Example:\n');
    console.log('HTML Code:');
    console.log(`
  <html>
    <head>
      <title>My Page</title>
    </head>
    <body>
      <h1>Welcome</h1>
      <p>Hello World</p>
    </body>
  </html>
    `);
    
    printSeparator();
    
    console.log('DOM Tree (how JavaScript sees it):\n');
    console.log(`
  html
  ├── head
  │   └── title: "My Page"
  └── body
      ├── h1: "Welcome"
      └── p: "Hello World"
    `);
    
    printSeparator();
    
    console.log('Why it matters:');
    console.log('  ✓ Read HTML elements');
    console.log('  ✓ Modify text and styles');
    console.log('  ✓ Add/remove elements');
    console.log('  ✓ Respond to user interactions');
    console.log('  ✓ Show/hide content');
    console.log('  ✓ Validate forms');
}

/**
 * DEMO 2: Show DOM tree visualization
 */
function showDOMTree() {
    printHeader('Phase 1: Understanding the DOM Tree');
    
    console.log('Student Portal DOM Tree:\n');
    console.log(`
document
└── html
    ├── head
    │   ├── meta[charset="UTF-8"]
    │   ├── meta[viewport]
    │   └── title: "0xVerse Academy - Student Portal"
    └── body
        ├── header#main-header
        │   ├── h1: "0xVerse Academy"
        │   └── p: "Student Portal"
        │
        ├── nav#main-nav
        │   ├── a[href="#dashboard"]: "Dashboard"
        │   ├── a[href="#grades"]: "Grades"
        │   ├── a[href="#courses"]: "Courses"
        │   └── a[href="#profile"]: "Profile"
        │
        ├── main
        │   ├── section#student-info
        │   │   ├── h2: "Student Information"
        │   │   ├── p: "Name: Obi Udeh"
        │   │   ├── p: "Grade: 11A"
        │   │   └── p: "GPA: 3.8"
        │   │
        │   └── section#courses
        │       ├── h2: "Current Courses"
        │       └── ul
        │           ├── li: "Mathematics"
        │           ├── li: "Physics"
        │           ├── li: "Chemistry"
        │           └── li: "English"
        │
        └── footer#main-footer
            └── p: "© 2024 0xVerse Academy"
    `);
    
    printSeparator();
    
    console.log('Key concepts:');
    console.log('  • Every element is a NODE in the tree');
    console.log('  • Elements can have children');
    console.log('  • Parent-child relationships');
    console.log('  • IDs (id) and classes (class) help identify elements');
    console.log('  • document is the root of everything');
}


// ============================================================================
// PHASE 2: SELECTING DOM ELEMENTS
// ============================================================================

/**
 * DEMO 3: Different ways to select elements
 */
function demonstrateSelectionMethods() {
    printHeader('Phase 2: Selecting DOM Elements');
    
    console.log('Method 1: getElementById() - Select by ID\n');
    console.log('Code:');
    console.log('  const header = document.getElementById("main-heading");');
    console.log('');
    console.log('Usage: When you need ONE specific element');
    console.log('Speed: Very fast');
    
    printSeparator();
    
    console.log('Method 2: getElementsByClassName() - Select by class\n');
    console.log('Code:');
    console.log('  const buttons = document.getElementsByClassName("btn");');
    console.log('');
    console.log('Usage: When multiple elements have same class');
    console.log('Returns: A live collection');
    
    printSeparator();
    
    console.log('Method 3: getElementsByTagName() - Select by tag\n');
    console.log('Code:');
    console.log('  const paragraphs = document.getElementsByTagName("p");');
    console.log('');
    console.log('Usage: When you need all of a certain element type');
    console.log('Example: Get all <p> tags on page');
    
    printSeparator();
    
    console.log('Method 4: querySelector() - CSS selectors (MODERN)\n');
    console.log('Code:');
    console.log('  document.querySelector(".my-class");     // First match');
    console.log('  document.querySelector("#my-id");         // By ID');
    console.log('  document.querySelector("div p");          // Nested');
    console.log('');
    console.log('Usage: RECOMMENDED - most flexible');
    console.log('Selects: First matching element');
    
    printSeparator();
    
    console.log('Method 5: querySelectorAll() - All matching\n');
    console.log('Code:');
    console.log('  document.querySelectorAll(".my-class");   // All matches');
    console.log('  document.querySelectorAll("button");      // All buttons');
    console.log('');
    console.log('Usage: When you need multiple elements');
    console.log('Returns: A list you can loop through');
    
    printSeparator();
    
    console.log('BEST PRACTICE:');
    console.log('  ✓ Use querySelector/querySelectorAll');
    console.log('  ✓ They work with CSS selectors');
    console.log('  ✓ They are the modern standard');
    console.log('  ✓ Modern browsers support them');
}

/**
 * DEMO 4: CSS selector examples
 */
function demonstrateCSSSelectors() {
    printHeader('Phase 2: CSS Selectors for Selection');
    
    console.log('Common CSS Selectors:\n');
    
    console.log('1. BY ID (unique):');
    console.log('   document.querySelector("#main-heading");');
    console.log('   → Selects: <h1 id="main-heading">\n');
    
    console.log('2. BY CLASS:');
    console.log('   document.querySelector(".btn");');
    console.log('   document.querySelectorAll(".btn");');
    console.log('   → Selects: <button class="btn">\n');
    
    console.log('3. BY TAG:');
    console.log('   document.querySelector("button");');
    console.log('   → Selects: <button>\n');
    
    console.log('4. COMBINATION - Tag + Class:');
    console.log('   document.querySelector("button.primary");');
    console.log('   → Selects: <button class="primary">\n');
    
    console.log('5. NESTED - Parent > Child:');
    console.log('   document.querySelector("header h1");');
    console.log('   → Selects: <h1> inside <header>\n');
    
    console.log('6. MULTIPLE LEVELS:');
    console.log('   document.querySelector("nav a.active");');
    console.log('   → Selects: <a class="active"> inside <nav>\n');
    
    console.log('7. ATTRIBUTE SELECTOR:');
    console.log('   document.querySelector("[href]");');
    console.log('   → Selects: Any element with href attribute\n');
    
    console.log('8. MULTIPLE CLASSES:');
    console.log('   document.querySelector(".btn.primary");');
    console.log('   → Selects: <button class="btn primary">\n');
}


// ============================================================================
// PHASE 3: CHANGING CONTENT & STYLES
// ============================================================================

/**
 * DEMO 5: Changing text content
 */
function demonstrateChangingText() {
    printHeader('Phase 3: Changing Text Content');
    
    console.log('Method 1: textContent - Change text only\n');
    console.log('Code:');
    console.log('  const heading = document.querySelector("h1");');
    console.log('  heading.textContent = "New Text Here";');
    console.log('');
    console.log('Result: Changes only the text');
    console.log('Safe: Prevents HTML injection attacks');
    
    printSeparator();
    
    console.log('Method 2: innerHTML - Change HTML + text\n');
    console.log('Code:');
    console.log('  const heading = document.querySelector("h1");');
    console.log('  heading.innerHTML = "<strong>Bold Text</strong>";');
    console.log('');
    console.log('Result: Creates new HTML elements');
    console.log('Use when: You want to add HTML structure');
    
    printSeparator();
    
    console.log('Real Example:\n');
    console.log('Original HTML:');
    console.log('  <h1>Welcome</h1>');
    console.log('');
    console.log('Using textContent:');
    console.log('  heading.textContent = "Goodbye";');
    console.log('  Result: <h1>Goodbye</h1>');
    console.log('');
    console.log('Using innerHTML:');
    console.log('  heading.innerHTML = "Good<em>bye</em>";');
    console.log('  Result: <h1>Good<em>bye</em></h1>');
    
    printSeparator();
    
    console.log('BEST PRACTICE:');
    console.log('  ✓ Use textContent for simple text changes');
    console.log('  ✓ Use innerHTML only when you need HTML');
    console.log('  ✓ Never use innerHTML with user input!');
}

/**
 * DEMO 6: Changing styles
 */
function demonstrateChangingStyles() {
    printHeader('Phase 3: Changing Styles');
    
    console.log('Method 1: Inline styles (element.style)\n');
    console.log('Code:');
    console.log('  const element = document.querySelector("p");');
    console.log('  element.style.color = "blue";');
    console.log('  element.style.backgroundColor = "yellow";');
    console.log('  element.style.fontSize = "20px";');
    console.log('');
    console.log('Note: Use camelCase (backgroundColor, not background-color)');
    
    printSeparator();
    
    console.log('Method 2: CSS Classes (recommended)\n');
    console.log('Code:');
    console.log('  element.classList.add("highlighted");');
    console.log('  element.classList.remove("old-style");');
    console.log('  element.classList.toggle("active");');
    console.log('');
    console.log('Advantages:');
    console.log('  ✓ Styles defined in CSS (separation of concerns)');
    console.log('  ✓ Multiple changes at once');
    console.log('  ✓ Easy to change styling globally');
    
    printSeparator();
    
    console.log('classList methods:\n');
    console.log('add()       - Add a class');
    console.log('remove()    - Remove a class');
    console.log('toggle()    - Add if not there, remove if there');
    console.log('contains()  - Check if element has class');
    
    printSeparator();
    
    console.log('Example:\n');
    console.log('HTML:');
    console.log('  <button id="toggleBtn">Click me</button>');
    console.log('  <style>');
    console.log('    .active { background: green; color: white; }');
    console.log('  </style>');
    console.log('');
    console.log('JavaScript:');
    console.log('  const btn = document.querySelector("#toggleBtn");');
    console.log('  btn.classList.toggle("active");');
}

/**
 * DEMO 7: Adding/Removing elements
 */
function demonstrateAddingRemovingElements() {
    printHeader('Phase 3: Adding & Removing Elements');
    
    console.log('Creating and adding elements:\n');
    console.log('Code:');
    console.log('  // Create element');
    console.log('  const newPara = document.createElement("p");');
    console.log('');
    console.log('  // Set content');
    console.log('  newPara.textContent = "New paragraph";');
    console.log('');
    console.log('  // Add to page');
    console.log('  document.body.appendChild(newPara);');
    
    printSeparator();
    
    console.log('Removing elements:\n');
    console.log('Code:');
    console.log('  // Find element');
    console.log('  const oldElement = document.querySelector(".to-delete");');
    console.log('');
    console.log('  // Remove from page');
    console.log('  oldElement.remove();');
    
    printSeparator();
    
    console.log('appendChild() vs insertBefore():\n');
    console.log('appendChild():');
    console.log('  • Adds element as LAST child');
    console.log('  • Goes at the end');
    console.log('');
    console.log('insertBefore():');
    console.log('  • Adds element BEFORE another element');
    console.log('  • More control over position');
    
    printSeparator();
    
    console.log('Real Example: Adding a to-do item\n');
    console.log('Code:');
    console.log('  const li = document.createElement("li");');
    console.log('  li.textContent = "Buy groceries";');
    console.log('  li.style.padding = "10px";');
    console.log('  document.querySelector("ul").appendChild(li);');
}


// ============================================================================
// PHASE 4: UNDERSTANDING EVENTS
// ============================================================================

/**
 * DEMO 8: What are events?
 */
function explainEvents() {
    printHeader('Phase 4: Understanding Events');
    
    console.log('Event = Something that happens on the page\n');
    console.log('Common Events:\n');
    
    console.log('USER ACTIONS:');
    console.log('  click      - User clicks element');
    console.log('  dblclick   - User double-clicks');
    console.log('  input      - User types in text box');
    console.log('  change     - User changes dropdown/checkbox');
    console.log('  submit     - User submits form');
    console.log('  focus      - Element gets focus');
    console.log('  blur       - Element loses focus');
    
    printSeparator();
    
    console.log('MOUSE EVENTS:');
    console.log('  mouseover  - Mouse enters element');
    console.log('  mouseout   - Mouse leaves element');
    console.log('  mousedown  - Mouse button pressed');
    console.log('  mouseup    - Mouse button released');
    
    printSeparator();
    
    console.log('KEYBOARD EVENTS:');
    console.log('  keydown    - Key is pressed');
    console.log('  keyup      - Key is released');
    console.log('  keypress   - Key is pressed (deprecated)');
    
    printSeparator();
    
    console.log('PAGE EVENTS:');
    console.log('  load       - Page fully loaded');
    console.log('  unload     - User leaving page');
    console.log('  scroll     - User scrolls page');
    console.log('  resize     - Window resized');
}

/**
 * DEMO 9: Event flow / lifecycle
 */
function demonstrateEventFlow() {
    printHeader('Phase 4: How Events Work (Event Flow)');
    
    console.log('Step-by-step event flow:\n');
    
    console.log('1️⃣  EVENT HAPPENS');
    console.log('    User clicks a button on the page');
    
    console.log('\n2️⃣  BROWSER DETECTS');
    console.log('    Browser detects the click event');
    console.log('    Looks for event listeners on that button');
    
    console.log('\n3️⃣  YOUR CODE RUNS');
    console.log('    The event handler function is executed');
    console.log('    This is YOUR code that responds to the event');
    
    console.log('\n4️⃣  PAGE UPDATES');
    console.log('    Your code changes the page');
    console.log('    User sees the result');
    
    printSeparator();
    
    console.log('Example Timeline:\n');
    console.log('13:45:00.000 - Button exists on page');
    console.log('13:45:00.001 - Event listener added to button');
    console.log('13:45:05.234 - User clicks button ← EVENT');
    console.log('13:45:05.235 - Browser detects click');
    console.log('13:45:05.236 - Callback function executes');
    console.log('13:45:05.237 - Page updates (color changes, etc)');
    console.log('13:45:05.238 - User sees the change');
    
    printSeparator();
    
    console.log('Key insight:');
    console.log('  Your JavaScript doesn\'t run all at once.');
    console.log('  It waits for events to happen.');
    console.log('  Then responds to those events.');
}


// ============================================================================
// PHASE 5: HANDLING EVENTS
// ============================================================================

/**
 * DEMO 10: Adding event listeners
 */
function demonstrateAddingEventListeners() {
    printHeader('Phase 5: Adding Event Listeners');
    
    console.log('Method 1: addEventListener() - RECOMMENDED\n');
    console.log('Code:');
    console.log('  const button = document.querySelector("button");');
    console.log('  button.addEventListener("click", function() {');
    console.log('    console.log("Button clicked!");');
    console.log('  });');
    
    printSeparator();
    
    console.log('Method 2: onclick attribute (OLD)\n');
    console.log('HTML:');
    console.log('  <button onclick="myFunction()">Click</button>');
    console.log('');
    console.log('JavaScript:');
    console.log('  function myFunction() {');
    console.log('    console.log("Clicked!");');
    console.log('  }');
    
    printSeparator();
    
    console.log('Why addEventListener() is better:\n');
    console.log('  ✓ Can add multiple listeners to same element');
    console.log('  ✓ Can remove listeners easily');
    console.log('  ✓ Cleaner HTML (no mix of HTML and JS)');
    console.log('  ✓ Modern standard');
    console.log('  ✓ Better performance');
}

/**
 * DEMO 11: Handling click events
 */
function demonstrateClickEvent() {
    printHeader('Phase 5: Handling Click Events');
    
    console.log('Simple click handler:\n');
    console.log('Code:');
    console.log('  const button = document.querySelector("button");');
    console.log('  button.addEventListener("click", function() {');
    console.log('    console.log("✅ Button was clicked!");');
    console.log('  });');
    
    printSeparator();
    
    console.log('With arrow function (modern):\n');
    console.log('Code:');
    console.log('  button.addEventListener("click", () => {');
    console.log('    console.log("✅ Button was clicked!");');
    console.log('  });');
    
    printSeparator();
    
    console.log('Real Example: Counter\n');
    console.log('Code:');
    console.log('  let count = 0;');
    console.log('  const btn = document.querySelector("button");');
    console.log('');
    console.log('  btn.addEventListener("click", function() {');
    console.log('    count++;');
    console.log('    console.log("Clicked " + count + " times");');
    console.log('  });');
}

/**
 * DEMO 12: Handling input events
 */
function demonstrateInputEvent() {
    printHeader('Phase 5: Handling Input Events');
    
    console.log('Listening to user typing:\n');
    console.log('Code:');
    console.log('  const input = document.querySelector("input");');
    console.log('  input.addEventListener("input", function(event) {');
    console.log('    console.log("User typed: " + event.target.value);');
    console.log('  });');
    
    printSeparator();
    
    console.log('Event object:\n');
    console.log('The "event" parameter gives you info:');
    console.log('  event.target      - The element that triggered event');
    console.log('  event.type        - Type of event ("input", "click", etc)');
    console.log('  event.key         - Which key was pressed');
    console.log('  event.target.value - Current text in input');
    
    printSeparator();
    
    console.log('Real Example: Live search\n');
    console.log('Code:');
    console.log('  const searchBox = document.querySelector("#search");');
    console.log('  searchBox.addEventListener("input", function(e) {');
    console.log('    const query = e.target.value;');
    console.log('    if (query.length > 0) {');
    console.log('      console.log("Searching for: " + query);');
    console.log('      // Fetch results from server');
    console.log('    }');
    console.log('  });');
}

/**
 * DEMO 13: Handling form submission
 */
function demonstrateFormSubmit() {
    printHeader('Phase 5: Handling Form Submission');
    
    console.log('Listening to form submit:\n');
    console.log('Code:');
    console.log('  const form = document.querySelector("form");');
    console.log('  form.addEventListener("submit", function(e) {');
    console.log('    e.preventDefault();  // Stop page reload!');
    console.log('    console.log("Form submitted!");');
    console.log('  });');
    
    printSeparator();
    
    console.log('Getting form data:\n');
    console.log('Code:');
    console.log('  const form = document.querySelector("form");');
    console.log('  form.addEventListener("submit", function(e) {');
    console.log('    e.preventDefault();');
    console.log('');
    console.log('    const name = document.querySelector("input[name=\'name\']").value;');
    console.log('    const email = document.querySelector("input[name=\'email\']").value;');
    console.log('');
    console.log('    console.log("Name: " + name);');
    console.log('    console.log("Email: " + email);');
    console.log('  });');
    
    printSeparator();
    
    console.log('Why preventDefault()?\n');
    console.log('  • By default, form submission reloads page');
    console.log('  • preventDefault() stops this default behavior');
    console.log('  • Lets your JavaScript handle the submit instead');
    console.log('  • Can send data to server without page reload');
}


// ============================================================================
// PHASE 6: REAL-WORLD APPLICATIONS
// ============================================================================

/**
 * DEMO 14: Building a to-do list
 */
function demonstrateTodoList() {
    printHeader('Phase 6: Real-World: To-Do List App');
    
    console.log('Complete to-do list application:\n');
    console.log('HTML Structure:');
    console.log(`
  <input type="text" id="todo-input" placeholder="Enter task...">
  <button id="add-btn">Add Task</button>
  <ul id="todo-list"></ul>
    `);
    
    printSeparator();
    
    console.log('JavaScript Code:\n');
    console.log(`
  const input = document.querySelector("#todo-input");
  const addBtn = document.querySelector("#add-btn");
  const list = document.querySelector("#todo-list");
  
  // Add task function
  function addTask() {
    if (input.value.trim() === "") return;
    
    // Create list item
    const li = document.createElement("li");
    li.textContent = input.value;
    li.style.padding = "10px";
    
    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => li.remove();
    
    li.appendChild(deleteBtn);
    list.appendChild(li);
    input.value = "";
  }
  
  // Add listener to button
  addBtn.addEventListener("click", addTask);
  
  // Also allow Enter key
  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
  });
    `);
    
    printSeparator();
    
    console.log('What this teaches:\n');
    console.log('  ✓ Getting user input');
    console.log('  ✓ Creating elements dynamically');
    console.log('  ✓ Event listeners');
    console.log('  ✓ Responding to user actions');
    console.log('  ✓ Modifying the DOM');
}

/**
 * DEMO 15: Building a student grade calculator
 */
function demonstrateGradeCalculator() {
    printHeader('Phase 6: Real-World: Grade Calculator');
    
    console.log('Student grade calculator application:\n');
    console.log('HTML Structure:');
    console.log(`
  <input type="number" id="homework" placeholder="Homework grade">
  <input type="number" id="midterm" placeholder="Midterm grade">
  <input type="number" id="final" placeholder="Final exam grade">
  <button id="calculate-btn">Calculate GPA</button>
  <div id="result"></div>
    `);
    
    printSeparator();
    
    console.log('JavaScript Code:\n');
    console.log(`
  const homeworkInput = document.querySelector("#homework");
  const midtermInput = document.querySelector("#midterm");
  const finalInput = document.querySelector("#final");
  const calculateBtn = document.querySelector("#calculate-btn");
  const resultDiv = document.querySelector("#result");
  
  calculateBtn.addEventListener("click", function() {
    // Get values
    const homework = parseFloat(homeworkInput.value);
    const midterm = parseFloat(midtermInput.value);
    const final = parseFloat(finalInput.value);
    
    // Validate
    if (isNaN(homework) || isNaN(midterm) || isNaN(final)) {
      resultDiv.textContent = "❌ Please enter all grades";
      resultDiv.style.color = "red";
      return;
    }
    
    // Calculate weighted average
    // 20% homework, 30% midterm, 50% final
    const gpa = (homework * 0.2) + (midterm * 0.3) + (final * 0.5);
    
    // Determine letter grade
    let letter;
    if (gpa >= 90) letter = "A";
    else if (gpa >= 80) letter = "B";
    else if (gpa >= 70) letter = "C";
    else letter = "F";
    
    // Display result
    resultDiv.innerHTML = \`
      <h3>Results:</h3>
      <p>GPA: \${gpa.toFixed(2)}</p>
      <p>Grade: \${letter}</p>
    \`;
    resultDiv.style.color = gpa >= 80 ? "green" : "orange";
  });
    `);
    
    printSeparator();
    
    console.log('What this teaches:\n');
    console.log('  ✓ Getting multiple inputs');
    console.log('  ✓ Data validation');
    console.log('  ✓ Calculations');
    console.log('  ✓ Conditional logic');
    console.log('  ✓ Dynamic HTML generation');
    console.log('  ✓ Style changes based on data');
}

/**
 * DEMO 16: Building an interactive student dashboard
 */
function demonstrateDashboard() {
    printHeader('Phase 6: Real-World: Student Dashboard');
    
    console.log('Interactive student dashboard:\n');
    console.log('Features:');
    console.log('  ✓ Click to expand/collapse sections');
    console.log('  ✓ Update student info');
    console.log('  ✓ Add/remove courses');
    console.log('  ✓ Calculate GPA dynamically');
    console.log('  ✓ Form submission');
    
    printSeparator();
    
    console.log('Key HTML Elements:\n');
    console.log(`
  <div id="dashboard">
    <section id="student-info">
      <h2>Student Info</h2>
      <button id="expand-btn">Expand</button>
      <div id="info-content" class="hidden">
        <p>Name: <span id="student-name">Obi</span></p>
        <p>GPA: <span id="student-gpa">3.8</span></p>
      </div>
    </section>
    
    <section id="courses">
      <h2>Courses</h2>
      <input type="text" id="new-course" placeholder="Add course">
      <button id="add-course-btn">Add</button>
      <ul id="course-list">
        <li>Mathematics</li>
        <li>Physics</li>
      </ul>
    </section>
  </div>
    `);
    
    printSeparator();
    
    console.log('JavaScript with multiple event listeners:\n');
    console.log(`
  // Expand/collapse
  const expandBtn = document.querySelector("#expand-btn");
  const infoContent = document.querySelector("#info-content");
  
  expandBtn.addEventListener("click", function() {
    infoContent.classList.toggle("hidden");
    expandBtn.textContent = infoContent.classList.contains("hidden") 
      ? "Expand" 
      : "Collapse";
  });
  
  // Add course
  const addCourseBtn = document.querySelector("#add-course-btn");
  const newCourseInput = document.querySelector("#new-course");
  const courseList = document.querySelector("#course-list");
  
  addCourseBtn.addEventListener("click", function() {
    const courseName = newCourseInput.value;
    if (courseName.trim() === "") return;
    
    const li = document.createElement("li");
    li.textContent = courseName;
    courseList.appendChild(li);
    newCourseInput.value = "";
  });
    `);
}


// ============================================================================
// ADVANCED DEMONSTRATIONS
// ============================================================================

/**
 * DEMO 17: Event delegation
 */
function demonstrateEventDelegation() {
    printHeader('Advanced: Event Delegation');
    
    console.log('Problem: Adding listeners to many items\n');
    console.log('Bad approach (adds listener to each item):');
    console.log(`
  const items = document.querySelectorAll(".item");
  items.forEach(item => {
    item.addEventListener("click", function() {
      console.log("Item clicked!");
    });
  });
  
  Problem: If you add new items later, they won't have listeners!
    `);
    
    printSeparator();
    
    console.log('Good approach (event delegation):\n');
    console.log(`
  // Listen on parent, not children
  const list = document.querySelector(".list");
  
  list.addEventListener("click", function(e) {
    // Check if clicked element was an item
    if (e.target.classList.contains("item")) {
      console.log("Item clicked!");
    }
  });
  
  Advantage: Works even for items added later!
    `);
}

/**
 * DEMO 18: DOM traversal
 */
function demonstrateDOMTraversal() {
    printHeader('Advanced: DOM Traversal');
    
    console.log('Moving around the DOM tree:\n');
    
    console.log('Parent traversal:');
    console.log('  element.parentElement   - Get parent element');
    console.log('  element.parentElement.parentElement  - Grandparent');
    
    printSeparator();
    
    console.log('Child traversal:');
    console.log('  element.children        - All child elements');
    console.log('  element.children[0]     - First child');
    console.log('  element.firstElementChild  - First child (clearer)');
    console.log('  element.lastElementChild   - Last child');
    
    printSeparator();
    
    console.log('Sibling traversal:');
    console.log('  element.nextElementSibling     - Next sibling');
    console.log('  element.previousElementSibling - Previous sibling');
    
    printSeparator();
    
    console.log('Example: Find parent section of a button\n');
    console.log(`
  const button = document.querySelector("button");
  const section = button.parentElement.parentElement;
  console.log(section);
    `);
}

/**
 * DEMO 19: More event types
 */
function demonstrateMoreEventTypes() {
    printHeader('Advanced: More Event Types');
    
    console.log('FOCUS/BLUR Events:\n');
    console.log('  focus   - Element gets keyboard focus');
    console.log('  blur    - Element loses keyboard focus');
    console.log('  Used for: Form validation, highlight input');
    
    printSeparator();
    
    console.log('KEYBOARD Events:\n');
    console.log('  keydown   - Key is pressed');
    console.log('  keyup     - Key is released');
    console.log('  keypress  - Key is pressed (deprecated)');
    
    printSeparator();
    
    console.log('MOUSE Events:\n');
    console.log('  mouseover - Mouse enters element');
    console.log('  mouseout  - Mouse leaves element');
    console.log('  mousedown - Mouse button pressed');
    console.log('  mouseup   - Mouse button released');
    
    printSeparator();
    
    console.log('CHANGE Event:\n');
    console.log('  Fires when: Dropdown/checkbox value changes');
    console.log('  Example:');
    console.log('    const dropdown = document.querySelector("select");');
    console.log('    dropdown.addEventListener("change", function(e) {');
    console.log('      console.log("Selected: " + e.target.value);');
    console.log('    });');
}


// ============================================================================
// BEST PRACTICES
// ============================================================================

/**
 * DEMO 20: Best practices summary
 */
function demonstrateBestPractices() {
    printHeader('Best Practices for DOM & Events');
    
    console.log('1. USE MEANINGFUL NAMES:\n');
    console.log('  ❌ const x = document.querySelector("div");');
    console.log('  ✅ const studentSection = document.querySelector(".student");');
    
    printSeparator();
    
    console.log('2. CACHE REFERENCES:\n');
    console.log('  ❌ Don\'t query the same element multiple times:');
    console.log('  ❌ for (let i = 0; i < 100; i++) {');
    console.log('  ❌   document.querySelector(".item").innerHTML += i;');
    console.log('  ❌ }');
    console.log('');
    console.log('  ✅ Save reference, use it multiple times:');
    console.log('  ✅ const item = document.querySelector(".item");');
    console.log('  ✅ for (let i = 0; i < 100; i++) {');
    console.log('  ✅   item.innerHTML += i;');
    console.log('  ✅ }');
    
    printSeparator();
    
    console.log('3. USE EVENT DELEGATION:\n');
    console.log('  ✅ Listen on parent for many children');
    console.log('  ✅ Works for dynamically added elements');
    
    printSeparator();
    
    console.log('4. SEPARATE CONCERNS:\n');
    console.log('  ❌ document.querySelector("button").onclick = function() {...}');
    console.log('  ✅ const btn = document.querySelector("button");');
    console.log('  ✅ btn.addEventListener("click", handleClick);');
    
    printSeparator();
    
    console.log('5. VALIDATE USER INPUT:\n');
    console.log('  ✅ Always check if input is empty');
    console.log('  ✅ Check data types');
    console.log('  ✅ Give user feedback');
    
    printSeparator();
    
    console.log('6. PERFORMANCE:\n');
    console.log('  ✅ Don\'t update DOM repeatedly');
    console.log('  ✅ Use classList instead of inline styles');
    console.log('  ✅ Minimize DOM queries in loops');
}


// ============================================================================
// DEMONSTRATION RUNNER
// ============================================================================

/**
 * Run all demonstrations
 */
function runAllDemos() {
    const demos = [
        {name: 'What is DOM', fn: explainWhatIsDOM},
        {name: 'DOM Tree', fn: showDOMTree},
        {name: 'Selection Methods', fn: demonstrateSelectionMethods},
        {name: 'CSS Selectors', fn: demonstrateCSSSelectors},
        {name: 'Changing Text', fn: demonstrateChangingText},
        {name: 'Changing Styles', fn: demonstrateChangingStyles},
        {name: 'Add/Remove Elements', fn: demonstrateAddingRemovingElements},
        {name: 'What are Events', fn: explainEvents},
        {name: 'Event Flow', fn: demonstrateEventFlow},
        {name: 'Adding Listeners', fn: demonstrateAddingEventListeners},
        {name: 'Click Events', fn: demonstrateClickEvent},
        {name: 'Input Events', fn: demonstrateInputEvent},
        {name: 'Form Submit', fn: demonstrateFormSubmit},
        {name: 'To-Do List', fn: demonstrateTodoList},
        {name: 'Grade Calculator', fn: demonstrateGradeCalculator},
        {name: 'Dashboard', fn: demonstrateDashboard},
        {name: 'Event Delegation', fn: demonstrateEventDelegation},
        {name: 'DOM Traversal', fn: demonstrateDOMTraversal},
        {name: 'More Event Types', fn: demonstrateMoreEventTypes},
        {name: 'Best Practices', fn: demonstrateBestPractices}
    ];
    
    console.log('\n' + '='.repeat(70));
    console.log('JAVASCRIPT EVENTS & DOM - COMPLETE DEMONSTRATION SUITE');
    console.log('='.repeat(70));
    console.log('\nTotal demos available: ' + demos.length);
    console.log('\nTo run individual demos:');
    demos.forEach((demo, i) => {
        console.log('  ' + (i+1) + '. ' + demo.fn.name + '()');
    });
    console.log('\nExample:');
    console.log('  explainWhatIsDOM()');
    console.log('  demonstrateSelectionMethods()');
    console.log('  demonstrateClickEvent()');
    console.log('\n' + '='.repeat(70) + '\n');
}


// ============================================================================
// AUTO-LOAD INFO
// ============================================================================

// Print available functions on load
console.log('\n' + '='.repeat(70));
console.log('✅ JAVASCRIPT EVENTS & DOM - Loaded Successfully!');
console.log('='.repeat(70));
console.log('\n📚 AVAILABLE DEMONSTRATIONS:\n');

console.log('PHASE 1: What is DOM');
console.log('  • explainWhatIsDOM()');
console.log('  • showDOMTree()');

console.log('\nPHASE 2: Selecting Elements');
console.log('  • demonstrateSelectionMethods()');
console.log('  • demonstrateCSSSelectors()');

console.log('\nPHASE 3: Changing Content & Styles');
console.log('  • demonstrateChangingText()');
console.log('  • demonstrateChangingStyles()');
console.log('  • demonstrateAddingRemovingElements()');

console.log('\nPHASE 4: Understanding Events');
console.log('  • explainEvents()');
console.log('  • demonstrateEventFlow()');

console.log('\nPHASE 5: Handling Events');
console.log('  • demonstrateAddingEventListeners()');
console.log('  • demonstrateClickEvent()');
console.log('  • demonstrateInputEvent()');
console.log('  • demonstrateFormSubmit()');

console.log('\nPHASE 6: Real-World Applications');
console.log('  • demonstrateTodoList()');
console.log('  • demonstrateGradeCalculator()');
console.log('  • demonstrateDashboard()');

console.log('\nADVANCED:');
console.log('  • demonstrateEventDelegation()');
console.log('  • demonstrateDOMTraversal()');
console.log('  • demonstrateMoreEventTypes()');
console.log('  • demonstrateBestPractices()');

console.log('\nRUN ALL:');
console.log('  • runAllDemos()  - See all available demos');

console.log('\nEXAMPLES:');
console.log('  explainWhatIsDOM()');
console.log('  demonstrateSelectionMethods()');
console.log('  demonstrateClickEvent()');
console.log('  demonstrateTodoList()');

console.log('\n' + '='.repeat(70) + '\n');