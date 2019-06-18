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
import AvatarComponent from "./AvatarComponent";
import { Link } from "react-router-dom";




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
    slider: {
        padding: '22px 0px',
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
    send: {
        color: '#fbedff',
        fontSize: '16px',
        backgroundColor: '#cc446f',
        marginTop: '40px',
        fontFamily: 'Ubuntu',
        textTransform: 'capitalize',
        paddingLeft: '35px',
        paddingRight: '35px',
        paddingTop: '5px',
        paddingBottom: '5px',
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
        this.handleBuilderChanges = this.handleBuilderChanges.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFunctieChange = this.handleFunctieChange.bind(this);
        this.returnFunctieDropdown = this.returnFunctieDropdown.bind(this);
    }

    // 5cd2e2fb465b4abc67b4c77a
    // 5cd2e515160a47be28b5aaa9


    componentWillMount(){
        console.log('test');
        let sollicitatieID  = this.props.sollicitatie;
        fetch('http://127.0.0.1:8000/api/sollicitaties/' + sollicitatieID, {
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
        this.returnFunctie(this.state.sollicitatie.functie);
    }

    componentDidMount(){
        this.returnFunctie();
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

    returnFunctie(){
        let newFunctie;
        if(this.state.functies.length > 1){
            (this.state.functies.map((functie) => {
                if(functie._id === this.state.sollicitatie.functie){
                    newFunctie = functie.functie;
                }
            }));
           return newFunctie;
        }
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
                           id='functies' InputProps={{disableUnderline: true}} value={this.returnFunctie()} fullWidth={true} select>
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
        //Als er geen ervaring is toegevoegd Skills toevoegen op de juiste manier
        let newskills = [];
        if(typeof skills[0].vaardigheid === 'undefined' ){
            skills.map(skill => {
                 newskills.push({
                     vaardigheid: skill,
                     ervaring: 0
                 });
            });

            let oldSollicitatie = this.state.sollicitatie;
            oldSollicitatie.vaardigheden = newskills;

            this.setState({
                sollicitatie: oldSollicitatie
            })
        }

        return skills.map((skill, idx) => {
            return(
                <div className="row" key={idx+1}>
                    <div className="col-md-5">
                        <input
                            type="text"
                            placeholder={`Vaardigheid #${idx + 1}`}
                            onChange={this.handleVaardighedenChange(idx)}
                            value={skill.vaardigheid}
                            className="skills-input"
                        />
                    </div>
                    <div className="col-md-5">
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
                    </div>
                    <div className="col-md-1">
                        <IconButton onClick={this.handleVaardigheidDelete(idx)} style={styles.trash} aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            )
        })
    }

    
    handleVaardighedenChange = idx => evt => {
        let oldSollicitatie = this.state.sollicitatie;
        const newSollicitatie = this.state.sollicitatie.vaardigheden.map((skill, sidx) => {
            if (idx !== sidx) return skill;
            return {
                ervaring: skill.ervaring,
                vaardigheid: evt.target.value,
            };
        });

        oldSollicitatie.vaardigheden = newSollicitatie;

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
        const newSollicitatie = this.state.sollicitatie.vaardigheden.map((skill, sidx) => {
            if (idx !== sidx) return skill;
            return {
                vaardigheid: skill.vaardigheid,
                ervaring: value,
            };
        });

        oldSollicitatie.vaardigheden = newSollicitatie;
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

    getAvatar(){
        if(this.state.sollicitatie.avatar === undefined ){
            return(
                <AvatarComponent
                    background={0}
                    head={0}
                    skin={0}
                    face={0}
                    hair={0}
                    hairColor={0}
                    facial={0}
                    facialColor={0}
                    eyebrows={0}
                    eyebrowsColor={0}
                    glasses={0}
                    options={true}
                />
            );
        } else {
            let avatar = this.state.sollicitatie.avatar;
            return(
                <AvatarComponent
                    background={avatar.background}
                    head={avatar.head}
                    skin={avatar.skin}
                    face={avatar.face}
                    hair={avatar.hair}
                    hairColor={avatar.hairColor}
                    facial={avatar.facial}
                    facialColor={avatar.facialColor}
                    eyebrows={avatar.eyebrows}
                    eyebrowsColor={avatar.eyebrowsColor}
                    glasses={avatar.glasses}
                    options={true}
                />
            )
        }
    }


    handleBuilderChanges(avatar){
        this.setState({ avatar: avatar});
        console.log(this.state)
    };



    render() {
        console.log(this.state);
        if (this.state.isLoading === true) {
            return (<div>
                Loading....
            </div>)
        } else {


            let user = this.state.sollicitatie;
            return (
                <div className="container">

                    <div className="row">
                        {/*border*/}
                        <div className="col-md-5" style={{borderRight: '1px solid #ccc'}}>
                            <h2 className="skills-title">Persoonlijke gegevens</h2>
                            <div className="form-group">
                                <strong>Voornaam</strong>
                                <TextField className="input" id='Voornaam' InputProps={{disableUnderline: true}}
                                           onChange={this.handleFormChange('voornaam')} defaultValue={user.voornaam}/>
                            </div>
                            <div className="form-group">
                                <strong>Achternaam</strong>
                                <TextField className="input" id='Achternaaam' InputProps={{disableUnderline: true}}
                                           onChange={this.handleFormChange('achternaam')}
                                           defaultValue={user.achternaam}/>
                            </div>
                            <div className="form-group">
                                <strong>Emailadres</strong>
                                <TextField className="input" id='Emailadres' InputProps={{disableUnderline: true}}
                                           onChange={this.handleFormChange('emailadres')}
                                           defaultValue={user.emailadres}/>
                            </div>
                            <div className="form-group">
                                <strong>Functie</strong>
                                {/*{this.returnFunctie(this.state.sollicitatie.functie)}*/}

                                {this.returnFunctieDropdown()}
                            </div>
                            <div className="form-group">
                                <strong>Werkervaring</strong>
                                <TextField className="input" id='Werkervaring' InputProps={{disableUnderline: true}}
                                           onChange={this.handleFormChange('werkervaring')}
                                           defaultValue={user.werkervaring}/>
                            </div>
                        </div>
                        <div className="col-md-7" style={{paddingLeft: '35px'}}>



                            {this.getAvatar()}

                            <div className="row">
                                <div className="col-md-6">
                                    <h2 className="skills-title pt-4">Vaardigheden</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">
                                    <h3 className="skills-subtitle">Vaardigheid</h3>
                                </div>
                                <div className="col-md-5">
                                    <h3 className="skills-subtitle">Ervaring</h3>
                                </div>
                            </div>

                            {this.returnSkills(user.vaardigheden)}

                            <div className="row">
                                <div className="col-md-5 "/>
                                <div className="col-md-2">
                                    <Button onClick={this.addSkill} style={styles.add} color="secondary"
                                            variant="contained">+</Button>
                                </div>
                            </div>

                        </div>
                    </div>
                    {console.log(this.state)}
                    <div className="flex justify-center">
                            <Link
                                to={{
                                    pathname: "/confirm/" + this.props.sollicitatie,
                                    state: {
                                        sollicitatie: this.state.sollicitatie,
                                        avatar: this.state.avatar,
                                        functie: this.returnFunctie()
                                    }
                                }}
                            >
                                <Button  style={styles.send} color="secondary" variant="contained">
                                    Verzend
                                </Button>
                            </Link>
                    </div>
                </div>
            );
        }
    }


}



export default PersonalDataComponent;
