/* =========================================================
   SOUL KITCHEN — INTERACTION SYSTEM
========================================================= */

document.documentElement.classList.add("js-ready");


/* =========================================================
   DOM
========================================================= */

const body = document.body;

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");

const navLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

const revealElements = document.querySelectorAll(".reveal");

const menuTabs = document.querySelectorAll(".menu-tab");

const reservationModal =
    document.querySelector("#reservationModal");

const reservationButtons =
    document.querySelectorAll("[data-reservation]");

const closeReservationButtons =
    document.querySelectorAll("[data-close-reservation]");

const reservationForm =
    document.querySelector("#reservationForm");

const reservationMessage =
    document.querySelector("#reservationMessage");

const backToTop =
    document.querySelector(".back-to-top");

const scrollButtons =
    document.querySelectorAll("[data-scroll]");

const mapButton =
    document.querySelector("[data-map]");

const toast =
    document.querySelector("#toast");


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    if (!mobileMenuBtn || !mobileNav) {
        return;
    }

    function openMenu() {

        mobileMenuBtn.classList.add("active");
        mobileNav.classList.add("active");

        body.classList.add("menu-open");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileNav.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    function closeMenu() {

        mobileMenuBtn.classList.remove("active");
        mobileNav.classList.remove("active");

        body.classList.remove("menu-open");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileNav.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    mobileMenuBtn.setAttribute(
        "aria-expanded",
        "false"
    );


    mobileMenuBtn.addEventListener("click", (event) => {

        event.preventDefault();

        if (mobileNav.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    mobileNavLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 700 &&
            mobileNav.classList.contains("active")
        ) {
            closeMenu();
        }

    });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    scrollButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const targetSelector =
                button.dataset.scroll;

            const target =
                document.querySelector(targetSelector);

            if (!target) {
                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href === "#" ||
                href.startsWith("#!")
            ) {
                return;
            }

            const target =
                document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initReveal() {

    if (!revealElements.length) {
        return;
    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {
        observer.observe(element);
    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections = document.querySelectorAll(
        "main section[id], footer[id]"
    );

    if (!sections.length) {
        return;
    }


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    navLinks.forEach((link) => {

                        const href =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            href === `#${id}`
                        );

                    });

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* =========================================================
   MENU TABS
========================================================= */

function initMenuTabs() {

    if (!menuTabs.length) {
        return;
    }


    menuTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            menuTabs.forEach((item) => {

                item.classList.remove("active");

                item.setAttribute(
                    "aria-selected",
                    "false"
                );

            });


            tab.classList.add("active");

            tab.setAttribute(
                "aria-selected",
                "true"
            );


            const category =
                tab.dataset.menuCategory;

            animateMenuChange(category);

        });

    });

}


/* =========================================================
   MENU CHANGE
========================================================= */

function animateMenuChange(category) {

    const menuDetail =
        document.querySelector(".menu-detail");

    if (!menuDetail) {
        return;
    }


    menuDetail.style.opacity = "0";
    menuDetail.style.transform =
        "translateY(15px)";


    setTimeout(() => {

        /*
         * The current HTML uses the same menu content
         * as the visual base for each category.
         *
         * This animation prepares the menu for
         * future category-specific data.
         */

        menuDetail.dataset.activeCategory =
            category;


        menuDetail.style.transition =
            "opacity .45s ease, transform .45s ease";

        menuDetail.style.opacity = "1";
        menuDetail.style.transform =
            "translateY(0)";

    }, 180);

}


/* =========================================================
   RESERVATION MODAL
========================================================= */

function initReservationModal() {

    if (!reservationModal) {
        return;
    }


    function openReservation() {

        reservationModal.classList.add(
            "is-open"
        );

        reservationModal.setAttribute(
            "aria-hidden",
            "false"
        );

        body.classList.add("modal-open");

        setTimeout(() => {

            const firstInput =
                reservationForm?.querySelector(
                    "input"
                );

            firstInput?.focus();

        }, 350);

    }


    function closeReservation() {

        reservationModal.classList.remove(
            "is-open"
        );

        reservationModal.setAttribute(
            "aria-hidden",
            "true"
        );

        body.classList.remove("modal-open");

    }


    reservationButtons.forEach((button) => {

        button.addEventListener("click", () => {
            openReservation();
        });

    });


    closeReservationButtons.forEach((button) => {

        button.addEventListener("click", () => {
            closeReservation();
        });

    });


    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            reservationModal.classList.contains(
                "is-open"
            )
        ) {
            closeReservation();
        }

    });


    reservationForm?.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const formData =
                new FormData(reservationForm);


            const name =
                formData.get("name");


            if (reservationMessage) {

                reservationMessage.textContent =
                    `Thank you${name ? `, ${name}` : ""}. Your table request has been received.`;

            }


            reservationForm.reset();

            showToast(
                "Reservation request received."
            );

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    if (!backToTop) {
        return;
    }


    function updateButton() {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateButton();

}


/* =========================================================
   MAP BUTTON
========================================================= */

function initMapButton() {

    if (!mapButton) {
        return;
    }


    mapButton.addEventListener("click", () => {

        const address =
            encodeURIComponent(
                "317 Pacific C Hwy Huntington CA 92648"
            );


        window.open(
            `https://www.google.com/maps/search/?api=1&query=${address}`,
            "_blank",
            "noopener,noreferrer"
        );

    });

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(message) {

    if (!toast) {
        return;
    }


    toast.textContent = message;

    toast.classList.add(
        "is-visible"
    );


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove(
            "is-visible"
        );

    }, 3500);

}


/* =========================================================
   IMAGE PARALLAX
========================================================= */

function initImageParallax() {

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    const images =
        document.querySelectorAll(
            ".chef__main-image img, .chef__gallery-image img"
        );


    if (!images.length) {
        return;
    }


    let ticking = false;


    function updateParallax() {

        const viewportHeight =
            window.innerHeight;


        images.forEach((image) => {

            const rect =
                image.getBoundingClientRect();


            if (
                rect.bottom < 0 ||
                rect.top > viewportHeight
            ) {
                return;
            }


            const center =
                rect.top +
                rect.height / 2;


            const offset =
                (center - viewportHeight / 2) *
                -0.035;


            image.style.transform =
                `translateY(${offset}px) scale(1.04)`;

        });


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );

}


/* =========================================================
   HERO MOUSE PARALLAX
========================================================= */

function initHeroParallax() {

    const hero =
        document.querySelector(".hero");

    const background =
        document.querySelector(
            ".hero__background"
        );


    if (!hero || !background) {
        return;
    }


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    hero.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    .5) *
                12;


            const y =
                (event.clientY /
                    window.innerHeight -
                    .5) *
                8;


            background.style.transform =
                `scale(1.06) translate(${x}px, ${y}px)`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            background.style.transform =
                "scale(1.04) translate(0, 0)";

        }
    );

}


/* =========================================================
   CARD STAGGER
========================================================= */

function initCardStagger() {

    const cards =
        document.querySelectorAll(
            ".about-card"
        );


    cards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 80}ms`;

    });

}


/* =========================================================
   HEADER SCROLL STATE
========================================================= */

function initHeaderScroll() {

    const navbar =
        document.querySelector(".navbar");


    if (!navbar) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 60) {

            navbar.classList.add(
                "navbar--scrolled"
            );

        } else {

            navbar.classList.remove(
                "navbar--scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =========================================================
   INITIALIZATION
========================================================= */

function initSoulKitchen() {

    initMobileMenu();

    initSmoothScroll();

    initReveal();

    initActiveNavigation();

    initMenuTabs();

    initReservationModal();

    initBackToTop();

    initMapButton();

    initImageParallax();

    initHeroParallax();

    initCardStagger();

    initHeaderScroll();

}


if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initSoulKitchen
    );

} else {

    initSoulKitchen();

}