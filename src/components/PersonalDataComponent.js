import React, { Component }  from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/lab/Slider';
import { createMuiTheme, }  from '@material-ui/core/styles';
import LensIcon from '@material-ui/icons/Lens';





const user = {
  voornaam: "Karim",
  achternaam: "Bakkes",
  emailadres: "karim@frmwrk.nl",
  functie: "Fullstack Drupal Developer",
  werkervaring: 2,
};

const themeIcon = createMuiTheme({
    shadows: Array(25).fill('none')
});

const MuiSlider = createMuiTheme({
    backgroundColor: '#cc446f',
});




const functies = [
        {
            value: 'Fullstack Magento Developer',
            label: 'Fullstack Magento Developer',
        },
        {
            value: 'Fullstack Drupal Developer',
            label: 'Fullstack Drupal Developer',
        }
    ];

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
        width: '185px',
        marginLeft: '50px',
        color: '#cc446f',
        trackBefore: {
            backgroundColor: '#cc446f',
        },

    },
    track: {
        color: '#cc446f',
        backgroundColor: '#cc446f',

    }
};
const slider = {
    root: {
        width: 185,
    },
    slider: {
        padding: '22px 0px',
    },
    sliderTrack: {
        height: 5,
    }
};


class PersonalDataComponent extends Component {
    state = {
        value: 3,
    };



    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        const { classes } = this.props;

        return(

            <div className="flex bg-blue-light w-full">


            <div className="flex-1 Gegevens w-2/5 bg-purple-light">
                <h2 style={styles.title} className="pb-8 ml-16 font-frmwrk text-frmwrk-red mb-10 text-left">Persoonlijke gegevens</h2>

                <div style={styles.divider} className="pl-16 pr-16 mt-10 border-r-2">
            <div className='flex-wrap  w-full text-left'>

                <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Voornaam</h3>
                <TextField style={styles.root} id='Voornaam' InputProps={{disableUnderline: true}}  fullWidth={true} defaultValue={user.voornaam}/>

                <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Achternaam</h3>
                <TextField style={styles.root} id='Achternaam' InputProps={{disableUnderline: true}} fullWidth={true} defaultValue={user.achternaam} />

                <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Emailadres</h3>
                <TextField style={styles.root} id='Emailadres' InputProps={{disableUnderline: true}} fullWidth={true} defaultValue={user.emailadres}/>

                <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Functie</h3>
                <TextField style={styles.root} id='functies' InputProps={{disableUnderline: true}} value={user.functie} fullWidth={true} select>
                    {functies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Werkervaring</h3>
                <TextField  InputProps={{disableUnderline: true}}  fullWidth={true} style={styles.ervaring} id="ervaring" value={user.werkervaring} type="number" />
                </div>
            </div>
            </div>
                {/*Vaardigheden*/}
                <div className="Gegevens bg-yellow w-2/5 flex-1">
                    <h2 style={styles.title} className="pb-8 ml-16 font-frmwrk text-frmwrk-red mb-6 text-left">Vaardigheden</h2>
                    <div style={styles.divider} className="pl-16 pr-16 mt-8 border-r-2">
                        <div className='flex flex-col  w-full bg-grey-light text-left'>
                            <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Vaardigheid</h3>
                        <div className="flex flex-wrap">
                            <TextField style={styles.vaardigheden} id='Voornaam' InputProps={{disableUnderline: true}}  margin="dense" fullWidth={true} defaultValue="Magento"/>
                            <Slider
                                classes={{ container: slider.slider, track: slider.sliderTrack }}
                                style={styles.slider}
                                theme={MuiSlider}
                                value={value}
                                min={0}
                                max={6}
                                step={1}
                                onChange={this.handleChange}
                                thumb={<LensIcon theme={themeIcon} />}
                                selectionColor={styles.track}
                                track={MuiSlider}
                            />

                        </div>
                            <div className="flex flex-wrap">
                                <TextField style={styles.vaardigheden} id='Voornaam' InputProps={{disableUnderline: true}}  margin="dense" fullWidth={true} defaultValue="Magento"/>
                                <Slider
                                    classes={{ container: slider.slider, track: slider.sliderTrack }}
                                    style={styles.slider}
                                    theme={MuiSlider}
                                    value={value}
                                    min={0}
                                    max={6}
                                    step={1}
                                    onChange={this.handleChange}
                                    thumb={<LensIcon theme={themeIcon} />}
                                    selectionColor={styles.track}
                                    track={MuiSlider}
                                />

                            </div>
                            <div className="flex flex-wrap">
                                <TextField style={styles.vaardigheden} id='Voornaam' InputProps={{disableUnderline: true}}  margin="dense" fullWidth={true} defaultValue="Magento"/>
                                <Slider
                                    className="1"
                                    classes={{ container: slider.slider, track: slider.sliderTrack }}
                                    style={styles.slider}
                                    theme={MuiSlider}
                                    value={value}
                                    min={0}
                                    max={6}
                                    step={1}
                                    onChange={this.handleChange}
                                    thumb={<LensIcon theme={themeIcon} />}
                                    selectionColor={styles.track}
                                    track={MuiSlider}
                                />

                            </div>                        </div>
                    </div>
                </div>

            </div>
        );
    }


}



export default PersonalDataComponent;
