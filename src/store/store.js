import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'

const store = configureStore({
  reducer: {
    todos: todoReducer  // state.todos se access hoga
  }
})

export default store