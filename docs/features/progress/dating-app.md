# dating-app TODO

> Feature: 約會對象紀錄系統（prd#1）  
> Source docs: `docs/features/dating-app/prd.md` + `docs/features/dating-app/mockups.md`

## 0) Setup & Alignment

- [x] 建立 Feature 作戰中心：`docs/features/dating-app/`
- [x] 同步 PRD 主文：`docs/features/dating-app/prd.md`
- [x] 同步 Mockups 規格：`docs/features/dating-app/mockups.md`
- [x] 掃描命名衝突（發現既有 Storybook `Mockups/PersonalCRM/DatingTargetRecord`）

## 1) Data First（PRD §5）

- [x] 建立 `src/types/dating.ts`
- [x] 定義 `DatingTarget` / `InteractionLog` / `AITagProfile` / `DatingPlanSuggestion`
- [x] 補齊 `DraftBuffer` 與 fixture 共用 `DatingTargetRecordFixture` / `DatingTargetRecordUIState`

## 2) Mock Fixtures（Mockups §8）

- [x] 建立 `fixtures/dating-target-record/empty.json`
- [x] 建立 `fixtures/dating-target-record/normal.json`
- [x] 建立 `fixtures/dating-target-record/parse-failed.json`
- [x] 建立 `fixtures/dating-target-record/short-input.json`
- [x] 建立 `fixtures/dating-target-record/draft-recovered.json`

## 3) Must-pass Stories（待實作）

- [ ] `List-Empty-Desktop`
- [ ] `Modal-Create-Open-Desktop`
- [ ] `Detail-Normal-Desktop`
- [ ] `Parse-ParseFailed-Desktop`
- [ ] `Suggestion-ShortInput-Desktop`
- [ ] `Draft-DraftRecovered-Desktop`
- [ ] `Flow-NewTarget-Parse-Suggest-Normal-Desktop`（唯一主要 Story）

## 4) Section 實作待辦（Flow-first）

- [ ] `SEC-1` 對象卡片列表（最小欄位 + loading/empty/error/success）
- [ ] `SEC-2` 篩選列（keyword/tags/scoreRange + disabled/loading state）
- [ ] `SEC-3` 詳情區（主從同步規則：選取對象切換即時刷新）
- [ ] `SEC-4` 新增/編輯 Modal（focus trap、Esc 關閉、toast 成功回饋）
- [ ] `SEC-5` AI 解析（Retry、保留輸入、失敗不覆蓋上次成功資料）
- [ ] `SEC-6` 今日建議（<50 disabled、成功 auto-copy fallback、Retry）

## 6) UX Fix Log

- [x] 修正 `SEC-4` 新增對象 Modal 內 `name/tags` input overflow（避免超出框線）
- [x] 補上 `SEC-2` 搜尋列互動：`keyword`、`tags`、`scoreRange` 篩選可用

## 5) 驗收標準（Must）

- [ ] 各核心區塊嚴格對齊狀態矩陣（loading / empty / error / success）
- [ ] Storybook 以 `Flow-first` 單一骨架呈現，不拆分多模板
- [ ] 不在 UI 顯示 `SEC-*` 文案
- [ ] Mobile/desktop 功能一致（版型可不同）
