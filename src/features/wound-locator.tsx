import { OptionHTMLAttributes, SyntheticEvent, useEffect, useState } from 'react';

import { FrontProjection } from 'components/anatomy-schemas/front-projection';
import type { Descriptor } from 'components/anatomy-schemas/types';
import { Text } from 'components/text';
import { Selector, Option } from 'components/selector';

import styles from './wound-locator.module.css';

const OPTIONS: Partial<OptionHTMLAttributes<HTMLOptionElement>>[] = [
  { value: 'Вентральная', children: 'Вентральная' },
  { value: 'Сагиттальная прав.', children: 'Сагиттальная прав.' },
  { value: 'Дорсальная', children: 'Дорсальная' },
  { value: 'Сагиттальная лев.', children: 'Сагиттальная лев.' },
];

const WOUND_TYPE_GROUPS: {
  name: string;
  options: Partial<OptionHTMLAttributes<HTMLOptionElement>>[];
}[] = [
  {
    name: 'Травмы',
    options: [
      { value: 'Рана', children: 'Рана' },
      { value: 'Ампутация', children: 'Ампутация' },
      { value: 'Ожог', children: 'Ожог' },
    ],
  },
  {
    name: 'Оборудование',
    options: [
      { value: 'Жгут', children: 'Жгут' },
      { value: 'Турникет', children: 'Турникет' },
      { value: 'Бандаж', children: 'Бандаж' },
      { value: 'Наглазник', children: 'Наглазник' },
      { value: 'Катетер', children: 'Катетер' },
    ],
  },
  {
    name: 'Препараты',
    options: [
      { value: 'Обезболивающее', children: 'Обезболивающее' },
      { value: 'Противошоковое', children: 'Противошоковое' },
      { value: 'Противоожоговое', children: 'Противоожоговое' },
      { value: 'Антисептик', children: 'Антисептик' },
    ],
  },
];

export const WoundLocator = () => {
  const [projection, setProjection] = useState<
    Partial<OptionHTMLAttributes<HTMLOptionElement>>['value']
  >(OPTIONS[0].value);

  const [selectedRegionsDescriptors, setSelectedRegionsDescriptors] = useState<Descriptor[]>([]);

  const changeProjection = (event: SyntheticEvent<HTMLSelectElement>): void => {
    const { value } = event.target as HTMLSelectElement;
    setProjection(value);
  };

  const changeSelectedRegions = (descriptors: Descriptor[]): void => {
    setSelectedRegionsDescriptors(descriptors);
  };

  return (
    <>
      <Text as="h2" size="medium" color="white" variant="small-caps" className={styles.title}>
        Локализация и типы ранений
      </Text>
      <Selector
        id="projection"
        name="Раны.Проекция"
        data-label="Проекция схемы"
        value={projection}
        onChange={changeProjection}
      >
        {OPTIONS.map(({ children, ...other }) => (
          <Option key={other.value as string} {...other}>
            {children}
          </Option>
        ))}
      </Selector>
      <div className={styles.projection}>
        <Text size="small" color="white" variant="small-caps">
          Схема локализации ранений
        </Text>
        <div className={styles.canvas}>
          <FrontProjection
            selectedRegionsDescriptors={selectedRegionsDescriptors}
            onRegionSelect={changeSelectedRegions}
          />
        </div>
      </div>
      <ul className={styles.wounds}>
        <Text size="medium" color="white" variant="small-caps">
          Типы ранений
        </Text>
        {selectedRegionsDescriptors.length > 0 ? (
          selectedRegionsDescriptors.map((descriptor) => (
            <li key={`${descriptor.region}, ${descriptor.subregion}`} className={styles.wound}>
              <Selector
                id={`${descriptor.region}, ${descriptor.subregion}`}
                name={`Раны.${
                  descriptor.region === descriptor.subregion
                    ? descriptor.region
                    : `${descriptor.region}, ${descriptor.subregion}`
                }`}
                data-label={
                  descriptor.region === descriptor.subregion
                    ? descriptor.region
                    : `${descriptor.region}, ${descriptor.subregion}`
                }
                defaultValue={WOUND_TYPE_GROUPS[0].options[0].value}
              >
                {WOUND_TYPE_GROUPS.map(({ name, options }) => (
                  <optgroup key={name} label={name}>
                    {options.map(({ children, ...other }) => (
                      <Option key={other.value as string} {...other}>
                        {children}
                      </Option>
                    ))}
                  </optgroup>
                ))}
              </Selector>
            </li>
          ))
        ) : (
          <Text size="small" color="dark" variant="small-caps">
            Укажи расположение ранений на схеме чтобы указать их тип
          </Text>
        )}
      </ul>
    </>
  );
};
