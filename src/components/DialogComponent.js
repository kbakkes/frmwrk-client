import React, { Component }  from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';


class DialogComponent extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: true,
            open: true,
        };
        this.handleDelete = this.handleDelete.bind(this);
    }





    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete = (test) => {
        console.log('delete clicked')
    };

    render() {
        // let sollicitatie = this.props.sollicitatie;
        return(
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete "}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete ? After this action there is no way back.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>


        );
    }
}

export default DialogComponent;
