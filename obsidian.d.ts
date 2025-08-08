declare module 'obsidian' {
  export abstract class Plugin {
    app: App;
    addRibbonIcon(iconId: string, title: string, callback: () => void): HTMLElement;
    addCommand(command: Command): void;
    onload(): void;
    onunload(): void;
  }

  export interface Command {
    id: string;
    name: string;
    callback: () => void;
  }

  export class Notice {
    constructor(message: string, timeout?: number);
  }

  export interface Editor {
    replaceSelection(text: string): void;
    getSelection(): string;
    getValue(): string;
    setValue(value: string): void;
  }

  export interface MarkdownView {
    editor: Editor;
    file: TFile;
  }

  export interface TFile {
    path: string;
    name: string;
    basename: string;
  }

  export interface Workspace {
    getActiveViewOfType<T>(type: new () => T): T | null;
    activeEditor?: {
      editor: Editor;
    };
  }

  export interface App {
    workspace: Workspace;
  }
}
