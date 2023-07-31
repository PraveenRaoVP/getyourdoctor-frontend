import React, { useState } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react"

const ChatBot = ({ user ,clinics }) => {
  const API_LINK="https://api.openai.com/v1/chat/completions"
 // const API_LINK="https://chatgpt-api.shn.hk/v1/"
  const API_KEY = process.env.REACT_APP_OPENAI_APIKEY;
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
        message: 'Hello, I am Dr. ChatBot. How can I help you?',
        sender: "Dr. ChatBot",
        direction: 'incoming',
    }
  ]);
    const [input, setInput] = useState('');


    const handleSend = async (message) => {
        console.log(API_KEY)
        const newMessage = {
            message: message,
            sender: user.patientName,
            direction: 'outgoing',
        }

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setTyping(true);
        await processMessageToChatGpt(newMessages);
    }

    const processMessageToChatGpt = async (chatMessages) => {
        let apiMessage = chatMessages.map((message) => {
            let role = "";
            if(message.sender=="Dr. ChatBot"){
                role = "assistant"
            } else{
                role = "user"
            }
            return { role: role, content: message.message}
        });

        const systemMessage  = {
            role: "system",
            content: "Provide possible diseases from the symptoms entered by the patient, and provide the list of clinics that can be visited for that particular disease from the list which will be provided."
        }

        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                systemMessage,
                ...apiMessage, 
            ]
        }

        await fetch(API_LINK, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify(apiRequestBody)
        }).then( (data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
        })

    }
  
    return (
    <div>
      <div style={{position: 'relative', height: '800px', width: '700px', display: 'flex', flexDirection: 'column', justifyContent:'center', alignContent: 'center'}}>
        <MainContainer>
            <ChatContainer>
                <MessageList typingIndicator={typing ? <TypingIndicator content="Dr. ChatBot is analyzing..." /> : null}>
                    {messages.map((message, index) => (
                        <Message
                            key={index} 
                            model={message}
                        />
                    ))}
                </MessageList>
                
                <MessageInput
                    placeholder="Type message here"
                    // value={input}
                    // onChange={(event) => setInput(event.target.value)}
                    onSend={handleSend}
                    attachButton={false}
                />
            </ChatContainer>
        </MainContainer>

      </div>
    </div>
  )
}

export default ChatBot
