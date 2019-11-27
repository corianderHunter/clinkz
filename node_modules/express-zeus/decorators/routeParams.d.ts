import { Request, Response, NextFunction } from "express";
declare type RouteParamTypes = "PARAM" | "QUERY" | "BODY" | "REQ" | "RES" | "NEXT";
export interface RouteParamMetaData {
    type: RouteParamTypes;
    index: number;
    prop?: string;
}
export declare const Param: (key?: string) => ParameterDecorator;
export declare const Query: (key?: string) => ParameterDecorator;
export declare const Body: (target: any, key: any, paramIdx: any) => void;
export declare const Req: (target: any, key: any, paramIdx: any) => void;
export declare const Res: (target: any, key: any, paramIdx: any) => void;
export declare const Next: (target: any, key: any, paramIdx: any) => void;
export declare const mapRouteParams: (paramsDecorator: RouteParamMetaData[], req: Request, res: Response, next: NextFunction) => any[];
export {};
