import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type MoyoSwitch from './switch';

describe('<moyo-switch>', () => {
  it('should be disabled with the disabled attribute', async () => {
    const el = await fixture<MoyoSwitch>(html` <moyo-switch disabled></moyo-switch> `);
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

    expect(input.disabled).to.be.true;
  });

  it('should be valid by default', async () => {
    const el = await fixture<MoyoSwitch>(html` <moyo-switch></moyo-switch> `);

    expect(el.invalid).to.be.false;
  });

  it('should fire moyo-change when clicked', async () => {
    const el = await fixture<MoyoSwitch>(html` <moyo-switch></moyo-switch> `);
    setTimeout(() => el.shadowRoot!.querySelector('input')!.click());
    const event = await oneEvent(el, 'moyo-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire moyo-change when toggled with spacebar', async () => {
    const el = await fixture<MoyoSwitch>(html` <moyo-switch></moyo-switch> `);
    el.focus();
    setTimeout(() => sendKeys({ press: ' ' }));
    const event = await oneEvent(el, 'moyo-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire moyo-change when toggled with the right arrow', async () => {
    const el = await fixture<MoyoSwitch>(html` <moyo-switch></moyo-switch> `);
    el.focus();
    setTimeout(() => sendKeys({ press: 'ArrowRight' }));
    const event = await oneEvent(el, 'moyo-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.true;
  });

  it('should fire moyo-change when toggled with the left arrow', async () => {
    const el = await fixture<MoyoSwitch>(html` <moyo-switch checked></moyo-switch> `);
    el.focus();
    setTimeout(() => sendKeys({ press: 'ArrowLeft' }));
    const event = await oneEvent(el, 'moyo-change');
    expect(event.target).to.equal(el);
    expect(el.checked).to.be.false;
  });

  it('should not fire moyo-change when checked is set by javascript', async () => {
    const el = await fixture<MoyoSwitch>(html` <moyo-switch></moyo-switch> `);
    el.addEventListener('moyo-change', () => expect.fail('event fired'));
    el.checked = true;
    await el.updateComplete;
    el.checked = false;
    await el.updateComplete;
  });
});
