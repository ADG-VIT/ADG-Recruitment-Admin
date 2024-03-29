import React from "react";
import axios from "axios";
import classes from './Leaderboard.module.css';
// import { Link } from 'react-router-dom';
import Background from '../../hoc/Background/Background';
import search from '../../assets/img/search.png';
import file from '../../assets/img/file.png';
import Display from './Display';
import UserCard from '../UserCard/UserCard';

class Leaderboard extends React.Component {
    // searchReg=""
    constructor(props) {
        super(props);
        this.state =  {
            selectedVal:"",
            selectedYear:2,
            details:[], 
            searchReg:"", 
            user:"",
            showModal:false
        }
        this.getSelectedVal=this.getSelectedVal.bind(this);
        this.getSelectedYear=this.getSelectedYear.bind(this);
        this.searchDetails=this.searchDetails.bind(this);
        this.getUser=this.getUser.bind(this);
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }
    showModal(){
        this.setState({
            showModal:true,
            searchReg:""
        })
    }
    hideModal(){
        this.setState({
            showModal:false,
            searchReg:""
        })
    }
    getSelectedVal(event){
        this.setState({
            selectedVal:event.target.value
        })
    }
    getSelectedYear(event){
        this.setState({
            selectedYear:parseInt(event.target.value)
        })
    }
    searchDetails(event){
        this.setState({
            searchReg:event.target.value
        })
    }
    async getDetails(val) {
        await fetch(`https://recruitment2022.herokuapp.com/admin/getalldetailsuser?domain=${val}&year=${this.state.selectedYear}`, {  
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
            this.setState({
                details:data.details,
            })
            // console.log(this.state.details);
        })
        .catch((error) => {
            // console.log(error.message);
            alert(error.message);
        })
    }
    async getUser() {
        const config={
            method:'GET',
            url:`https://recruitment2022.herokuapp.com/admin/getspecificuser?regno=${this.state.searchReg}`,
            headers:{
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("admin")
            }
        }
        let response=await axios(config)
        let data=response.data
        // console.log("data",data);
        this.setState({
            user:data.details
        })
        // console.log("user",this.state.user);   
    }
    handleClick(){
        this.showModal();
        this.getUser();
    }
    render(){
        return(
            <Background>
                {/* <button onClick={this.showModal}>Hello</button> */}
                <div className={classes.searchTopContainer}>
                    <input type="text" onChange={this.searchDetails} value={this.state.searchReg} placeholder="Enter Regisration Number" name="search" className={classes.searchTop} autoComplete="off"/>
                    <img src={search} className={classes.btnTop} alt="search" onClick={this.handleClick}/>
                </div>
                <UserCard show={this.state.showModal} onHide={this.hideModal} user={this.state.user} searchReg={this.state.searchReg}/>
                <div className={classes.dropDown} onChange={this.getSelectedYear}>
                <label htmlFor="yearofstudy">Choose year:</label>
                    <select name="yearofstudy" id="yearofstudy">
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </div>
            <form>
                <div className={classes.formContainer} onChange={this.getSelectedVal}>
                    <div className={classes.labelContainer}>
                        <svg width="30" height="30" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M42.8952 20.121L49.3 20.975C49.7008 21.0282 50 21.3702 50 21.7742V28.2258C50 28.6298 49.7008 28.9718 49.3 29.0258L42.8952 29.8798C42.479 31.4089 41.8726 32.8581 41.1024 34.2024L45.029 39.3371C45.275 39.6581 45.2444 40.1113 44.9589 40.3968L40.3968 44.9589C40.2403 45.1153 40.0339 45.1952 39.8258 45.1952C39.654 45.1952 39.4815 45.1411 39.3363 45.029L34.2016 41.1024C32.8573 41.8726 31.4081 42.479 29.879 42.8952L29.025 49.3C28.9718 49.7008 28.6298 50 28.2258 50H21.7742C21.3702 50 21.0282 49.7008 20.975 49.2992L20.121 42.8944C18.5919 42.4782 17.1427 41.8718 15.7984 41.1016L10.6637 45.0282C10.5185 45.1403 10.346 45.1944 10.1742 45.1944C9.96613 45.1944 9.75968 45.1145 9.60323 44.9581L5.04113 40.396C4.75565 40.1105 4.72581 39.6573 4.97097 39.3363L8.89758 34.2016C8.12742 32.8573 7.52097 31.4081 7.10484 29.879L0.7 29.025C0.299194 28.9718 0 28.6298 0 28.2258V21.7742C0 21.3702 0.299194 21.0282 0.700806 20.9742L7.10565 20.1202C7.52177 18.5911 8.12823 17.1419 8.89839 15.7976L4.97177 10.6629C4.72581 10.3419 4.75645 9.88871 5.04194 9.60323L9.60403 5.04113C9.88952 4.75484 10.3427 4.72419 10.6637 4.97097L15.7984 8.89758C17.1427 8.12742 18.5919 7.52097 20.121 7.10484L20.975 0.7C21.0282 0.299194 21.3702 0 21.7742 0H28.2258C28.6298 0 28.9718 0.299194 29.0258 0.700806L29.8798 7.10565C31.4089 7.52177 32.8581 8.12823 34.2024 8.89839L39.3371 4.97177C39.6581 4.72419 40.1105 4.75564 40.3968 5.04194L44.9589 9.60403C45.2444 9.88952 45.2742 10.3427 45.029 10.6637L41.1024 15.7984C41.8726 17.1427 42.479 18.5919 42.8952 20.121ZM17.7418 25C17.7418 29.0089 20.991 32.2581 24.9999 32.2581C29.0088 32.2581 32.258 29.0089 32.258 25C32.258 20.9911 29.0088 17.7419 24.9999 17.7419C20.991 17.7419 17.7418 20.9911 17.7418 25Z" fill="white"/>
                        </svg>
                        <input type="radio" value="technical" name="selection" id="technical"  className={classes.input} ></input>
                        <label htmlFor="technical" onClick={()=>this.getDetails("technical")}><p>Technical</p></label>
                    </div>
                    <div className={classes.labelContainer}>
                        <svg width="30" height="30" viewBox="0 0 55 43" xmlns="http://www.w3.org/2000/svg">
                            <path d="M49.6774 0.887097C47.0454 0.887097 44.8587 2.80944 44.4347 5.32258H33.7097V0.887097C33.7097 0.397419 33.3123 0 32.8226 0H22.1774C21.6877 0 21.2903 0.397419 21.2903 0.887097V5.32258H10.5653C10.1413 2.80944 7.9546 0.887097 5.32258 0.887097C2.38718 0.887097 0 3.27427 0 6.20968C0 9.14508 2.38718 11.5323 5.32258 11.5323C7.9546 11.5323 10.1404 9.60992 10.5653 7.09677H21.2903V11.5323C21.2903 12.0219 21.6877 12.4194 22.1774 12.4194H32.8226C33.3123 12.4194 33.7097 12.0219 33.7097 11.5323V7.09677H44.4347C44.8587 9.60992 47.0454 11.5323 49.6774 11.5323C52.6128 11.5323 55 9.14508 55 6.20968C55 3.27427 52.6128 0.887097 49.6774 0.887097Z" fill="white"/>
                            <path d="M7.09699 29.2741V30.1612H2.66151C2.17183 30.1612 1.77441 30.5586 1.77441 31.0483V41.6935C1.77441 42.1832 2.17183 42.5806 2.66151 42.5806H13.3067C13.7963 42.5806 14.1938 42.1832 14.1938 41.6935V31.0483C14.1938 30.5586 13.7963 30.1612 13.3067 30.1612H8.87119V29.2741C8.87119 22.0319 13.1275 15.4975 19.5163 12.4539V10.512C12.0993 13.6772 7.09699 21.0596 7.09699 29.2741Z" fill="white"/>
                            <path d="M47.9028 29.2741V30.1612H52.3382C52.8279 30.1612 53.2253 30.5586 53.2253 31.0483V41.6935C53.2253 42.1832 52.8279 42.5806 52.3382 42.5806H41.6931C41.2034 42.5806 40.806 42.1832 40.806 41.6935V31.0483C40.806 30.5586 41.2034 30.1612 41.6931 30.1612H46.1286V29.2741C46.1286 22.0319 41.8723 15.4975 35.4834 12.4539V10.512C42.9004 13.6772 47.9028 21.0596 47.9028 29.2741Z" fill="white"/>
                        </svg>
                            <input type="radio" value="design" name="selection" id="design" className={classes.input} ></input>
                            <label htmlFor="design" onClick={()=>this.getDetails("design")}><p>Design</p></label>
                    </div>
                    <div className={classes.labelContainer}>
                            {/* <svg width="30" height="30" viewBox="0 0 45 56" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.4995 1.42743V13.5H43.5721L31.4995 1.42743Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M29.7 14.4V0H1.8C0.8055 0 0 0.8055 0 1.8V54C0 54.9945 0.8055 55.8 1.8 55.8H43.2C44.1945 55.8 45 54.9945 45 54V15.3H30.6C30.1032 15.3 29.7 14.8968 29.7 14.4ZM11.6993 14.4H18.8993C19.397 14.4 19.7993 14.8032 19.7993 15.3C19.7993 15.7968 19.397 16.2 18.8993 16.2H11.6993C11.2016 16.2 10.7993 15.7968 10.7993 15.3C10.7993 14.8032 11.2016 14.4 11.6993 14.4ZM11.6993 43.2H33.2993C33.797 43.2 34.1993 42.7968 34.1993 42.3C34.1993 41.8032 33.797 41.4 33.2993 41.4H11.6993C11.2016 41.4 10.7993 41.8032 10.7993 42.3C10.7993 42.7968 11.2016 43.2 11.6993 43.2ZM33.2993 34.2H11.6993C11.2016 34.2 10.7993 33.7968 10.7993 33.3C10.7993 32.8032 11.2016 32.4 11.6993 32.4H33.2993C33.797 32.4 34.1993 32.8032 34.1993 33.3C34.1993 33.7968 33.797 34.2 33.2993 34.2ZM33.2993 25.2C33.797 25.2 34.1993 24.7968 34.1993 24.3C34.1993 23.8032 33.797 23.4 33.2993 23.4H11.6993C11.2016 23.4 10.7993 23.8032 10.7993 24.3C10.7993 24.7968 11.2016 25.2 11.6993 25.2H33.2993Z" fill="white"/>
                            </svg> */}
                            <img src={file} alt="file" className={classes.file}/>
                        <input type="radio" value="management" name="selection" id="management" className={classes.input} ></input>
                        <label htmlFor="management"  onClick={()=>this.getDetails("management")}><p>Management</p></label>
                    </div>    
                </div>
            </form>
            {this.state.selectedVal==='technical' ?
                <Display details={this.state.details} selected={this.state.selectedVal}/> :
                this.state.selectedVal==='design' ? 
                <Display details={this.state.details} selected={this.state.selectedVal}/> :
                this.state.selectedVal==='management' ?
                <Display details={this.state.details} selected={this.state.selectedVal}/> :
                null
            }
            </Background>
        );
    }
}
export default Leaderboard;

