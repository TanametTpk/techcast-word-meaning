import React from 'react'

interface Props {

}

const CenterContent: React.FC<Props> = ({ children }) => {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: 'flex',
                justifyContent: "space-evenly",
                alignItems: "center"
            }}
        >
            { children }
        </div>
    )
}

export default CenterContent
