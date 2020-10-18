import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCommentModalOpen: false
        }
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
    }

    toggleCommentModal() {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Your Comment has been submitted: " + JSON.stringify(values));
        alert("Your Comment has been submitted: " + JSON.stringify(values));
        this.toggleCommentModal();
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleCommentModal}>
                    <span className="fa fa-pencil fa-lg"> SubmitComment</span>
                </Button>

                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal} >
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" className="form-control" name="rating" >
                                    <option>1</option>    
                                    <option>2</option>    
                                    <option>3</option>    
                                    <option>4</option>    
                                    <option>5</option>    
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author"
                                    id="author" 
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 character',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment"
                                    id="comment" 
                                    name="comment"
                                    className="form-control"
                                    rows="6"
                                />
                            </div>
                            <div className="form-groupt">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDish({dish}) {   
    
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

function RenderComments({comments}) {

    if (comments != null) {

        const comment = comments.map((comment) => {
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
                { comment }
                <CommentForm />
            </div>
        );

    } else {

        return (
            <div></div>
        );
    }
} 

const DishDetail = (props) => {

    if (props.dish != null) {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );

    } else {

        return (
            <div></div>
        );
    }
}

export default DishDetail;