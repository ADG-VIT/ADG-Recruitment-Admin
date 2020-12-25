import React from "react";
import classes from './Leaderboard.module.css';
import search from '../../assets/img/search.png';
import spinner from '../../assets/img/spinner.svg';
import Detail from './Detail';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            inputText:"",
            searchReg:"",
            searchName:"",
            searchScore:"",
            selected:"",
        }
        this.inputValue=this.inputValue.bind(this);
        this.displaySearch=this.displaySearch.bind(this);
    }
    inputValue(event){
        this.setState({
            inputText:event.target.value,
        })
    }
    displaySearch(){
        this.props.details.map((deet) => {
            if(this.state.inputText===deet.regno){
                this.setState({
                    searchReg:deet.regno,
                    searchName:deet.name,
                    searchScore:deet.techscore>=0 ? deet.techscore : deet.designscore,
                    selected:deet.techscore ? "technical" : deet.designscore ? "design" : "management"
                })
            }
        })
    }

    render(){
        if(this.props.details.length>1){
        return(
            <div className={classes.container}>
                <div className={classes.wrapper}> <h2>{this.props.selected} Leaderboard</h2>
                <div className={classes.searchContainer}>
                    <input type="text" placeholder="Enter Regisration Number" name="search" className={classes.search} onChange={this.inputValue} autoComplete="off"/>
                    <img src={search} className={classes.btn} alt="search" onClick={this.displaySearch}/>
                </div>
                {this.state.searchName.length >=1 && this.props.selected===this.state.selected ? 
                    <div className={classes.textSearch}>
                        {this.state.selected!=='management' ?
                        <div className={classes.searchResults}>
                            <h4>{this.state.searchReg} - {this.state.searchName}</h4>
                            <h4>{this.state.searchScore} Points</h4>
                        </div>
                        : <div className={classes.searchResults}>
                            <h4>{this.state.searchName}</h4>
                            <h4>{this.state.searchReg}</h4>
                        </div>}
                    </div>
                : null }
                    {this.props.details.map((deet,index) => {
                        return (
                            <Detail detail={deet} selected={this.props.selected} key={index}/>
                        )
                })}
                </div>
                
            </div>
        )} else {
            return(
                <div className={classes.container}>
                    <div className={classes.wrapper}> <h2>{this.props.selected} Leaderboard</h2>
                    <img src={spinner} alt="Loading..." ></img>
                    </div>
                </div>
            )
        }
    }
}

export default Display;
