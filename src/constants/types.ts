export interface PropertyType {
    userId: string;
    name: string;
    location: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultsCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrl: string[];
    lastUpdated: Date;
}

export interface SignInFormInput {
    email: string;
    password: string;
}

export interface RegistrationFormInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface PropertyFormData {
    name: string;
    city: string;
    location: string;
    country: string;
    description: string;
    type: string;
    pricePerNights: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultsCount: number;
    childCount: number;
}