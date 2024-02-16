import './main.scss'
import {getTetris } from "./game/game.js";
import { getRegistration } from "./tabs/registration/registration.js";
import { getTab } from './tabs/switcher/switcher.js';

const app=document.getElementById('app')
app.append(getTab())