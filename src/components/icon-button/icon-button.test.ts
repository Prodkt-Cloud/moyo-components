import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import type MoyoIconButton from './icon-button';

type LinkTarget = '_self' | '_blank' | '_parent' | '_top';

describe('<moyo-icon-button>', () => {
  describe('defaults ', () => {
    it('default properties', async () => {
      const el = await fixture<MoyoIconButton>(html` <moyo-icon-button></moyo-icon-button> `);

      expect(el.name).to.be.undefined;
      expect(el.library).to.be.undefined;
      expect(el.src).to.be.undefined;
      expect(el.href).to.be.undefined;
      expect(el.target).to.be.undefined;
      expect(el.download).to.be.undefined;
      expect(el.label).to.equal('');
      expect(el.disabled).to.equal(false);
    });

    it('renders as a button by default', async () => {
      const el = await fixture<MoyoIconButton>(html` <moyo-icon-button></moyo-icon-button> `);

      expect(el.shadowRoot?.querySelector('button')).to.exist;
      expect(el.shadowRoot?.querySelector('a')).not.to.exist;
    });
  });

  describe('when icon attributes are present', () => {
    it('renders an moyo-icon from a library', async () => {
      const el = await fixture<MoyoIconButton>(
        html` <moyo-icon-button library="system" name="check-lg"></moyo-icon-button> `
      );
      expect(el.shadowRoot?.querySelector('moyo-icon')).to.exist;
    });

    it('renders an moyo-icon from a src', async () => {
      const fakeId = 'test-src';
      const el = await fixture<MoyoIconButton>(html` <moyo-icon-button></moyo-icon-button> `);

      el.src = `data:image/svg+xml,${encodeURIComponent(`<svg id="${fakeId}"></svg>`)}`;

      const internalMoyoIcon = el.shadowRoot?.querySelector('moyo-icon');

      await waitUntil(() => internalMoyoIcon?.shadowRoot?.querySelector('svg'), 'SVG not rendered');

      expect(internalMoyoIcon).to.exist;
      expect(internalMoyoIcon?.shadowRoot?.querySelector('svg')).to.exist;
      expect(internalMoyoIcon?.shadowRoot?.querySelector('svg')?.getAttribute('id')).to.equal(fakeId);
    });
  });

  describe('when href is present', () => {
    it('renders as an anchor', async () => {
      const el = await fixture<MoyoIconButton>(html` <moyo-icon-button href="some/path"></moyo-icon-button> `);

      expect(el.shadowRoot?.querySelector('a')).to.exist;
      expect(el.shadowRoot?.querySelector('button')).not.to.exist;
    });

    it(`the anchor rel is not present`, async () => {
      const el = await fixture<MoyoIconButton>(html` <moyo-icon-button href="some/path"></moyo-icon-button> `);
      expect(el.shadowRoot?.querySelector(`a[rel]`)).not.to.exist;
    });

    describe('and target is present', () => {
      ['_blank', '_parent', '_self', '_top'].forEach((target: LinkTarget) => {
        it(`the anchor target is the provided target: ${target}`, async () => {
          const el = await fixture<MoyoIconButton>(
            html` <moyo-icon-button href="some/path" target="${target}"></moyo-icon-button> `
          );
          expect(el.shadowRoot?.querySelector(`a[target="${target}"]`)).to.exist;
        });

        it(`the anchor rel is set to 'noreferrer noopener'`, async () => {
          const el = await fixture<MoyoIconButton>(
            html` <moyo-icon-button href="some/path" target="${target}"></moyo-icon-button> `
          );
          expect(el.shadowRoot?.querySelector(`a[rel="noreferrer noopener"]`)).to.exist;
        });
      });
    });

    describe('and download is present', () => {
      it(`the anchor download attribute is the provided download`, async () => {
        const fakeDownload = 'some/path';
        const el = await fixture<MoyoIconButton>(
          html` <moyo-icon-button href="some/path" download="${fakeDownload}"></moyo-icon-button> `
        );

        expect(el.shadowRoot?.querySelector(`a[download="${fakeDownload}"]`)).to.exist;
      });
    });
  });

  describe('when label is present', () => {
    it('the internal aria-label attribute is set to the provided label when rendering a button', async () => {
      const fakeLabel = 'some label';
      const el = await fixture<MoyoIconButton>(html` <moyo-icon-button label="${fakeLabel}"></moyo-icon-button> `);
      expect(el.shadowRoot?.querySelector(`button[aria-label="${fakeLabel}"]`)).to.exist;
    });

    it('the internal aria-label attribute is set to the provided label when rendering an anchor', async () => {
      const fakeLabel = 'some label';
      const el = await fixture<MoyoIconButton>(
        html` <moyo-icon-button href="some/path" label="${fakeLabel}"></moyo-icon-button> `
      );
      expect(el.shadowRoot?.querySelector(`a[aria-label="${fakeLabel}"]`)).to.exist;
    });
  });

  describe('when disabled is present', () => {
    it('the internal button has a disabled attribute when rendering a button', async () => {
      const el = await fixture<MoyoIconButton>(html` <moyo-icon-button disabled></moyo-icon-button> `);
      expect(el.shadowRoot?.querySelector(`button[disabled]`)).to.exist;
    });

    it('the internal anchor has an aria-disabled attribute when rendering an anchor', async () => {
      const el = await fixture<MoyoIconButton>(html` <moyo-icon-button href="some/path" disabled></moyo-icon-button> `);
      expect(el.shadowRoot?.querySelector(`a[aria-disabled="true"]`)).to.exist;
    });
  });

  describe('when using methods', () => {
    it('should emit moyo-focus and moyo-blur when the button is focused and blurred', async () => {
      const el = await fixture<MoyoIconButton>(html` <moyo-icon-button></moyo-icon-button> `);
      const focusHandler = sinon.spy();
      const blurHandler = sinon.spy();

      el.addEventListener('moyo-focus', focusHandler);
      el.addEventListener('moyo-blur', blurHandler);

      el.focus();
      await waitUntil(() => focusHandler.calledOnce);

      el.blur();
      await waitUntil(() => blurHandler.calledOnce);

      expect(focusHandler).to.have.been.calledOnce;
      expect(blurHandler).to.have.been.calledOnce;
    });

    it('should emit a click event when calling click()', async () => {
      const el = await fixture<MoyoIconButton>(html` <moyo-icon-button></moyo-icon-button> `);
      const clickHandler = sinon.spy();

      el.addEventListener('click', clickHandler);
      el.click();
      await waitUntil(() => clickHandler.calledOnce);

      expect(clickHandler).to.have.been.calledOnce;
    });
  });
});
