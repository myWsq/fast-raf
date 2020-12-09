export declare type Event = (time: number) => void;
export declare type RafEventMap = Record<number, Event | null>;
declare global {
    interface Window {
        FAST_RAF: {
            map: RafEventMap;
            count: number;
        };
    }
}
