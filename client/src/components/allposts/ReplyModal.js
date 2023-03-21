
export default function ReplyModel(props) {



  const placeHolder = props.placeHolder || "Write a Comment..."

  return (
    
    <form onSubmit={props.onSubmit} className="reply-model-form">
      <input
      required
      id={`${props._id }comment-input` || null} 
      value={props.reply}
        onChange={props.onChange}
        type="text"
        placeholder={placeHolder}
      />
     
    </form>
    
  );
}
