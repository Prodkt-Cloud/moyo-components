import {
  Modal
} from "./chunk.BQLXYG6H.js";
import {
  lockBodyScrolling,
  unlockBodyScrolling
} from "./chunk.GTBYWY6D.js";
import {
  LocalizeController
} from "./chunk.NLYU4R6O.js";
import {
  dialog_styles_default
} from "./chunk.7FEVBM67.js";
import {
  animateTo,
  stopAnimations
} from "./chunk.YBI4N56R.js";
import {
  getAnimation,
  setDefaultAnimation
} from "./chunk.6SAGALY4.js";
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
  emit,
  waitForEvent
} from "./chunk.CDTZZV7W.js";
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

// src/components/dialog/dialog.ts
var MoyoDialog = class extends s {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer");
    this.localize = new LocalizeController(this);
    this.open = false;
    this.label = "";
    this.noHeader = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.modal = new Modal(this);
  }
  firstUpdated() {
    this.dialog.hidden = !this.open;
    if (this.open) {
      this.modal.activate();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "moyo-after-show");
  }
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "moyo-after-hide");
  }
  requestClose(source) {
    const slRequestClose = emit(this, "moyo-request-close", {
      cancelable: true,
      detail: { source }
    });
    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "dialog.denyClose");
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }
    this.hide();
  }
  handleKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.requestClose("keyboard");
    }
  }
  async handleOpenChange() {
    if (this.open) {
      emit(this, "moyo-show");
      this.originalTrigger = document.activeElement;
      this.modal.activate();
      lockBodyScrolling(this);
      const autoFocusTarget = this.querySelector("[autofocus]");
      if (autoFocusTarget) {
        autoFocusTarget.removeAttribute("autofocus");
      }
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      this.dialog.hidden = false;
      requestAnimationFrame(() => {
        const slInitialFocus = emit(this, "moyo-initial-focus", { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          if (autoFocusTarget) {
            autoFocusTarget.focus({ preventScroll: true });
          } else {
            this.panel.focus({ preventScroll: true });
          }
        }
        if (autoFocusTarget) {
          autoFocusTarget.setAttribute("autofocus", "");
        }
      });
      const panelAnimation = getAnimation(this, "dialog.show");
      const overlayAnimation = getAnimation(this, "dialog.overlay.show");
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      emit(this, "moyo-after-show");
    } else {
      emit(this, "moyo-hide");
      this.modal.deactivate();
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, "dialog.hide");
      const overlayAnimation = getAnimation(this, "dialog.overlay.hide");
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      this.dialog.hidden = true;
      unlockBodyScrolling(this);
      const trigger = this.originalTrigger;
      if (typeof (trigger == null ? void 0 : trigger.focus) === "function") {
        setTimeout(() => trigger.focus());
      }
      emit(this, "moyo-after-hide");
    }
  }
  render() {
    return $`
      <div
        part="base"
        class=${o({
      dialog: true,
      "dialog--open": this.open,
      "dialog--has-footer": this.hasSlotController.test("footer")
    })}
        @keydown=${this.handleKeyDown}
      >
        <div part="overlay" class="dialog__overlay" @click=${() => this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${l(this.noHeader ? this.label : void 0)}
          aria-labelledby=${l(!this.noHeader ? "title" : void 0)}
          tabindex="0"
        >
          ${!this.noHeader ? $`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(65279)} </slot>
                  </h2>
                  <moyo-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="dialog__close"
                    name="x"
                    label=${this.localize.term("close")}
                    library="system"
                    @click="${() => this.requestClose("close-button")}"
                  ></moyo-icon-button>
                </header>
              ` : ""}

          <div part="body" class="dialog__body">
            <slot></slot>
          </div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }
};
MoyoDialog.styles = dialog_styles_default;
__decorateClass([
  i(".dialog")
], MoyoDialog.prototype, "dialog", 2);
__decorateClass([
  i(".dialog__panel")
], MoyoDialog.prototype, "panel", 2);
__decorateClass([
  i(".dialog__overlay")
], MoyoDialog.prototype, "overlay", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], MoyoDialog.prototype, "open", 2);
__decorateClass([
  e({ reflect: true })
], MoyoDialog.prototype, "label", 2);
__decorateClass([
  e({ attribute: "no-header", type: Boolean, reflect: true })
], MoyoDialog.prototype, "noHeader", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], MoyoDialog.prototype, "handleOpenChange", 1);
MoyoDialog = __decorateClass([
  n("moyo-dialog")
], MoyoDialog);
setDefaultAnimation("dialog.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.denyClose", {
  keyframes: [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

export {
  MoyoDialog
};
