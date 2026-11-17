<!-- CODEGRAPH_START -->

## CodeGraph

**`.codegraph/` at the repo root? Query CodeGraph before grep/find or reading files.** No `.codegraph/` → skip CodeGraph entirely (indexing is the user's decision).

1. **MCP tool** (when available): `codegraph_explore` — one call returns the relevant symbols' verbatim source + call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol to get its current line-numbered source. Listed but deferred → load it by name via tool search.
2. **Shell** (always works): `codegraph explore "<symbol names or question>"` — same output.

<!-- CODEGRAPH_END -->
