export type problemTypeEnum = "Traditional" | "Interaction" | "SubmitAnswer";
export const problemTypeList = ["Traditional", "Interaction", "SubmitAnswer"];
export type problemStatusEnum = "Public" | "Private";
export const problemStatusList = ["Public", "Private"];

export enum ProblemContentSectionType {
  Text = "Text",
  Sample = "Sample",
}

export interface ProblemContentSection {
  sectionTitle: string;
  type: ProblemContentSectionType;

  // If it's a text section, the sampleId is empty
  sampleId?: number;

  // If it's a sample section, the text is the explanation
  text?: string;
}

export interface ProblemSampleDataMember {
  inputData: string;
  outputData: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProblemSampleData extends Array<ProblemSampleDataMember> {}
