import { writable } from "svelte/store";
import type { AppNotification } from "./Models/Notification";


export let notifications = writable<AppNotification>()