
document.addEventListener("DOMContentLoaded", () => {

    // MOBILE MENU
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("open");

        menuToggle.innerHTML = navbar.classList.contains("open")
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("open");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // HEADER SCROLL EFFECT
    window.addEventListener("scroll", () => {
        document.getElementById("header")
            .classList.toggle("scrolled", window.scrollY > 50);
    });

    // MODAL
    function showModal(title, message) {
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalMessage").textContent = message;
        document.getElementById("modal").classList.add("show");
    }

    window.closeModal = function () {
        document.getElementById("modal").classList.remove("show");
    };

    window.showNotice = function (title, message) {
        showModal(title, message);
    };

    window.openAdmission = function () {
        showModal(
            "Admission Enquiry",
            "Thank you for your interest in Dan Bahadur Surya Kumar Inter College. Please contact the college office for admission details."
        );
    };

    document.getElementById("modal").addEventListener("click", e => {
        if (e.target.id === "modal") closeModal();
    });

    // GALLERY IMAGE VIEWER
    const viewer = document.createElement("div");
    viewer.className = "image-viewer";
    viewer.innerHTML = `
        <button aria-label="Close image">&times;</button>
        <img src="" alt="Gallery preview">
    `;
    document.body.appendChild(viewer);

    window.openImage = function (src) {
        viewer.querySelector("img").src = src;
        viewer.classList.add("show");
    };

    viewer.querySelector("button").addEventListener("click", () => {
        viewer.classList.remove("show");
    });

    viewer.addEventListener("click", e => {
        if (e.target === viewer) viewer.classList.remove("show");
    });

    // ESCAPE KEY
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeModal();
            viewer.classList.remove("show");
        }
    });

    // SCROLL REVEAL
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal, .facility-card, .academic-card")
        .forEach(el => {
            el.classList.add("reveal");
            revealObserver.observe(el);
        });

    // STATISTICS COUNTER
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.count);
            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 60));

            const timer = setInterval(() => {
                current += increment;

                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                counter.textContent = current.toLocaleString("en-IN") +
                    (target === 100 ? "%" : "+");

            }, 25);

            counterObserver.unobserve(counter);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll("[data-count]")
        .forEach(counter => counterObserver.observe(counter));

    // CONTACT FORM DEMO
    document.getElementById("contactForm")
        .addEventListener("submit", e => {
            e.preventDefault();

            showModal(
                "Thank You!",
                "Your message has been submitted in this demo. Connect a backend to save and manage enquiries."
            );

            e.target.reset();
        });

    // ACTIVE NAVIGATION
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#navbar a");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            }
        });
    }, { rootMargin: "-30% 0px -60% 0px" });

    sections.forEach(section => sectionObserver.observe(section));

});
