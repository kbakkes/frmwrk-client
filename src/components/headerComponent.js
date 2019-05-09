import React, { Component }  from 'react';


class HeaderComponent extends Component {
    render() {
        return(
            <div className="bg-frmwrk-blue content-center">
                <h1 className="pt-8 pb-8 text-frmwrk-red font-frmwrk">Creeër mijn FRMWRK'er</h1>
                <div className="ml-auto mr-auto border-b-2 w-4/5 object-center bg-blue" />
            </div>

        );
    }
}

export default HeaderComponent;
