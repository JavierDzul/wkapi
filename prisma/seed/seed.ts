import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'
import { PrismaClient, Role, weekday, BookingStatus, ApplicationStatus, Preference, Student, Counselor } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const password = bcrypt.hashSync('123456', 10)

  // Clean DB
  await prisma.counselor_Post_Application.deleteMany()
  await prisma.studentPost.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.availability.deleteMany()
  await prisma.student.deleteMany()
  await prisma.counselor.deleteMany()
  await prisma.preference.deleteMany()
  await prisma.user.deleteMany()

  // Seed preferences
  const parentPreferences = [
    {
      name: 'Tecnología y Sistemas',
      description: 'Área de tecnología, sistemas y computación.',
      children: [
        { name: 'Programación', description: 'Desarrollo de software y lógica de programación.' },
        { name: 'Inteligencia Artificial', description: 'IA, ML y data science.' },
        { name: 'Redes', description: 'Redes y comunicación.' },
      ],
    },
    {
      name: 'Gestión Empresarial',
      description: 'Administración y gestión de empresas.',
      children: [
        { name: 'Administración', description: 'Gestión organizacional.' },
        { name: 'Finanzas', description: 'Análisis económico y financiero.' },
        { name: 'Marketing', description: 'Publicidad y estrategia comercial.' },
      ],
    },
  ]

  const allPreferences:Preference[] = []

  for (const parent of parentPreferences) {
    const parentCreated = await prisma.preference.create({
      data: {
        name: parent.name,
        description: parent.description,
      },
    })

    for (const child of parent.children) {
      const childCreated = await prisma.preference.create({
        data: {
          name: child.name,
          description: child.description,
          fatherPreferenceId: parentCreated.preferenceId,
        },
      })
      allPreferences.push(childCreated)
    }
  }

  // Create Admin
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@correo.com',
      password,
      role: 'admin',
    },
  })

  const students: Student[] = []
  const counselors : Counselor[]= []

  // Create 10 Students and 5 Counselors
  for (let i = 0; i < 10; i++) {
    const studentUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password,
        role: 'student',
      },
    })

    const student = await prisma.student.create({
      data: {
        userID: studentUser.id,
        preferences: {
          connect: [
            { preferenceId: faker.helpers.arrayElement(allPreferences).preferenceId },
          ],
        },
      },
    })

    students.push(student)
  }

  for (let i = 0; i < 5; i++) {
    const counselorUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password,
        role: 'counselor',
      },
    })

    const counselor = await prisma.counselor.create({
      data: {
        userID: counselorUser.id,
        preferences: {
          connect: [
            { preferenceId: faker.helpers.arrayElement(allPreferences).preferenceId },
          ],
        },
      },
    })

    // Add availability
    for (let d = 0; d < 3; d++) {
      await prisma.availability.create({
        data: {
          counselorId: counselor.counselorId,
          weekday: faker.helpers.arrayElement(Object.values(weekday)),
          startTime: faker.date.future().toISOString(),
          endTime: faker.date.future().toISOString(),
        },
      })
    }

    counselors.push(counselor)
  }

  // Create bookings
  for (let i = 0; i < 10; i++) {
    const student = faker.helpers.arrayElement(students)
    const counselor = faker.helpers.arrayElement(counselors)
    const date = faker.date.soon()
    const startTime = faker.date.between({ from: date, to: date })
    const endTime = faker.date.between({ from: startTime, to: date })

    await prisma.booking.create({
      data: {
        studentId: student.studentId,
        counselorId: counselor.counselorId,
        date,
        startTime,
        endTime,
        status: faker.helpers.arrayElement(Object.values(BookingStatus)),
      },
    })
  }

  // Create StudentPosts
  for (const student of students) {
    const date = faker.date.future()
    const startTime = faker.date.between({ from: date, to: date })
    const endTime = faker.date.between({ from: startTime, to: date })
    const post = await prisma.studentPost.create({
      data: {
        studentId: student.studentId,
        title: faker.lorem.sentence(),
        description: faker.lorem.sentences(2),
        content: faker.lorem.paragraph(),
        date,
        startTime,
        endTime,
        closedDate: new Date(),
      },
    })

    // Each post receives 1-3 applications from counselors
    const applyingCounselors = faker.helpers.arrayElements(counselors, {
      min: 1,
      max: 3,
    })

    for (const counselor of applyingCounselors) {
      await prisma.counselor_Post_Application.create({
        data: {
          postId: post.postId,
          counselorId: counselor.counselorId,
          status: faker.helpers.arrayElement(Object.values(ApplicationStatus)),
        },
      })
    }
  }

  console.log(`✅ Seed completo: ${students.length} estudiantes, ${counselors.length} consejeros, bookings y posts generados.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
