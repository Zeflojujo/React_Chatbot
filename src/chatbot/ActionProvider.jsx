// import React, { useState, useEffect } from 'react';
// import { loadCSVData } from './utils/csvReader';

// const ActionProvider = ({ createChatBotMessage, setState, children }) => {
//   const [qaData, setQaData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await loadCSVData();
//       setQaData(data);
//     };

//     fetchData();
//   }, []);

//   const handleSendMessage = (userMessage) => {
//     const foundItem = qaData.find((item) =>
//       userMessage.toLowerCase().includes(item.question.toLowerCase())
//     );

//     let botResponse;

//     if (foundItem) {
//       botResponse = createChatBotMessage(foundItem.answer);
//     } else {
//       botResponse = createChatBotMessage("I don't understand what you mean. Can you clarify more?");
//     }

//     setState((prev) => ({
//       ...prev,
//       messages: [...prev.messages, botResponse],
//     }));
//   };

//   const handleHello = () => {
//     const botMessage = createChatBotMessage('Hello. Nice to meet you.');

//     setState((prev) => ({
//       ...prev,
//       messages: [...prev.messages, botMessage],
//     }));
//   };

//   const defaultResponse = () => {
//     const botMessage = createChatBotMessage('Your question is outside of my training scope! Can you ask another question?');

//     setState((prev) => ({
//       ...prev,
//       messages: [...prev.messages, botMessage],
//     }));
//   };

//   const handleDog = () => {
//     const botMessage = createChatBotMessage("Here's a nice dog picture for you!", {
//       widget: 'dogPicture',
//     });

//     setState((prev) => ({
//       ...prev,
//       messages: [...prev.messages, botMessage],
//     }));
//   };

//   return (
//     <div>
//       {React.Children.map(children, (child) => {
//         return React.cloneElement(child, {
//           actions: {
//             handleHello,
//             defaultResponse,
//             handleDog,
//             handleSendMessage,
//           },
//         });
//       })}
//     </div>
//   );
// };

// export default ActionProvider;

import React, { useState, useEffect } from 'react';
import { loadCSVData } from './utils/csvReader';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const [qaData, setQaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadCSVData();
      setQaData(data);
    };

    fetchData();
  }, []);

  const handleSendMessage = async (userMessage) => {
    let botResponse;

    try {
      const response = await fetch('/api/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage }),
      });

      const data = await response.json();
      botResponse = createChatBotMessage(data.response);
    } catch (error) {
      botResponse = createChatBotMessage("I don't understand what you mean. Can you clarify more?");
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botResponse],
    }));
  };

  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const defaultResponse = () => {
    const botMessage = createChatBotMessage('Your question is outside of my training scope! Can you ask another question?');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDog = () => {
    const botMessage = createChatBotMessage("Here's a nice dog picture for you!", {
      widget: 'dogPicture',
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            defaultResponse,
            handleDog,
            handleSendMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;

