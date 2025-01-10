import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

function Github() {
  const data = useLoaderData()
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (username) {
      navigate(`/github/${username}`)
    }
  }

  return (
    <>
      <div className='text-center m-4'>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter GitHub username'
          className='p-2 border border-gray-400'
        />
        <button onClick={handleSearch} className='ml-2 p-2 bg-blue-500 text-white'>
          Search
        </button>
      </div>
      <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl flex '>
        <div className="w-1/2">
          <img src={data.avatar_url} alt="Git picture" width={300} />
        </div>
        <div className="">
          Github followers: {data.followers}
          <br />
          Total Repos: {data.public_repos}
          <br />
        </div>
      </div>
    </>
  )
}

export default Github


export const githubInfoLoader = async ({ params }) => {
  const username = params.username || '05Ambuj'
  const response = await fetch(`https://api.github.com/users/${username}`)
  return response.json()
}