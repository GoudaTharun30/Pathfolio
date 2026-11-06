const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  basicInfo: {
    fullName: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    dob: { type: String, default: '' },
    location: { type: String, default: '' },
    aboutMe: { type: String, default: '' }
  },
  education: [{
    institution: String,
    degree: String,
    branch: String,
    startYear: String,
    endYear: String,
    cgpa: String,
    coursework: String
  }],
  skills: [{ type: String }],
  experience: [{
    company: String,
    role: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    githubUrl: String,
    liveUrl: String,
    role: String
  }],
  certifications: [{
    name: String,
    issuingOrganization: String,
    date: String,
    credentialUrl: String
  }],
  achievements: [{
    title: String,
    description: String,
    date: String
  }],
  links: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    leetcode: { type: String, default: '' },
    website: { type: String, default: '' },
    other: { type: String, default: '' }
  },
  careerPreferences: {
    interestedRoles: [String],
    preferredTechnologies: [String],
    preferredIndustries: [String],
    preferredWorkType: { type: String, default: 'Hybrid' }, // Remote, Onsite, Hybrid
    preferredJobType: { type: String, default: 'Full-time' }  // Full-time, Internship, Contract
  },
  activeRoadmapId: { type: String, default: 'fullstack-developer' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);
