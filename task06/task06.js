(() => {
  'use strict';
  // Action5の文字列を入れた配列を作成
  const actionArr = ['あくなき探求', '不屈の心体', '理想への共感', '心を動かす', '知識を増やす', '公明正大'];

  // イベント内容：「レコード追加画面を表示したとき」
  kintone.events.on('app.record.create.show', (event) => {
    console.log(event); // kintoneのアプリのデータオブジェクト閲覧

    // Action5のドロップダウンのすべての値が初期値として登録されるようにする
    const tableElement = event.record.Table.value; // テーブルの行全体を参照
    actionArr.forEach((val, index) => {
      const td = {
        value: {
          'Action5': {
            'type': 'DROP_DOWN',
            'value': actionArr[index],
          },
          '課題': {
            'type': 'MULTI_LINE_TEXT',
            'value': '',
          },
          '状況': {
            'type': 'CHECK_BOX',
            'value': [
              '未振り返り',
            ],
          },
        }
      };
      tableElement.push(td);
    });
    tableElement.shift(); // tableの行の1行目（=コピー元）を削除
    return event;
  });
})();
