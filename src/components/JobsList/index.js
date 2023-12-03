import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiSearchAlt2} from 'react-icons/bi'
import JobsCard from '../JobsCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobsList extends Component {
  state = {status: apiStatus.failure, searchInput: '', jobsList: []}

  componentDidMount() {
    this.getJobCards()
  }

  getJobCards = async () => {
    const {activeSalaryId, activeTypeId} = this.props
    const employTypes = activeTypeId.join(',')
    const {searchInput} = this.state
    this.setState({status: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({status: apiStatus.success, jobsList: updatedData})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="search-loader-container">
          {this.renderSearchBar()}
          <div className="loader-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-image"
            />
            <h1 className="failure-heading">No Jobs Found</h1>
            <p className="failure-paragraph">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        </div>
      )
    }
    return (
      <div className="search-loader-container">
        {this.renderSearchBar()}
        <ul className="jobs-list-container">
          {jobsList.map(each => (
            <JobsCard key={each.id} jobsList={each} />
          ))}
        </ul>
      </div>
    )
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-bar">
        <input
          type="search"
          className="search-input"
          value={searchInput}
          onChange={this.changeSearchInput}
          placeholder="Search"
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          onClick={() => this.getJobCards()}
        >
          <BiSearchAlt2 />
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div className="search-loader-container">
      {this.renderSearchBar()}
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="search-loader-container">
      {this.renderSearchBar()}
      <div className="loader-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-paragraph">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="retry-btn"
          onClick={() => this.getJobCards()}
        >
          Retry
        </button>
      </div>
    </div>
  )

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatus.inProgress:
        return this.renderLoader()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }
}

export default JobsList
