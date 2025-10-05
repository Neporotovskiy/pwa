import { forwardRef } from 'react';
import type { FC, SelectHTMLAttributes, OptionHTMLAttributes } from 'react';
import clsx from 'clsx/lite';

import { Text } from 'components/text';

import styles from './selector.module.css';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & DataAttributes;

export const Selector: FC<SelectProps> = forwardRef<HTMLDivElement, SelectProps>(
  ({ className, children, ...other }: SelectProps, ref) => (
    <div ref={ref} className={styles.container}>
      <Text as="label" size="small" color="white" variant="small-caps" htmlFor={other.id}>
        {other['data-label']}
      </Text>
      <div className={clsx(styles.selector, other.multiple && styles.multiple)}>
        <select {...other} className={clsx(styles.select, className)}>
          {children}
        </select>
        <svg
          width="22"
          height="13"
          viewBox="0 0 22 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            d="M1 1C5.09121 4.90524 7.38498 7.09476 11.4762 11L21 1"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  ),
);

Selector.displayName = 'Selector';

type OptionProps = Omit<OptionHTMLAttributes<HTMLOptionElement> & DataAttributes, 'color'>;

export const Option: FC<OptionProps> = forwardRef<HTMLOptionElement, OptionProps>(
  ({ className, children, ...other }: OptionProps, ref) => (
    <Text ref={ref} as="option" size="medium" color="black" className={styles.option} {...other}>
      {children}
    </Text>
  ),
);

Option.displayName = 'Option';
