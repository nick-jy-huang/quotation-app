<p align="center">
  <img src="https://quotation-app-zeta.vercel.app/favicon.png" width="100" alt="Quotation App Logo">
</p>

<h1 align="center">Quotation App</h1>

一款簡單好用的線上報價單編輯與預覽工具，支援多欄位填寫、即時計算與美觀的預覽畫面，適合各類型專案報價需求。

## 特色功能

- 報價單編輯與即時預覽
- 輕鬆填寫基本資料、接案人資料、客戶資料與工作內容
- 報價單小計、總計自動計算
- 支援 Input Debounce，提升輸入體驗
- 社群分享自動顯示預覽圖（Open Graph）
- Axe-core 驗證無障礙設計
- 匯出 PDF 並自動儲存匯出紀錄於 localStorage，支援歷史紀錄載入與清除
- RWD 浮動匯出按鈕與匯出紀錄，手機／平板體驗佳
- Prettier 程式碼格式化與 TypeScript 嚴謹型別
- 元件結構清楚，易於維護與擴充

## 技術架構

- Next.js 13+
- React 18
- TypeScript
- Tailwind CSS
- Zustand 狀態管理
- dayjs 處理日期
- html2canvas + jsPDF 匯出 PDF
- axe-core 無障礙檢查

## 安裝與啟動

1. 下載專案

```bash
git clone https://github.com/nick-jy-huang/quotation-app.git
cd quotation-app
```

2. 安裝相依套件

```bash
pnpm install
```

3. 啟動開發伺服器

```bash
pnpm dev
```

4. 開啟瀏覽器並前往 [http://localhost:3000](http://localhost:3000)

## 授權

- 本專案採用 MIT License 授權，詳見 [LICENSE](./LICENSE)。
- 作者：nick-jy-huang
- 本專案部分圖示素材來自 [Flaticon](https://www.flaticon.com/)。
- 本專案 icon 來自 [fontawesome](https://www.fontawesome.com/)。