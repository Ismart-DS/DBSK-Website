
/* IMAGE SLIDER */

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("sliderDots");

let currentSlide = 0;
let sliderTimer;

slides.forEach((slide, index) => {

    const dot = document.createElement("button");

    dot.classList.add("dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        showSlide(index);
        restartSlider();
    });

    dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll(".dot");


function showSlide(index) {

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

}


function changeSlide(direction) {

    showSlide(currentSlide + direction);
    restartSlider();

}


function startSlider() {

    sliderTimer = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

}


function restartSlider() {

    clearInterval(sliderTimer);
    startSlider();

}

startSlider();


/* TOPPER DATA */

/* Yahan apne actual students ki details bharen */

const toppers10 = [

    {
        name: "Student Name 1",
        roll: "1001",
        percentage: "98.20%",
        image: "images/topper1.jpg"
    },

    {
        name: "Student Name 2",
        roll: "1002",
        percentage: "96.80%",
        image: "images/topper2.jpg"
    },

    {
        name: "Student Name 3",
        roll: "1003",
        percentage: "95.60%",
        image: "images/topper3.jpg"
    },

    {
        name: "Student Name 4",
        roll: "1004",
        percentage: "94.50%",
        image: "images/topper4.jpg"
    },

    {
        name: "Student Name 5",
        roll: "1005",
        percentage: "93.80%",
        image: "images/topper5.jpg"
    },

    {
        name: "Student Name 6",
        roll: "1006",
        percentage: "92.40%",
        image: "images/topper6.jpg"
    },

    {
        name: "Student Name 7",
        roll: "1007",
        percentage: "91.60%",
        image: "images/topper7.jpg"
    },

    {
        name: "Student Name 8",
        roll: "1008",
        percentage: "90.50%",
        image: "images/topper8.jpg"
    },

    {
        name: "Student Name 9",
        roll: "1009",
        percentage: "89.80%",
        image: "images/topper9.jpg"
    },

    {
        name: "Student Name 10",
        roll: "1010",
        percentage: "88.60%",
        image: "images/topper10.jpg"
    }

];


const toppers12 = [

    {
        name: "Student Name 1",
        roll: "1201",
        percentage: "97.80%",
        image: "images/topper11.jpg"
    },

    {
        name: "Student Name 2",
        roll: "1202",
        percentage: "96.40%",
        image: "images/topper12.jpg"
    },

    {
        name: "Student Name 3",
        roll: "1203",
        percentage: "95.20%",
        image: "images/topper13.jpg"
    },

    {
        name: "Student Name 4",
        roll: "1204",
        percentage: "94.60%",
        image: "images/topper14.jpg"
    },

    {
        name: "Student Name 5",
        roll: "1205",
        percentage: "93.80%",
        image: "images/topper15.jpg"
    },

    {
        name: "Student Name 6",
        roll: "1206",
        percentage: "92.50%",
        image: "images/topper16.jpg"
    },

    {
        name: "Student Name 7",
        roll: "1207",
        percentage: "91.70%",
        image: "images/topper17.jpg"
    },

    {
        name: "Student Name 8",
        roll: "1208",
        percentage: "90.80%",
        image: "images/topper18.jpg"
    },

    {
        name: "Student Name 9",
        roll: "1209",
        percentage: "89.60%",
        image: "images/topper19.jpg"
    },

    {
        name: "Student Name 10",
        roll: "1210",
        percentage: "88.90%",
        image: "images/topper20.jpg"
    }

];


/* GENERATE TOPPER CARDS */

function generateToppers(data, containerId) {

    const container = document.getElementById(containerId);

    container.innerHTML = "";

    data.forEach((student, index) => {

        const card = document.createElement("div");

        card.className = "topper-card";

        const image = document.createElement("img");
        image.src = student.image;
        image.alt = student.name;
        image.loading = "lazy";

        image.onerror = function () {
            this.src = "https://placehold.co/300x350?text=Student+Photo";
        };

        const rank = document.createElement("span");
        rank.className = "rank-number";
        rank.textContent = "RANK " + (index + 1);

        const name = document.createElement("h3");
        name.textContent = student.name;

        const percentage = document.createElement("div");
        percentage.className = "percentage";
        percentage.textContent = student.percentage;

        const roll = document.createElement("p");
        roll.textContent = "Roll No: " + student.roll;

        card.append(image, rank, name, percentage, roll);

        container.appendChild(card);

    });

}


/* LOAD BOTH CLASSES */

generateToppers(toppers10, "rank10");

generateToppers(toppers12, "rank12");


/* SWITCH BETWEEN CLASS 10 AND 12 */

function showRank(className, button) {

    document.querySelectorAll(".rank-content").forEach(section => {
        section.classList.remove("active");
    });

    document.querySelectorAll(".rank-tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById(className).classList.add("active");

    button.classList.add("active");

}


/* SCROLL REVEAL ANIMATION */

const revealElements = document.querySelectorAll(
    ".leader-card, .service-card, .parent-card, .vision-card, .event-card, .topper-card"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.animation = "fadeIn 0.7s ease forwards";

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

}
