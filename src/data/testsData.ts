export interface PathologyTest {
  id: string;
  slug: string;
  name: string;
  code: string;
  category: 'Routine' | 'Diabetes' | 'Thyroid' | 'Cardiac' | 'Liver' | 'Kidney' | 'Vitamins' | 'Allergy' | 'Immunity';
  price: number;
  originalPrice: number;
  discountPercent: number;
  tat: string;
  sampleType: string;
  fastingRequired: boolean;
  fastingDuration?: string;
  parametersCount: number;
  overview: string;
  parameters: {
    name: string;
    description: string;
    normalRange: string;
    unit: string;
  }[];
  clinicalSignificance: string[];
  whoShouldTake: string[];
  preparationInstructions: string[];
  popular?: boolean;
}

export const PATHOLOGY_TESTS: PathologyTest[] = [
  {
    id: 't1',
    slug: 'complete-blood-count-cbc',
    name: 'Complete Blood Count (CBC) with ESR',
    code: 'DF-HEM-101',
    category: 'Routine',
    price: 349,
    originalPrice: 650,
    discountPercent: 46,
    tat: 'Within 6 to 8 Hours',
    sampleType: 'Blood (EDTA Whole Blood)',
    fastingRequired: false,
    parametersCount: 24,
    popular: true,
    overview: 'The Complete Blood Count (CBC) is a comprehensive test that evaluates overall health and detects a wide variety of disorders, including anemia, infections, bleeding conditions, and leukemia.',
    parameters: [
      { name: 'Hemoglobin (Hb)', description: 'Oxygen carrying protein in red blood cells', normalRange: '13.0 - 17.0 (M) / 12.0 - 15.0 (F)', unit: 'g/dL' },
      { name: 'Total Leukocyte Count (TLC)', description: 'White blood cells that fight infection', normalRange: '4,000 - 11,000', unit: 'cells/cu.mm' },
      { name: 'Platelet Count', description: 'Blood cells vital for blood clotting', normalRange: '150,000 - 450,000', unit: 'cells/cu.mm' },
      { name: 'Red Blood Cell (RBC) Count', description: 'Total oxygen transporting cells', normalRange: '4.5 - 5.5', unit: 'million/cu.mm' },
      { name: 'Packed Cell Volume (PCV)', description: 'Percentage of whole blood made of RBCs', normalRange: '40 - 50', unit: '%' },
      { name: 'Mean Corpuscular Volume (MCV)', description: 'Average volume of red cells', normalRange: '80 - 100', unit: 'fL' },
      { name: 'Mean Corpuscular Hemoglobin (MCH)', description: 'Average amount of hemoglobin inside RBC', normalRange: '27 - 33', unit: 'pg' },
      { name: 'Erythrocyte Sedimentation Rate (ESR)', description: 'Marker for acute or chronic inflammation', normalRange: '0 - 15 (M) / 0 - 20 (F)', unit: 'mm/1st hr' },
      { name: 'Neutrophils', description: 'Primary defense against bacterial infection', normalRange: '40 - 75', unit: '%' },
      { name: 'Lymphocytes', description: 'Key components of immune system & viral defense', normalRange: '20 - 45', unit: '%' },
      { name: 'Monocytes', description: 'Phagocytic cells against cellular debris', normalRange: '2 - 10', unit: '%' },
      { name: 'Eosinophils', description: 'Cells involved in allergic response and parasites', normalRange: '1 - 6', unit: '%' },
      { name: 'Basophils', description: 'Inflammatory response cells', normalRange: '0 - 1', unit: '%' }
    ],
    clinicalSignificance: [
      'Detects iron-deficiency anemia, aplastic anemia, and sickle cell conditions.',
      'Identifies acute bacterial, viral, or fungal infections.',
      'Screens for clotting and bleeding disorders before major surgeries.',
      'Monitors chemotherapy and radiotherapy bone marrow response.'
    ],
    whoShouldTake: [
      'Individuals experiencing persistent fatigue, dizziness, or weakness.',
      'Patients with unexplained fever, recurrent infections, or chronic cough.',
      'Anyone undergoing pre-operative evaluation.',
      'Routine annual health monitoring.'
    ],
    preparationInstructions: [
      'No overnight fasting required unless ordered alongside fasting blood sugar.',
      'Stay well hydrated with clean water before sample collection.',
      'Inform the phlebotomist if you take blood thinning medication.'
    ]
  },
  {
    id: 't2',
    slug: 'thyroid-profile-total-t3-t4-tsh',
    name: 'Thyroid Profile Total (T3, T4, TSH Ultra-Sensitive)',
    code: 'DF-END-202',
    category: 'Thyroid',
    price: 499,
    originalPrice: 950,
    discountPercent: 47,
    tat: 'Within 12 Hours',
    sampleType: 'Blood (Serum Clot Activator)',
    fastingRequired: true,
    fastingDuration: '8-10 Hours Fasting Recommended',
    parametersCount: 3,
    popular: true,
    overview: 'Evaluates the functioning of the thyroid gland, regulating metabolic rate, energy production, body temperature, cardiovascular activity, and weight management.',
    parameters: [
      { name: 'Total Triiodothyronine (T3)', description: 'Active metabolic thyroid hormone', normalRange: '0.80 - 2.00', unit: 'ng/mL' },
      { name: 'Total Thyroxine (T4)', description: 'Primary prohormone released by thyroid', normalRange: '5.1 - 14.1', unit: 'ug/dL' },
      { name: 'Thyroid Stimulating Hormone (TSH)', description: 'Pituitary signal regulating thyroid hormone synthesis', normalRange: '0.27 - 4.20', unit: 'uIU/mL' }
    ],
    clinicalSignificance: [
      'Diagnoses Hypothyroidism (underactive) and Hyperthyroidism (overactive).',
      'Monitors dosage efficacy in patients taking Levothyroxine (Thyronorm/Eltroxin).',
      'Investigates menstrual irregularities, unexplained weight fluctuations, and hair loss.'
    ],
    whoShouldTake: [
      'People with sudden unexplained weight gain or weight loss.',
      'Individuals facing extreme cold intolerance, fatigue, or dry brittle skin.',
      'Women planning pregnancy or suffering from irregular menstrual cycles.',
      'Anyone with family history of thyroid autoimmune disorders.'
    ],
    preparationInstructions: [
      'Fasting for 8-10 hours is advised.',
      'Sample should preferably be drawn in the morning (between 7:00 AM - 10:00 AM) due to diurnal TSH variation.',
      'Take thyroid prescription medicines only after sample collection unless instructed by physician.'
    ]
  },
  {
    id: 't3',
    slug: 'hba1c-glycated-hemoglobin',
    name: 'HbA1c (Glycated Hemoglobin) by HPLC Method',
    code: 'DF-DIA-303',
    category: 'Diabetes',
    price: 399,
    originalPrice: 750,
    discountPercent: 46,
    tat: 'Within 6 to 8 Hours',
    sampleType: 'Blood (EDTA Whole Blood)',
    fastingRequired: false,
    parametersCount: 2,
    popular: true,
    overview: 'HbA1c measures the average blood glucose levels over the preceding 2 to 3 months (90 days). It is the gold standard clinical test for diabetes diagnosis and long-term glycemic management using High Performance Liquid Chromatography (HPLC).',
    parameters: [
      { name: 'HbA1c (% of Total Hb)', description: 'Percentage of glucose bound to red blood cells', normalRange: '< 5.7% (Normal), 5.7 - 6.4% (Prediabetes), >= 6.5% (Diabetes)', unit: '%' },
      { name: 'Estimated Average Glucose (eAG)', description: 'Calculated average daily blood sugar level', normalRange: '< 117 (Normal)', unit: 'mg/dL' }
    ],
    clinicalSignificance: [
      'Early detection of prediabetes before clinical symptoms occur.',
      'Determines whether diabetic management plan is successfully preventing long-term organ complications.',
      'Unaffected by short-term food intake, stress, or acute illness on the day of testing.'
    ],
    whoShouldTake: [
      'All adults above 30 years as routine screening.',
      'Patients diagnosed with Type 1 or Type 2 Diabetes (every 3 months).',
      'Individuals with high BMI, sedentary lifestyle, or family history of diabetes.'
    ],
    preparationInstructions: [
      'No fasting required. You can have your regular diet and beverages prior to the test.',
      'Can be taken at any time of the day.'
    ]
  },
  {
    id: 't4',
    slug: 'lipid-profile-complete-cardiac',
    name: 'Lipid Profile Comprehensive (Cholesterol & Triglycerides)',
    code: 'DF-CAR-404',
    category: 'Cardiac',
    price: 549,
    originalPrice: 1100,
    discountPercent: 50,
    tat: 'Within 10 to 12 Hours',
    sampleType: 'Blood (Serum Clot Activator)',
    fastingRequired: true,
    fastingDuration: '10-12 Hours Strict Fasting Required',
    parametersCount: 8,
    popular: true,
    overview: 'Assesses cardiovascular risk by quantifying good (HDL) and bad (LDL/VLDL) cholesterol fractions, triglycerides, and lipid risk ratios in the blood.',
    parameters: [
      { name: 'Total Cholesterol', description: 'Overall amount of cholesterol in the blood', normalRange: '< 200 (Desirable)', unit: 'mg/dL' },
      { name: 'HDL Cholesterol', description: 'High-Density Lipoprotein (Protective / Good)', normalRange: '> 40 (M) / > 50 (F)', unit: 'mg/dL' },
      { name: 'LDL Cholesterol', description: 'Low-Density Lipoprotein (Atherogenic / Bad)', normalRange: '< 100 (Optimal)', unit: 'mg/dL' },
      { name: 'Triglycerides', description: 'Main storage form of fat in the body', normalRange: '< 150 (Normal)', unit: 'mg/dL' },
      { name: 'VLDL Cholesterol', description: 'Very Low Density Lipoprotein', normalRange: '5 - 30', unit: 'mg/dL' },
      { name: 'Non-HDL Cholesterol', description: 'All atherogenic lipoproteins combined', normalRange: '< 130', unit: 'mg/dL' },
      { name: 'TC / HDL Ratio', description: 'Cardiac risk assessment index', normalRange: '3.3 - 4.4 (Average Risk)', unit: 'ratio' },
      { name: 'LDL / HDL Ratio', description: 'Atherosclerotic burden indicator', normalRange: '1.5 - 3.5', unit: 'ratio' }
    ],
    clinicalSignificance: [
      'Primary assessment of coronary artery disease, stroke, and peripheral arterial disease risks.',
      'Monitors efficacy of statin therapy and dietary interventions.',
      'Identifies familial hypercholesterolemia.'
    ],
    whoShouldTake: [
      'Individuals aged 25+ as part of routine annual preventative health.',
      'Smokers, individuals with hypertension or diabetes.',
      'Those with a family history of early heart attacks.'
    ],
    preparationInstructions: [
      'Strict 10-12 hours overnight fasting is mandatory (water permitted).',
      'Avoid high-fat meals and alcohol 24 hours prior to blood collection.'
    ]
  },
  {
    id: 't5',
    slug: 'liver-function-test-lft',
    name: 'Liver Function Test (LFT) with Enzymes & Proteins',
    code: 'DF-HEP-505',
    category: 'Liver',
    price: 499,
    originalPrice: 990,
    discountPercent: 49,
    tat: 'Within 10 Hours',
    sampleType: 'Blood (Serum Clot Activator)',
    fastingRequired: true,
    fastingDuration: '8-10 Hours Fasting Recommended',
    parametersCount: 11,
    popular: true,
    overview: 'Checks how well the liver is functioning by measuring blood levels of total bilirubin, liver enzymes (SGOT, SGPT, Alkaline Phosphatase), and protein production (Albumin, Globulin).',
    parameters: [
      { name: 'Bilirubin Total', description: 'Breakdown pigment of red blood cells', normalRange: '0.2 - 1.2', unit: 'mg/dL' },
      { name: 'Bilirubin Direct (Conjugated)', description: 'Bilirubin processed by liver cells', normalRange: '0.0 - 0.3', unit: 'mg/dL' },
      { name: 'Bilirubin Indirect', description: 'Unconjugated circulating bilirubin', normalRange: '0.2 - 0.8', unit: 'mg/dL' },
      { name: 'SGOT / AST', description: 'Aspartate aminotransferase enzyme', normalRange: '5 - 40', unit: 'U/L' },
      { name: 'SGPT / ALT', description: 'Alanine aminotransferase (liver-specific)', normalRange: '7 - 56', unit: 'U/L' },
      { name: 'Alkaline Phosphatase (ALP)', description: 'Biliary tract and bone enzyme', normalRange: '44 - 147', unit: 'U/L' },
      { name: 'Gamma Glutamyl Transferase (GGT)', description: 'Alcohol and biliary damage marker', normalRange: '9 - 48', unit: 'U/L' },
      { name: 'Total Protein', description: 'Overall blood proteins', normalRange: '6.0 - 8.3', unit: 'g/dL' },
      { name: 'Albumin', description: 'Primary protein synthesized by liver', normalRange: '3.5 - 5.5', unit: 'g/dL' },
      { name: 'Globulin', description: 'Immune and carrier proteins', normalRange: '2.0 - 3.5', unit: 'g/dL' },
      { name: 'A/G Ratio', description: 'Albumin to Globulin ratio', normalRange: '1.2 - 2.2', unit: 'ratio' }
    ],
    clinicalSignificance: [
      'Diagnoses hepatitis, jaundice, fatty liver disease (NAFLD), and liver cirrhosis.',
      'Detects adverse hepatic side effects of medications or chronic alcohol consumption.',
      'Identifies bile duct obstructions or gallstone issues.'
    ],
    whoShouldTake: [
      'Patients showing yellowish eyes/skin (jaundice), dark urine, or abdominal swelling.',
      'Regular alcohol consumers or patients taking long-term hepatotoxic drugs.',
      'Diabetic and obese individuals with suspected fatty liver.'
    ],
    preparationInstructions: [
      'Fasting for 8-10 hours is recommended.',
      'Refrain from alcohol consumption for 48 hours prior to test.'
    ]
  },
  {
    id: 't6',
    slug: 'kidney-function-test-kft-rft',
    name: 'Kidney Function Test (KFT / RFT) with Electrolytes',
    code: 'DF-REN-606',
    category: 'Kidney',
    price: 549,
    originalPrice: 1050,
    discountPercent: 47,
    tat: 'Within 8 to 10 Hours',
    sampleType: 'Blood (Serum Clot Activator)',
    fastingRequired: false,
    parametersCount: 9,
    popular: true,
    overview: 'Evaluates renal filtration efficiency, waste clearance, and body fluid electrolyte balance through blood urea, serum creatinine, uric acid, and key minerals.',
    parameters: [
      { name: 'Serum Creatinine', description: 'Muscle waste product cleared solely by kidneys', normalRange: '0.7 - 1.3 (M) / 0.5 - 1.1 (F)', unit: 'mg/dL' },
      { name: 'Blood Urea Nitrogen (BUN)', description: 'Nitrogenous waste product from protein breakdown', normalRange: '7 - 20', unit: 'mg/dL' },
      { name: 'Uric Acid', description: 'Breakdown product of purines (gout indicator)', normalRange: '3.5 - 7.2 (M) / 2.6 - 6.0 (F)', unit: 'mg/dL' },
      { name: 'eGFR (Calculated)', description: 'Estimated Glomerular Filtration Rate', normalRange: '> 90 (Normal)', unit: 'mL/min/1.73m2' },
      { name: 'Sodium (Na+)', description: 'Key electrolyte for blood pressure & fluid balance', normalRange: '136 - 145', unit: 'mmol/L' },
      { name: 'Potassium (K+)', description: 'Critical electrolyte for cardiac rhythm and muscles', normalRange: '3.5 - 5.1', unit: 'mmol/L' },
      { name: 'Chloride (Cl-)', description: 'Acid-base balance regulator', normalRange: '98 - 107', unit: 'mmol/L' }
    ],
    clinicalSignificance: [
      'Detects acute and chronic kidney disease (CKD) at early treatable stages.',
      'Monitors hypertensive and diabetic patients for nephropathy complications.',
      'Evaluates joint pain causes (gout from hyperuricemia).'
    ],
    whoShouldTake: [
      'People with high blood pressure, diabetes, or swelling in feet and ankles.',
      'Anyone with changes in urination frequency or foamy urine.',
      'Individuals taking regular painkillers or nephrotoxic therapies.'
    ],
    preparationInstructions: [
      'Fasting is not strictly required; stay hydrated with plain water.',
      'Avoid strenuous heavy weightlifting 24 hours prior as it raises creatinine.'
    ]
  },
  {
    id: 't7',
    slug: 'vitamin-d-25-hydroxy',
    name: 'Vitamin D 25-Hydroxy (Total 25-OH)',
    code: 'DF-VIT-707',
    category: 'Vitamins',
    price: 699,
    originalPrice: 1600,
    discountPercent: 56,
    tat: 'Within 12 to 16 Hours',
    sampleType: 'Blood (Serum Clot Activator)',
    fastingRequired: false,
    parametersCount: 1,
    popular: true,
    overview: 'Accurately quantifies total circulating 25-Hydroxy Vitamin D (D2 and D3), essential for calcium absorption, bone mineralization, neuromuscular strength, and immune defense.',
    parameters: [
      { name: '25-OH Vitamin D Total', description: 'Main storage form of Vitamin D in body', normalRange: '< 20 (Deficient), 20 - 30 (Insufficient), 30 - 100 (Sufficiency)', unit: 'ng/mL' }
    ],
    clinicalSignificance: [
      'Detects severe deficiency leading to osteomalacia, osteoporosis, and rickets.',
      'Addresses chronic generalized muscle aches, low back pain, and immune weakness.',
      'Monitors therapeutic supplementation dosing to prevent toxicity.'
    ],
    whoShouldTake: [
      'People spending majority of hours indoors or desk-bound with minimal sun exposure.',
      'Elderly individuals with osteopenia or bone fragility.',
      'Patients with unexplained chronic fatigue or recurrent infections.'
    ],
    preparationInstructions: [
      'No fasting required.',
      'Can be performed at any time of day.'
    ]
  },
  {
    id: 't8',
    slug: 'vitamin-b12-cyanocobalamin',
    name: 'Vitamin B12 (Cyanocobalamin / Active Cobalamin)',
    code: 'DF-VIT-808',
    category: 'Vitamins',
    price: 599,
    originalPrice: 1300,
    discountPercent: 53,
    tat: 'Within 12 Hours',
    sampleType: 'Blood (Serum Clot Activator)',
    fastingRequired: true,
    fastingDuration: '8-10 Hours Overnight Fasting Recommended',
    parametersCount: 1,
    popular: true,
    overview: 'Vitamin B12 is essential for central nervous system nerve myelin integrity, brain cognition, red blood cell synthesis, and DNA reproduction.',
    parameters: [
      { name: 'Vitamin B12', description: 'Serum Cobalamin concentration', normalRange: '211 - 911 (Normal), < 200 (Deficient)', unit: 'pg/mL' }
    ],
    clinicalSignificance: [
      'Detects megaloblastic anemia and peripheral neuropathies (numbness, pins & needles in feet/hands).',
      'Investigates memory lapses, brain fog, and chronic mood alterations.',
      'Crucial for vegetarians and vegans whose dietary sources of B12 are naturally restricted.'
    ],
    whoShouldTake: [
      'Strict vegetarians, vegans, or elderly with poor gut absorption.',
      'Patients taking long-term Metformin (diabetic drug) or proton pump inhibitors (antacids).',
      'People suffering from numbness, tingling sensations in fingers/toes.'
    ],
    preparationInstructions: [
      'Overnight fasting of 8-10 hours is advised.',
      'Avoid high-dose Vitamin B supplements 48 hours before testing.'
    ]
  },
  {
    id: 't9',
    slug: 'urine-routine-and-microscopic-examination',
    name: 'Urine Routine & Microscopic Examination (Urine R/M)',
    code: 'DF-URI-909',
    category: 'Routine',
    price: 199,
    originalPrice: 350,
    discountPercent: 43,
    tat: 'Within 4 to 6 Hours',
    sampleType: 'Urine (Clean Catch Mid-stream 20ml)',
    fastingRequired: false,
    parametersCount: 18,
    popular: false,
    overview: 'A physical, chemical, and microscopic analysis of urine to detect urinary tract infections (UTI), kidney disease, diabetes, and metabolic disturbances.',
    parameters: [
      { name: 'Color & Clarity', description: 'Visual appearance', normalRange: 'Pale Yellow / Clear', unit: 'visual' },
      { name: 'Specific Gravity', description: 'Urine concentration indicator', normalRange: '1.005 - 1.030', unit: 'index' },
      { name: 'pH', description: 'Acidity or alkalinity', normalRange: '4.5 - 8.0', unit: 'pH' },
      { name: 'Pus Cells (Leukocytes)', description: 'Infection indicator', normalRange: '0 - 5', unit: '/hpf' },
      { name: 'RBCs (Microscopic)', description: 'Blood in urine', normalRange: 'Nil / 0 - 2', unit: '/hpf' },
      { name: 'Urine Protein / Albumin', description: 'Kidney glomerular filter leak', normalRange: 'Nil / Negative', unit: 'qualitative' },
      { name: 'Urine Glucose', description: 'Excess blood sugar spilled into urine', normalRange: 'Negative', unit: 'qualitative' }
    ],
    clinicalSignificance: [
      'Rapid diagnosis of bacterial urinary tract infections (burning micturition).',
      'Early marker of nephrotic syndrome or glomerulonephritis via proteinuria.',
      'Identifies presence of urinary crystals and kidney stone risks.'
    ],
    whoShouldTake: [
      'Patients experiencing painful or frequent urination.',
      'Pre-employment and routine health checkups.',
      'Pregnant women during antenatal visits.'
    ],
    preparationInstructions: [
      'Collect clean-catch mid-stream urine in the sterile container provided by phlebotomist.',
      'First morning urine specimen is most concentrated and ideal.'
    ]
  }
];

export interface HealthPackage {
  id: string;
  slug: string;
  name: string;
  badge: string;
  parametersCount: number;
  price: number;
  originalPrice: number;
  discountPercent: number;
  tat: string;
  sampleType: string;
  fastingDuration: string;
  idealFor: string;
  ageGroup: string;
  gender: 'All' | 'Men' | 'Women' | 'Senior';
  tagline: string;
  overview: string;
  testCategories: {
    title: string;
    tests: string[];
  }[];
  keyBenefits: string[];
  popular?: boolean;
}

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'pkg-1',
    slug: 'focus-essential-health-package',
    name: 'DiagnosticsFocus Essential Health Package',
    badge: 'Most Popular for Young Adults',
    parametersCount: 64,
    price: 999,
    originalPrice: 2499,
    discountPercent: 60,
    tat: 'Within 12 Hours',
    sampleType: 'Blood & Urine',
    fastingDuration: '10-12 Hours Fasting Required',
    idealFor: 'Annual preventative screen for healthy individuals aged 18 - 40',
    ageGroup: '18 - 40 Years',
    gender: 'All',
    popular: true,
    tagline: 'Complete baseline health screening covering blood, sugar, heart, liver, and kidneys.',
    overview: 'Our foundational health package designed for young working professionals and families to detect hidden nutritional deficiencies, lifestyle imbalances, and metabolic risks before they progress.',
    testCategories: [
      {
        title: 'Complete Hemogram (24 Tests)',
        tests: ['Hemoglobin', 'TLC', 'DLC (5 differential counts)', 'Platelet Count', 'PCV', 'MCV', 'MCH', 'MCHC', 'RDW-CV', 'ESR']
      },
      {
        title: 'Diabetic Assessment (2 Tests)',
        tests: ['Fasting Blood Glucose', 'Average Blood Sugar Correlate']
      },
      {
        title: 'Lipid / Cardiac Profile (8 Tests)',
        tests: ['Total Cholesterol', 'HDL Good Cholesterol', 'LDL Bad Cholesterol', 'Triglycerides', 'VLDL', 'Non-HDL Cholesterol', 'TC/HDL Ratio', 'LDL/HDL Ratio']
      },
      {
        title: 'Liver Function Evaluation (11 Tests)',
        tests: ['Bilirubin Total & Direct', 'SGOT (AST)', 'SGPT (ALT)', 'Alkaline Phosphatase', 'Total Protein', 'Albumin', 'Globulin', 'A/G Ratio']
      },
      {
        title: 'Kidney & Renal Health (4 Tests)',
        tests: ['Serum Creatinine', 'Blood Urea Nitrogen', 'BUN/Creatinine Ratio', 'Uric Acid']
      },
      {
        title: 'Urine Routine & Microscopic (15 Tests)',
        tests: ['Color', 'pH', 'Specific Gravity', 'Proteins', 'Glucose', 'Ketones', 'Pus Cells', 'Epithelial Cells', 'Crystals', 'Casts']
      }
    ],
    keyBenefits: [
      'NABL & CAP certified automated testing protocols.',
      'Free doorstep sample collection at your scheduled time.',
      'Comprehensive digital report accessible online within 12 hours.',
      'Complimentary consultation voucher with certified general physician.'
    ]
  },
  {
    id: 'pkg-2',
    slug: 'focus-vital-advanced-full-body',
    name: 'DiagnosticsFocus Vital Advanced Full Body Care',
    badge: 'Bestseller Comprehensive',
    parametersCount: 86,
    price: 1899,
    originalPrice: 4800,
    discountPercent: 60,
    tat: 'Within 18 Hours',
    sampleType: 'Blood & Urine',
    fastingDuration: '10-12 Hours Fasting Required',
    idealFor: 'Comprehensive screening for working professionals and individuals aged 30+',
    ageGroup: '30 - 60 Years',
    gender: 'All',
    popular: true,
    tagline: 'Deep dive checkup including Vitamin D, B12, HbA1c, Thyroid, Cardiac, Liver, and Renal markers.',
    overview: 'The gold-standard full body package that expands on essential screening by adding critical bone & nerve vitamins (Vitamin D 25-OH and Vitamin B12) alongside the 90-day diabetic indicator HbA1c and Thyroid TSH.',
    testCategories: [
      {
        title: 'Vitamins & Bone Health (3 Tests)',
        tests: ['Vitamin D Total (25-OH)', 'Vitamin B12 (Cyanocobalamin)', 'Serum Calcium Total']
      },
      {
        title: 'Diabetic & Glycemic Health (3 Tests)',
        tests: ['HbA1c Glycated Hemoglobin', 'Estimated Average Glucose (eAG)', 'Fasting Blood Sugar']
      },
      {
        title: 'Thyroid Panel (3 Tests)',
        tests: ['T3 Total', 'T4 Total', 'TSH Ultra-Sensitive']
      },
      {
        title: 'Complete Blood Count & ESR (24 Tests)',
        tests: ['CBC Complete Hemogram with 5-part Differential & Platelet Indices']
      },
      {
        title: 'Lipid Cardiovascular Risk (8 Tests)',
        tests: ['Full Lipid Profile with atherogenic non-HDL and ratios']
      },
      {
        title: 'Liver Function Comprehensive (12 Tests)',
        tests: ['LFT with Bilirubin fractions, SGOT, SGPT, ALP, GGT & Proteins']
      },
      {
        title: 'Kidney Function & Electrolytes (8 Tests)',
        tests: ['Creatinine, BUN, Uric Acid, eGFR, Sodium, Potassium, Chloride']
      },
      {
        title: 'Complete Urine Analysis (18 Tests)',
        tests: ['Full Routine, Microscopic & Chemical screening']
      }
    ],
    keyBenefits: [
      'Covers 86 high-impact parameters across 8 vital organ systems.',
      'Identifies silent vitamin deficiencies causing lethargy and bone pain.',
      'Evaluates long-term diabetic risk via HPLC HbA1c technology.',
      'Free phlebotomy home visit + doctor teleconsultation included.'
    ]
  },
  {
    id: 'pkg-3',
    slug: 'focus-senior-citizen-care-comprehensive',
    name: 'DiagnosticsFocus Senior Citizen Wellness (60+)',
    badge: 'Specialized for Seniors',
    parametersCount: 96,
    price: 2499,
    originalPrice: 6500,
    discountPercent: 61,
    tat: 'Within 24 Hours',
    sampleType: 'Blood & Urine',
    fastingDuration: '10-12 Hours Fasting Required',
    idealFor: 'Senior citizens requiring in-depth joint, heart, liver, kidney, and cancer risk markers',
    ageGroup: '55+ Years',
    gender: 'All',
    popular: true,
    tagline: 'Tailored specifically for older adults with gentle home sample collection and organ markers.',
    overview: 'A deeply compassionate, clinical-grade diagnostic checkup crafted by geriatric specialists. It monitors cardiac strain, bone density loss, prostate / inflammatory markers, electrolytes, and chronic medication safety.',
    testCategories: [
      {
        title: 'Cardiac & Inflammatory Markers (10 Tests)',
        tests: ['High-Sensitivity CRP (hs-CRP)', 'Lipid Profile 8 parameters', 'Homocysteine']
      },
      {
        title: 'Bone, Joint & Vitamin Profile (5 Tests)',
        tests: ['Vitamin D 25-OH', 'Vitamin B12', 'Serum Calcium', 'Phosphorus Inorganic', 'Alkaline Phosphatase']
      },
      {
        title: 'Renal & Electrolyte Balance (8 Tests)',
        tests: ['Serum Creatinine', 'BUN', 'Uric Acid', 'eGFR', 'Sodium', 'Potassium', 'Chloride', 'BUN/Creatinine Ratio']
      },
      {
        title: 'Liver & Hepatic Safety (12 Tests)',
        tests: ['Full LFT with GGT, SGOT, SGPT, Bilirubin & Proteins']
      },
      {
        title: 'Diabetes & Metabolism (3 Tests)',
        tests: ['HbA1c with eAG and Fasting Glucose']
      },
      {
        title: 'Thyroid Panel (3 Tests)',
        tests: ['T3, T4, TSH Ultra-Sensitive']
      },
      {
        title: 'Hemogram & Immune Aging (24 Tests)',
        tests: ['Complete CBC with ESR']
      },
      {
        title: 'Urine Analysis (18 Tests)',
        tests: ['Full Microscopic & Chemical screen for kidney protein loss']
      }
    ],
    keyBenefits: [
      'Phlebotomists specially trained in delicate, painless geriatric blood draw.',
      'Includes inflammatory hs-CRP for hidden cardiovascular and joint inflammation.',
      'Free priority report delivery with large-print readable report summary.',
      '100% money-back accuracy guarantee on all automated analyzers.'
    ]
  },
  {
    id: 'pkg-4',
    slug: 'focus-women-wellness-advance',
    name: 'DiagnosticsFocus Women Wellness Advanced Profile',
    badge: 'Tailored for Women',
    parametersCount: 78,
    price: 2199,
    originalPrice: 5500,
    discountPercent: 60,
    tat: 'Within 20 Hours',
    sampleType: 'Blood & Urine',
    fastingDuration: '10-12 Hours Fasting Required',
    idealFor: 'Women aged 20-55 managing hormonal balance, anemia, fatigue, and thyroid',
    ageGroup: '20 - 55 Years',
    gender: 'Women',
    popular: false,
    tagline: 'Covers Ferritin (Iron stores), Thyroid, Hormones, Vitamin D, B12, and complete organ function.',
    overview: 'Specifically formulated for female physiology addressing widespread iron deficiency anemia, hormonal weight fluctuations (PCOS / thyroid), bone demineralization, and metabolic health.',
    testCategories: [
      {
        title: 'Iron Stores & Anemia Deep Screen (6 Tests)',
        tests: ['Serum Ferritin', 'Serum Iron', 'Total Iron Binding Capacity (TIBC)', 'Transferrin Saturation %', 'Hemoglobin', 'RBC Indices']
      },
      {
        title: 'Thyroid & Endocrine Function (3 Tests)',
        tests: ['T3, T4, TSH Ultra-Sensitive']
      },
      {
        title: 'Bone Strength & Vital Vitamins (3 Tests)',
        tests: ['Vitamin D (25-OH)', 'Vitamin B12', 'Serum Calcium']
      },
      {
        title: 'Diabetic & Lipid Health (11 Tests)',
        tests: ['HbA1c', 'eAG', 'Fasting Blood Glucose', 'Complete Lipid Panel']
      },
      {
        title: 'Liver & Kidney Profiling (19 Tests)',
        tests: ['LFT and KFT panels']
      },
      {
        title: 'Routine Hemogram & Urine (36 Tests)',
        tests: ['CBC + ESR and Complete Urine Examination']
      }
    ],
    keyBenefits: [
      'Comprehensive iron study to pinpoint latent tissue iron exhaustion.',
      'Helps evaluate causes of severe fatigue, hair loss, and mood changes.',
      'Includes guidance on menstrual timing for blood test collection.'
    ]
  }
];
