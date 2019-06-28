import React, { Component }  from 'react';
import AvatarComponent from "./AvatarComponent";


class SollicitatieComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            loadingFunctions: true,
            isLoading: true,
            functies: [],
            sollicitatie: []
        };
    }



    componentWillMount(){
        let sollicitatieID  = this.props.match.params.sollicitatie;
        console.log(sollicitatieID);
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
        console.log(this.state);
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




    returnSkills(skills){
        return skills.map((skill) => {
            return(
                <div className="row mt-1" key={skill.vaardigheid}>
                    <div className="col-md-2" />
                    <div className="col-md-2 ervaring-title">{skill.vaardigheid}</div>
                    <div className="col-md-2 ervaring-title">{skill.ervaring}</div>
                </div>
            )
        });
    }







    render() {

        if(this.state.isLoading){
            return(
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        } else {


            let avatar = this.state.sollicitatie.avatar;
            let sollicitatie = this.state.sollicitatie;
            let functie = this.returnFunctie();

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
                        <div className="confirm-data">{functie}</div>
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




            </div>

        );
        }
    }
}

export default SollicitatieComponent;
