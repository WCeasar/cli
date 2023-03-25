#!/usr/bin/env node
const yargs = require("yargs");
const process = require("process");
const { hideBin } = require("yargs/helpers");
const dedent = require("dedent");

const arg = hideBin(process.argv); // 辅助解析参数的函数

const cli = yargs(arg);

cli // 解析参数
  .usage("Usage wx-cli [command] <options>") // 用法， 当使用--help时出现或者直接输入时从出现
  .demandCommand(1, "command is required") // 最少要输入的command的数量, 如果输入的命令少于1个， 会出现
  .strict() // 在严格模式下遇到没有注册的指令会报错， 如果没有严格模式会没反应
  .recommendCommands() // 当输入错误时后面会按照输入的command最近的字母来给提示
  .fail((err, msg) => {
    console.log(err);
  }) // 会给出清晰的提示, 不会在前面带上一大堆莫名其妙的东西
  .alias("h", "help") // 起别名
  .alias("v", "version") // 起别名
  // wrap(1000). // 更改当前cli的宽度
  .wrap(cli.terminalWidth()) // 如果想要定格显示,  cli.terminalWidth()返回当前终端的宽度
  // epilogue('your own cli footer description'). // 结尾， 在当前cli结尾处显示 ,在--help和直接输入主命令显示
  .epilogue(
    dedent`        哈哈哈哈

哈哈哈

哈哈哈哈`
  ) // 如果想取消缩进， dedent 取消缩进 但是换行和空的一格并不会消除
  .options({
    // 创建所有command可用的option
    debug: {
      type: "boolean",
      alias: "d",
      describe: "bootstrap debug mode",
    },
  })
  .option("registry", {
    type: "string",
    alias: "r",
    describe: "define the registry",
  }) // 和options类似, 但是只能创建一个option
  //   .command(
  //     "init [name]",
  //     "init project",
  //     (yargs) => {
  //       yargs.option("name", {
  //         alias: "n",
  //         describe: "project name",
  //         type: "string",
  //       });
  //     },
  //     (args) => {
  //       console.log(args);
  //     }
  //   ) // 注册一条command, params1: command名字 params2: command describe params3: 注册之后的回调, 一般来创建option, params4: 执行command之后的回调
  .command({
    command: "list",
    aliases: ["ls", "la", "ll"],
    describe: "start project",
    builder: (yargs) => {},
    handler: (args) => {
      console.log(args);
    },
  })
  .group(["debug"], "global options").argv; // 将option分组
