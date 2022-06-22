import {
  r
} from "./chunk.IXU25QGK.js";

// src/styles/form-control.styles.ts
var form_control_styles_default = r`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--moyo-input-label-color);
    margin-bottom: var(--moyo-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--moyo-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--moyo-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control_label {
    font-size: var(--moyo-input-label-font-size-large);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--moyo-input-help-text-color);
  }

  .form-control--has-help-text .form-control__help-text ::slotted(*) {
    margin-top: var(--moyo-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--moyo-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--moyo-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--moyo-input-help-text-font-size-large);
  }
`;

export {
  form_control_styles_default
};
