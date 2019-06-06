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
        require('./../assets/avatar/face/face3.svg'),
        require('./../assets/avatar/face/face4.svg'),
        require('./../assets/avatar/face/face5.svg'),
        require('./../assets/avatar/face/face6.svg'),




    ],
    facial:[
        [
            require('./../assets/avatar/facialhair/color1/facial1.svg'),
            require('./../assets/avatar/facialhair/color1/facial2.svg'),
            require('./../assets/avatar/facialhair/color1/facial3.svg'),
            require('./../assets/avatar/facialhair/color1/facial4.svg'),
            require('./../assets/avatar/facialhair/color1/facial5.svg'),
            require('./../assets/avatar/facialhair/color1/facial6.svg'),
            require('./../assets/avatar/facialhair/color1/facial7.svg'),
            require('./../assets/avatar/facialhair/color1/facial8.svg'),


        ],
        [
            require('./../assets/avatar/facialhair/color2/facial1.svg'),
            require('./../assets/avatar/facialhair/color2/facial2.svg'),
            require('./../assets/avatar/facialhair/color2/facial3.svg'),
            require('./../assets/avatar/facialhair/color2/facial4.svg'),
            require('./../assets/avatar/facialhair/color2/facial5.svg'),
            require('./../assets/avatar/facialhair/color2/facial6.svg'),
            require('./../assets/avatar/facialhair/color2/facial7.svg'),
            require('./../assets/avatar/facialhair/color2/facial8.svg'),
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
                hair: 0,
                hairColor: 0,
                facial: 0,
                facialColor: 0,
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
        else if(name[0] === 'facialColor'){
            arrayLength = (avatarAssets.facial.length -1);

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



    returnAvatarEditors = (name,title) =>  {
        return(
            <div className="avatar-group">
                <strong>{title}</strong>
                        <div>
                            <div className="col-md-1" onClick={this.changeBackground('left', [name])}>
                        Links
                    </div>

                    <div className="col-md-1" onClick={this.changeBackground('right',[name])}>
                        Rechts
                    </div>
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

                            <img style={{marginTop: '30px', marginLeft: '-76px', position: 'absolute' }}
                                 alt="face"
                                 src={avatarAssets.facial[avatar.facialColor][avatar.facial]} />


                            <img style={{marginTop: '38px', marginLeft: '63px', position: 'absolute', fill: '#29ff00' }}
                                 src={avatarAssets.facial[avatar.facialColor][avatar.facial]} />
                        </div>
                    </div>
                    <div className="col-sm-6 bg-purple-lighter">
                            {this.returnAvatarEditors('background','Achtergrond')}

                        <div className="avatar-group">
                            <strong>Haar</strong>
                        </div>

                            {this.returnAvatarEditors('skin','Tint')}

                    </div>
                    <div className="col-sm-6 bg-blue-lighter">


                            {this.returnAvatarEditors('head','Vorm')}

                            {this.returnAvatarEditors('face', 'Gezicht')}

                            {this.returnAvatarEditors('facial','Gezichtshaar')}

                        {this.returnAvatarEditors('facialColor','Gezichthaar Kleur')}

                    </div>
                </div>
            );
        }
    }
}

export default AvatarComponent;