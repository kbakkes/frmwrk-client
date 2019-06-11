import React, { Component }  from 'react';
import avatarAssets from './../assets/avatarAssets';
import Left from '@material-ui/icons/ArrowBack';
import Right from '@material-ui/icons/ArrowForward';




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
                eyebrows: 0,
                eyebrowsColor: 0,
                glasses: 0,
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
        else if(name[0] === 'hair'){
            arrayLength = (avatarAssets.hair[0].length -1);
        }
        else if(name[0] === 'hairColor'){
            arrayLength = (avatarAssets.hair.length -1);
        }
        else if(name[0] === 'eyebrows'){
            arrayLength = (avatarAssets.eyebrows[0].length -1);
        }
        else if(name[0] === 'eyebrowsColor'){
            arrayLength = (avatarAssets.eyebrows.length -1);
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
                        <div className="row">
                            <div className="col-md-2 avatarButton" onClick={this.changeBackground('left', [name])}>
                                <Left/>
                            </div>
                                <div className="col-md-2 avatarButton" onClick={this.changeBackground('right',[name])}>
                                    <Right />
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
            return (
                <div className="row">

                    <div className="col-md-3 " />
                    <div className="col-md-5 text-center "
                         // style={{backgroundColor: '#ffd3c7'}}
                    >

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

                            <img style={{marginTop: '-1px', marginLeft: '-93px', position: 'absolute'}}
                                 src={avatarAssets.hair[avatar.hairColor][avatar.hair]} />

                            <img style={{marginTop: '30px', marginLeft: '-76px', position: 'absolute'}}
                                 src={avatarAssets.eyebrows[avatar.eyebrowsColor][avatar.eyebrows]} />

                            <img style={{marginTop: '30px', marginLeft: '-75px', position: 'absolute'}}
                                 src={avatarAssets.glasses[avatar.glasses]} />
                        </div>
                    </div>

                    <div className="col-md-4 " />

                    <div className="col-sm-6">
                            {this.returnAvatarEditors('background','Achtergrond')}

                        {this.returnAvatarEditors('hair','Haar')}

                        {this.returnAvatarEditors('hairColor','Haarkleur')}

                        {this.returnAvatarEditors('skin','Tint')}

                        {this.returnAvatarEditors('eyebrows','Wenkbrauwen')}

                        {this.returnAvatarEditors('glasses','Bril')}

                    </div>
                    <div className="col-sm-6 ">


                            {this.returnAvatarEditors('head','Vorm')}

                            {this.returnAvatarEditors('face', 'Gezicht')}

                            {this.returnAvatarEditors('facial','Gezichtshaar')}

                        {this.returnAvatarEditors('facialColor','Gezichthaar Kleur')}

                        {this.returnAvatarEditors('eyebrowsColor','Wenkbrauwen Kleur')}


                    </div>
                </div>
            );
        }
    }
}

export default AvatarComponent;