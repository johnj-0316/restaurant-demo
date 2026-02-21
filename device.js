// Source - https://stackoverflow.com/a/27249628
// Posted by Anoop Asok, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-20, License - CC BY-SA 4.0
export function deviceUUID() {
    let navigator_info = window.navigator;
    let screen_info = window.screen;
    let uid = navigator_info.mimeTypes.length;
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || '';
    uid += screen_info.width || '';
    uid += screen_info.pixelDepth || '';
    return uid;
}