import {getFireStore} from "firebase/firestore";
import {app} from "./config";

export const db = getFireStore(app);