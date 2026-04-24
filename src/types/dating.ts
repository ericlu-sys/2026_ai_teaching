export interface DatingTarget {
  id: string;
  name: string;
  note?: string;
  tags: string[];
  aiSummary?: string;
  dateCount: number;
  averageScore?: number;
  createdAt: string;
  updatedAt: string;
}

export type InteractionType = 'chat' | 'date';
export type InteractionScore = 1 | 2 | 3 | 4 | 5;

export interface InteractionLog {
  id: string;
  targetId: string;
  type: InteractionType;
  rawText: string;
  score?: InteractionScore;
  createdAt: string;
}

export interface AITagProfile {
  targetId: string;
  extractedHeight?: string;
  extractedAge?: string;
  extractedPreferences: string[];
  personalityTraits: string[];
  summary: string;
  sourceLogIds: string[];
  updatedAt: string;
}

export interface DatingPlanSuggestionItem {
  title: string;
  reason: string;
  caution?: string;
}

export interface DatingPlanSuggestion {
  targetId: string;
  inputContext: string;
  suggestions: DatingPlanSuggestionItem[];
  generatedAt: string;
}

export interface DraftBuffer {
  targetId?: string;
  targetForm?: {
    name?: string;
    note?: string;
    tags?: string[];
  };
  parseInput?: string;
  suggestionInput?: string;
  recoveredAt: string;
}

export interface DatingTargetRecordUIState {
  loading: {
    list: boolean;
    filters: boolean;
    detail: boolean;
    modalSaving: boolean;
    parsing: boolean;
    generatingSuggestion: boolean;
  };
  error: {
    list?: string;
    filters?: string;
    detail?: string;
    modal?: string;
    parsing?: string;
    suggestion?: string;
  };
  modal: {
    createOpen: boolean;
    editOpen: boolean;
  };
}

export interface DatingTargetRecordFixture {
  targets: DatingTarget[];
  selectedTargetId?: string;
  interactionLogs: InteractionLog[];
  aiProfile?: AITagProfile;
  suggestion?: DatingPlanSuggestion;
  draft?: DraftBuffer;
  uiState: DatingTargetRecordUIState;
}
