import React, { Component }  from 'react';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button'






const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    avatar: {
        height: 50,
        width: 50,
    }
});


class OverviewComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            loadingFunctions: true,
            isLoading: true,
            functies: [],
            sollicitaties: [],
            open: false,
            deleteTarget: 0,
            canDelete: false,
        };


        this.getAllApplicants = this.getAllApplicants.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.returnApplicantComponents = this.returnApplicantComponents.bind(this);
    }

    componentWillMount(){
        fetch('http://127.0.0.1:8000/api/sollicitaties/', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Token': 'Karim',
            }
        })
            .then(res => res.json())
            .then(sollicitaties => {
                this.setState({
                    isLoading: false,
                    sollicitaties: sollicitaties,
                });
            });
        this.getAllFuncties();
    }

    componentDidMount(){
        this.returnFunctie();
    }


    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete = sollicitant => evt => {
        if(this.state.canDelete){
            this.deleteApplicantFromState(sollicitant);
            axios.delete('http://127.0.0.1:8000/api/sollicitaties/' + sollicitant._id, {
                headers: {
                    'Token': 'Karim',
                }
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.setState({
                        open: false,
                        deleteTarget: 0,
                        canDelete: false,
                    });
                }).then( res => {
                console.log(this.state);
            });
        }
    };


    getAllApplicants(){
        fetch('http://127.0.0.1:8000/api/sollicitaties/', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Token': 'Karim',
            }
        })
            .then(res => res.json())
            .then(sollicitaties => {
                this.setState({
                    isLoading: false,
                    sollicitaties: sollicitaties,
                });
            });
        this.getAllFuncties();
        this.returnFunctie(this.state.sollicitatie.functie);
    }

    handleClose = () => {
        this.setState({
            open: false,
            deleteTarget: 0,
        });
    };




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



    returnFunctie(sollicitant){
        let newFunctie;
        if(this.state.functies.length > 1){
            (this.state.functies.map((functie) => {
                if(functie._id === sollicitant.functie){
                    newFunctie = functie.functie;
                }
            }));
            return newFunctie;
        }
    }


    deleteApplicantFromState(DeleteSollicitant){
        let newSollicitaties = [];
        if(this.state.sollicitaties.length > 1){
            (this.state.sollicitaties.map(sollicitatie => {
                console.log(sollicitatie._id, DeleteSollicitant._id);
                if(sollicitatie._id === DeleteSollicitant._id){
                    console.log('zelfde id');
                } else {
                    newSollicitaties.push(sollicitatie);
                    this.setState({
                        sollicitaties: newSollicitaties
                    });
                }
            }));

        }
    }


    returnDialog(){
        return(
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Delete Sollicitatie"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {"Je staat op het punt om de sollicitatie van" + " " +
                    this.state.deleteTarget.voornaam + " " +  this.state.deleteTarget.achternaam +  " te verwijderen."}
                    <br />Weet je zeker dat je deze actie wilt uitvoeren?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={this.handleDelete(this.state.deleteTarget)} color="secondary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
        )
    }


    deleteApplicant = sollicitant => evt =>  {
        this.setState({
            open: true,
            deleteTarget: sollicitant,
            canDelete: true,
        });
        console.log(sollicitant.voornaam + ' Gaat gedelete worden...')
    };

    returnApplicantComponents(sollicitaties){
        return sollicitaties.map(sollicitant => {
            return (
                <TableRow  key={sollicitant._id}>
                    <TableCell align="left">
                   {sollicitant.voornaam} {sollicitant.achternaam}
                    </TableCell>
                    <TableCell align="right">{sollicitant.werkervaring}</TableCell>
                    <TableCell align="right">{this.returnFunctie(sollicitant)}</TableCell>
                    <TableCell align="right">
                        <Link  style={{ textDecoration: 'none' }}
                               to={{pathname: "/sollicitatie/" + sollicitant._id }}>
                            <IconButton aria-label="Delete">
                                <PersonIcon />
                            </IconButton>
                        </Link>
                    </TableCell>
                    <TableCell align="right">
                        <Link  style={{ textDecoration: 'none' }}
                               to={{pathname: "/edit/" + sollicitant._id }}>
                            <IconButton  aria-label="Delete">
                                <EditIcon />
                            </IconButton>
                        </Link>

                    </TableCell>
                    <TableCell align="right">
                        <IconButton onClick={this.deleteApplicant(sollicitant)}  aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            );
        })
    }


    render() {
        if(this.state.isLoading){
            return(
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }else{

        return(
            <div>
                {this.state.open ? this.returnDialog() : ''}
            <div className="bg-frmwrk-blue h-screen  content-center">
               <h1 className="overview-title">Overzicht Sollicitanten</h1>
                <Paper className={styles.root}>
                    <Table className={styles.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell> Sollicitant </TableCell>
                                <TableCell align="right">Werkervaring </TableCell>
                                <TableCell align="right">Functie </TableCell>
                                <TableCell align="right">Details </TableCell>
                                <TableCell align="right">Edit </TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.returnApplicantComponents(this.state.sollicitaties)}
                        </TableBody>
                    </Table>
                </Paper>
                </div>
            </div>
        )}
    }
}

export default OverviewComponent;
