import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { ChatType, MemberWriteType, MessageType } from "../../common/types";
import { useAuth } from '../../providers/auth.provider';
import TelegramIcon from '@mui/icons-material/Telegram';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IChatContentToolbarProps {
  chat?: ChatType;
  writer?: true;
}

interface IChatContentMessageProps {
  message: MessageType;
}

interface IChatContentMessagesProps {
  writer?: MemberWriteType;
  messages: MessageType[];
  messagesRef: React.RefObject<HTMLDivElement>;
}

interface IChatContentInputProps {
  handleSendMessage: (message: string) => void;
}

interface IChatContentProps {
  chat?: ChatType;

  ToolbarProps: IChatContentToolbarProps;
  MessagesProps: IChatContentMessagesProps;
  InputProps: IChatContentInputProps;
}

const ChatContentToolbar: React.FC<IChatContentToolbarProps> = (props) => {
  const { chat, writer } = props;
  const { profile } = useAuth();

  const title = chat?.type === 'default'
    ? (
      <>
        {chat?.creator && chat?.receiver && profile && chat?.creator.id === profile.id && (
          <>{chat?.receiver.username}</>
        )}
        {chat?.creator && chat?.receiver && profile && chat?.receiver.id === profile.id && (
          <>{chat?.creator.username}</>
        )}
      </>
    )
    : <>{chat?.title}</>

  const isOnline = 
    chat?.creator?.id === profile?.id 
      ? chat?.receiver?.isOnline === true
        ? true : false
      : chat?.creator?.isOnline === true
        ? true : false;

  return (
    <>
      <div id="chat-toolbar">

        <div id="chat-info">

          <span id="chat-title">{title}</span>

          <span id="chat-receiver-status" className={`${isOnline ? 'online' : 'offline'}`}>
            <>
              {isOnline ? 'Online' : 'Offline'}
            </>
          </span>

        </div>

        <Button
          variant='text'
        >
          <MoreVertIcon />
        </Button>

      </div>
    </>
  )
}

const ChatContentMessage: React.FC<IChatContentMessageProps> = (props) => {
  const { message } = props;
  const { profile } = useAuth();

  const messageDateHour = message.updatedAt 
    ? message.updatedAt.getHours() : message.createdAt.getHours();
  
  const messageDateMin = message.updatedAt
    ? `${message.updatedAt.getMinutes() < 10 ? '0' + String(message.updatedAt.getMinutes()) : message.updatedAt.getMinutes()}`
    : `${message.createdAt.getMinutes() < 10 ? '0' + String(message.createdAt.getMinutes()) : message.createdAt.getMinutes()}`;

  const messageDate = `${messageDateHour}:${messageDateMin}`;

  return (
    <>
      <div className={`chat_content_messages_message ${profile && profile?.id === message.sender.id ? 'owner' : 'receiver'}`}>
        <span>{message.text}</span>
        <span>{messageDate}</span>
      </div>
    </>
  )
}

const ChatContentMessages: React.FC<IChatContentMessagesProps> = (props) => {
  const { writer, messages, messagesRef } = props;
  const { profile } = useAuth();
  const messagesByDate: Record<string, MessageType[]> = {};

  messages.forEach(obj => {
    const dateKey = obj.createdAt.toISOString().split('T')[0];
    
    if (!messagesByDate[dateKey])
      messagesByDate[dateKey] = [];

    messagesByDate[dateKey].push(obj);
  })

  return (
    <>
      <div id="chat-messages-block" ref={messagesRef}>
        <div id="chat-messages-list">

          {Object.keys(messagesByDate).map((date, key) => (

            <React.Fragment key={key}>
              
              <span className='chat_content_messages_global_date'>{date}</span>

              {messagesByDate[date].map((message) => (
                <ChatContentMessage key={message.id} message={message} />
              ))}

            </React.Fragment>

          ))}

          {writer && writer.id !== profile?.id && (
            <div className={`chat_content_messages_writer`}>
              {writer.username} write
            </div>
          )}

        </div>
      </div>
    </>
  )
}

const ChatContentInput: React.FC<IChatContentInputProps> = (props) => {
  const {
    handleSendMessage
  } = props;
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    
    if (message.length === 0) return;

    setMessage('');
    handleSendMessage(message)
  }

  return (
    <>
      <div id="chat-input">

        <TextField
          variant='standard'
          placeholder='Write message...'
          color='primary'
          sx={{
            color: 'white',
            margin: 'auto',
            width: '85%'
          }}
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          onKeyDown={evt => evt.key === 'Enter' && handleSend()}
        />

        <Button
          variant='contained'
          sx={{
            paddingLeft: '1.5em',
            paddingRight: '1.5em',
            borderRadius: 0
          }}
          onClick={handleSend}
        >
          <TelegramIcon />
        </Button>

      </div>
    </>
  )
}

export const ChatContent: React.FC<IChatContentProps> = (props) => {
  const {
    chat,
    ToolbarProps,
    MessagesProps,
    InputProps
  } = props;

  return (
    <>
      <div
        id="chat-content"
      >

        {chat && (

          <>
            <ChatContentToolbar {...ToolbarProps} />

            <ChatContentMessages {...MessagesProps} />

            <ChatContentInput {...InputProps} />
          </>

        )}

      </div>
    </>
  )
}