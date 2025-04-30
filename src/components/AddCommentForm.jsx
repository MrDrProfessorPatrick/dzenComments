import { useState } from "react";

export default function AddCommentForm({ submitComment }) {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [homepage, setHomepage] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const commentData = {
      userName,
      email,
      homepage,
      capcha: captchaAnswer,
      message,
    };

    submitComment(commentData).then(() => {
      setUsername('');
      setEmail('');
      setHomepage('');
      setCaptchaAnswer('');
      setMessage('');
    });
  }

  return (
    <div className="flex-col gap-3 h-45 w-screen p-6 bg-red-100">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User name"
          required
          value={userName}
          onChange={e => setUsername(e.target.value)}
          className="border-[1px] border-zinc-400 p-4 w-3/4"
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border-[1px] border-zinc-400 p-4 w-3/4"
        />

        <input
          type="url"
          placeholder="Homepage (optional)"
          value={homepage}
          onChange={e => setHomepage(e.target.value)}
          className="border-[1px] border-zinc-400 p-4 w-3/4"
        />

        <div className="flex items-center gap-3">
          <img src="/path/to/captcha-image" alt="captcha" className="h-12 w-auto" />
          <input
            type="text"
            placeholder="Enter captcha"
            required
            value={captchaAnswer}
            onChange={e => setCaptchaAnswer(e.target.value)}
            className="border-[1px] border-zinc-400 p-4 w-1/2"
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
