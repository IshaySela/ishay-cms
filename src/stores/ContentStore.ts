import { writable } from "svelte/store";
import type { Content } from "../Models/Content";


export const contentStore = writable<Content>()