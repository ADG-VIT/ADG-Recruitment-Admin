import React from "react";
import classes from './Details.module.css';
import { Link } from 'react-router-dom';

    class Details extends React.Component {
        tech=[];
        constructor(props) {
            super(props);
            this.state =  {
                techDetails:[],
                designDetails:[],
                mgmtDetails:[],
                inputText:"",
                searchTech:"",
                searchTechScore:"",
                searchDesign:"",
                searchDesignScore:"",
                searchMgmt:"",
                searchMgmtScore:"",
            };
            this.inputValue=this.inputValue.bind(this);
            this.displayTech=this.displayTech.bind(this);
            this.displayDesign=this.displayTech.bind(this);
            this.displayMgmt=this.displayTech.bind(this);
        }
        inputValue(event){
            this.setState({
                inputText:event.target.value
            })
        }
        displayTech(){
            this.state.techDetails.map((deet) => {
                if(this.state.inputText===deet.regno){
                    this.setState({
                        searchTech:deet.regno,
                        searchTechScore:deet.techscore
                    })
                }
        })
    }
    //     displayDesign(){
    //         this.state.designDetails.map((deet) => {
    //             if(this.state.inputText===deet.regno){
    //                 this.setState({
    //                     searchDesign:deet.regno,
    //                     searchDesignScore:deet.designscore
    //                 })
    //             }
    //     })
    // }
    // displayMgmt(){
    //     this.state.mgmtDetails.map((deet) => {
    //         if(this.state.inputText===deet.regno){
    //             this.setState({
    //                 searchMgmt:deet.regno,
    //                 searchMgmtScore:deet.managementscore
    //             })
    //         }
    // })
    // }
        async getTechDetails() {
            await fetch("https://adgrecruitments.herokuapp.com/admin/getalldetailsuser?domain=technical&year=1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmMyNmI1NTNiNzgwMTE4N2IyZWE4ZTgiLCJpYXQiOjE2MDgyNjk0MDd9.UChpCOPWAiBfQnFwG0mDqb9iGjVqjvLBMf4Rtj5IURI",
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    techDetails:data.details,
                })
            })
            .catch((error) => {
                // console.log(error.message);
                alert(error.message);
            })
        }
        async getDesignDetails() {
            await fetch("https://adgrecruitments.herokuapp.com/admin/getalldetailsuser?domain=design&year=1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmMyNmI1NTNiNzgwMTE4N2IyZWE4ZTgiLCJpYXQiOjE2MDgyNjk0MDd9.UChpCOPWAiBfQnFwG0mDqb9iGjVqjvLBMf4Rtj5IURI",
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    designDetails:data.details,
                })
            })
            .catch((error) => {
                // console.log(error.message);
                alert(error.message);
            })
        }
        async getMgmtDetails() {
            await fetch("https://adgrecruitments.herokuapp.com/admin/getalldetailsuser?domain=management&year=1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmMyNmI1NTNiNzgwMTE4N2IyZWE4ZTgiLCJpYXQiOjE2MDgyNjk0MDd9.UChpCOPWAiBfQnFwG0mDqb9iGjVqjvLBMf4Rtj5IURI",
                },
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    mgmtDetails:data.details,
                })
            })
            .catch((error) => {
                // console.log(error.message);
                alert(error.message);
            })
        }
        componentDidMount() {
            this.getTechDetails();
            this.getDesignDetails();
            this.getMgmtDetails();
        }
        render(){
            return(
                <div className={classes.container}>
                    {/* <Link to="/user-info"><button>Hello</button></Link> */}
                    <div>
                    <input type="text" placeholder="Search.." name="search" className={classes.search}/>
                    <button className={classes.button}>Search</button>
                    </div>
                    <div className={classes.tabular}>
                        <div className={classes.technical}>
                            <h2 className={classes.header}>Technical</h2>
                            <div className={classes.text}>
                            <h3>Registration No.</h3>
                            <h3>Score</h3>
                            </div>
                            <div className={classes.text}>
                            <input type="text" onChange={this.inputValue} placeholder="Search.." name="search" className={classes.search1}/>
                            <button className={classes.btn} onClick={this.displayTech}>Search</button>
                            </div>
                            <div className={classes.textSearch}>
                                <h4>{this.state.searchTech}</h4>
                                <h4>{this.state.searchTechScore}</h4>
                            </div>
                             {this.state.techDetails.map((deet) => {
                                    return (
                                       <div className={classes.text}>
                                           <h4>{deet.regno}</h4>
                                           <h4>{deet.techscore}</h4>
                                       </div>
                                    )
                                })}
                        </div>
                        <div className={classes.design}>
                        <h2 className={classes.header}>Design</h2>
                        <div className={classes.text}>
                            <h3>Registration No.</h3>
                            <h3>Score</h3>
                            </div>
                            <div className={classes.text}>
                            <input type="text" onChange={this.inputValue} placeholder="Search.." name="search" className={classes.search1}/>
                            <button className={classes.btn} onClick={this.displayDesign}>Search</button>
                            </div>
                            <div className={classes.textSearch}>
                                <h4>{this.state.searchDesign}</h4>
                                <h4>{this.state.searchDesignScore}</h4>
                            </div>
                            {this.state.designDetails.map((deet) => {
                                    return (
                                       <div className={classes.text}>
                                           <h4>{deet.regno}</h4>
                                           <h4>{deet.designscore}</h4>
                                       </div>
                                    )
                                })}
                        </div>
                        <div className={classes.management}>
                        <h2 className={classes.header}>Management</h2>
                        <div className={classes.text}>
                            <h3>Registration No.</h3>
                            <h3>Score</h3>
                            </div>
                            <div className={classes.text}>
                            <input type="text" onChange={this.inputValue} placeholder="Search.." name="search" className={classes.search1}/>
                            <button className={classes.btn} onClick={this.displayMgmt}>Search</button>
                            </div>
                            <div className={classes.textSearch}>
                                <h4>{this.state.searchMgmt}</h4>
                                <h4>{this.state.searchMgmtScore}</h4>
                            </div>
                            {this.state.mgmtDetails.map((deet) => {
                                    return (
                                       <div className={classes.text}>
                                           <h4>{deet.regno}</h4>
                                           <h4>{deet.managementscore}</h4>
                                       </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            )
        }}
        export default Details;