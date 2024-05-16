
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


let currentQuestionIndex = 0;
let score = 0;
let questionsAsked = 0;

function startGame() {
    const startButton = document.getElementById('startButton');
    const content = document.getElementById('wrapper');
    
    fadeOut(startButton, () => {
        startButton.style.display = 'none';
        fadeIn(content, showQuestion);
    });
}

// フェードイン関数
function fadeIn(element, callback) {
    console.log("Fade in:", element.id); // デバッグ用ログ
    element.style.opacity = 0; // 要素の初期透明度を0に設定（完全に透明）
    element.style.display = 'block'; // 要素を表示状態に設定

    let last = +new Date(); // 現在の時間をミリ秒単位で取得
    let tick = function() {
        element.style.opacity = +element.style.opacity + (new Date() - last) / 400; // 透明度を徐々に増加
        last = +new Date(); // 現在の時間を更新

        if (+element.style.opacity < 1) { // 透明度が1未満の場合（完全に表示されていない場合）
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16); // アニメーションフレームをリクエスト
        } else if (callback) { // 透明度が1に達した場合（完全に表示された場合）
            callback(); // コールバック関数を呼び出す
        }
    };
    tick(); // アニメーションを開始
}

// フェードアウト関数
function fadeOut(element, callback) {
    console.log("Fade out:", element.id); // デバッグ用ログ
    element.style.opacity = 1;

    let last = +new Date();
    let tick = function() {
        element.style.opacity = +element.style.opacity - (new Date() - last) / 400;
        last = +new Date();

        if (+element.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        } else {
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

    const currentQuestion = questions[currentQuestionIndex];

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
    // if (resultElement) {
    //     resultElement.style.display = 'none';
    //     resultElement.textContent = '';
    // }

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
    console.log("Correct Answer Index:", questions[currentQuestionIndex].correctAnswer);

    if (selectedIndex === questions[currentQuestionIndex].correctAnswer) {
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
        resultPage.style.display = 'block';
        fadeIn(resultPage, () => {
            setTimeout(() => {
                if (questionsAsked < 5) {
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
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0;
        shuffle(questions);
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

    document.getElementById('result').textContent = 'おわり';
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