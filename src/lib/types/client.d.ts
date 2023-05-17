export type Client = {
    id: string;
    brand: "Ford" | "Fiat" | "Toyota" | "Chevrolet";
    model: string;
    odometer_readings: number[];
    wheel_pairs: {
        pair1: { brand_name: string, model_name: string },
        pair2: { brand_name: string, model_name: string }
    };
}