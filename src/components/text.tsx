import { forwardRef, createElement } from 'react';
import type { FC, ReactNode, ElementType, Ref } from 'react';
import clsx from 'clsx/lite';

import styles from './text.module.css';

type Props = {
  as?: ElementType;
  size?: 'small' | 'medium' | 'large' | 'current';
  color?: 'black' | 'dark' | 'light' | 'white' | 'current';
  variant?: 'normal' | 'small-caps' | 'current';
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLElement>;
} & Record<string, unknown>;

export const Text: FC<Props> = forwardRef(
  (
    {
      as = 'span',
      size = 'current',
      color = 'current',
      variant = 'current',
      children,
      className,
      ...other
    }: Props,
    ref,
  ) =>
    createElement(
      as,
      {
        ref,
        className: clsx(
          styles.text,
          styles['size-' + size],
          styles['color-' + color],
          styles['variant-' + variant],
          className,
        ),
        ...other,
      },
      children,
    ),
);

Text.displayName = 'Text';
