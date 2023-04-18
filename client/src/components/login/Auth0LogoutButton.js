import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0LogoutButton = (props) => {
  const { logout } = useAuth0();

  function logoutOfApp (){
    logout({ logoutParams: { returnTo: window.location.origin } })
    props.logoff()
  }

  return (
    <h3 onClick={logoutOfApp}>
      Log Out
    </h3>
  );
};

export default Auth0LogoutButton;