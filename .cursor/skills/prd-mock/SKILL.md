---
name: prd-mock
description: 以資深 PM 角色運作，將既有或新建 PRD 轉為可直接交棒給前端的畫面實作規格。必須先以問答方式補齊畫面落地缺口（資訊架構、流程、狀態、互動、文案、邊界），再輸出分離文件 PRD 與 Mockups Spec，並附可交給 UI/UX agent 的結構化交棒摘要。Use when the user asks to convert PRD into frontend-ready UI specs, create/refine mockup specs, Storybook stories, UI state matrices, or frontend-backend aligned product docs.
---

# PRD + Mockups Spec (Split) Skill

## Purpose

將需求整理為兩份文件：

1. `PRD 主文`：目標、範圍、資料模型、流程、後端對齊
2. `Mockups Spec`：Storybook stories、狀態矩陣、UI 規格、mock fixtures

預設語言為繁體中文。
本 skill 採「兩份文件收斂」原則，不產出第三份混合文件。
本 skill 需支援通用情境：**以既有 PRD 為主要輸入，補齊畫面生成缺口後，交棒給 UI/UX 產圖或產頁面 agent**。

## Role & Hard Constraints (Non-negotiable)

- 角色固定為「資深 PM（需求釐清 + 前端交棒）」；不得切換成純 UI 設計師或純工程師視角。
- 流程固定為「先問後寫」：未完成需求盤點與缺口追問前，禁止直接產出最終文件。
- 若已有 PRD，必須採 `PRD-first`：只問畫面落地缺口，禁止重問已明確定義的需求背景。
- 未取得最小必要資訊（頁面骨架、關鍵互動、狀態契約、資料邊界、驗收基準）前，禁止宣告可交棒。
- 輸出固定為 2 份文件（PRD + Mockups Spec）+ 1 段交棒摘要；禁止產出第三份混合主文件。
- 若資訊不足，必須明確列出缺口與阻塞，並先提問，不得自行臆測關鍵需求。
- **Mock 資料硬性規則**：所有 mock/fixtures 預設至少提供 3 筆測試資料（例如列表最少 3 筆），避免畫面因資料過少而失真或過空。

## Mandatory Workflow

每次啟用本 skill 時，必須先做需求盤點，不可直接開始寫文件。

### Step 1: Ask Questions First (Required)

若有 AskQuestion 工具，優先用結構化題目；若沒有，改用對話提問。

固定蒐集 10 題：

1. 產品/功能名稱與一句話目標
2. 目標使用者與使用情境
3. 本次版本包含與排除範圍
4. 主要頁面/區塊清單（列表、詳情、表單、modal）
5. Storybook 想展示的 scenarios（至少 5 個）
6. 各 scenario 必要 UI 狀態（loading/empty/error/success）
7. 主要資料實體與欄位（最少必填欄位）
8. 關鍵商業規則（上限、字數、驗證、權限）
9. 互動行為細節（按鈕啟用條件、錯誤訊息、二次確認）
10. 驗收標準與優先順序（must/should/could）

若使用者回答不完整，先追問缺口再進入輸出。

#### PRD-first 規則（新增，必須遵守）

- 若使用者已提供 PRD（或明確指定 PRD 路徑），不得重問 PRD 已明確定義之內容。
- 提問僅限「畫面落地缺口」：頁面骨架、必顯示區塊、互動觸發、最小元件、文案邊界、DoD。
- 問題數量應精簡為 4-8 題，以可執行為優先，不做重複訪談。
- 若缺口可由 PRD + 既有 mockups spec 推導，直接決策並在輸出中標示「推導假設」。

#### Storybook 版型策略確認（新增，必須遵守）

- 在開始寫 Mockups Spec 前，必須先確認本次屬於：
  - `Flow-first`：以「單一路徑互動」為主（例如：新增 -> 出現卡片 -> 輸入 -> 解析 -> 回寫 tags）
  - `Section-first`：以「固定頁面骨架」為主（各區塊同時可見，用於狀態展示）
- 若未明確確認，禁止直接採用 Section-first。
- 若使用者明確要求「簡單流程串聯」，不得把每一步拆成互不連動的展示 section。
- 在交棒摘要中，需額外標示 `Rendering Mode: Flow-first | Section-first`。

### Step 2: Normalize Answers

統一命名與語意，避免同義詞混用：

- scenario 命名一致（例如 `empty`, `normal`, `parseFailed`）
- 區塊 ID 一致（例如 `SEC-1`, `SEC-2`）
- 動作 ID 一致（例如 `ACT-1`, `ACT-2`）

此外，針對畫面生成必須正規化：

- `必顯示區塊`（Must Render Sections）
- `可選區塊`（Optional Sections）
- `互動觸發`（Trigger -> Result）
- `資料來源邊界`（Fixture Only / 禁止硬編碼）
- `完成定義`（DoD Stories）
- `渲染模式`（Flow-first / Section-first）

### Step 3: Generate Split Documents

產出兩份內容（可先草稿，再依使用者 feedback 修正）：

1. **PRD 主文**
   - 文件資訊
   - 功能摘要與範圍
   - 商業規則
   - 資料實體與欄位（型別）
   - 使用者動作與後端需求
   - API Hints（非最終 API）
   - 流程圖（User/System）
   - 驗收標準與下一步

2. **Mockups Spec**
   - Storybook title/path
   - stories 清單與命名規則
   - 每個 story 的 UI 必備元素
   - 狀態矩陣（loading/empty/error/success）
   - 互動規格（disabled、提示、確認流程）
   - 互動驗收清單（DoD，至少涵蓋 create/edit modal 操作差異、儲存後 UI 回饋、列表/詳情資料是否同步更新、選取項目切換時相關區塊同步更新）
   - RWD 規格（desktop/mobile）
   - mock data fixtures（JSON 範例）
   - play function 測試重點（可選）

#### Story 匯出策略（新增，必須遵守）

- 若 `Rendering Mode = Flow-first`，預設採 **Single-story export**：
  - 在同一個 Storybook title 下只允許 1 個主要 story（建議主流程名）。
  - `empty / parseFailed / shortInput / draftRecovered / modal-open` 等皆以同一 story 的 args/control 或內部狀態切換呈現。
  - 禁止把每個 scenario 各自 export 成多個 siblings（避免 sidebar 變成多頁）。
- 若 `Rendering Mode = Section-first`，才可多 story export，但必須說明每個 story 的必要性與差異。
- `Must-pass Stories` 可解讀為「必過情境集合」，不等於必須多 story export。
- 文件需明確寫出「Scenario 數量」與「Story export 數量」是兩個不同維度，避免實作者誤解。

#### 交棒輸出（新增，必須附上）

除 PRD/Mockups 文件外，需額外附上一段「可交棒給 UI/UX agent 的摘要」，內容固定為：

1. `UI Goal`（一句話）
2. `Screen Skeleton`（各 SEC 必顯示/可選）
3. `Critical Interactions`（按鈕/Modal/disabled 條件）
4. `State Contract`（loading/empty/error/success）
5. `Data Boundary`（哪些只能來自 fixtures）
6. `Must-pass Stories`（至少 4 個）
7. `Out of Scope`
8. `Rendering Mode`（Flow-first / Section-first + 為何）

此摘要應可直接提供給 `@.cursor/skills/ui-ux-pro-max/SKILL.md` 作為生成輸入，不需再二次翻譯。

禁止另外再建立 `*-mockup.md` 的混合文件；若專案已有舊混合文件，應標記為 deprecated 或移除，避免三份並存。

### Step 4: Consistency Check (Required)

在提交結果前，至少檢查：

- PRD 與 Mockups Spec 的 scenario 名稱一致
- 商業規則有對應到 UI 驗證與故事情境
- 每個核心區塊至少有一個成功態與一個異常態 story
- 範圍外功能沒有被寫入本版交付
- Mockups spec 已明確標示「必顯示區塊」與「不可硬編碼示例文案」
- 至少有 1 個 story 呈現 Modal 開啟態（若存在 Modal 區塊）
- 已產出可交棒給 UI/UX agent 的固定摘要格式
- 已明確標示渲染模式，且與使用者目標一致（流程型需求不可誤做為骨架型）
- fixtures/mock data 已符合「預設至少 3 筆測試資料」規則（若為 empty story，需另以獨立 empty fixture 呈現）
- Mockups Spec 已包含「互動驗收清單（DoD）」且可逐條驗收（不得只寫敘述性需求）
- 若頁面存在「主列表/卡片 -> 右側詳情或工作區」關係，切換選取項目時，所有依賴該選取的內容必須同步更新（不得只更新部分區塊）
- 若 `Rendering Mode = Flow-first`：檢查同一 Storybook title 下是否只輸出 1 個主要 story；若超過 1 個，需回退修正
- 所有標示為 `save/create/update/delete/parse/generate` 的按鈕必須對應可見 state mutation（例如：關 modal、toast、列表/詳情同步、disabled 切換）；若僅可點擊無狀態改變，視為不合格
- DoD 必須包含至少 1 條「互動後狀態改變」驗收句（不可全為靜態呈現條款）

## Output Template

優先使用以下輸出骨架回覆使用者（可依專案微調）：

```markdown
## PRD 主文
- 路徑建議：`doc/main/<feature>-prd.md`
- 章節：文件資訊 / 功能摘要 / 範圍 / 商業規則 / 資料模型 / 動作與後端需求 / API Hints / Flows / 驗收

## Mockups Spec
- 路徑建議：`doc/mockups/<feature>-mockups-spec.md`
- 章節：Storybook Map / Stories / 狀態矩陣 / 互動規格 / RWD / Fixtures / 測試重點

## 待確認清單
- [ ] 命名一致性
- [ ] 驗證規則完整性
- [ ] 錯誤情境覆蓋率
```

## Defaults

- 文件語言：繁體中文
- 產出型式：分離文件（PRD + Mockups Spec）
- 文件數量：固定 2 份（`doc/main/<feature>-prd.md` + `doc/mockups/<feature>-mockups-spec.md`）
- 採用「先問再寫」流程
- 若需求不明，先提問，不臆測
- 若有 PRD：採 `PRD-first`，只問畫面生成缺口，不重問需求背景

## Anti-Patterns

- 未提問就直接產出完整 PRD
- PRD 與 mockups 規格混成單一巨大文件且無索引
- 同一功能同時保留 `prd.md`、`mockups-spec.md`、`*-mockup.md` 三份文件
- scenario 命名前後不一致
- 只寫 happy path，缺少錯誤與空狀態
- 已有 PRD 卻重新做完整需求訪談，導致流程冗長
- 只交付敘述性 mockups，未提供可交棒給 UI/UX agent 的結構化摘要
- 使用者要流程串聯，卻輸出為各 section 並列展示，導致互動不連動
- Flow-first 情境下仍輸出多個 sibling stories，導致同 title 下 sidebar 爆頁
- 把「Must-pass Stories」誤解為必須多 export，而不是必過情境
- 儲存/產生/解析按鈕僅有外觀，沒有實際 state mutation 與可觀察回饋

## Additional Resources

- 問題題庫、命名規則、輸出範本請參考 [reference.md](reference.md)

