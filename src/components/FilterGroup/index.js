import './index.css'

const FilterGroup = props => {
  const {
    changeActiveType,
    changeActiveSalary,
    salaryRangesList,
    employmentTypesList,
  } = props

  const onChangeActiveType = event => {
    changeActiveType(event.target.value)
  }

  const onChangeActiveSalary = event => {
    changeActiveSalary(event.target.value)
  }

  return (
    <div>
      <hr className="line" />
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list-container">
        {employmentTypesList.map(each => (
          <li className="listitem" key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              className="checkbox"
              value={each.employmentTypeId}
              onChange={onChangeActiveType}
            />
            <label htmlFor={each.employmentTypeId} className="checkbox-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="line" />
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list-container">
        {salaryRangesList.map(each => (
          <li className="listitem" key={each.salaryRangeId}>
            <input
              type="radio"
              id={each.salaryRangeId}
              className="checkbox"
              name="salary"
              value={each.salaryRangeId}
              onChange={onChangeActiveSalary}
            />
            <label htmlFor={each.salaryRangeId} className="checkbox-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterGroup
