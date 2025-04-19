"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
if (!process.env.supabaseUrl || !process.env.supabaseKey) {
    throw new Error("Supabase URL and Key must be provided in environment variables");
}
exports.supabase = (0, supabase_js_1.createClient)((_a = process.env.supabaseUrl) !== null && _a !== void 0 ? _a : '', (_b = process.env.supabaseKey) !== null && _b !== void 0 ? _b : '');
