import React from 'react'

export default function RankingList({ rankings }) {
    return (
        <>
            <h2 className="ranking-title">Top 10 Ranks</h2>
            <ul>
                <li className="rank-head">
                    <div className="name=head">Name</div>
                    <div className="score-head">Score</div>
                </li>
                {rankings.map(({name, score}, index) => {
                    return (
                        <li key={index}>
                            <div className="rank-name">{name}</div>
                            <div className="rank-score">{score}</div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
