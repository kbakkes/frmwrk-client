import React, { Component }  from 'react';
import AvatarComponent from "./AvatarComponent";
import Button from '@material-ui/core/Button';



const styles = {
    send: {
        color: '#fbedff',
        fontSize: '16px',
        backgroundColor: '#52B550',
        marginTop: '55px',
        fontFamily: 'Ubuntu',
        textTransform: 'capitalize',
        paddingTop: '5px',
        paddingBottom: '5px',
        alignSelf: 'center',
    },
};

class ConfirmComponent extends Component {
    constructor(props){
        super();
    }

    returnSkills(skills){

        return skills.map((skill) => {
            console.log(skill);
            return(
                <div className="row mt-1  ">
                    <div className="col-md-2" />
                    <div className="col-md-2 ervaring-title">{skill.vaardigheid}</div>
                    <div className="col-md-2 ervaring-title">{skill.ervaring}</div>
                </div>
            )
        });

    }


    render() {
        console.log(this.props.location.state);
        let avatar = this.props.location.state.avatar;
        let sollicitatie = this.props.location.state.sollicitatie;
        let functie = this.props.location.state;


        console.log(avatar, avatar.background);
        return(
            <div className="bg-frmwrk-blue  w-screen h-screen">
                <div className="row w-screen  pt-3 ">
                    <div className="col-md-2 " />
                    <div className="col-md-4  border-b-2">
                        <h1 className="confirm-title">Persoonlijke gegevens</h1>
                    </div>
                    <div className="col-md-3 border-b-2" />
                </div>

                <div className="row pt-4 ">
                    <div className="col-md-2" />
                    <div className="col-md-4 ">
                        <div className="confirm-data">{sollicitatie.voornaam}  {sollicitatie.achternaam}</div>
                        <div className="confirm-data">{sollicitatie.emailadres}</div>
                        <div className="confirm-data">{functie.functie}</div>
                        <div className="confirm-data">{sollicitatie.werkervaring} jaar werkervaring</div>
                    </div>
                    <div className="col-md-4 ">
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
                            options={false}
                        />
                    </div>
                </div>


                <div className="row mt-4 mb-4 ">
                    <div className="col-md-2" />
                        <div className="col-md-4 border-b-2">
                            <h3 className="confirm-title">Vaardigheden</h3>
                        </div>
                    <div className="col-md-3 border-b-2" />


                </div>

                {this.returnSkills(sollicitatie.vaardigheden)}

                <div className="row mt-4 mb-4">
                    <div className="col-md-2" />
                    <div className="col-md-7 border-b-2" />
                </div>


                <div className="row  w-screen justify-content-center">
                    <div className="col-md-4  text-center  ">
                        <Button  style={styles.send} color="secondary" variant="contained">
                            <label className="send-text">Verzend Sollicitatie</label>
                        </Button>
                    </div>


                </div>


            </div>

        );
    }
}

export default ConfirmComponent;
