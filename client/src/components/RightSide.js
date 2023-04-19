import WindowSize from "./WindowSize";
import { useSelector } from "react-redux";
import MessageModel from "./chat/MessageModel";

export default function RightSide() {
  const { friends } = useSelector((state) => state.friends);
  const { currentUser } = useSelector((state) => state.currentUser);
  const { token } = currentUser || null;

  return (
    <WindowSize arrow=">">
      <div className="rightbar-div">
        {token ? (
          <div className="rightbar-div2">
            {friends.friends
              .slice()
              .sort((a, b) => a.user.localeCompare(b.user))
              .map((friend) => (
                <MessageModel
                  user={friend.user}
                  key={friend.user}
                  style={{ display: "flex", gap: "1vw", alignItems: "center" }}
                />
              ))}
          </div>
        ) : null}
      </div>
    </WindowSize>
  );
}
