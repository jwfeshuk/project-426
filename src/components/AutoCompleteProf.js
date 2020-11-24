// import React, { Component } from 'react';
// import Select from 'react-select';
// import { app } from '../base';

// const options = [
//     { value: 'blues', label: 'Blues' },
//     { value: 'rock', label: 'Rock' },
//     { value: 'jazz', label: 'Jazz' },
//     { value: 'orchestra', label: 'Orchestra' }
// ];

// class AutoCompleteProf extends React.Component {
//     render() {
//         return (
//             <Select options={options} />
//         );
//     }
// }

// export default AutoCompleteProf;



import React from 'react';
import Select from 'react-select';
import { app } from '../base';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class AutoCompleteProf extends React.Component {
    state = {
        selectedOption: null,
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
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
        const { selectedOption } = this.state;

        return (
            <div style={{ width: '100%' }}>
                <Select
                    onChange={this.props.onChange}
                    options={this.state.options}
                />
            </div>
        );
    }
}

export default AutoCompleteProf;






// import React, { Component } from 'react';
// import Select from 'react-select';
// import { app } from '../base';

// class AutoCompleteProf extends Component {

//     state = {
//         options: [],
//         value: ''
//     };

//     // handleChange = (value) => {
//     //     this.setState({ value })
//     // }

//     componentDidMount() {
//         let logDB = async function (db) {
//             app.firestore().collection("/professors").get()
//                 .then((profs) => {
//                     let temp = [];
//                     profs.forEach((prof) => {
//                         let professor = prof.data()
//                         temp.push({
//                             label: professor.first + " " + professor.last,
//                             value: professor.profID,
//                         })
//                     })
//                     db.setState({ options: temp })
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 })
//         }
//         logDB(this);
//     }

//     render() {
//         return (
//             <div style={{ width: '100%' }}>
//                 <Select
//                     value={this.state.value}
//                     name="search"
//                     options={this.state.options}
//                     // onChange={this.props.onChange}
//                     onChange = {() => console.log('hello'), 'select-option'}
//                 />
//             </div>
//         );
//     }
// }

// export default AutoCompleteProf;