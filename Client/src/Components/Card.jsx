import React from 'react'

function Card(props) {
    const daoADD = 'abc'
  return (
    <div>
        <h2>DAO name</h2>
        <button>
            <a href={`https://discord.com/api/oauth2/authorize?client_id=1109245990302662787&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdaos%3Fdao%3D${daoADD}&response_type=token&scope=guilds`}>Press me</a>
        </button>
    </div>
  )
}

export default Card

