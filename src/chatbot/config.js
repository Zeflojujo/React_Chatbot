import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './DogPicture.jsx';
const botName = 'OAAMS Assistant';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
        backgroundColor: '#376B77',
    },
    chatButton: {
        backgroundColor: "#cccccc",
    },
  },
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ],
};

export default config;