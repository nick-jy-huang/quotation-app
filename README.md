<p align="center">
  <img src="https://quotation-app-zeta.vercel.app/favicon.png" width="120" alt="Quotation App Logo">
</p>

<h1 align="center">Quotation App 👨‍💻</h1>
<p align="center">
一款簡單好用的線上報價單編輯與預覽工具，支援多欄位填寫、即時計算與美觀的預覽畫面，適合各類型專案報價需求。
</p>

<p align="center">
  <img src="https://github.com/nick-jy-huang/quotation-app/blob/main/public/bg_light.png" width="49%" alt="Quotation App Light Preview" style="border-radius: 20px; box-shadow: 0 4px 24px rgba(0,0,0,0.15);" />
  <img src="https://github.com/nick-jy-huang/quotation-app/blob/main/public/bg_dark.png" width="49%" alt="Quotation App Dark Preview" style="border-radius: 20px; box-shadow: 0 4px 24px rgba(0,0,0,0.15);" />
</p>

## ✨ 特色功能

- 📝 報價單編輯與即時預覽
- 🧑‍💼 輕鬆填寫基本資料、接案人資料、客戶資料與工作內容
- 🧮 報價單小計、總計自動計算
- ⏳ 支援 Input Debounce，提升輸入體驗
- 🌐 社群分享自動顯示預覽圖（Open Graph）
- ♿ Axe-core 驗證無障礙設計
- 📄 匯出 PDF 並自動儲存匯出紀錄於 localStorage，支援歷史紀錄載入與清除
- 📱 RWD 浮動匯出按鈕與匯出紀錄，手機／平板體驗佳
- 🎨 Prettier 程式碼格式化與 TypeScript 嚴謹型別
- 🧩 元件結構清楚，易於維護與擴充
- 🌏 多語系支援
- 🌙 支援 Dark mode 主題切換，夜間閱讀更舒適

## 🛠️ 技術架構

- ⚡ Next.js 15
- ⚛️ React 18
- 🦾 TypeScript
- 💨 Tailwind CSS
- 🌍 next-intl
- 🗃️ Zustand 狀態管理
- 📅 dayjs 處理日期
- 🖨️ html2canvas + jsPDF 匯出 PDF
- ♿ axe-core 無障礙檢查

## 🌏 i18n 多語系支援

- 🇹🇼🇺🇸 支援中英文（zh-TW / en-US）介面切換
- 🔄 語言切換按鈕可即時切換所有 UI 文字
- 🛣️ 語系路由自動化，middleware 會根據支援語言自動產生白名單
- ✅ 所有主要元件皆有多語系測試，確保不同語言下顯示正確
- ➕ 新增語言只需於 `constants/locale.ts` 設定，無需手動調整 middleware
- 🗂️ message 新增語系表

## 🌙 Dark mode

- 自動偵測系統偏好（`@media (prefers-color-scheme: dark)`）。
- 報價單預覽區（QuotationPreview）強制亮色顯示，列印與分享時不受 dark mode 影響。
- 所有主色藍在深色主題下自動調整，確保對比度與無障礙。
- 格線、陰影、隔線等細節皆針對 dark mode 優化，夜間閱讀更舒適。

## 🚀 安裝與啟動

1. ⬇️ 下載專案

```bash
git clone https://github.com/nick-jy-huang/quotation-app.git
cd quotation-app
```

2. 📦 安裝相依套件

```bash
pnpm install
```

3. ▶️ 啟動開發伺服器

```bash
pnpm dev
```

4. 🌐 開啟瀏覽器並前往 [http://localhost:3000](http://localhost:3000)

## 🖥️ Node.js 版本需求

本專案建議使用 Node.js 20 以上版本（Next.js 15 需 Node.js 18+，建議 20 以上）。

## 🧪 測試

本專案採用 Vitest + Testing Library 進行單元與元件測試，涵蓋主要元件、流程、無障礙、RWD、localStorage、副作用等情境。

- 🧪 使用 [Vitest](https://vitest.dev/) 作為測試框架，支援 TypeScript 與 Vite 專案。
- 🧑‍💻 使用 [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) 進行元件渲染與互動測試。
- 📊 覆蓋率報表自動產生於 `coverage/` 目錄，可用瀏覽器開啟 `coverage/index.html` 查看詳細覆蓋情況。
- ✅ 重要元件皆有 smoke test、props 傳遞、互動、無障礙、RWD 等測試案例。
- 🗃️ PDF 匯出、localStorage 等副作用皆有 mock 處理，確保測試穩定。

### 🏃‍♂️ 執行測試

```bash
pnpm test
```

### 🧰 相關測試指令

- `pnpm test`：執行所有單元測試，執行測試並產生覆蓋率報表，**coverage** 資料夾中點擊 **index.html**

## 📄 授權

- 本專案採用 MIT License 授權，詳見 [LICENSE](./LICENSE)。
- 作者：nick-jy-huang
- 本專案部分圖示素材來自 [Flaticon](https://www.flaticon.com/)。
- 本專案 icon 來自 [fontawesome](https://www.fontawesome.com/)。
