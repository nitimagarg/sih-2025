export interface PathwayItem {
    name: string;
    completed: boolean;
}

export interface Pathway {
    id: string;
    courses: PathwayItem[];
    microCredentials: PathwayItem[];
    certifications: PathwayItem[];
    onTheJobTraining: PathwayItem[];
}
