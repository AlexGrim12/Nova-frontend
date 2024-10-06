// src/types/neo.ts
export interface RawNEO {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    close_approach_date_full: string;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
    };
    miss_distance: {
      astronomical: string;
      lunar: string;
      kilometers: string;
    };
    orbiting_body: string;
  }>;
}

export interface ProcessedNEO {
  id: string;
  name: string;
  magnitude: number;
  diameter: {
    min: number;
    max: number;
  };
  isHazardous: boolean;
  closeApproach: {
    date: string;
    velocity: number;
    distance: number;
  };
}