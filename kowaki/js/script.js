
// ゲームスタートボタンをクリック
// DOMContentLoaded イベントリスナー
// ドキュメントが完全に読み込まれた後に、スタートボタンにクリックイベントリスナーを追加

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const content = document.getElementById('wrapper');

    startButton.addEventListener('click', function() {
        this.style.opacity = '0';
        this.addEventListener('transitionend', function() {
            this.style.display = 'none';
            content.style.display = 'block';
            content.style.opacity = '1';
            showQuestion();
        });
    });
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

// ゲームを開始する関数
// startGame スタートボタンがクリックされたときに、ボタンをフェードアウトさせ、クイズの質問をシャッフルし、最初の質問を表示
// 
function startGame() {
    const startButton = document.getElementById('startButton');
    const content = document.getElementById('wrapper');
    
    startButton.style.opacity = '0';
    startButton.addEventListener('transitionend', () => {
        startButton.style.display = 'none';
        content.style.display = 'block';
        content.style.opacity = '1';
        shuffle(questions); // クイズの質問をシャッフル
        showQuestion(); // 最初の質問を表示
    });
}

// 配列をシャッフルする関数
// shuffle
// 配列の要素をランダムに並び替える関数
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 質問を表示する関数
// showQuestion
// 現在の質問を表示し、選択肢にクリックイベントを設定します。また、結果表示をリセット
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

    console.log("Current Question Index:", currentQuestionIndex); // デバッグ用ログ
    console.log("Current Question:", currentQuestion); // デバッグ用ログ

    // 質問が画像かテキストかを判定して表示
    if (currentQuestion.question.endsWith(".jpg") || currentQuestion.question.endsWith(".png")) {
        questionContainer.innerHTML = `<img src="${currentQuestion.question}" style="max-width: 100%; height: auto;">`;
    } else {
        questionContainer.textContent = currentQuestion.question;
    }

    // 選択肢を表示し、クリックイベントを設定
    currentQuestion.choices.forEach((choice, index) => {
        const choiceElement = choiceElements[index];
        choiceElement.textContent = choice;
        choiceElement.onclick = () => checkAnswer(index); // 選択肢をクリックした時の処理 checkAnswer 選択肢がクリックされたときに正解か不正解かを判定し、スコアを更新します。全ての選択肢を無効化し、結果を表示
        choiceElement.style.pointerEvents = 'auto'; // クリックイベントを有効にする
    });

    // 結果表示をリセット
    // resetResultDisplay
    // 結果表示をリセットし、クイズ表示エリアをフェードイン
    resetResultDisplay(resultElement, resultPage, wrapper);
}

// 結果表示をリセットする関数
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

// 答えをチェックする関数
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

    console.log("Selected Answer Index:", selectedIndex); // デバッグ用ログ
    console.log("Correct Answer Index:", questions[currentQuestionIndex].correctAnswer); // デバッグ用ログ

    // 正解か不正解かを判定
    if (selectedIndex === questions[currentQuestionIndex].correctAnswer) {
        resultElement.textContent = 'すばらしい';
        resultElement.className = 'correct';
        score += 20; // 正解ならスコアを加算
    } else {
        resultElement.textContent = 'ざんねん';
        resultElement.className = 'incorrect';
    }

    questionsAsked++;
    choiceElements.forEach(choiceElement => choiceElement.style.pointerEvents = 'none'); // 全ての選択肢を無効化

    // 結果を表示
    // displayResult
    // 結果を表示し、次の質問かスコア表示に移行
    displayResult(resultElement, resultPage, wrapper);
}

// 結果を表示する関数
function displayResult(resultElement, resultPage, wrapper) {
    wrapper.classList.add('fade-out');
    setTimeout(() => {
        wrapper.style.display = 'none';
        resultPage.style.display = 'block';
        resultPage.classList.remove('fade-out');
        resultElement.style.display = 'block';
    }, 500); // フェードアウト時間（1秒）

    // 次の質問かスコア表示に移行
    setTimeout(() => {
        if (questionsAsked < 5) {
            resultPage.classList.add('fade-out');
            setTimeout(() => {
                resultPage.style.display = 'none';
                nextQuestion();
            }, 500); // フェードアウト時間（1秒）
        } else {
            showScore(); // スコアを表示 showScore ゲーム終了後にスコアを表示します。表示エリアをクリックするとゲームを再スタート
        }
    }, 2000);
}

// 次の質問を表示する関数
// nextQuestion
// 次の質問を表示し、インデックスを更新します。必要に応じて質問をシャッフル
function nextQuestion() {
    const wrapper = document.getElementById('wrapper');
    const resultPage = document.getElementById('result-page');

    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0; // インデックスをリセット
        shuffle(questions); // 質問をシャッフル
    }

    console.log("Next Question Index:", currentQuestionIndex); // デバッグ用ログ

    resultPage.classList.add('fade-out');
    setTimeout(() => {
        resultPage.style.display = 'none';
        showQuestion();
        wrapper.classList.remove('fade-out');
        wrapper.classList.add('fade-in');
    },500); // フェードアウト時間（1秒）
}

// スコアを表示する関数
function showScore() {
    const resultPage = document.getElementById('result-page');
    const scoreElement = document.getElementById('score');

    document.getElementById('result').textContent = 'おわり';
    scoreElement.innerHTML = `あなたのスコアは<span class="scoreText">${score}</span>です！`;

    resultPage.style.display = 'block';
    resultPage.classList.remove('fade-out');
    resultPage.onclick = restartQuiz; // クリックでゲームを再スタート
}

// ゲームを再スタートする関数
// restartQuiz
// ゲームを再スタートし、スコアや質問カウンタをリセット
function restartQuiz() {
    const resultPage = document.getElementById('result-page');
    const startButton = document.getElementById('startButton');

    score = 0;
    questionsAsked = 0;
    currentQuestionIndex = 0;

    resultPage.style.display = 'none';
    startButton.style.display = 'block';
    startButton.style.opacity = '1';
}