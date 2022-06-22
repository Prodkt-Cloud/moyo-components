import {
  mutation_observer_styles_default
} from "./chunk.WOU3KTVA.js";
import {
  watch
} from "./chunk.W6MGCO4G.js";
import {
  emit
} from "./chunk.UY5AQKHP.js";
import {
  e,
  n
} from "./chunk.QCFW6O2I.js";
import {
  $,
  s
} from "./chunk.IXU25QGK.js";
import {
  __decorateClass
} from "./chunk.K2NRSETB.js";

// src/components/mutation-observer/mutation-observer.ts
var MoyoMutationObserver = class extends s {
  constructor() {
    super(...arguments);
    this.attrOldValue = false;
    this.charData = false;
    this.charDataOldValue = false;
    this.childList = false;
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleMutation = this.handleMutation.bind(this);
    this.mutationObserver = new MutationObserver(this.handleMutation);
    if (!this.disabled) {
      this.startObserver();
    }
  }
  disconnectedCallback() {
    this.stopObserver();
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }
  handleChange() {
    this.stopObserver();
    this.startObserver();
  }
  handleMutation(mutationList) {
    emit(this, "moyo-mutation", {
      detail: { mutationList }
    });
  }
  startObserver() {
    const observeAttributes = typeof this.attr === "string" && this.attr.length > 0;
    const attributeFilter = observeAttributes && this.attr !== "*" ? this.attr.split(" ") : void 0;
    try {
      this.mutationObserver.observe(this, {
        subtree: true,
        childList: this.childList,
        attributes: observeAttributes,
        attributeFilter,
        attributeOldValue: this.attrOldValue,
        characterData: this.charData,
        characterDataOldValue: this.charDataOldValue
      });
    } catch (e2) {
    }
  }
  stopObserver() {
    this.mutationObserver.disconnect();
  }
  render() {
    return $` <slot></slot> `;
  }
};
MoyoMutationObserver.styles = mutation_observer_styles_default;
__decorateClass([
  e({ reflect: true })
], MoyoMutationObserver.prototype, "attr", 2);
__decorateClass([
  e({ attribute: "attr-old-value", type: Boolean, reflect: true })
], MoyoMutationObserver.prototype, "attrOldValue", 2);
__decorateClass([
  e({ attribute: "char-data", type: Boolean, reflect: true })
], MoyoMutationObserver.prototype, "charData", 2);
__decorateClass([
  e({ attribute: "char-data-old-value", type: Boolean, reflect: true })
], MoyoMutationObserver.prototype, "charDataOldValue", 2);
__decorateClass([
  e({ attribute: "child-list", type: Boolean, reflect: true })
], MoyoMutationObserver.prototype, "childList", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], MoyoMutationObserver.prototype, "disabled", 2);
__decorateClass([
  watch("disabled")
], MoyoMutationObserver.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("attr", { waitUntilFirstUpdate: true }),
  watch("attr-old-value", { waitUntilFirstUpdate: true }),
  watch("char-data", { waitUntilFirstUpdate: true }),
  watch("char-data-old-value", { waitUntilFirstUpdate: true }),
  watch("childList", { waitUntilFirstUpdate: true })
], MoyoMutationObserver.prototype, "handleChange", 1);
MoyoMutationObserver = __decorateClass([
  n("moyo-mutation-observer")
], MoyoMutationObserver);

export {
  MoyoMutationObserver
};