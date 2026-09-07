// ASSIGNMENT LEVEL 1 - BASIC OBJECT CREATION
// ============================================
// Create an object for a book with these properties:
//   - title
//   - author
//   - yearPublished
//   - pageCount
//   - isAvailable (boolean)

// Then print:
//   - The book title
//   - The author name
//   - Is it available?

// Expected output:
//   Book: [your title]
//   Author: [name]
//   Available: true/false
  
const book = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    yearPublished: 1925,
    pageCount: 218,
    isAvailable: true,
};

console.log("Book: " + book.title);
console.log("Author: " + book.author);
console.log("Available: " + book.isAvailable);


// ASSIGNMENT LEVEL 2 - ARRAY OF OBJECTS
// ======================================
// Create an array of 3 books (each book is an object).
// Then access and print:
//   - The first book's title
//   - The second book's author
//   - The third book's page count
//   - Total books in array

// Expected output:
//   First book: [title]
//   Second author: [name]
//   Third pages: [number]
//   Total books: 3

const books = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        yearPublished: 1925,
        pageCount: 218,
        isAvailable: true
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        yearPublished: 1960,
        pageCount: 281,
        isAvailable: false
    },
    {
        title: "1984",
        author: "George Orwell",
        yearPublished: 1948,
        pageCount: 328,
        isAvailable: true
    }
];

console.log("First book: " + books[0].title);
console.log("Second author: " + books[1].author);
console.log("Third pages: " + books[2].pageCount);
console.log("Total books: " + books.length);

// ASSIGNMENT LEVEL 3 - NESTED DATA STRUCTURE
// ===========================================
// Create a bookstore object that contains:
//   - storeName
//   - location
//   - array of books (each with: title, author, price, quantity)
//   - array of employees (each with: name, role, yearsEmployed)

// Then access and print:
//   - Store name and location
//   - First book title
//   - First book price
//   - First employee name and role
//   - Total books and employees

const bookstore = {
    storeName: "The Book Nook",
    location: "123 Main St, Anytown, USA",
    books: [
        {
            title: "The Great Gatsby", 
            author: "F. Scott Fitzgerald",
            price: 12.99,
            quantity: 5
        }
    ],
    employees: [
        {
            name: "John Doe",
            role: "Manager",
            yearsEmployed: 5
        }
    ]
};

console.log("Store: " + bookstore.storeName);
console.log("Location: " + bookstore.location);
console.log("First book: " + bookstore.books[0].title);
console.log("First book price: $" + bookstore.books[0].price);
console.log("First employee: " + bookstore.employees[0].name + " - " + bookstore.employees[0].role);
console.log("Total books: " + bookstore.books.length);
console.log("Total employees: " + bookstore.employees.length);

// ASSIGNMENT LEVEL 4 - DATA VALIDATION
// ====================================
// Using the bookstore from Level 3, check if data is valid:
//   - Is the first book's price positive (> 0)?
//   - Is an employee's years of experience reasonable (0-60)?
//   - Does a book have a non-empty title?
//   - Does the store have at least one book?
  
// Print true/false for each check.

console.log("First book price is positive: " + (bookstore.books[0].price > 0));
console.log("First employee has reasonable experience: " + (bookstore.employees[0].yearsEmployed >= 0 && bookstore.employees[0].yearsEmployed <= 60));
console.log("First book has a non-empty title: " + (bookstore.books[0].title.length > 0));
console.log("Store has at least one book: " + (bookstore.books.length > 0));


// ASSIGNMENT LEVEL 5 - COMBINING CONCEPTS
// ========================================
// Create a university system with:
//   - University name and location
//   - Array of departments (each department has: name, head, courses)
//   - Array of students (each student has: id, name, gpa, department)
//   - Array of faculty (each faculty has: id, name, department, specialty)

// Then answer these questions:
//   1. What's the university name?
//   2. How many departments exist?
//   3. Get the first student's name and their GPA
//   4. Get the first faculty member's specialty
//   5. Is the first student's GPA valid (0-4.0)?
//   6. How many students are enrolled?
//   7. Get all courses from the first department
// `);
const university = {
    name: "Akinade University",
    location: "456 College Ave, Tech City, USA",
    departments: [
        {
            name: "Computer Science",
            head: "Dr. Alice Smith",
            courses: ["CS101", "CS102", "CS201"]
        }
    ],
    students: [
        {   
        id: 1,
        name: "Akinade Olamiposi",
        gpa: 3.8,
        department: "Computer Science"
        }
    ],
    faculty: [
        {
            id: 101,    
        name: "Dr. Bob Johnson",
        department: "Computer Science",
        specialty: "Artificial Intelligence"
        }
    ]
};

console.log("University name: " + university.name);
console.log("Number of departments: " + university.departments.length);
console.log("First student: " + university.students[0].name + ", GPA: " + university.students[0].gpa);  

console.log("First faculty specialty: " + university.faculty[0].specialty);
console.log("First student's GPA is valid: " + (university.students[0].gpa >= 0 && university.students[0].gpa <= 4.0));
console.log("Total students enrolled: " + university.students.length);
console.log("Courses in first department: " + university.departments[0].courses.join(", "));
