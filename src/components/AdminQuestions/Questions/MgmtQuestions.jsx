import React,{ useState, useEffect } from "react";
import {v4 as uuid } from "uuid";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

const MgmtQuestions = (props)=>{
    const [questionDescription,setQuestionDescription]=useState("");
    let inputValue = (event)=>{ setQuestionDescription(event.target.value) }

    const [yearofstudy,setYearofstudy]=useState(1);
    let yearValue = (event) =>{ setYearofstudy(event.target.value) }

    const [files, setFiles] = useState({});
        let getFile = (file)=>{ setFiles(file) }

    // const [mgmtQuestions,setMgmtQuestions]=useState([
        // {
        //     id:uuid(),
        //     questionDescription:"hello bro", 
        //     yearofstudy:1,
        //     file:""       
        // }
    // ]);
    
    async function addMgmtQuestion(){
        // setMgmtQuestions(prevQ=>{
        //     return [...prevQ,{id:uuid(),questionDescription:questionDescription,yearofstudy:yearofstudy,file:files.base64}]
        // });

        const questionObject = {description:questionDescription, questionImage:files.base64};

        await fetch("https://recruitment2022.herokuapp.com/admin/management/add-question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("admin"),
            },
            body: JSON.stringify(questionObject)
        })
        .then(function(response) {
            // console.log(questionObject);
            // console.log(response);
            return response.json();
        }).then(function(data) {
            // console.log(data);
            // getMgmtQuestions();
        }).catch(error => {
            // console.log(error)
            alert("Error: ", error);
        })
        getMgmtQuestions();
        clearAll();
    }

    const [getQuestions, setGetQuestions] = useState([]);

    useEffect(() => {
        getMgmtQuestions();
    }, []);

    function getMgmtQuestions() {
        fetch("https://recruitment2022.herokuapp.com/admin/management/get-all-questions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("admin"),
            },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setGetQuestions(data.questions);
            // console.log(data);
            // console.log(getQuestions);
        })
        .catch(error => console.log(error));
    }

    async function deleteMgmtQuestion(_id){
        // setMgmtQuestions((prevQ)=>{
        //     return prevQ.filter((question,index)=>{
        //         return question.id !==id;
        //     })
        // })

        await fetch("https://recruitment2022.herokuapp.com/admin/management/delete-question/" + _id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("admin"),
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            alert("Question deleted successfully!");
        })
        .catch(error => {
            // console.log(error);
            alert("Error: ", error);
        })
        getMgmtQuestions();
    }

    function clearAll(){
        setFiles({});
        setQuestionDescription("");
    }
    
    const [showModal,setShowModal]=useState(false);
    let showModal1 = () => { setShowModal(true) }
    let hideModal = () => { setShowModal(false) }
    
    let showQuestions=props.selectedValue==="management" ? "management": "display-none";
    return(
        <div className={showQuestions}>
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={showModal1}>Add Question</button>
            </div>
            <Modal show={showModal} onHide={hideModal} questionDescription={questionDescription} selected={props.selectedValue} 
            setQuestionDescription={inputValue} inputYear={yearValue} 
            addQuestion={addMgmtQuestion} getFile={getFile}/>
                {/* {mgmtQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                        <div className={classes.descrip}>
                            <div>{index+1}.</div>
                            <div className={classes.questionDescrip1}>{question.questionDescription}</div>
                                    <div className={question.file ? "display-image" :"display-none"}><br />
                                        <img src={question.file} alt="Q.img" className={classes.image}></img>
                                    </div>
                        </div>
                        <button onClick={()=>deleteMgmtQuestion(question.id)}>Delete</button>
                    </div>
                ))} */}

                {getQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                        <div className={classes.descrip}>
                            <div>{index+1}.</div>
                            <div className={classes.questionDescrip}>{question['description']}</div>
                                    <div className={question.file ? "display-image" :"display-none"}><br />
                                        <img src={question['questionImage']} alt="Q.img" className={classes.image}></img>
                                    </div>

                        </div>
                        <button onClick={ () => deleteMgmtQuestion(question['_id']) }>Delete</button>
                    </div>
                ))}
        </div>
    );
}
export default MgmtQuestions;
