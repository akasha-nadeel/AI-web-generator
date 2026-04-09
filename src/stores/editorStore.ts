import { create } from "zustand";
import { SiteJSON, ThemeConfig } from "@/lib/components/types";

interface EditorState {
  siteId: string | null;
  siteName: string;
  siteJson: SiteJSON | null;
  currentPageIndex: number;
  previewDevice: "desktop" | "tablet" | "mobile";
  isDirty: boolean;
  isSaving: boolean;
  undoStack: SiteJSON[];
  redoStack: SiteJSON[];

  setSiteId: (id: string) => void;
  setSiteName: (name: string) => void;
  setSiteJson: (json: SiteJSON) => void;
  updateSiteJson: (json: SiteJSON) => void;
  setCurrentPageIndex: (index: number) => void;
  setPreviewDevice: (device: "desktop" | "tablet" | "mobile") => void;
  setIsSaving: (saving: boolean) => void;
  undo: () => void;
  redo: () => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  updateSectionContent: (
    pageIndex: number,
    sectionIndex: number,
    content: Record<string, unknown>
  ) => void;
  removeSection: (pageIndex: number, sectionIndex: number) => void;
  addSection: (
    pageIndex: number,
    afterIndex: number,
    componentId: string,
    content: Record<string, unknown>
  ) => void;
  moveSection: (pageIndex: number, fromIndex: number, toIndex: number) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  siteId: null,
  siteName: "",
  siteJson: null,
  currentPageIndex: 0,
  previewDevice: "desktop",
  isDirty: false,
  isSaving: false,
  undoStack: [],
  redoStack: [],

  setSiteId: (id) => set({ siteId: id }),
  setSiteName: (name) => set({ siteName: name }),

  setSiteJson: (json) => set({ siteJson: json, isDirty: false }),

  updateSiteJson: (json) => {
    const current = get().siteJson;
    set((state) => ({
      siteJson: json,
      isDirty: true,
      undoStack: current
        ? [...state.undoStack.slice(-19), current]
        : state.undoStack,
      redoStack: [],
    }));
  },

  setCurrentPageIndex: (index) => set({ currentPageIndex: index }),
  setPreviewDevice: (device) => set({ previewDevice: device }),
  setIsSaving: (saving) => set({ isSaving: saving, isDirty: saving ? get().isDirty : false }),

  undo: () => {
    const { undoStack, siteJson } = get();
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    set({
      siteJson: previous,
      undoStack: undoStack.slice(0, -1),
      redoStack: siteJson ? [siteJson, ...get().redoStack] : get().redoStack,
      isDirty: true,
    });
  },

  redo: () => {
    const { redoStack, siteJson } = get();
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    set({
      siteJson: next,
      redoStack: redoStack.slice(1),
      undoStack: siteJson ? [...get().undoStack, siteJson] : get().undoStack,
      isDirty: true,
    });
  },

  updateTheme: (themeUpdate) => {
    const { siteJson } = get();
    if (!siteJson) return;
    const updated = {
      ...siteJson,
      theme: { ...siteJson.theme, ...themeUpdate },
    };
    get().updateSiteJson(updated);
  },

  updateSectionContent: (pageIndex, sectionIndex, content) => {
    const { siteJson } = get();
    if (!siteJson) return;
    const updated = structuredClone(siteJson);
    updated.pages[pageIndex].sections[sectionIndex].content = content;
    get().updateSiteJson(updated);
  },

  removeSection: (pageIndex, sectionIndex) => {
    const { siteJson } = get();
    if (!siteJson) return;
    const updated = structuredClone(siteJson);
    updated.pages[pageIndex].sections.splice(sectionIndex, 1);
    get().updateSiteJson(updated);
  },

  addSection: (pageIndex, afterIndex, componentId, content) => {
    const { siteJson } = get();
    if (!siteJson) return;
    const updated = structuredClone(siteJson);
    updated.pages[pageIndex].sections.splice(afterIndex + 1, 0, {
      componentId,
      content,
    });
    get().updateSiteJson(updated);
  },

  moveSection: (pageIndex, fromIndex, toIndex) => {
    const { siteJson } = get();
    if (!siteJson) return;
    const updated = structuredClone(siteJson);
    const sections = updated.pages[pageIndex].sections;
    const [moved] = sections.splice(fromIndex, 1);
    sections.splice(toIndex, 0, moved);
    get().updateSiteJson(updated);
  },
}));
