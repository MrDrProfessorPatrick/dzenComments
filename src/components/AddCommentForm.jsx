export default function AddCommentForm() {
    return (
        <div className="flex-col gap-3 h-screen w-screen p-6 bg-red-100">
            <span className="text-3xl">Comments</span>
            <div className="flex flex-col gap-3">
                <input placeholder="Add your comment please" className="border-[1px] border-zink-400 p-4 w-3/4" />
                <button className="border-[1px] rounded-full border-zink-400 w-26">Comment</button>
            </div>
        </div>
    )

 }