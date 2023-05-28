const colors = ["green", "red", "yellow", "blue"];
let level = 1;
let answerIndex = 0;
let record = [];
let restart = false;

$(document).on("keypress", function () {
    if (restart) {
        restartGame();
        restart = false;
        setTimeout(function () {
            setNewLevel();
        }, 1000)
    } else {
        setNewLevel();
    }
})

function getRandom() {
    let randomIndex = Math.floor(Math.random() * 4);
    return randomIndex;
}

function playAudio(color) {
    const audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
}

function flashBlock(color) {
    $(`#${color}`).addClass("pressed");
    setTimeout(function () {
        $(`#${color}`).removeClass("pressed");
    }, 100);
}

function setNewLevel() {
    const randomColor = colors[getRandom()];
    record.push(randomColor);

    playAudio(randomColor);
    flashBlock(randomColor);
    $("#level-title").text("Level " + level);

}

function restartGame() {
    level = 1;
    answerIndex = 0;
    record = [];
    $("#level-title").text("Level " + level);
}

$(".btn").on("click", function () {
    if (this.id === record[answerIndex]) {
        if (record.length - 1 === answerIndex) {
            level++
            answerIndex = 0;

            setTimeout(function () {
                setNewLevel();
            }, 1000);
        } else {
            answerIndex++;
        }

        playAudio(this.id);
        flashBlock(this.id);
    } else {
        playAudio("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 500);
        restart = true;
    }
})
