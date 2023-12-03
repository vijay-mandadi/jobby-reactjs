import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import SimilarJobCard from '../SimilarJobCard'
import Header from '../Header'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {status: apiStatus.initial, jobDetails: {}, similarJobs: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({status: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      const updatedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        rating: jobDetails.rating,
        title: jobDetails.title,
        packagePerAnnum: jobDetails.package_per_annum,
        skills: jobDetails.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
      }

      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: updatedData,
        status: apiStatus.success,
        similarJobs,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state

    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobDetails
    return (
      <>
        <Header />
        <div className="jobitem-page">
          <div className="jobs-details-card">
            <div className="image-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job-image"
              />
              <div>
                <h1 className="job-title">{title}</h1>
                <div className="rating-star-container">
                  <AiFillStar className="rating-star" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-type-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{location}</p>
                <BsFillBriefcaseFill className="location-icon" />
                <p className="location">{employmentType}</p>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="hr-line" />
            <div className="description-link-container">
              <h1 className="job-description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="company-link">
                Visit
                <FiExternalLink className="link-logo" />
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
            <h1 className="job-description-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(eachSkill => {
                const {imageUrl, name} = eachSkill
                return (
                  <li className="skill-item" key={name}>
                    <img src={imageUrl} alt={name} className="skill-image" />
                    <p className="skill-name">{name}</p>
                  </li>
                )
              })}
            </ul>
            <h1 className="job-description-heading">Life at Company</h1>
            <div className="company-life-container">
              <p className="life-description">{lifeAtCompany.description}</p>
              <img
                className="life-image"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(eachJob => (
              <SimilarJobCard key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Header />
      <div className="jobs-loader-container">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <>
      <Header />
      <div className="jobs-loader-container">
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
          onClick={() => this.getJobItemDetails()}
        >
          Retry
        </button>
      </div>
    </>
  )

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default JobItemDetails
