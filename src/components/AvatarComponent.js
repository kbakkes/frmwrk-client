import React, { Component }  from 'react';



const avatarAssets ={
    background:  [
        '#6DB8DE',
        '#E83837',
        '#55A896',
        '#E36A41',
        '#a9ffe7',
    ],
    skin:
        [
            [
                require('./../assets/avatar/head/skin1/head1.svg'),
                require('./../assets/avatar/head/skin1/head2.svg'),
                require('./../assets/avatar/head/skin1/head3.svg'),
            ],
            [
                require('./../assets/avatar/head/skin2/head1.svg'),
                require('./../assets/avatar/head/skin2/head2.svg'),
                require('./../assets/avatar/head/skin2/head3.svg'),
            ],
            [
                require('./../assets/avatar/head/skin3/head1.svg'),
                require('./../assets/avatar/head/skin3/head2.svg'),
                require('./../assets/avatar/head/skin3/head3.svg'),
            ],
        ],
    face: [
        require('./../assets/avatar/face/face1.svg'),
        require('./../assets/avatar/face/face2.svg'),
    ],
    facial:[
        [
            require('./../assets/avatar/facialhair/color1/facial1.svg'),
            require('./../assets/avatar/facialhair/color1/facial2.svg'),
        ],
        [
            require('./../assets/avatar/facialhair/color2/facial1.svg'),
            require('./../assets/avatar/facialhair/color2/facial2.svg'),
        ]

    ],


};





class AvatarComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            avatar: {
                background: 0,
                head: 0,
                skin: 0,
                face: 0,
                facial: 0,
            }
        };

        this.returnAvatarEditors = this.returnAvatarEditors.bind(this);
        this.changeBackground = this.changeBackground.bind(this);
    }


    componentDidMount(){
        this.setState({
            isLoading: false,
        })
    }

    changeBackground = (dir,name) => evt => {
        let oldAvatar = this.state.avatar;
        let arrayLength;


        // voor skins extra scope
        if(name[0] === 'head'){
             arrayLength = (avatarAssets.skin[0].length -1);
        }
        else if(name[0] === 'facial'){
            arrayLength = (avatarAssets.facial[0].length -1);
        }
        else{
            console.log(avatarAssets[name]);
             arrayLength = (avatarAssets[name].length -1);
        }


        if(oldAvatar[name] > arrayLength || oldAvatar[name] < 0){
            oldAvatar[name] = 0;
        } else {
            if(dir === 'left'){
                // Als hij aan het begin is weer  naar einde
                if(oldAvatar[name] === 0){
                    oldAvatar[name] = arrayLength
                } else {
                    // naar links in de array
                    oldAvatar[name]-=1;
                }

            } else{
                // Als de array is afgelopen naar het begin
                if(oldAvatar[name] >= arrayLength){
                    oldAvatar[name] = 0;
                } else{
                    // naar rechts in de array
                    oldAvatar[name] +=1
                }
            }
        }

        this.setState({
            avatar: oldAvatar
        });
        console.log(this.state.avatar);
    };




    returnAvatarEditors = name =>  {
        return(
            <div>
                <div className="col-md-1" onClick={this.changeBackground('left', [name])}>
                    Links
                </div>

                <div className="col-md-10">
                    test
                </div>

                <div className="col-md-1" onClick={this.changeBackground('right',[name])}>
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
            let avatar = this.state.avatar;
            // console.log(avatarAssets.head[avatar.skin][avatar.head]);
            return (
                <div className="row">
                    <div className="col-md-12 text-center" style={{backgroundColor: '#ffd3c7'}}>
                        {/*<img src="//placehold.it/120x120" alt="" style={{borderRadius: '100%'}} />*/}
                        <div style={{
                            backgroundColor: avatarAssets.background[avatar.background],
                            borderRadius: '100%',
                            height: '120px',
                            width: '120px'
                        }}>
                            <img style={{borderRadius: '100%', marginTop: '14px',}}
                                 alt="svg"
                                 src={avatarAssets.skin[avatar.skin][avatar.head]} />

                            <img style={{marginTop: '38px', marginLeft: '-63px', position: 'absolute' }}
                                 alt="face"
                                 src={avatarAssets.face[avatar.face]} />

                            <img style={{marginTop: '31px', marginLeft: '-67px', position: 'absolute' }}
                                 alt="face"
                                 src={avatarAssets.facial[0][avatar.facial]} />


                            <img style={{marginTop: '38px', marginLeft: '63px', position: 'absolute', color: '#29ff00' }}
                                 alt="face"
                                 src={avatarAssets.face[avatar.face]} />

                        </div>

                    </div>
                    <div className="col-sm-6 bg-purple-lighter">
                        <div className="avatar-group">
                            <strong>Achtergrond</strong>
                            {this.returnAvatarEditors('background')}
                        </div>

                        <div className="avatar-group">
                            <strong>Haar</strong>
                        </div>

                        <div className="avatar-group">
                            <strong>Tint</strong>
                            {this.returnAvatarEditors('skin')}
                        </div>

                    </div>

                    <div className="col-sm-6 bg-blue-lighter">

                        <div className="avatar-group">
                            <strong>Vorm</strong>
                            {this.returnAvatarEditors('head')}
                        </div>

                        <div className="avatar-group">
                            <strong>Gezicht</strong>
                            {this.returnAvatarEditors('face')}
                        </div>

                        <div className="avatar-group">
                            <strong>Gezichthaar</strong>
                            {this.returnAvatarEditors('facial')}
                        </div>

                    </div>
                </div>
            );
        }
    }
}

export default AvatarComponent;