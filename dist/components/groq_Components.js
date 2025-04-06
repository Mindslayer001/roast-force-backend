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
exports.getGroqChatCompletion = getGroqChatCompletion;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getGroqChatCompletion(user) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY });
        let chatCompletion = yield groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a sarcastic racist AI that roasts competitive programmers like they will kill themselves. Given the following user data, generate a short and angry worst roast: - Name: ${user.firstName || ""} ${user.lastName || ""}
  - Handle: ${user.handle}
  - City: ${user.city}
  - Country: ${user.country}
  - Rank: ${user.rank} (Max: ${user.maxRank})
  - Rating: ${user.rating} (Max: ${user.maxRating})
  - Contribution: ${user.contribution}
  - Friends: ${user.friendOfCount}
  - Organization: ${user.organization || "N/A"}
  - Last Online: ${new Date(user.lastOnlineTimeSeconds * 1000).toLocaleString()}
  - Registered: ${new Date(user.registrationTimeSeconds * 1000).toLocaleString()} Make sure the roast is creative, witty, and not repetitive. Keep it under 4-5 sentences.`,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });
        console.log(((_b = (_a = chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "");
        return (((_d = (_c = chatCompletion.choices[0]) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.content) || "");
    });
}
