// ============================================================================
// JAVASCRIPT ADVANCED FUNDAMENTALS
// From Functions to Building Interactive Applications
// ============================================================================
// This guide takes you beyond basic data structures to:
// - Creating reusable code with functions
// - Making decisions with conditionals
// - Repeating actions with loops
// - Building algorithms
// - Handling user interactions
// - Manipulating the page with DOM
// ============================================================================


// ============================================================================
// PHASE 1: UNDERSTANDING FUNCTIONS
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PHASE 1: FUNCTIONS - Reusable Blocks of Code");
console.log("Software Fundamental: Code Reusability & DRY Principle");
console.log("=".repeat(70));

// PROBLEM: We're repeating code
console.log("\n❌ WITHOUT FUNCTIONS (Repetitive Code):");
console.log("Student 1 GPA: 3.8");
console.log("Student 1 GPA Status: Excellent");

console.log("Student 2 GPA: 3.2");
console.log("Student 2 GPA Status: Good");

console.log("Student 3 GPA: 2.5");
console.log("Student 3 GPA Status: Average");

// ✅ SOLUTION: Use functions!

function displayStudentGPA(name, gpa) {
    console.log(name + " GPA: " + gpa);
    
    if (gpa >= 3.5) {
        console.log(name + " Status: Excellent");
    } else if (gpa >= 3.0) {
        console.log(name + " Status: Good");
    } else {
        console.log(name + " Status: Average");
    }
}

console.log("\n✅ WITH FUNCTIONS (Reusable Code):");
displayStudentGPA("Student 1", 3.8);
displayStudentGPA("Student 2", 3.2);
displayStudentGPA("Student 3", 2.5);

// KEY INSIGHT: We wrote the logic ONCE, used it THREE TIMES!
// This is the DRY Principle (Don't Repeat Yourself)


// ============================================================================
// PHASE 2: FUNCTION ANATOMY
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PHASE 2: How Functions Work");
console.log("Software Fundamental: Modularity & Abstraction");
console.log("=".repeat(70));

console.log("\n📝 Function Structure Breakdown:\n");

// Function definition
function greetStudent(studentName, grade) {
    // Function body - code that runs when function is called
    const greeting = "Hello, " + studentName + "!";
    const message = "You are in grade " + grade;
    
    return {greeting: greeting, message: message};
}

// Function call (invocation)
const result = greetStudent("Obi", 11);
console.log("Function call result:", result);


// FUNCTION COMPONENTS EXPLAINED:
console.log("\n🔍 Components of a Function:\n");
console.log("1. FUNCTION NAME: greetStudent (identifies what it does)");
console.log("2. PARAMETERS: studentName, grade (inputs the function receives)");
console.log("3. FUNCTION BODY: Code inside { } (what the function does)");
console.log("4. RETURN VALUE: What the function gives back");
console.log("5. FUNCTION CALL: greetStudent(...) (actually running it)");


// ============================================================================
// PHASE 3: PARAMETERS & RETURN VALUES
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PHASE 3: Parameters & Return Values");
console.log("Software Fundamental: Inputs, Processing, Outputs");
console.log("=".repeat(70));

console.log("\n📥 EXAMPLE 1: Parameters (Inputs)");

// Function that takes no parameters
function getCurrentYear() {
    return 2024;
}
console.log("Year (no parameters):", getCurrentYear());

// Function with one parameter
function isStudentExcellent(gpa) {
    return gpa >= 3.5;
}
console.log("Is GPA 3.8 excellent?", isStudentExcellent(3.8));
console.log("Is GPA 3.0 excellent?", isStudentExcellent(3.0));

// Function with multiple parameters
function calculateFinalGrade(homework, midterm, final) {
    // Weighted calculation: 20% homework, 30% midterm, 50% final
    const finalGrade = (homework * 0.2) + (midterm * 0.3) + (final * 0.5);
    return finalGrade;
}
console.log("\n📊 Calculate Final Grade:");
console.log("Student with (90, 85, 92):", calculateFinalGrade(90, 85, 92));
console.log("Student with (75, 80, 88):", calculateFinalGrade(75, 80, 88));


console.log("\n📤 EXAMPLE 2: Return Values (Outputs)");

// Function that returns a single value
function doubleNumber(num) {
    return num * 2;
}
console.log("Double of 5:", doubleNumber(5));

// Function that returns an object
function getUserProfile(id) {
    return {
        id: id,
        name: "Obi Udeh",
        email: "obi@0xverse.edu",
        gpa: 3.8
    };
}
console.log("\nUser Profile:", getUserProfile(101));

// Function that returns an array
function getTopStudents() {
    return [
        "Fatima (4.0)",
        "Zainab (3.9)",
        "Obi (3.8)"
    ];
}
console.log("\nTop Students:", getTopStudents());

// Function with no return value (does something but returns nothing)
function announceClass() {
    console.log("📣 Welcome to 0xVerse Academy!");
    console.log("📣 Let's learn JavaScript!");
    // No return statement = returns undefined
}
announceClass();


// ============================================================================
// PHASE 4: REAL-WORLD FUNCTION EXAMPLES
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PHASE 4: Real-World Function Applications");
console.log("Software Fundamental: Building Practical Systems");
console.log("=".repeat(70));

// Example 1: Student Grade Processing System
console.log("\n✏️ EXAMPLE 1: Grade Processing System\n");

function processStudentGrades(studentData) {
    // Calculate average
    const totalGrades = studentData.grades.reduce((sum, grade) => sum + grade, 0);
    const average = totalGrades / studentData.grades.length;
    
    // Determine letter grade
    let letterGrade;
    if (average >= 90) letterGrade = "A";
    else if (average >= 80) letterGrade = "B";
    else if (average >= 70) letterGrade = "C";
    else letterGrade = "F";
    
    // Return processed data
    return {
        name: studentData.name,
        grades: studentData.grades,
        average: average.toFixed(2),
        letterGrade: letterGrade,
        passed: average >= 70
    };
}

const obi = {
    name: "Obi",
    grades: [85, 92, 88, 90]
};

const result1 = processStudentGrades(obi);
console.log("Student:", result1.name);
console.log("All grades:", result1.grades);
console.log("Average:", result1.average);
console.log("Letter grade:", result1.letterGrade);
console.log("Passed:", result1.passed);


// Example 2: School Attendance System
console.log("\n📋 EXAMPLE 2: Attendance System\n");

function markAttendance(student, present) {
    return {
        studentName: student,
        date: new Date().toLocaleDateString(),
        present: present,
        status: present ? "✓ Present" : "✗ Absent"
    };
}

const attendance1 = markAttendance("Ahmed", true);
const attendance2 = markAttendance("Zainab", false);

console.log("Record 1:", attendance1);
console.log("Record 2:", attendance2);


// Example 3: Course Registration System
console.log("\n📚 EXAMPLE 3: Course Registration\n");

function registerStudent(studentName, courses) {
    const maxCourses = 5;
    
    if (courses.length > maxCourses) {
        return {
            success: false,
            message: "Too many courses! Maximum is " + maxCourses,
            coursesRequested: courses.length
        };
    }
    
    return {
        success: true,
        message: "Registration successful!",
        studentName: studentName,
        enrolledCourses: courses,
        numberOfCourses: courses.length
    };
}

const registration1 = registerStudent("Obi", ["Math", "Physics", "Chemistry"]);
const registration2 = registerStudent("Fatima", ["Math", "Physics", "Chemistry", "English", "Biology", "History"]);

console.log("Registration 1:", registration1);
console.log("Registration 2:", registration2);


// ============================================================================
// PHASE 5: CONDITIONALS - MAKING DECISIONS
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PHASE 5: CONDITIONALS - Making Decisions Based on Data");
console.log("Software Fundamental: Logic & Control Flow");
console.log("=".repeat(70));

console.log("\n🔄 EXAMPLE 1: If / Else If / Else\n");

function checkGradeQuality(gpa) {
    if (gpa >= 3.7) {
        return "🌟 Excellent - Honors Student";
    } else if (gpa >= 3.3) {
        return "✓ Good - Above Average";
    } else if (gpa >= 3.0) {
        return "→ Satisfactory - Meeting Requirements";
    } else if (gpa >= 2.0) {
        return "⚠ Needs Improvement";
    } else {
        return "❌ Below Minimum";
    }
}

console.log("GPA 3.9:", checkGradeQuality(3.9));
console.log("GPA 3.5:", checkGradeQuality(3.5));
console.log("GPA 3.1:", checkGradeQuality(3.1));
console.log("GPA 2.5:", checkGradeQuality(2.5));


console.log("\n🔀 EXAMPLE 2: Switch Statement\n");

function describeDay(dayNumber) {
    switch(dayNumber) {
        case 1:
            return "Monday - Start of the week";
        case 2:
            return "Tuesday - Keep going";
        case 3:
            return "Wednesday - Halfway there";
        case 4:
            return "Thursday - Almost Friday";
        case 5:
            return "Friday - Fun day!";
        case 6:
            return "Saturday - Weekend!";
        case 7:
            return "Sunday - Rest day";
        default:
            return "Invalid day";
    }
}

console.log(describeDay(1));
console.log(describeDay(5));
console.log(describeDay(7));


console.log("\n⚡ EXAMPLE 3: Ternary Operator (Shorthand If/Else)\n");

function isStudentEligible(gpa, attendancePercent) {
    // Instead of: if (condition) return A; else return B;
    // Use: condition ? A : B;
    
    const gpaPassed = gpa >= 2.0 ? "✓" : "✗";
    const attendancePassed = attendancePercent >= 80 ? "✓" : "✗";
    
    return {
        gpaRequirement: gpaPassed,
        attendanceRequirement: attendancePassed,
        canGraduate: (gpa >= 2.0 && attendancePercent >= 80) ? "Yes" : "No"
    };
}

console.log("Student A (3.8 GPA, 95% attendance):", isStudentEligible(3.8, 95));
console.log("Student B (1.8 GPA, 90% attendance):", isStudentEligible(1.8, 90));


// ============================================================================
// PHASE 6: LOOPS - REPEATING ACTIONS
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PHASE 6: LOOPS - Repeating Code for Collections");
console.log("Software Fundamental: Iteration & Automation at Scale");
console.log("=".repeat(70));

console.log("\n📊 EXAMPLE 1: For Loop - Process Array by Index\n");

const grades = [85, 92, 78, 95, 88];

console.log("Using traditional for loop:");
for (let i = 0; i < grades.length; i++) {
    console.log("Grade " + (i + 1) + ": " + grades[i]);
}


console.log("\n🔄 EXAMPLE 2: forEach - Modern Way to Loop Through Arrays\n");

console.log("Using forEach (cleaner):");
grades.forEach(function(grade, index) {
    console.log("Grade " + (index + 1) + ": " + grade);
});


console.log("\n📈 EXAMPLE 3: Real-World Loop - Grade Analysis\n");

function analyzeGrades(gradesArray) {
    let total = 0;
    let highest = gradesArray[0];
    let lowest = gradesArray[0];
    
    // Loop through all grades
    for (let i = 0; i < gradesArray.length; i++) {
        const grade = gradesArray[i];
        total += grade;
        
        if (grade > highest) highest = grade;
        if (grade < lowest) lowest = grade;
    }
    
    const average = total / gradesArray.length;
    
    return {
        totalGrades: gradesArray.length,
        average: average.toFixed(2),
        highest: highest,
        lowest: lowest,
        range: highest - lowest
    };
}

const studentGrades = [85, 92, 78, 95, 88, 91, 86];
console.log("Grade Analysis:", analyzeGrades(studentGrades));


console.log("\n🔍 EXAMPLE 4: Processing Data Structures\n");

const students = [
    {name: "Obi", gpa: 3.8},
    {name: "Zainab", gpa: 3.9},
    {name: "Ahmed", gpa: 3.5},
    {name: "Fatima", gpa: 4.0}
];

console.log("All students:");
students.forEach(function(student) {
    const status = student.gpa >= 3.7 ? "🌟 Honors" : "✓ Good";
    console.log("  " + student.name + " (GPA: " + student.gpa + ") - " + status);
});

// Count excellent students
let excellentCount = 0;
students.forEach(function(student) {
    if (student.gpa >= 3.7) {
        excellentCount++;
    }
});
console.log("\nTotal honors students: " + excellentCount);


// ============================================================================
// PHASE 7: COMBINING FUNCTIONS, CONDITIONALS & LOOPS
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PHASE 7: Building Complete Systems");
console.log("Software Fundamental: Composing Complex Behavior");
console.log("=".repeat(70));

console.log("\n🏫 EXAMPLE: Complete Grade Management System\n");

const schoolData = {
    students: [
        {id: 1, name: "Obi", grades: [85, 92, 88, 90]},
        {id: 2, name: "Zainab", grades: [95, 93, 91, 94]},
        {id: 3, name: "Ahmed", grades: [78, 82, 80, 85]},
        {id: 4, name: "Fatima", grades: [98, 97, 99, 96]}
    ]
};

function getStudentAverages(schoolData) {
    const results = [];
    
    // Loop through each student
    schoolData.students.forEach(function(student) {
        // Calculate average using loop
        let total = 0;
        student.grades.forEach(function(grade) {
            total += grade;
        });
        const average = total / student.grades.length;
        
        // Determine status using conditional
        let status;
        if (average >= 95) status = "🌟 Outstanding";
        else if (average >= 90) status = "⭐ Excellent";
        else if (average >= 85) status = "✓ Good";
        else if (average >= 80) status = "→ Satisfactory";
        else status = "⚠ Needs Improvement";
        
        // Store result
        results.push({
            name: student.name,
            average: average.toFixed(2),
            status: status
        });
    });
    
    return results;
}

const classResults = getStudentAverages(schoolData);
console.log("Class Grade Report:");
classResults.forEach(function(result) {
    console.log("  " + result.name + ": " + result.average + " - " + result.status);
});


// ============================================================================
// PHASE 8: INTRODUCTION TO ALGORITHMS
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PHASE 8: Introduction to Algorithms");
console.log("Software Fundamental: Problem-Solving & Optimization");
console.log("=".repeat(70));

console.log("\n🔍 EXAMPLE 1: Search Algorithm - Find Student by Name\n");

function findStudentByName(students, searchName) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].name === searchName) {
            return students[i];  // Found! Return the student
        }
    }
    return null;  // Not found
}

const classStudents = [
    {id: 1, name: "Obi", gpa: 3.8},
    {id: 2, name: "Zainab", gpa: 3.9},
    {id: 3, name: "Ahmed", gpa: 3.5}
];

console.log("Search for 'Zainab':", findStudentByName(classStudents, "Zainab"));
console.log("Search for 'Hassan':", findStudentByName(classStudents, "Hassan"));


console.log("\n📊 EXAMPLE 2: Filter Algorithm - Get Only High Performers\n");

function getTopPerformers(students, minimumGPA) {
    const topStudents = [];
    
    students.forEach(function(student) {
        if (student.gpa >= minimumGPA) {
            topStudents.push(student);
        }
    });
    
    return topStudents;
}

const honors = getTopPerformers(classStudents, 3.7);
console.log("Students with GPA >= 3.7:");
honors.forEach(function(student) {
    console.log("  " + student.name + " - GPA: " + student.gpa);
});


console.log("\n📈 EXAMPLE 3: Sort Algorithm - Order by Performance\n");

function sortStudentsByGPA(students) {
    // Create a copy to avoid modifying original
    const sorted = [...students];
    
    // Simple bubble sort (educational, not optimized)
    for (let i = 0; i < sorted.length; i++) {
        for (let j = 0; j < sorted.length - 1; j++) {
            if (sorted[j].gpa < sorted[j + 1].gpa) {
                // Swap
                const temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
            }
        }
    }
    
    return sorted;
}

console.log("Students sorted by GPA (highest first):");
const sortedStudents = sortStudentsByGPA(classStudents);
sortedStudents.forEach(function(student) {
    console.log("  " + student.name + " - GPA: " + student.gpa);
});


// ============================================================================
// PHASE 9: ARROW FUNCTIONS - MODERN JAVASCRIPT
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PHASE 9: Arrow Functions - Modern Syntax");
console.log("Software Fundamental: Code Style Evolution");
console.log("=".repeat(70));

console.log("\n➡️ Traditional function vs Arrow Function:\n");

// Traditional function
function addNumbers(a, b) {
    return a + b;
}
console.log("Traditional: 5 + 3 =", addNumbers(5, 3));

// Arrow function (same thing, cleaner syntax)
const addNumbersArrow = (a, b) => a + b;
console.log("Arrow function: 5 + 3 =", addNumbersArrow(5, 3));

// Arrow functions with loops (forEach)
console.log("\nLooping with arrow functions:");
const grades2 = [85, 92, 88];
grades2.forEach(grade => console.log("  Grade: " + grade));

// Arrow functions that return objects
const createStudent = (name, gpa) => ({
    name: name,
    gpa: gpa,
    status: gpa >= 3.5 ? "Honors" : "Good"
});

console.log("\nCreated with arrow function:", createStudent("Alex", 3.8));


// ============================================================================
// PHASE 10: REAL-WORLD APPLICATION
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PHASE 10: Building a Complete Application");
console.log("Software Fundamental: Putting It All Together");
console.log("=".repeat(70));

console.log("\n🎓 Complete Student Management System:\n");

class StudentGradeSystem {
    constructor() {
        this.students = [];
    }
    
    addStudent(name, grades) {
        this.students.push({
            name: name,
            grades: grades,
            average: this.calculateAverage(grades)
        });
    }
    
    calculateAverage(grades) {
        const sum = grades.reduce((acc, grade) => acc + grade, 0);
        return (sum / grades.length).toFixed(2);
    }
    
    getStudentsByPerformance(level) {
        return this.students.filter(student => {
            const avg = parseFloat(student.average);
            
            if (level === "excellent") return avg >= 90;
            if (level === "good") return avg >= 80 && avg < 90;
            if (level === "satisfactory") return avg >= 70 && avg < 80;
            return avg < 70;
        });
    }
    
    getClassAverage() {
        const sum = this.students.reduce((acc, student) => {
            return acc + parseFloat(student.average);
        }, 0);
        return (sum / this.students.length).toFixed(2);
    }
    
    printReport() {
        console.log("📊 CLASS REPORT");
        console.log("─".repeat(50));
        
        this.students.forEach((student, index) => {
            console.log((index + 1) + ". " + student.name + 
                       " - Average: " + student.average +
                       " - Grades: " + student.grades.join(", "));
        });
        
        console.log("─".repeat(50));
        console.log("Class Average: " + this.getClassAverage());
        
        const excellent = this.getStudentsByPerformance("excellent");
        console.log("Excellent Students: " + excellent.map(s => s.name).join(", "));
    }
}

// Use the system
const system = new StudentGradeSystem();
system.addStudent("Obi", [85, 92, 88, 90]);
system.addStudent("Zainab", [95, 93, 91, 94]);
system.addStudent("Ahmed", [78, 82, 80, 85]);
system.printReport();


// ============================================================================
// PHASE 11: KEY CONCEPTS SUMMARY
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("KEY SOFTWARE FUNDAMENTALS LEARNED");
console.log("=".repeat(70));

console.log(`
✅ Phase 1-2: FUNCTIONS
  • Code reusability (DRY principle)
  • Functions = named blocks of reusable code
  • Parameters = inputs, Return values = outputs
  
✅ Phase 3: REAL-WORLD FUNCTIONS
  • Processing data
  • Validation and business logic
  • Organizing code logically
  
✅ Phase 4-5: CONDITIONALS
  • If/Else for decision making
  • Switch for multiple options
  • Ternary operator for simple conditions
  
✅ Phase 6: LOOPS
  • For loops for controlled iteration
  • forEach for clean array processing
  • Processing collections at scale
  
✅ Phase 7: COMBINING CONCEPTS
  • Real systems use all concepts together
  • Functions contain loops and conditionals
  
✅ Phase 8: ALGORITHMS
  • Search algorithms (find items)
  • Filter algorithms (get matching items)
  • Sort algorithms (order items)
  
✅ Phase 9: MODERN SYNTAX
  • Arrow functions = cleaner code
  • Evolution of JavaScript style
  
✅ Phase 10: COMPLETE SYSTEMS
  • Organizing code in classes/objects
  • Multiple methods working together
  • Building actual applications

SOFTWARE ENGINEERING PRINCIPLES:
  🎯 DRY (Don't Repeat Yourself) - Functions eliminate repetition
  🎯 Modularity - Break problems into smaller functions
  🎯 Reusability - Write once, use many times
  🎯 Readability - Clear function names and structure
  🎯 Maintainability - Easy to update and fix
  🎯 Scalability - Handle growing data efficiently
  🎯 Abstraction - Hide complexity behind simple interfaces
`);

console.log("\n" + "=".repeat(70));
console.log("COMING NEXT:");
console.log("=".repeat(70));
console.log(`
→ DOM MANIPULATION - Changing the HTML page with JavaScript
→ EVENTS - Responding to user clicks, typing, etc.
→ ASYNCHRONOUS JAVASCRIPT - Handling delays and network requests
→ APIs - Getting data from servers
→ FRAMEWORKS - React, Vue (building complex UIs efficiently)
→ BACKEND - Node.js (running JavaScript on servers)
→ DATABASES - Storing and retrieving data at scale
→ FULL STACK - Building complete web applications
`);

console.log("\n" + "=".repeat(70));
console.log("✨ You now understand the building blocks of all software!");
console.log("=".repeat(70) + "\n");
