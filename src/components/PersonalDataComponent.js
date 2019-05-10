import React, { Component }  from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const user = {
  voornaam: "Karim",
  achternaam: "Bakkes",
  emailadres: "karim@frmwrk.nl",
  functie: "Fullstack Drupal Developer",
  werkervaring: 2,
};


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



};


class PersonalDataComponent extends Component {

    render() {
        return(

            <div>
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
        );
    }


}



export default PersonalDataComponent;
