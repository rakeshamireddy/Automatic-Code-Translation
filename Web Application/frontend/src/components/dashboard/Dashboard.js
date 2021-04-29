import React, {Fragment, useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import axios from "axios"
import {addTranslation} from '../../actions/translation'
import translation from '../../reducers/translation';

const Dashboard = ({addTranslation, auth: {user, loading}, translation, history}) => {
  const [formData, setFormData] = useState ({
    sourceLang:'',
    targetLang:'',
    sourceFile:''
  })

  const {
    sourceLang,
    targetLang,
    sourceFile,
  } = formData;

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [translatedContent, setTranslatedContent] = useState("empty");

  // for drop downs
  const onChange = e =>{
    console.log (e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log (formData)
    // if (selectedFile) setFormData({...formData, 'sourceFile':selectedFile.name})
  }
   
  
  const onSubmit = e => {
    e.preventDefault();
    console.log ("inside onSubmit, formData is ",formData)
    addTranslation(formData, history)
  }

  const changeHandler = (event) => {
    console.log ("inside changeHandler")
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    setTranslatedContent("not converted")    
    setFormData ({...formData,'sourceFile':event.target.files[0].name})
    // setFormData({ ...formData, ['sourceFile']:selectedFile})
    //console.log (selectedFile,isFilePicked)
  }

  const handleTranslateClick = (event) => {
    event.preventDefault();
    console.log ("inside handleTranslateClick")
    if (selectedFile) {
      console.log ("selected file is, ",selectedFile.name)
      const res = axios.post('/api/uploadFile',selectedFile.name,{headers: {"Content-Type": "text/plain"}}).then(
                (response) => 
                  { //alert("file upload complete");
                  setTranslatedContent(response.data);
                })
      // console.log (response.data)
    }
    // var child;
    // console.log (child)
    // const exec = require('child_process').exec
    // console.log (exec)
    // child = exec ('cat ../../frontend/src/files/public/uploads/'+selectedFile.name,
    //                     function (error,stdout,stderr) {
    //                       console.log ('stdout: '+stdout)
    //                       console.log ('stderr: '+stderr)
    //                       if (error != null) {
    //                         console.log ("exec error: "+error)
    //                       }
    //                       setTranslatedContent(stdout)
    //                     }
    // )
    // child ()
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
                <input type = "file" onChange={changeHandler} name="sourceFile" val={sourceFile}></input>
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
          {/* <button onClick={handleTranslateClick}type = "submit" className = "btn btn-primary" value="Submit"> Translate</button> */}
          <p>Translated Content</p>
          <p>{translation.content?<div><p>the output is <br/> {translation.content}</p></div>:null}</p>
        </div>
      </div>
    {/* </div> */}
    </form>

  </Fragment>
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  addTranslation: PropTypes.func.isRequired,
  translation: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  translation: state.translation
})

export default connect(mapStateToProps, {addTranslation})(withRouter(Dashboard))
