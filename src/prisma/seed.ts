import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
  
  
  const Roles =  await prisma.role.createMany({
    data:[
      {
        name: 'Admin'
      },
      {
        name: 'Customer'
      }
    ]
  })

  await prisma.user.create({
    data:
      {
        firstName: 'Admin',
        lastName: 'Admin',
        email: "admin@thelivegreen.go",
        password: bcrypt.hashSync("12345678", 10),
        role:{
          connect:{
            name: 'Admin'
          }
        }
      }
  })

  await prisma.user.create({
    data:
      {
        firstName: 'Customer',
        lastName: 'Customer',
        email: "customer@thelivegreen.go",
        password: bcrypt.hashSync("12345678", 10),
        role:{
          connect:{
            name: 'Customer'
          }
        }
      }
  })

  //Add Ingredients

  for (let i = 0; i < 100; i++) {
    await prisma.ingredient.create({
      data:{
        name: faker.lorem.slug(),
        description: faker.lorem.sentence(5),
        category: faker.lorem.word(),
        type: faker.lorem.word(),
        claims:"2",
        instructions: "Demo",
        servingSize: "3-10",
        quantityPer100MgMl: '333',
        calories:100,
        preparationMethods: 'demo',
        IngredientMedia:{
          create:
            {
              type: "Image",
              path: faker.image.imageUrl(),
              status: 1
            }
          
        },
        prices: {
          create:[
            {
              name:faker.lorem.slug(),
              quantity: "1",
              currency: 'INR',
              unit: "1",
              type: 'ONE_TIME',
              amount: 100
            }
          ]
        }
      }
    })
    
  }

}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })