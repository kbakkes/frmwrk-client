import React, { Component }  from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



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
        width: '190px'

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
        paddingBottom: '-10px;'
    },




};


class VaardighedenComponent extends Component {

    render() {
        return(

            <div>
                <h2 style={styles.title} className="ml-16 font-frmwrk text-frmwrk-red mb-10 text-left">Vaardigheden</h2>

                <div style={styles.divider} className="pl-16 pr-16 mt-10">
                    <div className='flex-wrap  w-full text-left'>

                        <h3 style={styles.formTitle} className="flex-none  text-frmwrk-red w-2 mb-2 mt-4">Vaardigheid</h3>
                        <TextField style={styles.root} id='Voornaam' margin='normal' InputProps={{disableUnderline: true}}  fullWidth={true} defaultValue={user.voornaam}/>

                        <TextField style={styles.root} id='Achternaam' margin='normal' InputProps={{disableUnderline: true}} fullWidth={true} defaultValue={user.achternaam} />

                        <TextField style={styles.root} id='Emailadres' margin='normal' InputProps={{disableUnderline: true}} fullWidth={true} defaultValue={user.emailadres}/>

                    </div>
                </div>
            </div>
        );
    }


}



export default VaardighedenComponent;
