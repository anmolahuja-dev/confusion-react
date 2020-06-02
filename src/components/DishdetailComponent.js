import React from 'react';
import {Card, CardImg , CardText, CardBody, CardTitle, BreadcrumbItem ,Breadcrumb} from 'reactstrap';
import {Link} from 'react-router-dom';




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
            </div>
        );
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