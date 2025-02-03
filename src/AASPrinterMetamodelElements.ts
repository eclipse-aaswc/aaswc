/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { AASColors, AASHTMLElement, PrinterHtmlElements, TreeObject, interfaces,
   metamodelV3, registryV3, types, util } from "./imports.js"

class AjaxCallContext {
   context: any;
   printer: any;
}

class MethodCallObject {
   timeout: number;
   requestId: string= "";
   inputArguments: Array<any>;
   inoutputArguments : Array<any>;
}

type printNamedArrayCallback<V> = (HTMLElement: HTMLElement, obj: V,
   parent: TreeObject, type: types.metamodelType, name: string) => void;

export class AASPrinterMetamodelElements extends PrinterHtmlElements {
   valueUpdateArray : Array<any>;
   colors: AASColors;
   aasContainer: HTMLElement;

   treeRoot: any;
   parser: any;
   
   /* debug */
   URL;
   parentObj;
   object;
   retry;
   onSuccess;
   onError;
   context;
   printer;


   constructor(rootElement: HTMLElement) {
      super(rootElement);
      /* bind this pointer */
      this.printEnvironmentV3Typed = this.printEnvironmentV3Typed.bind(this);
      this.printAssetAdministrationShellV3Typed =
         this.printAssetAdministrationShellV3Typed.bind(this);
      this.printConceptDescriptionV3Typed =
         this.printConceptDescriptionV3Typed.bind(this);
      this.printSubmodelV3Typed = this.printSubmodelV3Typed.bind(this);
      this.printSubmodelElementV3Typed =
         this.printSubmodelElementV3Typed.bind(this);
      this.printSubmodelElementInheritedV3Typed =
         this.printSubmodelElementInheritedV3Typed.bind(this);
      this.printHasKindV3Typed = this.printHasKindV3Typed.bind(this);
      this.printQualifiableV3Typed = this.printQualifiableV3Typed.bind(this);
      this.printHasExtensionV3Typed = this.printHasExtensionV3Typed.bind(this);
      this.printReferableV3Typed = this.printReferableV3Typed.bind(this);
      this.printIdentifiableV3Typed = this.printIdentifiableV3Typed.bind(this);
      this.printHasDataSpecificationV3Typed =
         this.printHasDataSpecificationV3Typed.bind(this);
      this.printSpecificAssetIdV3Typed =
         this.printSpecificAssetIdV3Typed.bind(this);
      this.printKeyV3Typed = this.printKeyV3Typed.bind(this);
      this.printAdministrativeInformationV3Typed =
         this.printAdministrativeInformationV3Typed.bind(this);
      this.printMultiLanguageTypeV3Typed =
         this.printMultiLanguageTypeV3Typed.bind(this);
      this.printMultiLanguageTextTypeV3Typed =
         this.printMultiLanguageTextTypeV3Typed.bind(this);
      this.printExtensionV3Typed = this.printExtensionV3Typed.bind(this);
      this. printHasSemanticsV3Typed = this.printHasSemanticsV3Typed.bind(this);
      this.printFileV3Typed = this.printFileV3Typed.bind(this);
      this.printResourceV3Typed = this.printResourceV3Typed.bind(this);
      this.printBlobV3Typed = this.printBlobV3Typed.bind(this);
      this.printBasicEventElementV3Typed =
         this.printBasicEventElementV3Typed.bind(this);
      this.printPropertyV3Typed = this.printPropertyV3Typed.bind(this);
      this.printMultiLanguagePropertyV3Typed =
         this.printMultiLanguagePropertyV3Typed.bind(this);
      this.printReferenceElementV3Typed =
         this.printReferenceElementV3Typed.bind(this);
      this.printReferenceV3Typed = this.printReferenceV3Typed.bind(this);
      this.printSubmodelElementCollectionV3Typed =
         this.printSubmodelElementCollectionV3Typed.bind(this);
      this.printSubmodelElementListV3Typed =
         this.printSubmodelElementListV3Typed.bind(this);
      this.printRelationshipElementV3Typed =
         this.printRelationshipElementV3Typed.bind(this);
      this.printRelationshipElementV3TypedCommon =
      this.printRelationshipElementV3TypedCommon.bind(this);
      this.printAnnotatedRelationshipElementV3Typed =
         this.printAnnotatedRelationshipElementV3Typed.bind(this);
      this.printQualifierV3Typed = this.printQualifierV3Typed.bind(this);
      this.printOperationV3Typed = this.printOperationV3Typed.bind(this);
      this.printOperationVariableV3Typed =
         this.printOperationVariableV3Typed.bind(this);
      this.printCapabilityV3Typed = this.printCapabilityV3Typed.bind(this);
      this.createValueElementTyped = this.createValueElementTyped.bind(this);
      this.printGenericSubmodelElement =
         this.printGenericSubmodelElement.bind(this);
      this.printStringTyped = this.printStringTyped.bind(this);
      this.printValueTyped = this.printValueTyped.bind(this);
      /* AAS Part 2 */
      this.printRegistryEnvironmentV3Typed =
         this.printRegistryEnvironmentV3Typed.bind(this);
      this.printDescriptorV3Typed = this.printDescriptorV3Typed.bind(this);
      this.printAssetAdministrationShellDescriptorV3Typed =
         this.printAssetAdministrationShellDescriptorV3Typed.bind(this);
      this.printSubmodelDescriptorV3Typed =
         this.printSubmodelDescriptorV3Typed.bind(this);
      this.printEndpointV3Typed = this.printEndpointV3Typed.bind(this);
      this.printProtocolInformationV3Typed =
         this.printProtocolInformationV3Typed.bind(this);
      this.printSecurityAttributeObjectV3Typed =
         this.printSecurityAttributeObjectV3Typed.bind(this);
      /* Helper */

      this.isLink = this.isLink.bind(this);
      /* variables */

      this.colors = new AASColors();
      /*
       * We need to make sure the container for our async submodels is ready
       * even if our aas is not printed already
       */
      this.aasContainer = this.createBootstrapContainerFluid();

      //window.setInterval(this.timedUpdateValues, 2000);
   }

   printEnvironmentV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.Environment, treeRoot: TreeObject) {
      var HTMLObject = this.printNode(HTMLElement, treeRoot, "Environment", "",
         this.colors.submodelElementColor, true);
      this.printNamedArrayV3<metamodelV3.AssetAdministrationShell>(
         HTMLObject.container, obj.getAssetAdministrationShells() as
         util.NamedArray<metamodelV3.AssetAdministrationShell>,
         this.printAssetAdministrationShellV3Typed,
         types.metamodelType.AssetAdministrationShell, treeRoot);
      this.printNamedArrayV3<metamodelV3.Submodel>(
         HTMLObject.container, obj.getSubmodels() as
         util.NamedArray<metamodelV3.Submodel>,
         this.printSubmodelV3Typed,
         types.metamodelType.Submodel, treeRoot);
      this.printNamedArrayV3<metamodelV3.ConceptDescription>(
         HTMLObject.container, obj.getConceptDescriptions() as
         util.NamedArray<metamodelV3.ConceptDescription>,
         this.printConceptDescriptionV3Typed,
         types.metamodelType.ConceptDescription, treeRoot);
   }

   printAssetAdministrationShellV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.AssetAdministrationShell, parent: TreeObject) {
      var tree = new TreeObject(obj.getId(), parent,
         types.metamodelType.AssetAdministrationShell);
      var HTMLObject = this.printNode(HTMLElement, tree, obj.getId(), "",
         this.colors.AASColor, false);
      this.printReferenceV3Typed(HTMLObject.container,
         obj.getDerivedFrom() as metamodelV3.Reference, tree, "derivedFrom");
      this.printIdentifiableV3Typed(HTMLObject.container, obj, tree);
      this.printAssetInformationV3Typed(HTMLObject.container,
         obj.getAssetInformation() as metamodelV3.AssetInformation ,tree);
      this.printHasDataSpecificationV3Typed(HTMLObject.container, obj, tree);
      this.printNamedArrayV3<metamodelV3.Reference>(HTMLObject.container,
         obj.getSubmodels() as util.NamedArray<metamodelV3.Reference>,
         this.printReferenceV3Typed, types.metamodelType.Reference, tree);
   }

   printConceptDescriptionV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.ConceptDescription, parent: TreeObject) {
      var tree = new TreeObject(obj.getId(), parent,
         types.metamodelType.ConceptDescription);
      var HTMLObject = this.printNode(HTMLElement, tree, obj.getId(),"",
         this.colors.submodelElementColor, false);

      this.printIdentifiableV3Typed(HTMLObject.container, obj, tree);

      this.printNamedArrayV3<metamodelV3.Reference>(HTMLObject.container,
         obj.getIsCaseOf() as util.NamedArray<metamodelV3.Reference>,
         this.printReferenceV3Typed, types.metamodelType.Reference, tree);

      this.printHasDataSpecificationV3Typed(HTMLObject.container, obj, tree);
   }

   printAssetInformationV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.AssetInformation, parent: TreeObject) {
      var tree = new TreeObject("assetInformation", parent,
         types.metamodelType.AssetInformation);
      var HTMLObject = this.printNode(HTMLElement, tree, "assetInformation",
         "", this.colors.assetColor, false);

      this.printStringTyped<types.AssetKind>(HTMLObject.container,
         obj.getAssetKind(), tree, types.metamodelType.AssetKind, "assetKind");
      this.printStringTyped<types.Identifier>(HTMLObject.container,
         obj.getGlobalAssetId(), tree, types.metamodelType.Identifier,
         "globalAssetId");
      this.printStringTyped<types.Identifier>(HTMLObject.container,
         obj.getAssetType(), tree, types.metamodelType.Identifier, "assetType");
      this.printNamedArrayV3<metamodelV3.SpecificAssetId>(HTMLObject.container,
         obj.getSpecificAssetIds() as
         util.NamedArray<metamodelV3.SpecificAssetId>,
         this.printSpecificAssetIdV3Typed, types.metamodelType.SpecificAssetId,
         tree);
      this.printResourceV3Typed(HTMLObject.container, 
         obj.getDefaultTumbnail() as metamodelV3.Resource, tree,
         "defaultThumbnail");
   }

   printSubmodelV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Submodel,
      parent: TreeObject) {
      var tree = new TreeObject(obj.getId(), parent,
         types.metamodelType.Submodel);
      var HTMLObject = this.printNode(HTMLElement, tree, obj.getId(),
         "", this.colors.submodelColor, false);
      this.printHasKindV3Typed(HTMLObject.container, obj, tree);
      this.printIdentifiableV3Typed(HTMLObject.container, obj, tree);
      this.printHasSemanticsV3Typed(HTMLObject.container, obj, tree);
      this.printQualifiableV3Typed(HTMLObject.container, obj, tree);
      this.printHasDataSpecificationV3Typed(HTMLObject.container, obj, tree);

      this.printNamedArrayV3<metamodelV3.SubmodelElement>(HTMLObject.container,
         obj.getSubmodelElements() as
         util.NamedArray<metamodelV3.SubmodelElement>,
         this.printSubmodelElementV3Typed, types.metamodelType.SubmodelElement,
         tree);
   }

   printSubmodelElementV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.SubmodelElement, parent: TreeObject) {
      var smeType: types.metamodelType =
         obj.constructor.name as types.metamodelType;
      switch(smeType) {
      case types.metamodelType.Capability:
         this.printCapabilityV3Typed(HTMLElement,
            obj as metamodelV3.Capability, parent);
         break;
      case types.metamodelType.Property:
         this.printPropertyV3Typed(HTMLElement,
            obj as metamodelV3.Property, parent);
         break;
      case types.metamodelType.MultiLanguageProperty:
         this.printMultiLanguagePropertyV3Typed(HTMLElement,
            obj as metamodelV3.MultiLanguageProperty, parent);
         break;
      case types.metamodelType.Range:
         this.printRangeV3Typed(HTMLElement,
            obj as metamodelV3.Range, parent);
         break;
      case types.metamodelType.RelationshipElement:
         this.printRelationshipElementV3Typed(HTMLElement,
            obj as metamodelV3.RelationshipElement, parent);
         break;
      case types.metamodelType.AnnotatedRelationshipElement:
         this.printAnnotatedRelationshipElementV3Typed(HTMLElement,
            obj as metamodelV3.AnnotatedRelationshipElement, parent);
         break;
      case types.metamodelType.ReferenceElement:
         this.printReferenceElementV3Typed(HTMLElement,
            obj as metamodelV3.ReferenceElement, parent);
         break;
      case types.metamodelType.Entity:
         this.printEntityV3Typed(HTMLElement, obj as metamodelV3.Entity, parent);
         break;
      case types.metamodelType.Blob:
         this.printBlobV3Typed(HTMLElement, obj as metamodelV3.Blob, parent);
         break;
      case types.metamodelType.File:
         this.printFileV3Typed(HTMLElement, obj as metamodelV3.File, parent);
         break;
      case types.metamodelType.SubmodelElementList:
         this.printSubmodelElementListV3Typed(HTMLElement,
            obj as metamodelV3.SubmodelElementList, parent);
         break;
      case types.metamodelType.SubmodelElementCollection:
         this.printSubmodelElementCollectionV3Typed(HTMLElement,
            obj as metamodelV3.SubmodelElementCollection, parent);
         break;
      case types.metamodelType.BasicEventElement:
         this.printBasicEventElementV3Typed(HTMLElement,
            obj as metamodelV3.BasicEventElement, parent);
         break;
      case types.metamodelType.Operation:
         this.printOperationV3Typed(HTMLElement, obj as metamodelV3.Operation,
            parent);
         break;
      default:
         /* do nothing */
         console.log("Unhandled submodelElement found: " + smeType);
         return;
      }
   }

   printSubmodelElementInheritedV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.SubmodelElement, parent: TreeObject) {
      this.printReferableV3Typed(HTMLElement, obj, parent);
      this.printHasSemanticsV3Typed(HTMLElement, obj, parent);
      this.printQualifiableV3Typed(HTMLElement, obj, parent);
      this.printHasDataSpecificationV3Typed(HTMLElement, obj, parent);
   }

   printHasKindV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.HasKind,
      parent: TreeObject) {
      this.printStringTyped<types.ModellingKind>(HTMLElement,
         obj.getModellingKind(), parent, types.metamodelType.ModellingKind,
         "kind");
   }

   printQualifiableV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.Qualifiable, parent: TreeObject) {
      this.printNamedArrayV3<metamodelV3.Qualifier>(HTMLElement,
         obj.getQualifiers() as util.NamedArray<metamodelV3.Qualifier>,
         this.printQualifierV3Typed, types.metamodelType.Qualifier, parent,
         true);
   }

   printHasExtensionV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.HasExtension, parent: TreeObject) {
      this.printNamedArrayV3<metamodelV3.Extension>(HTMLElement,
         obj.getExtensions() as util.NamedArray<metamodelV3.Extension>,
         this.printExtensionV3Typed, types.metamodelType.Extension, parent);
   }

   printReferableV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Referable,
      parent: TreeObject) {
      this.printStringTyped<types.NameType>(HTMLElement,
         obj.getIdShort(), parent, types.metamodelType.String, "idShort");
      this.printStringTyped<types.NameType>(HTMLElement,
         obj.getCategory(), parent, types.metamodelType.String, "category");
      this.printMultiLanguageTypeV3Typed(HTMLElement, obj.getDisplayName() as
         metamodelV3.MultiLanguageType, parent);
      this.printMultiLanguageTypeV3Typed(HTMLElement, obj.getDescription() as
         metamodelV3.MultiLanguageType, parent);
      this.printHasExtensionV3Typed(HTMLElement, obj, parent);
   }

   printIdentifiableV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.Identifable, parent: TreeObject) {
      this.printStringTyped<types.Identifier>(HTMLElement,
         obj.getId(), parent, types.metamodelType.String, "id");
      this.printReferableV3Typed(HTMLElement, obj, parent);
      this.printAdministrativeInformationV3Typed(HTMLElement,
         obj.getAdministration() as metamodelV3.AdministrativeInformation,
         parent);
   }

   printHasDataSpecificationV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.HasDataSpecification, parent: TreeObject) {
      this.printNamedArrayV3<metamodelV3.Reference>(HTMLElement,
         obj.getDataSpecification() as util.NamedArray<metamodelV3.Reference>,
         this.printReferenceV3Typed, types.metamodelType.Reference, parent);
   }

   printSpecificAssetIdV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.SpecificAssetId, parent: TreeObject) {
      var tree = new TreeObject(obj.getName(), parent,
         types.metamodelType.SpecificAssetId);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getName(), "specificAssetId", this.colors.submodelElementColor,
         false);

      this.printStringTyped<types.LabelType>(HTMLObject.container,
         obj.getName(), tree, types.metamodelType.String, "name");
      this.printStringTyped<types.Identifier>(HTMLObject.container,
         obj.getValue(), tree, types.metamodelType.Identifier, "value");
      this.printReferenceV3Typed(HTMLObject.container,
         obj.getExternalSubjectId() as metamodelV3.Reference, tree,
         "externalSubjectId");
   }

   printKeyV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Key,
         parent: TreeObject) {
      var tree = new TreeObject(obj.getValue(), parent, types.metamodelType.Key);
      var content = [];
      var img = this.iconByType(types.metamodelType.Key);
      content.push(img);
      content.push(document.createTextNode("Key type"));
      content.push(document.createTextNode(obj.getType()));
      content.push(document.createTextNode(obj.getValue()));
      this.createRowWithContent(HTMLElement,
                                new Array("col-auto", "col-2", "col-2", "col"),
                                content,
                                true);
   }

   printAdministrativeInformationV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.AdministrativeInformation, parent: TreeObject) {
      if (!obj)
         return;
      var tree = new TreeObject("", parent,
         types.metamodelType.AdministrativeInformation);
      var HTMLObject = this.printNode(HTMLElement, tree,
         "", "Administrative Information", this.colors.submodelElementColor,
         false);
      
      this.printStringTyped<types.VersionType>(HTMLObject.container,
         obj.getVersion(), tree, types.metamodelType.String, "version");
      this.printStringTyped<types.VersionType>(HTMLObject.container,
         obj.getRevision(), tree, types.metamodelType.String, "revision");
      this.printReferenceV3Typed(HTMLObject.container, obj.getCreator() as
         metamodelV3.Reference, tree, "creator");
      this.printStringTyped<types.Identifier>(HTMLObject.container,
            obj.getTemplateId(), tree, types.metamodelType.String, "templateId");
   }

   printMultiLanguageTypeV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.MultiLanguageType, parent: TreeObject) {
      if (!obj)
         return;
      var tree = new TreeObject(obj.getName(), parent,
         types.metamodelType.MultiLanguageType);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getName(), "", this.colors.submodelElementColor, false);
      var iter: IterableIterator<types.MultiLangageEntry> =
         obj.getElements().values();
      var iterResult = iter.next();
      while (!iterResult.done) {
         this.printMultiLanguageTextTypeV3Typed(HTMLObject.container,
            iterResult.value, tree)
         iterResult = iter.next();
      }
   }

   printMultiLanguageTextTypeV3Typed(HTMLElement: HTMLElement,
         p: types.MultiLangageEntry, parent: TreeObject) {
         var tree = new TreeObject(p.getFirst(), parent,
                     types.metamodelType.MultiLanguageTextType);
         var img = this.iconByType(types.metamodelType.MultiLanguageTextType);
         var content = [
            img,
            document.createTextNode(p.getFirst()),
            document.createTextNode(p.getSecond()),
            ];

         this.createRowWithContent(HTMLElement,
                                   new Array("col-auto","col-2", "col"),
                                   content,
                                   true);
   }

   printEntityV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Entity,
         parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.Entity);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "Entity",
         this.colors.submodelElementColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);

      this.printStringTyped<types.EntityType>(HTMLObject.container,
         obj.getEntityType(), tree, types.metamodelType.EntityType,
         "entityType");
      this.printStringTyped<types.Identifier>(HTMLObject.container,
         obj.getGlobalAssetId(), tree, types.metamodelType.Identifier,
         "globalAssetId");
      this.printNamedArrayV3<metamodelV3.SpecificAssetId>(HTMLObject.container,
         obj.getSpecifcAssetIds() as
         util.NamedArray<metamodelV3.SpecificAssetId>,
         this.printSpecificAssetIdV3Typed, types.metamodelType.SpecificAssetId,
         tree);
      this.printNamedArrayV3(HTMLObject.container, obj.getStatements(),
         this.printSubmodelElementV3Typed, types.metamodelType.SubmodelElement,
         tree);
   }

   printExtensionV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Extension,
         parent: TreeObject) {
      var tree = new TreeObject(obj.getName(), parent, types.metamodelType.Extension);
      var HTMLObject = this.printNode(HTMLElement, tree, obj.getName(),
         "Extension", this.colors.qualifierColor, false);

      this.printStringTyped<types.NameType>(HTMLObject.container,
         obj.getName(), tree, types.metamodelType.String, "name");
      this.printStringTyped<types.DataTypeDefXsd>(HTMLObject.container,
         obj.getValueType(), tree, types.metamodelType.DataTypeDefXsd,
         "valueType");
      this.printStringTyped<types.ValueDataType>(HTMLObject.container,
         obj.getValue(), tree, types.metamodelType.ValueDataType, "value");

      this.printHasSemanticsV3Typed(HTMLObject.container, obj, tree);

      this.printNamedArrayV3<metamodelV3.Reference>(HTMLObject.container,
         obj.getRefersTo() as util.NamedArray<metamodelV3.Reference>,
         this.printReferenceV3Typed, types.metamodelType.Reference, tree, true);
   }

   printHasSemanticsV3Typed(HTMLElement: HTMLElement,
      obj: metamodelV3.HasSemantics, parent: TreeObject) {

      this.printReferenceV3Typed(HTMLElement, obj.getSemanticId() as
         metamodelV3.Reference, parent, "semanticId");
      this.printNamedArrayV3<metamodelV3.Reference>(HTMLElement,
         obj.getSupplementalSemanticIds() as
         util.NamedArray<metamodelV3.Reference>,
         this.printReferenceV3Typed, types.metamodelType.Reference, parent,
         false);
   }

   printFileV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.File,
         parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.File);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "File",
         this.colors.submodelElementColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);

      this.printStringTyped<types.PathType>(HTMLObject.container,
         obj.getValue(), tree, types.metamodelType.String, "value");
      this.printStringTyped<types.ContentType>(HTMLObject.container,
         obj.getContentType(), tree, types.metamodelType.String, "contentType");
   }

   printResourceV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Resource,
         parent: TreeObject, name: string) {
      if (!obj)
         return;
      var tree = new TreeObject(name, parent, types.metamodelType.Resource);
      var HTMLObject = this.printNode(HTMLElement, tree, name,
         "", this.colors.submodelElementColor, false);
         this.printStringTyped<types.PathType>(HTMLObject.container,
            obj.getPath(), tree, types.metamodelType.String, "path");
         this.printStringTyped<types.ContentType>(HTMLObject.container,
            obj.getContentType(), tree, types.metamodelType.String, 
            "contentType");
   }

   printBlobV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Blob,
         parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.Blob);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "Blob",
         this.colors.submodelElementColor, false);

         this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj,
            tree);

         this.printStringTyped<types.BlobType>(HTMLObject.container,
            obj.getValue(), tree, types.metamodelType.String, "value");
         this.printStringTyped<types.ContentType>(HTMLObject.container,
            obj.getContentType(), tree, types.metamodelType.String, 
            "contentType");
   }

   printPropertyV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Property,
         parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.Property);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "Property",
         this.colors.submodelElementColor, false);

         this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj,
            tree);

         this.printStringTyped<types.DataTypeDefXsd>(HTMLObject.container,
            obj.getValueType(), tree, types.metamodelType.DataTypeDefXsd, 
            "valueType");
         this.printStringTyped<types.ValueDataType>(HTMLObject.container,
            obj.getValue(), tree, types.metamodelType.ValueDataType, "value");
         this.printReferenceV3Typed(HTMLObject.container,
            obj.getValueId() as metamodelV3.Reference, tree, "valueId");
   }

   printMultiLanguagePropertyV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.MultiLanguageProperty, parent: TreeObject) {
   var tree = new TreeObject(obj.getIdShort(), parent,
      types.metamodelType.MultiLanguageProperty);
   var HTMLObject = this.printNode(HTMLElement, tree,
      obj.getIdShort(), "MultiLanguageProperty",
      this.colors.submodelElementColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);
      this.printMultiLanguageTypeV3Typed(HTMLObject.container, obj.getValues() as
         metamodelV3.MultiLanguageType, tree);
      this.printReferenceV3Typed(HTMLObject.container,
         obj.getValueId() as metamodelV3.Reference, tree, "valueId");
   }

   printRangeV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Range,
         parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.Range);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "Range",
         this.colors.submodelElementColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);

      this.printStringTyped<types.DataTypeDefXsd>(HTMLObject.container,
         obj.getValueType(), tree, types.metamodelType.DataTypeDefXsd,
         "valueType");
      this.printStringTyped<types.ValueDataType>(HTMLObject.container,
         obj.getMin(), tree, types.metamodelType.ValueDataType, "min");
      this.printStringTyped<types.ValueDataType>(HTMLObject.container,
         obj.getMax(), tree, types.metamodelType.ValueDataType, "max");
   }

   printReferenceElementV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.ReferenceElement, parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.ReferenceElement);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "ReferenceElement",
         this.colors.submodelElementColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);

      this.printReferenceV3Typed(HTMLObject.container,
         obj.getValue() as metamodelV3.Reference, tree, "value");
   }

   printReferenceV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Reference,
      parent: TreeObject, name: string) {
      if (!obj)
         return;
      var tree = new TreeObject("Reference", parent,
         types.metamodelType.Reference);
      var HTMLObject = this.printNode(HTMLElement, tree, name,
         "Reference", this.colors.referenceColor, false);

      this.printStringTyped<types.ReferenceTypes>(HTMLObject.container,
         obj.getType(), tree, types.metamodelType.ReferenceType, "type");

      this.printReferenceV3Typed(HTMLObject.container,
         obj.getRefferedSemanticId() as metamodelV3.Reference, tree,
         "refferedSemanticId");

      this.printNamedArrayV3<metamodelV3.Key>(HTMLObject.container,
         obj.getKeys() as util.NamedArray<metamodelV3.Key>,
         this.printKeyV3Typed, types.metamodelType.Key, tree, true);
   }

   printBasicEventElementV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.BasicEventElement, parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.BasicEventElement);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "BasicEventElement",
         this.colors.eventColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);
      this.printReferenceV3Typed(HTMLObject.container,
         obj.getObserved() as metamodelV3.Reference, tree, "observed");
      this.printStringTyped<types.Direction>(HTMLObject.container,
         obj.getDirection(), tree, types.metamodelType.Direction, "direction");
      this.printStringTyped<types.StateOfEvent>(HTMLObject.container,
         obj.getState(), tree, types.metamodelType.StateOfEvent, "state");
      this.printStringTyped<types.MessageTopicType>(HTMLObject.container,
         obj.getMessageTopic(), tree, types.metamodelType.String, 
         "messageTopic");
      this.printReferenceV3Typed(HTMLObject.container,
         obj.getMessageBroker() as metamodelV3.Reference, tree,
         "messageBroker");
      this.printStringTyped<types.DateTime>(HTMLObject.container,
         obj.getLastUpdate(), tree, types.metamodelType.String, "lastUpdate");
      this.printStringTyped<types.Duration>(HTMLObject.container,
         obj.getMinInterVal(), tree, types.metamodelType.String, "minInterval");
      this.printStringTyped<types.Duration>(HTMLObject.container,
         obj.getMaxInterVal(), tree, types.metamodelType.String, "maxInterval");
   }

   printSubmodelElementCollectionV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.SubmodelElementCollection, parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.SubmodelElementCollection);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "SubmodelElementCollection",
         this.colors.submodelElementColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);

      this.printNamedArrayV3(HTMLObject.container, obj.getValues(),
         this.printSubmodelElementV3Typed, types.metamodelType.SubmodelElement,
         tree);
   }

   printSubmodelElementListV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.SubmodelElementList, parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.SubmodelElementList);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "SubmodelElementList",
         this.colors.submodelElementColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);

      this.printStringTyped<boolean>(HTMLObject.container,
         obj.getOrderRelevant(), tree, types.metamodelType.String,
         "orderRelevant");
      this.printReferenceV3Typed(HTMLObject.container,
         obj.getSemanticIdListElement() as metamodelV3.Reference, tree,
         "semanticIdListElement");
      this.printStringTyped<types.AasSubmodelElements>(
         HTMLObject.container, obj.getTypeValueListElement(),
         tree, types.metamodelType.AasSubmodelElements, "typeValueListElement");
      this.printStringTyped<types.DataTypeDefXsd>(
         HTMLObject.container, obj.getValueTypeListElement(),
         tree, types.metamodelType.DataTypeDefXsd, "valueTypeListElement");

      this.printNamedArrayV3(HTMLObject.container, obj.getValues(),
         this.printSubmodelElementV3Typed, types.metamodelType.SubmodelElement,
         tree);
   }

   printRelationshipElementV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.RelationshipElement, parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.RelationshipElement);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "RelationshipElement",
         this.colors.submodelElementColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);
      this.printRelationshipElementV3TypedCommon(HTMLObject.container, obj, tree);

   }

   printRelationshipElementV3TypedCommon(HTMLElement: HTMLElement,
         obj: metamodelV3.RelationshipElement, parent: TreeObject) {
      this.printReferenceV3Typed(HTMLElement,
         obj.getFirst() as metamodelV3.Reference, parent, "first");
      this.printReferenceV3Typed(HTMLElement,
         obj.getSecond() as metamodelV3.Reference, parent, "second",);
   }

   printAnnotatedRelationshipElementV3Typed( HTMLElement: HTMLElement,
            obj: metamodelV3.AnnotatedRelationshipElement, parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.AnnotatedRelationshipElement);
      var HTMLObject = this.printNode(HTMLElement, tree, obj.getIdShort(),
         "AnnotatedRelationshipElement", this.colors.submodelElementColor,
         false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);
      this.printRelationshipElementV3TypedCommon(HTMLObject.container, obj,
         tree);

      this.printNamedArrayV3(HTMLObject.container, obj.getAnnotations(),
         this.printSubmodelElementV3Typed, types.metamodelType.DataElement,
         tree);
   }

   printQualifierV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Qualifier,
         parent: TreeObject) {
      var tree = new TreeObject("Qualifier", parent,
         types.metamodelType.Qualifier);
      var HTMLObject = this.printNode(HTMLElement, tree, 
         obj.getType(), "Qualifier", this.colors.qualifierColor, false);
      this.printHasSemanticsV3Typed(HTMLObject.container, obj, tree);
      this.printStringTyped<types.QualifierKind>(HTMLObject.container,
         obj.getKind(), tree, types.metamodelType.QualifierKind, "kind");
      this.printStringTyped<types.QualifierType>(HTMLObject.container,
         obj.getType(), tree, types.metamodelType.String, "type");
      this.printStringTyped<types.DataTypeDefXsd>(HTMLObject.container,
         obj.getValueType(), tree, types.metamodelType.DataTypeDefXsd, 
         "valueType");
      this.printStringTyped<types.ValueDataType>(HTMLObject.container,
         obj.getValue(), tree, types.metamodelType.ValueDataType, "value");
      this.printReferenceV3Typed(HTMLObject.container, obj.getValueId() as
         metamodelV3.Reference, tree, "valueId");
   }

   printOperationV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Operation,
         parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.Operation);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "Operation",
         this.colors.operationColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);

      this.printNamedArrayV3(HTMLObject.container, obj.getInputVariables(),
         this.printOperationVariableV3Typed,
         types.metamodelType.OperationVariable, tree);
      this.printNamedArrayV3(HTMLObject.container, obj.getOutputVariables(),
         this.printOperationVariableV3Typed,
         types.metamodelType.OperationVariable, tree);
      this.printNamedArrayV3(HTMLObject.container, obj.getInOutputVariables(),
         this.printOperationVariableV3Typed,
         types.metamodelType.OperationVariable, tree);
   }

   printOperationVariableV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.OperationVariable, parent: TreeObject, name: string,
         type: types.metamodelType) {
      var tree = new TreeObject(name, parent,
         types.metamodelType.OperationVariable);
      this.printSubmodelElementV3Typed(HTMLElement,
         obj.getValue() as metamodelV3.SubmodelElement, tree);
   }

   printCapabilityV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.Capability, parent: TreeObject) {
      var tree = new TreeObject(obj.getIdShort(), parent,
         types.metamodelType.Capability);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getIdShort(), "Capability",
         this.colors.submodelElementColor, false);

      this.printSubmodelElementInheritedV3Typed(HTMLObject.container, obj, tree);
      // nothing todo
   }

   createValueElementTyped<T = string>(type: types.metamodelType, value: T,
         valueName: string) {
      var bodyElement = null;
      // TODO: Category
      bodyElement = document.createTextNode(value as string);
      return bodyElement;
   }

   printGenericSubmodelElement(HTMLElement, object, name, titlename,
         color = "") {
      if (color == "")
         color = this.colors.submodelElementColor;
      return this.printNode(HTMLElement, object, name, titlename,
            color, false);
   }

   printStringTyped<T = string>(HTMLElement, obj: T, parent: TreeObject,
      type: types.metamodelType, valueName: string) {
      if (!obj)
         return;
      this.printValueTyped<T>(HTMLElement, obj, valueName, type, parent);
   }

   printValueTyped<T = string>(HTMLElement: HTMLElement, value: T,
         valueName: string, type: types.metamodelType, parent: TreeObject) {
      var tree = new TreeObject(valueName, parent, type);
      var bodyElement = this.createValueElementTyped<T>(type, value, valueName);
      var img = this.iconByType(type);
      var content = [
         img,
         document.createTextNode(valueName),
         bodyElement,
         ];
      this.createRowWithContent(HTMLElement,
                                new Array("col-auto","col-2", "col"),
                                content,
                                true);

   }

   printRegistryEnvironmentV3Typed(HTMLElement,
         registryEnv: registryV3.RegistryEnvironment, parent: TreeObject): void {
      if (registryEnv.getAssetAdministrationShellDescriptors().length != 0) {
         var tree = new TreeObject("Asset Administration Shell Registry",
            parent, types.metamodelType.AssetAdministrationShellRegistry);
         var HTMLObjectAASReg = this.printNode(HTMLElement, tree, "",
            "Asset Administration Shell Registry", this.colors.AASColor, true);
         this.printNamedArrayV3<
            interfaces.AssetAdministrationShellDescriptor>(
            HTMLObjectAASReg.container,
            registryEnv.getAssetAdministrationShellDescriptors(),
            this.printAssetAdministrationShellDescriptorV3Typed,
            types.metamodelType.AssetAdministrationShellDescriptor, tree);
      }
      if (registryEnv.getSubmodelDescriptors().length != 0) {
         var tree = new TreeObject("Submodel Registry", parent,
            types.metamodelType.SubmodelRegistry);
         var HTMLObjectSMReg = this.printNode(HTMLElement,
            tree,"", 
            "Submodel Registry", this.colors.AASColor,
            true);
         this.printNamedArrayV3<
            interfaces.SubmodelDescriptor>(
            HTMLObjectSMReg.container,
            registryEnv.getSubmodelDescriptors(),
            this.printSubmodelDescriptorV3Typed,
            types.metamodelType.SubmodelDescriptor, tree);
      }
      }

   printNamedArrayV3<T>(HTMLElement: any, obj: util.NamedArray<T>, 
      callback: printNamedArrayCallback<T>, type: types.metamodelType,
      parent: TreeObject, skipPrint = false) {
      if (obj.length < 1)
         return;
      var HTMLObject: AASHTMLElement;
      var HTMLContainer: HTMLElement;
      var p = parent;
      if (!skipPrint) {
         p  = new TreeObject(obj.getName(), parent, types.metamodelType.Array);
         HTMLObject = this.printNode(HTMLElement, p, obj.getName(), "Array",
            this.colors.submodelColor, true);
         HTMLContainer = HTMLObject.container;
      }
      else
         HTMLContainer = HTMLElement;

      var iter: IterableIterator<T> = obj.values();
      var iterResult = iter.next();
      while(!iterResult.done) {
         var e: T = iterResult.value;
         callback(HTMLContainer, e, p, type, "");
         iterResult = iter.next();
      }
   }

   printDescriptorV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.Descriptor, parent: TreeObject) {
      this.printMultiLanguageTypeV3Typed(HTMLElement, obj.getDescription() as
         metamodelV3.MultiLanguageType, parent);
      this.printMultiLanguageTypeV3Typed(HTMLElement, obj.getDisplayName() as
         metamodelV3.MultiLanguageType, parent);
      this.printNamedArrayV3(HTMLElement, obj.getExtensions(),
         this.printExtensionV3Typed, types.metamodelType.Extension, parent);
   }

   printAssetAdministrationShellDescriptorV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.AssetAdministrationShellDescriptor,
         parent: TreeObject) {
      var tree = new TreeObject(obj.getId(), parent,
         types.metamodelType.AssetAdministrationShellDescriptor);
      var HTMLObject = this.printNode(HTMLElement, tree, obj.getId(),
         "", this.colors.submodelElementColor, false);

      this.printStringTyped<types.Identifier>(HTMLObject.container,
         obj.getId(), tree, types.metamodelType.Identifier, "id");
      this.printStringTyped<types.NameType>(HTMLObject.container,
         obj.getIdShort(), tree, types.metamodelType.String, "idShort");
      this.printStringTyped<types.AssetKind>(HTMLObject.container,
         obj.getAssetKind(), tree, types.metamodelType.AssetKind, "assetKind");
      this.printStringTyped<types.Identifier>(HTMLObject.container,
         obj.getAssetType(), tree, types.metamodelType.Identifier, "assetType");
      this.printStringTyped<types.Identifier>(HTMLObject.container,
         obj.getGlobalAssetId(), tree, types.metamodelType.Identifier, 
         "globalAssetId");
      this.printDescriptorV3Typed(HTMLObject.container, obj, tree);

      this.printAdministrativeInformationV3Typed(HTMLObject.container,
         obj.getAdministration() as metamodelV3.AdministrativeInformation,
         tree);

      this.printNamedArrayV3<metamodelV3.SpecificAssetId>(HTMLObject.container,
         obj.getSpecificAssetIds() as
         util.NamedArray<metamodelV3.SpecificAssetId>,
         this.printSpecificAssetIdV3Typed, types.metamodelType.SpecificAssetId,
         tree);

      this.printNamedArrayV3<metamodelV3.Endpoint>(HTMLObject.container,
         obj.getEndpoints() as util.NamedArray<metamodelV3.Endpoint>,
         this.printEndpointV3Typed, types.metamodelType.Endpoint, tree);

      this.printNamedArrayV3<metamodelV3.SubmodelDescriptor>(
         HTMLObject.container, obj.getSubmodelDescriptors() as
         util.NamedArray<metamodelV3.SubmodelDescriptor>,
         this.printSubmodelDescriptorV3Typed,
         types.metamodelType.SubmodelDescriptor, tree);


   }

   printSubmodelDescriptorV3Typed(HTMLElement: HTMLElement,
      obj: metamodelV3.SubmodelDescriptor, parent: TreeObject) {
      var tree = new TreeObject(obj.getId(), parent,
         types.metamodelType.SubmodelDescriptor);
      var HTMLObject = this.printNode(HTMLElement, tree, obj.getId(),
         "", this.colors.submodelElementColor, false);

      this.printStringTyped<types.Identifier>(HTMLObject.container,
         obj.getId(), tree, types.metamodelType.Identifier, "id");
      this.printStringTyped<types.NameType>(HTMLObject.container,
         obj.getIdShort(), tree, types.metamodelType.String, "idShort");
      this.printReferenceV3Typed(HTMLObject.container, obj.getSemanticId() as
         metamodelV3.Reference, tree, "semanticId");
      this.printDescriptorV3Typed(HTMLObject.container, obj, tree);

      this.printNamedArrayV3<metamodelV3.Reference>(HTMLObject.container,
         obj.getSupplementalSematicIds() as 
         util.NamedArray<metamodelV3.Reference>,
         this.printReferenceV3Typed, types.metamodelType.Endpoint, tree);

      this.printAdministrativeInformationV3Typed(HTMLObject.container,
         obj.getAdministration() as metamodelV3.AdministrativeInformation,
         tree);


      this.printNamedArrayV3<metamodelV3.Endpoint>(HTMLObject.container,
         obj.getEndpoints() as util.NamedArray<metamodelV3.Endpoint>,
         this.printEndpointV3Typed, types.metamodelType.Endpoint, tree);
   }

   printEndpointV3Typed(HTMLElement: HTMLElement, obj: metamodelV3.Endpoint,
         parent: TreeObject) {
      var tree = new TreeObject(obj.getInterface(), parent,
         types.metamodelType.Endpoint);
      var HTMLObject = this.printNode(HTMLElement, tree,
         obj.getInterface(), "", this.colors.referenceColor, false);

      this.printStringTyped<types.NameType>(HTMLObject.container,
         obj.getInterface(), tree, types.metamodelType.String, "Interface");

      this.printProtocolInformationV3Typed(HTMLObject.container,
         obj.getProtocolInformation() as metamodelV3.ProtocolInformation,
         tree);
   }

   printProtocolInformationV3Typed(HTMLElement: HTMLElement,
        obj: metamodelV3.ProtocolInformation, parent: TreeObject) {
      var tree = new TreeObject(obj.getHref(), parent,
         types.metamodelType.ProtocolInformation);
      var HTMLObject = this.printNode(HTMLElement, tree,
         "", "protocolInformation", this.colors.submodelElementColor, false);

      this.printStringTyped<types.LocatorType>(HTMLObject.container,
         obj.getHref(), tree, types.metamodelType.String, "href");
      this.printStringTyped<types.SchemeType>(HTMLObject.container,
         obj.getEndpointProtocol(), tree, types.metamodelType.String, 
         "endpointProtocol");
      this.printNamedArrayV3<types.LabelType>(HTMLObject.container,
         obj.getEndpointProtocolVersions() as util.NamedArray<types.LabelType>,
         this.printStringTyped, types.metamodelType.String, tree, true);
      this.printStringTyped<types.ShortIdType>(HTMLObject.container,
         obj.getSubprotocol(), tree, types.metamodelType.String, "subprotocol");
      this.printStringTyped<types.TextType>(HTMLObject.container,
         obj.getSubprotocolBody(), tree, types.metamodelType.String,
         "subprotocolBodyEncoding");
      this.printStringTyped<types.LabelType>(HTMLObject.container,
         obj.getSubprotocolBodyEncoding(), tree, types.metamodelType.String, 
         "subprotocolBodyEncoding");
      this.printNamedArrayV3<metamodelV3.SecurityAttributeObject>(
         HTMLObject.container, obj.getSecurityAttributes() as util.NamedArray<
         metamodelV3.SecurityAttributeObject>,
         this.printSecurityAttributeObjectV3Typed,
         types.metamodelType.SecurityAttributeObject, tree, true);

   }

   printSecurityAttributeObjectV3Typed(HTMLElement: HTMLElement,
         obj: metamodelV3.SecurityAttributeObject, parent: TreeObject) {
      var tree = new TreeObject(obj.getKey(), parent,
         types.metamodelType.SecurityAttributeObject);
      var HTMLObject = this.printNode(HTMLElement, tree, obj.getKey(), "",
          this.colors.qualifierColor, false);

      this.printStringTyped<types.SecurityTypeEnum>(HTMLObject.container,
         obj.getType(), tree, types.metamodelType.String,  "type");
      this.printStringTyped<string>(HTMLObject.container, obj.getKey(),
         tree, types.metamodelType.String, "key");
      this.printStringTyped<string>(HTMLObject.container, obj.getValue(),
         tree, types.metamodelType.String, "value");
  }

   isLink(element) {
      if (typeof(element.tData) != "string")
         return false;
      var url: URL = new URL("http://...");
      try {
         url = new URL(element.tData);
      }
      catch (_) {
         return false;
      }
      return true;
   }

}
