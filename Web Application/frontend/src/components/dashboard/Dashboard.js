import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'

const Dashboard = ({auth: {user, loading}}) => {

  return loading && user === null ? <Spinner/> : <Fragment>
    <h1 className='large text-primary'>Automatic Code Translation</h1>
    <p className = "lead"> <i className="fas fa-user"></i> Welcome {user && user.name}</p>
    <div className = "container">
      <div className = "container_2columns">
        <div className = "column1">
            <p className="large"><i className = "far fa-file-alt"></i></p>
            <p>Upload Your Source Code</p>
            <br/>
            <br/>
            <form>
              <div className = "file-field input-field">
                <div className = "btn #64b5f6 blue darken-1">
                  {/* <span> Upload program file</span>  */}
                  <input type = "file"></input>
                </div>
              </div>
              <br/>
              <button type = "submit" className = "btn btn-dark"> Upload file</button>
            </form>
        </div>
        <div className = "column2">
          <p> Choose your target language for conversion </p>
          <br/>
          <br/>
          <form>
            <select clasName="language-dropdown" id="#" name="#">
              <option value="" selected disabled hidden>Choose language</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
              <option value="R">R</option>
            </select>
            <br/>
            <br/>
            <button type = "submit" className = "btn btn-dark"> Translate</button>
          </form>

        </div>
      </div>
    </div>


  </Fragment>
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Dashboard)
