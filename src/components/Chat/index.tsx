import { useState, useEffect, useRef } from 'react';
import { chatList } from '../../common/data';
import { ChatType, MemberWriteType, MessageType } from '../../common/types';
import { useAuth } from '../../providers/auth.provider';
import { useSocket } from '../../providers/socket.provider';
import { ChatContent } from './chat.content';
import { ChatPanel } from './chat.panel';
import './index.css';

export const Chat = () => {
  /**
   * Context
   */
  const { client } = useSocket();
  const { profile } = useAuth();
  /**
   * States
   */
  const [chat, setChat] = useState<ChatType | undefined>(undefined);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [chatsLoaded, setChatsLoaded] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [memberWrite, setMemberWrite] = useState<MemberWriteType | undefined>(undefined);
  /**
   * Refs
   */
  const messagesDivRef = useRef<HTMLDivElement>(null);
  /**
   * Effects
   */
  /**
   * Test effect
   */
  useEffect(() => {

    if (!chatsLoaded) {
      setChats(chatList);
      setChatsLoaded(true);
    }

    if (chat) {
  
      setMessages(chat.messages);

      setTimeout(() => {
        if (messagesDivRef.current)
          messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
      }, 50)
    }

  }, [chat, chatsLoaded])

  /**
   * Handlers
   */
  const handleSelectChat = (id: number) => {
    setChat(chats.find((chat) => chat.id === id))
  }
  /**
   * Handler send message
   * @param message 
   * @returns 
   */
  const handleSendMessage = (message: string) => {

    if (!profile) return;

    /**
     * Socket code
     */
    // code

    /**
     * Test code
     */
    // code
    const lastId = messages.length > 0
      ? messages.sort((a, b) => a.id - b.id)
        [messages.length - 1].id + 1
      : 1;

    setMessages([...messages, {
      id: lastId,
      sender: profile,
      text: message,
      createdAt: new Date()
    }])

    setTimeout(() => {
      
      if (messagesDivRef.current)
        messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }, 50)
  }
  
  return (
    <>
      <ChatPanel
        chats={chatList}
        handleSelectChat={handleSelectChat}
        handleDeleteChat={(id: number) => console.log(id)}
      />

      <ChatContent
        chat={chat}
        ToolbarProps={{
          chat,
          writer: !!memberWrite || undefined
        }}
        MessagesProps={{
          writer: memberWrite,
          messages: messages,
          messagesRef: messagesDivRef
        }}
        InputProps={{
          handleSendMessage
        }}
      />
    </>
  )
}