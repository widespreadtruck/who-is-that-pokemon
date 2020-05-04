import React, { Component } from 'react';

class Button extends Component {
    constructor() {
        super();
        this.state = {
            isRightButtonClicked: false,
        }
    }
    handleCLick = (e)=>{
        e.preventDefault();
        // passing a parameter from the child to the parent
        this.props.view()
        //updating a boolean state when any button is clicked
        this.setState({
            isRightButtonClicked: !this.state.isRightButtonClicked,
        })

        //when any button is clicked wait for 2s and re-load the whole page
        setTimeout(() => {
            window.location.reload(false)
        }, 3000);
    }

    render(){
        return <button
        onClick={ this.handleCLick }
        className={
            this.state.isRightButtonClicked
            ? `options choiceMade orderButton${this.props.order}`
            : `options orderButton${this.props.order}`
        }>{this.props.loadName}</button>;
    }
}

export default Button;