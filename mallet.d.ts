export interface View {
    (strings: TemplateStringsArray, ...substitutions: any[]): Readonly<View>;
    (...values: any[]): Readonly<View>;
    toString(): string;
}

export declare function createView(postprocessFn: (view: string) => string): Readonly<View>;

export = createView;
