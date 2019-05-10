import React, { Component }  from 'react';
import PersonalDataComponent from "./PersonalDataComponent";

class BuilderComponent extends Component {
    render() {
        return(
            <div className="bg-frmwrk-blue h-full">
                <div className="flex pl-10 pt-10">
                    <PersonalDataComponent />
                    <PersonalDataComponent/>
                </div>
            </div>
        );
    }
}

export default BuilderComponent;
