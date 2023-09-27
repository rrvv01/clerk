import Link from 'next/link'
import React from 'react'
import { FaCodeBranch, FaEye, FaStar } from 'react-icons/fa'

const username = 'bradtraversy'

async function fetchRepos() {
  const url = `https://api.github.com/users/${username}/repos`

  //1. SSG : static site generation
  //const response = await fetch(url)

  //2. SSR : server side rendering
  //const response = await fetch(url, { cache: 'no-store' })

  //3. ISR : incremental static regeneration
  const response = await fetch(url, { next: { revalidate: 60 } })

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const repos = await response.json()
  return repos
}

const ReposPage = async () => {
  const repos = await fetchRepos()
  //console.log(repos)
  return (
    <div>
      <h2 className="test-2xl font-bold mb-4">
        Github repositories of {username}
      </h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className="bg-gray-300 m-8 p-4 rounded-md">
            <Link href={`/repos/${repo.name}`}>
              <h3 className="text-xl font-bold">{repo.name}</h3>
              <p>{repo.description}</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReposPage
