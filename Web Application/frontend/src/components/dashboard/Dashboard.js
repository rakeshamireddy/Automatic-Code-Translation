import React, {Fragment, useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import axios from "axios"
import {addTranslation} from '../../actions/translation'
import * as ReactBootStrap from 'react-bootstrap'
import translation from '../../reducers/translation';

const Dashboard = ({addTranslation, auth: {user, loading}, translation: {content, content_loading}, history}) => {

  const [file_loading, setLoading] = useState(true)
  const [translate_done, setTranslateState] = useState (true)

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
   
  const refreshPage = () =>{
    window.location.reload(false)
  }
  
  const onSubmit = e => {
    e.preventDefault();
    console.log ("inside translate onSubmit, formData is ",formData)
    //setTranslateState (true)
    console.log ("translate_Done is", translate_done)
    addTranslation(formData, history)
    //setTranslateState (false)
    console.log ("translate_Done is", translate_done)
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

  // const handleTranslateClick = (event) => {
  //   event.preventDefault();
  //   console.log ("inside handleTranslateClick")
  //   if (selectedFile) {
  //     console.log ("selected file is, ",selectedFile.name)
  //     const res = axios.post('/api/uploadFile',selectedFile.name,{headers: {"Content-Type": "text/plain"}}).then(
  //               (response) => 
  //                 { //alert("file upload complete");
  //                 setTranslatedContent(response.data);
  //               })
  //     // console.log (response.data)
  //   }
  // }

  const handleSubmission = (event) => {
    setLoading(false)
    console.log ("file_loading is ",file_loading)
    event.preventDefault();
    console.log ("inside handleSubmission")
    const formData = new FormData ();
    formData.append('File',selectedFile)
    console.log ("inside handleSubmission formData content is", formData.get("File"))
    uploadFile(formData);
    console.log ("file_loading is ",file_loading)
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
                  setLoading(true);
                })
    // setLoading(true)
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
          {/* <p className="large text-center text-primary"><i className = "fas fa-file-alt"></i></p>
          <p className = "lead text-center"> Choose your source language</p> */}
          {/* <br/>
          <br/> */}
          <div>
            <label for="sourceLang">Choose source language</label>
            {' '}
            <select name="sourceLang" className="btn bg-primary"
                value={sourceLang}
                onChange={e => onChange(e)}>
                <option>Choose one..</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c++">C++</option>
                <option value="r">R</option>
            </select>
          </div>
          {/* <p className = "lead text-center">Upload Your Source File</p> */}
          {/* </form> */}
            
            <br/>
            <br/>
            <div>
            <label for="targetLang" >Choose target language</label>
            {' '}
            <select name="targetLang" className="btn bg-primary"
                value={targetLang}
                onChange={e => onChange(e)}>
                <option>Choose one..</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="R">R</option>
            </select>
          </div>
          <br/>
          <br/>
          <form >
            {/* className="text-center" */}
            <div>
              {/* className = "file-field input-field" */}
              <div className="choose-file">
                  {/* className = "btn #64b5f6 blue darken-1" */}
                    {/* <span> Upload program file</span>  */}
                <input type = "file" onChange={changeHandler} name="sourceFile" val={sourceFile}></input><br/>
                {/* { file_loading && isFilePicked ? ( <div> <p>Filename: {selectedFile.name} Selected</p></div>): (
                // <span className = "text-danger">Select File</span>
                <ReactBootStrap.Spinner animation='border'/>
                
                
                )} */}
              </div>
            </div>
              <br/>
            <button onClick={handleSubmission} type = "submit" className = "btn btn-primary"> Upload file</button>
            {file_loading?null:<Spinner/>}
          </form>
          <br/>
          <button type = "submit" className = "btn btn-primary btn2" value="Submit"> Translate</button>
          {!translate_done?<Spinner/>:null}
        </div>
        <div className = "column2">
          <h2 className ="text-primary">Translated Content</h2>
          {content_loading && content === null ? null: <p className = "text-dark">{content}</p>}
          {/* <p>{content?<div><p className = "text-dark">{translation.content}</p></div>: null}</p> */}
          <br/>
          <br/>
          {/* <Link to="/dashboard" className="btn btn-primary">Make New Translation</Link> */}
          <button onClick={refreshPage} className = 'btn btn-primary btn2'>Make New Translation </button>
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
