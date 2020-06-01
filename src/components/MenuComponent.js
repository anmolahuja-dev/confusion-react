import React, { Component } from 'react';
import {Card, CardImg , CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';


class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {    
        }
        console.log('Menu component constructor');
    }

    componentDidMount(){
        console.log('Menu component ComponentDidMount');
    }

    render() {
        const menu = this.props.dishes.map( (dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card key={dish.id} onClick={()=> this.props.onClick(dish.id)}>
                        <CardImg width="100%" src= {dish.image} alt={dish.name} />
                            <CardImgOverlay className="ml-5">
                            <CardTitle> {dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        console.log('Menu component render');
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
             
            </div>
        );
    }
}

export default Menu;