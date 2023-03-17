import { writable } from "svelte/store";
import type { AppNotification } from "./Models/Notification";
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";


export let notifications = persist(writable<AppNotification>(), createLocalStorage(), 'appNotificationStore')