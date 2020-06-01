import React from 'react';
import {Card, CardImg , CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import { Component } from 'react';


class DishDetail extends Component {
    constructor(props) {
        super(props)
    }


    renderDish(dish){
            return(
                <div> 
                    <Card>
                        <CardImg width="100%" src= {this.props.dish.image} alt={this.props.dish.name} />
                        <CardBody>
                        <CardTitle> {this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>    
            );
    
        }

    renderComments (comments){
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
            </div>
        );
    }    
    

    render (){
        if(this.props.dish){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
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
}
export default DishDetail;