let textareaIn = "";
let textareaOut = "";

// ロードが間に合わないので1秒遅延※環境によっては不要
setTimeout(() => {
    bar_eraser();
    // HTMLの要素を取得
    textareaIn = document.getElementById("inputText");
    textareaOut = document.getElementById("outputText");
    bodyAll = document.getElementById("bodyAll");


    //イベントリスナーの設定
    'mousemove'.split(' ').forEach((eventName)=>{
        bodyAll.addEventListener(eventName, reSize);
        window.addEventListener("scroll", bar_eraser);
    })
}, 1000);

//「アクション」の設定
const reSize = () => {
  // textareaOutの大きさをtextareaInと同じにする
  textareaOut.style.width = getComputedStyle(textareaIn).width;
  textareaOut.style.height = getComputedStyle(textareaIn).height;
};

const bar_eraser = () => {
    const links = document.querySelector(".links");
    const header = document.querySelector(".header");
    const adlinks = document.querySelector(".additional-links");
    // console.log('pageYOffset'+window.pageYOffset)
    // console.log('offsetTop'+links.offsetTop)
    if (window.pageYOffset >= links.offsetTop) {
        links.classList.add("remove-links");
        adlinks.classList.add("remove-links");
        header.classList.add("smaller")
    } else {
        links.classList.remove("remove-links");
        adlinks.classList.remove("remove-links");
        header.classList.remove("smaller")
    }
};



// テキストの変換
function processText() {
    //: 指数表記の数値の変換
    let inputTextArea = document.getElementById('inputText');
    let inputText = inputTextArea.value;
    let outputTextArea = document.getElementById('outputText');
    let separator = getSelectedSeparator();

    let replacedText = inputText.replace(new RegExp(separator, 'g'), ' & ');
    replacedText = replacedText.replace(/\n/g, ' \\\\ \n');
    replacedText = replacedText.replace(/([+-]?\d+(\.\d*)?)\.?[Ee]([+-]?\d+)/g, function(match, p1, p2, p3) {
        return '$' + p1.replace(/^0+/, '') + '\\times10^{' + p3.replace(/^([+-]?)0+(.+)/, '$1$2') + '}$';
    });

    replacedText = replacedText.replace(/10\^\{\+/g,'10^{');
    replacedText = replacedText.replace(/10\^\{1}/g,'10');
    replacedText = replacedText.replace(/\\times10/g,'\\times 10');
    replacedText = replacedText.replace(/\\times\s10\^\{0}/g,'');
    // console.log(replacedText[replacedText.length-4]+replacedText[replacedText.length-3]);
    if (replacedText[replacedText.length-4]+replacedText[replacedText.length-3] !== "\\\\") {
        replacedText = replacedText + " \\\\"
    };

    console.log(replacedText);

    // cell-merge
    ret = countSymbols(replacedText);
    console.log(ret);
    table_row = ret.back;
    table_column = ret.and/ret.back + 1;
    console.log(table_row);
    console.log(table_column);












    outputTextArea.value = replacedText;

    //: 行数を合わせる
    let inputRows = inputText.split("\n").length;
    let textLineHeight = parseFloat(window.getComputedStyle(inputTextArea).lineHeight);
    let areaSize = String(inputRows * textLineHeight) + 'px'

    outputTextArea.style.height = areaSize;
    inputTextArea.style.height = areaSize;

    //: ClipBoardにコピー
    copyToClipboard();
}


// カンマorタブ区切りの取得
function getSelectedSeparator() {
    let commaRadio = document.getElementById('commaRadio');
    let tabRadio = document.getElementById('tabRadio');

    if (commaRadio.checked) {
        return ',';
    } else if (tabRadio.checked) {
        return '\t';
    }
    return '\t';
}


// $----------------------------------------------$ //

// &と\\の個数を返す
function countSymbols(str) {
    let counterOfAnd = 0;
    let counterOfBack = 0;
    for (let i = 0; i < str.length; i++) {
        // console.log(str[i])
      if (str[i] === "&") {
        counterOfAnd++;
      }else if (str[i] === "\\") {
        if (str[i+1] === "\\") {
            counterOfBack++;
            i++;
        }
      }
    }
    return {
        and: counterOfAnd,
        back: counterOfBack
    }
  }


// クリップボードにコピー
function copyToClipboard() {
    // コピー対象をJavaScript上で変数として定義する
    let copyTarget = document.getElementById("outputText");

    // コピー対象のテキストを選択する
    copyTarget.select();

    // 選択しているテキストをクリップボードにコピーする
    document.execCommand("Copy");

    // コピーをお知らせする
    changeAlertColor();

}

function changeAlertColor() {
    const copiedAlert = document.getElementById("copiedLabel");
    copiedAlert.style.color = "#000";
    copiedAlert.style.transition = "all 0.3s";
    setTimeout(function() {
        copiedAlert.style.color = "transparent";
    }, 3000);
    // console.log("changed")
}

// リセット
function deleteText() {
    let reset_target_in = document.getElementById("inputText");
    let reset_target_out = document.getElementById("outputText");

    if(reset_target_in.value == '' && reset_target_out.value == ''){
        alert('すでにリセットされています。');
    }else{
        reset_target_in.value = '';
        reset_target_out.value = '';
    }
    // 15px * 8rows
    reset_target_in.style.height = "120px";
    reset_target_out.style.height = "120px";
}


