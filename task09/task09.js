(() => {
  'use strict';
  // レコード追加画面、レコード編集画面で保存ボタンを押したとき
  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], async (event) => {
    // 他レコードの情報を取得
    const body = {
      app: kintone.app.getId(),
    };
    return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body).then((recordData) => {
      // 他レコードの重複禁止項目の要素を取得し配列に入れる
      const inputElement = event.record.重複禁止項目.value;
      const recordElementArr = [];
      Object.keys(recordData.records).forEach((val) => {
        const recordElement = recordData.records[val].重複禁止項目.value;
        recordElementArr.push(recordElement);
      });

      // 他のレコードの重複禁止項目と重複している場合アラートを出す。キャンセルの場合は編集画面に戻る
      if (recordElementArr.find((ele) => ele === inputElement)) {
        if (!window.confirm('レコードが重複しています。このまま保存しますか？')) {
          return false;
        }
      }
      return event;
    });
  });
})();
