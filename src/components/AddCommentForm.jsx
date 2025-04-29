import { useState } from "react"

export default function AddCommentForm({ submitComment }) {

  const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        submitComment(message).then(() => setMessage(""))
      }
    return (
        <div className="flex-col gap-3 h-screen w-screen p-6 bg-red-100">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <textarea onChange={e => setMessage(e.target.value)} placeholder="Add your comment please" className="border-[1px] border-zink-400 p-4 w-3/4" />
                <button type='submit' className="border-[1px] rounded-full border-zink-400 w-26">Comment</button>
            </form>
        </div>
    )
 }