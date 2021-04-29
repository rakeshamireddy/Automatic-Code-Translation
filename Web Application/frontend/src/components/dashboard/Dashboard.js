import React, {Fragment, useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import axios from "axios"
import {addTranslation} from '../../actions/translation'

const Dashboard = ({addTranslation, auth: {user, loading}, history}) => {
  const [formData, setFormData] = useState ({
    sourceLang:'',
    targetLang:''
  })

  const {
    sourceLang,
    targetLang,
  } = formData;

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  // for drop downs
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = e => {
    e.preventDefault();
    addTranslation(formData, history)
  }

  const changeHandler = (event) => {
    console.log ("inside changeHandler")
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    //console.log (selectedFile,isFilePicked)
  }

  const handleSubmission = (event) => {
    event.preventDefault();
    console.log ("inside handleSubmission")
    const formData = new FormData ();
    formData.append('File',selectedFile)
    console.log ("inside handleSubmission formData content is", formData.get("File"))
    uploadFile(formData)
  }
  // removed async from async (formData), await from await axios
  const uploadFile = async (formData) => {
    console.log ("inside upload file")
    const config = {
      headers: { 
        'Content-Type': 'application/json'},
        // 'Accept': 'application/json',
        // "content-type": "application/json" },
    };
    console.log ("inside uploadFile formData content is", formData.get("File"))
    // removed await that was before axios in the next lines //JSON.stringify(
    const res = axios.post('/api/uploadFile',formData,config).then(
                (response) => 
                  {alert("file upload complete");
                  console.log('reponse is ',response);
                })
  }


  return loading && user === null ? <Spinner/> : <Fragment>
    <h1 className='large text-primary'>Automatic Code Translation</h1>
    <p className = "lead"> <i className="fas fa-user"></i> Welcome {user && user.name}</p>
    <br/>
    <br/>
    {/* <div className = "container"> */}
    <form onSubmit={e=> onSubmit(e)}>
      <div className = "container_2columns">
        <div className = "column1">
          <p className="large text-center text-primary"><i className = "fas fa-file-alt"></i></p>
          <p className = "lead text-center"> Choose your source language</p>
          {/* <br/>
          <br/> */}
          <div>
            {/* <label for="sourceLang">Choose source language</label> */}
            {' '}
            <select name="sourceLang" className="btn btn-light"
                value={sourceLang}
                onChange={e => onChange(e)}>
                <option>Choose one..</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="R">R</option>
            </select>
          </div>
          <p className = "lead text-center">Upload Your Source File</p>
          {/* </form> */}
            
            {/* <br/>
            <br/> */}
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
          {/* <br/>
          <br/> */}
          <div>
            {/* <label for="targetLang">Choose source language</label> */}
            {' '}
            <select name="targetLang" className="btn btn-light"
                value={targetLang}
                onChange={e => onChange(e)}>
                <option>Choose one..</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="R">R</option>
            </select>
          </div>
          <button type = "submit" className = "btn btn-primary" value="Submit"> Translate</button>
        </div>
      </div>
    {/* </div> */}
    </form>

  </Fragment>
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  addTranslation: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {addTranslation})(withRouter(Dashboard))
