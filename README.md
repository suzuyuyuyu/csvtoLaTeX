# csvtoLaTeX
[Page Link](https://suzuyuyuyu.github.io/csvtoLaTeX)

## About this repository

タブ区切りのデータ、あるいはカンマ区切りのデータを $\mathrm{\LaTeX}$ の表に変換するためのものです。\
<a href="https://rra.yahansugi.com/scriptapplet/csv2tabular/">csvやExcel表からのコピペでLaTeXの表に変換「csv2tabular」</a>というページを使いやすくしています。

> Excelをそのままコピーするとタブ区切り、csvファイルをテキストで開いてコピーするとカンマ区切りになります。

**Features**
- Excelの指数表記（例：1.2E-04）もLaTeXの数式（例：$1.2\times 10^{-4}$）に対応しています。

- オンライン・オフラインのいずれでも使用することが出来ます。


## How to use
### オンライン
---
[このページ](https://suzuyuyuyu.github.io/csvtoLaTeX/)から使えます。

### オフライン
---
ローカルにダウンロードする方法は主に2つあります。

#### Gitを使う場合（推奨）

- 適当なところに`cd`して[このリポジトリ](https://github.com/suzuyuyuyu/csvtoLaTeX)をcloneします。
```shell
git clone https://github.com/suzuyuyuyu/csvtoLaTeX.git
```
`.git`ディレクトリは削除しても構いませんが、残しておくと更新が容易になります。

- `index.html`へのショートカットをデスクトップなどに貼り付けます。ショートカットの名称やアイコンは適当に変更して問題ありません。

- あるいはWindowsの場合は`C:\Users\name\AppData\Roaming\Microsoft\Windows\Start Menu\Programs`にショートカットを作成します。

    - スタートメニュー、（Windowsキーを押下して）アプリの検索から開けるようになります。

#### ダウンロードする場合

- [このリポジトリ](https://github.com/suzuyuyuyu/csvtoLaTeX.git)のCodeと書いてあるボタンからzipファイルをダウンロードします。

- 適当なところで解凍して、ショートカットをデスクトップなどに貼り付けます。[Gitを使う場合](#gitを使う場合)と同様です。


<details>
<summary>コピペテスト用</summary>

```csv
a, 2.00.E-03, 1.30E+00
b, 2.00.E+06, 1.30E+01
c, 2.00.E+00, 1.30E+01
d, 1.35.E+02, 1.35E+00
e, -1.20.E-13, 1.80E+01
```

</details>

## Customize
このコードはHTML/CSS/JavaScriptで書かれているので、ローカルにダウンロードして使用している場合には自由にカスタマイズできます。

### ・ タブ区切り、カンマ区切りのデフォルトの値を変更する

デフォルトではタブ区切りにチェックが入っています。カンマ区切りに変更するには

`./index.html`
```html:./index.html
<div class="processRadio">
    <input type="radio" id="tabRadio" name="separator" value="tab" checked>
    <label for="tabRadio">タブ区切り</label><br>

    <input type="radio" id="commaRadio" name="separator" value="comma">
    <label for="commaRadio">カンマ区切り</label><br>
</div>
```
における`checked`の位置を`value="comma"`の後ろに移動させてください。


### ・ Convert 押下時にコピーしない

Convertボタンを押下するとクリップボードにコピーされます。
自動でコピーされないようにするためには

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
の関数`copyToClipboard();`を削除、あるいは`//`でコメントアウトしてください。
