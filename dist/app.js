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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groq_Components_1 = require("./components/groq_Components");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/api/submit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receivedUserName = req.body.data;
    console.log('Received data:', receivedUserName);
    if (receivedUserName === "DmitriyH") {
        res.status(201).json({ "message": "DmitriyH, the expert who's been stuck in neutral for so long, he's starting to think 'candidate master' is just a myth perpetuated by people who actually try. With a rating that's been plateauing for years, it's a wonder you haven't gotten bored enough to contribute something, anything, to the community. Your 95 friends must be thrilled to be associated with someone whose peak is being an also-ran. Here's to another decade of going through the motions, Dmitriy" });
        return;
    }
    const data = yield fetch(`https://codeforces.com/api/user.info?handles=${receivedUserName}&checkHistoricHandles=false`);
    if (!data.ok) {
        console.log(`HTTP error! Status: ${data.status}`);
        res.status(400).json({ "result": "Bro Please dont trust your brilliant brain and copy paste your user name" });
        return;
    }
    const jsonData = yield data.json();
    const user = jsonData.result[0];
    const result = yield (0, groq_Components_1.getGroqChatCompletion)(user);
    res.status(201).json({ "message": result });
}));
app.get('/api/demo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ "message": "hi" });
}));
app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
});
