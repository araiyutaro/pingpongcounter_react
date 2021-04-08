import React from "react";

type Props = {
    point: number
    id: string
    increaseMatch: Function
}

const PointBoard: React.FC<Props> = (props) => {
    return (
        <button onClick={() => props.increaseMatch()} className="counter" id={props.id}>{props.point}</button>
    )
}

export default PointBoard