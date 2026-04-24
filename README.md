# 開南大學 2026 實作：AI PM 練習專案

這份專案是給大一到大二學生使用，用來練習 AI Product Manager（AI PM）的基礎流程。  
重點不是一次做出完美產品，而是學會「從需求到文件，再到可討論的 mock」這條主線。

## 專案目標

- 了解 AI PM 常見工作流：需求盤點 -> PRD -> Mock 規格 -> Storybook Mockup
- 練習把模糊想法轉成工程可執行的規格文件
- 練習前後端對齊與跨角色溝通（PM / FE / BE / QA）

## 核心 Skills

1. `prd-gen`  
   透過問答蒐集需求，產生 PRD 與流程圖（Flowchart / Sequence）。

2. `prd-mock`  
   根據 PRD 產出給 Storybook 使用的 Mockups Spec（stories、狀態矩陣、fixtures）。

3. `storybook-gen`  
   根據 PRD + Mockups Spec 實作可在本機跑的 Storybook mockup，方便和工程師討論 UI 與互動。

## 建議練習流程

1. 先用 `prd-gen` 完成一版 PRD（先完整再精緻）。
2. 用 `prd-mock` 把 PRD 拆成可實作的畫面規格與情境狀態。
3. 用 `storybook-gen` 做出可以 demo 的 stories。
4. 和同學或工程師一起 review，修正文案、流程、欄位與驗收標準。
5. 回到 PRD 與 Mockups Spec 持續迭代（文件與 mock 要同步更新）。

## 專案主要目錄

- `doc/main/`：PRD 主文
- `doc/mockups/`：Mockups Spec（Storybook 規格）
- `storybook/`：本機 Storybook 專案與 stories
- `sb.sh`：Storybook 快速執行腳本

## 常用指令

在專案根目錄可直接使用：

- `sb`：build 本機 Storybook（輸出到 `storybook/storybook-static`）
- `sb dev`：啟動本機 Storybook 開發伺服器

## 學習重點建議

- 不只寫 happy path，要包含 `loading` / `empty` / `error` / `success`
- 命名一致（scenario、區塊 ID、動作 ID）
- 商業規則要能在 UI 看到對應驗證（例如字數限制、disabled 條件）
- 每次改需求時，同步更新 PRD、Mockups Spec、Storybook

## 補充說明

- 本專案以教學與練習為主，文件可先求清楚，再求完整。
- 如果你是第一次接觸 PM 流程，建議先從單一功能（例如一個列表 + 一個表單）開始。
- 任何流程都可以被質疑與優化，請把討論痕跡留在文件中，這就是 PM 能力的一部分。
