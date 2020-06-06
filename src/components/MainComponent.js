import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from "./HomeComponent";
import Header from './HeaderComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {postComment , fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    comments: state.comments,
    promotions : state.promotions,
    leaders : state.leaders 
  }
}

//here addcomment with four args will be passed to action creator and an action obj will be returned
//which is passed to the dispatch function as arguement
//states are updated via dispatch(action obj)
//now we can use addComment anywhere in our component
const mapDispatchToProps= (dispatch) => ({
  addComment : (dishId , rating, author,comment) => dispatch(postComment(dishId , rating, author,comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  fetchComments : () => {dispatch(fetchComments())},
  fetchPromos : () => {dispatch(fetchPromos())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))}
})

class Main extends Component {

    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
    }
    render() {

      const HomePage = ()=> {
        return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading= {this.props.dishes.isLoading}
              dishesErrMess= {this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promosLoading= {this.props.promotions.isLoading}
              promosErrMess= {this.props.promotions.errMess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
        );
      }
  
      const DishwithId = ({match}) => {
        return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId , 10))[0]}
            dishesLoading= {this.props.dishes.isLoading}
            errMess= {this.props.dishes.errMess}        
            comments={this.props.comments.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId , 10))}
            commentsErrMess= {this.props.comments.errMess}
            addComment={this.props.addComment}
          />
        );
      }

    return (
    <div >
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes}/>} /> 
        <Route path="/menu/:dishId" component={DishwithId}/>
        <Route exact path="/aboutus" component={() => <About leaders ={this.props.leaders} />}/>
    <Route exact path="/contactus" component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
        <Redirect to="/home" />
      </Switch> 
      <Footer />
    </div>
  );
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
