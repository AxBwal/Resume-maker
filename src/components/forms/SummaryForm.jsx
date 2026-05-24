function SummaryForm({ data, updateData }) {
  return (
    <div className="form-section-content">
      <h3>Professional Summary</h3>
      <div className="form-group">
        <label>Summary</label>
        <textarea
          className="description-textarea"
          value={data || ''}
          onChange={(e) => updateData(e.target.value)}
          placeholder="Write a brief professional summary highlighting your key qualifications, experience, and career goals..."
          rows={10}
        />
      </div>
    </div>
  )
}

export default SummaryForm
