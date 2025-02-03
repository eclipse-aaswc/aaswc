/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Ajax } from "./exports.js";

import { types, util } from "./../imports.js"
import { ajax } from "jquery";

export module apiV3 {

export class APIClient {
   constructor() {
      this.ajax = new Ajax.AjaxHelper();
   }

   private ajax: Ajax.AjaxHelper;

   /* AssetAdministrationShellRepositoryServiceSpecification */
   public GetAssetAdministrationShellById(repositoryurl: string, id: string,
      success_callback: any, error_callback: any) {
      return this.getByURL(
         Helper.trimSuffixSlash(repositoryurl) + "/shells/" + id,
            success_callback, error_callback);
   }

   /* SubmodelRepositoryServiceSpecification */
   public GetSubmodelById(repositoryurl: string, id: string,
         success_callback: any, error_callback: any) {
      return this.getByURL(
         Helper.trimSuffixSlash(repositoryurl) + "/submodels/" + id,
            success_callback, error_callback);
   }

   /* AssetAdministrationShellRegistryServiceSpecification */
   public GetAllAssetAdministrationShellDescriptors(registryurl: string,
       success_callback: any, error_callback: any) {
   return this.getByURL(
      Helper.trimSuffixSlash(registryurl) + "/shell-descriptors",
         success_callback, error_callback);
   }

   /* SubmodelRegistryServiceSpecification */
   public GetAllSubmodelDescriptors(registryurl: string,
          success_callback: any, error_callback: any) {
      return this.getByURL(
         Helper.trimSuffixSlash(registryurl) + "/submodel-descriptors",
            success_callback, error_callback);
   }

   /* Helper */
   public getByURL(url: string, success_callback: any, error_callback: any) {
      var aas_data: string;
      this.ajax.getJsonPromise(url)
      .then((data) => {
          success_callback(data);
        })
        .catch((error) => {
          error_callback(error);
        })
       return aas_data;
   }
}

export class Helper {
   constructor() {}

   public static getBaseEnvironmentURL(url: string, t: types.metamodelType) {
      url = this.trimSuffixSlash(url);
      switch (t) {
      case types.metamodelType.AssetAdministrationShell:
         return this.getBaseURL(url, "shells");
         break;
      case types.metamodelType.Submodel:
         return this.getBaseURL(url, "submodels");
         break;
      default:
         return "";
      }
   }

   public static getBaseRegURL(url: string, t: types.metamodelType) {
      url = this.trimSuffixSlash(url);
      switch (t) {
      case types.metamodelType.AssetAdministrationShellRegistry:
         return this.getBaseURL(url, "shell-descriptors");
         break;
      case types.metamodelType.SubmodelRegistry:
         return this.getBaseURL(url, "submodel-descriptors");
         break;
      default:
         return "";
      }
   }

   private static getBaseURL(url: string, needle: string) {
      // find needle, such as shells
      var u = new URL(url);
      var components = u.pathname.split("/");
      var i = components.length;
      while (i >= 0) {
         if (components[i] == needle)
            break;
         i = i - 1;
      }

      if (i < 0)
         return "";

      var newurl = "";
      var j = 0;
      while (j < (i - 1)) {
         newurl += components[i] + "/";
         j = j + 1;
      }
      this.trimSuffixSlash(newurl);
      u.pathname = newurl;
      return this.trimSuffixSlash(u.href);
   }

   public static getBaseRegistryURL(url: string, t: types.metamodelType) {
      switch (t) {
      // TODO
      default:
         return "";
      }
   }

   public static getIdByURL(url :string, baseurl: string):
      util.Pair<string, types.metamodelType> {
      var u = new URL(url);
      var bu = new URL(baseurl);
      var uc = u.pathname.split("/");
      var buc = bu.pathname.split("/");
      var r = true;
      while (r) {
         if (buc.length > 0 && uc.length > 0 && (uc[0] == buc[0])) {
            uc.shift();
            buc.shift();
         }
         else
            r = false;
      }
      if (uc.length < 2)
         return new util.Pair<string, types.metamodelType>
            ("", types.metamodelType.Error);
      if (uc[0] == "shells")
         return new util.Pair<string, types.metamodelType>
            (uc[1], types.metamodelType.AssetAdministrationShell);
      if (uc[0] == "submodels")
         return new util.Pair<string, types.metamodelType>
            (uc[1], types.metamodelType.Submodel);
      return new util.Pair<string, types.metamodelType>(url,
         types.metamodelType.Error);
   }

   public static trimSuffixSlash(url: string): string {
      if (!url.endsWith("/"))
         return url;
      return url.slice(0, - 1);
   }
}
}