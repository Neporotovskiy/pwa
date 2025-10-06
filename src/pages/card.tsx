import { useState } from 'react';

import type { Card as CardType } from 'types/card.ts';

import { WoundLocator } from 'features/wound-locator';

import { Page } from 'components/page';
import { Input } from 'components/input';
import { Delimiter } from 'components/delimiter';
import { Text } from 'components/text';
import { Option, Selector } from 'components/selector';

import styles from './card.module.css';

export const Card = () => {
  const [card, setCard] = useState<CardType>({
    triage: 'red',
    scheme: {
      projection: 'front',
      wounds: [],
    },
    anthropometric: {
      weight: '',
      height: '',
      sex: 1,
    },
    genetic: {
      blood: 1,
      factor: '+',
    },
    personal: {
      callsign: '',
    },
  });

  return (
    <Page title="Создание ТМКР">
      <Delimiter />
      <section className={styles.section}>
        <Selector
          id="triage"
          data-label="Триаж"
          value={card.triage}
          onChange={(event) => {
            setCard((other) => ({ ...other, triage: event.target.value }));
          }}
        >
          <Option value="green">Зеленая категория</Option>
          <Option value="yellow">Жёлтая категория</Option>
          <Option value="red">Красная категория</Option>
          <Option value="black">Черная категория</Option>
        </Selector>
      </section>
      <Delimiter />
      <section className={styles.section}>
        <WoundLocator
          projection={card.scheme.projection}
          wounds={card.scheme.wounds}
          onSelect={(projection, wounds) => {
            setCard((other) => ({
              ...other,
              scheme: { projection, wounds },
            }));
          }}
        />
      </section>
      <Delimiter />
      <section className={styles.section}>
        <Text size="medium" color="white" variant="small-caps">
          Антропометрические и генетические данные
        </Text>
        <div className={styles.row}>
          <Input
            id="height"
            data-label="Рост"
            value={card.anthropometric.height}
            onChange={(event) => {
              setCard((other) => ({
                ...other,
                anthropometric: { ...other.anthropometric, height: event.target.value },
              }));
            }}
          />
          <Input
            id="weight"
            data-label="Вес"
            value={card.anthropometric.weight}
            onChange={(event) => {
              setCard((other) => ({
                ...other,
                anthropometric: { ...other.anthropometric, weight: event.target.value },
              }));
            }}
          />
        </div>
        <Selector
          id="sex"
          data-label="Пол"
          value={card.anthropometric.sex}
          onChange={(event) => {
            setCard((other) => ({
              ...other,
              anthropometric: { ...other.anthropometric, sex: parseInt(event.target.value) },
            }));
          }}
        >
          <Option value="1">Мужской</Option>
          <Option value="0">Женский</Option>
        </Selector>
        <div className={styles.row}>
          <Selector
            id="blood-type"
            data-label="Группа крови"
            value={card.genetic.blood}
            onChange={(event) => {
              setCard((other) => ({
                ...other,
                genetic: { ...other.genetic, blood: parseInt(event.target.value) },
              }));
            }}
          >
            <Option value="0">Первая</Option>
            <Option value="1">Вторая</Option>
            <Option value="2">Третья</Option>
            <Option value="3">Четвертая</Option>
          </Selector>
          <Selector
            id="rh"
            data-label="Резус-фактор"
            value={card.genetic.factor}
            onChange={(event) => {
              setCard((other) => ({
                ...other,
                genetic: { ...other.genetic, factor: event.target.value },
              }));
            }}
          >
            <Option value="+">Положительный</Option>
            <Option value="-">Отрицательный</Option>
          </Selector>
        </div>
      </section>
      <Delimiter />
      <section className={styles.section}>
        <Text size="medium" color="white" variant="small-caps">
          Персональные данные
        </Text>
        <Input
          id="callsign"
          data-label="Позывной"
          value={card.personal.callsign}
          onChange={(event) => {
            setCard((other) => ({
              ...other,
              personal: { ...other.personal, callsign: event.target.value },
            }));
          }}
        />
      </section>
      <button
        className={styles.button}
        disabled={!window.isSecureContext}
        onClick={() => {
          const text = `
-------------------
Триаж
-------------------
${{ green: 'Зеленая категория', yellow: 'Жёлтая категория', red: 'Красная категория', black: 'Черная категория' }[card.triage]}

-------------------
Ранения (Проекция ${{ front: 'вентральная', right: 'сагиттальная прав.', back: 'дорсальная', left: 'сагиттальная лев.' }[card.scheme.projection]})
-------------------
${card.scheme.wounds
  .map(({ locator: { region, subregion }, type, medicines, equipments }, index) => {
    let result = `№${index + 1}`;
    result += `\n Регион, подрегион: ${region === subregion ? region : `${region}, ${subregion}`}`;
    result += `\n Типы ранения: ${type.map((key) => ({ wound: 'Рана', amputation: 'Ампутация', burn: 'Ожог' })[key]).join(', ')}`;
    result += `\n Применённые препараты: ${medicines
      .map(
        (key) =>
          ({
            painkillers: 'Обезболивающее',
            antishock: 'Противошоковое',
            antifire: 'Противоожоговое',
            antiseptic: 'Антисептик',
          })[key],
      )
      .join(', ')}`;
    result += `\n Применённое оборудование: ${equipments
      .map(
        (key) =>
          ({
            tourniquet: 'Жгут',
            turnstile: 'Турникет',
            bandage: 'Бандаж',
            eyecup: 'Наглазник',
            catheter: 'Катетер',
          })[key],
      )
      .join(', ')}`;
    return result;
  })
  .join('\n')}

-------------------
Антропометрические и генетические данные
-------------------
Рост: ${card.anthropometric.height}
Вес: ${card.anthropometric.weight}
Пол: ${['Женский', 'Мужской'][card.anthropometric.sex]}
Группа крови: ${['O(I)', 'A(II)', 'B(III)', 'AB(IV)'][card.genetic.blood]}Rh${card.genetic.factor}

-------------------
Персональные данные
-------------------
Позывной: ${card.personal.callsign}
          `;
          navigator.clipboard
            .writeText(text.trim())
            .then(() => {
              alert('Данные карточки скопированы в буфер обмена.');
            })
            .catch(() => {
              alert('Бля, данные карточки проебались');
            });
        }}
      >
        ТМКР в буфер обмена
      </button>
    </Page>
  );
};
