import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'
const Toggle = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant="secondary" onClick={toggleVisibility}>close</Button>
            </div>
        </div>
    )
}
)
Toggle.displayName = 'Toggle'
Toggle.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
export default Toggle