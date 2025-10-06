import { forwardRef } from 'react';
import type { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx/lite';

import { Text } from 'components/text';

import styles from './input.module.css';

type Props = InputHTMLAttributes<HTMLInputElement> & DataAttributes;

export const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ className, ...other }: Props, ref) => (
    <div className={styles.container}>
      <Text as="label" size="small" color="white" variant="small-caps" htmlFor={other.id}>
        {other['data-label']}
      </Text>
      <input
        ref={ref}
        {...other}
        className={clsx(styles.input, className)}
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  ),
);

Input.displayName = 'Input';
