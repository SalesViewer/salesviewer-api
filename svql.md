---
layout: page
title: SVQL
tagline: SalesViewer Query Language
group: navigation
---

The SVQL (**S**ales**V**iewer **Q**uery **L**anguage) is a merged superset of
RQL (**R**esource **Q**uery **L**anguage) merged with FIQL (**F**eed **I**tem **Q**uery **L**anguage).


## RQL - **R**esource **Q**uery **L**anguage

We had to enhance RQL a bit to support 
- full-quoted strings in single and double quotes (`"` and `'`)
- conditional aggregates like `COUNT(anything LIKE something)` for large group queries
- whitespace ignorance
- ...

### Specifications
* [apsstandard offical spec](https://doc.apsstandard.org/2.1/spec/rql/){:target="_blank"}
* [persvr README](https://github.com/persvr/rql){:target="_blank"}

### Features supported by SVQL
- [x] `in (<field>,<array-of-values>)` and `out (<field>,<array-of-values>)` (`in(session.company.zip, (76255, 70176))`)
- [x] `limit (<start>,<number>)` (_Note: SalesViewer remains page-based - the offset is recalculated to the real page number internally_)
- [x] `sort (<list of fields with + or - prefix>)` 
- [x] `like (<field>, <pattern>)` 
- [x] `and (<query>,<query>,...)`
- [x] `or (<query>,<query>,...)`
- [x] `not (<query>)`
- [x] `eq (<field>,<value>)`
- [x] `ne (<field>,<value>)`
- [x] `gt (<field>,<value>)`
- [x] `ge (<field>,<value>)`
- [x] `lt (<field>,<value>)`
- [x] `le (<field>,<value>)`

### Feature enhancements
- [x] we made the language whitespace ignoring!
- [ ] `sort (<condition subquery, aggregate or conditional aggregate>)` 
- [x] `count(<field>, <conditional aggregate>) > 0` (like: `count(me.friends.name LIKE 'robin')`)
- [ ] `exists(<field>, <condition>` or `any(<field>, <condition>)` as alias for `count(<field>, <...>) > 0`
- [x] `like (<field>, <aggregate or conditional aggregate>)`[^2]
- [x] `null()` changed to `null` (_because of quoted strings_)
- [x] `true()` changed to `true` (_because of quoted strings_)
- [x] `false()` changed to `false` (_because of quoted strings_)
- [ ] we want to provide a visual query builder (_work in progress_)

### Features ignored
- [ ] `select (<list of attributes>)`[^1]
- [ ] `linkedWith (<resource ID>)`[^1]
- [ ] `implementing (<base-type>)`[^1] 
- [ ] `composing (<derived-type>)`[^1]
- [ ] `empty(<propertie>)`[^1] - obsolete because of quoted strings





## FIQL - **F**eed **I**tem **Q**uery **L**anguage
### Specifications
* [IETF offical draft](https://tools.ietf.org/html/draft-nottingham-atompub-fiql-00){:target="_blank"}
* [Apache CXF FIQL reference](http://cxf.apache.org/docs/jax-rs-search.html#JAX-RSSearch-AdvancedSearchQueries)

### supported by SVQL
- [x] Comparison: `=`, `==`, `!=`, `=lt=`, `=le=`, `=gt=`, `=ge=`
- [x] Logical: `;`, `,` replaced by `&` and `|` (_which is more intuitve and compatible with RQL_)



## Footnotes
[^1]: There's no real use-case for this. We won't support dynamic object creation or partial retrieving the data.
[^2]: Extension to the standard