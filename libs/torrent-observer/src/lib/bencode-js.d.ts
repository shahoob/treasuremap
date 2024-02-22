/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'bencode-js' {
  export function decode(data: string): any;
  export function encode(data: any): string;
}
