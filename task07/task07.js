(() => {
  'use strict';
  const eventType1 = ['app.record.create.show', 'app.record.edit.show'];
  const eventType2 = ['app.record.edit.change.日付', 'app.record.edit.change.サイボウズ製品', 'app.record.edit.change.管理番号',
    'app.record.create.change.日付', 'app.record.create.change.サイボウズ製品', 'app.record.create.change.管理番号'];

  kintone.events.on(eventType1, (event) => {
    // 重複禁止項目⽂字列フィールドは常に編集不可にする
    event.record.重複禁止項目_文字列.disabled = true;
    return event;
  });

  kintone.events.on(eventType2, (event) => {
    // 日重複禁止項目文字列フィールドに入れる日付の値を定義
    const inputDate = event.record.日付.value;
    const newDate = dateFns.format(inputDate, 'YYYYMMDD'); // 日付をハイフンなしの形に変換

    // サイボウズ製品の種類が選択されたとき、重複禁止項目文字列フィールドに入れる値を定義
    let proElement = '';
    switch (event.record.サイボウズ製品.value) {
      case 'kintone':
        proElement = 'KN';
        break;
      case 'Garoon':
        proElement = 'GR';
        break;
      case 'サイボウズ Office':
        proElement = 'OF';
        break;
      case 'Mailwise':
        proElement = 'MW';
        break;
    }

    // 管理番号を入力したとき、重複禁止項目文字列フィールドに入れる管理番号の値を定義
    const inputNumber = event.record.管理番号.value;
    // 重複禁止項目文字列に値を代入
    event.record.重複禁止項目_文字列.value = `${newDate}-${proElement}-${inputNumber}`;
    return event;
  });
})();
