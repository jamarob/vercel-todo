import connectToMongodb from '../../backend/db/connect-to-mongodb'
import Todo from '../../backend/model/Todo'

const handler = async (request, response) => {
  await connectToMongodb()

  const { method } = request
  const { id } = request.query

  if (method === 'PUT') {
    const todoDto = request.body
    const foundTodo = await Todo.findById(id)

    if (!foundTodo) {
      return response.status(404).json('Not found')
    }

    foundTodo.description = todoDto.description
    foundTodo.done = todoDto.done
    await foundTodo.save()
    return response.status(200).json(foundTodo)
  }

  response.status(501).json('Not implemented')
}

export default handler
