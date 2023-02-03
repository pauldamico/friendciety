

export default function LoginForm(props) {
  const { toggle, toggleSignUp, onSubmit, loginFormData, onChange} = props;


 
  return (
    <div className="login-div">
      <div>
        <form className="login-form" onSubmit={onSubmit}>
          <label>Username</label>
          <input name="username" value={loginFormData.username} onChange={onChange} type="text" />
          <label>Password</label>
          <input name="password" value={loginFormData.password} onChange={onChange} type="password" autoComplete="false"/>
          <button>{toggleSignUp ? `Create Account` : `Login`}</button>
          {!toggleSignUp && (
            <h4 type="onClick" onClick={toggle}>
              Don't have an account? Click Here
            </h4>
          )}
          <div></div>
          {toggleSignUp && (
            <h4 type="onClick" onClick={toggle}>
              Go back to Login
            </h4>
          )}
        </form>
      </div>
    </div>
  );
}
