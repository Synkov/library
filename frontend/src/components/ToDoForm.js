import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '', project: props.projects[0]?.uuid, creator: props.users[0]?.uuid }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.text, this.state.project, this.state.creator)
        event.preventDefault()
    }

    render() {
        return (

            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="text">text</label>
                    <input type="text" className="form-control" name="text"
                        value={this.state.text}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="c">project</label>
                    <select className="form-control" name="project"
                        onChange={(event) => this.handleChange(event)} >
                        {this.props.projects.map((project) => <option
                            value={project.uuid}>{project.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label for="creator">creator</label>
                    <select className="form-control" name="creator"
                        onChange={(event) => this.handleChange(event)} >
                        {this.props.users.map((user) => <option
                            value={user.uuid}>{user.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        )
    }
}

export default ToDoForm