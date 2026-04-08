// config inicial chamar o express vai procurar o módulo
const express = require('express')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = express() // Inicializar as apps 

//forma de ler JSON UTILIZAR MIDDLEWARES 
app.use( //criando  o MIDDLEWARES
    express.urlencoded({
      extended: true,
    }),
  )

  app.use(express.json())

  // rotas da API
  const personRoutes = require('./routes/personRoutes')
  app.use('/person', personRoutes)

  //rota inicial GET pegar algo so servidor  endpoint 
  app.get('/',  (req, res) => {

  //mostrar requisição mostrar a resposta que vai ser JSON
    res.json({ message: 'Oi Express'})
})

// Conectar ao MongoDB (em memória para desenvolvimento) e iniciar o servidor
async function startServer() {
  try {
    const mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()

    await mongoose.connect(mongoUri)

    console.log('Conectou ao banco de dados!')
    console.log('--> URL DE CONEXÃO DO BANCO:', mongoUri)

    //entregar a porta
    app.listen(3000)
    console.log('Servidor rodando na porta 3000')
  } catch (err) {
    console.log(err)
  }
}

startServer()
