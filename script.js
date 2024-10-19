
$(function() {
    const envelope = $("#envelope");
    const popup = $("#popup");
    const effectText = $(".effect-text");
    const closeBtn = $(".close-btn");
    let isOpen = false;

    envelope.on("click", function() {
        if (!isOpen) {
            open(envelope, popup);
            isOpen = true;
        }
    });

    closeBtn.on("click", function() {
        if (isOpen) {
            close(envelope, popup);
            isOpen = false;
        }
    });

    heartAnimation(effectText);
});

const config = {
    ticks: 250,
    shapes: ["heart"],
    colors: ["FE5C5C", "FF69B4", "FC1D1D", "C91536"],
    startVelocity: 50,
    scalar: 3
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
    fire(0.3, {
        spread: 140,
        startVelocity: 25,
        decay: 0.92,
    });
    fire(0.25, {
        spread: 100,
        scalar: 1.4,
    });
    fire(0.1, {
        spread: 120,
        scalar: 4,
    });
    fire(0.2, {
        spread: 60,
        startVelocity: 50,
    });
    fire(0.25, {
        spread: 120,
        startVelocity: 55,
    });
}

function open(obj, popup) {
    setTimeout(shoot, 100);
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
