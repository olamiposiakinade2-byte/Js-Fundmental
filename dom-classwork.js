// Task 1: inspect the box.
const box = document.getElementById("box");

console.log("===== BOX PROPERTIES =====");
console.log("tagName:", box.tagName);
console.log("id:", box.id);
console.log("className:", box.className);
console.log("classList:", box.classList);

// Task 2: inspect the box's parent.
console.log("===== BOX PARENT =====");
console.log("parentElement:", box.parentElement);
console.log("parentNode:", box.parentNode);

// Task 3: inspect the box's element siblings.
console.log("===== BOX SIBLINGS =====");
console.log("previousElementSibling:", box.previousElementSibling);
console.log("nextElementSibling:", box.nextElementSibling);

// Task 4: inspect the container's child elements.
const container = document.getElementById("container");

console.log("===== CONTAINER CHILDREN =====");
console.log("children:", container.children);
console.log("firstElementChild:", container.firstElementChild);
console.log("lastElementChild:", container.lastElementChild);
console.log("children.length:", container.children.length);

// Task 5: change the box with inline styles.
document.getElementById("red-btn").addEventListener("click", function () {
	box.style.backgroundColor = "red";
	box.style.color = "white";
	box.style.border = "3px solid darkred";
});

// Tasks 6-8: add, remove, and toggle classes.
document.getElementById("highlight-btn").addEventListener("click", function () {
	box.classList.add("highlight");
});

document.getElementById("remove-btn").addEventListener("click", function () {
	box.classList.remove("highlight");
});

document.getElementById("toggle-btn").addEventListener("click", function () {
	box.classList.toggle("active");
});

// Task 9: check whether the active class is currently present.
console.log("Has active class:", box.classList.contains("active"));

// Challenge: resize the box with JavaScript.
document.getElementById("bigger-btn").addEventListener("click", function () {
	box.style.fontSize = "24px";
	box.style.padding = "40px";
	box.style.width = "350px";
});
