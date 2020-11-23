// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
//
// export default function ComboBox() {

//     // let onSubmit = function (e) {
//     //     e.preventDefault();
//     //     alert('onsubmit');
//     // }

//     return (
//         <Autocomplete
//             id="combo-box-demo"
//             className="form-control"
//             freeSolo={true}
//             options={options}
//             getOptionLabel={(option) => option.title}
//             style={{ width: "100%", backgroundColor: "#FFF", color: "#FFF", height: "55px", padding: "6px" }}
//             renderInput={(params) => <TextField {...params} label="Search for a Professor..." variant="outlined" onSubmit={ alert('stop') } />}
//             size="small"

//             // onSubmit = (e) => {
//             //     e.preventDefault();
//             //     console.log('SUBMIT')
//             // }
//         />
//     );
// }

// 


import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class SearchProfs extends Component {

    constructor() {
        super()
        this.state = {
            options: [
                { title: 'The Shawshank Redemption', year: 1994 },
                { title: 'The Godfather', year: 1972 },
            ]
        }

        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleSubmit(target) {
        console.log(target.target.value)
        alert('THIS');
        console.log('THIS')
        setTimeout(3000)
    }

    handleChange(target) {
        console.log(target.target.value)
    }

    render() {
        return (
            <Autocomplete
                id="combo-box-demo"
                className="form-control"
                freeSolo
                options={this.state.options}
                getOptionLabel={(option) => option.title}
                style={{ width: "100%", backgroundColor: "#FFF", color: "#FFF", height: "55px", padding: "6px" }}
                renderInput={(params) => <TextField {...params} label="Search for a Professor..." variant="outlined" onChange={() => this.handleChange} onSubmit={() => this.handleSubmit} />}
                size="small"
                
                onChange = {(event, value) => console.log(value)}

                onSubmit = { (e) => {
                    e.preventDefault();
                    alert('HERE')
                    // setTimeout(3000)
                    
                }}



            // onSubmit = {
            //     e.preventDefault();
            //     console.log('SUBMIT')
            // }
            />
        )
    }

}

export default SearchProfs


//     // let onSubmit = function (e) {
    //     //     e.preventDefault();
    //     //     alert('onsubmit');
    //     // }

    //     return (
    //         <Autocompletee
    //             id="combo-box-demo"
    //             className="form-control"
    //             freeSolo={true}
    //             options={options}
    //             getOptionLabel={(option) => option.title}
    //             style={{ width: "100%", backgroundColor: "#FFF", color: "#FFF", height: "55px", padding: "6px" }}
    //             renderInput={(params) => <TextField {...params} label="Search for a Professor..." variant="outlined" onSubmit={ alert('stop') } />}
    //             size="small"

    //             // onSubmit = (e) => {
    //             //     e.preventDefault();
    //             //     console.log('SUBMIT')
    //             // }
    //         />
    //     );
    // }

    // let options = [
    //     { title: 'The Shawshank Redemption', year: 1994 },
    //     { title: 'The Godfather', year: 1972 },
    // ]







// import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ReactAutoSuggestDropdown from 'react-autosuggest-dropdown-menu';
// import { app, base } from '../base';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';

// export default class SearchProfs extends Component {
//     constructor() {
//         super()
//         this.state = {
//             chosenValue: '',
//             searchValue: '',
//             showDropdown: false,
//             list: [],
//             // list: this.makeList(this.props.list)
//             value: ''
//         }

//         this.makeList = this.makeList.bind(this);
//         this.chooseDropdownItem = this.chooseDropdownItem.bind(this)
//         this.updateSearchValue = this.updateSearchValue.bind(this)
//         this.showDropdown = this.showDropdown.bind(this)

//     }


//     componentDidMount() {
//         let logDB = async function (db) {
//             app.firestore().collection("/professors").get()
//                 .then((profs) => {
//                     let temp = [];
//                     profs.forEach((prof) => {
//                         let professor = prof.data()
//                         temp.push({
//                             valueToSearch: professor.first + " " + professor.last,
//                             id: professor.profID,
//                         })
//                     })
//                     db.setState({ list: temp })
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 })
//         }

//         logDB(this);

//     }


//     /*
//         profCol.get().then((profs) => {
//             let tempNames = []
//             profs.forEach((prof) => {
//                 let professor = prof.data()
//                 tempNames.push((professor.first + professor.last).toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ""))
//             })
//             this.setState({names: tempNames})
//         }).catch(() => {
//             console.log('Something went wrong');
//         })
//     */



//     makeList(list) {

//         // let temp = list.map((option) => {
//         //     return ({
//         //         valueToSearch: String(option.display),
//         //         age: String(option.profID)
//         //     })
//         // })

//         // this.state.list = temp;

//     }

//     chooseDropdownItem(e, valueSelected, valueObject) {
//         e.preventDefault()
//         this.setState({ showDropdown: false, searchValue: valueSelected })
//     }

//     updateSearchValue(e) {
//         e.preventDefault()
//         this.setState({ searchValue: e.target.value })
//     }

//     showDropdown() {
//         this.setState({ showDropdown: true })
//     }

//     render() {
//         return (
//             <div className="form-control">
//                 <Autocomplete
//                     id="combo-box-demo"
//                     options={this.state.list}
//                     getOptionLabel={(option) => option.valueToSearch}
//                     style={{ width: 300 }}
//                     renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
//                 />
//                 {/*<ReactAutoSuggestDropdown
//                     list={this.state.list}
//                     showDropdown={this.showDropdown}
//                     displayDropdownMenu={this.state.showDropdown}
//                     chosenValue={this.state.chosenValue}
//                     chooseDropdownItem={this.chooseDropdownItem}
//                     updateSearchValue={this.updateSearchValue}
//                     searchValue={this.state.searchValue}
//                     highlightColour={"#FFF"}
//                     style={{width: "100%"}}
//                 />*/}
//             </div>
//         )
//     }

// }