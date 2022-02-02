import React from "react";
import classes from './Leaderboard.module.css';
import userPic from '../../assets/img/pic.png';

class Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state =  {
            showInfo:false,
        }
        this.setShowInfo=this.setShowInfo.bind(this);
        this.acceptUser=this.acceptUser.bind(this);
        this.rejectUser=this.rejectUser.bind(this);
    }
    setShowInfo(){
        this.setState({
            showInfo:!this.state.showInfo,
        })
    }
    async acceptUser(regno,domain){
        await fetch(`https://recruitment2022.herokuapp.com/admin//acceptuser?domain=${domain}&regno=${regno}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": sessionStorage.getItem("admin")
                },
            })
            .then(function (response) {
                // console.log("response",response);
                return response.json();
            }).then(data => {
                // console.log("data",data);
                alert(data.message);
            }).catch(error => {
                // console.log(error);
                alert("Error: ", error);
            })
        }
        async rejectUser(regno,domain){
            // console.log(regno,domain)
            await fetch(`https://recruitment2022.herokuapp.com/admin/rejectuser?domain=${domain}&regno=${regno}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": sessionStorage.getItem("admin")
                    },
                })
                .then(function (response) {
                    // console.log("response reject",response);
                    return response.json();
                }).then(data => {
                    // console.log("data 2",data);
                    alert(data.message);
                }).catch(error => {
                    // console.log(error);
                    alert("Error: ", error);
                })
            }
    render(){
        const colors = ["#475897", "#7A12CB","#AA1047","#4E9747","#CD7173","#c78b2b","#111","#027AFF","#cd5d7d"];
        const random = Math.floor(Math.random() * 9);
        const mystyle={
            backgroundColor:colors[random]
        }
        return(
            <div className={classes.textContainer} >
                <div className={classes.text}>
                    {this.props.detail['selected']!=='management' ? 
                        <div className={classes.mainDetails}>
                            <div className={classes.imgContainer}><img id='userpic' src={userPic} alt='User pic' style={mystyle}/><h4>{this.props.detail['regno']} - {this.props.detail['name']}</h4></div>
                                <div className={classes.box}>
                                    <h4>{this.props.detail['techscore']>=0 ? this.props.detail['techscore'] : this.props.detail['designscore']} Points</h4>
                                    <button className={classes.expand} onClick={this.setShowInfo}>{this.state.showInfo ? "–" : "+" }</button>
                                </div>
                            </div> :
                            <div className={classes.mainDetails}>
                                <div className={classes.imgContainer}><img id='userpic' src={userPic} alt='User pic' style={mystyle}/><h4>{this.props.detail['name']}</h4></div>
                                    <div className={classes.box}>
                                        <h4>{this.props.detail['regno']}</h4>
                                        <button className={classes.expand} onClick={this.setShowInfo}>{this.state.showInfo ? "–" : "+" }</button>
                                    </div>
                                </div>}
                                {this.state.showInfo ? 
                                    <div className={classes.subDetails}>
                                    <div className={classes.selectionContainer}>
                                        <input type="radio" value="accept" onClick={()=>{this.acceptUser(this.props.detail['regno'],this.props.selected)}} name={this.props.detail['regno']+this.props.selected} id="accept" className={classes.input1} checked={this.state.checked}></input>
                                        <label htmlFor="accept" className={classes.selection} style={{userSelect:"none"}}><p className={classes.select}>Accept</p></label>
                                        <input type="radio" value="reject" onClick={()=>this.rejectUser(this.props.detail['regno'],this.props.selected)} name={this.props.detail['regno']+this.props.selected} id="reject" className={classes.input2}></input>
                                        <label htmlFor="reject" className={classes.selection} style={{userSelect:"none"}}><p className={classes.select}>Reject</p></label>
                                    </div>
                                    <p>Phone: {this.props.detail['phone']}</p>
                                    <p>Email: {this.props.detail['email']}</p>
                                </div>: null}
                                </div>
                            </div>
        )
    }
}
export default Detail;