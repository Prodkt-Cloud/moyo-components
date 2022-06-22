import {
  LocalizeController
} from "./chunk.NLYU4R6O.js";
import {
  e,
  n,
  t
} from "./chunk.QCFW6O2I.js";
import {
  $,
  s
} from "./chunk.IXU25QGK.js";
import {
  __decorateClass
} from "./chunk.K2NRSETB.js";

// src/components/relative-time/relative-time.ts
var availableUnits = [
  { max: 276e4, value: 6e4, unit: "minute" },
  { max: 72e6, value: 36e5, unit: "hour" },
  { max: 5184e5, value: 864e5, unit: "day" },
  { max: 24192e5, value: 6048e5, unit: "week" },
  { max: 28512e6, value: 2592e6, unit: "month" },
  { max: Infinity, value: 31536e6, unit: "year" }
];
var MoyoRelativeTime = class extends s {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.isoTime = "";
    this.relativeTime = "";
    this.titleTime = "";
    this.format = "long";
    this.numeric = "auto";
    this.sync = false;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.updateTimeout);
  }
  render() {
    const now = new Date();
    const then = new Date(this.date);
    if (isNaN(then.getMilliseconds())) {
      this.relativeTime = "";
      this.isoTime = "";
      return "";
    }
    const diff = then.getTime() - now.getTime();
    const { unit, value } = availableUnits.find((singleUnit) => Math.abs(diff) < singleUnit.max);
    this.isoTime = then.toISOString();
    this.titleTime = this.localize.date(then, {
      month: "long",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short"
    });
    this.relativeTime = this.localize.relativeTime(Math.round(diff / value), unit, {
      numeric: this.numeric,
      style: this.format
    });
    clearTimeout(this.updateTimeout);
    if (this.sync) {
      let nextInterval;
      if (unit === "minute") {
        nextInterval = getTimeUntilNextUnit("second");
      } else if (unit === "hour") {
        nextInterval = getTimeUntilNextUnit("minute");
      } else if (unit === "day") {
        nextInterval = getTimeUntilNextUnit("hour");
      } else {
        nextInterval = getTimeUntilNextUnit("day");
      }
      this.updateTimeout = window.setTimeout(() => this.requestUpdate(), nextInterval);
    }
    return $` <time datetime=${this.isoTime} title=${this.titleTime}>${this.relativeTime}</time> `;
  }
};
__decorateClass([
  t()
], MoyoRelativeTime.prototype, "isoTime", 2);
__decorateClass([
  t()
], MoyoRelativeTime.prototype, "relativeTime", 2);
__decorateClass([
  t()
], MoyoRelativeTime.prototype, "titleTime", 2);
__decorateClass([
  e()
], MoyoRelativeTime.prototype, "date", 2);
__decorateClass([
  e()
], MoyoRelativeTime.prototype, "lang", 2);
__decorateClass([
  e()
], MoyoRelativeTime.prototype, "format", 2);
__decorateClass([
  e()
], MoyoRelativeTime.prototype, "numeric", 2);
__decorateClass([
  e({ type: Boolean })
], MoyoRelativeTime.prototype, "sync", 2);
MoyoRelativeTime = __decorateClass([
  n("moyo-relative-time")
], MoyoRelativeTime);
function getTimeUntilNextUnit(unit) {
  const units = { second: 1e3, minute: 6e4, hour: 36e5, day: 864e5 };
  const value = units[unit];
  return value - Date.now() % value;
}

export {
  MoyoRelativeTime
};
