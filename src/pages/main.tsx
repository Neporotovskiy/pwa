import { Link } from 'wouter';
import clsx from 'clsx/lite';

import { Text } from 'components/text';
import { Page } from 'components/page';

import styles from './main.module.css';

export const Main = () => {
  return (
    <Page title="Тактическая Медицинская Карточка Раненого">
      <Link asChild to="/card">
        <Text
          as="button"
          size="large"
          color="white"
          variant="small-caps"
          className={clsx(styles.button, styles.create)}
        >
          Создать ТМКР
        </Text>
      </Link>
      <ul className={styles.navigation}>
        <li>
          {/*
          <Link asChild to="/profile">
          */}
          <Text
            as="button"
            size="medium"
            color="white"
            variant="small-caps"
            className={clsx(styles.button, styles.link)}
          >
            Профиль
          </Text>
          {/*
          </Link>
          */}
        </li>
        <li>
          {/*
          <Link asChild to="/group">
          */}
          <Text
            as="button"
            size="medium"
            color="white"
            variant="small-caps"
            className={clsx(styles.button, styles.link)}
          >
            Группа
          </Text>
          {/*
          </Link>
          */}
        </li>
      </ul>
      <Text size="small" color="dark" variant="small-caps" className={styles.version}>
        Версия {APP_VERSION}
      </Text>
    </Page>
  );
};
