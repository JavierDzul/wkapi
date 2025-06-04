import { User } from '@prisma/client'; // Or your specific User DTO if fields are different
import { Preference } from '@prisma/client'; // Or your specific Preference DTO
import { availability as Availability } from '@prisma/client'; // Or your specific Availability DTO

// Helper type for nested user data we want to expose
class PublicCounselorUserDto {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

// Helper type for exposed preference data
class PublicCounselorPreferenceDto {
  preferenceId: string;
  name: string;
  description: string;
}

// Helper type for exposed availability data
class PublicCounselorAvailabilityDto {
  availabilityId: string;
  weekday: string; // Matches 'weekday' enum in Prisma (monday, tuesday, etc.)
  startTime: string; // Formatted as HH:MM
  endTime: string;   // Formatted as HH:MM
}

export class PublicCounselorProfileDto {
  counselorId: string;
  user: PublicCounselorUserDto;
  bio?: string | null;
  experience?: string | null;
  education?: string[];
  certifications?: string[];
  languages?: string[];
  sessionPrice?: number | null;
  preferences: PublicCounselorPreferenceDto[];
  availability: PublicCounselorAvailabilityDto[];
  totalSessions: number;
  rating?: number | null; // Placeholder: Requires a review system
  totalReviews?: number;  // Placeholder: Requires a review system
}