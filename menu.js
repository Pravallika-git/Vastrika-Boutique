/* =========================================
   VASTRIKA - MINIMAL PROFESSIONAL SIDE MENU
   MODERN CUSTOMER ACCOUNT
   FRONTEND LOGIN DEMO
========================================= */

(() => {

    "use strict";

    const SESSION_KEY = "vastrikaMobileSession";
    const AFTER_LOGIN_KEY = "vastrikaAfterLogin";

    const protectedPages = new Set([
        "collections.html",
        "arrivals.html",
        "bestsellers.html",
        "about.html",
        "contact.html",
        "product.html",
        "cart.html",
        "checkout.html"
    ]);

    /* PROFESSIONAL OUTLINE ICONS */

    const icons = {

        user: `
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 21v-2a8 8 0 0 1 16 0v2"/>
        `,

        home: `
            <path d="M3 10l9-7 9 7"/>
            <path d="M5 9v12h14V9"/>
            <path d="M9 21v-7h6v7"/>
        `,

        collections: `
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
        `,

        arrivals: `
            <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>
        `,

        star: `
            <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>
        `,

        bag: `
            <path d="M5 7h14l2 14H3L5 7z"/>
            <path d="M8 9V6a4 4 0 0 1 8 0v3"/>
        `,

        info: `
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 11v5"/>
            <path d="M12 7h.01"/>
        `,

        mail: `
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path d="M3 7l9 6 9-6"/>
        `,

        logout: `
            <path d="M10 17l5-5-5-5"/>
            <path d="M15 12H3"/>
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        `,

        menu: `
            <path d="M4 6h16"/>
            <path d="M4 12h16"/>
            <path d="M4 18h16"/>
        `,

        close: `
            <path d="M6 6l12 12"/>
            <path d="M18 6L6 18"/>
        `,

        arrow: `
            <path d="M9 6l6 6-6 6"/>
        `

    };

    function icon(name) {

        return `
            <svg
                class="vm-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                ${icons[name] || ""}
            </svg>
        `;
    }

    /* GET LOGGED-IN CUSTOMER */

    function getCustomer() {

        try {

            const customer = JSON.parse(
                sessionStorage.getItem(SESSION_KEY) || "null"
            );

            if (
                customer &&
                typeof customer.name === "string" &&
                typeof customer.phone === "string" &&
                /^[6-9]\d{9}$/.test(customer.phone)
            ) {
                return customer;
            }

        } catch (error) {}

        return null;
    }

    document.addEventListener("DOMContentLoaded", () => {

        const header = document.querySelector(".header");

        const logo = header?.querySelector(".logo");

        if (!header || !logo) return;

        if (document.getElementById("vm-menu-toggle")) {
            return;
        }

        /* =====================================
           MENU BUTTON
        ===================================== */

        const menuButton = document.createElement("button");

        menuButton.id = "vm-menu-toggle";

        menuButton.className = "vm-menu-toggle";

        menuButton.type = "button";

        menuButton.innerHTML = icon("menu");

        menuButton.setAttribute(
            "aria-label",
            "Open Vastrika menu"
        );

        menuButton.setAttribute(
            "aria-controls",
            "vm-sidebar"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        header.insertBefore(menuButton, logo);

        /* =====================================
           BACKGROUND OVERLAY
        ===================================== */

        const overlay = document.createElement("button");

        overlay.type = "button";

        overlay.className = "vm-overlay";

        overlay.setAttribute(
            "aria-label",
            "Close side menu"
        );

        overlay.tabIndex = -1;

        document.body.appendChild(overlay);

        /* =====================================
           NEW MINIMAL SIDEBAR
        ===================================== */

        const sidebar = document.createElement("aside");

        sidebar.id = "vm-sidebar";

        sidebar.className = "vm-sidebar vm-minimal-sidebar";

        sidebar.inert = true;

        sidebar.setAttribute(
            "aria-label",
            "Vastrika navigation menu"
        );

        sidebar.innerHTML = `

            <!-- SIDEBAR HEADER -->

            <div class="vm-sidebar-head">

                <strong>
                    VASTRIKA<span>.</span>
                </strong>

                <button
                    type="button"
                    class="vm-close"
                    aria-label="Close menu"
                >
                    ${icon("close")}
                </button>

            </div>

            <!-- COMPACT CUSTOMER PROFILE -->

            <div class="vm-sidebar-profile">

                <div class="vm-sidebar-avatar">

                    ${icon("user")}

                </div>

                <div class="vm-sidebar-profile-info">

                    <small id="vm-welcome-label">
                        WELCOME TO VASTRIKA
                    </small>

                    <h2 id="vm-greeting">
                        Hello, Guest
                    </h2>

                </div>

            </div>

            <!-- CUSTOMER ACCOUNT -->

            <div class="vm-account-links">

                <button
                    id="vm-login"
                    type="button"
                    class="vm-primary"
                >

                    ${icon("user")}

                    <span>Login / Sign Up</span>

                </button>

                <button
                    id="vm-account"
                    type="button"
                    class="vm-menu-item"
                >

                    ${icon("user")}

                    <span>My Account</span>

                </button>

            </div>

            <div class="vm-divider"></div>

            <small class="vm-menu-caption">
                EXPLORE VASTRIKA
            </small>

            <!-- NAVIGATION LINKS -->

            <nav class="vm-pages">

                <a href="index.html">

                    ${icon("home")}

                    <span>Home</span>

                </a>

                <a href="collections.html">

                    ${icon("collections")}

                    <span>Collections</span>

                </a>

                <a href="arrivals.html">

                    ${icon("arrivals")}

                    <span>New Arrivals</span>

                </a>

                <a href="bestsellers.html">

                    ${icon("star")}

                    <span>Best Sellers</span>

                </a>

                <a href="cart.html">

                    ${icon("bag")}

                    <span>My Cart</span>

                </a>

                <a href="about.html">

                    ${icon("info")}

                    <span>About Us</span>

                </a>

                <a href="contact.html">

                    ${icon("mail")}

                    <span>Contact Us</span>

                </a>

            </nav>

            <!-- LOGOUT AT BOTTOM -->

            <div class="vm-sidebar-bottom">

                <div class="vm-divider"></div>

                <button
                    id="vm-logout"
                    type="button"
                    class="vm-menu-item vm-sidebar-logout"
                    hidden
                >

                    ${icon("logout")}

                    <span>Logout</span>

                </button>

                <p class="vm-tagline">

                    Elegance in Every Thread.

                </p>

            </div>

        `;

        document.body.appendChild(sidebar);

        /* =====================================
           LOGIN AND ACCOUNT POPUP
        ===================================== */

        const dialog = document.createElement("dialog");

        dialog.id = "vm-auth-dialog";

        dialog.className = "vm-auth-dialog";

        dialog.setAttribute(
            "aria-label",
            "Vastrika customer account"
        );

        dialog.innerHTML = `

            <!-- POPUP HEADER -->

            <div class="vm-dialog-heading">

                <span>

                    VASTRIKA<span class="vm-dot">.</span>

                </span>

                <button
                    id="vm-dialog-close"
                    class="vm-close"
                    type="button"
                    aria-label="Close account window"
                >

                    ${icon("close")}

                </button>

            </div>

            <!-- LOGIN DETAILS -->

            <section id="vm-login-step">

                <small class="vm-caption">

                    LOGIN / SIGN UP

                </small>

                <h2>Welcome to Vastrika</h2>

                <p class="vm-hint">

                    Enter your name and mobile number
                    to continue shopping.

                </p>

                <form id="vm-login-form">

                    <label for="vm-name">

                        Full Name

                    </label>

                    <input
                        id="vm-name"
                        type="text"
                        minlength="2"
                        maxlength="80"
                        autocomplete="name"
                        placeholder="Enter your full name"
                        required
                    >

                    <label for="vm-phone">

                        Mobile Number (+91)

                    </label>

                    <input
                        id="vm-phone"
                        type="tel"
                        inputmode="numeric"
                        pattern="[6-9][0-9]{9}"
                        maxlength="10"
                        placeholder="Enter 10-digit test number"
                        required
                    >

                    <button
                        type="submit"
                        class="vm-primary vm-wide"
                    >

                        CONTINUE TO OTP

                    </button>

                </form>

                <p class="vm-notice">

                    Welcome to Vastrika! Enter your details
                    to begin your shopping journey.

                </p>

            </section>

            <!-- OTP VERIFICATION -->

            <section id="vm-otp-step" hidden>

                <small class="vm-caption">

                    VERIFICATION CODE

                </small>

                <h2>Enter OTP</h2>

                <p class="vm-hint">

                    Enter the 6-digit demo verification
                    code (123456) to continue.

                </p>

                <form id="vm-otp-form">

                    <label for="vm-otp">

                        6-Digit Code

                    </label>

                    <input
                        id="vm-otp"
                        type="text"
                        inputmode="numeric"
                        maxlength="6"
                        pattern="[0-9]{6}"
                        placeholder="123456"
                        required
                    >

                    <button
                        type="submit"
                        class="vm-primary vm-wide"
                    >

                        CONTINUE

                    </button>

                </form>

                <button
                    id="vm-back"
                    class="vm-text-button"
                    type="button"
                >

                    ← Change Mobile Number

                </button>

            </section>

            <!-- =================================
                 MODERN MY ACCOUNT POPUP
            ================================= -->

            <section id="vm-account-step" hidden>

                <small class="vm-caption">

                    MY ACCOUNT

                </small>

                <!-- PROFILE CARD -->

                <div class="vm-profile-card">

                    <div
                        id="vm-avatar"
                        class="vm-avatar"
                    >
                        V
                    </div>

                    <div class="vm-profile-info">

                        <small>WELCOME BACK</small>

                        <h2 id="vm-account-name"></h2>

                        <p
                            id="vm-account-phone"
                            class="vm-hint"
                        ></p>

                    </div>

                </div>

                <!-- SUCCESS MESSAGE -->

                <p
                    id="vm-login-success"
                    class="vm-success"
                    role="status"
                    hidden
                >

                    ✓ Successfully logged in!

                </p>

                <div class="vm-account-divider"></div>

                <!-- SHOPPING CART -->

                <a
                    href="cart.html"
                    class="vm-cart-link"
                >

                    <span class="vm-cart-icon">

                        ${icon("bag")}

                    </span>

                    <div class="vm-cart-text">

                        <strong>

                            My Shopping Cart

                        </strong>

                        <small>

                            View your selected products

                        </small>

                    </div>

                    <span class="vm-arrow">

                        ${icon("arrow")}

                    </span>

                </a>

                <!-- CONTINUE SHOPPING -->

                <a
                    id="vm-continue-shopping"
                    href="collections.html"
                    class="vm-primary vm-wide vm-as-link"
                >

                    CONTINUE SHOPPING

                </a>

                <!-- LOGOUT -->

                <button
                    id="vm-logout-dialog"
                    class="vm-logout-link"
                    type="button"
                >

                    ${icon("logout")}

                    Logout

                </button>

                <p class="vm-account-note">

                    Demo account · Browser session only

                </p>

            </section>

            <!-- ERROR MESSAGE -->

            <p
                id="vm-auth-error"
                class="vm-error"
                role="alert"
            ></p>

        `;

        document.body.appendChild(dialog);

        /* =====================================
           ELEMENT REFERENCES
        ===================================== */

        const loginStep = dialog.querySelector(
            "#vm-login-step"
        );

        const otpStep = dialog.querySelector(
            "#vm-otp-step"
        );

        const accountStep = dialog.querySelector(
            "#vm-account-step"
        );

        const errorMessage = dialog.querySelector(
            "#vm-auth-error"
        );

        const successMessage = dialog.querySelector(
            "#vm-login-success"
        );

        const continueLink = dialog.querySelector(
            "#vm-continue-shopping"
        );

        let pendingCustomer = null;

        /* =====================================
           UPDATE CUSTOMER INFORMATION
        ===================================== */

        function updateMenu() {

            const customer = getCustomer();

            const greeting = sidebar.querySelector(
                "#vm-greeting"
            );

            const welcomeLabel = sidebar.querySelector(
                "#vm-welcome-label"
            );

            if (customer) {

                greeting.textContent =
                    "Hello, " + customer.name;

                welcomeLabel.textContent =
                    "WELCOME BACK";

            } else {

                greeting.textContent =
                    "Hello, Guest";

                welcomeLabel.textContent =
                    "WELCOME TO VASTRIKA";
            }

            sidebar.querySelector(
                "#vm-login"
            ).hidden = Boolean(customer);

            sidebar.querySelector(
                "#vm-account"
            ).hidden = !customer;

            sidebar.querySelector(
                "#vm-logout"
            ).hidden = !customer;
        }

        /* =====================================
           OPEN SIDE MENU
        ===================================== */

        function openMenu() {

            updateMenu();

            sidebar.inert = false;

            sidebar.classList.add("vm-open");

            overlay.classList.add("vm-show");

            document.body.classList.add(
                "vm-no-scroll"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            sidebar.querySelector(
                ".vm-close"
            ).focus();
        }

        /* =====================================
           CLOSE SIDE MENU
        ===================================== */

        function closeMenu() {

            sidebar.classList.remove("vm-open");

            overlay.classList.remove("vm-show");

            document.body.classList.remove(
                "vm-no-scroll"
            );

            sidebar.inert = true;

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.focus();
        }

        /* SWITCH POPUP STEPS */

        function showStep(step) {

            loginStep.hidden = step !== "login";

            otpStep.hidden = step !== "otp";

            accountStep.hidden = step !== "account";

            errorMessage.textContent = "";
        }

        /* =====================================
           OPEN LOGIN POPUP
        ===================================== */

        function openLogin(destination = null) {

            if (destination) {

                try {

                    sessionStorage.setItem(
                        AFTER_LOGIN_KEY,
                        destination
                    );

                } catch (error) {}
            }

            pendingCustomer = null;

            showStep("login");

            if (sidebar.classList.contains("vm-open")) {

                closeMenu();
            }

            if (!dialog.open) {

                dialog.showModal();
            }
        }

        /* =====================================
           DISPLAY CUSTOMER ACCOUNT
        ===================================== */

        function displayAccount(
            customer,
            justLoggedIn = false
        ) {

            if (!customer) {

                openLogin();

                return;
            }

            showStep("account");

            dialog.querySelector(
                "#vm-avatar"
            ).textContent =
                customer.name.charAt(0).toUpperCase();

            dialog.querySelector(
                "#vm-account-name"
            ).textContent = customer.name;

            dialog.querySelector(
                "#vm-account-phone"
            ).textContent =
                "+91 ******" + customer.phone.slice(-4);

            successMessage.hidden = !justLoggedIn;

            continueLink.href = "collections.html";

            continueLink.textContent =
                "CONTINUE SHOPPING";

            if (justLoggedIn) {

                try {

                    const saved = sessionStorage.getItem(
                        AFTER_LOGIN_KEY
                    );

                    sessionStorage.removeItem(
                        AFTER_LOGIN_KEY
                    );

                    if (saved) {

                        const destination = new URL(
                            saved,
                            location.href
                        );

                        if (
                            destination.origin === location.origin &&
                            destination.protocol === location.protocol
                        ) {

                            continueLink.href =
                                destination.href;
                        }
                    }

                } catch (error) {}
            }
        }

        /* =====================================
           OPEN MY ACCOUNT
        ===================================== */

        function openAccount() {

            const customer = getCustomer();

            if (customer) {

                displayAccount(customer);

                if (
                    sidebar.classList.contains("vm-open")
                ) {

                    closeMenu();
                }

                if (!dialog.open) {

                    dialog.showModal();
                }

            } else {

                openLogin();
            }
        }

        /* =====================================
           CUSTOMER LOGOUT
        ===================================== */

        function logout() {

            try {

                sessionStorage.removeItem(
                    SESSION_KEY
                );

                sessionStorage.removeItem(
                    AFTER_LOGIN_KEY
                );

            } catch (error) {

                errorMessage.textContent =
                    "Unable to clear the browser session.";

                return;
            }

            pendingCustomer = null;

            if (dialog.open) {

                dialog.close();
            }

            updateMenu();

            if (sidebar.classList.contains("vm-open")) {

                closeMenu();
            }

            const page =
                location.pathname.split("/").pop() ||
                "index.html";

            if (page !== "index.html") {

                location.href = "index.html";
            }
        }

        /* =====================================
           SIDEBAR EVENTS
        ===================================== */

        menuButton.addEventListener(
            "click",
            openMenu
        );

        overlay.addEventListener(
            "click",
            closeMenu
        );

        sidebar.querySelector(
            ".vm-close"
        ).addEventListener(
            "click",
            closeMenu
        );

        sidebar.querySelector(
            "#vm-login"
        ).addEventListener("click", () => {

            openLogin();
        });

        sidebar.querySelector(
            "#vm-account"
        ).addEventListener(
            "click",
            openAccount
        );

        sidebar.querySelector(
            "#vm-logout"
        ).addEventListener(
            "click",
            logout
        );

        /* CLOSE ACCOUNT POPUP */

        dialog.querySelector(
            "#vm-dialog-close"
        ).addEventListener("click", () => {

            dialog.close();
        });

        /* ACCOUNT LOGOUT */

        dialog.querySelector(
            "#vm-logout-dialog"
        ).addEventListener(
            "click",
            logout
        );

        /* CHANGE MOBILE NUMBER */

        dialog.querySelector(
            "#vm-back"
        ).addEventListener("click", () => {

            showStep("login");
        });

        /* ESCAPE KEY */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    sidebar.classList.contains("vm-open")
                ) {

                    closeMenu();
                }
            }
        );

        /* =====================================
           CUSTOMER LOGIN FORM
        ===================================== */

        dialog.querySelector(
            "#vm-login-form"
        ).addEventListener("submit", event => {

            event.preventDefault();

            const name = dialog.querySelector(
                "#vm-name"
            ).value.trim();

            const phone = dialog.querySelector(
                "#vm-phone"
            ).value.trim();

            if (
                name.length < 2 ||
                !/^[6-9]\d{9}$/.test(phone)
            ) {

                errorMessage.textContent =
                    "Enter your full name and a valid " +
                    "10-digit Indian mobile number.";

                return;
            }

            pendingCustomer = {

                name,

                phone

            };

            showStep("otp");

            dialog.querySelector(
                "#vm-otp"
            ).value = "";

            dialog.querySelector(
                "#vm-otp"
            ).focus();
        });

        /* =====================================
           DEMO OTP VERIFICATION
        ===================================== */

        dialog.querySelector(
            "#vm-otp-form"
        ).addEventListener("submit", event => {

            event.preventDefault();

            const otp = dialog.querySelector(
                "#vm-otp"
            ).value.trim();

            if (
                otp !== "123456" ||
                !pendingCustomer
            ) {

                errorMessage.textContent =
                    "Incorrect demo code. Enter 123456.";

                return;
            }

            try {

                sessionStorage.setItem(

                    SESSION_KEY,

                    JSON.stringify(pendingCustomer)

                );

            } catch (error) {

                errorMessage.textContent =
                    "Browser storage is unavailable. " +
                    "Try VS Code Live Server.";

                return;
            }

            updateMenu();

            displayAccount(
                getCustomer(),
                true
            );
        });

        /* =====================================
           LOGIN REQUIRED BEFORE SHOPPING
        ===================================== */

        document.addEventListener("click", event => {

            if (getCustomer()) return;

            const target = event.target;

            if (!(target instanceof Element)) return;

            /* ALLOW LOGIN AND MENU CONTROLS */

            if (
                target.closest(
                    "#vm-auth-dialog, " +
                    "#vm-menu-toggle, " +
                    ".vm-overlay"
                )
            ) {

                return;
            }

            const clicked = target.closest(

                'a[href], button, [onclick], ' +
                'input[type="submit"], ' +
                'input[type="button"], ' +
                '.product-card, ' +
                '.category-card, ' +
                '.collection-card'

            );

            if (!clicked) return;

            /* ALLOW SIDEBAR BUTTONS */

            if (

                clicked.closest("#vm-sidebar") &&

                !clicked.matches("a[href]")

            ) {

                return;
            }

            let destination = location.href;

            /* SAVE DESTINATION */

            if (clicked.matches("a[href]")) {

                const href =
                    clicked.getAttribute("href");

                if (

                    !href ||

                    /^(mailto:|tel:|javascript:)/i.test(href)

                ) {

                    return;
                }

                let url;

                try {

                    url = new URL(
                        href,
                        location.href
                    );

                } catch (error) {

                    return;
                }

                if (
                    url.origin !== location.origin ||
                    url.protocol !== location.protocol
                ) {

                    return;
                }

                /* ALLOW HOME PAGE WITHOUT LOGIN */

                const targetPage =
                    url.pathname.split("/").pop();

                if (targetPage === "index.html") {

                    return;
                }

                destination = url.href;
            }

            event.preventDefault();

            event.stopImmediatePropagation();

            openLogin(destination);

        }, true);

        /* =====================================
           PROTECT FORMS BEFORE LOGIN
        ===================================== */

        document.addEventListener("submit", event => {

            if (getCustomer()) return;

            if (
                event.target.closest(
                    "#vm-auth-dialog"
                )
            ) {

                return;
            }

            event.preventDefault();

            event.stopImmediatePropagation();

            openLogin(location.href);

        }, true);

        /* =====================================
           PROTECT SHOPPING PAGE ACCESS
        ===================================== */

        const page =

            location.pathname.split("/").pop() ||

            "index.html";

        if (

            !getCustomer() &&

            protectedPages.has(page)

        ) {

            try {

                sessionStorage.setItem(

                    AFTER_LOGIN_KEY,

                    location.href

                );

            } catch (error) {}

            location.replace(

                new URL(

                    "index.html?login=required",

                    location.href

                ).href

            );

            return;
        }

        /* AUTO OPEN LOGIN POPUP */

        if (

            !getCustomer() &&

            new URLSearchParams(

                location.search

            ).get("login") === "required"

        ) {

            openLogin();
        }

        /* =====================================
           HIGHLIGHT ACTIVE SIDEBAR PAGE
        ===================================== */

        sidebar.querySelectorAll(

            ".vm-pages a"

        ).forEach(link => {

            if (

                link.getAttribute("href") === page

            ) {

                link.setAttribute(

                    "aria-current",

                    "page"

                );
            }
        });

        /* =====================================
           TOP NAVIGATION UNDERLINE
        ===================================== */

        header.querySelectorAll(

            "nav a"

        ).forEach(link => {

            try {

                const linkPage = new URL(

                    link.href,

                    location.href

                ).pathname.split("/").pop();

                link.classList.remove("active");

                link.removeAttribute("aria-current");

                if (linkPage === page) {

                    link.classList.add("active");

                    link.setAttribute(

                        "aria-current",

                        "page"

                    );
                }

            } catch (error) {}
        });

        /* =====================================
           PREFILL COD CHECKOUT DETAILS
        ===================================== */

        const customer = getCustomer();

        if (customer) {

            const nameField =
                document.getElementById("cod-name");

            const phoneField =
                document.getElementById("cod-phone");

            if (nameField && !nameField.value) {

                nameField.value = customer.name;
            }

            if (phoneField && !phoneField.value) {

                phoneField.value = customer.phone;
            }
        }

        /* INITIALIZE CUSTOMER MENU */

        updateMenu();

    });

})();

/* =========================================
   END OF VASTRIKA MENU.JS
========================================= */