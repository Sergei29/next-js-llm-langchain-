import fs from 'fs/promises'
import path from 'path'

const readFileNames = async () => {
  try {
    const res = await fs.readdir(path.join(process.cwd(), 'src/pages/api'), {
      withFileTypes: true,
      recursive: true,
    })

    const names = res.map((current) => current.name.replace('.js', ''))
    await fs.writeFile(
      path.join(process.cwd(), 'src', 'apiRoutes.json'),
      JSON.stringify(names),
    )
  } catch (error) {
    console.log('readdir error: ', error)
  }
}

export const createRoutes = async () => {
  const routesList = [
    'chatcompletions',
    'content-generator',
    'memory',
    'pdf-query',
    'pdf-upload',
    'resume-query-metadata',
    'resume-upload',
    'streaming',
    'video-chat',
  ]
  try {
    await Promise.all(
      routesList.map((route) =>
        fs.mkdir(path.join(process.cwd(), 'src/app/api', route)),
      ),
    )
  } catch (error) {
    console.log('mkdir error: ', error)
  }
}
