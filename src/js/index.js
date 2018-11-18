// @flow
export class Hello {
  name: string; // this.nameの型定義

  constructor(name: string) {
    this.name = name;
    this.say();
  }

  say(): void {
    console.log(`Hello ${this.name} World!`);
  }
}

export default new Hello('GRIDMAN');
