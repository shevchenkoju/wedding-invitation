
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxJxyOjpPHXl5DVZbRkOeQ8qteJfdQKDUO_m8bRo1SpDMoiHLljfaZCLLmmhI8YGI0FFA/exec";
const particles = document.getElementById("particles");

// Створюємо золоті пластівці
for (let i = 0; i < 80; i++) {

    const flake = document.createElement("span");

    flake.classList.add("flake");

    flake.style.left = Math.random() * 100 + "%";

    flake.style.top = (100 + Math.random() * 40) + "%";

    flake.style.width = (3 + Math.random() * 7) + "px";

    flake.style.height = (4 + Math.random() * 12) + "px";

    flake.style.animationDuration = (12 + Math.random() * 18) + "s";

    flake.style.animationDelay = (Math.random() * 15) + "s";

    flake.style.transform = `rotate(${Math.random()*360}deg)`;

    particles.appendChild(flake);

}

// Кнопка
document
.getElementById("openInvitation")
.addEventListener("click", () => {

    document
    .getElementById("childhood")
    .scrollIntoView({
        behavior:"smooth"
    });

});
const leftChild = document.querySelector(".child-left");
const rightChild = document.querySelector(".child-right");
const heart = document.querySelector(".heart");

const childhood = document.querySelector(".childhood");

let animationStarted = false;

window.addEventListener("scroll", ()=>{

    if(animationStarted) return;

    const rect = childhood.getBoundingClientRect();

    if(rect.top < window.innerHeight*0.55){

    animationStarted = true;

    // Фото починають рух
    setTimeout(()=>{

        leftChild.style.transform = "translateY(-50%) translateX(50px)";
rightChild.style.transform = "translateY(-50%) translateX(-50px)";

    },800);

    // Серце засвічується
    setTimeout(()=>{

        heart.classList.add("glow");

    },4200);

    // З'являється текст
    setTimeout(()=>{

        document
            .querySelector(".child-text")
            .classList.add("show");

    },7000);
       
        }
});
const weddingDate = new Date("August 15, 2026 00:00:00").getTime();

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));

    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const s = Math.floor((distance % (1000 * 60)) / 1000);

    days.textContent = String(d).padStart(3, "0");
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown,1000);
const timeline = document.querySelector(".timeline");
const timelineWrapper = document.querySelector(".timeline-wrapper");
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineCircles = document.querySelectorAll(".timeline-circle");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            timelineWrapper.classList.add("animate");

            timelineItems.forEach((item,index)=>{

                setTimeout(()=>{

                    item.classList.add("show");

if (timelineCircles[index]) {
    timelineCircles[index].classList.add("show");
}

                },1700 + index*350);

            });

            observer.disconnect();
        }

    });

},{
    threshold:0.3
});

if (timeline) {
    observer.observe(timeline);
}
/* ==========================
        RSVP
========================== */

const guestName = document.getElementById("guest-name");

const attendanceButtons =
document.querySelectorAll(".attendance-btn");

const drinkButtons =
document.querySelectorAll(".drink-btn");

const submitButton =
document.querySelector(".submit-button");

let attendanceSelected = false;

function checkForm(){

    if(
        guestName.value.trim() !== "" &&
        attendanceSelected
    ){

        submitButton.disabled = false;

    }else{

        submitButton.disabled = true;

    }

}

submitButton.disabled = true;

/* Так / Ні */

attendanceButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        attendanceButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        attendanceSelected = true;

        checkForm();

    });

});

/* Алкоголь */

drinkButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        button.classList.toggle("active");

    });

});

/* Ім'я */

guestName.addEventListener("input",checkForm);
/* ==========================
      THANK YOU SCREEN
========================== */

const thankScreen = document.querySelector(".thank-you");
const successOverlay = document.querySelector(".success-overlay");
const successCheck = document.querySelector(".success-check");

const thankTitle = document.querySelector(".thank-title");
const thankDate = document.querySelector(".thank-date");
const thankLove = document.querySelector(".thank-love");
const thankNames = document.querySelector(".thank-names");

const circle = document.querySelector(".check-circle");
const path = document.querySelector(".check-path");

/* ---------- пластівці ---------- */

const thankParticles = document.querySelector(".thank-particles");

for(let i=0;i<15;i++){

    const flake = document.createElement("span");

    flake.style.left = Math.random()*100 + "%";

    flake.style.width = (3+Math.random()*4)+"px";
    flake.style.height = (8+Math.random()*8)+"px";

    flake.style.animationDuration =
        (12+Math.random()*5)+"s";

    flake.style.animationDelay =
        (Math.random()*5)+"s";

    thankParticles.appendChild(flake);

}

/* ---------- кнопка ---------- */

submitButton.addEventListener("click", async (e) => {

    e.preventDefault();

    const guestName = document.getElementById("guest-name").value.trim();

    if (!guestName) {
        alert("Будь ласка, введіть ім'я.");
        return;
    }

    const attendance =
        document.querySelector(".attendance-btn.active")?.textContent || "";

    if (!attendance) {
        alert("Будь ласка, оберіть відповідь.");
        return;
    }

    const drinks = [...document.querySelectorAll(".drink-btn.active")]
        .map(btn => btn.textContent);

    submitButton.disabled = true;

    try {

        await fetch(SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: guestName,

                attendance: attendance,

                drinks: drinks

            })

        });

    } catch (err) {

        console.log(err);

    }

    submitButton.style.opacity = "0";
    submitButton.style.transform = "scale(.94)";

    successOverlay.classList.add("show");

    successCheck.classList.remove("hide");
    successCheck.classList.remove("draw");

    void successCheck.offsetWidth;

    successCheck.classList.add("draw");

    setTimeout(() => {

        successCheck.classList.add("hide");

    }, 2300);

    setTimeout(() => {

        successOverlay.classList.remove("show");

    }, 2900);

    setTimeout(() => {

        thankScreen.classList.add("show");

    }, 3200);

    setTimeout(() => {

        thankTitle.classList.add("show");

    }, 3600);

    setTimeout(() => {

        thankDate.classList.add("show");

    }, 4700);

    setTimeout(() => {

        thankLove.classList.add("show");

    }, 5700);

    setTimeout(() => {

        thankNames.classList.add("show");

    }, 6600);

});