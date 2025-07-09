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

- Next.js 15
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

## Node.js 版本需求

本專案建議使用 Node.js 20 以上版本（Next.js 15 需 Node.js 18+，建議 20 以上）。

## 測試

本專案採用 Vitest + Testing Library 進行單元與元件測試，涵蓋主要元件、流程、無障礙、RWD、localStorage、副作用等情境。

- 使用 [Vitest](https://vitest.dev/) 作為測試框架，支援 TypeScript 與 Vite 專案。
- 使用 [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) 進行元件渲染與互動測試。
- 覆蓋率報表自動產生於 `coverage/` 目錄，可用瀏覽器開啟 `coverage/index.html` 查看詳細覆蓋情況。
- 重要元件皆有 smoke test、props 傳遞、互動、無障礙、RWD 等測試案例。
- PDF 匯出、localStorage 等副作用皆有 mock 處理，確保測試穩定。

### 執行測試

```bash
pnpm test
# 或
pnpm vitest run --coverage
```

### 相關測試指令

- `pnpm test`：執行所有單元測試
- `pnpm vitest run --coverage`：執行測試並產生覆蓋率報表

## 授權

- 本專案採用 MIT License 授權，詳見 [LICENSE](./LICENSE)。
- 作者：nick-jy-huang
- 本專案部分圖示素材來自 [Flaticon](https://www.flaticon.com/)。
- 本專案 icon 來自 [fontawesome](https://www.fontawesome.com/)。
