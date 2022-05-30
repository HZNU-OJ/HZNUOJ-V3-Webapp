import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const copyRight = window.defaultTitle;

export function useRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const recaptchaEnabled = false;
  const SkipRecaptcha = false;

  const recaptcha = recaptchaEnabled
    ? SkipRecaptcha
      ? async () => "skip"
      : async (action: string) => {
          try {
            return await executeRecaptcha(action);
          } catch (e) {
            console.error("Recaptcha Error:", e);
            return null;
          }
        }
    : async () => "";

  return Object.assign(recaptcha, {
    getCopyrightMessage: (className: string) =>
      recaptchaEnabled ? (
        <span
          className={className}
          dangerouslySetInnerHTML={{ __html: copyRight }}
        />
      ) : null,
  });
}
