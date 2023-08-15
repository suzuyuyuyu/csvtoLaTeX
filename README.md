# csvを $\mathrm{\LaTeX}$ の表形式に変換する

## 内容
タブ区切りのExcelをそのままコピーした形式のデータ，あるいはカンマ区切りのcsv形式のデータを $\mathrm{\LaTeX}$ の表に変換するためのものである。  
内容は<a href="https://rra.yahansugi.com/scriptapplet/csv2tabular/">csvやExcel表からのコピペでLaTeXの表に変換「csv2tabular」</a>とほとんど変わらない。
変更点は外見とExcelの指数表記（例：1.2E-04）も $\mathrm{\LaTeX}$ の数式（例：$1.2\times 10^{-4}$）に対応させた点である。

## 使い方
- `CSVtoLaTeX`をPC内(オフラインでアクセスできる場所)にコピペする。
- `converter`内の`converter.html`をブラウザで開く。
- 動作が確認されたらそのページのショートカットをデスクトップに貼り付ければオフラインでそれを使うことができる。

<br>
コピペテスト用  

```
a, 2.00.E-03, 1.30E+00
b, 2.00.E+06, 1.30E+01
c, 2.00.E+00, 1.30E+01
d, 1.35.E+02, 1.35E+00
e, -1.20.E-13, 1.80E+01
```
