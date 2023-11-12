import ChatStream from '@/components/ChatStream'

const Home = () => {
  return (
    <div className="flex flex-col gap-12 justify-center items-center">
      <h1 className="text-6xl text-enter font-extrabold">
        Langchain.js Demo 🦜
      </h1>
      <ChatStream />
    </div>
  )
}

export default Home
