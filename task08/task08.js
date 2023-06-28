(() => {
  'use strict';
  // イベント内容：「レコード追加画面を表示したとき」
  kintone.events.on('app.record.create.show', async (event) => {
    // アプリのデータを取得
    const body = {
      app: kintone.app.getId(), // 「id:アプリ番号」のコードと同じ
    };
    const appData = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json', true), 'GET', body);

    // アプリデータでAction5が入っているデータ
    const action5Data = appData.properties.Table.fields.Action5.options;

    const tableElement = event.record.Table.value; // テーブルの行全体を参照

    // map()を使い、「Action5のオブジェクトデータを配列にする」と「Action5のオブジェクトデータをindex番号順に並び替え」を一度に行う
    const action5DataSort = Object.keys(action5Data).map((val) => action5Data[val]).sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      }
      return -1; // if文の条件でない場合は-1
    });

    // action5のドロップダウンのすべての値が初期値として登録されるようにする
    Object.keys(action5DataSort).forEach((val, index) => {
      const td = {
        value: {
          'Action5': {
            'type': 'DROP_DOWN',
            'value': action5DataSort[val].label,
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
