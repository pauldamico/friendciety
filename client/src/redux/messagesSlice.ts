import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessagesState {
  receivedMessages: [
    {
      from: string;
      message: string;
      image: string;
      dateReceived: string;
    }
  ];
  sentMessages: [
    {
      to: string;
      message:string;
      image:string;
      dateSent: string;
    }
  ];
  userId: string
  username: string
}

const initialState: MessagesState = {
    receivedMessages: [
        {
          from:"",
          message:"",
          image: "",
          dateReceived:"",
        }
      ],
      sentMessages: [
        {
          to: "",
          message:"",
          image:"",
          dateSent: ""
        }
      ],
      userId: "",
      username: ""
}

export const messagesSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessagesState>) => {
      state = action.payload;
    },
    resetMessages: (state) => {
      state = initialState;
    },
  },
});
