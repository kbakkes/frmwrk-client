import React, { Component }  from 'react';
import './../css/builder.scss';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import LensIcon from '@material-ui/icons/Lens';
import {createMuiTheme} from "@material-ui/core/styles/index";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



const themeIcon = createMuiTheme({
    shadows: Array(25).fill('none')
});



const styles = {
    root: {
        background: '#FFFFFF',
        border: '1px solid #979797',
        boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,0.50)',
        borderRadius: '3px',
        resize: 'none',
        textAlign: 'left',
        paddingLeft: '10px',
        paddingTop: '4px',
        width: '320px'

    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
    },
    titleGegevens: {
        fontSize: '30px',
        fontWeight: 'bold',
        marginLeft: '10rem',
    },
    ervaring: {
        background: '#FFFFFF',
        border: '1px solid #979797',
        boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,0.50)',
        borderRadius: '3px',
        resize: 'none',
        textAlign: 'left',
        paddingLeft: '10px',
        paddingTop: '4px',
        width: '320px',
        marginBottom: '30px'
    },
    vaardigheden: {
        background: '#FFFFFF',
        border: '1px solid #979797',
        boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,0.50)',
        borderRadius: '3px',
        resize: 'none',
        textAlign: 'left',
        paddingLeft: '10px',
        paddingTop: '4px',
        width: '185px',
        marginBottom: '30px'
    },
    slider: {
        padding: '22px 0px',
        width: '150px',
        marginLeft: '50px',
        color: '#cc446f',
        track: {
            backgroundColor: '#cc446f',
        },
        divider:{
            paddingLeft: '50px',
        }
    },
    add: {
        color: '#fbedff',
        fontSize: '16px',
        backgroundColor: '#cc446f',
        marginTop: '10px'

    },
    trash: {
        marginLeft: '1px',
    },
    form:{
        border: '1px solid #979797',
        boxShadow: 'inset 0 1px 3px 0 rgba(0,0,0,0.50)',
        borderRadius: '3px'
    },
};

class PersonalDataComponent extends Component {

    constructor(props){
        super();
        this.state = {
            loadingFunctions: true,
            isLoading: true,
            functies: [],
            sollicitatie: []
        };


        this.addSkill = this.addSkill.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFunctieChange = this.handleFunctieChange.bind(this);
        this.returnFunctieDropdown = this.returnFunctieDropdown.bind(this);
    }



    componentWillMount(){
        console.log('test');
        fetch('http://127.0.0.1:8000/api/sollicitaties/5cd2e2fb465b4abc67b4c77a', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Token': 'Karim',
            }
        })
            .then(res => res.json())
            .then(sollicitatie => {
                this.setState({
                    isLoading: false,
                    sollicitatie: sollicitatie[0],
                });
            });

        this.getAllFuncties();

    }


    getAllFuncties(){
        fetch('http://127.0.0.1:8000/api/vacatures/', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then(functies => {
                console.log(functies);
                console.log(this.state);
                this.setState({
                    functies: functies,
                    loadingFunctions: false,
                });
            });
    }

    returnFunctie(functieID){
        fetch('http://127.0.0.1:8000/api/vacatures/' + functieID, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then(functienaam => {
                this.setState({
                        functienaam: functienaam.functie
                });
                return functienaam.functie;
            });
    }




    addSkill(){
        let oldSollicitatie = this.state.sollicitatie;

        oldSollicitatie.vaardigheden.push({
            ervaring: 0,
            vaardigheid: 'Vaardigheid'
        });
        console.log(oldSollicitatie);
        this.setState({
            sollicitatie: oldSollicitatie,
        })
    }


    returnFunctieDropdown(){
        if(this.state.loadingFunctions && this.state.isLoading){
            return(<h3>Loading...</h3>)
        } else{
            return(
                <TextField onChange={this.handleFunctieChange} style={styles.root}
                           id='functies' InputProps={{disableUnderline: true}} value={this.state.functienaam} fullWidth={true} select>
                    {this.state.functies.map(functie => (
                        <MenuItem key={functie.functie} value={functie.functie} id={functie._id}>
                            {functie.functie}
                        </MenuItem>
                    ))}
                </TextField>
            )
        }
    }


    returnSkills(skills){
        return skills.map((skill, idx) => {
            return(
                <div className="test" key={idx+1}>
                    <input
                        type="text"
                        placeholder={`Vaardigheid #${idx + 1}`}
                        onChange={this.handleVaardighedenChange(idx)}
                        value={skill.vaardigheid}
                        style={styles.form}
                    />
                    <Slider
                        key={idx+1}
                        style={styles.slider}
                        value={skill.ervaring}
                        onChange={this.handleErvaringChange(idx)}
                        min={0}
                        label="Ervaring"
                        max={6}
                        step={1}
                        thumb={<LensIcon theme={themeIcon} />}
                    />
                    <IconButton onClick={this.handleVaardigheidDelete(idx)} style={styles.trash} aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        })
    }




    handleVaardighedenChange = idx => evt => {
        let oldSollicitatie = this.state.sollicitatie;
        const newShareholders = this.state.sollicitatie.vaardigheden.map((skill, sidx) => {
            if (idx !== sidx) return skill;
            return {
                ervaring: skill.ervaring,
                vaardigheid: evt.target.value,
            };
        });

        oldSollicitatie.vaardigheden = newShareholders;

        this.setState({ sollicitatie: oldSollicitatie });
    };


    handleVaardigheidDelete = idx => evt => {
      let oldSollicitatie = this.state.sollicitatie;

      let newVaardigheden =  oldSollicitatie.vaardigheden.filter((s, sidx) => idx !== sidx);

        console.log(newVaardigheden);

        oldSollicitatie.vaardigheden = newVaardigheden;

        this.setState({
            sollicitatie: oldSollicitatie
        })
    };



    handleErvaringChange = idx => (evt,value) => {
        let oldSollicitatie = this.state.sollicitatie;
        const newShareholders = this.state.sollicitatie.vaardigheden.map((skill, sidx) => {
            if (idx !== sidx) return skill;
            return {
                vaardigheid: skill.vaardigheid,
                ervaring: value,
            };
        });

        oldSollicitatie.vaardigheden = newShareholders;

        this.setState({ sollicitatie: oldSollicitatie });
    };


    handleFunctieChange(event,value){
        let oldSollicitatie = this.state.sollicitatie;
        oldSollicitatie.functie = value.props.id;

        this.setState({sollicitatie: oldSollicitatie})
    }


    handleFormChange = name => event => {
        let oldSollicitatie = this.state.sollicitatie;
        oldSollicitatie[name] = event.target.value;
        this.setState({
                sollicitatie: oldSollicitatie
            });
    };



    render() {

        if(this.state.isLoading === true){
            return(<div>
                Loading....
            </div>)
        } else {

        }

        let user = this.state.sollicitatie;
        return(
            <div className="container">

                <div className="row">
                    {/*border*/}
                    <div className="col-md-5" style={{borderRight: '1px solid #ccc'}}>
                    <h2>Persoonlijke gegevens</h2>
                        <div className="form-group">
                            <strong>Voornaam</strong>
                            <TextField className="input" id='Voornaam' InputProps={{disableUnderline: true}} onChange={this.handleFormChange('voornaam')} defaultValue={user.voornaam}/>
                        </div>
                        <div className="form-group">
                            <strong>Achternaam</strong>
                            <TextField className="input" id='Achternaaam' InputProps={{disableUnderline: true}} onChange={this.handleFormChange('achternaam')} defaultValue={user.achternaam}/>
                        </div>
                        <div className="form-group">
                            <strong>Emailadres</strong>
                            <TextField className="input" id='Emailadres' InputProps={{disableUnderline: true}} onChange={this.handleFormChange('emailadres')} defaultValue={user.emailadres}/>
                        </div>
                        <div className="form-group">
                            <strong>Functie</strong>
                            {this.returnFunctie(this.state.sollicitatie.functie)}
                            {this.returnFunctieDropdown()}
                        </div>
                        <div className="form-group">
                            <strong>Werkervaring</strong>
                            <TextField className="input" id='Werkervaring' InputProps={{disableUnderline: true}} onChange={this.handleFormChange('werkervaring')} defaultValue={user.werkervaring}/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <img src="//placehold.it/200x200" alt="" style={{borderRadius: '100%'}} />
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="avatar-group">
                                        Opties hier
                                    </div>
                                    <div className="avatar-group">
                                        Opties hier
                                    </div>
                                    <div className="avatar-group">
                                        Opties hier
                                    </div>

                                </div>
                            </div>
                        </div>
                    <div className="row">
                        <div className="col-md-5">
                            <h1>Vaardigheid</h1>
                        </div>
                        <div className="col-md-7">
                            <h1>ervaring</h1>
                        </div>
                    </div>
                    {/*Vaardigheden*/}
                    {/*<div className="flex-1 Gegevens bg-yellow-light w-2/5">*/}
                        {/*<h2 style={styles.title} className="pb-8 ml-16 font-frmwrk text-frmwrk-red mb-6 text-left">Vaardigheden</h2>*/}
                        {/*<div className='flex flex-col m-auto ml-16 mr-16 bg-grey-light' >*/}
                            {/*<h3 style={styles.formTitle} className="flex-none text-frmwrk-red w-2 mb-2 mt-4">Vaardigheid</h3>*/}
                            {/*{this.returnSkills(user.vaardigheden)}*/}
                        {/*</div>*/}
                        {/*<Button onClick={this.addSkill} style={styles.add} color="secondary" variant="contained">+</Button>*/}
                    {/*</div>*/}
                    </div>
                </div>
        );
    }


}



export default PersonalDataComponent;
