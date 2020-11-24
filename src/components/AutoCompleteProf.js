import React, { Component } from 'react';
import Select from 'react-select';
import { app } from '../base';

class AutoCompleteProf extends Component {
    state = {
        options: []
    };

    componentDidMount() {
        let logDB = async function (db) {
            app.firestore().collection("/professors").get()
                .then((profs) => {
                    let temp = [];
                    profs.forEach((prof) => {
                        let professor = prof.data()
                        temp.push({
                            label: professor.first + " " + professor.last,
                            value: professor.profID,
                        })
                    })
                    db.setState({ options: temp })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        logDB(this);
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <Select
                    name="search"
                    options={this.state.options}
                />
            </div>
        );
    }
}

export default AutoCompleteProf;