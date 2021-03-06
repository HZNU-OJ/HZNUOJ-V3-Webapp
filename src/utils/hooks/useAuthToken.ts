export function useAuthToken() {
  const getToken = function () {
    return window.localStorage.hznuojAuthToken;
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
