export interface Restaurant {
    id: string;
    name: string;
    category: string;
    deliveryEstimate: string;
    rating: string;
    imagePath: string;
    hours?:string;
    about?:string;
}