import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  PropsWithChildren,
} from 'react';

export const getValidChildAsChild = <P>(children: ReactNode) => {
  const child = Children.only(children);

  return isValidElement<P>(child) ? child : null;
};

export function getValidProps<
  P extends PropsWithChildren<{ asChild?: boolean }>
>(
  props: P
):
  | (P & {
      asChild: true;
      firstChild: ReactElement<P>;
    })
  | (P & { asChild: false; firstChild: null }) {
  if (props.asChild) {
    const firstChild = getValidChildAsChild<P>(props.children);

    if (firstChild) return { ...props, asChild: props.asChild, firstChild };
  }

  return { ...props, asChild: false, firstChild: null };
}
