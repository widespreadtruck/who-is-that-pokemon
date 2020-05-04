import React, { Component } from 'react';

class YesOrQuestionImage extends Component {
    render(){
        return (
            <img
                className='animated tada delay-4s'
                // at page load render a question mark
                //when a button is clicked, if the answer is correct render a check mark. Else - a red cross
                src={require(`./images/${this.props.rightAnswer}.png`)}
                alt=''
            />
        )
    }
}

export default YesOrQuestionImage;