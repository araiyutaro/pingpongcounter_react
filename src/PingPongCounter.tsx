import React, {ChangeEvent} from 'react';
import './PingPongCounter.css';
import PointBoard from "./PointBoard";

type Props = {}

type State = {
    nameA: string
    nameB: string
    pointA: number
    pointB: number
    matchA: number
    matchB: number
    firstServerIsA: boolean
    serverIsA: boolean
}

enum Player {
    A, B
}

class PingPongCounter extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            nameA: "しろ",
            nameB: "みけ",
            pointA: 0,
            pointB: 0,
            matchA: 0,
            matchB: 0,
            firstServerIsA: true,
            serverIsA: true
        }
    }

    componentDidMount() {
        // 名前の初期値入れ＆サーバーの色設定
        (document.getElementById('nameA') as HTMLInputElement)["value"] = this.state.nameA;
        (document.getElementById('nameB') as HTMLInputElement)["value"] = this.state.nameB;
        (document.getElementById('nameA') as HTMLInputElement)["className"] = "name-server";
        (document.getElementById('nameB') as HTMLInputElement)["className"] = "name-not-server";

        // ボタンリスナーの設定
        (document.getElementById('matchA') as HTMLButtonElement).addEventListener('click', this.increaseMatchA);
        (document.getElementById('matchB') as HTMLButtonElement).addEventListener('click', this.increaseMatchB);
        (document.getElementById('changeServer') as HTMLButtonElement).addEventListener('click', this.changeServer);
        (document.getElementById('changeEnds') as HTMLButtonElement).addEventListener('click', this.changeEnds);
        (document.getElementById('resetScore') as HTMLButtonElement).addEventListener('click', this.resetScore);
        (document.getElementById('resetAll') as HTMLButtonElement).addEventListener('click', this.resetAll);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        (document.getElementById('nameA') as HTMLInputElement)["value"] = this.state.nameA;
        (document.getElementById('nameB') as HTMLInputElement)["value"] = this.state.nameB;

        // サーバーの切り替え
        if (this.state.serverIsA) {
            (document.getElementById('nameA') as HTMLInputElement)["className"] = "name-server";
            (document.getElementById('nameB') as HTMLInputElement)["className"] = "name-not-server";
        } else {
            (document.getElementById('nameB') as HTMLInputElement)["className"] = "name-server";
            (document.getElementById('nameA') as HTMLInputElement)["className"] = "name-not-server";
        }
    }


    increasePointA = () => {
        let sum = this.state.pointA + this.state.pointB
        if (sum < 20 && this.state.pointA >= 11) {
            return
        }
        if (sum >= 20 && this.state.pointA >= this.state.pointB + 2) {
            return
        }
        this.setState({
            pointA: this.state.pointA + 1
        })
    }

    decreasePointA = () => {
        if (this.state.pointA <= 0) {
            return
        }
        this.setState({
            pointA: this.state.pointA - 1
        })
    }

    increasePointB = () => {
        let sum = this.state.pointA + this.state.pointB
        if (sum < 20 && this.state.pointB >= 11) {
            return
        }
        if (sum >= 20 && this.state.pointB >= this.state.pointA + 2) {
            return
        }
        this.setState({
            pointB: this.state.pointB + 1
        })
    }

    decreasePointB = () => {
        if (this.state.pointB <= 0) {
            return
        }
        this.setState({
            pointB: this.state.pointB - 1
        })
    }

    increaseMatchA = () => {
        this.setState({
            matchA: this.state.matchA + 1
        })
    }

    increaseMatchB = () => {
        this.setState({
            matchB: this.state.matchB + 1
        })
    }

    changeNameA = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            nameA: event.target.value
        })
    }

    changeNameB = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            nameB: event.target.value
        })
    }

    changeServer = () => {
        this.setState({
            firstServerIsA: !this.state.firstServerIsA,
            serverIsA: !this.state.serverIsA
        })
    }

    changeEnds = () => {
        let newPointA = this.state.pointB
        let newPointB = this.state.pointA
        let newMatchA = this.state.matchB
        let newMatchB = this.state.matchA
        let newNameA = this.state.nameB
        let newNameB = this.state.nameA

        this.setState({
            pointA: newPointA,
            pointB: newPointB,
            matchA: newMatchA,
            matchB: newMatchB,
            nameA: newNameA,
            nameB: newNameB
        })

        this.changeServer()
    }

    checkWinner = (player: Player) => {
        let pA = this.state.pointA
        let pB = this.state.pointB
        let sum = pA + pB
        console.log(sum)

        if (sum < 20) {
            if (player === Player.A && pA >= 11) {
                this.showWinnerCheckAlert(Player.A)
            }
            if (player === Player.B && pB >= 11) {
                this.showWinnerCheckAlert(Player.B)
            }
        } else {
            if (player === Player.A && pA >= pB + 2) {
                this.showWinnerCheckAlert(Player.A)
            }
            if (player === Player.B && pB >= pA + 2) {
                this.showWinnerCheckAlert(Player.B)
            }
        }
    }

    showWinnerCheckAlert = (winner: Player) => {
        let name
        if (winner === Player.A) {
            name = this.state.nameA
        }
        if (winner === Player.B) {
            name = this.state.nameB
        }
        let res = window.confirm(`${name} is win?`)
        if (res) {
            if (winner === Player.A) {
                this.increaseMatchA()
                this.resetScore()
                this.changeServer()
            }
            if (winner === Player.B) {
                this.increaseMatchB()
                this.resetScore()
                this.changeServer()
            }
        } else {
            if (winner === Player.A) {
                this.decreasePointA()
            }
            if (winner === Player.B) {
                this.decreasePointB()
            }
        }
    }

    checkServer = () => {
        let sum = this.state.pointA + this.state.pointB

        if (sum < 20) {
            let i = sum % 4
            if (i === 0 || i === 1) {
                this.setState({
                    serverIsA: this.state.firstServerIsA
                })
            } else {
                this.setState({
                    serverIsA: !this.state.firstServerIsA
                })
            }
        } else {
            let i = sum % 2
            if (i === 0) {
                this.setState({
                    serverIsA: this.state.firstServerIsA
                })
            } else {
                this.setState({
                    serverIsA: !this.state.firstServerIsA
                })
            }
        }
    }


    resetScore = () => {
        this.setState({
            pointA: 0,
            pointB: 0
        })
    }

    resetAll = () => {
        this.setState({
            pointA: 0,
            pointB: 0,
            matchA: 0,
            matchB: 0
        })
    }

    render() {
        return (
            <div className="parent">
                <input id={"nameA"} onChange={this.changeNameA}/>
                <PointBoard point={this.state.pointA} className={"pointA"} increasePoint={() => this.increasePointA()}
                            checkWinner={() => this.checkWinner(Player.A)} checkServer={() => this.checkServer()}/>
                <button id={"matchA"} className={"counter"}>{this.state.matchA}</button>
                <button id={"matchB"} className={"counter"}>{this.state.matchB}</button>
                <button className={"option"} id={"changeServer"}>Change Server</button>
                <button className={"option"} id={"changeEnds"}>Change Ends</button>
                <button className={"option"} id={"resetScore"}>Reset Score</button>
                <button className={"option"} id={"resetAll"}>Reset All</button>
                <input id={"nameB"} onChange={this.changeNameB}/>
                <PointBoard point={this.state.pointB} className={"pointB"} increasePoint={() => this.increasePointB()}
                            checkWinner={() => this.checkWinner(Player.B)} checkServer={this.checkServer}/>
            </div>
        )
    };
}

export default PingPongCounter;
