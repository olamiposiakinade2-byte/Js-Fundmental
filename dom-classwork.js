// Task 1: inspect the box.
const box = document.getElementById("box");

console.log("===== BOX PROPERTIES =====");
console.log("tagName:", box.tagName);
console.log("id:", box.id);
console.log("className:", box.className);
console.log("classList:", box.classList);

// Task 2: inspect the box dimensions.
console.log("===== BOX DIMENSIONS =====");
console.log("offsetWidth:", box.offsetWidth);
console.log("offsetHeight:", box.offsetHeight);
console.log("clientWidth:", box.clientWidth);
console.log("clientHeight:", box.clientHeight);
console.log("scrollWidth:", box.scrollWidth);
console.log("scrollHeight:", box.scrollHeight);

// Task 3: explore the parent element of the box.
console.log("===== PARENT ELEMENT =====");
console.log("parentElement:", box.parentElement);
console.log("parentNode:", box.parentNode);
console.log("Box", box.previousElementSibling);
console.log("Box", box.nextElementSibling);

const container = document.getElementById("container");
console.log(container.children);
console.log(container.firstElementChild);
console.log(container.lastElementChild);
console.log(container.children.length);

const redButton = document.getElementById('red-btn');
redButton.addEventListener("click", () => {
    box.style.backgroundColor = "red"
    box.style.color ="pink"
    box.style.border = '4px solid blue'
});

const highlightBtn = document.querySelector("#highlight-btn");

highlightBtn.addEventListener('click', () => {
    box.classList.add('highlight')
});

const removeBtn = document.querySelector("#remove-btn");
highlightBtn.addEventListener('click', () => {
    box.classList.remove('highlight')
});

const toggleBtn = document.querySelector("#toggle-btn");
toggleBtn.addEventListener('click', () => {
    box.classList.toggle('active')
});

console.log(box.classList.contains("active"));