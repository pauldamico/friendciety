import Auth0LoginButton from "./Auth0LoginButton";

export default function LoginForm(props) {
  const { authLoginOnClick, toggle, toggleSignUp, onSubmit, loginFormData, onChange} = props;
  


 
  return (
    <div className="login-div">
      <div>
        <form className="login-form" onSubmit={onSubmit}>
          <label>{  !toggleSignUp ? "Username/Email:*" : "Username:*"}</label>
          <input name="username" value={loginFormData.username} onChange={onChange} type="text" required />
          {toggleSignUp &&<label>Email:*</label>}
          {toggleSignUp &&<input name="email" value={loginFormData.email} onChange={onChange} type="email" autoComplete="true" required/>}
          <label>Password:*</label>
          <input name="password" value={loginFormData.password} onChange={onChange} type="password" autoComplete="false" required/>
          <button>{toggleSignUp ? `Create Account` : `Login`}</button>
          {!toggleSignUp && (<div>
            <h4 style={{cursor:"pointer"}} type="onClick" onClick={toggle}>
              Don't have an account? Click Here
            </h4>
            <h4>Or</h4>
            <h4><Auth0LoginButton onClick={authLoginOnClick}/></h4>
            </div>
          )}
        
          {toggleSignUp && (
            <h4 style={{cursor:"pointer"}} type="onClick" onClick={toggle}>
              Go back to Login
            </h4>
          )}
        </form>
      </div>
    </div>
  );
}
