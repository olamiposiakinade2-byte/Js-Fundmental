// Analogy: Think of the DOM as a family tree 
// for your webpage. Just like a 
// family tree shows relationships between family members, the DOM shows how HTML elements are connected to each other. JavaScript is like having a remote control that lets you change anything on this family tree - you can find specific family members, change their clothes (styling), make them speak (content),
//  or even add new family members.



// Key Concepts:

// DOM stands for Document Object Model
// It's a live representation of your HTML in memory
// JavaScript can read and modify this representation
// Changes happen in real-time on the webpage

// The DOM tree structure
// document (root)
//   └── html
//       ├── head
//       │   └── title
//       └── body
//           ├── h1
//           ├── p
//           └── div
//               └── button

// When you load a webpage, the browser creates this tree structure automatically
console.log(document); // The entire DOM tree
console.log(document.documentElement); // The <html> element
console.log(document.body); // The <body> element


// Syntax: document.getElementById('id-name')



// Example 1: Basic element selection
let title_Element = document.getElementById('main-title');
console.log(title_Element); // Returns the h1 element
console.log(title_Element.textContent); // "Welcome to My Website"

// Example 2: Checking if element exists before using it
let introElement = document.getElementById('intro-text');
if (introElement) {
    console.log('Found the intro:', introElement.textContent);
} else {
    console.log('Intro element not found!');
}

// Example 3: Storing references for later use
let button = document.getElementById('click-me-btn');
let title = document.getElementById('main-title');
let intro = document.getElementById('intro-text');

// Now we can use these variables throughout our code
console.log('Page elements loaded:');
console.log('Button:', button.textContent);
console.log('Title:', title.textContent);
console.log('Intro:', intro.textContent);


// Key Differences:

// querySelector() returns the FIRST matching element
// querySelectorAll() returns ALL matching elements as a NodeList

// Example 1: Selecting by class (first occurrence)
let firstProductCard = document.querySelector('.product-card');
console.log(firstProductCard); // Returns the first div with class "product-card"

// Selecting by ID using querySelector (alternative to getElementById)
let container = document.querySelector('#main-container'); // Same as getElementById

console.log(container);

// Selecting by tag name
let firstHeading = document.querySelector('h2');
console.log(firstHeading.textContent); // "Products"

// Example 2: Selecting all elements with querySelectorAll
let allProductCards = document.querySelectorAll('.product-card');
console.log(allProductCards); // Returns NodeList with both product cards
console.log('Number of products:', allProductCards.length); // 2

// Loop through all selected elements
allProductCards.forEach(function(card, index) {
    console.log(`Product ${index + 1}:`, card.querySelector('h3').textContent);
});

// Example 3: Advanced CSS selectors
// Select all paragraphs inside product cards
let allPrices = document.querySelectorAll('.product-card .price');
allPrices.forEach(price => {
    console.log('Price found:', price.textContent);
});

// Select the first h3 inside any product-card
let firstProductTitle = document.querySelector('.product-card h3');
console.log('First product:', firstProductTitle.textContent);

// Select elements with specific attributes
let elementsWithClass = document.querySelectorAll('[src]'); // All elements that have a class attribute
console.log('Elements with classes:', elementsWithClass.length);







// getElementsByClassName() - Returns live HTMLCollection
let productCards = document.getElementsByClassName('product-card');
console.log('Product cards:', productCards.length);

// getElementsByTagName() - Returns live HTMLCollection  
let allParagraphs = document.getElementsByTagName('p');
console.log('All paragraphs:', allParagraphs.length);

// getElementsByName() - Rarely used, mainly for form elements
// <input name="username" />
let usernameInputs = document.getElementsByName('username');

// Key Difference: Live vs Static collections
console.log('=== Live vs Static Collections Demo ===');

// HTMLCollection (live) - changes automatically when DOM changes
let liveCollection = document.getElementsByClassName('dynamic-item');
console.log('Live collection length:', liveCollection.length);

// NodeList from querySelectorAll (static) - snapshot at time of selection
let staticCollection = document.querySelectorAll('.dynamic-item');
console.log('Static collection length:', staticCollection.length);

// If we add a new element with class 'dynamic-item':
// liveCollection.length will automatically update
// staticCollection.length will stay the same until we query again









// Example 1: textContent vs innerText vs innerHTML
let titleElement = document.getElementById('page-title');
let descriptionElement = document.getElementById('description');

// textContent - Gets/sets all text, including hidden elements
console.log('textContent:', descriptionElement.textContent); 
// "This is the original description."

// innerHTML - Gets/sets HTML content
console.log('innerHTML:', descriptionElement.innerHTML); 
// "This is the <strong>original</strong> description."

// innerText - Gets/sets visible text only
console.log('innerText:', descriptionElement.innerText); 
// "This is the original description."

// Example 2: Changing content
titleElement.textContent = 'New Amazing Title!';
descriptionElement.innerHTML = 'This is the <em>updated</em> description with <strong>HTML formatting</strong>.';

// Example 3: Building dynamic content
let outputDiv = document.getElementById('output');
let userName = 'Alice';
let userScore = 95;

// Using template literals for dynamic content
outputDiv.innerHTML = `
    <h3>Welcome, ${userName}!</h3>
    <p>Your current score is: <span style="color: green; font-weight: bold;">${userScore}/100</span></p>
    <p>Status: ${userScore >= 90 ? 'Excellent!' : 'Keep improving!'}</p>
`;

// Safe way to add text content (prevents XSS attacks)
let userInput = '<script>alert("hacked!")</script>'; // Malicious input
let safeElement = document.createElement('p');
safeElement.textContent = userInput; // This will show the text, not execute the script
outputDiv.appendChild(safeElement);







// Example 1: Getting and setting input values
let usernameInput = document.getElementById('username');
let emailInput = document.getElementById('email');
let countrySelect = document.getElementById('country');
let messageTextarea = document.getElementById('message');

// Reading current values
console.log('Username:', usernameInput.value); // "john_doe"
console.log('Email:', emailInput.value); // "" (empty initially)
console.log('Selected country:', countrySelect.value); // "" (no selection)

// Setting values programmatically
emailInput.value = 'john@example.com';
countrySelect.value = 'us'; // This will select "United States"
messageTextarea.value = 'Hello, this is a test message!';

// Example 2: Form validation and processing
let submitButton = document.getElementById('submit-btn');
// let outputDiv = document.getElementById('form-output');

submitButton.addEventListener('click', function() {
    // Collect all form data
    let formData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        country: countrySelect.value,
        message: messageTextarea.value.trim()
    };
    
    // Basic validation
    let errors = [];
    if (!formData.username) errors.push('Username is required');
    if (!formData.email) errors.push('Email is required');
    if (!formData.country) errors.push('Please select a country');
    if (!formData.message) errors.push('Message cannot be empty');
    
    // Display results
    if (errors.length > 0) {
        outputDiv.innerHTML = `
            <div style="color: red;">
                <h4>Please fix these errors:</h4>
                <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
            </div>
        `;
        // demonstration:
        // errors.map((error) => {
        //   let newUl =  `<li>${error}</li>`;
        //   return newUl;
        // })
    } else {
        outputDiv.innerHTML = `
            <div style="color: green;">
                <h4>Form submitted successfully!</h4>
                <p><strong>Username:</strong> ${formData.username}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Country:</strong> ${formData.country}</p>
                <p><strong>Message:</strong> ${formData.message}</p>
            </div>
        `;
    }
});

// Example 3: Real-time input monitoring
usernameInput.addEventListener('input', function() {
    let username = this.value;
    let feedback = document.getElementById('username-feedback') || document.createElement('div');
    feedback.id = 'username-feedback';
    
    if (username.length < 3) {
        feedback.textContent = 'Username must be at least 3 characters';
        feedback.style.color = 'red';
    } else if (username.length > 20) {
        feedback.textContent = 'Username must be less than 20 characters';
        feedback.style.color = 'red';
    } else {
        feedback.textContent = 'Username looks good!';
        feedback.style.color = 'green';
    }
    
    // Add feedback after the input if it doesn't exist
    if (!document.getElementById('username-feedback')) {
        usernameInput.parentNode.insertBefore(feedback, usernameInput.nextSibling);
    }
});



// Example 1: Exploring element properties
let element = document.getElementById('page-title');

console.log('=== Element Properties ===');
console.log('Tag name:', element.tagName); // 'H1'
console.log('ID:', element.id); // 'page-title'
console.log('Class name:', element.className); // String of all classes
console.log('Class list:', element.classList); // DOMTokenList (more useful)

// Element dimensions and position
console.log('=== Element Dimensions ===');
console.log('Offset width:', element.offsetWidth); // Total width including padding, border
console.log('Offset height:', element.offsetHeight); // Total height including padding, border
console.log('Client width:', element.clientWidth); // Width minus scrollbar
console.log('Client height:', element.clientHeight); // Height minus scrollbar
console.log('Scroll width:', element.scrollWidth); // Total scrollable width
console.log('Scroll height:', element.scrollHeight); // Total scrollable height

// Example 2: Parent, children, and sibling navigation
let _container = document.querySelector('.container');

console.log('=== DOM Navigation ===');
console.log('Parent element:', _container.parentElement);
console.log('Parent node:', _container.parentNode); // Usually same as parentElement
console.log('Children:', _container.children); // HTMLCollection of child elements
console.log('Child nodes:', _container.childNodes); // NodeList including text nodes
console.log('First child element:', _container.firstElementChild);
console.log('Last child element:', _container.lastElementChild);
console.log('Next sibling element:', _container.nextElementSibling);
console.log('Previous sibling element:', _container.previousElementSibling);

// Example 3: Practical DOM navigation
function analyzeElement(element) {
    let analysis = {
        tag: element.tagName.toLowerCase(),
        id: element.id || 'no-id',
        classes: Array.from(element.classList),
        childCount: element.children.length,
        textContent: element.textContent.substring(0, 50) + (element.textContent.length > 50 ? '...' : ''),
        hasParent: !!element.parentElement,
        siblings: {
            previous: element.previousElementSibling ? element.previousElementSibling.tagName : 'none',
            next: element.nextElementSibling ? element.nextElementSibling.tagName : 'none'
        }
    };
    
    return analysis;
}

// Use the analyzer
let titleAnalysis = analyzeElement(titleElement);
console.log('Title analysis:', titleAnalysis);

// Find all headings and analyze them
let allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
allHeadings.forEach((heading, index) => {
    console.log(`Heading ${index + 1}:`, analyzeElement(heading));
});















// Example 1: Direct style manipulation
let demoBox = document.getElementById('style-demo');
let redBtn = document.getElementById('style-btn-1');
let bigBtn = document.getElementById('style-btn-2');
let toggleBtn = document.getElementById('style-btn-3');
let resetBtn = document.getElementById('reset-style');

// Changing individual CSS properties
redBtn.addEventListener('click', function() {
    demoBox.style.backgroundColor = 'red';
    demoBox.style.color = 'white';
    demoBox.style.border = '3px solid darkred';
});

// Multiple style changes
bigBtn.addEventListener('click', function() {
    demoBox.style.fontSize = '24px';
    demoBox.style.padding = '40px';
    demoBox.style.borderRadius = '15px';
    demoBox.style.transform = 'scale(1.1)';
});

// Reading and toggling styles
toggleBtn.addEventListener('click', function() {
    // Check current visibility
    let currentDisplay = window.getComputedStyle(demoBox).display;

    
    if (currentDisplay === 'none') {
        demoBox.style.display = 'block';
        toggleBtn.textContent = 'Hide Box';
    } else {
        demoBox.style.display = 'none';
        toggleBtn.textContent = 'Show Box';
    }
});

// Example 2: Working with CSS custom properties (CSS variables)
document.documentElement.style.setProperty('--main-color', '#ff6b6b');
document.documentElement.style.setProperty('--secondary-color', '#4ecdc4');

// Apply custom properties
demoBox.style.backgroundColor = 'var(--main-color)';
demoBox.style.borderColor = 'var(--secondary-color)';

// Example 3: Advanced styling techniques
function createGradientBackground(element, color1, color2) {
    element.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
}

function animateElement(element, property, from, to, duration = 1000) {
    let start = performance.now();
    
    function animate(currentTime) {
        let progress = (currentTime - start) / duration;
        
        if (progress < 1) {
            let currentValue = from + (to - from) * progress;
            element.style[property] = currentValue + 'px';
            requestAnimationFrame(animate);
        } else {
            element.style[property] = to + 'px';
        }
    }
    
    requestAnimationFrame(animate);
}

// Usage of advanced functions
createGradientBackground(demoBox, '#ff9a9e', '#fecfef');
// animateElement(demoBox, 'width', 200, 400); // Animate width from 200px to 400px

// Reset all styles
resetBtn.addEventListener('click', function() {
    demoBox.style.cssText = ''; // Clear all inline styles
    toggleBtn.textContent = 'Toggle Visibility';
});










// Example 1: Basic class manipulation
let classDemo = document.getElementById('class-demo');
let addBtn = document.getElementById('add-class');
let removeBtn = document.getElementById('remove-class');
let toggleBtn1 = document.getElementById('toggle-class');
let checkBtn = document.getElementById('check-class');
let infoDiv = document.getElementById('class-info');

addBtn.addEventListener('click', function() {
    classDemo.classList.add('highlight');
    updateClassInfo();
});

removeBtn.addEventListener('click', function() {
    classDemo.classList.remove('highlight');
    updateClassInfo();
});

toggleBtn1.addEventListener('click', function() {
    classDemo.classList.toggle('active');
    updateClassInfo();
    
    // Update button text based on state
    if (classDemo.classList.contains('active')) {
        toggleBtn1.textContent = 'Remove Active';
    } else {
        toggleBtn1.textContent = 'Add Active';
    }
});

// Example 2: Class checking and information
function updateClassInfo() {
    let classes = Array.from(classDemo.classList);
    let hasHighlight = classDemo.classList.contains('highlight');
    let hasActive = classDemo.classList.contains('active');
    
    infoDiv.innerHTML = `
        <h4>Current Classes:</h4>
        <p><strong>All classes:</strong> ${classes.length > 0 ?
             classes.join(', ') : 'none'}</p>
        <p><strong>Has highlight:</strong> ${hasHighlight}</p>
        <p><strong>Has active:</strong> ${hasActive}</p>
        <p><strong>Total classes:</strong> ${classes.length}</p>
    `;
}

checkBtn.addEventListener('click', updateClassInfo);

// Example 3: Advanced class management
function createThemeToggle() {
    let themes = ['light', 'dark', 'blue', 'green'];
    let currentTheme = 0;
    
    let themeBtn = document.createElement('button');
    themeBtn.textContent = 'Change Theme';
    themeBtn.addEventListener('click', function() {
        // Remove all theme classes
        themes.forEach(theme => {
            classDemo.classList.remove(`theme-${theme}`);
        });
        
        // Add next theme
        currentTheme = (currentTheme + 1) % themes.length;
        classDemo.classList.add(`theme-${themes[currentTheme]}`);
        
        updateClassInfo();
    });
    
    document.querySelector('.controls').appendChild(themeBtn);
}

// Multiple class operations
function setElementState(element, state) {
    // Define state configurations
    let states = {
        default: ['box'],
        highlighted: ['box', 'highlight'],
        active: ['box', 'active'],
        featured: ['box', 'highlight', 'active', 'large']
    };
    
    // Clear all classes and apply new ones
    element.className = states[state].join(' ');
}

// Create state buttons
let states = ['default', 'highlighted', 'active', 'featured'];
states.forEach(state => {
    let btn = document.createElement('button');
    btn.textContent = `Set ${state}`;
    btn.addEventListener('click', () => {
        setElementState(classDemo, state);
        updateClassInfo();
    });
    document.querySelector('.controls').appendChild(btn);
});

createThemeToggle();
updateClassInfo(); // Initial update





// Students complete this project using concepts from Session 1
// - Select elements by ID
// - Change text content based on user input
// - Toggle CSS classes for themes
// - Validate input before updating
// - Use attributes to store original values


// Select elements by their ID
const profileName = document.getElementById('profile-name');
const profileBio = document.getElementById('profile-bio');
const nameInput = document.getElementById('name-input');
const bioInput = document.getElementById('bio-input');
const updateButton = document.getElementById('update-profile');
const themeButton = document.getElementById('toggle-theme');
const profileCard = document.getElementById('profile-card');



// Store original values as data attributes
profileName.setAttribute('data-original', profileName.textContent);
profileBio.setAttribute('data-original', profileBio.textContent);

function validateInput(input) {
    // Remove extra spaces and check if not empty
    const trimmed = input.trim();
    return trimmed.length > 0 && trimmed.length <= 50; // reasonable length limit
}


themeButton.addEventListener('click', function() {
    profileCard.classList.toggle('dark-theme');
    
    // Update button text based on current theme
    if (profileCard.classList.contains('dark-theme')) {
        themeButton.textContent = 'Light Theme';
    } else {
        themeButton.textContent = 'Dark Theme';
    }
});




// FLAGS IN JS

let isVisible = false;

function toggleMenu() {
    isVisible = !isVisible;
    const menu = document.getElementById('menu');
    menu.style.display = isVisible ? 'block' : 'none';
}

function validateForm() {
    let isValid = true;
    
    if (document.getElementById('email').value === '') {
        isValid = false;
        showError('Email required');
    }
    
    if (document.getElementById('password').value.length < 6) {
        isValid = false;
        showError('Password too short');
    }
    
    return isValid; // Only submit if all checks pass
}