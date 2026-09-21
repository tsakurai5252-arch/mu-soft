Dim WshShell
Set WshShell = CreateObject("WScript.Shell")

' 第一引数: 表示するメッセージ
' 第二引数: 待ち時間 (秒)。0を指定するとユーザーが閉じるまで待機します。
' 第三引数: ウィンドウのタイトル
' 第四引数: アイコンとボタンの種類 (数値)
WshShell.Popup "タイピングゲームのバージョンはver1です。", 0, "バージョン情報(ZT03)", 64

Set WshShell = Nothing