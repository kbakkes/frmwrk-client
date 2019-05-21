import React, { Component }  from 'react';
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
    formTitle: {
        fontSize: '18px',
        color: '#cc446f',
        fontFamily: 'Ubuntu',
        className: 'flex-1'
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
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
    }
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
                <div className="flex flex-wrap mt-8" key={idx+1}>
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
            <div className="flex w-full">


            <div className="flex-1 bg-purple-light w-2/5">
                <h2 style={styles.title} className="pb-8 ml-16 font-frmwrk text-frmwrk-red mb-10 text-left">Persoonlijke gegevens</h2>

                <div style={styles.divider} className="pl-16 pr-16 mt-10 border-r-2 ">
            <div className='flex flex-col  w-full text-left  bg-red-lightest justify-end'>
                <div>
                <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Voornaam</h3>
                <TextField style={styles.root} id='Voornaam' InputProps={{disableUnderline: true}}  fullWidth={true} onChange={this.handleFormChange('voornaam')} defaultValue={user.voornaam}/>
                </div>
                <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Achternaam</h3>
                <TextField style={styles.root} id='Achternaam' InputProps={{disableUnderline: true}} fullWidth={true} onChange={this.handleFormChange('achternaam')} defaultValue={user.achternaam} />

                <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Emailadres</h3>
                <TextField style={styles.root} id='Emailadres' InputProps={{disableUnderline: true}} fullWidth={true} onChange={this.handleFormChange('emailadres')} defaultValue={user.emailadres}/>

                <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Functie</h3>
                {this.returnFunctie(this.state.sollicitatie.functie)}
                {this.returnFunctieDropdown()}

                <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Werkervaring</h3>
                <TextField  InputProps={{disableUnderline: true}}  fullWidth={true} style={styles.ervaring} id="ervaring" onChange={this.handleFormChange('werkervaring')} value={user.werkervaring} type="number" />
                </div>
                </div>
            </div>

                {/*Vaardigheden*/}
                <div className="Gegevens bg-yellow w-2/5 flex-1">
                    <h2 style={styles.title} className="pb-8 ml-16 font-frmwrk text-frmwrk-red mb-6 text-left">Vaardigheden</h2>
                    <div style={styles.divider} className="pl-16 pr-16 mt-8 border-r-2">
                        <div className='flex flex-col  w-full bg-grey-light text-left'>
                            <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Vaardigheid</h3>

                            {this.returnSkills(user.vaardigheden)}
                        </div>
                        <Button onClick={this.addSkill} style={styles.add} color="secondary" variant="contained">+</Button>
                    </div>

                </div>
            </div>
        );
    }


}



export default PersonalDataComponent;
