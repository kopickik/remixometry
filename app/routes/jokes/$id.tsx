import { Joke } from ".prisma/client"
import { Link, LoaderFunction, useLoaderData } from "remix"
import { db } from "~/utils/db/server"

type LoaderData = { joke: Joke }

export const loader: LoaderFunction = async ({ params }) => {
  const joke = await db.joke.findUnique({
    where: { id: params.id },
  })
  if (!joke) throw new Error("Joke not found")
  const data: LoaderData = { joke }
  return data
}

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>()
  return (
    <div>
      <p>Here's your hillarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  )
}
