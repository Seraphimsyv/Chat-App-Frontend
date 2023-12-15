export type UserType = {
  id: number;
  login: string;
  username: string;
  avatar?: string;
  isOnline?: true;
  lastOnlineAt?: Date;
}

/** Chat types */

export type MemberWriteType = UserType;

export type MessageType = {
  id: number,
  sender: UserType;
  text: string;
  is_edited?: true;
  createdAt: Date;
  updatedAt?: Date;
}

export type UnReadedMessageType = {
  id: number;
  chatId: number;
  messageId: number;
  receiver: UserType;
}

export type ChatVariant = 'default' | 'group';

export type ChatType = {
  id: number;
  type: ChatVariant;
  title?: string;
  icon?: string;
  creator: UserType;
  members?: UserType[];
  receiver?: UserType;
  messages: MessageType[];
  unreadedMessages: UnReadedMessageType[];
}