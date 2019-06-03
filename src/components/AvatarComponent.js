import React, { Component }  from 'react';




const background = [
        '#ff6200',
        '#4dff3e',
        '#ff3340',
        '#db8aff',
        '#a9ffe7',
    ];




class AvatarComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            avatar: {
                background: 0
            }

        };


        this.returnFaces = this.returnFaces.bind(this);
        this.changeBackground = this.changeBackground.bind(this);
    }


    componentDidMount(){
        this.setState({
            isLoading: false,
        })
    }


    logTest(){
        console.log('test')
    }

    changeBackground = idx => evt => {
        let oldAvatar = this.state.avatar;
        let arrayLength = (background.length -1);

        console.log(idx);
        if(oldAvatar.background === arrayLength){
            oldAvatar.background = 0;
        } else {
            if(idx === 'left'){
                oldAvatar.background-=1;
            } else{
                oldAvatar.background +=1

            }
        }

        this.setState({
            avatar: oldAvatar
        });
        console.log(arrayLength);
        console.log(this.state.avatar.background);

    };

    returnFaces = index =>  {
        return(
            <div>
                <div className="col-md-1" onClick={this.changeBackground('left')}>
                    Links
                </div>

                <div className="col-md-10">
                    test
                </div>

                <div className="col-md-1" onClick={this.changeBackground('right')}>
                Rechts
                </div>
            </div>
            )
    };



    render() {
        if (this.state.isLoading === true) {
            return (<div>
                Loading....
            </div>)
        } else {

            return (
                <div className="row">
                    <div className="col-md-12 text-center" style={{backgroundColor: '#ffd3c7'}}>
                        {/*<img src="//placehold.it/120x120" alt="" style={{borderRadius: '100%'}} />*/}
                        <div style={{
                            backgroundColor: background[this.state.avatar.background],
                            borderRadius: '100%',
                            height: '120px',
                            width: '120px'
                        }}/>
                    </div>

                    <div className="col-sm-6 bg-purple-lighter">
                        <div className="avatar-group">
                            <strong>Gezicht</strong>
                            {this.returnFaces()}
                        </div>
                        <div className="avatar-group">
                            <strong>Haar</strong>
                        </div>
                        <div className="avatar-group">
                            <strong>Tint</strong>
                        </div>
                    </div>
                    <div className="col-sm-6 bg-blue-lighter">
                        <div className="avatar-group">
                            <strong>Vorm</strong>
                        </div>
                        <div className="avatar-group">
                            <strong>Achtergrond</strong>
                        </div>
                        <div className="avatar-group">
                            <strong>Gezichthaar</strong>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default AvatarComponent;