import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

export const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated){
    return <Redirect to = '/dashboard'></Redirect>

  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Code<span className="x-large text-primary">Translator</span></h1>
          <p className="lead">
            Translate your code between R and python programming languages
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)