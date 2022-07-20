import React from 'react'

const Form = (props) => {
    return (
        <form>
            <input type='text' placeholder='Username...' value={props.username} onChange={props.onChange} />
            <button onClick={props.connect}>Connect</button>
        </form>
    )
}

export default Form