import { PrismaClient } from '../../generated/prisma';
import bcryptjs from 'bcryptjs';


const prisma = new PrismaClient();

async function main() {
    const bcpass = bcryptjs.hashSync('123456', 10);

    await prisma.user.deleteMany();
    await prisma.preference.deleteMany();

    // Parent preferences and their children
    const preferences = [
        {
            name: "Tecnología y Sistemas",
            description: "Área de tecnología, sistemas y computación.",
            children: [
                { name: "Programación", description: "Desarrollo de software y lógica de programación." },
                { name: "Inteligencia Artificial", description: "IA, machine learning y data science." },
                { name: "Redes y Telecomunicaciones", description: "Infraestructura y comunicación de datos." },
                { name: "Ciberseguridad", description: "Seguridad informática y protección de datos." },
                { name: "Bases de Datos", description: "Gestión y diseño de bases de datos." },
                { name: "Automatización", description: "Automatización de procesos y sistemas." },
                { name: "Desarrollo Web y Móvil", description: "Creación de aplicaciones web y móviles." },
            ],
        },
        {
            name: "Ingeniería Aplicada",
            description: "Ingeniería en contextos prácticos y productivos.",
            children: [
                { name: "Diseño Mecánico", description: "Diseño y análisis de sistemas mecánicos." },
                { name: "Electricidad y Electrónica", description: "Sistemas eléctricos y electrónicos." },
                { name: "Manufactura y Producción", description: "Procesos de manufactura y producción industrial." },
                { name: "Mantenimiento Industrial", description: "Mantenimiento de maquinaria y equipos." },
                { name: "Control y Robótica", description: "Automatización, control y robótica." },
                { name: "Transporte e Infraestructura", description: "Sistemas de transporte e infraestructura." },
                { name: "Energía y Sustentabilidad", description: "Energías renovables y sustentabilidad." },
            ],
        },
        {
            name: "Arquitectura y Diseño del Entorno",
            description: "Diseño arquitectónico y del entorno construido.",
            children: [
                { name: "Diseño Arquitectónico", description: "Diseño de espacios arquitectónicos." },
                { name: "Urbanismo", description: "Planificación y desarrollo urbano." },
                { name: "Construcción", description: "Procesos y técnicas constructivas." },
                { name: "Modelado 3D (CAD/BIM)", description: "Modelado digital y herramientas CAD/BIM." },
                { name: "Normativas y Regulaciones", description: "Normas y regulaciones en construcción." },
                { name: "Paisajismo", description: "Diseño y planificación de espacios exteriores." },
            ],
        },
        {
            name: "Gestión Empresarial",
            description: "Administración y gestión de empresas.",
            children: [
                { name: "Administración de Empresas", description: "Gestión y administración organizacional." },
                { name: "Gestión de Proyectos", description: "Planificación y dirección de proyectos." },
                { name: "Emprendimiento", description: "Creación y desarrollo de nuevos negocios." },
                { name: "Finanzas", description: "Gestión financiera y análisis económico." },
                { name: "Recursos Humanos", description: "Gestión del talento humano." },
                { name: "Estrategia Comercial", description: "Estrategias de ventas y marketing." },
                { name: "Innovación y Mejora Continua", description: "Procesos de innovación y mejora." },
            ],
        },
        {
            name: "Contabilidad y Finanzas",
            description: "Contabilidad, auditoría y finanzas empresariales.",
            children: [
                { name: "Contabilidad General", description: "Principios y prácticas contables." },
                { name: "Auditoría", description: "Revisión y control de procesos contables." },
                { name: "Fiscalización", description: "Supervisión y cumplimiento fiscal." },
                { name: "Finanzas Corporativas", description: "Gestión financiera en empresas." },
                { name: "Costos y Presupuestos", description: "Elaboración y control de presupuestos." },
                { name: "Normas Financieras", description: "Normatividad financiera y contable." },
            ],
        },
        {
            name: "Turismo y Cultura",
            description: "Gestión turística y promoción cultural.",
            children: [
                { name: "Gestión Turística", description: "Administración de servicios turísticos." },
                { name: "Promoción Cultural", description: "Difusión y promoción de la cultura." },
                { name: "Diseño de Experiencias", description: "Creación de experiencias turísticas." },
                { name: "Turismo Sustentable", description: "Turismo responsable y sustentable." },
                { name: "Patrimonio y Cultura", description: "Gestión del patrimonio cultural." },
                { name: "Mercadotecnia Turística", description: "Marketing aplicado al turismo." },
            ],
        },
    ];

    // Seed parent and child preferences with relations
    for (const parent of preferences) {
        const parentPref = await prisma.preference.create({
            data: {
                name: parent.name,
                description: parent.description,
            },
        });

        for (const child of parent.children) {
            await prisma.preference.create({
                data: {
                    name: child.name,
                    description: child.description,
                    fatherPreferenceId: parentPref.preferenceId,
                },
            });
        }
    }

    const newUsers = await prisma.user.createMany({
        data: [
            { 
                name: 'Admin Name',
                email: 'p1@correo.com',
                password: bcpass,
                role: 'admin',
             },
            { 
                name: 'User Name',
                email: 'p2@correo.com',
                password: bcpass,
             },
        ],
    });

    console.log(newUsers);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
