/**
 * It returns the type of the value passed to it
 * @param {unknown} value - The value to be converted to a raw type.
 * @returns The type of the value. such as Object, Array, Map, Set, Date, RegExp, String, Number, Boolean, Symbol, Function, Promise, Undefined, Null, NaN, Infinity, -Infinity, Error, Arguments, Element, Window, Document, DocumentFragment, Text, Comment, DocumentType, ProcessingInstruction, CDATASection, XMLDocument, XMLSerializer, XPathEvaluator, XPathExpression, XPathResult, Attr, CharacterData, NamedNodeMap, Node, NodeList, HTMLCollection, StyleSheet, CSSRule, CSSRuleList, CSSStyleDeclaration, CSSValue, CSSValueList, ClientRect, ClientRectList, DOMRectList, DOMStringList, DOMTokenList, MediaList, StyleSheetList, TextMetrics, TimeRanges, BarProp, Location, Navigator, Performance, Screen, Crypto, CryptoKey, DOMException, DOMImplementation, Event, MessageEvent, CloseEvent, ErrorEvent, EventSource, HashChangeEvent, PopStateEvent, ProgressEvent, CustomEvent, CompositionEvent, FocusEvent, InputEvent, KeyboardEvent, MouseEvent, PointerEvent, TouchEvent, WheelEvent, UIEvent, AnimationEvent, TransitionEvent, Blob, File, FileList, FileReader, FormData, URLSearchParams, ArrayBuffer, ArrayBufferView, DataView, Float32Array, Float64Array, Int8Array, Int16Array, Int32Array, Uint8Array, Uint16Array, Uint32Array, Uint8ClampedArray, SharedArrayBuffer, Atomics, JSON, Math, Reflect and so on.
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/toTypeString.ts
 */
export const toTypeString = (value: unknown): string => {
  return Object.prototype.toString.call(value).slice(8, -1)
}
