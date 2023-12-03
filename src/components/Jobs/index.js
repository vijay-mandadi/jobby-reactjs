import {Component} from 'react'
import Header from '../Header'
import FilterGroup from '../FilterGroup'
import JobsList from '../JobsList'
import Profile from '../Profile'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {activeTypeId: [], activeSalaryId: ''}

  changeActiveType = value => {
    const {activeTypeId} = this.state
    if (activeTypeId.includes(value)) {
      const temp = activeTypeId.filter(each => each !== value)
      this.setState({activeTypeId: temp})
    } else {
      this.setState(prev => ({
        activeTypeId: [...prev.activeTypeId, value],
      }))
    }
  }

  changeActiveSalary = value => {
    this.setState({activeSalaryId: value})
  }

  render() {
    const {activeSalaryId, activeTypeId} = this.state
    return (
      <>
        <Header />
        <div className="jobs-route-container">
          <div className="profile-filters-container">
            <Profile />
            <FilterGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeActiveType={this.changeActiveType}
              changeActiveSalary={this.changeActiveSalary}
            />
          </div>
          <JobsList
            activeSalaryId={activeSalaryId}
            activeTypeId={activeTypeId}
          />
        </div>
      </>
    )
  }
}

export default Jobs
