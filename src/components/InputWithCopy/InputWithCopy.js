import React, { Component  } from 'react'
import { Container, Row, Col , InputGroup, FormControl, Button} from 'react-bootstrap';

export default class InputWithCopy extends Component {

    

    constructor(props){
        super(props)
        this.textAreaRef = React.createRef();
        this.copyToClipboard = this.copyToClipboard.bind(this)
        
    }

    copyToClipboard(e){

        this.textAreaRef.current.select();
        console.log("select" ,this.textAreaRef.current)
        document.execCommand('copy');

        //Show the confirmation
        this.props.onCopy();
    }


    render() {

        const { label, text, isDisabled } = this.props;
        return (
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text> {label} </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl readOnly={true} as="input" aria-label="With textarea" value={text}  ref={this.textAreaRef}/>
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={this.copyToClipboard}><i className="fa fa-copy"></i></Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}
