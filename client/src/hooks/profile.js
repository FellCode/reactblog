import React, { useContext } from 'react';
import Context from '../utils/context';


const Profile = () => {
  const context = useContext(Context)


  const RenderProfile = (props) => {
    return(
      <div>
        <h1>{props.profile.nickname}</h1>
        <br />
        <img src={props.profile.picture} alt="" />
        <br />
        <h4> {props.profile.email}</h4>
        <br />
        <h5> {props.profile.name} </h5>
        <br />
        <h6> Email Verified: </h6>
        {props.profile.email_verified ? <p>Yes</p> : <p>No</p> }
        <br />
      </div>
     )
   }


    return(
      <div>
        <RenderProfile profile={context.authObj.userProfile} />
      </div>
  )}



export default (Profile);