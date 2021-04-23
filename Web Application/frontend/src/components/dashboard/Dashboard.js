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
            <p>File upload</p>
        </div>
        <div className = "column2">
          <p> File convert</p>
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
