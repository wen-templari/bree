"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrogBot = void 0;
const mirai_js_1 = require("mirai-js");
const config_1 = require("./config");
const Dict = {
    pbp: "拼不拼",
    zml: "在麦里",
    pyq: "拼一枪",
    pljw: "拼了叫我",
    psm: "拼什么",
    dx: "都行",
    bpl: "不拼了",
    mgj: "妈个鸡",
};
const Options = {
    "-r": {
        description: "撤回上一条信息",
        text: true,
    },
    "-h": {
        description: "帮助",
    },
    "-d": {
        description: "获取词典",
    },
};
class FrogBot extends mirai_js_1.Bot {
    // commands: Command[] = [
    //   {
    //     name: "ts",
    //     description: "转换",
    //     options: [
    //       {
    //         name: "-r",
    //         description: "撤回上一条信息",
    //         handler: (message: Message, bot: FrogBot) => {
    //   }
    // ]
    constructor() {
        super();
        // this.bot = new Bot()
        this.open({
            baseUrl: config_1.MiraiConfig.url,
            verifyKey: config_1.MiraiConfig.key,
            qq: config_1.BotAccount.id,
        });
        const GroupFilter = new mirai_js_1.Middleware().groupFilter(config_1.GroupList, true).textProcessor();
        this.on("GroupMessage", GroupFilter.done((data) => __awaiter(this, void 0, void 0, function* () {
            let content = data.text;
            let group = data.sender.group.id;
            let memberName = data.sender.memberName;
            let cmdReg = /^t\s/;
            if (!cmdReg.test(content)) {
                return;
            }
            content = content.replace(cmdReg, "");
            let optionReg = /^-[a-z]/;
            let arg = "";
            if (optionReg.test(content)) {
                arg = content.match(optionReg)[0];
                content = content.replace(optionReg, "");
            }
            // for (let option in options) {
            //   if (option == arg) {
            //     options[option].handler(this.bot, data)
            //   }
            // }
            if (arg == "") {
                content = yield this.translate(content);
                yield this.echo(group, memberName, content);
            }
            else if (arg == "-h") {
                yield this.printHelp(group);
            }
            else if (arg == "-d") {
                yield this.printDict(group);
            }
            else if (arg == "-r") {
                content = this.translate(content);
                yield this.echo(group, memberName, content);
                try {
                    yield this.recall({ messageId: data.messageChain[0].id });
                }
                catch (err) {
                    console.log(err);
                }
            }
        })));
    }
    translate(str) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = str;
            let dict = yield this.getDict();
            let sortedKeys = Object.keys(dict).sort((a, b) => {
                return a.length - b.length;
            });
            let sortedDict = {};
            for (let key of sortedKeys) {
                sortedDict[key] = dict[key];
            }
            for (let key in sortedDict) {
                res = res.replace(new RegExp(key, "g"), sortedDict[key]);
            }
            return res;
        });
    }
    echo(group, name, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sendMessage({
                    group: group,
                    message: new mirai_js_1.Message().addText(name + ":\n").addText(content),
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getDict() {
        return __awaiter(this, void 0, void 0, function* () {
            return Dict;
        });
    }
    printDict(group) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = new mirai_js_1.Message();
            msg.addText("词典\n");
            for (let key in Dict) {
                msg.addText(`  ${key} ${Dict[key]}\n`);
            }
            yield this.sendMessage({
                group: group,
                message: msg,
            });
        });
    }
    printHelp(group) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = new mirai_js_1.Message().addText("Usage\n");
            msg.addText("  t <text> 转换<text>\n");
            for (let key in Options) {
                if (Options[key].text) {
                    msg.addText(`  t  ${key} <text> ${Options[key].description}\n`);
                }
                else {
                    msg.addText(`  t  ${key} ${Options[key].description}\n`);
                }
            }
            msg.addText("\n项目地址:\nhttps://github.com/wen-templari/bree");
            yield this.sendMessage({
                group: group,
                message: msg,
            });
        });
    }
}
exports.FrogBot = FrogBot;
