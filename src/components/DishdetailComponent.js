import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    renderDish() {
        
        const dish = this.props.selectedDish;

        if (dish != null) {
            return (
                <Card key={dish.id}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody> 
                </Card>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    renderComments(dish) {

        if (dish != null) {

            const comments = dish.comments.map((comment) => {

                return (
                    <ul key={comment.id} className="list-unstyled">
                        <li>
                            {comment.comment}
                        </li>
                        <li>
                            -- {comment.author}, { }
                            {
                                new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: '2-digit'
                                }).format(new Date(Date.parse(comment.date)))
                            }
                        </li>
                    </ul>
                );
            });

            return (
                <div className="p-3">
                    <h4>Comments</h4>
                    { comments }
                </div>
            );

        } else {
            return (
                <div></div>
            );
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        { this.renderDish(this.props.selectedDish) }
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        { this.renderComments(this.props.selectedDish) }
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;