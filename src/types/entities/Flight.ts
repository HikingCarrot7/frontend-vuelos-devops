export interface Flight {
  id?: number;
  estimatedHours: number;
  takeOffSiteId: number;
  landingSiteId: number;
  date: string;
  hour: string;
}
