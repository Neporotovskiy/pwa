import { forwardRef, createElement } from 'react';
import type { FC, ReactNode, ElementType, Ref } from 'react';

import { Text } from 'components/text';

import styles from './page.module.css';

type Props = {
  as?: ElementType;
  className?: string;
  title?: ReactNode;
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
} & Record<string, unknown>;

export const Page: FC<Props> = forwardRef<HTMLElement, Props>(
  ({ as = 'main', className, title, children, ...other }: Props, ref) =>
    createElement(
      as,
      {
        ref,
        className: styles.page,
        ...other,
      },
      <>
        <Text as="h1" size="large" color="white" variant="small-caps" className={styles.title}>
          {title}
        </Text>
        {children}
      </>,
    ),
);

Page.displayName = 'Page';
