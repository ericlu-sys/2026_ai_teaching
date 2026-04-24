# 約會對象紀錄系統 Mockups Spec

> 本文件專注 Storybook 與畫面規格。  
> PRD 主文請見：`doc/main/dating-target-record-prd.md`

---

## 1. Storybook Map

- **Storybook 標題**：`Mockups/PersonalCRM/DatingTargetRecord`
- **Stories 路徑**：`storybook/src/stories/mockups/personal-crm/DatingTargetRecord.stories.ts`
- **Storybook 連結**：`https://storybook.wport.me/?path=/docs/mockups-personal-crm-datingtargetrecord--docs`
- **Route 建議**：`/dating-targets`
- **Device controls**：`desktop | mobile`

---

## 1.1 交付型態（避免 AI 誤解）

- 本規格採 `Flow-first`：優先展示「新增對象 -> 貼文解析 -> 產生今日建議」串聯路徑。
- 首要交付是可連續互動的單一路徑，不將每一步拆成互不連動的展示 section。
- **硬性規則**：所有 `*-Desktop` stories 必須共用「同一個頁面骨架」，僅允許資料狀態與互動狀態不同；禁止做成多頁或多模板。
- **硬性規則**：`SEC-1`～`SEC-6` 僅供規格引用與開發溝通，禁止作為最終 UI 顯示文案（畫面不可出現「SEC-*」字樣）。
- 必顯示區塊：`SEC-1`、`SEC-3`（依最新決策，主流程穩定呈現列表與詳情雙核心）。
- 可選區塊（限部分 stories）：`SEC-2`、`SEC-4`、`SEC-5`、`SEC-6`。
- `SEC-4 新增/編輯 Modal` 為必要互動層：平時可關閉，但必須有可見觸發入口，且至少一個 story 呈現開啟狀態。
- 若故事名稱含 `Parse-*` 或 `Suggestion-*`，`SEC-5`/`SEC-6` 對應輸入區與按鈕不可省略。

### 1.2 Storybook 匯出策略（防止 sidebar 爆頁）

- **單一匯出規則（Hard Rule）**：`Mockups/PersonalCRM/DatingTargetRecord` 只允許 1 個主要 story export（建議 `Flow-NewTarget-Parse-Suggest-Normal-Desktop`）。
- 其餘情境（`empty` / `parseFailed` / `shortInput` / `draftRecovered` / `modal-open`）必須作為**同一 story 內的狀態切換**（args/control 或內部切換器），不得再各自新增 story export。
- 若需要 mobile 檢視，優先使用 Storybook viewport/device controls；除非使用者明確要求，禁止額外建立 `*-Mobile` story。
- 驗收以「單頁互動完整性」優先，不以「story 數量完整性」作為優先目標。
- 任何新增 story export 都必須先說明必要性；若無必要性，視為不合格交付。

---

## 2. Scenario 命名規範（統一）

固定使用：

- `empty`
- `normal`
- `parseFailed`
- `shortInput`
- `draftRecovered`

禁止同時混用：

- `hasData`（改用 `normal`）
- `suggestionTooShort`（改用 `shortInput`）
- `suggestionReady`（改用 `normal`）

---

## 3. Stories 清單（Flow-first）

- `Flow-NewTarget-Parse-Suggest-Normal-Desktop`（唯一主要 story）
- 其他情境以同一 story 內狀態切換呈現：`empty`、`parseFailed`、`shortInput`、`draftRecovered`、`modal-open`

---

## 4. 每個 Story 的 UI 必備元素

### 4.0 全域最小呈現規格（本版定案）

- `SEC-1` 對象卡片最小欄位固定顯示：`name`、`tags`、`dateCount`、`updatedAt`
- `SEC-2` 預設開啟完整篩選：`keyword` + `tags` + `scoreRange`
- `SEC-4` 表單驗證失敗提示以 `toast` 為主（不強制欄位 inline）
- `ACT-3` 刪除確認本版採一般提醒（soft），保留未來升級為強提醒版本
- `SEC-6` 建議產生成功後預設嘗試自動複製（若權限允許），失敗時保留手動複製按鈕
- 系統錯誤訊息採「錯誤碼 + 人類可讀文案」格式（例如：`E_PARSE_001：解析失敗，請改貼可辨識內容`）
- `ACT-1/ACT-2`（SEC-4）儲存成功後最低可見回饋為：顯示成功 Toast（其餘 UI 更新可依實作階段逐步補齊）

### 4.1 List-Empty-Desktop

- 顯示 SEC-1 卡片區空態文案：「尚未建立對象」
- 顯示 CTA：「新增第一位對象」
- SEC-2 搜尋/篩選列可見（但無資料結果）

### 4.2 Detail-Normal-Desktop

- SEC-1 有至少 1 張對象卡片
- SEC-3 顯示 AI 摘要、歷史紀錄、評分資訊
- SEC-4 觸發按鈕可見（例如「新增對象」「編輯」）
- SEC-5 顯示可解析輸入區與既有解析結果
- SEC-6 顯示可輸入情境欄位、產生按鈕、建議清單與複製按鈕

### 4.3 Parse-ParseFailed-Desktop

- SEC-5 顯示解析失敗錯誤提示
- 解析按鈕於 loading 結束後恢復可點
- 若有上一版成功結果，應保留並標示本次失敗

### 4.4 Suggestion-ShortInput-Desktop

- SEC-6 輸入字數 < 50
- 「產生建議」按鈕 disabled
- 顯示字數不足提示文案

### 4.5 Draft-DraftRecovered-Desktop

- 顯示「已回復草稿」提示
- 草稿內容自動填入 SEC-4/SEC-5/SEC-6 對應欄位

### 4.6 Mobile 版本

- `List-Empty-Mobile`、`Detail-Normal-Mobile` 內容與桌機一致
- 版型採「列表 + 抽屜式詳情（drawer detail）」；Modal 全寬

### 4.7 Flow-NewTarget-Parse-Suggest-Normal-Desktop

- Step 1：先開啟 `SEC-4` 建立對象，儲存成功後在 `SEC-1` 出現新卡片
- Step 2：切到 `SEC-5` 貼上文字並觸發解析，成功後更新 `SEC-3` 摘要/標籤
- Step 3：於 `SEC-6` 輸入 >= 50 字情境，產生建議並顯示複製入口
- 此 story 用於展示主流程串聯，不可拆成三個互不關聯的純靜態畫面

---

## 5. 狀態矩陣（UI State Matrix）

| 區塊 | loading | empty | error | success |
|------|---------|-------|-------|---------|
| SEC-1 對象卡片列表 | 載入骨架 | 無對象文案+CTA | 列表讀取失敗提示 | 顯示卡片列表 |
| SEC-2 篩選搜尋列 | 控制項 disabled | 可顯示無結果 | 查詢錯誤提示 | 正常篩選 |
| SEC-3 對象詳情區 | 詳情 skeleton | 尚無互動紀錄 | 詳情讀取失敗 | 摘要與歷史顯示 |
| SEC-4 新增/編輯 Modal | 儲存中 disabled | 預設空表單 | 驗證失敗提示 | 建立/更新成功提示（至少一個 story 呈現開啟態） |
| SEC-5 AI 解析區 | 解析中 spinner | 尚無解析結果 | 解析失敗文案 | 標籤/簡介/偏好顯示 |
| SEC-6 今日建議區 | 產生中 disabled | 尚無建議 | 字數不足/產生失敗 | 建議清單與複製 |

---

## 6. 互動規格（細節）

### 6.1 解析按鈕（SEC-5）

- 點擊後立即進入 loading（按鈕 disabled + spinner）
- 成功：更新 `AITagProfile`
- 失敗：以區塊內錯誤訊息為主，並提供 `Retry` 按鈕（例如：`E_PARSE_001：解析失敗，請提供可辨識對話內容`）
- 失敗時保留本次輸入內容，並提供「直接重試」入口（不清空 textarea）
- 失敗不清空先前成功資料（若存在）
- 區塊最小 UI 必須包含：`textarea`、`解析按鈕`、`結果顯示區`

### 6.2 產生建議按鈕（SEC-6）

- 字數 < 50：按鈕 disabled
- 字數 >= 50：按鈕 enabled
- 送出期間 disabled，完成後恢復
- 成功後顯示建議清單與複製按鈕
- 成功後預設嘗試自動複製（瀏覽器權限允許時）；若失敗需提供可見 fallback 提示與手動複製入口
- 失敗：以區塊內錯誤訊息為主，並提供 `Retry` 按鈕（不以 toast 作為主要回饋）
- 區塊最小 UI 必須包含：`textarea`、`字數提示`、`產生建議按鈕`

### 6.3 刪除流程（ACT-3）

- 必須二次確認
- Modal 文案以一般提醒為主（本版不強制不可回復強警示）
- 主按鈕為「確認刪除」，次按鈕為「取消」

### 6.4 草稿回復（ACT-9）

- 重新進入頁面時自動回填
- 顯示可關閉提示條（已回復草稿）
- 使用者可清空草稿重新輸入

### 6.5 SEC-4 Modal 觸發規格（避免「看不到新增」）

- 頁面固定顯示主要 CTA：「新增對象」。
- 每張對象卡片提供次要 CTA：「編輯」。
- 點擊 CTA 後開啟同一份表單 Modal（建立/編輯依情境切換標題與預設值）。
- 需至少新增一個 story：`Modal-Create-Open-Desktop`（或等價命名）展示開啟態。

---

### 6.6 主從同步規則（依選取對象切換）

- 當使用者切換 `SEC-1` 選取對象時，`SEC-3` 的 AI 摘要與 tags 必須立即同步刷新。
- 本版最小同步契約僅要求 `AI 簡介/標籤`；互動歷史、建議歷史可依實作策略採延後更新。
- 若採延後更新，需在故事或註解標示載入中狀態，避免造成「資料未更新」誤判。

---

## 6.7 文案與資料邊界（避免範例文字直接跑到畫面）

- 文件中的說明句（例如「展覽 + 咖啡雙段式」「預留彈性休息時間」）屬於「建議結果範例」，只能出現在 `DatingPlanSuggestion.suggestions[]`。
- 不可把上述文字直接當作 `SEC-6` 預設輸入值或頁面固定文案。
- `SEC-6` 初始狀態應為空輸入或 fixture 指定內容，不可硬編碼示例結果。

---

## 7. RWD 規格

- **Desktop**：列表 + 詳情可雙欄顯示
- **Mobile**：單欄堆疊，主流程不變
- 功能一致，僅調整排版與元件尺寸

---

## 8. Mock Fixtures（JSON）

建議在 stories 內使用固定 fixture 檔：

- `fixtures/dating-target-record/empty.json`
- `fixtures/dating-target-record/normal.json`
- `fixtures/dating-target-record/parse-failed.json`
- `fixtures/dating-target-record/short-input.json`
- `fixtures/dating-target-record/draft-recovered.json`

每份 fixture 至少含：

- `targets: DatingTarget[]`
- `selectedTargetId?: string`
- `interactionLogs: InteractionLog[]`
- `aiProfile?: AITagProfile`
- `suggestion?: DatingPlanSuggestion`
- `draft?: DraftBuffer`
- `uiState`（loading/error flags）

---

## 9. Play Function 測試重點（可選）

- `shortInput`：確認按鈕 disabled 與提示文案顯示
- `parseFailed`：確認錯誤文案顯示與按鈕恢復
- `draftRecovered`：確認欄位回填與提示條可見
- `empty`：確認空狀態 CTA 可見

---

## 10. 互動驗收清單（DoD）

- [ ] 新增對象按鈕可開啟 `SEC-4` Modal，且 Modal 可正常關閉。
- [ ] `SEC-4` 儲存成功後必須同時滿足：Modal 關閉、Toast 顯示、`SEC-1/SEC-3` 資料更新（同一互動回合內可見）。
- [ ] 儲存流程不可是僅視覺靜態（例如按下按鈕無任何 state mutation）。
- [ ] `Parse-ParseFailed-Desktop` 必須呈現：輸入保留、錯誤訊息可見、可直接重試、按鈕狀態恢復。
- [ ] `Suggestion-*` 成功後必須先嘗試 auto-copy；若失敗需呈現 fallback 提示與手動複製按鈕。
- [ ] 主流程 story 中，選取對象切換後 `SEC-3` AI 摘要/標籤需同步刷新，不得停留前一筆資料。
- [ ] Mobile 採 `stepper` 導覽，仍需維持與 desktop 相同狀態契約（loading/empty/error/success）。

---

## 11. Must-pass Stories（本版定案）

- `Flow-NewTarget-Parse-Suggest-Normal-Desktop`（唯一必過 story）
- 必過狀態（在同一 story 內切換驗證）：`empty`、`parseFailed`、`shortInput`、`draftRecovered`、`modal-open`

---

## 12. UI/UX Agent 交棒摘要

1. `UI Goal`：在單一頁面完成對象管理、AI 解析與約會建議，並保障最小可用互動流程。
2. `Screen Skeleton`：
   - Must Render Sections：`SEC-1`、`SEC-3`
   - Optional Sections：`SEC-2`、`SEC-4`、`SEC-5`、`SEC-6`（`SEC-4` 可關閉但必須有可見觸發入口）
3. `Critical Interactions`：
   - `SEC-4`：儲存成功後必須同回合可見 `Modal 關閉 + Success toast + 列表/詳情同步更新`
   - `SEC-5`：解析按鈕 loading disabled；成功後同步刷新詳情摘要/標籤；失敗顯示錯誤、保留輸入並可直接重試
   - `SEC-6`：字數 < 50 disabled；成功後顯示建議清單並啟用複製；失敗以區塊內錯誤 + Retry 為主
   - `ACT-3`：二次確認刪除後移除卡片，並清空或切換詳情內容
   - `SEC-1 -> SEC-3`：切換選取對象時，所有依賴該選取的區塊需同步更新
4. `State Contract`：每個核心區塊都要覆蓋 `loading / empty / error / success`。
5. `Data Boundary`：示例建議文案只能來自 fixtures（`DatingPlanSuggestion.suggestions[]`），不可硬編碼在預設 UI 文案。
6. `Must-pass Stories`：
   - `List-Empty-Desktop`
   - `Modal-Create-Open-Desktop`
   - `Detail-Normal-Desktop`
   - `Parse-ParseFailed-Desktop`
   - `Suggestion-ShortInput-Desktop`
   - `Draft-DraftRecovered-Desktop`
   - `Flow-NewTarget-Parse-Suggest-Normal-Desktop`
7. `Out of Scope`：即時聊天串接、行動 App、推播通知、資料匯出/刪帳清除流程 UI。
8. `Rendering Mode`：`Flow-first`。原因：本版目標是先驗證「新增 -> 解析 -> 建議」一條可用路徑，且核心區塊需同頁連動。
9. `Enforcement Rules`：
   - 所有 stories 必須維持同一頁面資訊架構與主要版型，不得以「為了展示狀態」為由改成不同頁。
   - `SEC-*` 為文件索引代號，不是 UI 文案；交付畫面若出現 `SEC-*` 視為不合格。

---

## 13. UI/UX 補強規格（v1）

### 13.1 視覺風格定案

- 風格方向：`輕社交活潑（playful social）`
- 語氣：`微浪漫（romantic）`
- 密度：`平衡（balanced density）`
- 視覺原則：
  - 以可讀性優先承載互動，不做過度裝飾
  - 保留柔和色彩與輕動效，避免干擾主流程（新增 -> 解析 -> 建議）
  - 主 CTA（如「新增對象」「產生建議」）必須比次要行為更醒目

### 13.2 互動與動效 Token（全區共用）

- 按下回饋（tap/press feedback）：
  - 80~150ms 內必須出現視覺回饋（opacity/elevation/scale 擇一）
- 微互動時長：
  - enter：150~300ms
  - exit：100~220ms（退出快於進入）
- easing：
  - enter 使用 ease-out
  - exit 使用 ease-in
- loading 狀態：
  - `SEC-4`/`SEC-5`/`SEC-6` 按鈕進入 loading 時需 disabled，完成後恢復
- reduced motion：
  - 使用者啟用減少動態時，停用非必要動畫，只保留必要淡入淡出

### 13.3 Accessibility（Must-pass）

- 觸控尺寸：
  - 所有可點擊元素最小互動區 >= 44x44（mobile）
- 焦點與鍵盤：
  - `SEC-4` Modal 開啟後需 focus trap
  - 按 Esc 可關閉 Modal（若情境允許）
  - 關閉 Modal 後焦點返回原觸發按鈕（「新增對象」或「編輯」）
- 語意與宣告：
  - icon-only 按鈕必須有 `aria-label`
  - 表單錯誤與系統錯誤使用 `aria-live="polite"` 或 `role="alert"` 宣告
- 錯誤可恢復：
  - 所有錯誤文案除錯誤碼外，必須提供明確下一步（重試 / 修改輸入 / 取消）
- 對比：
  - 文字對比需滿足 WCAG AA（一般文字 >= 4.5:1）

### 13.4 RWD 與裝置驗收補充

- 建議 breakpoint：
  - mobile：<= 767
  - tablet：768~1023
  - desktop：>= 1024
- mobile `drawer detail` 導覽：
  - 左側（或上方）維持列表瀏覽，點擊項目後開啟抽屜顯示詳情
  - 不可改變狀態契約（loading/empty/error/success）
  - 抽屜內關閉/返回操作需符合 44x44 觸控規範
- 固定元素安全區：
  - 若有固定底部按鈕或提示條，不可遮擋 textarea、錯誤訊息、或複製按鈕

### 13.5 Storybook 驗收新增項目

- `Modal-Create-Open-Desktop`：
  - 驗證 opening focus、Esc 關閉、focus return
- `Parse-ParseFailed-Desktop`：
  - 驗證錯誤訊息可被輔助工具宣告，且可直接重試
- `Suggestion-ShortInput-Desktop`：
  - 驗證 disabled 原因文案可見且可讀（非僅色彩差異）
- `Detail-Normal-Mobile`：
  - 驗證 drawer 開關互動區尺寸與狀態一致性
