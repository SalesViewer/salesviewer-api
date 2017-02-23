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
- [X] `in (<field>,<array-of-values>)` and `out (<field>,<array-of-values>)` (`in(session.company.zip, (76255, 70176))`)
- [X] `limit (<start>,<number>)` (_Note: SalesViewer remains page-based - the offset is recalculated to the real page number internally_)
- [X] `sort (<list of fields with + or - prefix>)` 
- [X] `like (<field>, <pattern>)` 
- [X] `and (<query>,<query>,...)`
- [X] `or (<query>,<query>,...)`
- [X] `not (<query>)`
- [X] `eq (<field>,<value>)`
- [X] `ne (<field>,<value>)`
- [X] `gt (<field>,<value>)`
- [X] `ge (<field>,<value>)`
- [X] `lt (<field>,<value>)`
- [X] `le (<field>,<value>)`

### Feature enhancements
- [X] we made the language whitespace ignoring!
- [ ] `sort (<condition subquery, aggregate or conditional aggregate>)` 
- [X] `count(<field>, <conditional aggregate>) > 0` (like: `count(me.friends.name LIKE 'robin')`)
- [ ] `exists(<field>, <condition>` or `any(<field>, <condition>)` as alias for `count(<field>, <...>) > 0`
- [X] `like (<field>, <aggregate or conditional aggregate>)`[^2]
- [X] `null()` changed to `null` (_because of quoted strings_)
- [X] `true()` changed to `true` (_because of quoted strings_)
- [X] `false()` changed to `false` (_because of quoted strings_)
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
- [X] Comparison: `=`, `==`, `!=`, `=lt=`, `=le=`, `=gt=`, `=ge=`
- [X] Logical: `;`, `,` replaced by `&` and `|` (_which is more intuitve and compatible with RQL_)



## Footnotes
[^1]: There's no real use-case for this. We won't support dynamic object creation or partial retrieving the data.
[^2]: Extension to the standard


*[RQL]: Resource Query Language
*[SVQL]: SalesViewer Query Language
*[FIQL]: Feed Item Query Language
*[IETF]: Internet Engineering Task Force
*[API]: Application Programming Interface