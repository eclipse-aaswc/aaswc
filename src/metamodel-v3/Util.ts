/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

export namespace util {
   export class Pair<A, B> {
      constructor(a: A, b: B) { this.first = a; this.second = b;}
      private first: A;
      private second: B;
      public getFirst(): A { return this.first; }
      public setFirst(first: A) { this.first = first; }
      public getSecond(): B { return this.second; }
      public setSecond(second: B) { this.second = second; }
   }

   export class NamedArray<T> extends Array<T> {
      constructor() { super(); }
      private name: string;
      public setName(name: string) { this.name = name; }
      public getName(): string { return this.name; }
   }
}