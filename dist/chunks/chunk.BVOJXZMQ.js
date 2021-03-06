import {
  radio_button_styles_default
} from "./chunk.SH4CS5RL.js";
import {
  FormSubmitController
} from "./chunk.N2T2IJMA.js";
import {
  l as l2
} from "./chunk.LOYEL7IY.js";
import {
  HasSlotController
} from "./chunk.UHGCFDN7.js";
import {
  o
} from "./chunk.7BXY5XRG.js";
import {
  l
} from "./chunk.R37SUKY2.js";
import {
  watch
} from "./chunk.PQ5VRVXF.js";
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

// src/components/radio-button/radio-button.ts
var MoyoRadioButton = class extends s {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      value: (control) => control.checked ? control.value : void 0
    });
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.hasFocus = false;
    this.disabled = false;
    this.checked = false;
    this.invalid = false;
    this.variant = "default";
    this.size = "medium";
    this.pill = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "radio");
  }
  click() {
    this.input.click();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  reportValidity() {
    return this.hiddenInput.reportValidity();
  }
  setCustomValidity(message) {
    this.hiddenInput.setCustomValidity(message);
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "moyo-blur");
  }
  handleClick() {
    if (!this.disabled) {
      this.checked = true;
    }
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "moyo-focus");
  }
  handleCheckedChange() {
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
    if (this.hasUpdated) {
      emit(this, "moyo-change");
    }
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    if (this.hasUpdated) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  render() {
    return l2`
      <div part="base">
        <input class="hidden-input" type="radio" aria-hidden="true" tabindex="-1" />
        <button
          part="button"
          class=${o({
      button: true,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--checked": this.checked,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--outline": true,
      "button--pill": this.pill,
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
          ?disabled=${this.disabled}
          type="button"
          name=${l(this.name)}
          value=${l(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <span part="prefix" class="button__prefix">
            <slot name="prefix"></slot>
          </span>
          <span part="label" class="button__label">
            <slot></slot>
          </span>
          <span part="suffix" class="button__suffix">
            <slot name="suffix"></slot>
          </span>
        </button>
      </div>
    `;
  }
};
MoyoRadioButton.styles = radio_button_styles_default;
__decorateClass([
  i(".button")
], MoyoRadioButton.prototype, "input", 2);
__decorateClass([
  i(".hidden-input")
], MoyoRadioButton.prototype, "hiddenInput", 2);
__decorateClass([
  t()
], MoyoRadioButton.prototype, "hasFocus", 2);
__decorateClass([
  e()
], MoyoRadioButton.prototype, "name", 2);
__decorateClass([
  e()
], MoyoRadioButton.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], MoyoRadioButton.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], MoyoRadioButton.prototype, "checked", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], MoyoRadioButton.prototype, "invalid", 2);
__decorateClass([
  watch("checked")
], MoyoRadioButton.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], MoyoRadioButton.prototype, "handleDisabledChange", 1);
__decorateClass([
  e({ reflect: true })
], MoyoRadioButton.prototype, "variant", 2);
__decorateClass([
  e({ reflect: true })
], MoyoRadioButton.prototype, "size", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], MoyoRadioButton.prototype, "pill", 2);
MoyoRadioButton = __decorateClass([
  n("moyo-radio-button")
], MoyoRadioButton);

export {
  MoyoRadioButton
};
