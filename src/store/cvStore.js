import { create } from 'zustand'

const useCVStore = create((set) => ({
  selectedArea: null,
  selectedTemplate: null,
  cvData: {
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
  },
  setSelectedArea: (area) => set({ selectedArea: area }),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  updatePersonal: (data) =>
    set((state) => ({
      cvData: { ...state.cvData, personal: { ...state.cvData.personal, ...data } }
    })),
  updateSummary: (summary) =>
    set((state) => ({ cvData: { ...state.cvData, summary } })),
  addExperience: (exp) =>
    set((state) => ({
      cvData: { ...state.cvData, experience: [...state.cvData.experience, exp] }
    })),
  addEducation: (edu) =>
    set((state) => ({
      cvData: { ...state.cvData, education: [...state.cvData.education, edu] }
    })),
}))

export default useCVStore