import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="image-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="heading">Description</h1>
      <p className="paragraph">{jobDescription}</p>
      <div className="icon-type-container">
        <MdLocationOn className="location-icon" />
        <p className="location">{location}</p>
        <BsFillBriefcaseFill className="location-icon" />
        <p className="location">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobCard
