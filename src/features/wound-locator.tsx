import type { Card, Wound } from 'types/card.ts';

import { FrontProjection } from 'components/anatomy-schemas/front-projection';
import { Text } from 'components/text';
import { Selector, Option } from 'components/selector';

import styles from './wound-locator.module.css';

type Props = {
  projection: Card['scheme']['projection'];
  wounds: Wound[];
  onSelect: (projection: Card['scheme']['projection'], wounds: Wound[]) => void;
};

export const WoundLocator = ({ projection, wounds, onSelect }: Props) => {
  return (
    <>
      <Text as="h2" size="medium" color="white" variant="small-caps" className={styles.title}>
        Локализация и типы ранений
      </Text>
      <Selector
        id="projection"
        data-label="Проекция схемы"
        value={projection}
        onChange={(event) => {
          onSelect(event.target.value, wounds);
        }}
      >
        <Option value="front">Вентральная</Option>
        <Option value="right">Сагиттальная прав.</Option>
        <Option value="back">Дорсальная</Option>
        <Option value="left">Сагиттальная лев.</Option>
      </Selector>
      <div className={styles.projection}>
        <Text size="small" color="white" variant="small-caps">
          Схема локализации ранений
        </Text>
        <div className={styles.canvas}>
          <FrontProjection
            selected={wounds}
            onSelect={(descriptor) => {
              const isSelected = wounds.some(
                (wound) =>
                  descriptor.locator.region === wound.locator.region &&
                  descriptor.locator.subregion === wound.locator.subregion,
              );
              if (isSelected) {
                const result = wounds.filter(
                  (wound) =>
                    descriptor.locator.region !== wound.locator.region ||
                    descriptor.locator.subregion !== wound.locator.subregion,
                );
                onSelect(projection, result);
              } else {
                onSelect(projection, [
                  ...wounds,
                  { locator: descriptor.locator, type: ['wound'], equipments: [], medicines: [] },
                ]);
              }
            }}
          />
        </div>
      </div>
      <ul className={styles.wounds}>
        {wounds.length > 0 ? (
          wounds.map((descriptor, index) => {
            const locator =
              descriptor.locator.region === descriptor.locator.subregion
                ? descriptor.locator.region
                : `${descriptor.locator.region}, ${descriptor.locator.subregion}`;
            return (
              <li key={locator} className={styles.wound}>
                <Text size="medium" color="white" variant="small-caps">
                  {locator}
                </Text>
                <Selector
                  id="type"
                  data-label="Тип ранения"
                  multiple
                  size={3}
                  value={descriptor.type}
                  onChange={(event) => {
                    const options = [...event.target.selectedOptions];
                    const values = options.map((option) => option.value);

                    const copy = [...wounds];
                    copy[index] = { ...descriptor, type: values };

                    onSelect(projection, copy);
                  }}
                >
                  <Option value="wound">Рана</Option>
                  <Option value="amputation">Ампутация</Option>
                  <Option value="burn">Ожог</Option>
                </Selector>
                <Selector
                  id="type"
                  data-label="Препараты"
                  multiple
                  size={4}
                  value={descriptor.medicines}
                  onChange={(event) => {
                    const options = [...event.target.selectedOptions];
                    const values = options.map((option) => option.value);

                    const copy = [...wounds];
                    copy[index] = { ...descriptor, medicines: values };

                    onSelect(projection, copy);
                  }}
                >
                  <Option value="painkillers">Обезболивающее</Option>
                  <Option value="antishock">Противошоковое</Option>
                  <Option value="antifire">Противоожоговое</Option>
                  <Option value="antiseptic">Антисептик</Option>
                </Selector>
                <Selector
                  id="type"
                  data-label="Оборудование"
                  multiple
                  size={5}
                  value={descriptor.equipments}
                  onChange={(event) => {
                    const options = [...event.target.selectedOptions];
                    const values = options.map((option) => option.value);

                    const copy = [...wounds];
                    copy[index] = { ...descriptor, equipments: values };

                    onSelect(projection, copy);
                  }}
                >
                  <Option value="tourniquet">Жгут</Option>
                  <Option value="turnstile">Турникет</Option>
                  <Option value="bandage">Бандаж</Option>
                  <Option value="eyecup">Наглазник</Option>
                  <Option value="catheter">Катетер</Option>
                </Selector>
              </li>
            );
          })
        ) : (
          <Text size="small" color="dark" variant="small-caps">
            Укажи расположение ранений на схеме чтобы указать их тип
          </Text>
        )}
      </ul>
    </>
  );
};
