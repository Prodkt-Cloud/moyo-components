import {
  o
} from "./chunk.STPE66T5.js";
import {
  e,
  n
} from "./chunk.QCFW6O2I.js";
import {
  badge_styles_default
} from "./chunk.BKK6KVNV.js";
import {
  $,
  s
} from "./chunk.IXU25QGK.js";
import {
  __decorateClass
} from "./chunk.K2NRSETB.js";

// src/components/badge/badge.ts
var MoyoBadge = class extends s {
  constructor() {
    super(...arguments);
    this.variant = "primary";
    this.pill = false;
    this.pulse = false;
  }
  render() {
    return $`
      <span
        part="base"
        class=${o({
      badge: true,
      "badge--primary": this.variant === "primary",
      "badge--success": this.variant === "success",
      "badge--neutral": this.variant === "neutral",
      "badge--warning": this.variant === "warning",
      "badge--danger": this.variant === "danger",
      "badge--pill": this.pill,
      "badge--pulse": this.pulse
    })}
        role="status"
      >
        <slot></slot>
      </span>
    `;
  }
};
MoyoBadge.styles = badge_styles_default;
__decorateClass([
  e({ reflect: true })
], MoyoBadge.prototype, "variant", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], MoyoBadge.prototype, "pill", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], MoyoBadge.prototype, "pulse", 2);
MoyoBadge = __decorateClass([
  n("moyo-badge")
], MoyoBadge);

export {
  MoyoBadge
};
