安裝與使用:
1.在終端輸入brew install git

2.在終端機輸入git --version可以查看git版本

3.在終端機輸入git config --global user.name "使用者名稱"，可以設定使用者名稱

4.在終端機輸入git config --global user.email "使用者郵箱"，可以設定使用者郵箱

5.在終端機輸入git config --list可以查詢使用者名稱和使用者郵箱

6.在VS Code安裝git graph，可在VS Code左下角按Git Graph查看

7.VS Code左側有git功能，選擇初始化存放庫

8.可以在git的"變更"分類將變更過的資料按"+"符號並加入"暫存的變更"

9.上方訊息列可以輸入剛加入的版本的註記

10.提交並推送到Github


推送檔案至Github:

ㄧ.終端機指令上傳檔案
1.到終端機設定要上傳的檔案資料夾路徑(例:cd /Users/你的使用者名稱/Desktop/RAICIPE)

2.在終端機輸入git clone https://github.com/使用者名稱/Repository專案名稱.git

3.在終端機輸入git remote add origin https://github.com/使用者名稱/Repository專案名稱.git

4.在終端機輸入git push -u origin main即可上傳到該專案資要夾

二.VS Code介面上傳檔案
1.到終端機設定要上傳的檔案資料夾路徑(例:cd /Users/你的使用者名稱/Desktop/RAICIPE)

2.在終端機輸入git clone https://github.com/使用者名稱/Repository專案名稱.git

3.到VS Code在git的"變更"分類將變更過的資料按"+"符號並加入"暫存的變更"

4.上方訊息列可以輸入註記

5.點選提交

6.點選同步變更