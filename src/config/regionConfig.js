export const regionConfig = {
  latam: {
    label: 'Latinoamérica',
    sections: [
      'personal', 'summary', 'experience',
      'education', 'skills', 'languages',
      'certifications', 'references',
    ],
    personalFields: {
      photo:         true,
      cedula:        true,
      birthdate:     true,
      maritalStatus: true,
      military:      true,
      nationality:   false,
    },
    availableTemplates: ['harvard', 'ats-clean', 'hybrid'],
    atsWarning: false,
    maxPages: 2,
  },

  usa: {
    label: 'Estados Unidos',
    sections: [
      'personal', 'summary', 'experience',
      'education', 'skills', 'certifications', 'projects',
    ],
    personalFields: {
      photo:         false,
      cedula:        false,
      birthdate:     false,
      maritalStatus: false,
      military:      false,
      nationality:   false,
    },
    availableTemplates: ['ats-clean', 'hybrid', 'harvard'],
    atsWarning: true,
    maxPages: 1,
  },

  europe: {
    label: 'Europa',
    sections: [
      'personal', 'summary', 'experience',
      'education', 'skills', 'languages',
      'certifications', 'publications',
    ],
    personalFields: {
      photo:         true,
      cedula:        false,
      birthdate:     false,
      maritalStatus: false,
      military:      false,
      nationality:   true,
    },
    availableTemplates: ['europass', 'harvard', 'ats-clean'],
    atsWarning: false,
    maxPages: 2,
  },
}