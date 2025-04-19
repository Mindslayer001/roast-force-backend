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
const Supabase_components_1 = require("./components/Supabase_components");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/api/submit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receivedUserName = req.body.data;
    console.log('Received data:', receivedUserName);
    const { data, error } = yield Supabase_components_1.supabase.rpc('get_recent_roast', { user_handle: receivedUserName, cooldown: 120 });
    ;
    if (error) {
        console.log("Error in supabase", error);
        res.status(400).json({ "result": "Error in supabase" });
        return;
    }
    const userDetailsFromDB = data !== null && data !== void 0 ? data : null;
    console.log("User Details from DB", userDetailsFromDB);
    const codeForceProfileData = yield fetch(`https://codeforces.com/api/user.info?handles=${receivedUserName}&checkHistoricHandles=false`);
    if (!codeForceProfileData.ok) {
        console.log(`HTTP error! Status: ${codeForceProfileData.status}`);
        res.status(400).json({ "result": "Bro Please dont trust your brilliant brain and copy paste your user name" });
        return;
    }
    const jsonData = yield codeForceProfileData.json();
    const user = jsonData.result[0];
    let result;
    const userid = userDetailsFromDB ? userDetailsFromDB.user_id : 0;
    if ((userDetailsFromDB === null || userDetailsFromDB === void 0 ? void 0 : userDetailsFromDB.roast) === "ok") {
        result = yield (0, groq_Components_1.getGroqChatCompletion)(user);
        const { data, error } = yield Supabase_components_1.supabase.rpc('set_recent_roast', { roast: result, user_id: userid });
        ;
    }
    else {
        result = data === null || data === void 0 ? void 0 : data.roast;
    }
    const timer = new Date(Date.now() + ((userDetailsFromDB ? userDetailsFromDB.time : 0) * 1000)).toISOString();
    console.log("Timer", timer);
    res.status(201).json({ "username": receivedUserName, "postText": result, "avatarUrl": user.titlePhoto, "timer": timer, "new_user": userDetailsFromDB === null || userDetailsFromDB === void 0 ? void 0 : userDetailsFromDB.new_user });
}));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ "message": "hi" });
}));
app.listen(process.env.Port, () => {
    console.log(`Express server running`);
});
