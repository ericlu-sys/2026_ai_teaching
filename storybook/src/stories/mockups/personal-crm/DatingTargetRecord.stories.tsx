import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState } from 'react';

type Scenario = 'normal' | 'empty' | 'parseFailed' | 'shortInput' | 'draftRecovered' | 'modal-open';
type Device = 'desktop' | 'mobile';

type Target = {
  id: string;
  name: string;
  tags: string[];
  dateCount: number;
  averageScore?: number;
  updatedAt: string;
  summary: string;
};

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

const baseTargets: Target[] = [
  {
    id: 't-1',
    name: '小晴',
    tags: ['攝影', '咖啡', '展覽'],
    dateCount: 2,
    averageScore: 4.5,
    updatedAt: '2026-04-22',
    summary: '偏好安靜咖啡廳與展覽行程，對時間安排有彈性需求。',
  },
  {
    id: 't-2',
    name: 'Mina',
    tags: ['電影', '甜點'],
    dateCount: 1,
    averageScore: 4,
    updatedAt: '2026-04-20',
    summary: '喜歡輕鬆聊天與電影，初次互動反應正向。',
  },
];

const buttonBaseStyle = {
  minHeight: 44,
  minWidth: 44,
  borderRadius: 12,
  border: '1px solid transparent',
  padding: '10px 14px',
  fontWeight: 700,
  fontSize: 14,
  cursor: 'pointer',
  transition: 'all 160ms ease-out',
} as const;

function buttonStyle(variant: ButtonVariant, disabled = false) {
  if (disabled) {
    return {
      ...buttonBaseStyle,
      background: '#f1f5f9',
      color: '#94a3b8',
      borderColor: '#e2e8f0',
      cursor: 'not-allowed',
      boxShadow: 'none',
    };
  }
  if (variant === 'primary') {
    return {
      ...buttonBaseStyle,
      background: 'linear-gradient(135deg, #ff5fa2 0%, #ff7f66 100%)',
      color: '#ffffff',
      boxShadow: '0 10px 20px rgba(255, 95, 162, 0.28)',
    };
  }
  if (variant === 'danger') {
    return {
      ...buttonBaseStyle,
      background: '#fff1f2',
      color: '#be123c',
      borderColor: '#fecdd3',
      boxShadow: '0 6px 12px rgba(244, 63, 94, 0.12)',
    };
  }
  if (variant === 'ghost') {
    return {
      ...buttonBaseStyle,
      background: 'transparent',
      color: '#be185d',
      borderColor: '#f9a8d4',
    };
  }
  return {
    ...buttonBaseStyle,
    background: '#ffffff',
    color: '#be185d',
    borderColor: '#f9a8d4',
    boxShadow: '0 6px 12px rgba(236, 72, 153, 0.08)',
  };
}

function initialScenarioState(scenario: Scenario) {
  const shortInputText = '週末想見面';
  const longInputText =
    '我們週末都想安排一段舒服又不趕行程的約會，希望先逛展再去安靜咖啡店，最後預留散步和彈性休息時間。';

  if (scenario === 'empty') {
    return {
      targets: [] as Target[],
      selectedTargetId: '',
      parseInput: '',
      parseError: '',
      suggestionInput: '',
      suggestionList: [] as string[],
      draftRecovered: false,
      modalOpen: false,
      toast: '',
    };
  }

  if (scenario === 'parseFailed') {
    return {
      targets: baseTargets,
      selectedTargetId: 't-1',
      parseInput: '她最近比較忙，喜歡提早約好時間。',
      parseError: 'E_PARSE_001：解析失敗，請提供可辨識對話內容',
      suggestionInput: longInputText,
      suggestionList: ['先確認這週可行時段，再安排展覽 + 咖啡雙段式行程。'],
      draftRecovered: false,
      modalOpen: false,
      toast: '',
    };
  }

  if (scenario === 'shortInput') {
    return {
      targets: baseTargets,
      selectedTargetId: 't-1',
      parseInput: '',
      parseError: '',
      suggestionInput: shortInputText,
      suggestionList: [],
      draftRecovered: false,
      modalOpen: false,
      toast: '',
    };
  }

  if (scenario === 'draftRecovered') {
    return {
      targets: baseTargets,
      selectedTargetId: 't-1',
      parseInput: '草稿：她提到周日比較方便，偏好安靜行程。',
      parseError: '',
      suggestionInput: longInputText,
      suggestionList: ['已從草稿回復：先確認時段，再提出兩段式約會選項。'],
      draftRecovered: true,
      modalOpen: false,
      toast: '已回復草稿',
    };
  }

  return {
    targets: baseTargets,
    selectedTargetId: 't-1',
    parseInput: '',
    parseError: '',
    suggestionInput: longInputText,
    suggestionList: ['先確認展覽時間，再安排晚餐，保留 30 分鐘彈性時間。'],
    draftRecovered: false,
    modalOpen: scenario === 'modal-open',
    toast: '',
  };
}

function DatingTargetRecordPage({ scenario, device }: { scenario: Scenario; device: Device }) {
  const seeded = useMemo(() => initialScenarioState(scenario), [scenario]);
  const [state, setState] = useState(seeded);
  const [keyword, setKeyword] = useState('');
  const [tagsFilter, setTagsFilter] = useState('');
  const [scoreRange, setScoreRange] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setState(seeded);
    setKeyword('');
    setTagsFilter('');
    setScoreRange('');
  }, [seeded]);

  const filteredTargets = useMemo(() => {
    const keywordText = keyword.trim().toLowerCase();
    const tagTokens = tagsFilter
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
    const [minScoreRaw, maxScoreRaw] = scoreRange.split('-').map((item) => item.trim());
    const minScore = Number(minScoreRaw);
    const maxScore = Number(maxScoreRaw);
    const hasScoreRange = scoreRange.trim().length > 0 && !Number.isNaN(minScore) && !Number.isNaN(maxScore);

    return state.targets.filter((target) => {
      if (keywordText) {
        const haystack = `${target.name} ${target.summary} ${target.tags.join(' ')}`.toLowerCase();
        if (!haystack.includes(keywordText)) return false;
      }

      if (tagTokens.length > 0) {
        const lowerTags = target.tags.map((tag) => tag.toLowerCase());
        if (!tagTokens.every((token) => lowerTags.includes(token))) return false;
      }

      if (hasScoreRange) {
        const score = target.averageScore ?? 0;
        if (score < minScore || score > maxScore) return false;
      }

      return true;
    });
  }, [keyword, scoreRange, state.targets, tagsFilter]);

  const selected = useMemo(
    () => filteredTargets.find((t) => t.id === state.selectedTargetId) ?? filteredTargets[0],
    [filteredTargets, state.selectedTargetId],
  );
  const isShortSuggestion = state.suggestionInput.trim().length < 50;
  const canGenerate = !isShortSuggestion && !generating;

  const openModalForCreate = () => {
    setNameInput('');
    setTagInput('');
    setState((prev) => ({ ...prev, modalOpen: true }));
  };

  const handleSave = () => {
    if (!nameInput.trim()) {
      setState((prev) => ({ ...prev, toast: 'E_FORM_001：名稱為必填欄位' }));
      return;
    }
    setSaving(true);
    setTimeout(() => {
      const newTarget: Target = {
        id: `t-${Date.now()}`,
        name: nameInput.trim(),
        tags: tagInput.split(',').map((item) => item.trim()).filter(Boolean),
        dateCount: 0,
        updatedAt: '2026-04-24',
        summary: '新建立對象，尚未完成 AI 解析。',
      };
      setState((prev) => ({
        ...prev,
        modalOpen: false,
        targets: [newTarget, ...prev.targets],
        selectedTargetId: newTarget.id,
        toast: '新增成功',
      }));
      setSaving(false);
    }, 400);
  };

  const handleParse = () => {
    setParsing(true);
    setState((prev) => ({ ...prev, parseError: '' }));
    setTimeout(() => {
      if (scenario === 'parseFailed') {
        setState((prev) => ({ ...prev, parseError: 'E_PARSE_001：解析失敗，請提供可辨識對話內容' }));
        setParsing(false);
        return;
      }
      setState((prev) => ({
        ...prev,
        toast: '解析完成，摘要已更新',
        targets: prev.targets.map((target) =>
          target.id === prev.selectedTargetId
            ? { ...target, tags: ['穩定互動', '喜歡展覽', '時間敏感'], summary: '最近互動偏正向，建議提前確認時段。' }
            : target,
        ),
      }));
      setParsing(false);
    }, 500);
  };

  const handleGenerate = () => {
    if (!canGenerate) return;
    setGenerating(true);
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        suggestionList: ['先確認可行時段，再提「展覽 + 咖啡」兩段式安排。', '尾段預留彈性休息，避免節奏過滿。'],
        toast: '建議已產生，已嘗試自動複製',
      }));
      setGenerating(false);
    }, 600);
  };

  const layoutStyle =
    device === 'desktop'
      ? { display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }
      : { display: 'grid', gridTemplateColumns: '1fr', gap: 12 };

  return (
    <div
      style={{
        ['--color-primary' as string]: '#E11D48',
        ['--color-secondary' as string]: '#FB7185',
        ['--color-accent' as string]: '#EA580C',
        ['--color-bg' as string]: '#FFF1F2',
        ['--color-foreground' as string]: '#881337',
        ['--color-border' as string]: '#FECDD3',
        ['--color-muted' as string]: '#F0ECF2',
        padding: 20,
        fontFamily: '"DM Sans", "Noto Sans TC", "PingFang TC", sans-serif',
        background: 'radial-gradient(circle at 0% 0%, var(--color-bg) 0%, #fff8f9 45%, #fff 100%)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Nunito:wght@700;800;900&display=swap');
        *, *::before, *::after {
          box-sizing: border-box;
        }
        .playful-heading {
          font-family: "Nunito", "Noto Sans TC", sans-serif;
          color: var(--color-foreground);
          letter-spacing: 0.2px;
        }
        .ui-btn {
          cursor: pointer;
        }
        .ui-btn:hover {
          transform: translateY(-1px);
          filter: saturate(1.08);
        }
        .ui-btn:active {
          transform: translateY(0);
        }
        .ui-btn:focus-visible {
          outline: 3px solid var(--color-primary);
          outline-offset: 2px;
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
        <h2 className="playful-heading" style={{ margin: 0 }}>Dating Target Record</h2>
        <button className="ui-btn" onClick={openModalForCreate} style={buttonStyle('primary')}>新增對象</button>
      </div>

      {state.toast ? <div role="alert" aria-live="polite" style={{ marginBottom: 12, color: '#7a2457' }}>{state.toast}</div> : null}
      {state.draftRecovered ? <div style={{ marginBottom: 12, color: '#3a3a3a' }}>已回復草稿，可繼續編輯或清空。</div> : null}

      <div style={{ marginBottom: 12, display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr' }}>
        <input
          placeholder="關鍵字"
          aria-label="keyword filter"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ borderRadius: 10, border: '1px solid #fbcfe8', minHeight: 38, padding: '0 10px' }}
        />
        <input
          placeholder="tags（逗號分隔）"
          aria-label="tags filter"
          value={tagsFilter}
          onChange={(e) => setTagsFilter(e.target.value)}
          style={{ borderRadius: 10, border: '1px solid #fbcfe8', minHeight: 38, padding: '0 10px' }}
        />
        <input
          placeholder="score range（例如 4-5）"
          aria-label="score range filter"
          value={scoreRange}
          onChange={(e) => setScoreRange(e.target.value)}
          style={{ borderRadius: 10, border: '1px solid #fbcfe8', minHeight: 38, padding: '0 10px' }}
        />
      </div>

      <div style={layoutStyle}>
        <section style={{ border: '1px solid var(--color-border)', borderRadius: 16, padding: 12, background: '#ffffffd9', boxShadow: '0 14px 30px rgba(236, 72, 153, 0.08)' }}>
          <h3>對象列表</h3>
          {filteredTargets.length === 0 ? (
            <div>
              <p>{state.targets.length === 0 ? '尚未建立對象' : '目前篩選條件下沒有結果'}</p>
              <button className="ui-btn" onClick={openModalForCreate} style={buttonStyle('primary')}>新增第一位對象</button>
            </div>
          ) : (
            filteredTargets.map((target) => (
              <button
                key={target.id}
                onClick={() => setState((prev) => ({ ...prev, selectedTargetId: target.id }))}
                className="ui-btn"
                style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: 8, borderRadius: 12, border: target.id === state.selectedTargetId ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', background: target.id === state.selectedTargetId ? 'var(--color-bg)' : '#fff', padding: 10, minHeight: 44, boxShadow: target.id === state.selectedTargetId ? '0 8px 20px rgba(236, 72, 153, 0.14)' : 'none' }}
              >
                <strong>{target.name}</strong>
                <div>tags: {target.tags.join(', ') || '-'}</div>
                <div>dateCount: {target.dateCount}</div>
                <div>averageScore: {target.averageScore ?? '-'}</div>
                <div>updatedAt: {target.updatedAt}</div>
              </button>
            ))
          )}
        </section>

        <section style={{ border: '1px solid var(--color-border)', borderRadius: 16, padding: 12, background: '#ffffffd9', boxShadow: '0 14px 30px rgba(236, 72, 153, 0.08)' }}>
          <h3>詳情與互動</h3>
          {selected ? <div><p><strong>{selected.name}</strong></p><p>AI 摘要：{selected.summary}</p><p>標籤：{selected.tags.join(', ')}</p></div> : <p>尚未選取對象</p>}
          <hr />
          <h4>貼文解析</h4>
          <textarea aria-label="parse input" value={state.parseInput} onChange={(e) => setState((prev) => ({ ...prev, parseInput: e.target.value }))} style={{ width: '100%', minHeight: 84, borderRadius: 12, border: '1px solid #f9a8d4', padding: 10 }} />
          <div><button className="ui-btn" disabled={parsing} onClick={handleParse} style={buttonStyle('secondary', parsing)}>{parsing ? '解析中...' : '解析'}</button></div>
          {state.parseError ? <div role="alert" aria-live="polite" style={{ color: '#b00020' }}>{state.parseError} <button className="ui-btn" onClick={handleParse} disabled={parsing} style={{ ...buttonStyle('ghost', parsing), marginLeft: 8 }}>Retry</button></div> : null}
          <hr />
          <h4>今日建議</h4>
          <textarea aria-label="suggestion input" value={state.suggestionInput} onChange={(e) => setState((prev) => ({ ...prev, suggestionInput: e.target.value }))} style={{ width: '100%', minHeight: 84, borderRadius: 12, border: '1px solid #f9a8d4', padding: 10 }} />
          <div>字數：{state.suggestionInput.trim().length}</div>
          {isShortSuggestion ? <div role="alert" aria-live="polite" style={{ color: '#b00020' }}>字數不足，請至少輸入 50 字</div> : null}
          <button className="ui-btn" disabled={!canGenerate} onClick={handleGenerate} style={buttonStyle('primary', !canGenerate)}>{generating ? '產生中...' : '產生建議'}</button>
          {state.suggestionList.length > 0 ? <ul>{state.suggestionList.map((item) => <li key={item}>{item}</li>)}</ul> : null}
          {state.suggestionList.length > 0 ? <button className="ui-btn" onClick={() => setState((prev) => ({ ...prev, toast: '已手動複製' }))} style={buttonStyle('secondary')}>手動複製</button> : null}
        </section>
      </div>

      {state.modalOpen ? (
        <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'grid', placeItems: 'center', padding: 16 }}>
          <div style={{ background: 'white', width: 'min(480px, 100%)', borderRadius: 16, padding: 16, border: '1px solid #fbcfe8', boxShadow: '0 20px 50px rgba(190, 24, 93, 0.2)' }}>
            <h3>新增對象</h3>
            <label htmlFor="target-name">名稱</label>
            <input id="target-name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} style={{ width: '100%', marginBottom: 8, borderRadius: 10, border: '1px solid #f9a8d4', minHeight: 36, padding: '0 10px', boxSizing: 'border-box' }} />
            <label htmlFor="target-tags">標籤（逗號分隔）</label>
            <input id="target-tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} style={{ width: '100%', marginBottom: 12, borderRadius: 10, border: '1px solid #f9a8d4', minHeight: 36, padding: '0 10px', boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="ui-btn" onClick={() => setState((prev) => ({ ...prev, modalOpen: false }))} style={buttonStyle('secondary')}>取消</button>
              <button className="ui-btn" onClick={handleSave} disabled={saving} style={buttonStyle('primary', saving)}>{saving ? '儲存中...' : '儲存'}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const meta = {
  title: 'Mockups/PersonalCRM/DatingTargetRecord',
  component: DatingTargetRecordPage,
  tags: ['autodocs'],
  argTypes: {
    scenario: { control: 'select', options: ['normal', 'empty', 'parseFailed', 'shortInput', 'draftRecovered', 'modal-open'] },
    device: { control: 'inline-radio', options: ['desktop', 'mobile'] },
  },
  args: { scenario: 'normal', device: 'desktop' },
} satisfies Meta<typeof DatingTargetRecordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FlowNewTargetParseSuggestNormalDesktop: Story = {
  name: 'Flow-NewTarget-Parse-Suggest-Normal-Desktop',
  render: (args) => <DatingTargetRecordPage {...args} />,
};
