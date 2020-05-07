import React, { Component } from 'react';
import { Accordion, Card, Button, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import InputItem from '../InputItem/InputItem';
import './Home.css'
import { FaTrashAlt, FaBusinessTime, FaCheck } from 'react-icons/fa';
import { MdSchool, MdNotificationsActive, MdLocalGroceryStore, MdErrorOutline } from "react-icons/md";
import { AiTwotoneHome } from "react-icons/ai";
// asagıdaki kısım takvim icin
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'

// import FlipMove from 'react-flip-move'
// <FlipMove duration={250} easing='ease-out'></FlipMove>

import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Zoom from 'react-reveal/Zoom';

// ekran ayarlarını index.html'de yaptım

export class Home extends Component {

    state = {
        items: [],
        showFilteredTodos: 'all' // yapilan,yapilmayan ve hepsi ; filtreleme icin yazdim
    }

    itemReceiveHandler = todo => {
        //kisa yol
        this.setState({
            items: [todo, ...this.state.items]
        })
        //console.log(this.state)
    }


    toggleComplete = (id) => {
        this.setState({
            items: this.state.items.map(todo => { // items'deki todo ya gore map yapip id'si esit olan varsa islemleri yapiyor.yoksa bisey yapmiyor
                if (todo.id === id) {
                    return {
                        ...todo,
                        // id: todo.id,
                        // text: todo.text, yukaridaki bunlarla ayni isi gormus oluyor.
                        complete: !todo.complete
                        // complete'in durumunu tersine ceviriyor.
                    }
                } else {
                    return todo;
                }
            })
        })
    }

    deleteTodo = (id) => {
        this.setState({
            items: this.state.items.filter(todo => todo.id !== id)
        })
    }

    updateTextareaText = (event) => {// textarea kismindan girilen degerleri alip state'de degistiriyoruz
        this.setState({
            [event.target.detail]: event.target.value
        })
    }

    addIcon = (typeButton, id) => { // typeButton buttondan gelen parametreyi temsil ediyor. hangi butonda hengi parametreyi vermissek, tiklayinca o parametre typeButton'una esit oluyor.
        this.setState({
            items: this.state.items.map(todo => {
                if ('AiTwotoneHome' === typeButton && todo.id === id) {
                    return {
                        ...todo,
                        // id: todo.id,
                        // text: todo.text, yukaridaki bunlarla ayni isi gormus oluyor.
                        AiTwotoneHome: !todo.AiTwotoneHome
                        // true, false durumunu tersine ceviriyor.
                    }
                } else if ('FaBusinessTime' === typeButton && todo.id === id) {
                    return {
                        ...todo,
                        FaBusinessTime: !todo.FaBusinessTime
                    }
                } else if ('MdSchool' === typeButton && todo.id === id) {
                    return {
                        ...todo,
                        MdSchool: !todo.MdSchool
                    }
                } else if ('MdLocalGroceryStore' === typeButton && todo.id === id) {
                    return {
                        ...todo,
                        MdLocalGroceryStore: !todo.MdLocalGroceryStore
                    }
                } else if ('MdErrorOutline' === typeButton && todo.id === id) {
                    return {
                        ...todo,
                        MdErrorOutline: !todo.MdErrorOutline
                    }
                } else if ('MdNotificationsActive' === typeButton && todo.id === id) {
                    return {
                        ...todo,
                        MdNotificationsActive: !todo.MdNotificationsActive
                    }
                } else {
                    return todo;
                }
            })
        })
    }

    updateShowFilteredTodos = (y) => { // bu fonksiyon butonlara basinca orda yazdigimiz degerleri todoToShow'a deger olarak atiyor
        this.setState({
            showFilteredTodos: y
        })
    }

    render() {
        let items = [];

        if (this.state.showFilteredTodos === 'all') {
            items = this.state.items;
        } else if (this.state.showFilteredTodos === 'active') {
            items = this.state.items.filter(todo => !todo.complete);
        } else if (this.state.showFilteredTodos === 'complete') {
            items = this.state.items.filter(todo => todo.complete);
        }

        let addItemList = items.map((todo, i) => // burdaki todo state'deki items arrayi icindeki herbir objenin tamamı..

            <Card key={todo.id}>

                <Card.Header className='flex-container' style={{
                    padding: '0', height: '60px',
                    backgroundColor:
                        todo.complete ? '#3fc5f0' :
                            Date.now() - Date.parse(todo.date) > 172800000 ? '#ff7272' :
                                Date.now() - Date.parse(todo.date) > 0 ? '#eef5b2' :
                                    Date.now() - Date.parse(todo.date) < 0 ? '#6decb9' : ''
                }} >

                    {/* flex yaptim ama toggle ozelligi sadece yazida oldu. yani yaziya basinca calisiyor */}
                    <div>
                        <Accordion.Toggle
                            style={{ textDecorationColor: 'red', textDecoration: todo.complete ? 'line-through' : "" }} className='accordionToggle' as={Button} variant="link" eventKey={i}
                        >
                            {todo.title}

                        </Accordion.Toggle>
                    </div>

                    <div>
                        <Button // yapildi butonu
                            onClick={() => this.toggleComplete(todo.id)}
                            className='btn btn-success'
                        >
                            <FaCheck className='iconWidthHeight' />
                        </Button>

                        <Button // silme butonu
                            onClick={() => this.deleteTodo(todo.id)}
                            className='btn btn-danger'
                        >
                            <FaTrashAlt className='iconWidthHeight' />
                        </Button>
                    </div>

                </Card.Header>

                <Accordion.Collapse eventKey={i}>
                    <Card.Body className='p-0'>
                        <DatePicker
                            className="w-100 pl-4 border border-0"
                            selected={this.state.items[i].date} // burda okuyoruz. yani burda datadan okuyoruz
                            onChange={
                                date => {
                                    let itemList = [...this.state.items]
                                    itemList[i].date = date
                                    this.setState({ items: itemList })

                                    // console.log(Date.now())
                                    // console.log(Date.parse(date)) // normal tarihi milisaniyeye ceviriyor.
                                }
                            }
                            placeholderText="Set a Date"
                        />

                        <div className='pl-4 iconandDropDownButtons' >

                            <h6 className='m-0 pt-1' style={{ fontSize: '15px' }}>LABEL</h6>

                            {todo.AiTwotoneHome ? <AiTwotoneHome className='icons text-primary' onClick={() => this.addIcon('AiTwotoneHome', todo.id)} /> : ''}

                            {todo.FaBusinessTime ? <FaBusinessTime className='icons text-success' onClick={() => this.addIcon('FaBusinessTime', todo.id)} /> : ''}

                            {todo.MdSchool ? <MdSchool className='icons text-warning' onClick={() => this.addIcon('MdSchool', todo.id)} /> : ''}

                            {todo.MdLocalGroceryStore ? <MdLocalGroceryStore className='icons text-info' onClick={() => this.addIcon('MdLocalGroceryStore', todo.id)} /> : ''}

                            {todo.MdErrorOutline ? <MdErrorOutline className='icons text-danger' onClick={() => this.addIcon('MdErrorOutline', todo.id)} /> : ''}

                            {todo.MdNotificationsActive ? <MdNotificationsActive className='icons text-danger' onClick={() => this.addIcon('MdNotificationsActive', todo.id)} /> : ''}

                            <DropdownButton
                                className='dropDownButtonLabel'
                                as={ButtonGroup}
                                id={'dropdown-button-drop-left'}
                                drop={'left'}
                                variant="outline-primary"
                                title={'Label'}
                            >

                                <Dropdown.Item className='text-primary' eventKey="1" onClick={() => this.addIcon('AiTwotoneHome', todo.id)}><AiTwotoneHome /> Family</Dropdown.Item>

                                <Dropdown.Item className='text-success' eventKey="2" onClick={() => this.addIcon('FaBusinessTime', todo.id)}><FaBusinessTime /> Business</Dropdown.Item>

                                <Dropdown.Item className='text-warning' eventKey="3" onClick={() => this.addIcon('MdSchool', todo.id)}><MdSchool /> School</Dropdown.Item>

                                <Dropdown.Item className='text-info' eventKey="4" onClick={() => this.addIcon('MdLocalGroceryStore', todo.id)}><MdLocalGroceryStore /> Shopping</Dropdown.Item>

                                <Dropdown.Item className='text-danger' eventKey="5" onClick={() => this.addIcon('MdErrorOutline', todo.id)}><MdErrorOutline /> Important</Dropdown.Item>

                                <Dropdown.Item className='text-danger' eventKey="6" onClick={() => this.addIcon('MdNotificationsActive', todo.id)}><MdNotificationsActive /> Urgent</Dropdown.Item>

                            </DropdownButton>
                        </div>

                        <textarea
                            id='textareaa'
                            value={this.state.items.detail}
                            onChange={this.updateTextareaText}
                            rows='8'
                            className='w-100 pl-4 pt-0 border border-0'
                            placeholder="Please give me detail..."
                        />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );

        return (
            <div>
                <Fade left duration={1600}>
                    <Bounce bottom duration={1600}>
                        <div className="jumbotron jumbotron-fluid mb-4 py-1 text-center">
                            <div className="container">
                                <h1 className="display-3">
                                    <span class="textEfectRubberBrand" aria-hidden="true">Todos&nbsp;</span>
                                    <span class="textEfectRubberBrand" aria-hidden="true"> List</span>
                                </h1>
                                <p className="lead">
                                    <span class="textEfectRubberBrand" aria-hidden="true">Planlı bir hayat başarıya giden ilk adımdır.</span>
                                </p>
                            </div>
                        </div>
                    </Bounce>
                </Fade>

                <Fade right duration={1600}>
                    <Bounce bottom duration={1600}>
                        <InputItem
                            itemPipe={this.itemReceiveHandler} // aslında burada itemPipe ile gelen degerleri 
                            //itemReceiveHandler fonksiyonuna gonderiyoruz
                            //diger bir deyisle itemReceiveHandler fonksiyonunun kopyasını InputItem'e gonderiyoruz.

                            pHolder={"Enter new Item"} // bu ikisini props la gonderdim
                            btnText={"Add Item"}
                        />
                    </Bounce>
                </Fade>

                <Bounce bottom duration={1600}>
                    <Accordion>
                        {addItemList}
                    </Accordion>
                </Bounce>

                <Zoom top duration={1600}>
                    <div className='mt-3' style={{ display: 'flex' }}>
                        {/* bunlar filtreleme icin gerekli olan tuslar */}
                        <div style={{ width: '33.33%' }}>
                            <div className='mr-2'>
                                <Button className='buttonFilter bg-danger' variant="danger" onClick={() => this.updateShowFilteredTodos('active')}>ACTIVE</Button>
                            </div>
                        </div>
                        <div style={{ width: '33.33%' }}>
                            <div className='mx-2'>
                                <Button className='buttonFilter bg-primary' variant="primary" onClick={() => this.updateShowFilteredTodos('all')}>ALL</Button>
                            </div>
                        </div>
                        <div style={{ width: '33.33%' }}>
                            <div className='ml-2'>
                                <Button className='buttonFilter bg-success' variant="success" onClick={() => this.updateShowFilteredTodos('complete')}>COMPLETE</Button>
                            </div>
                        </div>
                    </div>
                </Zoom>
            </div>
        )
    }
}

export default Home
