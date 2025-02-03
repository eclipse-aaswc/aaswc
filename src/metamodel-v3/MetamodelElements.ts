/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { util } from "./exports.js";
import { types as types } from "./exports.js";
import { interfaces as interfaces } from "./exports.js";

export module metamodelV3 {

   export class Typed {
      constructor(type: types.metamodelType) {
         this.type = type;
      }

      private type: types.metamodelType;
      public getMetamodelType(): types.metamodelType { return this.type; }
   }

   export class Named {
      constructor() {}
      name: string;

      public setName(name: string) { this.name = name; }
      public getName(): string { return this.name; }

   }

   export class MultiLanguageType extends Named
         implements interfaces.MultiLanguageType {
      constructor() {
         super();
         this.elements = new util.NamedArray<types.MultiLangageEntry>;
      }
      elements: types.MultiLanguageArray;

      public getElements(): types.MultiLanguageArray { return this.elements; }
      public getElement(language: string): types.MultiLangageEntry {
         var iter: IterableIterator<types.MultiLangageEntry> =
            this.elements.values();
         var iterResult = iter.next();
         while(!iterResult.done) {
            var mle: types.MultiLangageEntry = iterResult.value;
            if (mle.getFirst() == language)
               return mle;
            iterResult = iter.next();
         }
         return new util.Pair<string, string>("", "");
      }

      public setElements(mla: types.MultiLanguageArray) { this.elements = mla; }
      public addElement(e: types.MultiLangageEntry) { this.elements.push(e); }
   }

   export class Key implements interfaces.Key {
      constructor(type: types.KeyTypes, value: types.Identifier) {
         this.type = type;
         this.value = value;
      }

      type: types.KeyTypes;
      value: types.Identifier;

      public getType(): types.KeyTypes { return this.type; }
      public getValue(): types.Identifier { return this.value; }
   }

   export class Reference
      implements interfaces.Reference {
      constructor(type: types.ReferenceTypes, keys: types.KeyArray) { 
         this.keys = keys;
         this.type = type;
      }
      type: types.ReferenceTypes;
      referredSemanticId: interfaces.Reference;
      keys: types.KeyArray;

      public getType(): types.ReferenceTypes { return this.type; }

      public setRefferedSemanticId(ref: interfaces.Reference) {
         this.referredSemanticId = ref;
      }
      public getRefferedSemanticId(): interfaces.Reference {
         return this.referredSemanticId;
      }

      public getKeys(): types.KeyArray { return this.keys; }
      public setKeys(keys: types.KeyArray) { this.keys = keys; }
      public addKey(k: Key) { this.keys.push(k); }
   }

   export abstract class HasDataSpecification
         implements interfaces.HasDataSpecification {
      constructor() {
         this.dataSpecification = new util.NamedArray<metamodelV3.Reference>;
      }
      dataSpecification: types.ReferenceArray;

      getDataSpecification(): types.ReferenceArray {
         return this.dataSpecification;
      }
      setDataspecification(ds: types.ReferenceArray) {
         this.dataSpecification = ds;
      }
      addDataspecification(ds: types.Reference) {
         this.dataSpecification.push(ds);
      }
   }

   export abstract class HasExtension implements interfaces.HasExtension {
      constructor() {
         this.extensions = new util.NamedArray<metamodelV3.Extension>;
      }
      extensions: types.ExtensionArray;
      public setExtensions(ext: types.ExtensionArray) { this.extensions = ext; }
      public getExtensions() { return this.extensions; }
      public addExtension(e: interfaces.Extension ) { this.extensions.push(e); }
   }

   export abstract class HasExtensionExt extends HasDataSpecification
      implements interfaces.HasExtension {
      constructor() { 
         super();
         this.extensions = new util.NamedArray<metamodelV3.Extension>;
      }
      extensions: types.ExtensionArray;
      public setExtensions(ext: types.ExtensionArray) { this.extensions = ext; }
      public getExtensions() { return this.extensions; }
      public addExtension(e: interfaces.Extension ) { this.extensions.push(e); }
   }

   export abstract class Referable extends HasExtension
         implements interfaces.Referable {
      constructor(idShort: types.NameType = "") {
         super();
         this.idShort = idShort;
      }
      idShort: types.NameType;
      displayName: types.MultiLanguageNameType;
      description: types.MultiLanguageTextType;
      category: types.NameType;

      public setIdShort(idShort: types.NameType) { this.idShort = idShort; }
      public getIdShort(): types.NameType { return this.idShort; }

      public setDisplayName(displayName: types.MultiLanguageNameType) {
         this.displayName = displayName; 
      }
      public getDisplayName(): types.MultiLanguageNameType {
         return this.displayName;
      }

      public setDescription(description: types.MultiLanguageTextType) {
         this.description = description; 
      }
      public getDescription(): types.MultiLanguageTextType { 
         return this.description;
      }

      public setCategory(category: types.NameType) { this.category = category; }
      public getCategory(): types.NameType { return this.category; }
   }

   export abstract class ReferableExt extends HasExtensionExt
         implements interfaces.Referable {
      constructor(idShort: types.NameType = "") {
         super();
         this.idShort = idShort;
      }
      idShort: types.NameType;
      displayName: types.MultiLanguageNameType;
      description: types.MultiLanguageTextType;
      category: types.NameType;

      public setIdShort(idShort: types.NameType) { this.idShort = idShort; }
      public getIdShort(): types.NameType { return this.idShort; }

      public setDisplayName(displayName: types.MultiLanguageNameType) {
         this.displayName = displayName; 
      }
      public getDisplayName(): types.MultiLanguageNameType {
         return this.displayName;
      }

      public setDescription(description: types.MultiLanguageTextType) {
         this.description = description; 
      }
      public getDescription(): types.MultiLanguageTextType { 
         return this.description;
      }

      public setCategory(category: types.NameType) { this.category = category; }
      public getCategory(): types.NameType { return this.category; }
   }

   export abstract class Identifable extends Referable
         implements interfaces.Identifiable {
      constructor(id: types.Identifier) {
         super();
         this.id = id;
      }
      administration: interfaces.AdministrativeInformation;
      id: types.Identifier;
      
      public getAdministration(): interfaces.AdministrativeInformation {
         return this.administration;
      }
      public setAdministration(a: interfaces.AdministrativeInformation) {
         this.administration = a;
      }

      public getId(): types.Identifier { return this.id; }
   }

   export abstract class IdentifableExt extends ReferableExt
         implements interfaces.Identifiable {
      constructor(id: types.Identifier) {
         super();
         this.id = id;
      }
      administration: interfaces.AdministrativeInformation;
      id: types.Identifier;
      
      public getAdministration(): interfaces.AdministrativeInformation {
         return this.administration;
      }
      public setAdministration(a: interfaces.AdministrativeInformation) {
         this.administration = a;
      }

      public getId(): types.Identifier { return this.id; }
      public setId(id: types.Identifier) { this.id = id; }
   }

   export abstract class HasDataSpecificationCD extends Identifable
         implements interfaces.HasDataSpecification {
      constructor(id: types.Identifier) {
         super(id);
         this.dataSpecification = new util.NamedArray<metamodelV3.Reference>;
      }
      dataSpecification: types.ReferenceArray;

      getDataSpecification(): types.ReferenceArray {
         return this.dataSpecification;
      }
      setDataspecification(ds: types.ReferenceArray) {
         this.dataSpecification = ds;
      }
      addDataspecification(ds: types.Reference) {
         this.dataSpecification.push(ds);
      }
   }

   export abstract class HasSemantics implements interfaces.HasSemantics {
      constructor() {
         this.supplementalSemanticIds =
            new util.NamedArray<metamodelV3.Reference>;
      }
      semanticId: types.Reference;
      supplementalSemanticIds: types.ReferenceArray;

      public setSemanticId(semanticId: types.Reference) {
         this.semanticId = semanticId;
      }
      public getSemanticId(): types.Reference { return this.semanticId; }

      public setSupplementalSemanticIds(ids: types.ReferenceArray) {
         this.supplementalSemanticIds = ids;
      }
      public getSupplementalSemanticIds(): types.ReferenceArray {
         return this.supplementalSemanticIds;
      }
      public addSupplementalSemanticId(id: types.Reference) {
         this.supplementalSemanticIds.push(id);
      }
   }

   export abstract class HasSemanticsSM extends IdentifableExt
         implements interfaces.HasSemantics {
      constructor(id: types.Identifier) {
         super(id);
         this.supplementalSemanticIds =
            new util.NamedArray<metamodelV3.Reference>;
      }
      semanticId: types.Reference;
      supplementalSemanticIds: types.ReferenceArray;

      public setSemanticId(semanticId: types.Reference) {
         this.semanticId = semanticId;
      }
      public getSemanticId(): types.Reference { return this.semanticId; }

      public setSupplementalSemanticIds(ids: types.ReferenceArray) {
         this.supplementalSemanticIds = ids;
      }
      public getSupplementalSemanticIds(): types.ReferenceArray {
         return this.supplementalSemanticIds;
      }
      public addSupplementalSemanticId(id: types.Reference) {
         this.supplementalSemanticIds.push(id);
      }
   }

   export class Qualifier extends HasSemantics
         implements interfaces.Qualifier {
      constructor(type: types.QualifierType, valueType: types.DataTypeDefXsd) {
         super();
         this.type = type;
         this.valueType = valueType;
      }

      type: types.QualifierType;
      valueType: types.DataTypeDefXsd;
      value: types.ValueDataType;
      valueId: types.Reference;
      kind: types.QualifierKind;

      public getType(): types.QualifierType { return this.type; }

      public getValueType(): types.DataTypeDefXsd { return this.valueType; }

      public getValue(): types.ValueDataType { return this.value; }
      public setValue(v: types.ValueDataType) {this.value = v; }

      public getValueId(): types.Reference { return this.valueId; }
      public setValueId(vi: types.Reference) {this.valueId = vi; }

      public getKind(): types.QualifierKind { return this.kind; }
      public setKind(k: types.QualifierKind) { this.kind = k; }
   }

   export class Extension extends HasSemantics implements interfaces.Extension {
      constructor(name: types.NameType) { 
         super();
         this.name = name;
         this.refersTo = new util.NamedArray<metamodelV3.Reference>;
      }
      name: types.NameType;
      valueType: types.DataTypeDefXsd;
      value: types.ValueDataType;
      refersTo: types.ModelReferenceArray<interfaces.Referable>;

      public getName(): types.NameType { return this.name; }

      public setValueType(valueType: types.DataTypeDefXsd) {
         this.valueType = valueType;
      }
      public getValueType(): types.DataTypeDefXsd {return this.valueType; }

      public setValue(value: types.ValueDataType) { this.value = value; }
      public getValue(): types.ValueDataType { return this.value; }

      public setRefersTo(refs: types.ModelReferenceArray<interfaces.Referable>) { 
         this.refersTo = refs;
      }
      public getRefersTo(): types.ModelReferenceArray<interfaces.Referable> {
         return this.refersTo;
      }
      public addRefersTo(ref: types.ModelReference<interfaces.Referable>) {
         this.refersTo.push(ref);
      }
   }

   export abstract class HasSemanticsSME extends ReferableExt implements interfaces.HasSemantics {
      constructor(idShort: types.NameType) {
         super(idShort);
         this.supplementalSemanticIds =
            new util.NamedArray<metamodelV3.Reference>;
      }
      semanticId: types.Reference;
      supplementalSemanticIds: types.ReferenceArray;

      public setSemanticId(semanticId: types.Reference) {
         this.semanticId = semanticId;
      }
      public getSemanticId(): types.Reference { return this.semanticId; }

      public setSupplementalSemanticIds(ids: types.ReferenceArray) {
         this.supplementalSemanticIds = ids;
      }
      public getSupplementalSemanticIds(): types.ReferenceArray {
         return this.supplementalSemanticIds;
      }
      public addSupplementalSemanticId(id: types.Reference) {
         this.supplementalSemanticIds.push(id);
      }
   }

   export abstract class Qualifiable implements interfaces.Qualifiable {
      constructor() {
         this.qualifiers = new util.NamedArray<metamodelV3.Qualifier>;
      }
      qualifiers: types.QualifierArray;

      getQualifiers(): types.QualifierArray { return this.qualifiers; }
      setQualifiers(qfs: types.QualifierArray) { this.qualifiers = qfs; }
      addQualifier(q: interfaces.Qualifier) { this.qualifiers.push(q); }
   }

   export abstract class QualifiableSME extends HasSemanticsSME
         implements interfaces.Qualifiable {
      constructor(idShort: types.NameType) {
         super(idShort);
         this.qualifiers = new util.NamedArray<metamodelV3.Qualifier>;
      }
      qualifiers: types.QualifierArray;

      getQualifiers(): types.QualifierArray { return this.qualifiers; }
      setQualifiers(qfs: types.QualifierArray) { this.qualifiers = qfs; }
      addQualifier(q: interfaces.Qualifier) { this.qualifiers.push(q); }
   }

   export abstract class QualifiableSM extends HasSemanticsSM
         implements interfaces.Qualifiable {
      constructor(id: types.Identifier) {
         super(id);
         this.qualifiers = new util.NamedArray<metamodelV3.Qualifier>;
      }
      qualifiers: types.QualifierArray;

      getQualifiers(): types.QualifierArray { return this.qualifiers; }
      setQualifiers(qfs: types.QualifierArray) { this.qualifiers = qfs; }
      addQualifier(q: interfaces.Qualifier) { this.qualifiers.push(q); }
   }

   export class AdministrativeInformation implements
         interfaces.AdministrativeInformation {
      constructor() {}
      version: types.VersionType;
      revision: types.RevisionType;
      creator: types.Reference;
      templateId: types.Identifier;

      public getVersion(): types.VersionType { return this.version; }
      public setVersion(v: types.VersionType) { this.version = v; }

      public getRevision(): types.RevisionType { return this.revision; }
      public setRevision(r: types.RevisionType) { this.revision = r; }

      public getCreator(): types.Reference { return this.creator; }
      public setCreator(c: types.Reference) { this.creator = c; }

      public getTemplateId(): types.Identifier { return this.templateId; }
      public setTemplateId(ti: types.Identifier) { this.templateId = ti ;}
   }

   export abstract class HasKind implements interfaces.HasKind {
      constructor() {}
      kind: types.ModellingKind;

      public getModellingKind(): types.ModellingKind { return this.kind; }
      public setModellingKind(k: types.ModellingKind) { this.kind = k; }
   }

   export abstract class HasKindSM extends QualifiableSM
         implements interfaces.HasKind {
      constructor(id: types.Identifier) {
         super(id);
      }
      kind: types.ModellingKind;

      public getModellingKind(): types.ModellingKind { return this.kind; }
      public setModellingKind(k: types.ModellingKind) { this.kind = k; }
   }

   export class SpecificAssetId extends HasSemantics
         implements interfaces.SpecificAssetId {
      constructor(name: types.LabelType, value: types.Identifier) {
         super();
         this.name = name;
         this.value = value;
      }
      name: types.LabelType;
      value: types.Identifier;
      externalSubjectId: types.Reference;

      public getName(): types.LabelType { return this.name; }

      public getValue(): types.Identifier { return this.value; }

      public getExternalSubjectId() { return this.externalSubjectId; }
      public setExternalSubjectId(id: types.Reference) {
         this.externalSubjectId = id;
      }

   }

   export class Resource implements interfaces.Resource {
      constructor(path: types.PathType) {
         this.path = path;
      }
      path: types.PathType;
      contentType: types.ContentType;

      public getPath(): types.PathType { return this.path; }

      public getContentType(): types.ContentType { return this.contentType; }
      public setContentType(ct: types.ContentType) { this.contentType = ct; }
   }

   export class AssetInformation implements interfaces.AssetInformation {
      constructor(assetKind: types.AssetKind) {
         this.assetKind = assetKind;
         this.specificAssetIds =
            new util.NamedArray<metamodelV3.SpecificAssetId>;
      }
      assetKind: types.AssetKind;
      globalAssetId: types.Identifier;
      specificAssetIds: types.SpecificAssetIdArray;
      assetType: types.Identifier;
      defaultThumbnail: interfaces.Resource;

      public getAssetKind(): types.AssetKind { return this.assetKind; }

      public getGlobalAssetId(): types.Identifier { return this.globalAssetId; }
      public setGlobalAssetId(gaid: types.Identifier) {
         this.globalAssetId = gaid;
      }

      public getSpecificAssetIds(): types.SpecificAssetIdArray {
         return this.specificAssetIds;
      }
      public setSpecificAssetIds(saids: types.SpecificAssetIdArray) {
         this.specificAssetIds = saids;
      }
      public addSpecifcAssetId(said: interfaces.SpecificAssetId) {
         this.specificAssetIds.push(said);
      }

      public getAssetType(): types.Identifier { return this.assetType; }
      public setAssetType(at: types.Identifier) { this.assetType = at; }

      public getDefaultTumbnail(): interfaces.Resource {
         return this.defaultThumbnail;
      }
      public setDefaultTumbnail(tn: interfaces.Resource) {
         this.defaultThumbnail = tn;
      }
   }

   /* Carefully construct dependency tree as we cannot have multiple parents
    * Add extra classes with prefix Ext, SME, SM where necessary to construct 
    * the tree. Those are duplicates of the classes without prefix, they only
    * inherit other classes, see below:
    */
   // Abstract:
   // HasExtensionExt -> HasDataSpecification : done
   // ReferableExt -> HasExtensionExt : done

   // SMEs:
   // ReferableExt -> HasExtensionExt : done
   // HasSemanticsSME -> ReferableExt : done
   // QualifiableSME -> HasSemanticsSME: done
   // HasDataSpecification -> null (via HasExtensionExt): done

   // AAS
   // IdentifiableExt -> ReferableExt -> HasExtensionExt: done
   // HasDataSpecification -> null (via HasExtensionExt): done

   // Submodel
   // IdentifiableExt -> ReferableExt -> HasExtensionExt: done
   // HasKindSM -> QualfiableSM: done
   // HasSemanticsSM -> IdentifableExt: done
   // QualifiableSM -> HasSemanticsSM: done
   // HasDataSpecification -> null (via HasExtensionExt): done

   // ConceptDescription
   // Identifiable -> Referable -> HasExtension
   // HasDataSpecificationCD -> Identifable

   export class AssetAdministrationShell extends IdentifableExt
         implements interfaces.AssetAdministrationShell {
      constructor(id: types.Identifier, ai: interfaces.AssetInformation) {
         super(id);
         this.assetInformation = ai;
         this.submodels = new util.NamedArray<metamodelV3.Reference>;
      }
      derivedFrom: types.ModelReference<interfaces.AssetAdministrationShell>;
      assetInformation: interfaces.AssetInformation;
      submodels: types.ModelReferenceArray<interfaces.Submodel>;

      public getDerivedFrom(): types.ModelReference<
            interfaces.AssetAdministrationShell> {
         return this.derivedFrom;
      }
      public setDerivedFrom(df: types.ModelReference<
            interfaces. AssetAdministrationShell>) {
         this.derivedFrom = df;
      }

      public getAssetInformation(): interfaces.AssetInformation {
         return this.assetInformation;
      }

      public getSubmodels(): types.ModelReferenceArray<interfaces.Submodel> {
         return this.submodels;
      }
      public setSubmodels(sms: types.ModelReferenceArray<interfaces.Submodel>) {
         this.submodels = sms;
      }
      public addSubmodel(sm: types.ModelReference<interfaces.Submodel>) {
         this.submodels.push(sm);
      }
   }

   export class Submodel extends HasKindSM implements interfaces.Submodel {
      constructor(id: types.Identifier) {
         super(id);
         this.submodelElements =
            new util.NamedArray<metamodelV3.SubmodelElement>;
      }
      submodelElements: types.SubmodelElementArray;

      public getSubmodelElements(): types.SubmodelElementArray {
         return this.submodelElements;
      }
      public setSubmodelElements(smes: types.SubmodelElementArray) {
         this.submodelElements = smes;
      }
      public addSubmodelElement(sm: interfaces.Submodel) {
         this.submodelElements.push(sm);
      }
   }

   export abstract class SubmodelElement extends QualifiableSME
      implements interfaces.SubmodelElement {
      constructor(idShort: types.NameType) { super(idShort); }
      // nothing todo
   }

   export class RelationshipElement extends SubmodelElement
         implements interfaces.RelationshipElement {
      constructor(idShort: types.NameType, first: types.Reference,
            second: types.Reference) {
         super(idShort);
         this.first = first;
         this.second = second;
      }
      first: types.Reference;
      second: types.Reference;

      public setFirst(r: types.Reference) { this.first = r;}
      public getFirst(): types.Reference { return this.first; }

      public getSecond(): types.Reference { return this.second; }
      public setSecond(r: types.Reference) { this.second = r;}
   }

   export class AnnotatedRelationshipElement extends RelationshipElement
         implements interfaces.AnnotatedRelationshipElement {
      constructor(idShort: types.NameType, first: types.Reference,
            second: types.Reference) {
         super(idShort, first, second);
         this.annotations = new util.NamedArray<DataElement>;
      }
      annotations: types.DataElementArray;

      public setAnnotations(ans: types.DataElementArray) {
         this.annotations = ans;
      }
      public getAnnotations(): types.DataElementArray {
         return this.annotations;
      }
      public addAnnotation(a: interfaces.DataElement) {
         this.annotations.push(a);
      }
   }

   export class Capability extends SubmodelElement implements interfaces.Capability {
      constructor(idShort: types.NameType) {
         super(idShort);
      }
      // nothing todo
   }

   export class SubmodelElementList<T = interfaces.SubmodelElement>
         extends SubmodelElement implements interfaces.SubmodelElementList<T> {
      constructor(idShort: types.NameType,
            typeValueListElement: types.AasSubmodelElements) {
         super(idShort);
         this.typeValueListElement = typeValueListElement;
         this.values = new util.NamedArray<T>;
      }
      orderedRelevant: boolean;
      semanticIdListElement: types.Reference;
      typeValueListElement: types.AasSubmodelElements;
      valueTypeListElement: types.DataTypeDefXsd;
      values: types.SubmodelElementArray<T>;

      public setOrderRelevant(or: boolean) { this.orderedRelevant = or; }
      public getOrderRelevant(): boolean { return this.orderedRelevant; }

      public setSemanticIdListElement(r: types.Reference) {
         this.semanticIdListElement = r;
      }
      public getSemanticIdListElement(): types.Reference {
         return this.semanticIdListElement;
      }

      public getTypeValueListElement(): types.AasSubmodelElements {
         return this.typeValueListElement;
      }

      public setValueTypeListElement(vt: types.DataTypeDefXsd) {
         this.valueTypeListElement = vt;
      }
      public getValueTypeListElement(): types.DataTypeDefXsd {
         return this.valueTypeListElement;
      }

      public setValues(vs: types.SubmodelElementArray<T>) { this.values = vs; }
      public getValues(): types.SubmodelElementArray<T> { return this.values; }
      public addValue(v: T) { this.values.push(v); }
   }

   export class SubmodelElementCollection extends SubmodelElement
         implements interfaces.SubmodelElementCollection {
      constructor(idShort: types.NameType) {
         super(idShort);
         this.values = new util.NamedArray<SubmodelElement>;
      }
      values: types.SubmodelElementArray;
      public setValues(vs: types.SubmodelElementArray) { this.values = vs; }
      public getValues(): types.SubmodelElementArray { return this.values; }
      public addValue(v: interfaces.SubmodelElement) { this.values.push(v); }
   }

   export class Entity extends SubmodelElement implements interfaces.Entity {
      constructor(idShort: types.NameType, entityType: types.EntityType) {
         super(idShort);
         this.entityType = entityType;
         this.statements = new util.NamedArray<SubmodelElement>;
         this.specificAssetIds = new util.NamedArray<SpecificAssetId>;
      }
      statements : types.SubmodelElementArray;
      entityType: types.EntityType;
      globalAssetId: types.Identifier;
      specificAssetIds: types.SpecificAssetIdArray;

      public setStatements(vs: types.SubmodelElementArray) {
         this.statements = vs;
      }
      public getStatements(): types.SubmodelElementArray {
         return this.statements;
      }
      public addStatement(v: interfaces.SubmodelElement) {
         this.statements.push(v);
      }

      public getEntityType(): types.EntityType { return this.entityType; }

      public setGlobalAssetId(gaid: types.Identifier) {
         this.globalAssetId = gaid;
      }
      public getGlobalAssetId(): types.Identifier { return this.globalAssetId; }

      public setSpecifcAssetIds(saids: types.SpecificAssetIdArray) {
         this.specificAssetIds = saids;
      }
      public getSpecifcAssetIds(): types.SpecificAssetIdArray {
         return this.specificAssetIds;
      }
      public addSpecifcAssetIds(said: interfaces.SpecificAssetId) {
         this.specificAssetIds.push(said);
      }
   }

   export abstract class EventElement extends SubmodelElement
         implements interfaces.EventElement {
      constructor(idShort: types.NameType) { super(idShort); }
      // nothing todo
   }

   export class BasicEventElement extends EventElement
         implements interfaces.BasicEventElement {
      constructor(idShort: types.NameType,
            observed: types.ModelReference<Referable>,
            direction: types.Direction,
            state: types.StateOfEvent) {
         super(idShort);
         this.observed = observed;
         this.direction = direction;
         this.state = state;
      }
      observed: types.ModelReference<Referable>;
      direction: types.Direction;
      state: types.StateOfEvent;
      messageTopic: types.MessageTopicType;
      messageBroker: types.ModelReference<Referable>;
      lastUpdate: types.DateTime;
      minInterval: types.Duration;
      maxInterval: types.Duration;

      public getObserved(): types.ModelReference<Referable> {
         return this.observed;
      }

      public getDirection(): types.Direction { return this.direction; }

      public getState(): types.StateOfEvent { return this.state; }

      public setMessageTopic(mt: types.MessageTopicType) {
         this.messageTopic = mt;
      }
      public getMessageTopic(): types.MessageTopicType {
         return this.messageTopic;
      }

      public setMessageBroker(b: types.ModelReference<Referable>) {
         this.messageBroker = b;
      }

      public getMessageBroker(): types.ModelReference<Referable> {
         return this.messageBroker;
      }

      public setLastUpdate(lu: types.DateTime) { this.lastUpdate = lu; }
      public getLastUpdate(): types.DateTime { return this.lastUpdate; }

      public setMinInterval(i: types.Duration) { this.minInterval = i; }
      public getMinInterVal(): types.Duration { return this.minInterval; }

      public setMaxInterval(i: types.Duration) { this.maxInterval = i; }
      public getMaxInterVal(): types.Duration { return this.maxInterval; }
   }

   export class Operation extends SubmodelElement implements interfaces.Operation {
      constructor(idShort: types.NameType) {
         super(idShort);
         this.inputVariables = new util.NamedArray<OperationVariable>;
         this.outputVariables = new util.NamedArray<OperationVariable>;
         this.inoutputVariables = new util.NamedArray<OperationVariable>;
      }
      inputVariables: types.OperationVariableArray;
      outputVariables: types.OperationVariableArray;
      inoutputVariables: types.OperationVariableArray;

      setInputVariables(ivs: types.OperationVariableArray) {
         this.inputVariables = ivs;
      }
      getInputVariables(): types.OperationVariableArray {
         return this.inputVariables;
      }
      addInputVariable(iv: interfaces.OperationVariable) {
         this.inputVariables.push(iv);
      }

      setOutputVariables(ovs: types.OperationVariableArray) {
         this.outputVariables = ovs;
      }
      getOutputVariables(): types.OperationVariableArray {
         return this.outputVariables;
      }
      addOutputVariable(ov: interfaces.OperationVariable) {
         this.outputVariables.push(ov);
      }

      setInOutputVariables(iovs: types.OperationVariableArray) {
         this.inoutputVariables = iovs;
      }
      getInOutputVariables(): types.OperationVariableArray {
         return this.inoutputVariables;
      }
      addInOutputVariable(iov: interfaces.OperationVariable) {
         this.inoutputVariables.push(iov);
      }
   }

   export class OperationVariable implements interfaces.OperationVariable {
      constructor(value: interfaces.SubmodelElement) {
         this.value = value;
      }
      value: interfaces.SubmodelElement;

      public getValue(): interfaces.SubmodelElement { return this.value; }
   }

   export abstract class DataElement extends SubmodelElement
         implements interfaces.DataElement {
      constructor(idShort: types.NameType) { super(idShort); }
      // nothing todo
   }

   export class Property extends DataElement implements interfaces.Property {
      constructor(idShort: types.NameType, valueType: types.DataTypeDefXsd) {
         super(idShort);
         this.valueType = valueType;
      }
      valueType: types.DataTypeDefXsd;
      value: types.ValueDataType;
      valueId: types.Reference;

      public getValueType(): types.DataTypeDefXsd { return this.valueType; }

      public setValue(v: types.ValueDataType) { this.value = v; }
      public getValue(): types.ValueDataType { return this.value; }

      public setValueId(vid: types.Reference) { this.valueId = vid; }
      public getValueId(): types.Reference { return this.valueId; }
   }

   export class MultiLanguageProperty extends DataElement
         implements interfaces.MultiLanguageProperty {
      constructor(idShort: types.NameType) { super(idShort); }
      values: interfaces.MultiLanguageType;
      valueId: types.Reference;

      public setValues(vs: interfaces.MultiLanguageType) { this.values = vs; }
      public getValues(): interfaces.MultiLanguageType { return this.values; }

      public setValueId(vi: types.Reference) { this.valueId = vi; }
      public getValueId(): types.Reference { return this.valueId; }

   }

   export class Range extends DataElement implements interfaces.Range {
      constructor(idShort: types.NameType, valueType: types.DataTypeDefXsd) {
         super(idShort);
         this.valueType = valueType;
      }
      valueType: types.DataTypeDefXsd;
      min: types.ValueDataType;
      max: types.ValueDataType;

      public getValueType(): types.DataTypeDefXsd { return this. valueType; }

      public setMin(min: types.ValueDataType) { this.min = min; }
      public getMin(): types.ValueDataType { return this.min; }

      public setMax(max: types.ValueDataType) { this.max = max; }
      public getMax(): types.ValueDataType { return this.max; }
   }

   export class ReferenceElement extends DataElement
         implements interfaces.ReferenceElement {
      constructor(idShort: types.NameType) { super(idShort);
         this.value = null;
      }
      value: types.Reference;

      public setValue(v: types.Reference) { this.value = v; }
      public getValue(): types.Reference { return this.value; }
   }

   export class File extends DataElement implements interfaces.File {
      constructor(idShort: types.NameType, contentType: types.ContentType) {
         super(idShort);
         this.contentType = contentType;
      }
      value: types.PathType;
      contentType: types.ContentType;

      public getContentType(): types.ContentType { return this.contentType; }

      public setValue(v: types.PathType) { this.value = v; }
      public getValue(): types.PathType { return this.value; }
   }

   export class Blob extends DataElement implements interfaces.Blob {
      constructor(idShort: types.NameType, contentType: types.ContentType) {
         super(idShort);
         this.contentType = contentType;
      }
      value: types.BlobType;
      contentType: types.ContentType;

      public getContentType(): types.ContentType { return this.contentType; }

      public setValue(v: types.BlobType) { this.value = v; }
      public getValue(): types.BlobType { return this.value; }
   }

   export class ConceptDescription extends HasDataSpecificationCD
         implements interfaces.ConceptDescription {
      constructor(id: types.Identifier) {
         super(id);
         this.isCaseOf = new util.NamedArray<Reference>;
      }
      isCaseOf: types.ReferenceArray;

      public setIsCaseOf(isCaseOfA: types.ReferenceArray) {
         this.isCaseOf = isCaseOfA;
      }
      public getIsCaseOf(): types.ReferenceArray { return this.isCaseOf; }
      public addIsCaseOf(isCaseOf: types.Reference) {
         this.isCaseOf.push(isCaseOf);
      }
   }

   export class Environment {
      constructor() {
         this.assetAdministrationShells =
            new util.NamedArray<AssetAdministrationShell>();
         this.assetAdministrationShells.setName("AssetAdminstrationShells");
         this.submodels = new util.NamedArray<Submodel>();
         this.submodels.setName("Submodels");
         this.conceptDescriptions = new util.NamedArray<ConceptDescription>();
         this.conceptDescriptions.setName("ConceptDescriptions");
      }
      assetAdministrationShells: types.AssetAdministrationShellArray;
      submodels: types.SubmodelArray;
      conceptDescriptions: types.ConceptDescriptionArray;

      public setAssetAdministrationShells(
            aas: types.AssetAdministrationShellArray) {
         this.assetAdministrationShells = aas;
      }
      public getAssetAdministrationShells():
            types.AssetAdministrationShellArray {
         return this.assetAdministrationShells;
      }
      public addAssetAdministrationShells(
            aas: interfaces.AssetAdministrationShell) {
         this.assetAdministrationShells.push(aas);
      }

      public setSubmodels(submodels: types.SubmodelArray) {
         this.submodels = submodels;
      }
      public getSubmodels(): types.SubmodelArray { return this.submodels; }
      public addSubmodel(submodel: interfaces.Submodel) {
         this.submodels.push(submodel);
      }

      public setConceptDescriptions(cds: types.ConceptDescriptionArray) {
         this.conceptDescriptions = cds;
      }
      public getConceptDescriptions(): types.ConceptDescriptionArray {
         return this.conceptDescriptions;
      }
      public addConceptDescriptions(cd: interfaces.ConceptDescription) {
         this.conceptDescriptions.push(cd);
      }
   }

   /* Asset Admininstration Shell Part 2 */

   export class SecurityAttributeObject 
         implements interfaces.SecurityAttributeObject {
      constructor(type: types.SecurityTypeEnum, key: string, value: string) {
         this.type = type;
         this.key = key;
         this.value = value;
      }
      type: types.SecurityTypeEnum;
      key: string;
      value: string;

      public getType(): types.SecurityTypeEnum { return this.type; }

      public getKey(): string { return this.key; }

      public getValue(): string { return this.value; }
   }

   export class ProtocolInformation implements interfaces.ProtocolInformation {
      constructor(href: types.LocatorType) {
         this.href = href;
         this.endpointProtocolVersions = new util.NamedArray<types.LabelType>;
         this.securityAttributes = new util.NamedArray<SecurityAttributeObject>;
      }
      href: types.LocatorType;
      endpointProtocol: types.SchemeType;
      endpointProtocolVersions: types.LabelTypeArray;
      subprotocol: types.ShortIdType;
      subprotocolBody: types.TextType;
      subprotocolBodyEncoding: types.LabelType;
      securityAttributes: types.SecurityAttributeObjectArray;

      public getHref(): types.LocatorType { return this.href; }

      public setEndpointProtocol(ep: types.SchemeType) {
         this.endpointProtocol = ep;
      }
      public getEndpointProtocol(): types.SchemeType {
         return this.endpointProtocol;
      }

      public setEndpointProtocolVersions(epva: types.LabelTypeArray) {
         this.endpointProtocolVersions = epva;
      }
      public getEndpointProtocolVersions(): types.LabelTypeArray {
         return this.endpointProtocolVersions;
      }
      public addEndpointProtocolVersion(epv: types.LabelType) {
         this.endpointProtocolVersions.push(epv);
      }

      public setSubprotocol(s: types.ShortIdType) { this.subprotocol = s; }
      public getSubprotocol(): types.ShortIdType { return this.subprotocol; }

      public setSubprotocolBody(sb: types.TextType) {
         this.subprotocolBody = sb;
      }
      public getSubprotocolBody(): types.TextType {
         return this.subprotocolBody;
      }

      public setSubprotocolBodyEncoding(sbe: types.LabelType) {
         this.subprotocolBodyEncoding = sbe;
      }
      public getSubprotocolBodyEncoding(): types.LabelType {
         return this.subprotocolBodyEncoding;
      }

      public setSecurityAttributes(saa: types.SecurityAttributeObjectArray) {
         this.securityAttributes = saa;
      }
      public getSecurityAttributes(): types.SecurityAttributeObjectArray {
         return this.securityAttributes;
      }
      public addSecurityAttributes(sattr: interfaces.SecurityAttributeObject) {
         this.securityAttributes.push(sattr);
      }
   }

   export class Endpoint implements interfaces.Endpoint {
      constructor(protocolInformation: interfaces.ProtocolInformation,
         interf: types.NameType) {
         this.protocolInformation = protocolInformation;
         this.interface = interf;
      }
      protocolInformation: interfaces.ProtocolInformation;
      interface: types.NameType;

      public getProtocolInformation(): interfaces.ProtocolInformation {
         return this.protocolInformation;
      }

      public getInterface(): types.NameType { return this.interface; }
   }

   export abstract class Descriptor implements interfaces.Descriptor {
      constructor() {
         this.extensions = new util.NamedArray<Extension>;
      }
      description: interfaces.MultiLanguageType;
      displayName: interfaces.MultiLanguageType;
      extensions: types.ExtensionArray;

      public setDescription(desc: interfaces.MultiLanguageType) {
         this.description = desc;
      }
      public getDescription(): interfaces.MultiLanguageType {
         return this.description;
      }
      public addDescription(d: types.MultiLangageEntry) {
         this.description.elements.push(d);
      }

      public setDisplayName(dispN: interfaces.MultiLanguageType) {
         this.displayName = dispN;
      }
      public getDisplayName(): interfaces.MultiLanguageType {
         return this.displayName;
      }
      public addDisplayName(e: types.MultiLangageEntry) {
         this.displayName.elements.push(e);
      }

      public setExtensions(ext: types.ExtensionArray) { this.extensions = ext; }
      public getExtensions(): types.ExtensionArray { return this.extensions; }
      public addExtension(e: interfaces.Extension ) { this.extensions.push(e); }
   }

   export class SubmodelDescriptor extends Descriptor
         implements interfaces.SubmodelDescriptor {
      constructor(id: types.Identifier, endpoints: types.EndpointArray) {
         super();
         this.id = id;
         this.endpoints = endpoints;
         this.supplementalSemanticIds = new util.NamedArray<Reference>;
      }
      administration: interfaces.AdministrativeInformation;
      endpoints: types.EndpointArray;
      idShort: types.NameType;
      id: types.Identifier;
      semanticId: types.Reference;
      supplementalSemanticIds: types.ReferenceArray;

      public getAdministration(): interfaces.AdministrativeInformation {
         return this.administration;
      }
      public setAdministration(a: interfaces.AdministrativeInformation) {
         this.administration = a;
      }

      public getEndpoints(): types.EndpointArray {
         return this.endpoints;
      }
      public addEndpoint(e: interfaces.Endpoint) {
         this.endpoints.push(e);
      }

      public setIdShort(idShort: types.NameType) { this.idShort = idShort; }
      public getIdShort(): types.NameType { return this.idShort; }

      public getId(): types.Identifier { return this.id; }

      public setSemanticId(semanticId: types.Reference) {
         this.semanticId = semanticId;
      }
      public getSemanticId(): types.Reference { return this.semanticId; }

      public setSupplemantalSemanticIds(ids: types.ReferenceArray) {
         this.supplementalSemanticIds = ids;
      }
      public getSupplementalSematicIds(): types.ReferenceArray {
         return this.supplementalSemanticIds;
      }
      public addSupplementalSemanticId(id: types.Reference) {
         this.supplementalSemanticIds.push(id);
      }
   }

   export class AssetAdministrationShellDescriptor extends Descriptor
         implements interfaces.AssetAdministrationShellDescriptor {
      constructor(id: types.Identifier, endpoints: types.EndpointArray) {
         super();
         this.id = id;
         this.endpoints = endpoints;
         this.specificAssetIds = new util.NamedArray<SpecificAssetId>;
         this.submodelDescriptors = new util.NamedArray<SubmodelDescriptor>;
      }
      administration: interfaces.AdministrativeInformation;
      assetKind: types.AssetKind;
      assetType: types.Identifier;
      endpoints: types.EndpointArray;
      globalAssetId: types.Identifier;
      idShort: types.NameType;
      id: types.Identifier;
      specificAssetIds: types.SpecificAssetIdArray;
      submodelDescriptors: types.SubmodelDescriptorsArray;

      public getAdministration(): interfaces.AdministrativeInformation {
         return this.administration;
      }
      public setAdministration(a: interfaces.AdministrativeInformation) {
         this.administration = a;
      }

      public setAssetKind(ak: types.AssetKind){ this.assetKind = ak; }
      public getAssetKind(): types.AssetKind { return this.assetKind; }

      public setAssetType(at: types.Identifier){ this.assetType = at; }
      public getAssetType(): types.Identifier { return this.assetType; }

      public getEndpoints(): types.EndpointArray {
         return this.endpoints;
      }
      public addEndpoint(e: interfaces.Endpoint) {
         this.endpoints.push(e);
      }

      public getGlobalAssetId(): types.Identifier { return this.globalAssetId; }
      public setGlobalAssetId(gaid: types.Identifier) {
         this.globalAssetId = gaid;
      }

      public setIdShort(idShort: types.NameType) { this.idShort = idShort; }
      public getIdShort(): types.NameType { return this.idShort; }

      public getId(): types.Identifier { return this.id; }

      public getSpecificAssetIds(): types.SpecificAssetIdArray {
         return this.specificAssetIds;
      }
      public setSpecificAssetIds(saids: types.SpecificAssetIdArray) {
         this.specificAssetIds = saids;
      }
      public addSpecifcAssetId(said: interfaces.SpecificAssetId) {
         this.specificAssetIds.push(said);
      }

      public getSubmodelDescriptors(): types.SubmodelDescriptorsArray {
         return this.submodelDescriptors;
      }
      public setSubmodelDescriptors(smda: types.SubmodelDescriptorsArray) {
         this.submodelDescriptors = smda;
      }
      public addSubmodelDescriptors(sd: interfaces.SubmodelDescriptor) {
         this.submodelDescriptors.push(sd);
      }
   }
}