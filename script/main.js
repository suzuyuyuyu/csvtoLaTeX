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
        window.addEventListener('resize', reSize);
        window.addEventListener("scroll", bar_eraser);
        window.addEventListener('resize', bar_eraser);

    })
}, 1000);



//「アクション」の設定
const reSize = () => {
  // textareaOutの大きさをtextareaInと同じにする
  textareaOut.style.width = getComputedStyle(textareaIn).width;
  textareaOut.style.height = getComputedStyle(textareaIn).height;
//   console.log('T')
};

const bar_eraser = () => {
    const links = document.querySelector(".links");
    const header = document.querySelector(".header");
    const adlinks = document.querySelector(".additional-links");
    const height = window.innerHeight;
    // console.log(height);
    // console.log('pageYOffset'+window.pageYOffset)
    // console.log('offsetTop'+links.offsetTop)
    if (height<=500) {
        links.classList.add("remove-links");
        adlinks.classList.add("remove-links");
    } else {
        if (window.pageYOffset >= links.offsetTop) {
            links.classList.add("remove-links");
            adlinks.classList.add("remove-links");
            // header.classList.add("smaller")
        } else {
            links.classList.remove("remove-links");
            adlinks.classList.remove("remove-links");
            // header.classList.remove("smaller")
        }
        
    }
};



// テキストの変換
function processText() {
    replacedText = convertText();

    // テキストエリアの下のtableを作る
    createTable(replacedText);
    
    //: ClipBoardにコピー
    copyToClipboard();
}

// 変換の手順
function convertText() {
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

    // console.log(replacedText);

    // ! 結果の挿入
    outputTextArea.value = replacedText;
    
    //: 行数を合わせる
    let inputRows = inputText.split("\n").length;
    let textLineHeight = parseFloat(window.getComputedStyle(inputTextArea).lineHeight);
    let areaSize = String(inputRows * textLineHeight) + 'px'
    
    outputTextArea.style.height = areaSize;
    inputTextArea.style.height = areaSize;

    return replacedText;
}


// outputDivのioniconでできているtableを作成する
function createTable(replacedText) {
    // cell-merge
    // 記号の数から縦横のサイズを得る
    ret = countSymbols(replacedText);
    
    table_row = ret.back;
    table_column = ret.and/ret.back + 1;

    let replaced_table = [];
    for (let row=0; row<table_row; row++) {
        replaced_table[row] = [];
        for (let column=0; column<table_column; column++) {
            replaced_table[row][column] = '0';
        }
    }

    // 改行文字で分割
    let rows = replacedText.split(/\n/);
    let dataArray = [];
    for (let row_number=0; row_number<5; row_number++){
        dataArray[row_number] = rows[row_number].split(/&/)
    }
    
    // 結果を表示
    for (let i=0; i<dataArray.length; i++) {
        for (let j=0; j<dataArray[0].length; j++) {
            dataArray[i][j] = dataArray[i][j].replace(/\s/g, '')
            if (dataArray[i][j] === '' | dataArray[i][j] === '\\\\') {
                dataArray[i][j] = 'empty'
            } else {
                dataArray[i][j] = 'filled'
            }
        }
    }
    // console.log(dataArray);
    let dataArray_ef = dataArray;
    
    // 新しいテーブル要素を作成
    let table_pre = document.querySelector("table");

    // テーブルが存在する場合にのみ削除
    if (table_pre) {
        // テーブルを親要素から削除
        table_pre.parentNode.removeChild(table_pre);
    }
    let table = document.createElement("table");
    table.id = 'overviewTable'
    
    // すべてfilledの場合はtableを作成しない
    let doMakeTable = false;

    // テーブルデータをループして行とセルを作成
    for (let i = 0; i < dataArray_ef.length; i++) {
        let row = document.createElement("tr");
        row.id = 'tr' + String(i);
        for (let j = 0; j < dataArray_ef[i].length; j++) {
            let cell = document.createElement("td");
            cell.id = 'td' + String(i) + String(j);
            if (dataArray[i][j] === 'empty') {
                doMakeTable = true;
                cell.innerHTML = '<ion-icon name="scan-outline"></ion-icon>';
                let clickCount = 0;
                cell.addEventListener("click", function () {
                    // クリック回数に応じてテキストを変更
                    clickCount++;
                    cell.innerHTML = (clickCount % 3 === 0) ? '<ion-icon name="scan-outline"></ion-icon>' :
                                         (clickCount % 3 === 1) ? '<ion-icon name="arrow-back-outline"></ion-icon>' : 
                                                                    '<ion-icon name="arrow-up-outline"></ion-icon>';
                });
            } else {
                cell.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon>';
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    
    if (doMakeTable) {
        // テーブルをoutputDivに挿入
        let tableDiv = document.getElementById('cell-merge-tbl');
        tableDiv.appendChild(table);
    }

}

// Mergeが押下されたときの処理
function cellMergeProcess() {
    convertText();
    let table = document.getElementById('overviewTable');
    // let tr = document.getElementById('')
    let replacedText = document.getElementById('outputText').value;
    ret = countSymbols(replacedText);
    table_row = ret.back;
    table_column = ret.and/ret.back + 1;
    console.log(table_row,table_column);
    let TFtable = [];

    // 各セルに対して，
    // 上と結合：'u'
    // 左と結合：'l'
    // 空白のまま：'e'
    // 空白でないセル：'f'
    // となるような検証用の配列を作成
    
    for (let row=0; row<table_row; row++) {
        TFtable[row] = [];
        for (let column=0; column<table_column; column++) {
            let td_elem = document.getElementById('td'+String(row)+String(column));
            if (td_elem.innerHTML.includes('name="scan-outline"')) {
                TFtable[row][column] = 'e';
            } else if (td_elem.innerHTML.includes('name="arrow-back-outline"')) {
                TFtable[row][column] = 'l';
            } else if (td_elem.innerHTML.includes('name="arrow-up-outline"')) {
                TFtable[row][column] = 'u';
            } else {
                TFtable[row][column] = 'f';
            }
        }
    }


    // 改行で分割
    let rows = replacedText.split(/\\\\ \n/);

    // 配列の初期化
    // tableを配列に入れる
    let tableArray = [];

    // 各行を処理
    for (let i = 0; i < rows.length; i++) {
        // &で分割
        let columns = rows[i].split("&");

        // 配列に追加
        tableArray.push(columns.map(column => column.trim()));
    }
    for (let row=0; row<tableArray.length; row++){
        for (let column=0; column<tableArray[row].length; column++) {
            tableArray[row][column] = tableArray[row][column].replace(/\\\\/,'');
        }
    }


    // console.log(TFtable);
    // 検証用の配列に対して逆に(右下から)探索して，
    for (row=0; row<table_row; row++) {
        for (column=0; column<table_column; column++) {

            // 'u'が出てきたら上を探索していく
            if (TFtable[table_row-row-1][table_column-column-1] === 'u') {
                // 結合する行数
                let rowMergeNumber = 1;
                // 
                let doRowMerge = true;
                // console.log((table_row-row-1)+'行目が該当しました')
                // u2: すでに結合される
                TFtable[table_row-row-1][table_column-column-1] = 'u2';
                while (true) {
                    if (TFtable[table_row-row-1-rowMergeNumber][table_column-column-1] === 'u') {
                        TFtable[table_row-row-1-rowMergeNumber][table_column-column-1] = 'u2';
                        rowMergeNumber++;
                    } else if (TFtable[table_row-row-1-rowMergeNumber][table_column-column-1] === 'l') {
                        // l(左矢印)と結合しようとした場合
                        // そもそも結合しない処理
                        doRowMerge = false;
                        break;
                    } else {
                        break;
                    }
                }
                rowMergeNumber++;

                // console.log(String(table_row-row-1-rowMergeNumber+2)+'行目'+'から'+rowMergeNumber+'行だけ結合します');

                if (doRowMerge) {
                    // \multirow{}{*}{text}の形に直す
                    tableArray[table_row-row-1-rowMergeNumber+1][table_column-column-1] =
                                '\\multirow{' +String(rowMergeNumber) +
                                '}{*}{' + tableArray[table_row-row-1-rowMergeNumber+1][table_column-column-1] +
                                '}' 
                } else {
                    console.log("wasn't merged");
                }
                



            // 'l'が出てきたら左を探索していく
            } else if (TFtable[table_row-row-1][table_column-column-1] === 'l') {
                // 結合する行数
                let columnMergeNumber = 1;
                // 
                let doColumnMerge = true;
                // l2: すでに結合される予定のもの
                TFtable[table_row-row-1][table_column-column-1] = 'l2';
                while (true) {
                    if (TFtable[table_row-row-1][table_column-column-1-columnMergeNumber] === 'l') {
                        TFtable[table_row-row-1][table_column-column-1-columnMergeNumber] = 'l2';
                        columnMergeNumber++;
                    } else if (TFtable[table_row-row-1][table_column-column-1-columnMergeNumber] === 'u') {
                        // u(左矢印)と結合しようとした場合
                        // そもそも結合しない処理
                        doColumnMerge = false;
                        break;
                    } else {
                        break;
                    }
                }
                columnMergeNumber++;

                // console.log(String(table_row-row-1-columnMergeNumber+2)+'行目'+'から'+columnMergeNumber+'行だけ結合します');

                if (doColumnMerge) {
                    // \multicolumn{}{c}{text}の形に直す
                    tableArray[table_row-row-1][table_column-column-1-columnMergeNumber+1] =
                                '\\multicolumn{' +String(columnMergeNumber) +
                                '}{c}{' + tableArray[table_row-row-1][table_column-column-1-columnMergeNumber+1] +
                                '}' 
                } else {
                    console.log("wasn't merged");
                }
            }
        }
    }


    // tableを結合して文字列にする
    let text = '';
    for (let i=0; i<table_row; i++){
        for (let j=0; j<table_column; j++){
            if (text.includes('\\multicolumn')) {
                text = text + tableArray[i][j]
            } else {
                text = text + tableArray[i][j] + ' & ';
            }
        }
        text = text.replace(/ & $/, '');
        text = text + ' \\\\ \n';
    }
    text = text.replace(/\n$/, '');
    // console.log(text);

    // 結合を記入したものを挿入
    document.getElementById('outputText').value = text;
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


