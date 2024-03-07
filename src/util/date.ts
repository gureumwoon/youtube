import { format } from "timeago.js";
import { register } from "timeago.js";
import ko from "timeago.js/lib/lang/ko";

register('ko', ko)

export function convertDate(date: string, lang = 'en_US') {
    return format(date, lang)
}