import { useCallback } from 'react';
import type { PointerEvent } from 'react';

import type { Descriptor } from './types';

import styles from './projections.module.css';

type Props = {
  selectedRegionsDescriptors: Descriptor[];
  onRegionSelect: (selectedRegionsDescriptors: Descriptor[]) => void;
};

export const FrontProjection = ({ selectedRegionsDescriptors = [], onRegionSelect }: Props) => {
  const select = useCallback(
    ({ target, currentTarget }: PointerEvent<SVGGElement>) => {
      const regionNode = currentTarget as SVGGElement;
      const subregionNode = target as SVGGElement;
      const region = regionNode.getAttribute('id')!;
      const subregion = subregionNode.getAttribute('id')!;

      if (subregionNode.getAttribute('data-selected') === 'true') {
        const filtered = selectedRegionsDescriptors.filter(
          (descriptor) => descriptor.region !== region || descriptor.subregion !== subregion,
        );
        onRegionSelect(filtered);
        return;
      }

      onRegionSelect([...selectedRegionsDescriptors, { region, subregion }]);
    },
    [selectedRegionsDescriptors, onRegionSelect],
  );

  const isSubregionSelected = (region: string, subregion: string) =>
    selectedRegionsDescriptors.some(
      (descriptor) => descriptor.region === region && descriptor.subregion === subregion,
    );

  return (
    <svg
      width="254"
      height="571"
      viewBox="0 0 254 571"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Левая нога" onPointerDown={select}>
        <path
          id="Бедро"
          className={styles.subregion}
          data-selected={isSubregionSelected('Левая нога', 'Бедро')}
          d="M132 299.507C132 310.92 135.272 328.659 137 344.507C138.109 354.673 136.044 364.016 140.439 370.556C144.201 376.154 149.535 379.644 157.073 379.69C166.641 379.651 172 374.507 177 354.507C195.826 279.204 173 255.507 169 242.507C144 270.507 147 285.507 132 299.507Z"
        />
        <path
          id="Колено"
          className={styles.subregion}
          data-selected={isSubregionSelected('Левая нога', 'Колено')}
          d="M137 374.507C141.742 380.48 150.467 384.507 157 384.507C163.67 384.507 167.751 382.012 171 378.507C167.773 386.995 168.984 396.553 170.984 402.538C163.926 409.003 145.025 406.503 137 401.477C135 396.495 137 374.507 137 374.507Z"
        />
        <path
          id="Голень"
          className={styles.subregion}
          data-selected={isSubregionSelected('Левая нога', 'Голень')}
          d="M172.001 407.53C170 416.507 171.109 421.515 171.967 429.467C172.081 459.508 160 472.507 159 499.507C151.228 504.236 145.444 505.422 137 499.507C139.998 481.512 136 456.507 135 436.507C135 422.507 142 419.507 137 406.507C145 411.507 164 412.507 172.001 407.53Z"
        />
        <path
          id="Стопа"
          className={styles.subregion}
          data-selected={isSubregionSelected('Левая нога', 'Стопа')}
          d="M159 503.507C155 517.507 180 542.507 177 549.507C165 572.507 159 572.507 152 564.507C145 557.507 147 549.507 141.851 527.411C130 522.507 137 515.507 137 503.507C145.688 510.661 152.967 506.755 159 503.507Z"
        />
      </g>

      <g id="Правая нога" onPointerDown={select}>
        <path
          id="Бедро"
          className={styles.subregion}
          data-selected={isSubregionSelected('Правая нога', 'Бедро')}
          d="M122 299.507C122 310.92 118.728 328.659 117 344.507C115.891 354.673 117.956 364.016 113.561 370.556C109.799 376.154 104.465 379.644 96.9271 379.69C87.3589 379.651 82 374.507 77 354.507C58.1742 279.204 81 255.507 85 242.507C110 270.507 107 285.507 122 299.507Z"
        />
        <path
          id="Колено"
          className={styles.subregion}
          data-selected={isSubregionSelected('Правая нога', 'Колено')}
          d="M117 374.507C112.258 380.48 103.533 384.507 97 384.507C90.3304 384.507 86.2489 382.012 83 378.507C86.2267 386.995 85.0163 396.553 83.0156 402.538C90.0742 409.003 108.975 406.503 117 401.477C119 396.495 117 374.507 117 374.507Z"
        />
        <path
          id="Голень"
          className={styles.subregion}
          data-selected={isSubregionSelected('Правая нога', 'Голень')}
          d="M81.9995 407.53C84 416.507 82.8912 421.515 82.0332 429.467C81.9193 459.508 94 472.507 95 499.507C102.772 504.236 108.556 505.422 117 499.507C114.002 481.512 118 456.507 119 436.507C119 422.507 112 419.507 117 406.507C109 411.507 90 412.507 81.9995 407.53Z"
        />
        <path
          id="Стопа"
          className={styles.subregion}
          data-selected={isSubregionSelected('Правая нога', 'Стопа')}
          d="M95 503.507C99 517.507 74 542.507 77 549.507C89 572.507 95 572.507 102 564.507C109 557.507 107 549.507 112.149 527.411C124 522.507 117 515.507 117 503.507C108.312 510.661 101.033 506.755 95 503.507Z"
        />
      </g>

      <g id="Левая рука" onPointerDown={select}>
        <path
          id="Плечо"
          className={styles.subregion}
          data-selected={isSubregionSelected('Левая рука', 'Плечо')}
          d="M181 98.5068C186 98.5068 212 99.5068 207 149.507C212 179.507 212 202.507 202 202.507C192 202.507 180 202.507 180 149.507C181 124.507 181 124.507 181 98.5068Z"
        />
        <path
          id="Предплечье"
          className={styles.subregion}
          data-selected={isSubregionSelected('Левая рука', 'Предплечье')}
          d="M210 201.507C216 211.507 219.436 214.171 221 234.507C222 247.507 227.088 259.456 226.993 266.821C226.842 278.562 216.525 277.901 212 274.507C208 271.507 208 256.507 193 234.507C185 219.507 188 209.507 185 199.507C188.989 204.382 191 206.507 199 206.507C207 207.507 209.443 204.02 210 201.507Z"
        />
        <path
          id="Кисть"
          className={styles.subregion}
          data-selected={isSubregionSelected('Левая рука', 'Кисть')}
          d="M254 292.507C249 296.507 245 291.507 242 289.507C243 294.507 254 312.507 247 316.507C231.038 325.628 219 312.507 214 299.507C212 289.507 212 289.507 211 279.507C224 285.507 231 276.507 231 271.507C237 276.507 241 275.507 245 279.507C249 286.507 252 289.507 254 292.507Z"
        />
      </g>

      <g id="Правая рука" onPointerDown={select}>
        <path
          id="Плечо"
          className={styles.subregion}
          data-selected={isSubregionSelected('Правая рука', 'Плечо')}
          d="M73 98.5068C68 98.5068 42 99.5068 47 149.507C42 179.507 42 202.507 52 202.507C62 202.507 74 202.507 74 149.507C73 124.507 73 124.507 73 98.5068Z"
        />
        <path
          id="Предплечье"
          className={styles.subregion}
          data-selected={isSubregionSelected('Правая рука', 'Предплечье')}
          d="M44 201.507C38 211.507 34.5643 214.171 33 234.507C32 247.507 26.9123 259.456 27.007 266.821C27.1579 278.562 37.4745 277.901 42 274.507C46 271.507 46 256.507 61 234.507C69 219.507 66 209.507 69 199.507C65.0111 204.382 63 206.507 55 206.507C47 207.507 44.5568 204.02 44 201.507Z"
        />
        <path
          id="Кисть"
          className={styles.subregion}
          data-selected={isSubregionSelected('Правая рука', 'Кисть')}
          d="M0 292.507C5 296.507 9 291.507 12 289.507C11 294.507 0 312.507 7 316.507C22.9625 325.628 35 312.507 40 299.507C42 289.507 42 289.507 43 279.507C30 285.507 23 276.507 23 271.507C17 276.507 13 275.507 9 279.507C5 286.507 2 289.507 0 292.507Z"
        />
      </g>

      <path
        id="Голова"
        className={styles.subregion}
        data-selected={isSubregionSelected('Голова', 'Голова')}
        onPointerDown={select}
        d="M107.048 56.5062C107.046 51.4792 106.047 51.5549 104.038 51.538C102.029 51.5211 100.025 39.496 101.955 41.5127C103.886 43.5294 102.104 31.487 102.089 26.5007C102.075 21.5144 104.866 14.5578 108.991 9.51904C113.116 4.48032 122.056 1.5767 127.008 1.50133C131.96 1.42596 140.877 4.5572 145.06 9.48182C149.634 14.8671 152.013 21.5349 152.007 26.55C152.002 31.5651 150.01 43.4951 152.027 41.49C154.014 39.5146 152.035 51.5142 150.006 51.5067C147.977 51.4992 146.979 51.5273 147.049 56.5037C147.119 61.48 140.004 76.5363 127.01 76.5307C114.006 76.4879 107.05 61.5332 107.048 56.5062Z"
      />

      <path
        id="Шея"
        className={styles.subregion}
        data-selected={isSubregionSelected('Шея', 'Шея')}
        onPointerDown={select}
        d="M107 86.5068C101.976 91.4307 85 96.5068 85 96.5068C85 96.5068 111.972 101.526 126.998 101.505C142.176 101.484 169 96.5068 169 96.5068C169 96.5068 152.172 91.578 147 86.5068C141.068 80.6895 147 68.5068 147 68.5068C147 68.5068 139.938 80.5217 127 80.5068C114.042 80.4919 107 68.5068 107 68.5068C107 68.5068 112.934 80.691 107 86.5068Z"
      />

      <g id="Туловище" onPointerDown={select}>
        <path
          id="Грудь"
          className={styles.subregion}
          data-selected={isSubregionSelected('Туловище', 'Грудь')}
          d="M76.9937 98.4792C77.0234 138.46 76.9857 164.481 87.0217 204.507C107.037 199.54 107.038 173.633 127 173.507C147.329 173.379 146.993 199.529 167.009 204.518C177.086 169.558 177 138.507 177.012 98.5075C137 107.507 117 107.507 76.9937 98.4792Z"
        />
        <path
          id="Живот"
          className={styles.subregion}
          data-selected={isSubregionSelected('Туловище', 'Живот')}
          d="M89 209.507C92 219.507 87.016 224.515 87.003 234.516C97.0108 247.847 157.004 247.829 166.993 234.511C167.003 224.505 162 219.507 165 209.507C144 202.507 144 178.507 127 178.507C110 178.507 110 202.507 89 209.507Z"
        />
        <path
          id="Пах"
          className={styles.subregion}
          data-selected={isSubregionSelected('Туловище', 'Пах')}
          d="M92 243.507C107 258.507 117 294.507 127 294.507C137 294.507 144.565 260.941 162 243.507C144 251.507 110 251.507 92 243.507Z"
        />
      </g>
    </svg>
  );
};
