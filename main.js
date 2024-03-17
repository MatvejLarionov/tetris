import './main.scss'
import { getTab } from './tabs/switcher/switcher.js';

const app=document.getElementById('app')
app.append(getTab())