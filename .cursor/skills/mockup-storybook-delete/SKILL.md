---
name: mockup-storybook-delete
description: 根據指定的 mockups md 檔，直接刪除對應 Storybook stories 檔。Use when the user asks to remove a mockup spec and also delete its matching Storybook file with CLI delete commands.
---

# Mockup Storybook Delete

## Goal

選擇一個 `doc/mockups/*.md` 後，連帶刪除對應的 `storybook/src/stories/**/*.stories.*` 檔案。

## Rules

- 只處理刪除，不負責建立或改寫 story。
- 優先用 CLI delete（Delete 工具）；不要只回覆「請刪除該檔案」。
- 找到對應 story 後直接刪，且回報結果。

## Quick Flow

1. 讀取使用者指定 mockup 檔。
2. 取出 `Stories 路徑`。
3. 直接 CLI delete 該 story 檔（找不到才報錯）。
4. 回報：`deleted` 或 `not found`。

## Commands

```bash
# fallback only
rm -f "storybook/src/stories/mockups/personal-crm/DatingTargetRecord.stories.tsx"
```

## Notes

- mockup 沒有 `Stories 路徑` 時，才用檔名關鍵字找候選 `*.stories.*`。
- 候選超過 1 個時先請使用者選擇，不要猜。
