import React, { Component }  from 'react';
import axios from 'axios';
import AvatarComponent from "./AvatarComponent";
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';


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

        this.state = {
            isConfirmed: false,
        };


        this.sendSollicitatie = this.sendSollicitatie.bind(this);
    }

    returnSkills(skills){
        return skills.map((skill) => {
            console.log(skill);
            return(
                <div className="row mt-1" key={skill.vaardigheid}>
                    <div className="col-md-2" />
                    <div className="col-md-2 ervaring-title">{skill.vaardigheid}</div>
                    <div className="col-md-2 ervaring-title">{skill.ervaring}</div>
                </div>
            )
        });
    }

    sendSollicitatie = (sollicitatie, avatar) => evt => {
        console.log(avatar);

        axios.put('http://localhost:8000/api/sollicitaties/' +  sollicitatie._id, {
            voornaam: sollicitatie.voornaam,
            achternaam: sollicitatie.achternaam,
            emailadres: sollicitatie.emailadres,
            functie: sollicitatie.functie,
            werkervaring: sollicitatie.werkervaring,
            vaardigheden: sollicitatie.vaardigheden,
            avatar: {
                background: avatar.background,
                head: avatar.head,
                skin: avatar.skin,
                face: avatar.face,
                hair: avatar.hair,
                hairColor: avatar.hairColor,
                facial: avatar.facial,
                facialColor: avatar.facialColor,
                eyebrows: avatar.eyebrows,
                eyebrowsColor: avatar.eyebrowsColor,
                glasses: avatar.glasses
            }
        })
            .then(function (response) {
                console.log('CALL SUCCESSFULL...',response);
            })
            .catch(function (error) {
                console.log(error);
            });

        this.notifySlack(sollicitatie, avatar);
        console.log('state',this.state);
        this.setState({
            isConfirmed: true,
        });

    };

    returnVaardigheden = (sollicitatie) => {
        return sollicitatie.vaardigheden.map((vaardigheid) => {
            return ("\n - " + vaardigheid.vaardigheid);
        })
    };





    async sendConfirmMail(sollicitatie){
        axios.post('http://localhost:8000/api/sollicitaties/' +  sollicitatie._id, {
                email: 'karim.bakkes@gmail.com',
                message: 'test',
                voornaam: sollicitatie.voornaam,
                achternaam: sollicitatie.achternaam,
                emailadres: sollicitatie.emailadres,
                functie: this.props.location.state.functie
            })

            .then(function (response) {
                console.log('CALL SUCCESSFULL...',response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    notifySlack(sollicitatie, avatar){
        console.log(sollicitatie);
        let vaardigheden = this.returnVaardigheden(sollicitatie);

        let data = {
                text: "*We hebben een nieuwe sollicitatie ontvangen!* :gem: :tada: \n \n" +
                 sollicitatie.voornaam + " " + sollicitatie.achternaam
                + " heeft gesolliciteerd voor de functie als " + this.props.location.state.functie + "." +
                   "\n" + sollicitatie.voornaam + " beschikt over de volgende vaardigheden: " + vaardigheden + ".\n" +
                    "contact kan worden opgenomen via: " + sollicitatie.emailadres + "\n \n" +
                    "De volledige sollicatie kan worden teruggekeken op: " + "http://localhost:3000/sollicitatie/" + sollicitatie._id +
                    "\n "
            };


        axios.post('https://hooks.slack.com/services/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', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).then(function (response) {
                console.log('Post gedaan',response);
            })
                .catch(function (error) {
                    console.log(error);
                });
    }

    render() {
        let avatar;
        let sollicitatie;
        let functie;
        if(this.props.location.state === undefined){
            console.log('het is undefined');

            return(<Redirect to={"/edit/" + this.props.match.params.sollicitatie} />
            )

        }
        console.log(this.props.location.state);


        if(this.props.location.state.avatar === undefined) {
             avatar = {
                avatar: {
                    background: 0,
                    head: 0,
                    skin: 0,
                    face: 0,
                    hair: 0,
                    hairColor: 0,
                    facial: 0,
                    facialColor: 0,
                    eyebrows: 0,
                    eyebrowsColor: 0,
                    glasses: 0,
                }
            }
        }
             avatar = this.props.location.state.avatar;
             sollicitatie = this.props.location.state.sollicitatie;
             functie = this.props.location.state;


            console.log(sollicitatie.voornaam);
            console.log(avatar);



        if(this.state.isConfirmed){
            return(
            <div className="bg-frmwrk-blue  w-screen h-screen">

                <div className="row  justify-content-center pt-10">
                    <div className="confirm-icon">
                        <AvatarComponent
                            background={0}
                            head={0}
                            skin={0}
                            face={4}
                            hair={0}
                            hairColor={0}
                            facial={0}
                            facialColor={0}
                            eyebrows={0}
                            eyebrowsColor={0}
                            glasses={1}
                            options={false}
                        />

                    </div>
                     <div className="col-md-6  ">
                         <img className="speech-bubble" src={require("./../assets/speech.svg")} alt="speech" />
                         <div className="speech">
                             Hey {sollicitatie.voornaam}, we hebben jouw sollicitatie ontvangen! 👏🎉 <br />
                             We zullen zo snel mogelijk contact met je opnemen. <br />

                             <i className="speech-subtext pt-5">Mocht je tussentijds vragen hebben mail dan naar t.van.rooijen@frmwrk.nl</i>
                         </div>
                     </div>
                 </div>
                <div className="row mt-10 justify-content-center text-center">
                    <h2>
                        Er is een bevestingsmail gestuurd naar: <br />
                        <span className="text-frmwrk-red">{sollicitatie.emailadres}</span>
                    </h2>
                    {console.log(this.sendConfirmMail(sollicitatie).catch(console.error))}
                </div>
                </div>

            );
            } else {
            return (
                <div className="bg-frmwrk-blue  w-screen h-screen">
                    <div className="row w-screen  pt-3 ">
                        <div className="col-md-2 "/>
                        <div className="col-md-4  border-b-2">
                            <h1 className="confirm-title">Persoonlijke gegevens</h1>
                        </div>
                        <div className="col-md-3 border-b-2"/>
                    </div>

                    <div className="row pt-4 ">
                        <div className="col-md-2"/>
                        <div className="col-md-4 ">
                            <div className="confirm-data">{sollicitatie.voornaam} {sollicitatie.achternaam}</div>
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
                        <div className="col-md-2"/>
                        <div className="col-md-4 border-b-2">
                            <h3 className="confirm-title">Vaardigheden</h3>
                        </div>
                        <div className="col-md-3 border-b-2"/>


                    </div>

                    {this.returnSkills(sollicitatie.vaardigheden)}

                    <div className="row mt-4 mb-4">
                        <div className="col-md-2"/>
                        <div className="col-md-7 border-b-2"/>
                    </div>


                    <div className="row  w-screen justify-content-center">
                        <div className="col-md-4  text-center  ">
                            <Button onClick={this.sendSollicitatie(sollicitatie, avatar)} style={styles.send}
                                    color="secondary" variant="contained">
                                <label className="send-text">Verzend Sollicitatie</label>
                            </Button>
                        </div>


                    </div>


                </div>

            );
        }
    }
}

export default ConfirmComponent;
