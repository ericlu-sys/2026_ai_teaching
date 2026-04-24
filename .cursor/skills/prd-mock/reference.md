# PRD-Mock Reference

## Document Topology Rule (Required)

同一功能只允許兩份主文件：

1. `doc/main/<feature>-prd.md`
2. `doc/mockups/<feature>-mockups-spec.md`

不要額外建立或維持第三份混合文件（例如 `doc/main/<feature>-mockup.md`）。
若專案已有混合文件，應做為過渡用途並盡快移除。

## AskQuestion 10-Question Bank

優先使用此題庫蒐集需求；除非使用者明確要求簡化，否則不要少於 10 題。

1. 功能名稱與一句話目標是什麼？
2. 主要使用者角色與使用情境是什麼？
3. 本版「包含」與「排除」範圍各是什麼？
4. 主要頁面/區塊有哪些（列表、詳情、表單、modal）？
5. Storybook 需要哪些 scenarios（至少 5 個）？
6. 每個 scenario 要展示哪些 UI 狀態（loading/empty/error/success）？
7. 主要資料實體與必填欄位是什麼？
8. 關鍵商業規則是什麼（字數、上限、驗證、權限）？
9. 互動細節是什麼（按鈕啟用條件、錯誤訊息、二次確認）？
10. 驗收標準與優先順序（must/should/could）是什麼？

## AskQuestion Option Set (Reusable)

可依情境直接重用以下選項：

- 文件語言：繁體中文 / English / 中英雙語
- 產出型式：分離文件 / 單一文件
- 裝置：desktop / mobile / both
- Storybook 範圍：Docs only / Stories only / Docs + Stories
- 驗收深度：僅畫面 / 畫面 + 互動 / 畫面 + 互動 + 測試

## Scenario Naming Rules

使用一致且可預測的命名，避免同義詞並存：

- 建議集合：`empty`, `normal`, `loading`, `parseFailed`, `shortInput`, `draftRecovered`
- 不要同時使用 `hasData` 與 `normal`
- 不要同時使用 `suggestionTooShort` 與 `shortInput`
- 所有文件（PRD、Mockups Spec、Storybook）必須同名

## Story Naming Rules

Story 名稱推薦格式：

`<Section>-<Scenario>-<Device>`

範例：

- `List-Empty-Desktop`
- `Detail-Normal-Desktop`
- `Parse-ParseFailed-Desktop`
- `Suggestion-ShortInput-Mobile`
- `Draft-DraftRecovered-Desktop`

## UI State Matrix Minimum Coverage

每個核心區塊（SEC-x）至少覆蓋：

- 1 個成功態（success/normal）
- 1 個異常態（error/failed）
- 若有資料載入，至少 1 個 loading
- 若有資料可能為空，至少 1 個 empty

## PRD Main Document Skeleton

```markdown
# <Feature> PRD

## 1. 文件資訊
## 2. 功能摘要
## 3. 範圍（包含/排除）
## 4. 商業規則
## 5. 資料實體與欄位
## 6. 畫面區塊與資料需求
## 7. 使用者動作與後端需求
## 8. API Hints（非最終 API）
## 9. Flowcharts（User/System）
## 10. 驗收標準
## 11. 下一步
```

## Mockups Spec Skeleton

```markdown
# <Feature> Mockups Spec

## 1. Storybook Map（title/path/link）
## 2. Stories 清單（含 scenario/device）
## 3. 每個 story 的 UI 必備元素
## 4. 狀態矩陣（loading/empty/error/success）
## 5. 互動規格（按鈕、提示、確認）
## 6. RWD 規格（desktop/mobile）
## 7. Mock Fixtures（JSON）
## 8. 測試重點（play function / QA checklist）
```

## Consistency Checklist

提交前快速檢查：

- [ ] PRD 與 Mockups Spec 的 scenario 名稱完全一致
- [ ] 商業規則都有對應 UI 驗證
- [ ] 每個核心區塊至少有 success + error story
- [ ] 排除範圍未混入交付內容
- [ ] fixture 欄位與型別定義一致
