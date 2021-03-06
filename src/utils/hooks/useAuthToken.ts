export function useAuthToken() {
  const getToken = function () {
    let token = window.localStorage.hznuojAuthToken;
    if (!token) token = "";
    return token;
  };

  const signIn = function (token: string) {
    window.localStorage.hznuojAuthToken = token;
  };

  const signOut = function () {
    window.localStorage.hznuojAuthToken = "";
  };

  return {
    getToken,
    signIn,
    signOut,
  };
}
