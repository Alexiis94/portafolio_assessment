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
exports.deleteUser = exports.singIn = exports.singUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, config_1.default.jwtSecret, {
        expiresIn: 86400, //1 día especificamos cuanto tiempo de duración tendra el token.
    });
}
const singUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.body);
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ msg: "Por favor ingrese su Email y contraseña" });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: "El Usuario ya Existe." });
    }
    const newUser = new user_1.default(req.body); //creamos la instancia para crear un nuevo usuario
    yield newUser.save(); // guardamos el usuario en la DB.
    return res.status(201).json(newUser);
});
exports.singUp = singUp;
const singIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ msg: "Por favor ingrese su Email y contraseña" });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).json("Este usuario no existe.");
    }
    const isMatch = yield (user === null || user === void 0 ? void 0 : user.comparePassword(req.body.password)); // comparamos la contraseña
    if (isMatch) {
        return res.status(200).json({ token: createToken(user) });
    }
    return res.status(400).json("El correo o la contraseña son incorrectas");
});
exports.singIn = singIn;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_1.default();
        console.log(user);
        return res.json(user);
    }
    catch (error) {
        console.log(error);
        res.send(error);
        throw error;
    }
});
exports.deleteUser = deleteUser;
