/**
 * Types/interfaces
 */

export interface WindowSize{
    width: number;
    height: number;
}

export interface Paddler {
    id: number;
    name: string;    
    weight: number;    
    adj_perg_500_sec: number;    
    position: string;    
    stroke: boolean;    
    pacer: boolean;    
    engine: boolean;    
    rocket: boolean;    
    drummer: boolean;    
    stern: boolean;    
    side_preference: number;
    roster: boolean;
    row?:number;
    boat_pos?: number; // -1: none, 1: left, 2: right, 3: drum, 4:right
    onBoat?: boolean;
}

export type PaddlerKeys = keyof Paddler;

export type SeatSelectionType = (
    paddlerName: string, 
    paddlerId: number, 
    row?: number, 
    pos?: string ) => void;
