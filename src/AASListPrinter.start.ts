/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { AASListPrinter } from "./imports.js";

export module AASListPrinterStart {


export function showAASList(parent) {
   var p: AASListPrinter = new AASListPrinter(parent, parent[0]);
   p.run();

}
}

export function initListener() {
  const element = document.getElementById("showAASModal");
  element?.addEventListener("click", listenerFunction);
}

function listenerFunction(this: HTMLElement, ev: Event) {
   console.log("Event listener triggered");
   var parent = document.getElementById("selectAASModal");
   var p: AASListPrinter = new AASListPrinter(parent, /*parent[0]*/ parent);
   p.run();
}

initListener();