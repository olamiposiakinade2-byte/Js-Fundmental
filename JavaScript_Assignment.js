// ============================================================================
// JAVASCRIPT ADVANCED FUNDAMENTALS - ASSIGNMENT
// Functions, Conditionals, and Loops
// ============================================================================
// Instructions: Complete all sections. Read each question carefully and
// implement the required functions. Test your code with the provided examples.
// ============================================================================


// ============================================================================
// PART 1: FUNCTIONS & REUSABILITY (25 Points)
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PART 1: FUNCTIONS & REUSABILITY");
console.log("=".repeat(70));

// QUESTION 1.1: Function Anatomy (10 Points)
// ============================================================================
// Write a function called calculateStudentScore that takes three parameters:
// - attendance (0-100)
// - homework (0-100)  
// - exam (0-100)
// Use these weights:
// - Attendance: 20%
// - Homework: 30%
// - Exam: 50%
//
// Return an object with:
// - finalScore: the calculated score
// - letterGrade: A (90+), B (80-89), C (70-79), F (below 70)
//
// Example: calculateStudentScore(95, 88, 92) 
// Should return: { finalScore: 90.6, letterGrade: 'A' }

function calculateStudentScore(attendance, homework, exam) {
    const finalScore = (attendance * 0.2) + (homework * 0.3) + (exam * 0.5);
    let letterGrade;

    if (finalScore >= 90) {
        letterGrade = 'A';
    } else if (finalScore >= 80) {
        letterGrade = 'B';
    } else if (finalScore >= 70) {
        letterGrade = 'C';
    } else {
        letterGrade = 'F';
    }

    return {
        finalScore: finalScore,
        letterGrade: letterGrade
    };
}

console.log("Q1.1 Test 1:", calculateStudentScore(95, 88, 92));
console.log("Q1.1 Test 2:", calculateStudentScore(85, 75, 80));
console.log("Q1.1 Test 3:", calculateStudentScore(70, 68, 65));


// QUESTION 1.2: Practical Application (15 Points)
// ============================================================================
// Create a function called gradeMultipleStudents that takes:
// - studentsArray: array of student objects with properties: name, attendance, homework, exam
//
// This function should:
// 1. Loop through all students
// 2. Call calculateStudentScore for each student
// 3. Return an array of objects with: name, finalScore, letterGrade
//
// Example input:
// [
//   { name: "Obi", attendance: 95, homework: 88, exam: 92 },
//   { name: "Zainab", attendance: 88, homework: 92, exam: 95 }
// ]
//
// Example output:
// [
//   { name: "Obi", finalScore: 90.6, letterGrade: "A" },
//   { name: "Zainab", finalScore: 92.1, letterGrade: "A" }
// ]

function gradeMultipleStudents(studentsArray) {
    const gradedStudents = [];

    for (let i = 0; i < studentsArray.length; i++) {
        const student = studentsArray[i];
        const score = calculateStudentScore(
            student.attendance,
            student.homework,
            student.exam
        );

        gradedStudents.push({
            name: student.name,
            finalScore: score.finalScore,
            letterGrade: score.letterGrade
        });
    }

    return gradedStudents;
}

// Test your function with sample students
const sampleStudents1 = [
    { name: "Ahmed", attendance: 92, homework: 85, exam: 88 },
    { name: "Fatima", attendance: 98, homework: 95, exam: 96 },
    { name: "Kwame", attendance: 78, homework: 72, exam: 75 }
];

 console.log("Q1.2 Test:", gradeMultipleStudents(sampleStudents1));




// ============================================================================
// PART 2: CONDITIONALS & DECISION MAKING (25 Points)
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PART 2: CONDITIONALS & DECISION MAKING");
console.log("=".repeat(70));

// QUESTION 2.1: Complex If/Else Logic (8 Points)
// ============================================================================
// Write a function called studentAdmissionStatus that takes:
// - finalGPA (0-4.0)
// - entranceExamScore (0-100)
//
// Admission rules:
// - Requires: GPA >= 3.0 AND exam score >= 75
// - If either requirement is not met, student is not admitted
//
// Return an object with:
// - admitted: true/false
// - reason: string explaining the decision
//
// Examples:
// - studentAdmissionStatus(3.5, 82) → { admitted: true, reason: "Congratulations! You meet all requirements." }
// - studentAdmissionStatus(2.8, 85) → { admitted: false, reason: "Your GPA is below 3.0" }
// - studentAdmissionStatus(3.2, 72) → { admitted: false, reason: "Your exam score is below 75" }
// - studentAdmissionStatus(2.5, 70) → { admitted: false, reason: "Your GPA and exam score do not meet requirements" }

function studentAdmissionStatus(finalGPA, entranceExamScore) {
    if (finalGPA >= 3.0 && entranceExamScore >= 75) {
        return {
            admitted: true,
            reason: "Congratulations! You meet all requirements."
        };
    } else if (finalGPA < 3.0 && entranceExamScore < 75) {
        return {
            admitted: false,
            reason: "Your GPA and exam score do not meet requirements"
        };
    } else if (finalGPA < 3.0) {
        return {
            admitted: false,
            reason: "Your GPA is below 3.0"
        };
    } else {
        return {
            admitted: false,
            reason: "Your exam score is below 75"
        };
    }
}

// Test your function
// console.log("Q2.1 Test 1:", studentAdmissionStatus(3.5, 82));
// console.log("Q2.1 Test 2:", studentAdmissionStatus(2.8, 85));
// console.log("Q2.1 Test 3:", studentAdmissionStatus(3.2, 72));
// console.log("Q2.1 Test 4:", studentAdmissionStatus(2.5, 70));


// QUESTION 2.2: Switch Statement (9 Points)
// ============================================================================
// Write a function called getCourseTiming that takes:
// - courseCode: string like "CS101", "MATH202", "ENG101", etc.
//
// Use a switch statement to return an object with:
// - courseCode: the code passed in
// - courseName: full name of the course
// - meetingTime: when the course meets
// - location: room number or building
//
// Create at least 5 different courses. Example:
// getCourseTiming("CS101") → 
// {
//   courseCode: "CS101",
//   courseName: "Introduction to Programming",
//   meetingTime: "MWF 9:00 AM - 10:30 AM",
//   location: "Tech Building 101"
// }
//
// For an unknown course code, return a default object with an error message.

function getCourseTiming(courseCode) {
    switch (courseCode) {
        case "CS101":
            return {
                courseCode: courseCode,
                courseName: "Introduction to Programming",
                meetingTime: "MWF 9:00 AM - 10:30 AM",
                location: "Tech Building 101"
            };
        case "MATH202":
            return {
                courseCode: courseCode,
                courseName: "Calculus II",
                meetingTime: "TTh 10:00 AM - 11:30 AM",
                location: "Science Building 202"
            };
        case "ENG101":
            return {
                courseCode: courseCode,
                courseName: "English Composition",
                meetingTime: "MWF 11:00 AM - 12:00 PM",
                location: "Humanities Building 105"
            };
        case "PHYS101":
            return {
                courseCode: courseCode,
                courseName: "Introduction to Physics",
                meetingTime: "TTh 1:00 PM - 2:30 PM",
                location: "Science Building 110"
            };
        case "CHEM101":
            return {
                courseCode: courseCode,
                courseName: "General Chemistry",
                meetingTime: "MWF 2:00 PM - 3:00 PM",
                location: "Science Building 115"
            };
        default:
            return {
                courseCode: courseCode,
                error: "Course code not found"
            };
    }
}

// Test your function
// console.log("Q2.2 Test 1:", getCourseTiming("CS101"));
// console.log("Q2.2 Test 2:", getCourseTiming("MATH202"));
// console.log("Q2.2 Test 3:", getCourseTiming("UNKNOWN"));


// QUESTION 2.3: Ternary Operators (8 Points)
// ============================================================================
// Rewrite this function using ternary operators (no if/else statements):
//
// ORIGINAL CODE:
// function isStudentEligibleForScholarship(gpa, yearsInSchool) {
//     if (gpa >= 3.5 && yearsInSchool >= 2) {
//         return true;
//     } else {
//         return false;
//     }
// }
//
// Rewrite the function below using ONLY ternary operator(s):

function isStudentEligibleForScholarship(gpa, yearsInSchool) {
    return gpa >= 3.5 && yearsInSchool >= 2 ? true : false;
}

// Test your function
// console.log("Q2.3 Test 1:", isStudentEligibleForScholarship(3.8, 3));  // true
// console.log("Q2.3 Test 2:", isStudentEligibleForScholarship(3.2, 2));  // false
// console.log("Q2.3 Test 3:", isStudentEligibleForScholarship(3.6, 1));  // false




// ============================================================================
// PART 3: LOOPS & ITERATION (25 Points)
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PART 3: LOOPS & ITERATION");
console.log("=".repeat(70));

// QUESTION 3.1: Traditional For Loop (8 Points)
// ============================================================================
// Write a function called findTopStudents that takes:
// - studentsArray: array of student objects with {name, gpa}
//
// Using a traditional for loop:
// 1. Find all students with GPA >= 3.7
// 2. Return an array of those students
//
// Example:
// Input: [
//   {name: "Obi", gpa: 3.8},
//   {name: "Zainab", gpa: 3.9},
//   {name: "Ahmed", gpa: 3.5},
//   {name: "Fatima", gpa: 4.0}
// ]
// Output: [
//   {name: "Obi", gpa: 3.8},
//   {name: "Zainab", gpa: 3.9},
//   {name: "Fatima", gpa: 4.0}
// ]

function findTopStudents(studentsArray) {
    const topStudents = [];

    for (let i = 0; i < studentsArray.length; i++) {
        if (studentsArray[i].gpa >= 3.7) {
            topStudents.push(studentsArray[i]);
        }
    }

    return topStudents;
}

// Test your function
const sampleStudents2 = [
    {name: "Obi", gpa: 3.8},
    {name: "Zainab", gpa: 3.9},
    {name: "Ahmed", gpa: 3.5},
    {name: "Fatima", gpa: 4.0}
];

// console.log("Q3.1 Test:", findTopStudents(sampleStudents2));


// QUESTION 3.2: forEach Loop (9 Points)
// ============================================================================
// Write a function called calculateClassStatistics that takes:
// - scoresArray: array of test scores (numbers)
//
// Using forEach loop, calculate and return an object with:
// - totalSum: sum of all scores
// - average: average of all scores
// - highest: the highest score
// - lowest: the lowest score
//
// Example:
// calculateClassStatistics([85, 92, 78, 95, 88])
// Should return: 
// {
//   totalSum: 438,
//   average: 87.6,
//   highest: 95,
//   lowest: 78
// }

function calculateClassStatistics(scoresArray) {
    let totalSum = 0;
    let highest = scoresArray[0];
    let lowest = scoresArray[0];

    scoresArray.forEach(function(score) {
        totalSum += score;

        if (score > highest) {
            highest = score;
        }

        if (score < lowest) {
            lowest = score;
        }
    });

    return {
        totalSum: totalSum,
        average: totalSum / scoresArray.length,
        highest: highest,
        lowest: lowest
    };
}

// Test your function
const testScores = [85, 92, 78, 95, 88, 91, 86];
// console.log("Q3.2 Test:", calculateClassStatistics(testScores));


// QUESTION 3.3: Complex Loop with Conditionals (8 Points)
// ============================================================================
// Write a function called classroomReport that takes:
// - studentsArray: array of student objects with {name, gpa, attendance}
//
// Using loops and conditionals, count and return an object with:
// - totalStudents: total number of students
// - honorsStudents: count of students with GPA >= 3.7
// - perfectAttendance: count of students with attendance >= 95
// - needsSupport: count of students with GPA < 2.5
//
// Example input:
// [
//   {name: "Obi", gpa: 3.8, attendance: 98},
//   {name: "Zainab", gpa: 3.9, attendance: 96},
//   {name: "Ahmed", gpa: 2.3, attendance: 85},
//   {name: "Fatima", gpa: 4.0, attendance: 100}
// ]
//
// Example output:
// {
//   totalStudents: 4,
//   honorsStudents: 3,
//   perfectAttendance: 3,
//   needsSupport: 1
// }

function classroomReport(studentsArray) {
    let honorsStudents = 0;
    let perfectAttendance = 0;
    let needsSupport = 0;

    for (let i = 0; i < studentsArray.length; i++) {
        const student = studentsArray[i];

        if (student.gpa >= 3.7) {
            honorsStudents++;
        }

        if (student.attendance >= 95) {
            perfectAttendance++;
        }

        if (student.gpa < 2.5) {
            needsSupport++;
        }
    }

    return {
        totalStudents: studentsArray.length,
        honorsStudents: honorsStudents,
        perfectAttendance: perfectAttendance,
        needsSupport: needsSupport
    };
}

// Test your function
const sampleStudents3 = [
    {name: "Obi", gpa: 3.8, attendance: 98},
    {name: "Zainab", gpa: 3.9, attendance: 96},
    {name: "Ahmed", gpa: 2.3, attendance: 85},
    {name: "Fatima", gpa: 4.0, attendance: 100},
    {name: "Kwame", gpa: 2.2, attendance: 80}
];

// console.log("Q3.3 Test:", classroomReport(sampleStudents3));




// ============================================================================
// PART 4: INTEGRATION CHALLENGE (15 Points)
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PART 4: INTEGRATION CHALLENGE");
console.log("=".repeat(70));

// BUILD A COURSE MANAGEMENT SYSTEM
// ============================================================================
// Create an integrated solution combining functions, conditionals, and loops.
// Your system should have three main functions:

// STEP 1: Student Registration Function (5 Points)
// ============================================================================
// Write a function called registerStudent that takes:
// - studentName: string
// - gpa: number
// - coursesArray: array of course codes like ["CS101", "MATH202"]
//
// Validation rules:
// - Student can register for maximum 5 courses
// - Student must have GPA >= 2.0
//
// Return an object with:
// - success: true/false
// - message: string explaining result
// - studentName: the student's name
// - enrolledCourses: array of courses (if successful)
// - numberOfCourses: count of courses (if successful)
//
// Example:
// registerStudent("Obi", 3.5, ["CS101", "MATH202", "ENG101"])
// → {success: true, message: "Registration successful!", studentName: "Obi", enrolledCourses: [...], numberOfCourses: 3}

function registerStudent(studentName, gpa, coursesArray) {
    if (gpa < 2.0) {
        return {
            success: false,
            message: "Registration denied: GPA must be at least 2.0.",
            studentName: studentName
        };
    }

    if (coursesArray.length > 5) {
        return {
            success: false,
            message: "Registration denied: students may register for a maximum of 5 courses.",
            studentName: studentName
        };
    }

    return {
        success: true,
        message: "Registration successful!",
        studentName: studentName,
        enrolledCourses: coursesArray,
        numberOfCourses: coursesArray.length
    };
}

// Test
// console.log("Test Register 1:", registerStudent("Obi", 3.5, ["CS101", "MATH202", "ENG101"]));
// console.log("Test Register 2:", registerStudent("Ahmed", 1.8, ["CS101"]));
// console.log("Test Register 3:", registerStudent("Zainab", 3.9, ["CS101", "MATH202", "ENG101", "PHYS101", "CHEM101", "BIO101"]));


// STEP 2: Grade Processing Function (5 Points)
// ============================================================================
// Write a function called processExamScores that takes:
// - scoresArray: array of exam scores
//
// Return an object with:
// - count: number of exams
// - average: average score
// - highest: highest score
// - lowest: lowest score
// - passRate: percentage of students who scored >= 70
//
// Example:
// processExamScores([85, 92, 78, 95, 88, 65, 72])
// Should return statistics about the exam performance

function processExamScores(scoresArray) {
    let totalSum = 0;
    let highest = scoresArray[0];
    let lowest = scoresArray[0];
    let passingExams = 0;

    scoresArray.forEach(function(score) {
        totalSum += score;

        if (score > highest) {
            highest = score;
        }

        if (score < lowest) {
            lowest = score;
        }

        if (score >= 70) {
            passingExams++;
        }
    });

    return {
        count: scoresArray.length,
        average: totalSum / scoresArray.length,
        highest: highest,
        lowest: lowest,
        passRate: (passingExams / scoresArray.length) * 100
    };
}

// Test
// console.log("Test Grades:", processExamScores([85, 92, 78, 95, 88, 65, 72, 91, 82]));


// STEP 3: Class Analysis Function (5 Points)
// ============================================================================
// Write a function called analyzeClass that takes:
// - classData: array of student objects with {name, gpa, attendance, examScore}
//
// This function should:
// 1. Use loops to analyze all students
// 2. Identify students needing academic support (GPA < 2.5)
// 3. Calculate class average GPA
// 4. Count high performers (GPA >= 3.7)
//
// Return an object with:
// - totalStudents: number of students
// - classAverageGPA: average GPA
// - highPerformers: count of students with GPA >= 3.7
// - needsSupport: array of student names with GPA < 2.5
// - classStatus: "Excellent" (avg >= 3.5), "Good" (avg >= 3.0), "Needs Improvement" (avg < 3.0)

function analyzeClass(classData) {
    let totalGPA = 0;
    let highPerformers = 0;
    const needsSupport = [];

    for (let i = 0; i < classData.length; i++) {
        const student = classData[i];
        totalGPA += student.gpa;

        if (student.gpa >= 3.7) {
            highPerformers++;
        }

        if (student.gpa < 2.5) {
            needsSupport.push(student.name);
        }
    }

    const classAverageGPA = totalGPA / classData.length;
    const classStatus = classAverageGPA >= 3.5
        ? "Excellent"
        : classAverageGPA >= 3.0
            ? "Good"
            : "Needs Improvement";

    return {
        totalStudents: classData.length,
        classAverageGPA: classAverageGPA,
        highPerformers: highPerformers,
        needsSupport: needsSupport,
        classStatus: classStatus
    };
}

// Test with sample class
const classData = [
    {name: "Obi", gpa: 3.8, attendance: 98, examScore: 92},
    {name: "Zainab", gpa: 3.9, attendance: 96, examScore: 95},
    {name: "Ahmed", gpa: 2.3, attendance: 85, examScore: 72},
    {name: "Fatima", gpa: 4.0, attendance: 100, examScore: 98},
    {name: "Kwame", gpa: 2.1, attendance: 80, examScore: 68},
    {name: "Amara", gpa: 3.5, attendance: 92, examScore: 88}
];

// console.log("Class Analysis:", analyzeClass(classData));




// ============================================================================
// PART 5: REFLECTION QUESTIONS (10 Points)
// ============================================================================
console.log("\n" + "=".repeat(70));
console.log("PART 5: REFLECTION QUESTIONS");
console.log("=".repeat(70));

// Answer these questions in comments. Show your understanding of the concepts.

/*
QUESTION 5.1 (3 Points):
Explain the DRY (Don't Repeat Yourself) principle and how functions help achieve it.
Provide an example from your code above.

YOUR ANSWER:
*/

/*
QUESTION 5.2 (2 Points):
When would you use a switch statement instead of if/else? 
Give an example scenario from real programming.

YOUR ANSWER:
*/

/*
QUESTION 5.3 (3 Points):
What is the difference between a for loop and a forEach loop? 
When should you use each one? Provide an example of each.

YOUR ANSWER:
*/

/*
QUESTION 5.4 (2 Points):
Why is it important to return values from functions? 
How does this improve code reusability?

YOUR ANSWER:
*/




// ============================================================================
// SUBMISSION CHECKLIST
// ============================================================================
/*
BEFORE SUBMITTING, VERIFY:

□ All 13 functions are implemented (not just stubs)
□ Each function has clear comments explaining what it does
□ I tested each function with at least 2-3 examples
□ Return values match the specified format (objects/arrays)
□ Conditional logic is correct (if/else, switch, ternary)
□ Loops work properly (for, forEach)
□ All reflection questions are answered in comments
□ Code is readable with proper indentation
□ No console errors when running the file

SCORING BREAKDOWN:
- Part 1 (Functions): 25 points
- Part 2 (Conditionals): 25 points
- Part 3 (Loops): 25 points
- Part 4 (Integration): 15 points
- Part 5 (Reflection): 10 points
TOTAL: 100 points

SUBMISSION FORMAT:
Submit as JavaScript_Assignment.js with all code and answers included.
When graded, I will uncomment console.log tests to verify your implementations.
*/
