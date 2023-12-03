import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsCard = props => {
  const {jobsList} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsList

  return (
    <li className="jobs-listitem">
      <Link to={`/jobs/${id}`} className="jobs-linkitem">
        <div className="image-title-container">
          <img src={companyLogoUrl} alt="company logo" className="job-image" />
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
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobsCard
