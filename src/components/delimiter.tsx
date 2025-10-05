import { forwardRef } from 'react';
import type { FC, Ref } from 'react';
import clsx from 'clsx/lite';

import styles from './delimiter.module.css';

type Props = {
  className?: string;
  ref?: Ref<HTMLDivElement>;
} & Record<string, unknown>;

export const Delimiter: FC<Props> = forwardRef((props: Props, ref) => (
  <div ref={ref} {...props} className={clsx(styles.delimiter, props.className)} />
));

Delimiter.displayName = 'Delimiter';
