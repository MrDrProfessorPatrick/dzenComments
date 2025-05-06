export function getCaptcha() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captcha += characters[randomIndex];
  }
  return captcha;
}

export const insertTag = (textareaRef, setMessage, startTag, endTag = "") => {
  const textarea = textareaRef.current;
  const value = textarea.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = value.substring(start, end);
  const newText =
    value.substring(0, start) +
    startTag +
    selectedText +
    endTag +
    value.substring(end);

  setMessage(newText);

  setTimeout(() => {
    textarea.focus();
    const cursorPos = start + startTag.length;
    textarea.setSelectionRange(cursorPos, cursorPos);
  }, 0);
};
