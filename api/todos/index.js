import connectToMongodb from '../../src/api/db/connect-to-mongodb'
import Todo from '../../src/api/model/Todo'

const handler = async (request, response) => {
  await connectToMongodb()

  const { method } = request

  if (method === 'GET') {
    const todos = await Todo.find()
    return response.status(200).json(todos)
  }

  if (method === 'POST') {
    const { description } = request.body
    const newTodo = new Todo({ description, done: false })
    await newTodo.save()
    return response.status(200).json(newTodo)
  }

  response.status(501).json(`Not implemented`)
}

export default handler
