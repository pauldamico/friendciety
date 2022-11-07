export default function MyFeedPost (props){


    return (
        <div>
            <h1>{props.post}</h1>
            <button>Edit Post</button>
            <button>Delete</button>
        </div>
    )
}