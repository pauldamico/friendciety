export default function SelectedUser(props) {
    
  const { user, toggleSearch } = props;
  function selectUser() {
    console.log(user);
    toggleSearch();
  }

  return <p style={{textAlign:"center"}} onClick={selectUser}>{user}</p>;
}
