"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mr = require("azure-pipelines-task-lib/mock-run");
const fs = require("fs");
const path = require("path");
const taskPath = path.join(__dirname, "../index.js");
var runner = new mr.TaskMockRunner(taskPath);
function assertDirectory(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}
// ENV
const tempPath = path.join(__dirname, "..", "..", "..", "temp");
const agentPath = path.join(tempPath, "agent");
process.env["BUILD_BUILDNUMBER"] = "1";
assertDirectory(tempPath);
assertDirectory(agentPath);
assertDirectory(process.env["AGENT_HOMEDIRECTORY"] = path.join(agentPath, "home"));
assertDirectory(process.env["AGENT_TOOLSDIRECTORY"] = path.join(agentPath, "tools"));
assertDirectory(process.env["AGENT_TEMPDIRECTORY"] = path.join(agentPath, "temp"));
assertDirectory(process.env["AGENT_BUILDDIRECTORY"] = path.join(agentPath, "build"));
//let tmr = require('vsts-task-lib/mock-toolrunner');
//runner.registerMock('vsts-task-lib/toolrunner', tmr);
runner.setInput("mode", "auto");
runner.setInput("channel", "stable");
runner.setInput("version", "latest");
runner.run(true);
