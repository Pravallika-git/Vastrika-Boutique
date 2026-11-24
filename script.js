/* ==========================================
   VASTRIKA BOUTIQUE - COMPLETE SCRIPT.JS

   Product Pages
   Jewellery Free Size
   Quantity Selection
   Shopping Cart
   COD Checkout
========================================== */


/* ==========================================
   PRODUCT DATABASE
========================================== */

const products = [

    {
        id: "floral-anarkali",
        name: "Floral Anarkali Suit",
        price: 2499,
        image: "static/images/Floral Anarkali Suit.jpg",
        category: "traditional",
        quality: "Premium Floral Fabric",
        description: "A beautiful floral Anarkali suit with elegant detailing. Perfect for festive occasions, celebrations and family functions."
    },

    {
        id: "emerald-saree",
        name: "Emerald Silk Saree",
        price: 3999,
        image: "static/images/Emerald Silk Saree.jpg",
        category: "saree",
        quality: "Premium Silk",
        description: "An elegant emerald silk saree with a luxurious traditional look. A beautiful choice for weddings and special occasions."
    },

    {
        id: "designer-lehenga",
        name: "Designer Lehenga",
        price: 5999,
        image: "static/images/Designer Lehenga.jpg",
        category: "traditional",
        quality: "Premium Designer Collection",
        description: "A stunning designer lehenga with beautiful detailing. Perfect for weddings, receptions and festive celebrations."
    },

    {
        id: "denim-jeans",
        name: "Denim Jeans",
        price: 1499,
        image: "static/images/Denim Jeans.jpg",
        category: "jeans",
        quality: "Premium Denim",
        description: "Stylish and comfortable denim jeans designed for everyday fashion."
    },

    {
        id: "royal-saree",
        name: "Royal Silk Saree",
        price: 4499,
        image: "static/images/Royal Silk Saree.jpg",
        category: "saree",
        quality: "Premium Royal Silk",
        description: "A royal silk saree that brings traditional beauty and timeless elegance to your wardrobe."
    },

    {
        id: "lavender-gown",
        name: "Lavender Party Gown",
        price: 3299,
        image: "static/images/Lavender Party Gown.jpg",
        category: "party",
        quality: "Premium Party Wear",
        description: "A graceful lavender party gown with a beautiful silhouette. Perfect for parties and special celebrations."
    },

    {
        id: "temple-jewellery",
        name: "Temple Jewellery",
        price: 1899,
        image: "static/images/Temple Jewellery.jpg",
        category: "jewellery",
        quality: "Traditional Jewellery Collection",
        description: "Traditional temple jewellery inspired by timeless Indian craftsmanship."
    },

    {
        id: "traditional-saree",
        name: "Traditional Saree",
        price: 2799,
        image: "static/images/traditional wear.jpg",
        category: "saree",
        quality: "Premium Traditional Fabric",
        description: "A beautiful traditional saree for festive celebrations and special family occasions."
    },

    {
        id: "party-wear",
        name: "Party Wear Dress",
        price: 2999,
        image: "static/images/Party Wear.jpg",
        category: "party",
        quality: "Premium Party Collection",
        description: "A fashionable party wear outfit designed to make every celebration special."
    },

    {
        id: "western-wear",
        name: "Western Wear",
        price: 1799,
        image: "static/images/western wear.jpg",
        category: "western",
        quality: "Premium Fashion Wear",
        description: "Modern western fashion with a stylish and comfortable look for everyday wear."
    },

    {
        id: "elegant-saree",
        name: "Elegant Saree",
        price: 2499,
        image: "static/images/saree.jpg",
        category: "saree",
        quality: "Premium Saree Collection",
        description: "An elegant saree with beautiful traditional styling for your special occasions."
    },

    {
        id: "classic-lehenga",
        name: "Classic Lehenga",
        price: 4999,
        image: "static/images/lehenga.jpg",
        category: "traditional",
        quality: "Premium Designer Fabric",
        description: "A classic lehenga designed for beautiful celebrations and unforgettable occasions."
    },

    {
        id: "designer-jewellery",
        name: "Designer Jewellery",
        price: 1599,
        image: "static/images/jewellery.jpg",
        category: "jewellery",
        quality: "Premium Jewellery Collection",
        description: "Beautiful designer jewellery to complete your favourite traditional and modern outfits."
    },

    {
        id: "classic-jeans",
        name: "Classic Jeans",
        price: 1299,
        image: "static/images/jeans.jpg",
        category: "jeans",
        quality: "Premium Denim",
        description: "Classic everyday jeans offering a stylish look and comfortable fit."
    },

    {
        id: "elegant-footwear",
        name: "Elegant Footwear",
        price: 1199,
        image: "static/images/footwear.jpg",
        category: "western",
        quality: "Premium Footwear",
        description: "Elegant footwear to complement your everyday and occasion wear."
    }

];


/* ==========================================
   NEW ARRIVALS AND BEST SELLERS
========================================== */

const arrivalIds = [

    "floral-anarkali",
    "emerald-saree",
    "designer-lehenga",
    "denim-jeans"

];

const bestsellerIds = [

    "royal-saree",
    "lavender-gown",
    "temple-jewellery"

];


/* ==========================================
   PRODUCT HELPERS
========================================== */

function getProduct(id) {

    return products.find(
        product => product.id === id
    );
}


function formatPrice(amount) {

    return "₹" + Number(amount).toLocaleString("en-IN");
}


/* ==========================================
   JEWELLERY SIZE CHECK
========================================== */

function isJewellery(id) {

    return [

        "temple-jewellery",
        "designer-jewellery"

    ].includes(id);
}


/* ==========================================
   CORRECT SIZE FOR EACH PRODUCT
========================================== */

function getDefaultSize(id) {

    return isJewellery(id)
        ? "Free Size"
        : "M";
}


function normalizeSize(id, size) {

    if (isJewellery(id)) {

        return "Free Size";
    }

    return ["S", "M", "L", "XL"].includes(size)

        ? size

        : "M";
}


/* ==========================================
   QUANTITY VALIDATION
========================================== */

function normalizeQuantity(quantity) {

    return Math.max(

        1,

        Math.min(
            99,
            parseInt(quantity, 10) || 1
        )

    );
}


/* ==========================================
   SHOPPING CART STORAGE
========================================== */

function getCart() {

    try {

        const stored = JSON.parse(

            localStorage.getItem("vastrikaCart") || "[]"

        );

        if (!Array.isArray(stored)) {

            return [];
        }

        const cart = [];

        stored.forEach(item => {

            if (!item || !getProduct(item.id)) {

                return;
            }

            const size = normalizeSize(
                item.id,
                item.size
            );

            const quantity = normalizeQuantity(
                item.quantity
            );

            const existing = cart.find(entry =>

                entry.id === item.id &&
                entry.size === size

            );

            if (existing) {

                existing.quantity = Math.min(

                    99,

                    existing.quantity + quantity

                );

            } else {

                cart.push({

                    id: item.id,

                    size: size,

                    quantity: quantity

                });
            }

        });

        return cart;

    } catch (error) {

        return [];
    }
}


/* SAVE SHOPPING CART */

function saveCart(cart) {

    try {

        localStorage.setItem(

            "vastrikaCart",

            JSON.stringify(cart)

        );

        updateCartCount();

        return true;

    } catch (error) {

        alert(
            "The shopping bag could not be saved in this browser."
        );

        return false;
    }
}


/* UPDATE CART COUNT */

function updateCartCount() {

    const count = getCart().reduce(

        (total, item) => total + item.quantity,

        0

    );

    document.querySelectorAll(".cart-count")
        .forEach(element => {

            element.textContent = count;

        });
}


/* ==========================================
   BEAUTIFUL ADD TO CART NOTIFICATION
========================================== */

let cartToastTimer;


function showCartToast(product, size, quantity) {

    const previousToast = document.querySelector(
        ".cart-toast"
    );

    if (previousToast) {

        previousToast.remove();
    }

    clearTimeout(cartToastTimer);

    const toast = document.createElement("div");

    toast.className = "cart-toast";

    toast.setAttribute("role", "status");


    toast.innerHTML = `

        <button type="button"
                class="toast-close"
                aria-label="Close notification">

            ×

        </button>

        <div class="toast-content">

            <img src="${product.image}"
                 alt="${product.name}"
                 class="toast-image">

            <div class="toast-details">

                <h4>✓ Added to your cart!</h4>

                <p>${product.name}</p>

                <p>
                    Size: ${size} · Qty: ${quantity}
                </p>

                <strong>

                    ${formatPrice(product.price * quantity)}

                </strong>

            </div>

        </div>

        <a href="cart.html"
           class="toast-view-cart">

            VIEW CART

        </a>

    `;


    document.body.appendChild(toast);


    toast.querySelector(".toast-close")
        .addEventListener("click", () => {

            toast.remove();

            clearTimeout(cartToastTimer);

        });


    cartToastTimer = setTimeout(() => {

        toast.remove();

    }, 4000);
}


/* ==========================================
   ADD TO CART
   SUPPORTS FREE SIZE AND QUANTITY
========================================== */

function addToCart(

    id,

    size = getDefaultSize(id),

    quantity = 1

) {

    const product = getProduct(id);

    if (!product) {

        return;
    }


    size = normalizeSize(id, size);

    quantity = normalizeQuantity(quantity);


    const cart = getCart();


    const existing = cart.find(item =>

        item.id === id &&

        item.size === size

    );


    const previousQuantity = existing

        ? existing.quantity

        : 0;


    const addedQuantity = Math.min(

        quantity,

        99 - previousQuantity

    );


    if (addedQuantity <= 0) {

        alert(
            "Maximum quantity of 99 reached for this product."
        );

        return;
    }


    if (existing) {

        existing.quantity += addedQuantity;

    } else {

        cart.push({

            id: id,

            size: size,

            quantity: addedQuantity

        });
    }


    if (saveCart(cart)) {

        showCartToast(

            product,

            size,

            addedQuantity

        );
    }
}


/* ==========================================
   PRODUCT CARDS
========================================== */

function productCard(

    product,

    showPrice = true,

    showButtons = true

) {

    return `

        <div class="product-card">

            <a class="product-image"
               href="product.html?id=${product.id}">

                <img src="${product.image}"
                     alt="${product.name}"
                     loading="lazy">

            </a>

            <div class="product-info">

                <h3>

                    ${product.name}

                </h3>


                ${showPrice ? `

                    <p class="product-price">

                        ${formatPrice(product.price)}

                    </p>

                ` : ""}


                ${showButtons ? `

                    <div class="product-actions">

                        <a href="product.html?id=${product.id}">

                            VIEW PRODUCT

                        </a>


                        <button type="button"

                            onclick="addToCart('${product.id}')">

                            ADD TO CART

                        </button>

                    </div>

                ` : ""}

            </div>

        </div>

    `;
}


/* RENDER PRODUCT CARDS */

function renderProducts(

    containerId,

    productList,

    showPrice = true,

    showButtons = true

) {

    const container = document.getElementById(
        containerId
    );

    if (!container) {

        return;
    }


    container.innerHTML = productList.map(product =>

        productCard(

            product,

            showPrice,

            showButtons

        )

    ).join("");
}


/* ==========================================
   HOME PAGE
========================================== */

function initializeHome() {

    const arrivals = arrivalIds

        .map(getProduct)

        .filter(Boolean);


    const bestsellers = bestsellerIds

        .map(getProduct)

        .filter(Boolean);


    renderProducts(

        "home-arrivals",

        arrivals,

        false,

        false

    );


    renderProducts(

        "home-bestsellers",

        bestsellers,

        false,

        false

    );
}


/* ==========================================
   COLLECTIONS PAGE
========================================== */

function initializeCollections() {

    const container = document.getElementById(
        "collections-products"
    );

    if (!container) {

        return;
    }


    const category = new URLSearchParams(

        window.location.search

    ).get("category");


    const selection = category && category !== "all"

        ? products.filter(product =>

            product.category === category

        )

        : products;


    renderProducts(

        "collections-products",

        selection

    );
}


/* ==========================================
   NEW ARRIVALS PAGE
========================================== */

function initializeArrivals() {

    const arrivals = arrivalIds

        .map(getProduct)

        .filter(Boolean);


    renderProducts(

        "arrivals-products",

        arrivals

    );
}


/* ==========================================
   BEST SELLERS PAGE
========================================== */

function initializeBestsellers() {

    const bestsellers = bestsellerIds

        .map(getProduct)

        .filter(Boolean);


    renderProducts(

        "bestsellers-products",

        bestsellers

    );
}


/* ==========================================
   PRODUCT DETAILS PAGE
========================================== */

function initializeProductDetails() {

    const image = document.getElementById(
        "detail-image"
    );

    if (!image) {

        return;
    }


    const id = new URLSearchParams(

        window.location.search

    ).get("id");


    const product = getProduct(id);


    /* PRODUCT NOT FOUND */

    if (!product) {

        const details = document.getElementById(
            "product-details"
        );


        if (details) {

            details.innerHTML = `

                <div class="empty-cart">

                    <h2>Product Not Found</h2>

                    <a href="collections.html"
                       class="btn">

                        SHOP NOW

                    </a>

                </div>

            `;
        }

        return;
    }


    /* DISPLAY PRODUCT DETAILS */

    document.title = product.name + " | Vastrika";


    image.src = product.image;

    image.alt = product.name;


    document.getElementById("detail-name")
        .textContent = product.name;


    document.getElementById("detail-price")
        .textContent = formatPrice(product.price);


    document.getElementById("detail-description")
        .textContent = product.description;


    /* PRODUCT INFORMATION */

    const info = document.querySelector(
        ".product-quality"
    );


    if (info) {

        info.innerHTML = `

            <h3>Product Information</h3>

            <p>
                <strong>Quality:</strong>
                ${product.quality}
            </p>

            <p>
                <strong>Style:</strong>
                Elegant Boutique Collection
            </p>

            <p>
                <strong>Brand:</strong>
                Vastrika
            </p>

            <p>
                <strong>Category:</strong>
                ${product.category}
            </p>

        `;
    }


    /* =====================================
       CHECK JEWELLERY PRODUCTS
    ===================================== */

    const jewellery = isJewellery(product.id);


    let selectedSize = jewellery

        ? "Free Size"

        : "M";


    let selectedQuantity = 1;


    /* =====================================
       DYNAMIC SIZE BUTTONS
    ===================================== */

    const sizeContainer = document.getElementById(
        "size-options"
    );


    if (sizeContainer) {

        if (jewellery) {

            /* ONLY FREE SIZE FOR JEWELLERY */

            sizeContainer.innerHTML = `

                <button type="button"

                    class="size-btn free-size-btn active"

                    data-size="Free Size"

                    aria-pressed="true">

                    Free Size

                </button>

            `;

        } else {

            /* NORMAL S M L XL SIZES */

            sizeContainer.innerHTML =

                ["S", "M", "L", "XL"].map(size => `

                    <button type="button"

                        class="size-btn ${size === "M" ? "active" : ""}"

                        data-size="${size}"

                        aria-pressed="${size === "M"}">

                        ${size}

                    </button>

                `).join("");
        }


        /* SIZE BUTTON CLICK */

        const sizeButtons = sizeContainer.querySelectorAll(
            ".size-btn"
        );


        sizeButtons.forEach(button => {

            button.addEventListener("click", () => {

                selectedSize = button.dataset.size;


                sizeButtons.forEach(btn => {

                    btn.classList.toggle(

                        "active",

                        btn === button

                    );

                    btn.setAttribute(

                        "aria-pressed",

                        String(btn === button)

                    );

                });

            });

        });

    }


    /* =====================================
       QUANTITY SELECTOR - JEWELLERY ONLY
    ===================================== */

    const quantitySection = document.getElementById(
        "product-quantity"
    );

    const quantityText = document.getElementById(
        "detail-quantity"
    );

    const quantityMinus = document.getElementById(
        "quantity-minus"
    );

    const quantityPlus = document.getElementById(
        "quantity-plus"
    );

    const totalPrice = document.getElementById(
        "detail-total"
    );


    /* SHOW ONLY FOR JEWELLERY */

    if (quantitySection) {

        quantitySection.hidden = !jewellery;
    }


    /* UPDATE QUANTITY AND TOTAL PRICE */

    function updateProductQuantity() {

        if (quantityText) {

            quantityText.textContent =
                selectedQuantity;
        }


        if (totalPrice) {

            totalPrice.textContent = formatPrice(

                product.price * selectedQuantity

            );
        }


        if (quantityMinus) {

            quantityMinus.disabled =
                selectedQuantity <= 1;
        }


        if (quantityPlus) {

            quantityPlus.disabled =
                selectedQuantity >= 99;
        }
    }


    if (jewellery) {

        quantityMinus?.addEventListener(
            "click",
            () => {

                selectedQuantity = Math.max(

                    1,

                    selectedQuantity - 1

                );

                updateProductQuantity();

            }
        );


        quantityPlus?.addEventListener(
            "click",
            () => {

                selectedQuantity = Math.min(

                    99,

                    selectedQuantity + 1

                );

                updateProductQuantity();

            }
        );


        updateProductQuantity();
    }


    /* =====================================
       ADD PRODUCT TO CART
    ===================================== */

    document.getElementById("detail-add")

        ?.addEventListener("click", () => {

            addToCart(

                product.id,

                selectedSize,

                selectedQuantity

            );

        });


    /* CONTINUE SHOPPING */

    document.getElementById("detail-back")

        ?.addEventListener("click", () => {

            window.location.href = "collections.html";

        });

}


/* ==========================================
   SHOPPING CART PAGE
========================================== */

function initializeCart() {

    const container = document.getElementById(
        "cart-items"
    );

    if (!container) {

        return;
    }


    const summary = document.getElementById(
        "cart-summary"
    );


    function renderCart() {

        const cart = getCart();


        /* EMPTY CART */

        if (cart.length === 0) {

            container.innerHTML = `

                <div class="empty-cart">

                    <h2>Your Bag Is Empty</h2>

                    <p>

                        You haven't added anything
                        to your bag yet.

                    </p>

                    <a href="collections.html"
                       class="btn">

                        EXPLORE COLLECTIONS

                    </a>

                </div>

            `;


            if (summary) {

                summary.style.display = "none";
            }

            return;
        }


        if (summary) {

            summary.style.display = "block";
        }


        let subtotal = 0;


        container.innerHTML = cart.map(item => {

            const product = getProduct(item.id);


            const itemTotal =

                product.price * item.quantity;


            subtotal += itemTotal;


            return `

                <div class="cart-item">

                    <img src="${product.image}"
                         alt="${product.name}">


                    <div>

                        <h3>

                            ${product.name}

                        </h3>


                        <p>

                            ${formatPrice(product.price)}

                        </p>


                        <small>

                            Size: ${item.size}

                        </small>


                        <div class="quantity-controls">

                            <button type="button"

                                aria-label="Decrease quantity"

                                onclick="changeQuantity('${item.id}','${item.size}',-1)">

                                −

                            </button>


                            <span>

                                ${item.quantity}

                            </span>


                            <button type="button"

                                aria-label="Increase quantity"

                                onclick="changeQuantity('${item.id}','${item.size}',1)"

                                ${item.quantity >= 99 ? "disabled" : ""}>

                                +

                            </button>

                        </div>


                        <button type="button"

                            class="remove-btn"

                            onclick="removeFromCart('${item.id}','${item.size}')">

                            Remove

                        </button>

                    </div>


                    <div>

                        <strong>

                            ${formatPrice(itemTotal)}

                        </strong>

                    </div>

                </div>

            `;

        }).join("");


        document.getElementById("cart-subtotal")

            .textContent = formatPrice(subtotal);


        document.getElementById("cart-total")

            .textContent = formatPrice(subtotal);

    }


    /* =====================================
       CHANGE CART QUANTITY
    ===================================== */

    window.changeQuantity = function(

        id,

        size,

        amount

    ) {

        const cart = getCart();


        size = normalizeSize(id, size);


        const item = cart.find(entry =>

            entry.id === id &&

            entry.size === size

        );


        if (!item) {

            return;
        }


        item.quantity = Math.min(

            99,

            item.quantity + amount

        );


        const nextCart = cart.filter(entry =>

            entry.quantity > 0

        );


        if (saveCart(nextCart)) {

            renderCart();
        }
    };


    /* =====================================
       REMOVE PRODUCT
    ===================================== */

    window.removeFromCart = function(id, size) {

        size = normalizeSize(id, size);


        const nextCart = getCart().filter(item =>

            !(

                item.id === id &&

                item.size === size

            )

        );


        if (saveCart(nextCart)) {

            renderCart();
        }
    };


    /* =====================================
       PROCEED TO CHECKOUT
    ===================================== */

    document.getElementById("checkout-btn")

        ?.addEventListener("click", () => {

            if (getCart().length === 0) {

                alert(
                    "Your shopping bag is empty!"
                );

                return;
            }


            window.location.href = "checkout.html";

        });


    renderCart();
}


/* ==========================================
   CASH ON DELIVERY CHECKOUT
========================================== */

function initializeCheckout() {

    const form = document.getElementById(
        "checkout-form"
    );

    if (!form) {

        return;
    }


    const layout = document.getElementById(
        "checkout-layout"
    );


    const empty = document.getElementById(
        "checkout-empty"
    );


    const confirmation = document.getElementById(
        "checkout-confirmation"
    );


    const cart = getCart();


    /* EMPTY SHOPPING BAG */

    if (cart.length === 0) {

        layout.hidden = true;

        empty.hidden = false;

        return;
    }


    empty.hidden = true;

    layout.hidden = false;


    let subtotal = 0;


    /* =====================================
       CHECKOUT PRODUCT SUMMARY
    ===================================== */

    document.getElementById("checkout-items").innerHTML =

        cart.map(item => {

            const product = getProduct(item.id);


            const itemTotal =

                product.price * item.quantity;


            subtotal += itemTotal;


            return `

                <div class="checkout-item">

                    <img src="${product.image}"
                         alt="${product.name}">


                    <div class="checkout-item-info">

                        <strong>

                            ${product.name}

                        </strong>


                        <small>

                            Size: ${item.size}

                            · Qty: ${item.quantity}

                        </small>


                        <span>

                            ${formatPrice(itemTotal)}

                        </span>

                    </div>

                </div>

            `;

        }).join("");


    document.getElementById("checkout-subtotal")

        .textContent = formatPrice(subtotal);


    /* =====================================
       SAVE COD ORDER DRAFT
    ===================================== */

    let orderSaved = false;


    form.addEventListener("submit", event => {

        event.preventDefault();


        if (orderSaved) {

            return;
        }


        if (!form.reportValidity()) {

            return;
        }


        const data = new FormData(form);


        const field = name =>

            String(data.get(name) || "").trim();


        const name = field("name");

        const phone = field("phone");

        const email = field("email");

        const address = field("address");

        const landmark = field("landmark");

        const city = field("city");

        const state = field("state");

        const pincode = field("pincode");


        const errorElement = document.getElementById(
            "checkout-error"
        );


        errorElement.textContent = "";


        /* VALIDATE DELIVERY DETAILS */

        if (

            !name ||

            !address ||

            !city ||

            !state ||

            !/^[0-9]{10}$/.test(phone) ||

            !/^[0-9]{6}$/.test(pincode)

        ) {

            errorElement.textContent =

                "Please complete every required field and check your phone number and PIN code.";

            return;
        }


        /* CHECK FOR CART CHANGES */

        if (

            JSON.stringify(getCart()) !==

            JSON.stringify(cart)

        ) {

            errorElement.textContent =

                "Your cart has changed. Please refresh the checkout page.";

            return;
        }


        /* CREATE ORDER REFERENCE */

        const orderId =

            "VAS-" +

            Date.now().toString(36).toUpperCase();


        /* ORDER INFORMATION */

        const order = {

            orderId: orderId,


            customer: {

                name: name,

                phone: phone,

                email: email,

                address: address,

                landmark: landmark,

                city: city,

                state: state,

                pincode: pincode

            },


            payment: "Cash on Delivery",


            items: cart.map(item => {

                const product = getProduct(item.id);


                return {

                    id: item.id,

                    name: product.name,

                    price: product.price,

                    size: item.size,

                    quantity: item.quantity

                };

            }),


            subtotal: subtotal,


            status: "Demo draft - not sent to boutique",


            createdAt: new Date().toISOString()

        };


        /* SAVE ORDER IN BROWSER */

        try {

            const saved = JSON.parse(

                localStorage.getItem(
                    "vastrikaCODOrders"
                ) || "[]"

            );


            const orders = Array.isArray(saved)

                ? saved

                : [];


            orders.push(order);


            localStorage.setItem(

                "vastrikaCODOrders",

                JSON.stringify(orders)

            );


            orderSaved = true;

        } catch (error) {

            errorElement.textContent =

                "Could not save the order in this browser. Please try again.";

            return;
        }


        /* =====================================
           PREPARE ORDER DETAILS
        ===================================== */

        const orderText = [

            "VASTRIKA - COD ORDER REQUEST (NOT YET CONFIRMED)",


            "Order ID: " + orderId,


            "Customer: " + name,


            "Phone: " + phone,


            "Email: " + (email || "Not provided"),


            "Address: " + address,


            landmark

                ? "Landmark: " + landmark

                : "",


            "City/State/PIN: " +

                city + ", " + state + " - " + pincode,


            "",


            "Products:",


            ...order.items.map(item =>

                `${item.name} | Size: ${item.size} | Qty: ${item.quantity} | ${formatPrice(item.price * item.quantity)}`

            ),


            "",


            "Subtotal: " + formatPrice(subtotal),


            "Delivery charges: To be confirmed",


            "Payment: Cash on Delivery",


            "Please confirm the order and delivery details."


        ].filter(Boolean).join("\n");


        /* =====================================
           ORDER SUCCESS DETAILS
        ===================================== */

        document.getElementById("order-reference")

            .textContent = orderId;


        document.getElementById("order-customer")

            .textContent = name;


        document.getElementById("order-total")

            .textContent = formatPrice(subtotal);


        document.getElementById("order-text")

            .value = orderText;


        /* PREPARE ORDER EMAIL */

        document.getElementById("send-order-email").href =

            "mailto:?subject=" +

            encodeURIComponent(

                "Vastrika COD order " + orderId

            ) +

            "&body=" +

            encodeURIComponent(orderText);


        /* =====================================
           COPY ORDER DETAILS
        ===================================== */

        document.getElementById("copy-order-btn")

            .addEventListener("click", async () => {

                const message = document.getElementById(
                    "copy-message"
                );


                try {

                    await navigator.clipboard.writeText(

                        orderText

                    );


                    message.textContent =

                        "Order details copied!";

                } catch (error) {

                    const box = document.getElementById(
                        "order-text"
                    );


                    box.focus();

                    box.select();


                    message.textContent =

                        "Select and copy the order details below.";
                }

            });


        /* CLEAR SHOPPING CART */

        saveCart([]);


        /* SHOW ORDER SUCCESS */

        layout.hidden = true;

        confirmation.hidden = false;


        window.scrollTo(0, 0);

    });

}


/* ==========================================
   CONTACT PAGE
========================================== */

function initializeContact() {

    const form = document.getElementById(
        "contact-form"
    );


    if (!form) {

        return;
    }


    form.addEventListener("submit", event => {

        event.preventDefault();


        const message = document.getElementById(
            "contact-message"
        );


        if (message) {

            message.textContent =

                "Thank you! This is a demo contact form; the message has not been sent.";

        }


        form.reset();

    });
}


/* ==========================================
   START VASTRIKA WEBSITE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    initializeHome();

    initializeCollections();

    initializeArrivals();

    initializeBestsellers();

    initializeProductDetails();

    initializeCart();

    initializeCheckout();

    initializeContact();

});


/* ==========================================
   END OF VASTRIKA SCRIPT.JS
========================================== */