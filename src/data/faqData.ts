export interface FAQItem {
  id: string;
  category: 'Home Collection' | 'Reports & Accuracy' | 'Fasting & Prep' | 'Booking & Payment';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Home Collection',
    question: 'How does DiagnosticsFocus Free Home Sample Collection work?',
    answer: 'Once you book online or call our helpline (1800-425-0777), a certified and vaccinated DiagnosticsFocus phlebotomist is dispatched to your residence at your preferred morning slot. They arrive with sterile, pre-barcoded vacutainers and temperature-controlled gel cold-boxes to preserve sample stability.'
  },
  {
    id: 'faq-2',
    category: 'Home Collection',
    question: 'Are there any extra convenience charges for home sample collection?',
    answer: 'No, DiagnosticsFocus offers 100% Free Home Sample Collection for orders above ₹499 in all operational cities. For smaller individual tests under ₹499, a nominal ₹100 hygiene & transport fee applies.'
  },
  {
    id: 'faq-3',
    category: 'Reports & Accuracy',
    question: 'Are DiagnosticsFocus pathology laboratories NABL & CAP accredited?',
    answer: 'Yes. All central and regional processing labs operate under rigorous ISO 15189:2012 / NABL and CAP quality accreditations. We implement daily two-level internal quality controls (IQC) and participate in global external quality assurance schemes (EQAS).'
  },
  {
    id: 'faq-4',
    category: 'Reports & Accuracy',
    question: 'How quickly can I download my digital diagnostic test report?',
    answer: 'Most routine blood tests (such as CBC, Blood Sugar, LFT, KFT) are reported within 6 to 12 hours. Advanced hormone assays and vitamin tests are completed within 12 to 24 hours. You receive an instant SMS and WhatsApp notification with a direct download link once signed off by our MD Pathologist.'
  },
  {
    id: 'faq-5',
    category: 'Fasting & Prep',
    question: 'What tests require strict overnight fasting?',
    answer: 'Tests like Fasting Blood Sugar (FBS), Lipid Profile (Cholesterol & Triglycerides), and complete Health Packages require 10 to 12 hours of overnight fasting. You may drink plain water, but should avoid tea, coffee, milk, breakfast, or smoking before the blood draw.'
  },
  {
    id: 'faq-6',
    category: 'Fasting & Prep',
    question: 'Should I take my morning daily medicines before giving blood?',
    answer: 'Generally, continue your regular prescribed blood pressure or heart medications with a sip of water unless specifically directed by your doctor. For thyroid medication (e.g. Thyroxine), take the tablet only AFTER blood sample collection.'
  },
  {
    id: 'faq-7',
    category: 'Booking & Payment',
    question: 'What payment methods are supported by DiagnosticsFocus?',
    answer: 'You can pay online via UPI (Google Pay, PhonePe, Paytm), Credit/Debit cards, or choose Cash / QR Pay on Sample Collection directly to the phlebotomist.'
  },
  {
    id: 'faq-8',
    category: 'Booking & Payment',
    question: 'Can I upload my doctor prescription to book tests automatically?',
    answer: 'Yes! Simply click "Upload Prescription" on the top navigation bar. Our clinical support team will review the handwriting, identify all prescribed tests, and populate your booking cart within 15 minutes.'
  }
];
