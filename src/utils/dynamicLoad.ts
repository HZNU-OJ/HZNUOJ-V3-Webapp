export function dynamicLoadCSS(path: string) {
  let id = path.replace(/[\./]+/g, "-");
  if (!document.getElementById(id)) {
    let css = document.createElement("link");
    css.id = id;
    css.type = "text/css";
    css.rel = "stylesheet";
    css.href = path;
    document.getElementsByTagName("head")[0].appendChild(css);
  }
}

export function dynamicLoadScript(path: string, callback?: any) {
  callback = callback || function () {};
  let type = "text/javascript";
  let id = path.replace(/[\./]+/g, "-");
  if (!document.getElementById(id)) {
    let script = document.createElement("script");
    script.id = id;
    script.type = type;
    script.src = path;
    script.onload = function () {
      callback();
    };
    document.body.appendChild(script);
  } else {
    callback();
  }
}
