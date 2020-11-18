import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import Contact from './ContactComponent'
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
    return{
        dishes     : state.dishes,
        comments   : state.comments,
        promotions : state.promotions,
        leaders    : state.leaders,
    }
}


class Main extends Component {
    constructor(props) {
        super(props);
  
    }


    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]} 
                      leader={this.props.leaders.filter((leader)=>leader.featured)[0]} 
                      promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}></Home>
            )
        };

        const DishWithDetails = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                  comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
            );
        };

        const AboutUs = () => {
            return(
                <About leaders={this.props.leaders}/>
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/Menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route exact path='/Menu/:dishId' component={DishWithDetails} />
                    <Route exact path='/contactus' component={Contact}/>
                    <Route exact path='/aboutus' component={AboutUs} />
                    <Redirect to='/home' ></Redirect>
                </Switch>
                <Footer />

            </div>
        );
    }


}

export default withRouter(connect(mapStateToProps)(Main));
