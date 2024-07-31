export const getJWTFromCookies = () => {
    return document.cookie.split("=").at(1);
}
