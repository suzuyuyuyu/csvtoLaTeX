# csvを LaTeX の表形式に変換する

## 内容
タブ区切りのExcelをそのままコピーした形式のデータ，あるいはカンマ区切りのcsv形式のデータを $\mathrm{\LaTeX}$ の表に変換するためのものである。  
内容は<a href="https://rra.yahansugi.com/scriptapplet/csv2tabular/">csvやExcel表からのコピペでLaTeXの表に変換「csv2tabular」</a>とほとんど変わらない。
相違点は外見とExcelの指数表記（例：1.2E-04）も $\mathrm{\LaTeX}$ の数式（例：$1.2\times 10^{-4}$）に対応している点である。

## 使い方
- `CSVtoLaTeX`をPC内(オフラインでアクセスできる場所推奨)にコピペする。
- `index.html`をブラウザで開く。
- 動作が確認されたらそのページのショートカットをデスクトップに貼り付ければオフラインでそれを使うことができる。

コピペテスト用

```vb
a, 2.00.E-03, 1.30E+00
b, 2.00.E+06, 1.30E+01
c, 2.00.E+00, 1.30E+01
d, 1.35.E+02, 1.35E+00
e, -1.20.E-13, 1.80E+01
```

## 補遺
### ・ タブ区切り，カンマ区切りのデフォルトの値を変更する(2023/08/18)
`./index.html`
```html:./index.html
<div class="processRadio">
    <input type="radio" id="tabRadio" name="separator" value="tab" checked>
    <label for="tabRadio">タブ区切り</label><br>

    <input type="radio" id="commaRadio" name="separator" value="comma">
    <label for="commaRadio">カンマ区切り</label><br>
</div>
```
における`checked`の位置を`value="comma"`の後ろに移動させる


### ・ Convert 押下時にコピーしない(2023/08/18)
`./script/main.js`
```Javascript:./script/main.js
function processText() {
    //: 指数表記の数値の変換
    let inputTextArea = document.getElementById('inputText');
    let inputText = inputTextArea.value;

    ︙

    //: ClipBoardにコピー
    copyToClipboard();
}
```
の関数`copyToClipboard();`を削除
