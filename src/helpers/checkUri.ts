import * as validUrl from "valid-url";
export default function checkUri(uri) {
  return validUrl.isUri(uri);
}
