export const AddChat = 'AddChat';
export const RemoveChat = 'RemoveChat';

export const addChat = (chat) => ({
    type: AddChat,
    payload: chat,
  });
  
  export const cleanChats = () => ({
    type: RemoveChat,
  });
  const initialState = [];
  const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
      case AddChat:
        return [...state, action.payload];
      case RemoveChat:
        return [];
      default:
        return state;
    }
  };
  
  export default chatsReducer;