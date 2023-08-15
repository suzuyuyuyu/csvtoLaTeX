// テキストの変換
function processText() {
    var inputText = document.getElementById('inputText').value;
    var separator = getSelectedSeparator();

    var replacedText = inputText.replace(new RegExp(separator, 'g'), ' & ');
    replacedText = replacedText.replace(/\n/g, ' \\\\ \n');
    replacedText = replacedText.replace(/([+-]?\d+(\.\d*)?)\.?[Ee]([+-]?\d+)/g, function(match, p1, p2, p3) {
        return '$' + p1.replace(/^0+/, '') + '\\times10^{' + p3.replace(/^([+-]?)0+(.+)/, '$1$2') + '}$';
    });

    replacedText = replacedText.replace(/10\^\{\+/g,'10^{')
    replacedText = replacedText.replace(/10\^\{1}/g,'10')
    replacedText = replacedText.replace(/\\times10/g,'\\times 10')
    replacedText = replacedText.replace(/\\times\s10\^\{0}/g,'')

    document.getElementById('outputText').value = replacedText;
}

// カンマorタブ区切りの取得
function getSelectedSeparator() {
    var commaRadio = document.getElementById('commaRadio');
    var tabRadio = document.getElementById('tabRadio');

    if (commaRadio.checked) {
        return ',';
    } else if (tabRadio.checked) {
        return '\t';
    }

    return '\t';
}


// $----------------------------------------------$ //

// クリップボードにコピー
function copyToClipboard() {
    // コピー対象をJavaScript上で変数として定義する
    var copyTarget = document.getElementById("outputText");

    // コピー対象のテキストを選択する
    copyTarget.select();

    // 選択しているテキストをクリップボードにコピーする
    document.execCommand("Copy");

    // コピーをお知らせする
    alert("copied : \n " + copyTarget.value);
}

// リセット
function deleteText() {
    var reset_target_in = document.getElementById("inputText");
    var reset_target_out = document.getElementById("outputText");
    
    if(reset_target_in.value == '' && reset_target_out.value == ''){
        alert('すでにリセットされています。');
    }else{
        reset_target_in.value = '';
        reset_target_out.value = '';
    }
}