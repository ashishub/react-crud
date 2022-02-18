import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import TutorialDataService from "../services/tutorial.service";
function EditTutorial(props) {

    const { id } = useParams();
    const navigate = useNavigate();
    // const { id } = match.params;
    // console.log("Match = "+match.params);
    // console.log("Match Id = "+match.params.id);

    console.log("Match = " + id);


    // alert("ID received is :: "+id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [published, setPublished] = useState(false);
    const [message, setMessage] = useState('');
    const [currentTutorial, setCurrentTutorial] = useState(null);


    // this.getTutorial(this.props.match.params.id);

    function getTutorial(id) {
        if (title === "") {
            TutorialDataService.get(id)
                .then(response => {
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setPublished(response.data.published);
                    setCurrentTutorial(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });

        }
    }

    getTutorial(id);

    function onChangeTitle(e) {
        const localTitle = e.target.value;
        setTitle(localTitle);
    }

    function onChangeDescription(e) {
        const desc = e.target.value;
        setDescription(desc);
    }

    function updatePublished(status) {
        var data = {
            id: id,
            title: title,
            description: description,
            published: status
        };
        TutorialDataService.update(id, data)
            .then(response => {
                setPublished(status);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    function updateTutorial() {
        var data = {
            id: id,
            title: title,
            description: description,
            published: published
        };
        TutorialDataService.update(id, data)
            .then(response => {
                setMessage("The tutorial was updated successfully!");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    function deleteTutorial() {
        TutorialDataService.delete(id)
            .then(response => {
                console.log(response.data);
                navigate('/tutorials');
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div>
            {currentTutorial ? (
                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={title}
                                onChange={onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={description}
                                onChange={onChangeDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {published ? "Published" : "Pending"}
                        </div>
                    </form>
                    {published ? (
                        <button
                            className="badge bg-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                            <button
                                className="badge bg-primary mr-2"
                                onClick={() => updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}
                    <button
                        className="badge bg-danger mr-2"
                        onClick={deleteTutorial}
                    >
                        Delete
            </button>
                    <button
                        type="submit"
                        className="badge bg-success"
                        onClick={updateTutorial}
                    >
                        Update
            </button>
                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
        </div>
    );
};

export default EditTutorial;