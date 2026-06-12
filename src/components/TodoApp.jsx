import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, toggleTodo, deleteTodo } from '../store/todoSlice'

function TodoApp() {
  const [text, setText] = useState('')
  const todos = useSelector(state => state.todos.items)
  const dispatch = useDispatch()

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text))
      setText('')
    }
  }

  const completed = todos.filter(t => t.completed).length

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#2d2d2d'
          }}>📝 Todo App</h1>
          <p style={{
            margin: '4px 0 0',
            color: '#888',
            fontSize: '0.9rem'
          }}>
            {completed}/{todos.length} completed
          </p>
        </div>

        {/* Input Row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Kuch likhо..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border 0.2s',
            }}
            onFocus={e => e.target.style.border = '2px solid #667eea'}
            onBlur={e => e.target.style.border = '2px solid #e0e0e0'}
          />
          <button
            onClick={handleAdd}
            style={{
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              fontWeight: '700'
            }}
          >+</button>
        </div>

        {/* Todo List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {todos.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#bbb',
              fontSize: '0.95rem'
            }}>
              Koi todo nahi — kuch add karo! 🎯
            </div>
          )}

          {todos.map(todo => (
            <div key={todo.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              background: todo.completed ? '#f8f8f8' : '#fafafa',
              border: '1.5px solid',
              borderColor: todo.completed ? '#e0e0e0' : '#efefef',
              transition: 'all 0.2s'
            }}>

              {/* Checkbox */}
              <div
                onClick={() => dispatch(toggleTodo(todo.id))}
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  border: todo.completed ? 'none' : '2px solid #ccc',
                  background: todo.completed
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '13px',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {todo.completed ? '✓' : ''}
              </div>

              {/* Text */}
              <span style={{
                flex: 1,
                fontSize: '1rem',
                color: todo.completed ? '#bbb' : '#2d2d2d',
                textDecoration: todo.completed ? 'line-through' : 'none',
                transition: 'all 0.2s'
              }}>
                {todo.text}
              </span>

              {/* Delete Button */}
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ddd',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  padding: '4px',
                  borderRadius: '6px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#ff5c5c'}
                onMouseLeave={e => e.target.style.color = '#ddd'}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* Footer — completed todos clear karo */}
        {completed > 0 && (
          <button
            onClick={() => todos.filter(t => t.completed).forEach(t => dispatch(deleteTodo(t.id)))}
            style={{
              marginTop: '1.2rem',
              width: '100%',
              padding: '10px',
              background: 'none',
              border: '1.5px solid #ffcdd2',
              borderRadius: '12px',
              color: '#e57373',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            🗑 Clear {completed} completed todo{completed > 1 ? 's' : ''}
          </button>
        )}
      </div>
    </div>
  )
}

export default TodoApp