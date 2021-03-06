import {
  icon_button_styles_default
} from "./chunk.LLZWIWJW.js";
import {
  l as l2,
  r
} from "./chunk.LOYEL7IY.js";
import {
  o
} from "./chunk.7BXY5XRG.js";
import {
  l
} from "./chunk.R37SUKY2.js";
import {
  emit
} from "./chunk.CDTZZV7W.js";
import {
  e,
  i,
  n,
  t
} from "./chunk.72DLNKYZ.js";
import {
  s
} from "./chunk.PEQICPKO.js";
import {
  __decorateClass
} from "./chunk.ICGTMF5Z.js";

// src/components/icon-button/icon-button.ts
var MoyoIconButton = class extends s {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.label = "";
    this.disabled = false;
  }
  click() {
    this.button.click();
  }
  focus(options) {
    this.button.focus(options);
  }
  blur() {
    this.button.blur();
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "moyo-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "moyo-focus");
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? r`a` : r`button`;
    return l2`
      <${tag}
        part="base"
        class=${o({
      "icon-button": true,
      "icon-button--disabled": !isLink && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${l(isLink ? void 0 : this.disabled)}
        type=${l(isLink ? void 0 : "button")}
        href=${l(isLink ? this.href : void 0)}
        target=${l(isLink ? this.target : void 0)}
        download=${l(isLink ? this.download : void 0)}
        rel=${l(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${l(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <moyo-icon
          name=${l(this.name)}
          library=${l(this.library)}
          src=${l(this.src)}
          aria-hidden="true"
        ></moyo-icon>
      </${tag}>
    `;
  }
};
MoyoIconButton.styles = icon_button_styles_default;
__decorateClass([
  t()
], MoyoIconButton.prototype, "hasFocus", 2);
__decorateClass([
  i(".icon-button")
], MoyoIconButton.prototype, "button", 2);
__decorateClass([
  e()
], MoyoIconButton.prototype, "name", 2);
__decorateClass([
  e()
], MoyoIconButton.prototype, "library", 2);
__decorateClass([
  e()
], MoyoIconButton.prototype, "src", 2);
__decorateClass([
  e()
], MoyoIconButton.prototype, "href", 2);
__decorateClass([
  e()
], MoyoIconButton.prototype, "target", 2);
__decorateClass([
  e()
], MoyoIconButton.prototype, "download", 2);
__decorateClass([
  e()
], MoyoIconButton.prototype, "label", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], MoyoIconButton.prototype, "disabled", 2);
MoyoIconButton = __decorateClass([
  n("moyo-icon-button")
], MoyoIconButton);

export {
  MoyoIconButton
};
