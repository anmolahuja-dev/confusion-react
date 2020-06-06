import React, { Component } from 'react';
import {Card, CardImg , CardText, CardBody, CardTitle, BreadcrumbItem ,
        Input,Breadcrumb,Button,Modal,ModalHeader, ModalBody,Row,Col, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

const required = (val) => val && val.length;
const maxLengh = (len) => (val) => !(val) || (val.length <= len);
const minLengh = (len) => (val) => val && (val.length >= len);


    function RenderDish(props){
            return(
                <div> 
                    <FadeTransform in 
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                    <Card>
                        <CardImg width="100%" src= {baseUrl+props.dish.image} alt={props.dish.name} />
                        <CardBody>
                        <CardTitle> {props.dish.name}</CardTitle>
                        <CardText>{props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                    </FadeTransform>
                </div>    
            );
    
        }

    function RenderComments ({comments,addComment,dishId}){
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
                    <Stagger in>
                        <Fade in>
                            {commentList}
                        </Fade>    
                    </Stagger>
                </ul>   
                    
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
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author,values.comment)
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
                                    <Label htmlFor="author" md={12}>Your name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author"
                                        id="author" name="author"
                                        placeholder= "Your Name"
                                        className="form-control"
                                        validators={{
                                            required,minLengh : minLengh(3),maxLengh: maxLengh(15)
                                        }}
                                        />
                                        <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLengh: 'Must be greater than 2 characters',
                                            maxLengh: 'Must be 15 characters or less'
                                        }} />

                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Your Feedback</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
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
        if(props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        
        else if(props.dish!= null){
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
                        <div className="scrollbar">
                            <RenderComments comments= {props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id} />
                        </div>    
                        <CommentForm dishId={props.dish.id} addComment={props.addComment} />
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