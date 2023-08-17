import React from 'react';

function Todo(props) {
    return (
        <div>
            <input type="text"  id="todo" placeholder='enter' />
            <button>Add Todo</button>
        </div>
    );
}

export default Todo;