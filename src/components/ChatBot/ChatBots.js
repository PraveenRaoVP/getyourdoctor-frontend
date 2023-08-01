import { ChatContainer, MainContainer, Message, MessageInput, MessageList, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import React, { useState } from 'react'

const ChatBots = ({ user, clinics }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const corsUrl = process.env.REACT_APP_CORS_URL;
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
      const newMessage = {
        message: message,
        sender: user.patientName,
        direction: 'outgoing',
      }
  
      const newMessages = [...messages, newMessage];
  
      setMessages(newMessages);
      setTyping(true);
  
      // Call function to search the internet for possible diseases based on user symptoms
      const possibleDiseases = searchDiseasesFromInternet(newMessage.message);
  
      // Call backend endpoint with patient's city and keywords (diseases)
      const response = await fetch(`${corsUrl}/${apiUrl}/clinic-areas/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: user.patientAddress.city,
          keywords: newMessage.message
        })
      });
  
      const clinicList = await response.json();
      console.log(clinicList);
      console.log(user.patientAddress);
      console.log(newMessage.message);  
  
      // Display the clinic list
      //displayClinicListInChatbot(clinicList);
  
      // Process message with ChatGPT
      await processMessageToChatGpt(newMessages, clinicList);
    }
    

    // Function to search the internet for possible diseases based on user symptoms
  const searchDiseasesFromInternet = (symptoms) => {
    // Implement your logic here to search the internet for possible diseases based on symptoms
    // Return an array of possible diseases
    return ['disease1', 'disease2'];
  }

  const processMessageToChatGpt = async (chatMessages, clinicList) => {
    let apiMessage = chatMessages.map((message) => {
      let role = "";
      if (message.sender === "Dr. ChatBot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: message.message };
    });
  
    const systemMessage = {
      role: "system",
      content: `Provide possible diseases from the symptoms entered by the patient, and provide the list of clinics that can be visited for that particular disease from the list which will be provided. The location of the patient is ${user.patientAddress.city} and all the available clinics are ${clinics
        .map(
          (clinic) =>
            clinic.clinicAreaName +
            " - " +
            clinic.clinicAreaType +
            "-" +
            clinic.address +
            " - " +
            clinic.keywords
        )
        .join(", ")}`
    };
  
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessage]
    };
  
    await fetch(API_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify(apiRequestBody)
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content+"\n\n"+displayClinicListInChatbot(clinicList),
            sender: "Dr. ChatBot",
            direction: "incoming"
          }
        ]);
        setTyping(false);
      });
  };

  const displayClinicListInChatbot = (clinicList) => {
    if (clinicList.length === 0) {
      // If clinic list is empty, display a message indicating no clinics found
      setMessages([
        ...messages,
        {
          message: "No clinics found in your area for the given symptoms.",
          sender: "Dr. ChatBot",
          direction: "incoming"
        }
      ]);
    } else {
      let i=0;
      // If clinic list is not empty, display the list of clinics
      const clinicMessage = `The clinics near you that you might want to visit:\n${clinicList.map(
          (clinic) =>
            `${++i}. ${clinic.clinicAreaName} - ${clinic.clinicAreaType} - ${clinic.address}`
        )
        .join("\n")}`;

      return clinicMessage;
    }
  };
  
  
  
  
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

export default ChatBots
