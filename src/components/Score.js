import { useContext } from 'react'
import { ScoreContext } from './ScoreContext'

export default function Score() {
    const {score} = useContext(ScoreContext);
    
    return (
        <div className="score">
            {score}
        </div>
    )
}
