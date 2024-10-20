$(function () {
    const envelope = $("#envelope");
    const popup = $("#popup");
    const effectText = $(".effect-text");
    const closeBtn = $(".close-btn");
    let isOpen = false;

    envelope
        .on("click", function () {
            if (!isOpen) {
                open(envelope, popup);
                isOpen = true;
            }
        });

    closeBtn.on("click", function () {
        if (isOpen) {
            close(envelope, popup);
            isOpen = false;
        }
    });

    heartAnimation(effectText);
});

const heart = confetti.shapeFromPath({
    path:
        "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z",
    matrix: [
        0.03333333333333333,
        0,
        0,
        0.03333333333333333,
        -5.566666666666666,
        -5.533333333333333,
    ],
});
const config = {
    ticks: 250,
    shapes: [heart],
    colors: ["#d90429", "#f233a9", "#f23335"],
    startVelocity: 50,
    disableForReducedMotion: true,
    scalar: 2,
};

function randomNum(m, n) {
    m = parseInt(m);
    n = parseInt(n);
    return Math.floor(Math.random() * (n - m + 1)) + m;
}

function fire(particleRatio, opts) {
    confetti({
        ...config,
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
    });
}

function shoot() {
    fire(0.1, {
        spread: 140,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.5,
    });
    fire(0.35, {
        spread: 100,
        shapes: ["circle", "square"],
    });
    fire(0.25, {
        spread: 60,
        startVelocity: 50,
        scalar: 0.9,
    });
    fire(0.25, {
        spread: 120,
        startVelocity: 55,
    });
}

function open(obj, popup) {
    setTimeout(shoot, 180);
    obj.addClass("open").removeClass("close");
    popup.addClass("active");
}

function close(obj, popup) {
    obj.addClass("close").removeClass("open");
    popup.removeClass("active");
}

function heartAnimation(text) {
    const heartCount = (text.width() / 50) * 4;
    for (let i = 0; i < heartCount; i++) {
        const heartSize = randomNum(50, 100) / 10;
        text.append(
            '<span class="tiny-heart" style="top: ' + randomNum(5, 17) +
                "%; left: " + randomNum(5, 95) + "%; width: " + heartSize +
                "px; height: " + heartSize + "px ; animation-delay: -" +
                randomNum(0, 3) + "s; animation-duration: " + randomNum(2, 5) +
                's"></span>',
        );
    }
}
