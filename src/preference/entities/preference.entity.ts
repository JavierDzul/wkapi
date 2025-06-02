export class Preference {
  preferenceId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  fatherPreferenceId?: string | null;
}
