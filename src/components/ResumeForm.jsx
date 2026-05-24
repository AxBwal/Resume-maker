import { useState } from 'react'
import PersonalInfoForm from './forms/PersonalInfoForm'
import SummaryForm from './forms/SummaryForm'
import ExperienceForm from './forms/ExperienceForm'
import EducationForm from './forms/EducationForm'
import SkillsForm from './forms/SkillsForm'
import ProjectsForm from './forms/ProjectsForm'
import CertificationsForm from './forms/CertificationsForm'
import {
  FiUser,
  FiBriefcase,
  FiBook,
  FiCode,
  FiAward,
  FiFileText,
  FiFolder,
  FiChevronUp,
  FiChevronDown,
  FiEdit3
} from 'react-icons/fi'

const SECTION_META = {
  personal: {
    label: 'Personal Info',
    icon: FiUser,
    description: 'Name, contact details, and links',
    group: 'basics'
  },
  summary: {
    label: 'Summary',
    icon: FiFileText,
    description: 'A brief professional overview',
    group: 'basics'
  },
  experience: {
    label: 'Experience',
    icon: FiBriefcase,
    description: 'Work history and achievements',
    group: 'sections'
  },
  education: {
    label: 'Education',
    icon: FiBook,
    description: 'Degrees, schools, and coursework',
    group: 'sections'
  },
  skills: {
    label: 'Skills',
    icon: FiCode,
    description: 'Technical and soft skills',
    group: 'sections'
  },
  projects: {
    label: 'Projects',
    icon: FiFolder,
    description: 'Personal or professional projects',
    group: 'sections'
  },
  certifications: {
    label: 'Certifications',
    icon: FiAward,
    description: 'Licenses and credentials',
    group: 'sections'
  }
}

function ResumeForm({ resumeData, updateResumeData, sectionOrder, setSectionOrder }) {
  const [activeSection, setActiveSection] = useState('personal')

  const reorderableSections = Object.keys(sectionOrder)

  const sortedReorderable = [...reorderableSections].sort(
    (a, b) => sectionOrder[a] - sectionOrder[b]
  )

  const moveSection = (sectionKey, direction) => {
    const sorted = [...reorderableSections].sort((a, b) => sectionOrder[a] - sectionOrder[b])
    const index = sorted.indexOf(sectionKey)
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= sorted.length) return

    const newSectionOrder = { ...sectionOrder }
    newSectionOrder[sorted[index]] = sectionOrder[sorted[swapIndex]]
    newSectionOrder[sorted[swapIndex]] = sectionOrder[sorted[index]]
    setSectionOrder(newSectionOrder)
  }

  const renderNavItem = (sectionId, { reorderable = false, orderIndex = 0, total = 0 } = {}) => {
    const meta = SECTION_META[sectionId]
    const Icon = meta.icon
    const isActive = activeSection === sectionId

    return (
      <div key={sectionId} className={`sidebar-nav-item ${isActive ? 'active' : ''}`}>
        <button
          className="sidebar-nav-btn"
          onClick={() => setActiveSection(sectionId)}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className="sidebar-nav-icon">
            <Icon />
          </span>
          <span className="sidebar-nav-label">{meta.label}</span>
        </button>
        {reorderable && (
          <div className="sidebar-reorder-controls">
            <button
              type="button"
              className="sidebar-reorder-btn"
              onClick={() => moveSection(sectionId, 'up')}
              disabled={orderIndex === 0}
              aria-label={`Move ${meta.label} up`}
            >
              <FiChevronUp />
            </button>
            <button
              type="button"
              className="sidebar-reorder-btn"
              onClick={() => moveSection(sectionId, 'down')}
              disabled={orderIndex === total - 1}
              aria-label={`Move ${meta.label} down`}
            >
              <FiChevronDown />
            </button>
          </div>
        )}
      </div>
    )
  }

  const activeMeta = SECTION_META[activeSection]
  const ActiveIcon = activeMeta.icon

  return (
    <div className="resume-form">
      <aside className="form-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-icon">
            <FiEdit3 />
          </div>
          <div>
            <h2 className="sidebar-title">Edit Resume</h2>
            <p className="sidebar-subtitle">Fill in each section below</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-group">
            <span className="sidebar-group-label">Basics</span>
            {['personal', 'summary'].map((id) => renderNavItem(id))}
          </div>

          <div className="sidebar-group">
            <span className="sidebar-group-label">Resume Sections</span>
            <p className="sidebar-group-hint">Use arrows to change order on preview</p>
            {sortedReorderable.map((sectionKey, index) =>
              renderNavItem(sectionKey, {
                reorderable: true,
                orderIndex: index,
                total: sortedReorderable.length
              })
            )}
          </div>
        </nav>
      </aside>

      <main className="form-main">
        <header className="form-content-header">
          <div className="form-content-header-icon">
            <ActiveIcon />
          </div>
          <div>
            <h3 className="form-content-title">{activeMeta.label}</h3>
            <p className="form-content-description">{activeMeta.description}</p>
          </div>
        </header>

        <div className="form-content">
          {activeSection === 'personal' && (
            <PersonalInfoForm
              data={resumeData.personalInfo}
              updateData={(data) => updateResumeData('personalInfo', data)}
            />
          )}
          {activeSection === 'summary' && (
            <SummaryForm
              data={resumeData.summary}
              updateData={(data) => updateResumeData('summary', data)}
            />
          )}
          {activeSection === 'experience' && (
            <ExperienceForm
              data={resumeData.experience}
              updateData={(data) => updateResumeData('experience', data)}
            />
          )}
          {activeSection === 'education' && (
            <EducationForm
              data={resumeData.education}
              updateData={(data) => updateResumeData('education', data)}
            />
          )}
          {activeSection === 'skills' && (
            <SkillsForm
              data={resumeData.skills}
              updateData={(data) => updateResumeData('skills', data)}
            />
          )}
          {activeSection === 'projects' && (
            <ProjectsForm
              data={resumeData.projects}
              updateData={(data) => updateResumeData('projects', data)}
            />
          )}
          {activeSection === 'certifications' && (
            <CertificationsForm
              data={resumeData.certifications}
              updateData={(data) => updateResumeData('certifications', data)}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default ResumeForm
