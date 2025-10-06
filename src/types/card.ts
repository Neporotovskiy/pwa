export type Wound = {
  locator: {
    region: string;
    subregion: string;
  };
  type: string[];
  medicines: string[];
  equipments: string[];
};

export type Card = {
  triage: string;
  scheme: {
    projection: string;
    wounds: Wound[];
  };
  anthropometric: {
    weight: string;
    height: string;
    sex: number;
  };
  genetic: {
    blood: number;
    factor: string;
  };
  personal: {
    callsign: string;
  };
};
