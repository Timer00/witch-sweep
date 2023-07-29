// Message.js
// import { useMemo } from 'react';

// TODO: make animation of the text appearing word by word/char by char

const Message = ({ message }: { message: string }) => {
  // // This is code that could be used in the future to make the message animation
  // const items = useMemo(
  //   () =>
  //     message.split('').map((letter, index) => ({
  //       item: letter,
  //       key: `${letter}${index}`,
  //     })),
  //   [message],
  // );

  return <div>{message}</div>;
};
export default Message;
