export interface LabLocation {
  id: string;
  name: string;
  centerType: 'Regional Reference Lab' | 'Pathology Processing Hub' | 'Collection Center';
  city: string;
  address: string;
  pincode: string;
  phone: string;
  timings: string;
  services: string[];
  nablCertified: boolean;
  homeCollectionAvailable: boolean;
  distanceKm?: number;
}

export const CITIES = [
  'All Cities',
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad'
];

export const LAB_LOCATIONS: LabLocation[] = [
  {
    id: 'lab-mum-1',
    name: 'DiagnosticsFocus Central Reference Lab - Andheri West',
    centerType: 'Regional Reference Lab',
    city: 'Mumbai',
    address: 'Ground Floor, Prime Medical Plaza, Link Road, Andheri West',
    pincode: '400053',
    phone: '+91 22 4910 8800',
    timings: 'Mon - Sun: 06:30 AM - 09:30 PM',
    services: ['Pathology Testing', 'Biochemistry', 'Molecular PCR', 'ECG', 'Home Collection', 'Corporate Health'],
    nablCertified: true,
    homeCollectionAvailable: true,
    distanceKm: 1.8
  },
  {
    id: 'lab-mum-2',
    name: 'DiagnosticsFocus Diagnostic Center - Dadar Central',
    centerType: 'Pathology Processing Hub',
    city: 'Mumbai',
    address: 'Shop 4-6, Silver Arch Heights, Gokhale Road, Dadar West',
    pincode: '400028',
    phone: '+91 22 4910 8820',
    timings: 'Mon - Sat: 07:00 AM - 08:30 PM | Sun: 07:00 AM - 02:00 PM',
    services: ['Routine Blood Tests', 'HbA1c & Diabetes', 'ECG', 'Home Collection'],
    nablCertified: true,
    homeCollectionAvailable: true,
    distanceKm: 3.4
  },
  {
    id: 'lab-del-1',
    name: 'DiagnosticsFocus Apex Regional Lab - South Extension',
    centerType: 'Regional Reference Lab',
    city: 'Delhi NCR',
    address: 'Ring Road, Near Metro Gate 2, South Extension Part-II',
    pincode: '110049',
    phone: '+91 11 4980 7700',
    timings: 'Open 24x7 for Sample Processing | Walk-in: 06:00 AM - 09:00 PM',
    services: ['NABL Reference Pathology', 'Cytology', 'Genomics', 'ECG', 'Home Collection'],
    nablCertified: true,
    homeCollectionAvailable: true,
    distanceKm: 2.1
  },
  {
    id: 'lab-del-2',
    name: 'DiagnosticsFocus Hub - Sector 18, Noida',
    centerType: 'Pathology Processing Hub',
    city: 'Delhi NCR',
    address: 'Commercial Block B-3, Sector 18, Noida, Uttar Pradesh',
    pincode: '201301',
    phone: '+91 120 488 9911',
    timings: 'Mon - Sun: 06:30 AM - 08:30 PM',
    services: ['Routine Blood Work', 'Hormone Assays', 'Urine Testing', 'Home Collection'],
    nablCertified: true,
    homeCollectionAvailable: true,
    distanceKm: 4.5
  },
  {
    id: 'lab-blr-1',
    name: 'DiagnosticsFocus National Reference Center - Indiranagar',
    centerType: 'Regional Reference Lab',
    city: 'Bengaluru',
    address: '100 Feet Road, 12th Main Junction, HAL 2nd Stage, Indiranagar',
    pincode: '560038',
    phone: '+91 80 4670 5500',
    timings: 'Open 24 Hours (Walk-in: 06:30 AM - 09:30 PM)',
    services: ['Full Pathology Spectrum', 'HPLC HbA1c', 'Histopathology', 'ECG', 'Home Collection'],
    nablCertified: true,
    homeCollectionAvailable: true,
    distanceKm: 1.2
  },
  {
    id: 'lab-blr-2',
    name: 'DiagnosticsFocus Hub - Koramangala 5th Block',
    centerType: 'Collection Center',
    city: 'Bengaluru',
    address: 'Jyoti Nivas College Road, 5th Block, Koramangala',
    pincode: '560095',
    phone: '+91 80 4670 5540',
    timings: 'Mon - Sun: 07:00 AM - 08:00 PM',
    services: ['Sample Collection', 'Express CBC', 'Fasting Blood Sugar', 'Home Collection'],
    nablCertified: true,
    homeCollectionAvailable: true,
    distanceKm: 3.8
  },
  {
    id: 'lab-hyd-1',
    name: 'DiagnosticsFocus Jubilee Hills Diagnostic Hub',
    centerType: 'Regional Reference Lab',
    city: 'Hyderabad',
    address: 'Road No. 36, Near Peddamma Temple Metro, Jubilee Hills',
    pincode: '500033',
    phone: '+91 40 4560 3300',
    timings: 'Mon - Sun: 06:00 AM - 09:00 PM',
    services: ['CAP & NABL Certified Testing', 'Biochemistry', 'Serology', 'Home Collection'],
    nablCertified: true,
    homeCollectionAvailable: true,
    distanceKm: 2.6
  },
  {
    id: 'lab-chn-1',
    name: 'DiagnosticsFocus Anna Nagar Center of Excellence',
    centerType: 'Regional Reference Lab',
    city: 'Chennai',
    address: '2nd Avenue, Block AB, Anna Nagar',
    pincode: '600040',
    phone: '+91 44 4390 2200',
    timings: 'Mon - Sun: 06:30 AM - 09:00 PM',
    services: ['Pathology Testing', 'Immunology', 'Cardiac Markers', 'Home Collection'],
    nablCertified: true,
    homeCollectionAvailable: true,
    distanceKm: 3.1
  },
  {
    id: 'lab-kol-1',
    name: 'DiagnosticsFocus Salt Lake Sector 1 Laboratory',
    centerType: 'Pathology Processing Hub',
    city: 'Kolkata',
    address: 'BD Block, Sector 1, Bidhannagar, Salt Lake City',
    pincode: '700064',
    phone: '+91 33 4100 8822',
    timings: 'Mon - Sat: 07:00 AM - 08:30 PM | Sun: 07:00 AM - 02:00 PM',
    services: ['Biochemistry', 'Routine Hematology', 'Preventive Checkups', 'Home Collection'],
    nablCertified: true,
    homeCollectionAvailable: true,
    distanceKm: 2.9
  },
  {
    id: 'lab-pun-1',
    name: 'DiagnosticsFocus Shivaji Nagar Hub',
    centerType: 'Pathology Processing Hub',
    city: 'Pune',
    address: 'FC Road, Opposite Ferguson College Campus, Shivaji Nagar',
    pincode: '411005',
    phone: '+91 20 4890 1144',
    timings: 'Mon - Sun: 06:30 AM - 09:00 PM',
    services: ['Comprehensive Blood Testing', 'ECG', 'Thyroid Profile', 'Home Collection'],
    nablCertified: true,
    homeCollectionAvailable: true,
    distanceKm: 1.5
  }
];
