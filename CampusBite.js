/*
==============================================================
             CAMPUSBITE JAVASCRIPT TRAINING PROJECT
==============================================================

🚦 HOW TO READ THIS FILE

🟢 = Beginner / understand this first
🟡 = Intermediate
🔴 = More advanced
🧠 = Explanation
🎯 = Student challenge
✅ = Expected result
⚠️ = Important
==============================================================
*/


const API_BASE_URL =
    window.REANXIS_API_BASE_URL || "";


function apiUrl(path) {

    return `${API_BASE_URL}${path}`;

}


// ============================================================
// 🟢 LEVEL 1 — DATA
// ============================================================

/*
🧠 Think of an ARRAY like a container holding many things.

Here we have ONE array.

Inside the array are many OBJECTS.

Each object represents ONE food.
*/


const foods = [

    {
        id: 1,
        name: "Renix Furosemide BP 40mg",
        category: "Anti-Hypertensive",
        price: 400,
        description: "Prescription medicine. Use only under qualified pharmacist or clinician guidance.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 2,
        name: "Normoretic",
        category: "Anti-Hypertensive",
        price: 450,
        description: "Prescription blood-pressure medicine. Confirm suitability with a healthcare professional.",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 3,
        name: "Amlong 10mg Amlodipine",
        category: "Anti-Hypertensive",
        price: 400,
        description: "Prescription medicine for blood-pressure care. Do not self-medicate.",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 4,
        name: "Multichris Propranolol BP 40mg",
        category: "Anti-Hypertensive",
        price: 1200,
        description: "Prescription medicine. Ask a pharmacist about dosage and interactions.",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 5,
        name: "Dopatab 250mg Methyldopa",
        category: "Anti-Hypertensive & Anti-Platelet",
        price: 1300,
        description: "Prescription medicine. Professional review is required before use.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 6,
        name: "Vasopirin 75mg Aspirin",
        category: "Anti-Hypertensive & Anti-Platelet",
        price: 100,
        description: "Use only as directed by a clinician, especially with other blood thinners.",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 7,
        name: "Diabetmin Metformin 500mg",
        category: "Anti-Diabetics",
        price: 700,
        description: "Prescription medicine for diabetes care. Follow your clinician's instructions.",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 8,
        name: "Shalzin Azithromycin 500mg",
        category: "Antibiotics",
        price: 1850,
        description: "Antibiotic medicine. Prescription and professional guidance required.",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 9,
        name: "Shaltoux Sweet",
        category: "Vitamins & Supplements",
        price: 50,
        description: "Supplement product. Check the label and ask a pharmacist if unsure.",
        image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 10,
        name: "Omeshal Omeprazole 20mg",
        category: "Ulcer Care",
        price: 1300,
        description: "Medicine for acid-related conditions. Use according to professional advice.",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 11,
        name: "Epiderm B/S Cream 30g",
        category: "Topical Creams & Ointments",
        price: 1000,
        description: "Topical skin-care product. Follow label directions and seek advice for persistent symptoms.",
        image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 12,
        name: "Shal'Artem X 12",
        category: "Anti-Malaria",
        price: 800,
        description: "Antimalarial medicine. Test and consult a qualified professional before treatment.",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80"
    }

];



// ============================================================
// 🟢 LEVEL 2 — APPLICATION STATE
// ============================================================

/*
🧠 "State" simply means:

What does our application currently know?

Example:

foods = all available food.

cart = what the customer selected.

selectedCategory = currently selected filter.
*/


let cart = [];

try {

    cart = JSON.parse(
        localStorage.getItem("reanxis_cart") || "[]"
    );

} catch {

    cart = [];

}

let selectedCategory = "all";



// ============================================================
// 🟢 LEVEL 3 — GET HTML ELEMENTS
// ============================================================

/*
🧠 JavaScript needs a way to find elements inside our HTML.

document.querySelector() finds an HTML element.

Think:

HTML:
<div id="foodGrid"></div>

JavaScript:
document.querySelector("#foodGrid")
*/


const foodGrid =
    document.querySelector("#foodGrid");


const loading =
    document.querySelector("#loading");


const searchInput =
    document.querySelector("#searchInput");


const cartCount =
    document.querySelector("#cartCount");


const cartPanel =
    document.querySelector("#cartPanel");


const cartOverlay =
    document.querySelector("#cartOverlay");


const cartItems =
    document.querySelector("#cartItems");


const cartTotal =
    document.querySelector("#cartTotal");


const openCartBtn =
    document.querySelector("#openCartBtn");


const closeCartBtn =
    document.querySelector("#closeCartBtn");


const checkoutBtn =
    document.querySelector("#checkoutBtn");


const paymentMethod =
    document.querySelector("#paymentMethod");


const customerEmail =
    document.querySelector("#customerEmail");


const sortSelect =
    document.querySelector("#sortSelect");


const toast =
    document.querySelector("#toast");


const orderSection =
    document.querySelector("#orderSection");


const orderStatus =
    document.querySelector("#orderStatus");


const orderNumber =
    document.querySelector("#orderNumber");


const paymentStatus =
    document.querySelector("#paymentStatus");


const progressBar =
    document.querySelector("#progressBar");


function formatMoney(amount) {

    return `₦${amount.toLocaleString()}`;

}


async function sendOrderToServer(order) {

    const response = await fetch(apiUrl("/api/orders"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify(order)
    });

    const contentType =
        response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
        ? await response.json()
        : {
            error:
                "Online payment needs the Reanxis payment server."
        };

    if (!response.ok) {

        throw new Error(data.error || "Could not start payment.");

    }

    return data;

}


/*
Example:

renderFoods(foods);

Its job is to display those foods on the page.
*/


function renderFoods(foodArray) {


    // STEP 1
    // Clear whatever was previously inside the grid.

    foodGrid.innerHTML = "";


    // STEP 2
    // Check if the array is empty.

    if (foodArray.length === 0) {

        foodGrid.innerHTML = `

            <div class="empty-state">

                <h2>😕 No pharmacy products found</h2>

                <p>
                    Try another search.
                </p>

            </div>

        `;

        return;
    }



    // STEP 3
    // Loop through all food.

    foodArray.forEach(function(food) {


        /*
        🧠 Every time the loop runs,
        "food" represents ONE object.

        First loop:

        food = {
            id: 1,
            name: "...",
            price: ...
        }

        Second loop:

        food = {
            id: 2,
            ...
        }
        */


        const foodCard = `

            <article class="food-card">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                    class="food-image"
                >

                <div class="food-content">

                    <span class="food-category">
                        ${food.category}
                    </span>

                    <h3>
                        ${food.name}
                    </h3>

                    <p class="food-description">
                        ${food.description}
                    </p>

                    <div class="food-bottom">

                        <span class="food-price">
                            ${formatMoney(food.price)}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addToCart(${food.id})"
                        >
                            Add to bag
                        </button>

                    </div>

                </div>

            </article>

        `;


        foodGrid.innerHTML += foodCard;

    });

}


/*
🎯 STUDENT CHALLENGE #1

Create another food inside the foods array.

It MUST contain:

id
name
category
price
description
image

Refresh your page.

Does your new food appear?
*/

const newFood = {
    id : 9,
    name : "Spaghetti Bolognese",
    category : "Pasta",
    price : 4000,
    description : "Classic Italian pasta with rich meat sauce.",
    image : "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80"
};

foods.push(newFood);


// ============================================================
// 🟢 LEVEL 6 — FIND()
// ============================================================


function addToCart(foodId) {


    /*
    🧠 We only received the ID.

    Example:

    addToCart(3)

    Now JavaScript must FIND food number 3.
    */


    const selectedFood = foods.find((food) => {
        return food.id === foodId;

    });



    console.log("Selected Food:");

    console.log(selectedFood);



    // Check if food already exists inside cart.

    const itemAlreadyInCart =
        cart.find((item) => {

            return item.id === foodId;

        });
      



    if (itemAlreadyInCart) {


        // If item exists,
        // simply increase its quantity.

        itemAlreadyInCart.quantity += 1;


    } else {


        /*
        If food isn't inside cart,
        add it.

        {...selectedFood}

        copies all properties from the food object.
        */


        cart.push({

            ...selectedFood,

            quantity: 1

        });

    }



    updateCart();


    showToast(
        `${selectedFood.name} added to cart 🛒`
    );

}



/*
🎯 STUDENT CHALLENGE #2

Before continuing, console.log(cart).

Add different products.

Observe how the array changes.
*/
console.log(cart);




// ============================================================
// 🟢 LEVEL 7 — UPDATE CART
// ============================================================


function updateCart() {


    localStorage.setItem(
        "reanxis_cart",
        JSON.stringify(cart)
    );


    cartItems.innerHTML = "";



    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div style="text-align:center; padding:50px 10px;">

                <div style="font-size:60px">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

            </div>

        `;

    }



    cart.forEach(function(item) {


        const cartHTML = `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ${formatMoney(item.price)}
                    </p>

                    <div class="quantity-controls">

                        <button
                            onclick="decreaseQuantity(${item.id})"
                        >
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${item.id})"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.innerHTML += cartHTML;

    });



    updateCartTotal();

}



// ============================================================
// 🟢 LEVEL 8 — INCREASE QUANTITY
// ============================================================


function increaseQuantity(foodId) {


    const item = cart.find((food) => {

        return food.id === foodId;

    });



    if (item) {

        item.quantity++;

    }


    updateCart();

}



// ============================================================
// 🟢 LEVEL 9 — DECREASE QUANTITY
// ============================================================


function decreaseQuantity(foodId) {


    const item = cart.find(function(food) {

        return food.id === foodId;

    });



    if (!item) {

        return;

    }



    item.quantity--;



    /*
    🧠 If quantity reaches zero,
    remove the item.
    */


    if (item.quantity <= 0) {

        removeFromCart(foodId);

        return;

    }


    updateCart();

}



// ============================================================
// 🟢 LEVEL 10 — FILTER()
// ============================================================


function removeFromCart(foodId) {


    /*
    🧠 filter()

    Keeps items where the condition is TRUE.

    Example:

    Remove f  ood ID 3.

    Keep everything whose ID is NOT 3.
    */


    cart = cart.filter(function(item) {

        return item.id !== foodId;

    });


    updateCart();

}



// ============================================================
// 🟡 LEVEL 11 — REDUCE()
// ============================================================


function updateCartTotal() {


    /*
    🧠 reduce() turns many values
    into ONE final value.

    Example:

    ₦3000
    +
    ₦2000
    +
    ₦1000

    becomes

    ₦6000
    */


    const total = cart.reduce(
        function(currentTotal, item) {


            const itemTotal =
                item.price * item.quantity;


            return currentTotal + itemTotal;

        },

        0

    );


    cartTotal.textContent =
        formatMoney(total);



    /*
    Find total number of products.

    Example:

    Burger x2
    Pizza x1

    Cart count = 3
    */


    const totalItems = cart.reduce(
        function(total, item) {

            return total + item.quantity;

        },

        0
    );


    cartCount.textContent = totalItems;

}



// ============================================================
// 🟢 LEVEL 12 — SEARCH
// ============================================================


function searchFoods() {


    applyCatalogFilters();

}


function applyCatalogFilters() {

    const searchText =
        searchInput.value.trim().toLowerCase();

    let results = foods.filter(function(food) {

        const matchesCategory =
            selectedCategory === "all" ||
            food.category === selectedCategory;

        const searchableText =
            `${food.name} ${food.description}`.toLowerCase();

        return matchesCategory && searchableText.includes(searchText);

    });

    if (sortSelect.value === "price-low") {
        results.sort((first, second) => first.price - second.price);
    }

    if (sortSelect.value === "price-high") {
        results.sort((first, second) => second.price - first.price);
    }

    if (sortSelect.value === "name") {
        results.sort((first, second) => first.name.localeCompare(second.name));
    }

    renderFoods(results);

}



// Listen for keyboard typing.

searchInput.addEventListener(
    "input",
    searchFoods
);



// ============================================================
// 🟡 LEVEL 13 — CATEGORY FILTER
// ============================================================


const filterButtons =
    document.querySelectorAll(".filter-btn");



filterButtons.forEach(
    function(button) {


        button.addEventListener(
            "click",
            function() {


                selectedCategory =
                    button.dataset.category;



                // Remove active class from everybody.

                filterButtons.forEach(
                    function(btn) {

                        btn.classList.remove("active");

                    }
                );


                // Add active class to clicked button.

                button.classList.add("active");



                applyCatalogFilters();

            }
        );

    }
);


sortSelect.addEventListener(
    "change",
    applyCatalogFilters
);



// ============================================================
// 🟢 LEVEL 14 — OPEN / CLOSE CART
// ============================================================


function openCart() {

    cartPanel.classList.remove("hidden");

    cartOverlay.classList.remove("hidden");

}



function closeCart() {

    cartPanel.classList.add("hidden");

    cartOverlay.classList.add("hidden");

}



openCartBtn.addEventListener(
    "click",
    openCart
);


closeCartBtn.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);



// ============================================================
// 🟢 LEVEL 15 — CALLBACK
// ============================================================

/*
🧠 CALLBACK

A callback is simply:

A FUNCTION passed into ANOTHER FUNCTION.

Example:

doSomething(firstFunction)

The receiving function can call that function later.
*/


function showToast(message, callback) {


    toast.textContent = message;


    toast.classList.remove("hidden");



    setTimeout(
        function() {


            toast.classList.add("hidden");



            /*
            ⚠️ callback may not always exist.

            So we check first.
            */


            if (callback) {

                callback();

            }


        },

        2000
    );

}



/*
Example:

showToast(
    "Order successful!",
    function() {

        console.log("Toast finished!");

    }
);

🎯 Ask students:

Which function is the callback?
*/



// ============================================================
// 🟡 LEVEL 16 — LOAD PRODUCTS FROM THE BACKEND
// ============================================================


async function loadFoods() {

    try {

        loading.classList.remove("hidden");
        foodGrid.classList.add("hidden");

        const response = await fetch(apiUrl("/api/products"));
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Could not load meals.");
        }

        const serverFoods = data.products.map(function(product) {

            return {
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price_kobo / 100,
                description: product.description,
                image: product.image
            };

        });

        foods.length = 0;
        foods.push(...serverFoods);

        cart = cart
            .map(function(item) {

                const currentProduct = serverFoods.find(
                    product => product.id === item.id
                );

                return currentProduct
                    ? { ...currentProduct, quantity: item.quantity }
                    : null;

            })
            .filter(Boolean);

        updateCart();
        renderFoods(serverFoods);

    } catch (error) {

        renderFoods(foods);
        showToast("Catalog loaded in offline mode");

    } finally {

        loading.classList.add("hidden");
        foodGrid.classList.remove("hidden");

    }

}





async function placeOrder() {


    // Validation

    if (cart.length === 0) {


        showToast(
            "Your cart is empty 😅"
        );


        return;

    }


    if (!paymentMethod.value) {

        showToast(
            "Please choose a payment method"
        );


        return;

    }


    if (!customerEmail.checkValidity()) {

        showToast(
            "Please enter a valid email address"
        );


        customerEmail.focus();


        return;

    }



    /*
    Create an order object.

    This is what we would normally
    send to a backend.
    */


    const order = {


        items: cart.map(function(item) {

            return {
                productId: item.id,
                quantity: item.quantity
            };

        }),


        customerEmail: customerEmail.value.trim(),


        paymentMethod: paymentMethod.value

    };



    try {


        checkoutBtn.textContent =
            "Opening secure payment...";


        checkoutBtn.disabled = true;



        const response =
            await sendOrderToServer(order);



        console.log(
            "SERVER RESPONSE:"
        );


        console.log(response);



        window.location.href = response.authorizationUrl;


    } catch (error) {

        showToast(`Could not start payment: ${error.message}`);


    } finally {

        checkoutBtn.textContent =
            "Place Order";


        checkoutBtn.disabled = false;

    }

}


checkoutBtn.addEventListener(
    "click",
    placeOrder
);



// ============================================================
// 🔴 LEVEL 21 — ORDER TRACKING
// ============================================================


function trackOrder() {


    const stages = [

        {
            message: "👨‍🍳 Preparing your food",
            progress: 25
        },

        {
            message: "✅ Food is ready",
            progress: 50
        },

        {
            message: "🛵 Rider is on the way",
            progress: 75
        },

        {
            message: "🎉 Delivered",
            progress: 100
        }

    ];



    let currentStage = 0;



    function updateOrderStage() {


        /*
        Stop when all stages are finished.
        */


        if (
            currentStage >= stages.length
        ) {

            return;

        }



        const stage =
            stages[currentStage];



        orderStatus.textContent =
            stage.message;


        progressBar.style.width =
            `${stage.progress}%`;



        currentStage++;



        /*
        Run the function again
        after 3 seconds.
        */


        if (
            currentStage < stages.length
        ) {


            setTimeout(
                updateOrderStage,
                3000
            );

        }

    }



    updateOrderStage();

}


async function verifyPaymentFromCallback() {

    const reference =
        new URLSearchParams(window.location.search).get("reference") ||
        new URLSearchParams(window.location.search).get("trxref");


    if (!reference) {

        return;

    }


    try {

        showToast("Confirming payment with the server...");


        const response = await fetch(apiUrl("/api/payments/verify"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({ reference })
        });


        const result = await response.json();


        if (result.status !== "SUCCESS") {

            throw new Error(result.error || "Payment is not confirmed yet.");

        }


        orderSection.classList.remove("hidden");

        orderNumber.textContent =
            `Order #${result.orderId}`;

        paymentStatus.textContent =
            "Payment successful (server verified)";

        orderStatus.textContent =
            "Payment confirmed. Preparing your food.";

        showToast("Payment successful 🎉");

        window.history.replaceState({}, document.title, window.location.pathname);


    } catch (error) {

        showToast(`Payment pending: ${error.message}`);

    }

}



// ============================================================
// 🟢 LEVEL 22 — START THE APPLICATION
// ============================================================

/*
This is where our application begins.

Instead of:

renderFoods(foods);

we are pretending the foods
come from a server.

So we use:

loadFoods();
*/


loadFoods();


updateCart();


verifyPaymentFromCallback();



/*
==============================================================
                    🎓 STUDENT PRACTICE AREA
==============================================================


DO NOT TRY EVERYTHING AT ONCE.


=============================
🟢 CHALLENGE 1
=============================

Add 2 new foods.


=============================
🟢 CHALLENGE 2
=============================

Create a new category:

"Snacks"


=============================
🟢 CHALLENGE 3
=============================

Create a function:

function clearCart() {

}

It should remove everything from cart.


=============================
🟢 CHALLENGE 4
=============================

Create:

function calculateDeliveryFee() {

}

If cart total is:

below ₦5,000
delivery = ₦1000

above ₦5,000
delivery = ₦500

above ₦10,000
delivery = FREE


=============================
🟡 CHALLENGE 5
=============================

Make search work together
with category filters.


=============================
🟡 CHALLENGE 6
=============================

Create another button:

"Sort by Price"

Use:

.sort()


=============================
🟡 CHALLENGE 7
=============================

Create:

getMostExpensiveFood()

Use JavaScript to find
the most expensive food.


=============================
🟡 CHALLENGE 8
=============================

Change:

const serverIsWorking = true;

to:

const serverIsWorking = false;

What happens?

WHY?


=============================
🔴 CHALLENGE 9
=============================

Instead of our fake Promise,
fetch products from a real API.


=============================
🔴 CHALLENGE 10
=============================

Save the cart using:

localStorage

So refreshing the page
doesn't destroy the cart.


==============================================================
*/