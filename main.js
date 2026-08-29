"use strict";


// ======================================================
// PORTFOLIO JAVASCRIPT
// ======================================================

document.addEventListener("DOMContentLoaded", function () {


    // ==================================================
    // MOBILE MENU
    // ==================================================

    const menuToggle =
        document.getElementById("menu-toggle");

    const mobileNav =
        document.querySelector(".navlinks");


    // --------------------------------------------------
    // CLOSE MENU
    // --------------------------------------------------

    function closeMobileMenu() {

        if (menuToggle) {

            menuToggle.checked = false;

        }

    }


    // --------------------------------------------------
    // CLOSE MENU WHEN NAV LINK IS CLICKED
    // --------------------------------------------------

    if (mobileNav && menuToggle) {

        mobileNav.addEventListener(
            "click",
            function (event) {

                const clickedLink =
                    event.target.closest("a");


                if (clickedLink) {

                    closeMobileMenu();

                }

            }
        );

    }


    // --------------------------------------------------
    // CLOSE MENU WHEN ESC IS PRESSED
    // --------------------------------------------------

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    // --------------------------------------------------
    // CLOSE MENU WHEN SCREEN BECOMES DESKTOP
    // --------------------------------------------------

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 768
            ) {

                closeMobileMenu();

            }

        }
    );



    // ==================================================
    // ACTIVE NAVBAR
    // ==================================================

    const sections =
        Array.from(
            document.querySelectorAll(
                "main section[id]"
            )
        );


    const navLinks =
        Array.from(
            document.querySelectorAll(
                ".navlinks a"
            )
        );


    function updateActiveNav() {

        if (!sections.length) {
            return;
        }


        let currentSection = "";


        const scrollPosition =
            window.scrollY + 200;


        sections.forEach(
            function (section) {

                if (
                    scrollPosition >=
                    section.offsetTop
                ) {

                    currentSection =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        {
            passive: true
        }
    );


    window.addEventListener(
        "load",
        updateActiveNav
    );


    updateActiveNav();



    // ==================================================
    // CONTACT FORM
    // ==================================================

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const submitBtn =
        document.getElementById(
            "submitBtn"
        );


    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (
        contactForm &&
        submitBtn
    ) {


        contactForm.addEventListener(
            "submit",
            async function (event) {


                // ==========================================
                // STOP NORMAL FORMSUBMIT REDIRECT
                // ==========================================

                event.preventDefault();
                event.stopImmediatePropagation();


                // ==========================================
                // SAVE ORIGINAL BUTTON
                // ==========================================

                const originalButton =
                    submitBtn.innerHTML;


                // ==========================================
                // SHOW SENDING
                // ==========================================

                submitBtn.disabled = true;


                submitBtn.innerHTML = `
                    Sending...
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;


                if (formMessage) {

                    formMessage.textContent =
                        "";

                    formMessage.className =
                        "";

                }


                // ==========================================
                // FORM DATA
                // ==========================================

                const formData =
                    new FormData(
                        contactForm
                    );


                try {


                    // ======================================
                    // FORMSUBMIT AJAX
                    // ======================================

                    const response =
                        await fetch(
                            "https://formsubmit.co/ajax/thohebulquarani@gmail.com",
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    // ======================================
                    // READ RESPONSE
                    // ======================================

                    const responseText =
                        await response.text();


                    console.log(
                        "FormSubmit Status:",
                        response.status
                    );


                    console.log(
                        "FormSubmit Response:",
                        responseText
                    );


                    let result = null;


                    try {

                        result =
                            JSON.parse(
                                responseText
                            );

                    } catch (error) {

                        console.error(
                            "Invalid JSON response:",
                            error
                        );

                    }


                    // ======================================
                    // SUCCESS
                    // ======================================

                    if (
                        response.ok &&
                        result &&
                        (
                            result.success === true ||
                            result.success === "true"
                        )
                    ) {


                        if (formMessage) {

                            formMessage.textContent =
                                "✓ Message sent successfully!";

                            formMessage.className =
                                "success";

                        }


                        contactForm.reset();


                    } else {


                        throw new Error(
                            (
                                result &&
                                result.message
                            ) ||
                            "Form submission failed."
                        );

                    }


                } catch (error) {


                    // ======================================
                    // ERROR
                    // ======================================

                    console.error(
                        "Contact Form Error:",
                        error
                    );


                    if (formMessage) {

                        formMessage.textContent =
                            "✗ Message failed to send. Please try again.";

                        formMessage.className =
                            "error";

                    }

                }


                // ==========================================
                // RESTORE BUTTON
                // ==========================================

                submitBtn.innerHTML =
                    originalButton;


                submitBtn.disabled =
                    false;


                // ==========================================
                // CLEAR MESSAGE
                // ==========================================

                if (formMessage) {

                    setTimeout(
                        function () {

                            formMessage.textContent =
                                "";

                            formMessage.className =
                                "";

                        },
                        5000
                    );

                }

            },
            true
        );

    }

});