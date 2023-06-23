(() => {
  'use strict';
  // Action5の文字列を入れた配列を作成
  const ActionArr = ['あくなき探求', '不屈の心体', '理想への共感', '心を動かす', '知識を増やす', '公明正大'];

  // イベント内容：「レコード追加画面を表示したとき」
  kintone.events.on('app.record.create.show', (event) => {
    console.log(event); // kintoneのアプリのデータオブジェクト閲覧

    // Action5のドロップダウンのすべての値が初期値として登録されるようにする
    const TableElement = event.record.Table.value; // テーブルの行全体を参照
    // 新規テーブル行の追加 → Action5のドロップダウンの初期値を設定
    for (let i = 0; i < 6; i++) {
      const TableClone = structuredClone(TableElement[0]); // 初期設定で存在しているテーブルの1行目をディープコピー
      TableElement.push(TableClone); // テーブルに行を追加
      TableClone.value.Action5.value = ActionArr[i]; // Action5ドロップダウンの初期値を入れる
    }
    TableElement.shift(); // tableの行の1行目（=コピー元）を削除
    return event;
  });
})();