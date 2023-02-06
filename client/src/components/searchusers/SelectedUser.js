export default function SelectedUser(props) {
  const { user, toggleSearch } = props;
  function selectUser() {
    console.log(user);
    toggleSearch();
  }

  return (
    <div className="selected-user-list-div">
      <p
        onClick={() => {
          toggleSearch();
        }}
      >
        {user}
      </p>{" "}
      <section style={{ cursor: "pointer" }} onClick={selectUser}>
        Add
      </section>
    </div>
  );
}
