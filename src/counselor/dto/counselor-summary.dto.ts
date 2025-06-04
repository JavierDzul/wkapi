interface UserSummaryDto {
    id: string;
    name: string;
    image?: string | null;
  }
  
  interface PreferenceSummaryDto {
    preferenceId: string;
    name: string;
  }
  
  export class CounselorSummaryDto {
    counselorId: string;
    user: UserSummaryDto;
    preferences: PreferenceSummaryDto[];
    experience?: string | null;
    rating?: number | null;
    totalReviews?: number | null;
    sessionPrice?: number | null;
    nextAvailable?: string | null; // This will be a placeholder or mocked
  }