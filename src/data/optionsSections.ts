/**
 * Configuration for options page navigation sections.
 * Defines section names, labels, and their corresponding component identifiers.
 */

export type SectionId = "General" | "Customize Hotkeys" | "Advanced" | "Help";

export interface OptionsSection {
  id: SectionId;
  label: string;
}

export const OPTIONS_SECTIONS: readonly OptionsSection[] = [
  { id: "General", label: "General" },
  { id: "Customize Hotkeys", label: "Customize Hotkeys" },
  { id: "Advanced", label: "Advanced" },
  { id: "Help", label: "Known Issues" },
] as const;
