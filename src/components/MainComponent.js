import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import Contact from './ContactComponent'
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS
        };
    }


    render() {
        const HomePage = () => {
            return (
                <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]} 
                      leader={this.state.leaders.filter((leader)=>leader.featured)[0]} 
                      promotion={this.state.promotions.filter((promo)=>promo.featured)[0]}></Home>
            )
        };

        const DishWithDetails = ({match}) => {
            return(
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                  comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
            );
        };

        const AboutUs = () => {
            return(
                <About leaders={this.state.leaders}/>
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/Menu' component={() => <Menu dishes={this.state.dishes} />} />
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

export default Main;
