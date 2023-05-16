# ForStudy
管理者の皆さんへ。
***まずはアカウントを作って、私に教えてください!***

### ＜ファイルをアップロードしたいとき＞
*1. dataディレクトリ（ファイル）にアップロードしてください。*

※1新しくディレクトリを作らず、ファイルそのものを置いて下さい。

※2対応しているのは.xlsxのみです。マクロが入ってるやつは.xlmxになるのでだめです。.xlmxはマクロが入っていない表部分だけの.xlsxファイルを作ってアップロードしてください。


*2. fileTitle.jsと書いているファイルを編集します。*
```javascript:fileTitle.js
fileTitle = [
  "book1.xlsx",
  "book2.xlsx"
]
```

新しく「地歴考査対策用プリント.xlsx」をアップロードしたとき、以下のように追加してください。

```javascript:fileTitle.js
fileTitle = [
  "book.xlsx",
  "book2.xlsx",
  "地歴考査対策用プリント.xlsx"
]
