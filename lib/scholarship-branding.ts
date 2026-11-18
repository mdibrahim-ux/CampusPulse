export type ScholarshipBrand = {
  imageUrl: string;
  imageAlt: string;
  imageLabel: string;
  imageSource: string;
  imageFit: 'contain' | 'cover';
};

export const scholarshipBranding: Record<string, ScholarshipBrand> = {
  'pm-usp-csss': {
    imageUrl: 'https://sathee.iitk.ac.in/images/home/logos/en/moe-logo.png',
    imageAlt: 'Ministry of Education, Government of India logo',
    imageLabel: 'Issuing authority logo',
    imageSource: 'SATHEE · IIT Kanpur / Ministry of Education identity',
    imageFit: 'contain'
  },
  'aicte-pragati-degree': {
    imageUrl: 'https://images.moneycontrol.com/static-hindinews/2025/08/AICTE-Pragati-Scholarship.jpg?height=900&impolicy=website&width=1600',
    imageAlt: 'AICTE Pragati Scholarship Scheme artwork for girl students',
    imageLabel: 'Scheme artwork',
    imageSource: 'Moneycontrol · AICTE Pragati scheme artwork',
    imageFit: 'contain'
  },
  'aicte-saksham-degree': {
    imageUrl: 'https://tgpcet.com/assets/AICTE-SCHOLARSHIP/SAKSHAM.jpeg',
    imageAlt: 'AICTE Saksham Scholarship Scheme poster',
    imageLabel: 'Scheme artwork',
    imageSource: 'Tulsiramji Gaikwad-Patil College of Engineering · AICTE scheme poster',
    imageFit: 'cover'
  },
  'top-class-sc': {
    imageUrl: 'https://www.ux4g.gov.in/aboutus/assets/img/logos-page/Emblem_of_India%202.png',
    imageAlt: 'Government of India National Emblem',
    imageLabel: 'Issuing authority logo',
    imageSource: 'UX4G · Government of India approved logo library',
    imageFit: 'contain'
  },
  'depwd-post-matric': {
    imageUrl: 'https://cdnbbsr.s3waas.gov.in/s3e58aea67b01fa747687f038dfde066f6/uploads/2026/05/202605201284019486.jpeg',
    imageAlt: 'Department of Empowerment of Persons with Disabilities scholarship scheme artwork',
    imageLabel: 'Official scheme artwork',
    imageSource: 'Department of Empowerment of Persons with Disabilities',
    imageFit: 'contain'
  }
};
