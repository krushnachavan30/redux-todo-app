import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',

  // Initial state — store mein pehle se kya rahega
  initialState: {
    items: [],
    nextId: 1
  },

  // Reducers = actions + state update logic
  reducers: {

    // Action 1: Todo add karo
    addTodo: (state, action) => {
      state.items.push({
        id: state.nextId,
        text: action.payload,   // payload = jo text type kiya
        completed: false
      })
      state.nextId += 1
    },

    // Action 2: Todo complete/incomplete toggle karo
    toggleTodo: (state, action) => {
      const todo = state.items.find(
        t => t.id === action.payload  // payload = id
      )
      if (todo) todo.completed = !todo.completed
    },

    // Action 3: Todo delete karo
    deleteTodo: (state, action) => {
      state.items = state.items.filter(
        t => t.id !== action.payload  // payload = id
      )
    }
  }
})

// Actions export karo — component mein use honge
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions

// Reducer export karo — store mein jayega
export default todoSlice.reducer