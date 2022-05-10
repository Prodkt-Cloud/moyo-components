import { LitElement } from 'lit';
export default class MoyoSplitPanel extends LitElement {
    static styles: import("lit").CSSResult;
    private cachedPositionInPixels;
    private readonly localize;
    private resizeObserver;
    private size;
    divider: HTMLElement;
    position: number;
    positionInPixels: number;
    vertical: boolean;
    disabled: boolean;
    primary?: 'start' | 'end';
    snap?: string;
    snapThreshold: number;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private detectSize;
    private percentageToPixels;
    private pixelsToPercentage;
    handleDrag(event: Event): void;
    handleKeyDown(event: KeyboardEvent): void;
    handlePositionChange(): void;
    handlePositionInPixelsChange(): void;
    handleVerticalChange(): void;
    handleResize(entries: ResizeObserverEntry[]): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'moyo-split-panel': MoyoSplitPanel;
    }
}
