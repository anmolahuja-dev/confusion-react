import React, { Component } from 'react';
import {Card, CardImg , CardText, CardBody, CardTitle, BreadcrumbItem ,
        Input,Breadcrumb,Button,Modal,ModalHeader, ModalBody,Row,Col, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';


const required = (val) => val && val.length;
const maxLengh = (len) => (val) => !(val) || (val.length <= len);
const minLengh = (len) => (val) => val && (val.length >= len);


    function RenderDish(props){
            return(
                <div> 
                    <Card>
                        <CardImg width="100%" src= {props.dish.image} alt={props.dish.name} />
                        <CardBody>
                        <CardTitle> {props.dish.name}</CardTitle>
                        <CardText>{props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>    
            );
    
        }

    function RenderComments ({comments}){
        var commentList = comments.map((comment)=>{
            return(
                <div>
                    
                        <li key= {comment.id}>
                            {comment.comment}
                        </li>
                        <br/>
                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        <br/><br/>
                </div>
            );
        })

        return(
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentList}
                </ul>   
                <CommentForm comments= {comments}/>    
            </div>
        );
    }
    
    class CommentForm extends Component {
        constructor(props){
            super(props);

            this.state ={
                isModalOpen : false
            };

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        
        handleSubmit (values){
            alert("Current State is:" + JSON.stringify(values));
            console.log("Current State is:" + JSON.stringify(values));
        }

        toggleModal(){
            this.setState({
            isModalOpen : !this.state.isModalOpen
        });
        }

        render(){
            return(
                <div>
                    <Button className="btn btn-outline-dark"
                        onClick= {this.toggleModal}>
                        <i className="fa fa-pencil fa-lg"></i>
                         Submit comment
                    </Button>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group" >
                                <Col md={10}>    
                                    <Label htmlFor="rating" >Rating</Label></Col>    
                                <Col md={12}>
                                    <Input type="select"  id="rating"
                                     name="rating"
                                     className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Input>
                                </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="firstname" md={12}>Your name</Label>
                                    <Col md={12}>
                                        <Control.text model=".firstname"
                                        id="firstname" name="firstname"
                                        placeholder= "Your Name"
                                        className="form-control"
                                        validators={{
                                            required,minLengh : minLengh(3),maxLengh: maxLengh(15)
                                        }}
                                        />
                                        <Errors className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLengh: 'Must be greater than 2 characters',
                                            maxLengh: 'Must be 15 characters or less'
                                        }} />

                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="message" md={12}>Your Feedback</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="6"
                                            className="form-control" />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Col md={{size:10}}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>    
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }

    const DishDetail = (props) => {
            console.log('DishDetail component render');
        
        if(props.dish){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                            <h3>{props.dish.name}</h3>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments= {props.comments}/>
                    </div>    
                </div>
            </div>     
        );
        }
        else {
            return (
                <div></div>
            );
        }
    }

export default DishDetail;