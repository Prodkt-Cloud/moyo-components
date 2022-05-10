import * as React from 'react';
import Component from '../../components/details/details';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & {
    onMoyoShow?: ((e: Event) => unknown) | undefined;
    onMoyoAfterShow?: ((e: Event) => unknown) | undefined;
    onMoyoHide?: ((e: Event) => unknown) | undefined;
    onMoyoAfterHide?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
