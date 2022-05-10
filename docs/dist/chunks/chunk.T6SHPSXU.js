import {
  button_group_styles_default
} from "./chunk.EAHCDLY6.js";
import {
  e,
  i,
  n
} from "./chunk.72DLNKYZ.js";
import {
  $,
  s
} from "./chunk.PEQICPKO.js";
import {
  __decorateClass
} from "./chunk.ICGTMF5Z.js";

// src/components/button-group/button-group.ts
var BUTTON_CHILDREN = ["moyo-button", "moyo-radio-button"];
var MoyoButtonGroup = class extends s {
  constructor() {
    super(...arguments);
    this.label = "";
  }
  handleFocus(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("moyo-button-group__button--focus");
  }
  handleBlur(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("moyo-button-group__button--focus");
  }
  handleMouseOver(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("moyo-button-group__button--hover");
  }
  handleMouseOut(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("moyo-button-group__button--hover");
  }
  handleSlotChange() {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })];
    slottedElements.forEach((el) => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);
      if (button !== null) {
        button.classList.add("moyo-button-group__button");
        button.classList.toggle("moyo-button-group__button--first", index === 0);
        button.classList.toggle("moyo-button-group__button--inner", index > 0 && index < slottedElements.length - 1);
        button.classList.toggle("moyo-button-group__button--last", index === slottedElements.length - 1);
      }
    });
  }
  render() {
    return $`
      <div
        part="base"
        class="button-group"
        role="group"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
};
MoyoButtonGroup.styles = button_group_styles_default;
__decorateClass([
  i("slot")
], MoyoButtonGroup.prototype, "defaultSlot", 2);
__decorateClass([
  e()
], MoyoButtonGroup.prototype, "label", 2);
MoyoButtonGroup = __decorateClass([
  n("moyo-button-group")
], MoyoButtonGroup);
function findButton(el) {
  return BUTTON_CHILDREN.includes(el.tagName.toLowerCase()) ? el : el.querySelector(BUTTON_CHILDREN.join(","));
}

export {
  MoyoButtonGroup
};
