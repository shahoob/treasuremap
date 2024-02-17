/// <reference types="node" />

declare module 'bencode' {
  export function byteLength(value: any): number;
  export function encodingLength(value: any): number;
  export function encode(data: any, buffer?: Buffer, offset?: number): Buffer;
  export function decode(data: Buffer, encoding?: string): any;
  export function decode(data: Buffer, start?: number, encoding?: string): any;
  export function decode(
    data: Buffer,
    start?: number,
    end?: number,
    encoding?: string,
  ): any;
}
