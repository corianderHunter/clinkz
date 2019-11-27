import { Router } from "express";
export declare function Control(name?: string): ClassDecorator;
export declare const mapControl: (control: any, services?: any[]) => {
    path: string;
    router: Router;
};
