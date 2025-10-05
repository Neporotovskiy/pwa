import type { FormEvent } from 'react';

import { WoundLocator } from 'features/wound-locator';

import { Page } from 'components/page';
import { Input } from 'components/input';
import { Delimiter } from 'components/delimiter';
import { Text } from 'components/text';
import { Option, Selector } from 'components/selector';

import styles from './card.module.css';

export const Card = () => {
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const grouped: Record<string, Record<string, string> | string> = {};

    for (const [key, value] of data) {
      const [group, field] = key.split('.');
      if (!grouped[group]) grouped[group] = {};
      if (field) {
        // @ts-ignore
        grouped[group][field] = value;
      } else {
        // @ts-ignore
        grouped[group] = value;
      }
    }

    console.log('Submission:', grouped);
  };
  return (
    <Page as="form" onSubmit={submit} title="Создание ТМКР">
      <Delimiter />
      <section className={styles.section}>
        <Selector id="triage" name="Триаж" data-label="Триаж" defaultValue="Зеленая категория">
          <Option value="Зеленая категория">Зеленая категория</Option>
          <Option value="Оранжевая категория">Оранжевая категория</Option>
          <Option value="Красная категория">Красная категория</Option>
          <Option value="Черная категория">Черная категория</Option>
        </Selector>
      </section>
      <Delimiter />
      <section className={styles.section}>
        <WoundLocator />
      </section>
      <Delimiter />
      <section className={styles.section}>
        <Text size="medium" color="white" variant="small-caps">
          Антропометрические и генетические данные
        </Text>
        <div className={styles.row}>
          <Input
            id="height"
            name="Антропометрические и генетические данные.Рост"
            data-label="Рост"
          />
          <Input id="weight" name="Антропометрические и генетические данные.Вес" data-label="Вес" />
        </div>
        <Selector
          id="sex"
          name="Антропометрические и генетические данные.Пол"
          data-label="Пол"
          defaultValue="Мужской"
        >
          <Option value="Мужской">Мужской</Option>
          <Option value="Женский">Женский</Option>
        </Selector>
        <div className={styles.row}>
          <Selector
            id="blood-type"
            name="Антропометрические и генетические данные.Группа крови"
            data-label="Группа крови"
            defaultValue="Вторая"
          >
            <Option value="Первая">Первая</Option>
            <Option value="Вторая">Вторая</Option>
            <Option value="Третья">Третья</Option>
            <Option value="Четвертая">Четвертая</Option>
          </Selector>
          <Selector
            id="rh"
            name="Антропометрические и генетические данные.Резус-фактор"
            data-label="Резус-фактор"
            defaultValue="Положительный"
          >
            <Option value="Положительный">Положительный</Option>
            <Option value="Отрицательный">Отрицательный</Option>
          </Selector>
        </div>
      </section>
      <Delimiter />
      <section className={styles.section}>
        <Text size="medium" color="white" variant="small-caps">
          Персональные данные
        </Text>
        <Input id="callsign" name="Персональные данные.Позывной" data-label="Позывной" />
      </section>
      <button type="submit" className={styles.button}>
        Отправить ТМКР
      </button>
    </Page>
  );
};
