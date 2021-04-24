import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'

const Dashboard = ({auth: {user, loading}}) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    console.log ("inside changeHandler")
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    //console.log (selectedFile,isFilePicked)
  }

  const handleSubmission = () => {
    console.log ("inside handleSubmission")
    const formData = new FormData ();
    formData.append('File',selectedFile)
    console.log ("inside handleSubmission formData content is", formData.get("File"))
  }

  return loading && user === null ? <Spinner/> : <Fragment>
    <h1 className='large text-primary'>Automatic Code Translation</h1>
    <p className = "lead"> <i className="fas fa-user"></i> Welcome {user && user.name}</p>
    <br/>
    <br/>
    {/* <div className = "container"> */}
      <div className = "container_2columns">
        <div className = "column1">
            <p className="large text-center text-primary"><i className = "fas fa-file-alt"></i></p>
            <p className = "lead text-center">Upload Your Source Code</p>
            <br/>
            <br/>
            <form className="text-center">
              <div>
              {/* className = "file-field input-field" */}
                <div className="choose-file">
                {/* className = "btn #64b5f6 blue darken-1" */}
                  {/* <span> Upload program file</span>  */}
                  <input type = "file" onChange={changeHandler}></input>
                  {isFilePicked ? ( <div> <p>Filename: {selectedFile.name} Selected</p></div>): (<p>Select File</p>)}
                </div>
              </div>
              <br/>
              <button onClick={handleSubmission} type = "submit" className = "btn btn-primary"> Upload file</button>
            </form>
        </div>
        <div className = "column2">
          <p className="large text-center text-primary"><i className = "fas fa-exchange-alt"></i></p>
          <p className = "lead text-center"> Choose your target language for conversion </p>
          <br/>
          <br/>
          <form className="text-center">
            <select clasName="language-dropdown" id="#" name="#">
              <option value="" selected disabled hidden>Choose language</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
              <option value="R">R</option>
            </select>
            <br/>
            <br/>
            <button type = "submit" className = "btn btn-primary"> Translate</button>
          </form>

        </div>
      </div>
    {/* </div> */}


  </Fragment>
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Dashboard)
