import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DialogueState {
  data: {
    show: boolean;
    type?: string;
    image?: string;
    title?: string;
    text?: string;
    textColor?: string;
    acceptLabel?: any;
    acceptColor?: string;
    rejectLabel?: string;
    hasAction?: boolean;
    closable?:boolean;
    onAccept?: () => void;
    onReject?: () => void;
  };
}

const initialState: DialogueState = {
  data: {
    show: false,
    type: "",
    image: "",
    title: "",
    text: "",
    textColor: "",
    acceptLabel: "",
    rejectLabel: "",
    acceptColor: "",
    hasAction: true,
    closable:true,
		onAccept: () => {
			return;
		},
		onReject: () => {
			return;
		},
  },
};

export const dialogueSlice = createSlice({
  name: "dialogue",
  initialState,
  reducers: {
    setDialogue: (state, action) => {
      state.data = action.payload;
    },
    resetDialogue: () => initialState,
  },
});

export const { setDialogue, resetDialogue } = dialogueSlice.actions;

export const getDialogue = (state: RootState) => state.dialogue.data;

export default dialogueSlice.reducer;
