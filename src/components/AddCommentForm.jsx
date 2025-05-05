import { useState } from "react";

export default function AddCommentForm({postId, parentId, sendJsonMessage, showAddComment}) {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [homepage, setHomepage] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [homepageError, setHomepageError] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [error, setError] = useState(null);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setHomepage('');
    setCaptchaAnswer('');
    setMessage('');
    setFile(null);
    setFileName('No file chosen');
    setError(null);
  };

  const urlRegex = /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}([/\w\-.]*)*\/?$/i;

  function handleSubmit(e) {
    e.preventDefault();

    if (homepage && !urlRegex.test(homepage)) {
      setHomepageError('Please enter a valid URL');
      return;
    } else {
      setHomepageError('');
    }

    if(file) {
      const reader = new FileReader();

      reader.onload = function() {
        const fileData = reader.result;
        const commentData = {
          postId,
          parentId,
          userName,
          email,
          homepage,
          capcha: captchaAnswer,
          message,
          file:fileData,
          fileName
        };
        sendJsonMessage(commentData);
        resetForm();
        showAddComment(false);
      }
      reader.readAsDataURL(file);
    } else {
      const commentData = {
        postId,
        parentId,
        userName,
        email,
        homepage,
        capcha: captchaAnswer,
        message,
        file: null,
        fileName: null
      };
  
      sendJsonMessage(commentData);
      resetForm();
      showAddComment(false);
    }
  }

  return (
    <div className="flex-col gap-3 h-fit w-screen p-6 bg-red-100">
      {error && (
        <div className="bg-red-200 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User name"
          required
          value={userName}
          onChange={e => setUsername(e.target.value)}
          className="border-[1px] border-zinc-400 p-4 w-3/4 h-6"
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border-[1px] border-zinc-400 p-4 w-3/4 h-6"
        />

        <div className="flex flex-col w-3/4">
          <input
            type="text"
            placeholder="Homepage (optional)"
            value={homepage}
            onChange={e => setHomepage(e.target.value)}
            className={`border-[1px] p-4 h-6 ${homepageError ? 'border-red-500' : 'border-zinc-400'}`}
          />
          {homepageError && (
            <span className="text-red-600 text-sm mt-1">{homepageError}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <img src="/path/to/captcha-image" alt="captcha" className="h-12 w-auto" />
          <input
            type="text"
            placeholder="Enter captcha"
            required
            value={captchaAnswer}
            onChange={e => setCaptchaAnswer(e.target.value)}
            className="border-[1px] border-zinc-400 p-4 w-1/2 h-6"
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor={`inputFile${parentId}`} className="border" >Chose file</label>
          <span  id="fileName">{fileName}</span>
          <input
            type="file"
            name="file"
            accept="image/*,.txt"
            id={`inputFile${parentId}`}
            onChange={(e) => {
              setError(null);
              if(e.target.files?.[0]?.type !== 'image/jpeg' && e.target.files?.[0]?.type !== 'image/png' && e.target.files?.[0]?.type !== 'image/gif' && e.target.files?.[0]?.type !== 'text/plain') {
                setError('File type not supported');
                setFile(null);
                return;
              }
              if(e.target.files?.[0]?.type === 'text/plain' && e.target.files?.[0]?.size > 100000) {
                setError('File size exceeds 100KB');
                setFile(null);
                return;
              }
              setFile(e.target.files?.[0] || null)
              setFileName(e.target.files?.[0]?.name || 'No file chosen');
            }}
            style={{display: "none"}}
          />
        </div>
        <textarea
          onChange={e => setMessage(e.target.value)}
          placeholder="Add your comment please"
          required
          value={message}
          className="border-[1px] border-zinc-400 p-4 w-3/4"
        />

        <button
          type="submit"
          className="border-[1px] rounded-full border-zinc-400 w-26"
        >
          Comment
        </button>
      </form>
    </div>
  );
}
