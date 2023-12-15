import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ChatType } from "../../common/types";
import { useAuth } from "../../providers/auth.provider";

import GroupsIcon from '@mui/icons-material/Groups';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

interface IChatPanelItemProps {
  chat: ChatType;
  handleSelectChat: (id: number) => void;
  handleDeleteChat: (id: number) => void;
}

interface IChatPanelProps {
  chats: ChatType[];
  handleSelectChat: (id: number) => void;
  handleDeleteChat: (id: number) => void;
}

const ChatPanelItem: React.FC<IChatPanelItemProps> = (props) => {
  const {
    chat,
    handleSelectChat,
    handleDeleteChat
  } = props;

  const { profile } = useAuth();
  /**
   * Prepend data
   */
  /** Prepend start icon */
  const startIcon = chat.type === 'default'
    ? chat.creator && chat.receiver && chat.receiver.avatar && profile && chat.creator.id === profile.id
      ? <Avatar src={chat.receiver.avatar} variant='circular' sx={{ backgroundColor: 'transparent' }} />
      : chat.receiver && chat.creator && chat.creator.avatar && profile && chat.receiver.id === profile.id 
      ? <Avatar src={chat.creator.avatar} variant='circular' sx={{ backgroundColor: 'transparent' }} />
      : <>
        <Avatar variant='circular' sx={{ backgroundColor: 'transparent' }}>
          <PermIdentityIcon />
        </Avatar>
      </>
    : chat.icon ? (
      <Avatar variant='rounded' src={chat.icon} sx={{ backgroundColor: 'transparent' }} />
    ) : (
      <Avatar variant='rounded' sx={{ backgroundColor: 'transparent' }}>
        <GroupsIcon />
      </Avatar>
    );
  /** Prepend end icon */
  const endIcon = chat.unreadedMessages.filter((unread) => unread.receiver.id === profile?.id).length
    ? (
      <span className='chat_panel_item_unread_count'>
        {chat.unreadedMessages.filter((unread) => unread.receiver.id === profile?.id).length}
      </span>
    ) : undefined;
  /** Prepend title */
  const title = chat.type === 'default'
    ? (
      <>
        {chat.creator && chat.receiver && profile && chat.creator.id === profile.id && (
          <>{chat.receiver.username}</>
        )}
        {chat.creator && chat.receiver && profile && chat.receiver.id === profile.id && (
          <>{chat.creator.username}</>
        )}
      </>
    )
    : <>{chat.title}</>
  /** Prepend content */
  const content = chat.messages.length > 0
    ? profile && chat.messages[chat.messages.length - 1].sender.id === profile.id
      ? `You: ${chat.messages[chat.messages.length - 1].text}`
      : `${chat.messages[chat.messages.length - 1].sender.username}: ${chat.messages[chat.messages.length - 1].text}`
    : 'No messages';

  return (
    <> 
      <div className="chat_panel_item">
        <Button
          variant='text'
          startIcon={startIcon}
          endIcon={endIcon}
          onClick={() => handleSelectChat(chat.id)}
        >
          <div className="chat_panel_item_info">
            <span className="chat_panel_item_info_title">{title}</span>
            <span className="chat_panel_item_info_content">{content}</span>
          </div>
        </Button>
      </div>
    </>
  )
}

export const ChatPanel: React.FC<IChatPanelProps> = (props) => {
  const {
    chats,
    handleSelectChat,
    handleDeleteChat
  } = props;

  return (
    <>
      <div id="chat-panel">
        {chats.map((chat, key) => (
          <ChatPanelItem
            key={key}
            chat={chat}
            handleSelectChat={handleSelectChat}
            handleDeleteChat={handleDeleteChat}
          />
        ))}
      </div>
    </>
  )
}