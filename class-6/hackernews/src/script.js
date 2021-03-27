
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const allLinks = await prisma.link.findMany()
	// const newLink = await prisma.link.newLink()
  
  // await prisma.link.delete({ where: { postedById: null } })
  
  // Delete all 
  // await prisma.link.deleteMany({})
  
  const newLink = await prisma.link.create({
    data: {
      description: 'Fullstack tutorial for GraphQL',
      url: 'www.howtographql.com',
    },
  })

  console.log(allLinks)
  console.log(newLink)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })