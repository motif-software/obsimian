import { Dictionary, List, PropertyName } from "lodash";

export function pick(obj: any, keys: string[]): any {
  const out = {};
  keys.forEach((k) => (out[k] = obj[k]));
  return out;
}

export function fromPairs<T>(
  pairs: List<[PropertyName, T]> | null | undefined
): Dictionary<T> {
  const out = {};
  for (let i = 0; i < pairs?.length; i++) {
    out[pairs[i][0]] = pairs[i][1];
  }
  return out;
}

export function zipObject<T>(
  props: List<PropertyName>,
  values: List<T>
): Dictionary<T> {
  const out = {};
  for (let i = 0; i < props.length; i++) {
    out[props[i]] = values[i];
  }
  return out;
}
