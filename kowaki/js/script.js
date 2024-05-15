



// ゲームスタートボタンをクリック

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('startButton');
    const content = document.getElementById('wrapper');

    button.addEventListener('click', function() {
        this.style.opacity = '0';
        this.addEventListener('transitionend', function() {
            this.style.display = 'none';
            content.style.display = 'block';
            content.style.opacity = '1';
        });
    });
});



// ベース

document.addEventListener('DOMContentLoaded', function() {
    // 1または2のランダム選択
    const randomChoice = Math.floor(Math.random() * 2) + 1;

    let imageUrl;
    let answers;

    // 条件に応じて画像のURLと回答を設定
    if (randomChoice === 1) {
        imageUrl = 'images/hs.jpg';
        answers = ['ベジータ', 'さくらぎはなみち', 'ゾロ', 'しげのごろう'];
    } else {
        imageUrl = 'images/sb.jpg';
        answers = ['おにぎり', 'レリエル', 'サッカーボール', 'オセロ'];
    }

    // 画像を表示する
    const imageSection = document.getElementById('illust');
    const img = document.createElement('img');
    img.src = imageUrl;
    imageSection.appendChild(img);

    // 回答をリストに設定する
    for (let i = 0; i < answers.length; i++) {
        const li = document.getElementById(`ans0${i+1}`);
        li.textContent = answers[i];
    }
});



// ４つのクイズで正解不正解を決める



// 正解だった場合の画面表示



// 不正解だった場合の画面表示



// 次の問題をランダムで表示


