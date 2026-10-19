export interface TestResultParameter {
  name: string;
  observedValue: string;
  unit: string;
  referenceInterval: string;
  flag?: 'NORMAL' | 'HIGH' | 'LOW';
  interpretation?: string;
}

export interface PatientReport {
  id: string;
  bookingId: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  email: string;
  referringDoctor: string;
  collectionDate: string;
  reportingDate: string;
  testTitle: string;
  barCode: string;
  labLocation: string;
  pathologist: string;
  pathologistReg: string;
  status: 'Report Ready' | 'Processing';
  parameters: TestResultParameter[];
  overallSummary: string;
}

export const SAMPLE_REPORTS: PatientReport[] = [
  {
    id: 'REP-2026-901',
    bookingId: 'DF-884920',
    patientName: 'Aman Kumar',
    age: 32,
    gender: 'Male',
    mobile: '9876543210',
    email: 'aman.kumar@example.com',
    referringDoctor: 'Dr. Rajesh Sharma, MD (Med)',
    collectionDate: '16-Oct-2026 07:45 AM',
    reportingDate: '16-Oct-2026 04:30 PM',
    testTitle: 'Complete Hemogram & Metabolic Profile',
    barCode: 'DF-BAR-992100481',
    labLocation: 'DiagnosticsFocus Central Reference Lab - NABL Accredited',
    pathologist: 'Dr. Sunita V. Deshmukh, MD Pathology',
    pathologistReg: 'MCI-REG-847291',
    status: 'Report Ready',
    overallSummary: 'All vital hematological and metabolic parameters within standard clinical limits. Mild Vitamin D insufficiency observed; oral cholecalciferol supplementation recommended under clinical supervision.',
    parameters: [
      { name: 'Hemoglobin (Hb)', observedValue: '14.8', unit: 'g/dL', referenceInterval: '13.0 - 17.0', flag: 'NORMAL' },
      { name: 'Total Leukocyte Count (TLC)', observedValue: '6,800', unit: 'cells/cu.mm', referenceInterval: '4,000 - 11,000', flag: 'NORMAL' },
      { name: 'Platelet Count', observedValue: '280,000', unit: 'cells/cu.mm', referenceInterval: '150,000 - 450,000', flag: 'NORMAL' },
      { name: 'Erythrocyte Sedimentation Rate (ESR)', observedValue: '8', unit: 'mm/1st hr', referenceInterval: '0 - 15', flag: 'NORMAL' },
      { name: 'Fasting Blood Glucose', observedValue: '88', unit: 'mg/dL', referenceInterval: '70 - 99', flag: 'NORMAL' },
      { name: 'HbA1c (HPLC)', observedValue: '5.3', unit: '%', referenceInterval: '< 5.7', flag: 'NORMAL' },
      { name: 'Total Cholesterol', observedValue: '178', unit: 'mg/dL', referenceInterval: '< 200', flag: 'NORMAL' },
      { name: 'Serum Creatinine', observedValue: '0.92', unit: 'mg/dL', referenceInterval: '0.7 - 1.3', flag: 'NORMAL' },
      { name: 'SGPT / ALT (Liver)', observedValue: '26', unit: 'U/L', referenceInterval: '7 - 56', flag: 'NORMAL' },
      { name: '25-OH Vitamin D', observedValue: '22.4', unit: 'ng/mL', referenceInterval: '30.0 - 100.0', flag: 'LOW', interpretation: 'Insufficient circulating levels. Sunlight exposure or supplementation advised.' },
      { name: 'Vitamin B12', observedValue: '480', unit: 'pg/mL', referenceInterval: '211 - 911', flag: 'NORMAL' },
      { name: 'TSH Ultra-Sensitive', observedValue: '2.14', unit: 'uIU/mL', referenceInterval: '0.27 - 4.20', flag: 'NORMAL' }
    ]
  },
  {
    id: 'REP-2026-902',
    bookingId: 'DF-109281',
    patientName: 'Priya Mehra',
    age: 46,
    gender: 'Female',
    mobile: '9812345678',
    email: 'priya.mehra@example.com',
    referringDoctor: 'Dr. Ananya Sen, MD (Endocrinology)',
    collectionDate: '15-Oct-2026 08:15 AM',
    reportingDate: '15-Oct-2026 06:10 PM',
    testTitle: 'Thyroid & Diabetic Surveillance Panel',
    barCode: 'DF-BAR-339918274',
    labLocation: 'DiagnosticsFocus National Reference Center - NABL Accredited',
    pathologist: 'Dr. Vivek R. Iyer, MD Pathology',
    pathologistReg: 'MCI-REG-391820',
    status: 'Report Ready',
    overallSummary: 'Elevated TSH with borderline free T4, consistent with primary hypothyroidism. Blood glucose well managed.',
    parameters: [
      { name: 'TSH Ultra-Sensitive', observedValue: '6.85', unit: 'uIU/mL', referenceInterval: '0.27 - 4.20', flag: 'HIGH', interpretation: 'Elevated TSH indicates underactive thyroid gland.' },
      { name: 'Total T3', observedValue: '1.10', unit: 'ng/mL', referenceInterval: '0.80 - 2.00', flag: 'NORMAL' },
      { name: 'Total T4', observedValue: '5.4', unit: 'ug/dL', referenceInterval: '5.1 - 14.1', flag: 'NORMAL' },
      { name: 'HbA1c (Glycated Hb)', observedValue: '5.8', unit: '%', referenceInterval: '< 5.7', flag: 'HIGH', interpretation: 'Prediabetes range (5.7 - 6.4%). Lifestyle counseling advised.' },
      { name: 'Estimated Average Glucose', observedValue: '120', unit: 'mg/dL', referenceInterval: '< 117', flag: 'HIGH' }
    ]
  }
];
