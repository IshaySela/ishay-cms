import { writable } from "svelte/store";
import type { AppNotification } from "./Models/Notification";
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store";
import { browser } from "$app/environment";


export let notifications = browser ? persist(writable<AppNotification>(), createLocalStorage(), 'appNotificationStore') : writable<AppNotification>()