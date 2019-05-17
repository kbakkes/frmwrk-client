import React, { Component }  from 'react';
import Slider from '@material-ui/lab/Slider';
import LensIcon from '@material-ui/icons/Lens';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {createMuiTheme} from "@material-ui/core/styles/index";



const themeIcon = createMuiTheme({
    shadows: Array(25).fill('none')
});

const styles = {
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
        trackBefore: {
            backgroundColor: '#cc446f',
        },

    },
    trash: {

    }
};

class SliderComponent extends Component {
    render() {
        let skill = this.props.skill;
        return(
            <div key={Math.random()} className="flex flex-wrap">
                <TextField style={styles.vaardigheden} key={Math.random()} InputProps={{disableUnderline: true}}  margin="dense" fullWidth={true} defaultValue={skill.vaardigheid}/>
                <Slider
                    key={skill}
                    style={styles.slider}
                    value={skill.ervaring}
                    min={0}
                    label="Ervaring"
                    max={6}
                    step={1}
                    thumb={<LensIcon theme={themeIcon} />}
                />
                <IconButton aria-label="Delete">
                    <DeleteIcon />
                </IconButton>
            </div>
        );
    }
}

export default SliderComponent;