
export default function Reply (props){

    return (<div className="reply-divv">
        <img src={require('../../images/red.jpg')}height="20px" width="20px"/>
        <div className="reply-divv2">
<h4>{props.username}</h4>
<span>{props.reply}</span>
</div>
    </div>)
}