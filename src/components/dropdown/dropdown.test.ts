import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import sinon from 'sinon';
import type MoyoDropdown from './dropdown';

describe('<moyo-dropdown>', () => {
  it('should be visible with the open attribute', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown open>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
          <moyo-menu-item>Item 2</moyo-menu-item>
          <moyo-menu-item>Item 3</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part="panel"]')!;

    expect(panel.hidden).to.be.false;
  });

  it('should not be visible without the open attribute', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
          <moyo-menu-item>Item 2</moyo-menu-item>
          <moyo-menu-item>Item 3</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part="panel"]')!;

    expect(panel.hidden).to.be.true;
  });

  it('should emit moyo-show and moyo-after-show when calling show()', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
          <moyo-menu-item>Item 2</moyo-menu-item>
          <moyo-menu-item>Item 3</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part="panel"]')!;
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('moyo-show', showHandler);
    el.addEventListener('moyo-after-show', afterShowHandler);
    el.show();

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.false;
  });

  it('should emit moyo-hide and moyo-after-hide when calling hide()', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown open>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
          <moyo-menu-item>Item 2</moyo-menu-item>
          <moyo-menu-item>Item 3</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part="panel"]')!;
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('moyo-hide', hideHandler);
    el.addEventListener('moyo-after-hide', afterHideHandler);
    el.hide();

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.true;
  });

  it('should emit moyo-show and moyo-after-show when setting open = true', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
          <moyo-menu-item>Item 2</moyo-menu-item>
          <moyo-menu-item>Item 3</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part="panel"]')!;
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('moyo-show', showHandler);
    el.addEventListener('moyo-after-show', afterShowHandler);
    el.open = true;

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.false;
  });

  it('should emit moyo-hide and moyo-after-hide when setting open = false', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown open>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
          <moyo-menu-item>Item 2</moyo-menu-item>
          <moyo-menu-item>Item 3</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);
    const panel = el.shadowRoot!.querySelector<HTMLElement>('[part="panel"]')!;
    const hideHandler = sinon.spy();
    const afterHideHandler = sinon.spy();

    el.addEventListener('moyo-hide', hideHandler);
    el.addEventListener('moyo-after-hide', afterHideHandler);
    el.open = false;

    await waitUntil(() => hideHandler.calledOnce);
    await waitUntil(() => afterHideHandler.calledOnce);

    expect(hideHandler).to.have.been.calledOnce;
    expect(afterHideHandler).to.have.been.calledOnce;
    expect(panel.hidden).to.be.true;
  });

  it('should still open on arrow navigation when no menu items', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu> </moyo-menu>
      </moyo-dropdown>
    `);
    const trigger = el.querySelector('moyo-button')!;

    trigger.focus();
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should open on arrow navigation', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
          <moyo-menu-item>Item 2</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);
    const trigger = el.querySelector('moyo-button')!;

    trigger.focus();
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should close on escape key', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown open>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
          <moyo-menu-item>Item 2</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);
    const trigger = el.querySelector('moyo-button')!;

    trigger.focus();
    await sendKeys({ press: 'Escape' });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should not open on arrow navigation when no menu exists', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <div>Some custom content</div>
      </moyo-dropdown>
    `);
    const trigger = el.querySelector('moyo-button')!;

    trigger.focus();
    await sendKeys({ press: 'ArrowDown' });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should open on enter key', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);
    const trigger = el.querySelector('moyo-button')!;

    trigger.focus();
    await el.updateComplete;
    await sendKeys({ press: 'Enter' });
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should open on enter key when no menu exists', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <div>Some custom content</div>
      </moyo-dropdown>
    `);
    const trigger = el.querySelector('moyo-button')!;

    trigger.focus();
    await el.updateComplete;
    await sendKeys({ press: 'Enter' });
    await el.updateComplete;

    expect(el.open).to.be.true;
  });

  it('should hide when clicked outside container and initially open', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown open>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);

    await sendMouse({ type: 'click', position: [0, 0] });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });

  it('should hide when clicked outside container', async () => {
    const el = await fixture<MoyoDropdown>(html`
      <moyo-dropdown>
        <moyo-button slot="trigger" caret>Toggle</moyo-button>
        <moyo-menu>
          <moyo-menu-item>Item 1</moyo-menu-item>
        </moyo-menu>
      </moyo-dropdown>
    `);
    const trigger = el.querySelector('moyo-button')!;

    trigger.click();
    await el.updateComplete;
    await sendMouse({ type: 'click', position: [0, 0] });
    await el.updateComplete;

    expect(el.open).to.be.false;
  });
});
