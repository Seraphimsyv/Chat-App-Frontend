import { ChatType, UserType } from "./types";

/* Auth data */

export const TEST_USER: UserType = {
  id: 1,
  login: 'login',
  username: 'Tester',
}

export const TEST_SECOND_USER: UserType = {
  id: 2,
  login: 'login',
  username: 'Tester 2',
}

/* Chat data */

export const chatList: ChatType[] = [
  {
    id: 1,
    type: 'default',
    messages: [
      {
        id: 1,
        sender: TEST_SECOND_USER,
        text: 'Hello there',
        createdAt: new Date(2023, 11, 11, 15, 15)
      },
      {
        id: 2,
        sender: TEST_SECOND_USER,
        text: 'somebody',
        createdAt: new Date(2023, 11, 12, 15, 5)
      }
    ],
    unreadedMessages: [
      {
        id: 1,
        chatId: 1,
        messageId: 1,
        receiver: TEST_USER
      }
    ],
    creator: TEST_USER,
    receiver: TEST_SECOND_USER
  }
]