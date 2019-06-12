import React, { Component }  from 'react';


class ConfirmComponent extends Component {
    constructor(props){
        super();
    }
    render() {

        console.log(this.props.match.location);
        return(
            <div className="bg-frmwrk-blue h-screen">
                <div className="row pt-3 ">
                    <div className="col-md-1" />
                    <div className="col-md-4 bg-red-lightest">
                        <h1 className="skills-title">Persoonlijke gegevens</h1>

                    </div>
                </div>

            </div>

        );
    }
}

export default ConfirmComponent;
