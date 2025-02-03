/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { util } from "./exports.js";
import { types as types } from "./exports.js";
import { interfaces as interfaces } from "./exports.js";

export module registryV3 {

   export class RegistryEnvironment {
      constructor() {
         this.assetAdministrationShellDescriptors =
            new util.NamedArray<interfaces.AssetAdministrationShellDescriptor>;
         this.submodelDescriptors = 
            new util.NamedArray<interfaces.SubmodelDescriptor>;
      }
      assetAdministrationShellDescriptors:
         types.AssetAdministrationShellDescriptorArray;
      submodelDescriptors: types.SubmodelDescriptorsArray;

      public setAssetAdministrationShellDescriptors(
            aasDescs: types.AssetAdministrationShellDescriptorArray) {
         this.assetAdministrationShellDescriptors = aasDescs;
      }
      public getAssetAdministrationShellDescriptors():
            types.AssetAdministrationShellDescriptorArray {
         return this.assetAdministrationShellDescriptors;
      }
      public addAssetAdministrationShellDescriptors(
            aasDesc: interfaces.AssetAdministrationShellDescriptor) {
         this.assetAdministrationShellDescriptors.push(aasDesc);
      }

      public setSubmodelDescriptors(submodels: types.SubmodelDescriptorsArray) {
         this.submodelDescriptors = submodels;
      }
      public getSubmodelDescriptors(): types.SubmodelDescriptorsArray {
         return this.submodelDescriptors; }
      public addSubmodelDescriptor(submodelDesc: interfaces.SubmodelDescriptor) {
         this.submodelDescriptors.push(submodelDesc);
      }
   }

}