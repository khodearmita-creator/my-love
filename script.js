/* =====================================================
   ELEMENTS
===================================================== */

const intro = document.getElementById("intro");

const hello = document.getElementById("hello");

const relationship = document.getElementById("relationship");

const joke = document.getElementById("joke");

const loveQuestion = document.getElementById("loveQuestion");

const loveInput = document.getElementById("loveInput");

const submitButton = document.getElementById("submitButton");

const feedback = document.getElementById("feedback");

const howMuch = document.getElementById("howMuch");

const yesButton = document.getElementById("yesButton");

const noButton = document.getElementById("noButton");

const reasonsIntro = document.getElementById("reasonsIntro");

const reasonsPage = document.getElementById("reasonsPage");


/* =====================================================
   RANDOM WRONG ANSWERS
===================================================== */

const wrongAnswers = [

    "YOU DUMBASS BITCH. Correct your goddamn answer or Imma fucking bite you like a goddamn dog.",

    "you fucking idiot. choose right",

    "OBVIOUSLY WRONG BITCH",

    "dumb fucking bitch. Choose right",

    "its not even close bitch. Choose again",

    "I only give you one more chance. Choose the right one."

];


/* =====================================================
   STEP 1
   LOVE NUMBER
===================================================== */

submitButton.addEventListener("click", checkLoveNumber);


/* Press Enter */

loveInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        checkLoveNumber();

    }

});


function checkLoveNumber() {

    const value = Number(loveInput.value);


    /* =========================
       CORRECT ANSWER
    ========================== */

    if (value === 10) {

        feedback.textContent = "میدونستم عزیزم ❤️";

        feedback.style.color = "#fff";

        showFeedback();


        /*
            After 4 seconds:
            everything disappears
            and we move to the next question.
        */

        setTimeout(() => {

            loveQuestion.classList.add("hidden");

            showHowMuch();

        }, 4000);

    }


    /* =========================
       WRONG ANSWERS
    ========================== */

    else if (value >= 0 && value <= 9) {

        const randomIndex =
            Math.floor(Math.random() * wrongAnswers.length);

        feedback.textContent =
            wrongAnswers[randomIndex];

        feedback.style.color = "#ff3030";

        showFeedback();

        loveInput.value = "";

    }


    /* =========================
       INVALID
    ========================== */

    else {

        feedback.textContent =
            "یه عدد بین ۰ تا ۱۰ وارد کن 😒";

        feedback.style.color = "#fff";

        showFeedback();

    }

}


/* =====================================================
   FEEDBACK ANIMATION
===================================================== */

function showFeedback() {

    feedback.classList.remove("show");

    /*
       Forces browser to restart animation
    */

    void feedback.offsetWidth;

    feedback.classList.add("show");

}


/* =====================================================
   SHOW LOVE QUESTION
===================================================== */

function showLoveQuestion() {

    intro.classList.add("hidden");

    loveQuestion.classList.remove("hidden");

}


/*
   At 12 seconds:
   intro disappears.
*/

setTimeout(() => {

    showLoveQuestion();

}, 12000);


/* =====================================================
   CORRECT ANSWER -> NEXT SCREEN
===================================================== */

function showHowMuch() {

    yesButton.style.position="static";
    yesButton.style.left="";
    yesButton.style.top="";

    howMuch.classList.remove("hidden");

}


/* =====================================================
   RUNAWAY "YES" BUTTON
===================================================== */

function moveYesButton() {

    yesButton.style.position="fixed";
    const padding=30;

    const buttonWidth= yesButton.offsetWidth;  
    const buttonHeight= yesButton.offsetHeight;

    const maxX=window.innerWidth - buttonWidth - padding;
    const maxY=window.innerHeight - buttonHeight - padding;

    const randomX = Math.random() * (maxX - padding) + padding;
    const randomY = Math.random() * (maxY - padding) + padding;

    yesButton.style.left=randomX+ "px";
    yesButton.style.top=randomY+ "px";
}


/* Desktop */

document.addEventListener("mousemove",function(e){
    if (howMuch.classList.contains("hidden")) return;

    const rect = yesButton.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(
        e.clientX - centerX,
        e.clientY - centerY
    );
    if (distance<80) {
        moveYesButton();
    }
});

yesButton.addEventListener("pointerdown",function(e){
    e.preventDefault();
    moveYesButton();
});

/* =====================================================
   NO BUTTON
===================================================== */

noButton.addEventListener("click", function() {

    howMuch.classList.add("hidden");

    showReasonsIntro();

});


/* =====================================================
   REASONS INTRO
===================================================== */

function showReasonsIntro() {

    reasonsIntro.classList.remove("hidden");

    reasonsIntro.style.animation =
        "introFadeIn 1.5s ease forwards";


    /*
       After the sentence has appeared,
       allow scrolling.
    */

    setTimeout(() => {

        reasonsIntro.classList.add("hidden");

        reasonsPage.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        activateReasonObserver();

    }, 3000);

}


/* =====================================================
   REASONS SCROLL ANIMATION
===================================================== */

function activateReasonObserver() {

    const reasons =
        document.querySelectorAll(".reason");


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                    }

                });

            },

            {
                threshold: 0.25
            }

        );


    reasons.forEach(reason => {

        observer.observe(reason);

    });

}


/* =====================================================
   INTRO FADE
===================================================== */

const styleSheet =
    document.createElement("style");

styleSheet.innerHTML = `

    @keyframes introFadeIn {

        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }

    }

`;

document.head.appendChild(styleSheet);