// ==========================================
// 1. INSPECT ELEMENT PROPERTIES
// ==========================================

const pageTitle = document.getElementById("page-title");

console.log("===== ELEMENT PROPERTIES =====");
console.log("tagName:", pageTitle.tagName);
console.log("id:", pageTitle.id);
console.log("className:", pageTitle.className);
console.log("classList:", pageTitle.classList);


// ==========================================
// 2. INSPECT ELEMENT DIMENSIONS
// ==========================================

const productsContainer =
    document.getElementById("products-container");

console.log("===== ELEMENT DIMENSIONS =====");
console.log("offsetWidth:", productsContainer.offsetWidth);
console.log("offsetHeight:", productsContainer.offsetHeight);
console.log("clientWidth:", productsContainer.clientWidth);
console.log("clientHeight:", productsContainer.clientHeight);
console.log("scrollWidth:", productsContainer.scrollWidth);
console.log("scrollHeight:", productsContainer.scrollHeight);


// ==========================================
// 3. EXPLORE PARENT ELEMENT
// ==========================================

console.log("===== PARENT =====");

console.log(
    "parentElement:",
    productsContainer.parentElement
);

console.log(
    "parentNode:",
    productsContainer.parentNode
);


// ==========================================
// 4. EXPLORE CHILD ELEMENTS
// ==========================================

console.log("===== CHILDREN =====");

console.log(
    "children:",
    productsContainer.children
);

console.log(
    "childNodes:",
    productsContainer.childNodes
);

console.log(
    "firstElementChild:",
    productsContainer.firstElementChild
);

console.log(
    "lastElementChild:",
    productsContainer.lastElementChild
);


// ==========================================
// 5. EXPLORE SIBLINGS
// ==========================================

const firstProduct =
    productsContainer.firstElementChild;

console.log("===== SIBLINGS =====");

console.log(
    "nextElementSibling:",
    firstProduct.nextElementSibling
);

console.log(
    "previousElementSibling:",
    firstProduct.previousElementSibling
);


// ==========================================
// 6. ANALYZE ELEMENT FUNCTION
// ==========================================

function analyzeElement(element) {

    return {
        tagName: element.tagName,
        id: element.id,
        classes: element.className,
        numberOfChildren: element.children.length,
        textContent: element.textContent.trim(),
        hasParent: element.parentElement !== null,
        previousSibling: element.previousElementSibling,
        nextSibling: element.nextElementSibling
    };
}

console.log("===== PAGE TITLE ANALYSIS =====");

console.log(
    analyzeElement(pageTitle)
);


// ==========================================
// 7. ANALYZE ALL HEADINGS
// ==========================================

const headings = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6"
);

console.log("===== ALL HEADINGS =====");

headings.forEach(function (heading) {

    console.log(analyzeElement(heading));

});


// ==========================================
// 8. MAKE DEMO BOX RED
// ==========================================

const styleDemo =
    document.getElementById("style-demo");

const makeRed =
    document.getElementById("style-btn-1");

makeRed.addEventListener("click", function () {

    styleDemo.style.backgroundColor = "red";
    styleDemo.style.color = "white";
    styleDemo.style.border = "3px solid darkred";

});


// ==========================================
// 9. MAKE DEMO BOX BIGGER
// ==========================================

const makeBigger =
    document.getElementById("style-btn-2");

makeBigger.addEventListener("click", function () {

    styleDemo.style.fontSize = "24px";
    styleDemo.style.padding = "50px";
    styleDemo.style.borderRadius = "20px";
    styleDemo.style.transform = "scale(1.1)";

});


// ==========================================
// 10. TOGGLE VISIBILITY
// ==========================================

const toggleVisibility =
    document.getElementById("style-btn-3");

toggleVisibility.addEventListener("click", function () {

    const display =
        window.getComputedStyle(styleDemo).display;

    if (display === "none") {

        styleDemo.style.display = "block";
        toggleVisibility.textContent = "Toggle Visibility";

    } else {

        styleDemo.style.display = "none";
        toggleVisibility.textContent = "Show Box";

    }

});


// ==========================================
// 11. RESET STYLES
// ==========================================

const resetStyle =
    document.getElementById("reset-style");

resetStyle.addEventListener("click", function () {

    styleDemo.removeAttribute("style");

    toggleVisibility.textContent =
        "Toggle Visibility";

});


// ==========================================
// 12. ADD HIGHLIGHT
// ==========================================

const classDemo =
    document.getElementById("class-demo");

const addClass =
    document.getElementById("add-class");

addClass.addEventListener("click", function () {

    classDemo.classList.add("highlight");

});


// ==========================================
// 13. REMOVE HIGHLIGHT
// ==========================================

const removeClass =
    document.getElementById("remove-class");

removeClass.addEventListener("click", function () {

    classDemo.classList.remove("highlight");

});


// ==========================================
// 14. TOGGLE ACTIVE
// ==========================================

const toggleClass =
    document.getElementById("toggle-class");

toggleClass.addEventListener("click", function () {

    classDemo.classList.toggle("active");

    if (classDemo.classList.contains("active")) {

        toggleClass.textContent = "Deactivate";

    } else {

        toggleClass.textContent = "Toggle Active";

    }

});


// ==========================================
// 15. CHECK CLASSES
// ==========================================

const checkClass =
    document.getElementById("check-class");

const classInfo =
    document.getElementById("class-info");

checkClass.addEventListener("click", function () {

    const allClasses =
        classDemo.classList;

    const hasHighlight =
        classDemo.classList.contains("highlight");

    const hasActive =
        classDemo.classList.contains("active");

    const totalClasses =
        classDemo.classList.length;

    classInfo.textContent =
        "All current classes: " +
        Array.from(allClasses).join(", ") +
        "\n\n" +
        "Highlight class exists: " +
        hasHighlight +
        "\n\n" +
        "Active class exists: " +
        hasActive +
        "\n\n" +
        "Total number of classes: " +
        totalClasses;

});


// ==========================================
// 16. SELECT PROFILE ELEMENTS
// ==========================================

const profileName =
    document.getElementById("profile-name");

const profileBio =
    document.getElementById("profile-bio");

const nameInput =
    document.getElementById("name-input");

const bioInput =
    document.getElementById("bio-input");

const updateProfile =
    document.getElementById("update-profile");

const toggleTheme =
    document.getElementById("toggle-theme");

const profileCard =
    document.getElementById("profile-card");


// ==========================================
// 17. STORE ORIGINAL PROFILE INFORMATION
// ==========================================

profileName.setAttribute(
    "data-original",
    profileName.textContent.trim()
);

profileBio.setAttribute(
    "data-original",
    profileBio.textContent.trim()
);


// ==========================================
// 18. VALIDATE INPUT
// ==========================================

function validateInput(input) {

    const value = input.trim();

    if (value === "") {
        return false;
    }

    if (value.length > 50) {
        return false;
    }

    return true;
}


// ==========================================
// 19. UPDATE PROFILE
// ==========================================

updateProfile.addEventListener("click", function () {

    const name =
        nameInput.value.trim();

    const bio =
        bioInput.value.trim();

    if (
        validateInput(name) &&
        validateInput(bio)
    ) {

        profileName.textContent = name;
        profileBio.textContent = bio;

    } else {

        alert(
            "Please enter a name and bio. Each must be between 1 and 50 characters."
        );

    }

});


// ==========================================
// 20. TOGGLE DARK THEME
// ==========================================

toggleTheme.addEventListener("click", function () {

    profileCard.classList.toggle("dark-theme");

    if (
        profileCard.classList.contains("dark-theme")
    ) {

        toggleTheme.textContent =
            "Disable Dark Theme";

    } else {

        toggleTheme.textContent =
            "Toggle Dark Theme";

    }

});


// ==========================================
// DONE
// ==========================================

console.log("TechZone Store JavaScript loaded successfully.");