import React,{ useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Modal from '../Modal/Modal';
import classes from "./Questions.module.css";

let questionid;
let index=0;
let optionNo=0;
let getQuestions=[];
const TechQuestions = (props)=>{
    const [questionDescription, setQuestionDescription]=useState("");
    let inputValue = (event)=>{ setQuestionDescription(event.target.value) }

    const [yearofstudy,setYearofstudy]=useState(1);
    let yearValue = (event) =>{ setYearofstudy(event.target.value) }

    const [files, setFiles] = useState({});
    let getFile = (file)=>{ setFiles(file) }

    const [inputOption,setInputOption]=useState("");
    let optionValue = (event)=>{ setInputOption(event.target.value) }

    const [options,setOptions]=useState({});

    const optionsArray = ["a", "b", "c", "d"];

    function addOption(questionDescription){
        if(questionDescription!==""){
            optionNo++;
            if(optionNo<=4){
            setOptions((prevOptions)=>{
                setInputOption("");
                return {...prevOptions,[optionsArray[index-1]]:questionDescription}});
            // console.log(options);
            index++;
            } else 
            {
                alert("Only 4 options per question!")
                setInputOption("");
            };
        }
    }
    const[correctOption,setCorrectOption]=useState("")
    let getCorrectOption = (event)=>{ setCorrectOption(event.target.value) }

    let generateId = () => { questionid = uuid() }

        // const [techQuestions,setTechQuestions]=useState([
        // {
        //     id:uuid(),
        //     questionDescription: "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
        //     options : {
        //        1:"pop()",
        //        2:"push()",
        //        3:"map()",
        //        4:"join()"
        //     },
        //     correctOption :"c",
        //     yearofstudy:1,
        //     file:{}
        //    }
        // ]);

        async function addTechQuestion(){
            // setTechQuestions((prevQ)=>{
            //     return [...prevQ,{id:questionid,questionDescription:questionDescription,yearofstudy:yearofstudy,options:options,file:files.base64,correctOption:correctOption}]
            // })
            // console.log(techQuestions);
            const questionObject = {questionDescription:questionDescription, options:options, correctOption:correctOption, yearofstudy:yearofstudy, questionImage:files.base64};

            console.log(sessionStorage.getItem("admin"));

            await fetch("https://recruitment2022.herokuapp.com/admin/technical/add-question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("admin"),
                },
                body: JSON.stringify(questionObject)
            })
            .then(function (response) {
                // console.log(questionObject);
                // console.log(response);
                return response.json();
                // if(response.status === 200)
                //     return response.json();
                // else
                //     throw Error(response.statusText);
            }).then(data => {
                // console.log(data);
                // getTechQuestions();
            }).catch(error => {
                // console.log(error);
                alert("Error: ", error);
            })
            // console.log(techQuestions);
            getTechQuestions();
            clearAll();
        }

        let [getQuestions, setGetQuestions] = useState([]);

        useEffect(() => {
            getTechQuestions();
        }, []);

        function getTechQuestions() {
            fetch("https://recruitment2022.herokuapp.com/admin/technical/get-all-questions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("admin"),
                },
            })
            .then((response) => {
                // const allQuestions = response.data.questions;
                // console.log(response);
                // console.log(response.data);
                // setGetQuestions(allQuestions);
                return response.json();
            })
            .then((data) => {
                // console.log("data",data.questions);
                setGetQuestions(data.questions);
            })
            // .then((data) => {
            //     getQuestions=data.questions;
            //     // getQuestions.map(question=>{
            //     //     console.log("description",question['questionDescription']);
            //     //     console.log("options",question['options']);
            //     //     console.log("file",question['file']);
            //     // })
            // })
            .catch(error => console.log(error));
        }

        // var questionsLength = getQuestions.length;
        // for(let i = 0; i < l; i++) {

        // }

        // window.addEventListener('onload',getTechQuestions);

        async function deleteTechQuestion(_id){
            // setTechQuestions((prevQ)=>{
            //     return prevQ.filter((question,index)=>{
            //         return question.id !==id;
            //     })
            // })

            await fetch("https://recruitment2022.herokuapp.com/admin/technical/delete-question/" + _id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("admin"),
                }
            })
            .then((response) => {
                console.log(response);
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

            getTechQuestions();
        }

        let clearAll = () => {
            setCorrectOption("");
            setQuestionDescription("");
            setOptions({});
            setFiles({});
            index=0;
            optionNo=0;
        }

   const [showModal,setShowModal]=useState(false);
    let showModal1 = () => { setShowModal(true) }
    let hideModal = () => { setShowModal(false) }

    let multipleFunctions = () => { showModal1(); generateId(); }

    let showQuestions=props.selectedValue==="technical" ? "technical": "display-none";
    return(
        <div className={showQuestions}>
            <div className={classes.top}>
            <h2>Questionare:</h2>
            <button type="button" className={classes.addBtn} onClick={multipleFunctions}>Add Question</button>
            </div>
            <Modal show={showModal} onHide={hideModal} genId={generateId} selected={props.selectedValue} 
            setQuestionDescription={inputValue} inputYear={yearValue} questionDescription={questionDescription} optionText={inputOption}
            addQuestion={addTechQuestion} id={questionid} 
            addOption={addOption} inputOption={optionValue} inputOptionVal={inputOption} options={options} 
            correctOption={correctOption} getCorrectOption={getCorrectOption}
            getFile={getFile} onClear={clearAll}
            />
                {getQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                        <div>
                            <div className={classes.options}>
                                <div>{index+1}.</div>
                                <div className={classes.questionDescrip}>{question['questionDescription']}</div>
                                <div className={question['file'] ? "display-image" :"display-none"}>
                                <img src={question['file']} alt="Q.img" className={classes.image}></img>
                                </div>
                            </div>

                            <OptionsDisplay questions={question['options']} correctOption={question['correctOption']}/>
                        </div>
                        <button onClick={()=>deleteTechQuestion(question['_id'])}>Delete</button>
                    </div>
                ))}

                {/* {techQuestions.map((question,index)=>(
                    <div className={classes.questions} key={index}>
                        <div>
                            <div className={classes.options}>
                                <div>{index+questionsLength+1}.</div>
                                <div className={classes.questionDescrip}>{question.questionDescription}</div>
                                <div className={question.file ? "display-image" :"display-none"}>
                                <img src={question.file} alt="Q.img" className={classes.image}></img>
                                </div>
                            </div>
                            <OptionsDisplay questions={question.options}/>
                        </div>
                        <button onClick={()=>deleteTechQuestion(question.id, getQuestions[index+questionsLength]['_id'])}>Delete</button>
                    </div>
                ))} */}
        </div>
    );
}
export default TechQuestions;

export const OptionsDisplay = (props) => {
    const questions=props.questions;
    const correctOption = props.correctOption;
    if(props.questions){
    return(
        <div>
            {Object.keys(questions).map((key, index) => {
                if(key===correctOption) {
                    return (
                        <div className={classes.optionsContainerBlue} key={index}>
                            <div className={classes.index}>{key}.</div>
                            <div key={index}>{questions[key]}</div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className={classes.optionsContainer} key={index}>
                            <div className={classes.index}>{key}.</div>
                            <div key={index}>{questions[key]}</div>
                        </div>
                    )
                }
            })}
        </div>
    )} else {
        return null
    }
}
