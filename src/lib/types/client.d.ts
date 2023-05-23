
export type Client = {
    id: string;
    brand: string;
    model: string;
    odometer_readings: number[];
    wheel_pairs: {
        pair1: { tire_model: TireModel; };
        pair2: { tire_model: TireModel; };
    };
};

export type TireBrand = {
    id: string;
    name: string;
    models: TireModel[];
};

export type TireModel = {
    id: string;
    name: string;
};