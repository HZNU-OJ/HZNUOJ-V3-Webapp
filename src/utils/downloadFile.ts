export default function downloadFile(url: string) {
  const link = document.createElement("a");
  link.target = "_blank";
  link.href = url;
  link.download = "";
  link.click();
}
