import React from "react";
import axios from "axios";
import {useState} from "react";
import {Alert, Button, Card, Col, Container, Dropdown, Form, FormControl, InputGroup, Row} from 'react-bootstrap';
import './MainComponent.css'

export default class MainComponent extends React.Component {
    state = {
        foodCategory: [],
        food: [],
        foodName: "",
        loadPage: true
    };

    componentDidMount() {
        axios.get(`http://localhost:8080/food/get-foodcategory-all`)
            .then(res => {
                const foodCategory = res.data;
                console.log(foodCategory);
                this.setState({foodCategory: foodCategory});
            });
    }

    fetchFood = (e) => {
        this.setState({loadPage: false});
        console.log(this.state.foodName)
        e.preventDefault();
        console.log("e val"+e.target.value)
        if(this.state.foodName===""){
            this.setState({food: []});
            console.log("food if empty return "+this.state.food.length);
        }else{
            axios.get(`http://localhost:8080/food/get-food-by-name-like/${this.state.foodName}`)
                .then(res => {
                    const food = res.data;
                    console.log("food"+food);
                    this.setState({food: food});
                    console.log(this.state.loadPage);
                    console.log("food if not return empty"+this.state.food.length);
                });
       }
        if(this.state.food.length){
            console.log("food not emprty");
        }else{
            console.log("food emprty");

        }
        }



    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Food Categories
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {this.state.foodCategory.map((foodCategoryDetail, index) => (
                                        <Dropdown.Item href="#/action-1"
                                                       key={foodCategoryDetail.name}>{foodCategoryDetail.name}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Food Name"
                                    aria-label="Food name"
                                    aria-describedby="basic-addon2"
                                    value={this.state.foodName}
                                    onChange={e => this.setState({foodName: e.target.value})}
                                    type="text"
                                />
                                <Button variant="secondary" id="button-addon2"
                                        onClick={(e) => this.fetchFood(e)}>
                                    Search
                                </Button>
                            </InputGroup>
                            { !this.state.loadPage && this.state.food.length===0? (<div><Alert variant="success">
                                <Alert.Heading>Opz, Sorry, No such Food</Alert.Heading>
                            </Alert></div>) : (
                                <div>{this.state.food.map((foodDetail, index) => (
                                    <div><Card key={foodDetail.name} style={{width: '18rem'}}>
                                        <Card.Img variant="top" src={foodDetail.imageUrl}/>
                                        <Card.Body>
                                            <Card.Title>{foodDetail.name}</Card.Title>
                                            <Card.Text>
                                                Category : {foodDetail.category.name}<br/>
                                                Price : {foodDetail.price}<br/>
                                                Qty : {foodDetail.qty}<br/>
                                                Producer : {foodDetail.producer.name}
                                            </Card.Text>
                                            <Button variant="success">Add to cart</Button>
                                        </Card.Body>
                                    </Card></div>))}</div>)}
                        </Col></Row></Container></div>
        );
    }
}


