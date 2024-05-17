
// ゲームスタートボタンをクリック
// DOMContentLoaded イベントリスナー
// ドキュメントが完全に読み込まれた後に、スタートボタンにクリックイベントリスナーを追加

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const content = document.getElementById('wrapper');
    
    startButton.addEventListener('click', startGame);
});



// クイズベース

const questions = [
    {
        question: "images/01.png",
        choices: ["ぴかちゅう", "くまもん", "ミッキー", "ぷーさん"],
        correctAnswer: 1
    },
    {
        question: "images/02.png",
        choices: ["がちゃぴん", "オラフ", "ミシュラン", "ふなっしー"],
        correctAnswer: 3
    },
    {
        question: "images/03.png",
        choices: ["マルチーズ", "ライオン", "キリン", "アルパカ"],
        correctAnswer: 1
    },
    {
        question: "images/04.png",
        choices: ["わっきー", "フレディ", "ジモーラロ", "ごうひろみ"],
        correctAnswer: 3
    },
    {
        question: "images/05.png",
        choices: ["ベジータ", "さくらぎはなみち", "ゾロ", "しげのごろう"],
        correctAnswer: 1
    },
    {
        question: "images/06.png",
        choices: ["わくわくさん", "のびた", "コナン", "キテレツ"],
        correctAnswer: 2
    },
    {
        question: "images/07.png",
        choices: ["ミッキー", "ダルメシアン", "スヌーピー", "きりん"],
        correctAnswer: 2
    },
    {
        question: "images/08.png",
        choices: ["らっこ", "さる", "ごりら", "ねずみおとこ"],
        correctAnswer: 0
    },
    {
        question: "images/09.png",
        choices: ["ミッフィー", "キティちゃん", "たまちゃん", "うさびっち"],
        correctAnswer: 0
    },
    {
        question: "images/10.png",
        choices: ["トトロ", "ばいきんまん", "ドラえもん", "どきんちゃん"],
        correctAnswer: 0
    },
    {
        question: "images/11.png",
        choices: ["ルフィ", "アトム", "ごくう", "ヤムチャ"],
        correctAnswer: 2
    },
    {
        question: "images/12.png",
        choices: ["ごじょうさとる", "うすい", "めかくし", "サキュパス"],
        correctAnswer: 0
    }
];


let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionsAsked = 0;

function startGame() {
    const startButton = document.getElementById('startButton');
    const content = document.getElementById('wrapper');
    
    fadeOut(startButton, () => {
        startButton.style.display = 'none';
        fadeIn(content, () => {
            shuffle(questions);
            selectedQuestions = questions.slice(0, 5); // ランダムに5問選択
            console.log("Selected Questions:", selectedQuestions); // デバッグ用ログ
            showQuestion();
        });
    });
}

// フェードイン関数
function fadeIn(element, callback) {
    console.log("Fade in:", element.id); // デバッグ用ログ
    element.style.opacity = 0;
    element.style.display = 'block';

    let last = +new Date();
    let tick = function() {
        element.style.opacity = parseFloat(element.style.opacity) + (new Date() - last) / 400;
        last = +new Date();

        if (parseFloat(element.style.opacity) < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        } else {
            element.style.opacity = 1; // 透明度を1に設定（完全に表示）
            if (callback) {
                callback();
            }
        }
    };
    tick();
}

// フェードアウト関数
function fadeOut(element, callback) {
    console.log("Fade out:", element.id); // デバッグ用ログ
    element.style.opacity = 1;

    let last = +new Date();
    let tick = function() {
        element.style.opacity = parseFloat(element.style.opacity) - (new Date() - last) / 400;
        last = +new Date();

        if (parseFloat(element.style.opacity) > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        } else {
            element.style.opacity = 0; // 透明度を0に設定（完全に透明）
            element.style.display = 'none';
            if (callback) {
                callback();
            }
        }
    };
    tick();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showQuestion() {
    const questionContainer = document.getElementById('illust');
    const choiceElements = [
        document.getElementById('ans01'),
        document.getElementById('ans02'),
        document.getElementById('ans03'),
        document.getElementById('ans04')
    ];
    const resultElement = document.getElementById('result');
    const resultPage = document.getElementById('result-page');
    const wrapper = document.getElementById('wrapper');

    const currentQuestion = selectedQuestions[currentQuestionIndex];

    console.log("Current Question Index:", currentQuestionIndex);
    console.log("Current Question:", currentQuestion);

    if (currentQuestion.question.endsWith(".jpg") || currentQuestion.question.endsWith(".png")) {
        questionContainer.innerHTML = `<img src="${currentQuestion.question}" style="max-width: 100%; height: auto;">`;
    } else {
        questionContainer.textContent = currentQuestion.question;
    }

    currentQuestion.choices.forEach((choice, index) => {
        const choiceElement = choiceElements[index];
        choiceElement.textContent = choice;
        choiceElement.onclick = () => checkAnswer(index);
        choiceElement.style.pointerEvents = 'auto';
    });

    resetResultDisplay(resultElement, resultPage, wrapper);
}

function resetResultDisplay(resultElement, resultPage, wrapper) {
    if (resultElement) {
        resultElement.style.display = 'none';
        resultElement.textContent = '';
    }

    resultPage.style.display = 'none';
    wrapper.style.display = 'block';
    wrapper.classList.remove('fade-out');
    wrapper.classList.add('fade-in');
}

function checkAnswer(selectedIndex) {
    const resultElement = document.getElementById('result');
    const choiceElements = [
        document.getElementById('ans01'),
        document.getElementById('ans02'),
        document.getElementById('ans03'),
        document.getElementById('ans04')
    ];
    const resultPage = document.getElementById('result-page');
    const wrapper = document.getElementById('wrapper');

    console.log("Selected Answer Index:", selectedIndex);
    console.log("Correct Answer Index:", selectedQuestions[currentQuestionIndex].correctAnswer);

    if (selectedIndex === selectedQuestions[currentQuestionIndex].correctAnswer) {
        resultElement.textContent = 'すばらしい';
        resultElement.className = 'correct';
        score += 20;
    } else {
        resultElement.textContent = 'ざんねん';
        resultElement.className = 'incorrect';
    }

    questionsAsked++;
    choiceElements.forEach(choiceElement => choiceElement.style.pointerEvents = 'none');

    fadeOut(wrapper, () => {
        fadeIn(resultPage, () => {
            setTimeout(() => {
                if (questionsAsked < 5) { // 5問に達していない場合
                    fadeOut(resultPage, nextQuestion);
                } else {
                    showScore();
                }
            }, 3000);
        });
    });
}

function nextQuestion() {
    const wrapper = document.getElementById('wrapper');
    const resultPage = document.getElementById('result-page');

    currentQuestionIndex++;
    if (currentQuestionIndex >= selectedQuestions.length) {
        currentQuestionIndex = 0;
    }

    console.log("Next Question Index:", currentQuestionIndex);

    fadeOut(resultPage, () => {
        showQuestion();
        fadeIn(wrapper);
    });
}

function showScore() {
    const resultPage = document.getElementById('result-page');
    const scoreElement = document.getElementById('score');

    document.getElementById('result').innerHTML = 'おわり';
    scoreElement.innerHTML = `あなたのスコアは <span class="scoreText">${score}</span> です！`;

    fadeIn(resultPage, () => {
        resultPage.onclick = restartQuiz;
    });
}

function restartQuiz() {
    const resultPage = document.getElementById('result-page');
    const startButton = document.getElementById('startButton');

    score = 0;
    questionsAsked = 0;
    currentQuestionIndex = 0;

    fadeOut(resultPage, () => {
        fadeIn(startButton);
    });
}