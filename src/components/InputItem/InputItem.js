import React, { Component } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import shortid from 'shortid';

class InputItem extends Component {

    state = {
        title: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        // input'a girilen degerleri yani name='text' de girilen degeri atama yapıyorum
        // state'deki title 'a girilen degeri atiyorum
    }

    itemSendHandler = (event) => {
        event.preventDefault();
        if (this.state.title !== '') { // burayi Bos deger girilememesi icin yaptım
            this.props.itemPipe({
                id: shortid.generate(), // benzersiz kisa id uretiyor
                title: this.state.title,
                complete: false,
                detail: '',

                AiTwotoneHome: false,
                FaBusinessTime: false,
                MdSchool: false,
                FaExclamationCircle: false,
                MdErrorOutline: false,
                MdNotificationsActive: false
            })
            this.setState({ // bu kisim input yazilan yerin temizlenmesi icin.
                title: ""
            })
        }
    }

    render() {

        return (

            <div>
                <form onSubmit={this.itemSendHandler}>
                    <InputGroup className="mb-3">
                        <FormControl
                            name="title"
                            // girilen degeri buradan gonderiyoruz. name='title' diyoruz. title inputtan girilen 
                            // degerler oluyor. event.target.value yazarak inputten girilen degere ulasmis oluyoruz. handleChange fonksiyonu ile

                            value={this.state.title}
                            placeholder={this.props.pHolder} // propsla Home.js'den aldik
                            aria-label={this.props.pHolder}  // propsla Home.js'den aldik

                            onChange={this.handleChange}

                            autoComplete='off' // onceden yazilanlarin cikmamasi icin
                            aria-describedby="basic-addon2"
                        />

                        <InputGroup.Append>
                            <Button onClick={this.itemSendHandler} type="submit" variant="outline-primary" style={{ width: "104px" }}>{this.props.btnText}</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </form>
            </div>
        )
    }
}

export default InputItem
