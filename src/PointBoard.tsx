import React from "react";

type Props = {
    point: number
    className: string
    increasePoint: Function
    checkWinner: Function
    checkServer: Function
}

const PointBoard: React.FC<Props> = (props) => {
    React.useEffect(() => {
        props.checkServer()
        props.checkWinner()
    })
    return (
        <button onClick={() => props.increasePoint()} className="counter" id={props.className}>{props.point}</button>
    )
}

export default PointBoard