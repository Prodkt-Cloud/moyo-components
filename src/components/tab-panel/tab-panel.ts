import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { autoIncrement } from '../../internal/auto-increment';
import styles from './tab-panel.styles';

/**
 * @since Beta-46
 * @status stable
 *
 * @slot - The tab panel's content.
 *
 * @csspart base - The component's internal wrapper.
 *
 * @cssproperty --padding - The tab panel's padding.
 */
@customElement('moyo-tab-panel')
export default class MoyoTabPanel extends LitElement {
  static styles = styles;

  private readonly attrId = autoIncrement();
  private readonly componentId = `moyo-tab-panel-${this.attrId}`;

  /** The tab panel's name. */
  @property({ reflect: true }) name = '';

  /** When true, the tab panel will be shown. */
  @property({ type: Boolean, reflect: true }) active = false;

  connectedCallback() {
    super.connectedCallback();
    this.id = this.id.length > 0 ? this.id : this.componentId;
  }

  render() {
    this.style.display = this.active ? 'block' : 'none';

    return html`
      <div part="base" class="tab-panel" role="tabpanel" aria-hidden=${this.active ? 'false' : 'true'}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'moyo-tab-panel': MoyoTabPanel;
  }
}
