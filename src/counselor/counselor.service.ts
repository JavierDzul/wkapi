import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCounselorDto } from './dto/create-counselor.dto';
import { UpdateCounselorDto } from './dto/update-counselor.dto';
import { BookingStatus } from '@prisma/client';
import { PublicCounselorProfileDto } from './dto/public-counselor-profile.dto';
import { CounselorSummaryDto } from './dto/counselor-summary.dto';

function formatPrismaTime(date: Date): string {
  if (!date || !(date instanceof Date)) return '';
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
function getMockNextAvailable(): string {
  const days = ["Hoy", "Mañana", "Pasado Mañana", "Próximo Lunes", "Próximo Martes"];
  const times = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];
  return `${days[Math.floor(Math.random() * days.length)]} ${times[Math.floor(Math.random() * times.length)]}`;
}
@Injectable()
export class CounselorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCounselorDto: CreateCounselorDto): Promise<PublicCounselorProfileDto> {
    // Assuming CreateCounselorDto includes userID and other necessary fields
    // If it includes nested user creation, that logic would be here or in a UserService
    
    // Ensure all array fields have default values if not provided
    const dataToCreate = {
      ...createCounselorDto,
      experience: createCounselorDto.experience || "Experiencia por definir",
      sessionPrice: createCounselorDto.sessionPrice || 0,
      rating: createCounselorDto.rating || Math.round((Math.random() * 2 + 3) * 10) / 10, // Mock rating 3.0 - 5.0
      totalReviews: createCounselorDto.totalReviews || Math.floor(Math.random() * 200), // Mock reviews
      bio: createCounselorDto.bio || "Biografía pendiente.",
      education: createCounselorDto.education || [],
      certifications: createCounselorDto.certifications || [],
      languages: createCounselorDto.languages || ["Español"],
      // preferences would be linked separately if IDs are passed in DTO
    };

    const newCounselor = await this.prisma.counselor.create({
      data: dataToCreate,
    });

    // After creating, fetch the full profile for the response
    // This reuses the getPublicProfile logic to ensure consistency
    return this.getPublicProfile(newCounselor.counselorId);
  }

  async findAll(): Promise<CounselorSummaryDto[]> {
    const counselors = await this.prisma.counselor.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        preferences: {
          select: {
            preferenceId: true,
            name: true,
          },
        },
        // To get totalReviews or rating, you'd typically join/include a Review model
        // For now, we'll rely on mocked/direct fields on the Counselor model
        // or invent them if they are not present.
      },
    });

    return counselors.map(counselor => {
      // Ensure user and preferences are not null
      const user = counselor.user ? {
        id: counselor.user.id,
        name: counselor.user.name || "Nombre no disponible",
        image: counselor.user.image,
      } : { id: 'unknown', name: 'Usuario Desconocido', image: null };

      const preferences = counselor.preferences ? counselor.preferences.map(p => ({
        preferenceId: p.preferenceId,
        name: p.name,
      })) : [];
      
      // Invent data if fields are missing from the model
      const experience = counselor.experience || `${Math.floor(Math.random() * 10) + 1} años de experiencia`;
      const rating = counselor.rating || Math.round((Math.random() * 2 + 3) * 10) / 10; // Mock rating 3.0 - 5.0
      const totalReviews = counselor.totalReviews || Math.floor(Math.random() * 200); // Mock reviews 0-199
      const sessionPrice = counselor.sessionPrice || Math.floor(Math.random() * 50) + 50; // Mock price $50-$99

      return {
        counselorId: counselor.counselorId,
        user: user,
        preferences: preferences,
        experience: experience,
        rating: rating,
        totalReviews: totalReviews,
        sessionPrice: sessionPrice,
        nextAvailable: getMockNextAvailable(), // Using mocked availability
      };
    });
  }


  async findOne(counselorId: string) { // This likely returns the raw Prisma model
    const counselor = await this.prisma.counselor.findUnique({
      where: { counselorId },
      include: { 
        user: { select: { id: true, name: true, email: true, image: true } } 
      },
    });
    if (!counselor) {
      throw new NotFoundException(`Counselor con ID ${counselorId} no encontrado.`);
    }
    return counselor;
  }


  async getPublicProfile(counselorId: string): Promise<PublicCounselorProfileDto> {
    const counselor = await this.prisma.counselor.findUnique({
      where: { counselorId },
      include: {
        user: { select: { id: true, name: true, email: true, image: true } },
        preferences: { select: { preferenceId: true, name: true, description: true } },
        availability: { select: { availabilityId: true, weekday: true, startTime: true, endTime: true } },
        booking: { where: { status: BookingStatus.completed }, select: { bookingId: true } },
      },
    });

    if (!counselor) {
      throw new NotFoundException(`Perfil de Counselor con ID ${counselorId} no encontrado.`);
    }
    
    const user = counselor.user ? counselor.user : 
      { id: 'unknown', name: 'Usuario Desconocido', email: 'no-email@example.com', image: null };

    // Invent data for profile if fields are missing
    const bio = counselor.bio || "Este consejero aún no ha completado su biografía.";
    const experience = counselor.experience || "Experiencia no especificada.";
    const education = counselor.education && counselor.education.length > 0 ? counselor.education : ["Educación no especificada."];
    const certifications = counselor.certifications && counselor.certifications.length > 0 ? counselor.certifications : ["Certificaciones no especificadas."];
    const languages = counselor.languages && counselor.languages.length > 0 ? counselor.languages : ["Español (Presumido)"];
    const sessionPrice = counselor.sessionPrice === null || counselor.sessionPrice === undefined ? (Math.floor(Math.random() * 50) + 50) : counselor.sessionPrice;
    const rating = counselor.rating === null || counselor.rating === undefined ? (Math.round((Math.random() * 2 + 3) * 10) / 10) : counselor.rating;
    const totalReviews = counselor.totalReviews === null || counselor.totalReviews === undefined ? Math.floor(Math.random() * 100) : counselor.totalReviews;


    return {
      counselorId: counselor.counselorId,
      user: { id: user.id, name: user.name, email: user.email, image: user.image },
      bio: bio,
      experience: experience,
      education: education,
      certifications: certifications,
      languages: languages,
      sessionPrice: sessionPrice,
      preferences: counselor.preferences.map(p => ({
        preferenceId: p.preferenceId,
        name: p.name,
        description: p.description || "Descripción no disponible.",
      })),
      availability: counselor.availability.map(a => ({
        availabilityId: a.availabilityId,
        weekday: a.weekday as string,
        startTime: formatPrismaTime(a.startTime),
        endTime: formatPrismaTime(a.endTime),
      })),
      totalSessions: counselor.booking.length,
      rating: rating,
      totalReviews: totalReviews,
    };
  }

  async update(counselorId: string, updateCounselorDto: UpdateCounselorDto): Promise<PublicCounselorProfileDto> {
    // Ensure all array fields have default values if not provided in DTO
    const dataToUpdate = {
        ...updateCounselorDto,
        // If education, etc. can be partial, handle merging or ensure DTO is complete
    };
    await this.prisma.counselor.update({
      where: { counselorId },
      data: dataToUpdate,
    });
    // Return the updated full profile
    return this.getPublicProfile(counselorId);
  }

  remove(counselorId: string) {
    return this.prisma.counselor.delete({ where: { counselorId } });
  }
}
