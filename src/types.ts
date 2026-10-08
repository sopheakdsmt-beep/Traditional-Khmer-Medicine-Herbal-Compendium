export type Humoral = "hot" | "cold" | "neutral";
export type Lang = "kh" | "en";
export type PlateView = "habit" | "section";
export type WarningSeverity = "contraindication" | "interaction" | "caution";

export type Warning = {
  severity: WarningSeverity;
  tagKh: string;
  tagEn: string;
  detailKh: string;
  detailEn: string;
};

export type Preparation = {
  id: string;
  nameKh: string;
  nameEn: string;
  formKh: string;
  formEn: string;
  stepsKh: string[];
  stepsEn: string[];
  doseKh: string;
  doseEn: string;
  courseKh: string;
  courseEn: string;
};

export type AnatomyCallout = {
  id: string;
  labelKh: string;
  labelEn: string;
  noteKh: string;
  noteEn: string;
  /** Position of the marker, as percentages of the section diagram. */
  x: number;
  y: number;
};

export type SectionKind = "rhizome" | "leaf" | "fruit" | "succulent";

export type Plant = {
  id: string;
  plate: string;
  khmer: string;
  roman: string;
  aliases: string[];
  latin: string;
  family: string;
  english: string;
  humoral: Humoral;
  tasteKh: string;
  tasteEn: string;
  partsKh: string;
  partsEn: string;
  habitatKh: string;
  habitatEn: string;
  identifyKh: string;
  identifyEn: string;
  ailments: string[];
  preparations: Preparation[];
  warnings: Warning[];
  /** Other plant ids that traditional pairing treats as opposing in one decoction. */
  clashesWith: string[];
  clashKh: string;
  clashEn: string;
  section: SectionKind;
  anatomy: AnatomyCallout[];
};

export type Ailment = {
  id: string;
  khmer: string;
  english: string;
  qualityKh: string;
  qualityEn: string;
};

export type FormulaPattern = {
  id: string;
  ailmentId: string;
  nameKh: string;
  nameEn: string;
  plantIds: string[];
  useKh: string;
  useEn: string;
};
