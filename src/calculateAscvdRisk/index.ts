import { framinghamCoxRegression } from './framinghamCoxRegression';
import { framinghamPoints } from './framinghamPoints';
import { pooledCohort2013 } from './pooledCohort2013';

/**
 * The methods for calculating ASCVD risk
 */
export type AscvdMethod =
  | 'by framingham (points)'
  | 'by framingham (cox regression)'
  | 'by pooled cohort 2013';

/**
 * The input data for calculating ASCVD risk
 * @property {number} age - The age of the patient in years
 * @property {boolean} isDiabetic - Whether or not the patient is diabetic
 * @property {boolean} isGeneticMale - Whether or not the patient is a male
 * @property {boolean} isBlack - Whether or not the patient is black
 * @property {boolean} isOnBloodPressureMeds - Whether or not the patient is on blood pressure medication
 * @property {boolean} isSmoker - Whether or not the patient is a smoker
 * @property {number} cholesterolTotal - The patient's total cholesterol in mg/dL
 * @property {number} cholesterolHDL - The patient's HDL cholesterol in mg/dL
 * @property {number} systolicBloodPressure - The patient's systolic blood pressure in mmHg
 */
export type AscvdData = {
  age: number;
  isDiabetic: boolean;
  isGeneticMale: boolean;
  isBlack: boolean;
  isOnBloodPressureMeds: boolean;
  isSmoker: boolean;
  cholesterolTotal: number;
  cholesterolHDL: number;
  systolicBloodPressure: number;
};

export type AsvdResult = {
  tenYrRisk: number;
};

/**
 * Calculates the ASCVD 10-year risk of a cardiovascular event
 * @param method {'by framingham (points)' | 'by framingham (cox regression)' | 'by pooled cohort 2013'} - The method to use to calculate ASCVD risk
 * @param data {AscvdData} - The data to use to calculate ASCVD risk. See AscvdData for more information.
 * @returns {number} - The calculated ASCVD 10-year risk of a cardiovascular event
 */
export const calculateAscvdRisk = (
  method: AscvdMethod,
  data: AscvdData
): number => {
  switch (method) {
    case 'by framingham (points)':
      return framinghamPoints(data);
    case 'by framingham (cox regression)':
      return framinghamCoxRegression(data);
    case 'by pooled cohort 2013':
      return pooledCohort2013(data);
    default:
      throw new Error(`Unknown method: ${method}`);
  }
};
