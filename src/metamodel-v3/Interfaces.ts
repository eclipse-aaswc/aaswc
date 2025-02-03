/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { types } from "./exports.js";

export module interfaces {

export interface MultiLanguageType {
   elements: types.MultiLanguageArray;
}

export interface Key {
   type: types.KeyTypes;
   value: types.Identifier;
}

export interface Reference {
    type: types.ReferenceTypes;
    referredSemanticId: Reference;
    keys: types.KeyArray;
}

export interface HasSemantics {
   semanticId: types.Reference;
   supplementalSemanticIds: types.ReferenceArray;
   }

export interface Extension extends HasSemantics {
   name: types.NameType;
   valueType: types.DataTypeDefXsd;
   value: types.ValueDataType;
   refersTo: types.ModelReferenceArray<Referable>;
}

export interface HasExtension {
   extensions: types.ExtensionArray;
}

export interface Referable extends HasExtension {
   idShort: types.NameType;
   displayName: types.MultiLanguageNameType;
   description: types.MultiLanguageTextType;
   category: types.NameType;
}

export interface Qualifier extends HasSemantics {
   type: types.QualifierType;
   valueType: types.DataTypeDefXsd;
   value: types.ValueDataType;
   valueId: types.Reference;
   kind: types.QualifierKind;
}

export interface AdministrativeInformation {
   version: types.VersionType;
   revision: types.RevisionType;
   creator: types.Reference;
   templateId: types.Identifier;
}

export interface Qualifiable {
   qualifiers: types.QualifierArray;
}

export interface HasDataSpecification {
   dataSpecification: types.ReferenceArray;
}

export interface Identifiable extends Referable{
   administration: AdministrativeInformation;
   id: types.Identifier;
}

export interface SubmodelElement extends Referable, HasSemantics, Qualifiable,
      HasDataSpecification {
   // nothing todo
}

export interface RelationshipElement extends SubmodelElement {
   first: types.Reference;
   second: types.Reference;
}

export interface AnnotatedRelationshipElement extends RelationshipElement {
   annotations: types.DataElementArray;
}

export interface Capability extends SubmodelElement {
   // nothing todo
}

export interface SubmodelElementList<T = interfaces.SubmodelElement>
      extends SubmodelElement {
   orderedRelevant: boolean;
   semanticIdListElement: types.Reference;
   typeValueListElement: types.AasSubmodelElements;
   valueTypeListElement: types.DataTypeDefXsd;
   values: types.SubmodelElementArray<T>;
}

export interface SubmodelElementCollection extends SubmodelElement {
   values: types.SubmodelElementArray;
}

export interface Entity extends SubmodelElement {
   statements: types.SubmodelElementArray;
   entityType: types.EntityType;
   globalAssetId: types.Identifier;
   specificAssetIds: types.SpecificAssetIdArray;
}

export interface EventElement extends SubmodelElement {
   // nothing todo
}

export interface BasicEventElement extends EventElement {
   observed: types.ModelReference<Referable>;
   direction: types.Direction;
   state: types.StateOfEvent;
   messageTopic: types.MessageTopicType;
   lastUpdate: types.DateTime;
   minInterval: types.Duration;
   maxInterval: types.Duration;
}

export interface Operation extends SubmodelElement {
   inputVariables: types.OperationVariableArray;
   outputVariables: types.OperationVariableArray;
   inoutputVariables: types.OperationVariableArray;
}

export interface OperationVariable {
   value: interfaces.SubmodelElement;
}

export interface DataElement extends SubmodelElement {
   // nothing todo
}

export interface Property extends DataElement {
   valueType: types.DataTypeDefXsd;
   value: types.ValueDataType;
   valueId: types.Reference;
}

export interface MultiLanguageProperty extends DataElement {
   values: interfaces.MultiLanguageType;
   valueId: types.Reference;
}

export interface Range extends DataElement {
   valueType: types.DataTypeDefXsd;
   min: types.ValueDataType;
   max: types.ValueDataType;
}

export interface ReferenceElement extends DataElement {
   value: types.Reference;
}

export interface File extends DataElement {
   value: types.PathType;
   contentType: types.ContentType;
}

export interface Blob extends DataElement {
   value: types.BlobType;
   contentType: types.ContentType;
}

export interface SpecificAssetId extends HasSemantics {
   name: types.LabelType;
   value: types.Identifier;
   externalSubjectId: types.Reference;
}

export interface Resource {
   path: types.PathType;
   contentType: types.ContentType;
}

export interface AssetInformation {
   assetKind: types.AssetKind;
   globalAssetId: types.Identifier;
   specificAssetIds: types.SpecificAssetIdArray;
   assetType: types.Identifier;
   defaultThumbnail: Resource;
}

export interface HasKind {
   kind: types.ModellingKind;
}

export interface AssetAdministrationShell extends Identifiable,
      HasDataSpecification {
   derivedFrom: types.ModelReference<AssetAdministrationShell>;
   assetInformation: AssetInformation;
   submodels: types.ModelReferenceArray;
}

export interface Submodel extends Identifiable, HasKind, HasSemantics,
      Qualifiable, HasDataSpecification {
   submodelElements: types.SubmodelElementArray;
}

export interface ConceptDescription extends Identifiable, HasDataSpecification {
   isCaseOf: types.ReferenceArray;
}

export interface Environment {
   assetAdministrationShells: types.AssetAdministrationShellArray;
   submodels: types.SubmodelArray;
   conceptDescriptions: types.ConceptDescriptionArray;
}

/* Asset Admininstration Shell Part 2 */

export interface SecurityAttributeObject {
   type: types.SecurityTypeEnum;
   key: string;
   value: string;
}

export interface ProtocolInformation {
   href: types.LocatorType;
   endpointProtocol: types.SchemeType;
   endpointProtocolVersions: types.LabelTypeArray;
   subprotocol: types.ShortIdType;
   subprotocolBody: types.TextType;
   subprotocolBodyEncoding: types.LabelType;
   securityAttributes: types.SecurityAttributeObjectArray;
}

export interface Endpoint {
   protocolInformation: interfaces.ProtocolInformation;
   interface: types.NameType;
}

export interface Descriptor {
   description: types.MultiLanguageTextType;
   displayName: types.MultiLanguageNameType;
   extensions: types.ExtensionArray;
}

export interface SubmodelDescriptor extends Descriptor {
   administration: interfaces.AdministrativeInformation;
   endpoints: types.EndpointArray;
   idShort: types.NameType;
   id: types.Identifier;
   semanticId: types.Reference;
   supplementalSemanticIds: types.ReferenceArray;
}

export interface AssetAdministrationShellDescriptor extends Descriptor {
   administration: interfaces.AdministrativeInformation;
   assetKind: types.AssetKind;
   assetType: types.Identifier;
   endpoints: types.EndpointArray;
   globalAssetId: types.Identifier;
   idShort: types.NameType;
   id: types.Identifier;
   specificAssetIds: types.SpecificAssetIdArray;
   submodelDescriptors: types.SubmodelDescriptorsArray;
}
}
