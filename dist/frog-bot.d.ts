import { Bot, Message } from "mirai-js";
interface Command {
    name: string;
    description: string;
    options?: [
        {
            name: string;
            description: string;
            handler: (message: Message, bot: FrogBot) => void;
        }
    ];
}
export declare class FrogBot extends Bot {
    commands: Command[] | undefined;
    constructor();
    translate(str: string): Promise<string>;
    echo(group: number, name: string, content: string): Promise<void>;
    getDict(): Promise<{
        pbp: string;
        zml: string;
        pyq: string;
        pljw: string;
        psm: string;
        dx: string;
        bpl: string;
        mgj: string;
    }>;
    printDict(group: any): Promise<void>;
    printHelp(group: number): Promise<void>;
}
export {};
